package com.tubeshadow.analysis.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.prompt.ClipAnalysisPrompt;
import com.tubeshadow.common.exception.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.List;
import java.util.Map;

/**
 * Google Gemini 2.5 Flash client (the default provider). Free tier: generous quota for a
 * single learner's clip analyses, ~15 RPM. Uses {@code responseMimeType: application/json}
 * to force JSON output, then delegates parsing to the shared {@link AiAnalysisParser}.
 */
@Component
@EnableConfigurationProperties(GeminiProperties.class)
@ConditionalOnProperty(name = "tubeshadow.ai.provider", havingValue = "gemini", matchIfMissing = true)
public class GeminiClient implements AiAnalysisClient {

    private static final Logger log = LoggerFactory.getLogger(GeminiClient.class);

    private final GeminiProperties props;
    private final ObjectMapper objectMapper;
    private final RestClient http;

    public GeminiClient(GeminiProperties props, ObjectMapper objectMapper) {
        this.props = props;
        this.objectMapper = objectMapper;
        // LLM calls are slow but must never hang an @Async thread forever. A stalled
        // provider (Gemini free tier is 15 RPM and throttles) with no read timeout
        // would block the bounded analysis pool indefinitely. Bound both phases; on
        // timeout analyzeClip()'s catch marks the analysis FAILED and frees the thread.
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(60));
        this.http = RestClient.builder()
                .requestFactory(factory)
                .baseUrl(props.baseUrl())
                .defaultHeader("content-type", "application/json")
                .build();
    }

    @Override
    public boolean isConfigured() {
        return props.apiKey() != null && !props.apiKey().isBlank();
    }

    @Override
    public AiAnalysisResult analyzeClip(String transcript) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "GEMINI_NOT_CONFIGURED",
                    "Gemini API key가 설정되지 않았습니다");
        }

        // Gemini 2.5 Flash burns "thinking" tokens before emitting visible text. With a small
        // maxOutputTokens the visible JSON got truncated mid-string, so we disable thinking
        // (not needed for this structured task) and give the response room.
        Map<String, Object> body = Map.of(
                "systemInstruction", Map.of(
                        "parts", List.of(Map.of("text", ClipAnalysisPrompt.SYSTEM))
                ),
                "contents", List.of(Map.of(
                        "parts", List.of(Map.of("text", ClipAnalysisPrompt.userMessage(transcript)))
                )),
                "generationConfig", Map.of(
                        "responseMimeType", "application/json",
                        "maxOutputTokens", 4096,
                        "temperature", 0.2,
                        "thinkingConfig", Map.of("thinkingBudget", 0)
                )
        );

        String raw;
        try {
            // Retry transient failures (429 / 5xx / timeout); permanent errors fail fast.
            raw = AiRetry.withRetry("Gemini", () -> http.post()
                    .uri("/v1beta/models/{model}:generateContent?key={key}",
                            props.model(), props.apiKey())
                    .body(body)
                    .retrieve()
                    .body(String.class));
        } catch (Exception ex) {
            log.error("Gemini API call failed", ex);
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "GEMINI_CALL_FAILED",
                    "Gemini 호출 실패: " + ex.getMessage());
        }

        return parseResponse(raw);
    }

    /** Gemini response shape: candidates[0].content.parts[0].text → our JSON string. */
    public AiAnalysisResult parseResponse(String rawResponse) {
        try {
            JsonNode root = objectMapper.readTree(rawResponse);
            JsonNode candidates = root.path("candidates");
            if (!candidates.isArray() || candidates.isEmpty()) {
                throw new IllegalStateException("Gemini returned no candidates: " + rawResponse);
            }
            String inner = candidates.get(0).path("content").path("parts").get(0).path("text").asText("");
            return AiAnalysisParser.parse(objectMapper, inner);
        } catch (Exception ex) {
            // Log a short prefix of the raw response so we can see when the JSON was
            // truncated vs malformed. Strip newlines for log readability.
            String preview = rawResponse == null ? "(null)" :
                    rawResponse.replace("\n", " ").substring(0, Math.min(300, rawResponse.length()));
            log.warn("Gemini response parsing failed: {} | raw preview: {}", ex.getMessage(), preview);
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "GEMINI_PARSE_FAILED",
                    "Gemini 응답 파싱 실패: " + ex.getMessage());
        }
    }

    @Override
    public String complete(String systemPrompt, String userPrompt, int maxTokens) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "GEMINI_NOT_CONFIGURED",
                    "Gemini API key가 설정되지 않았습니다");
        }
        Map<String, Object> body = Map.of(
                "systemInstruction", Map.of("parts", List.of(Map.of("text", systemPrompt))),
                "contents", List.of(Map.of("parts", List.of(Map.of("text", userPrompt)))),
                "generationConfig", Map.of(
                        "responseMimeType", "application/json",
                        "maxOutputTokens", maxTokens,
                        "temperature", 0.3,
                        "thinkingConfig", Map.of("thinkingBudget", 0))
        );
        String raw;
        try {
            raw = AiRetry.withRetry("Gemini", () -> http.post()
                    .uri("/v1beta/models/{model}:generateContent?key={key}", props.model(), props.apiKey())
                    .body(body)
                    .retrieve()
                    .body(String.class));
        } catch (Exception ex) {
            log.error("Gemini completion failed", ex);
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "GEMINI_CALL_FAILED",
                    "Gemini 호출 실패: " + ex.getMessage());
        }
        try {
            JsonNode candidates = objectMapper.readTree(raw).path("candidates");
            if (!candidates.isArray() || candidates.isEmpty()) {
                throw new IllegalStateException("Gemini returned no candidates");
            }
            return candidates.get(0).path("content").path("parts").get(0).path("text").asText("");
        } catch (Exception ex) {
            log.warn("Gemini completion parse failed: {}", ex.getMessage());
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "GEMINI_PARSE_FAILED", "Gemini 응답 파싱 실패");
        }
    }

    @Override
    public String model() {
        return props.model();
    }
}

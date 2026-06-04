package com.tubeshadow.analysis.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.prompt.ClipAnalysisPrompt;
import com.tubeshadow.common.exception.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.List;
import java.util.Map;

/**
 * OpenAI Chat Completions client — the spill-over provider in {@link CompositeAiClient}'s fallback
 * chain. Uses {@code response_format: json_object} so the same strict-JSON prompts parse identically
 * to the Gemini/Claude paths. Enabled only when OPENAI_API_KEY is set; otherwise isConfigured() is
 * false and the composite skips it.
 */
@Component
@EnableConfigurationProperties(OpenAiProperties.class)
public class OpenAiClient implements AiAnalysisClient {

    private static final Logger log = LoggerFactory.getLogger(OpenAiClient.class);

    private final OpenAiProperties props;
    private final ObjectMapper objectMapper;
    private final RestClient http;

    public OpenAiClient(OpenAiProperties props, ObjectMapper objectMapper) {
        this.props = props;
        this.objectMapper = objectMapper;
        // Bound connect/read like the other providers so a stalled call can't pin a thread forever.
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
        String text = chat(ClipAnalysisPrompt.SYSTEM, ClipAnalysisPrompt.userMessage(transcript), 1500);
        try {
            return AiAnalysisParser.parse(objectMapper, text);
        } catch (Exception ex) {
            log.warn("OpenAI analyze parse failed: {}", ex.getMessage());
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "OPENAI_PARSE_FAILED", "OpenAI 응답 파싱 실패");
        }
    }

    @Override
    public String complete(String systemPrompt, String userPrompt, int maxTokens) {
        return chat(systemPrompt, userPrompt, maxTokens);
    }

    @Override
    public String model() {
        return props.model();
    }

    /** One chat-completions call → the assistant message text. Throws on transport/parse failure. */
    private String chat(String system, String user, int maxTokens) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "OPENAI_NOT_CONFIGURED",
                    "OpenAI API key가 설정되지 않았습니다");
        }
        Map<String, Object> body = Map.of(
                "model", props.model(),
                "max_tokens", maxTokens,
                "temperature", 0.3,
                "response_format", Map.of("type", "json_object"),
                "messages", List.of(
                        Map.of("role", "system", "content", system),
                        Map.of("role", "user", "content", user)));
        String raw;
        try {
            raw = AiRetry.withRetry("OpenAI", () -> http.post()
                    .uri("/v1/chat/completions")
                    .header("Authorization", "Bearer " + props.apiKey())
                    .body(body)
                    .retrieve()
                    .body(String.class));
        } catch (Exception ex) {
            log.error("OpenAI call failed", ex);
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "OPENAI_CALL_FAILED",
                    "OpenAI 호출 실패: " + ex.getMessage());
        }
        try {
            JsonNode root = objectMapper.readTree(raw);
            return root.path("choices").path(0).path("message").path("content").asText("");
        } catch (Exception ex) {
            log.warn("OpenAI response parse failed: {}", ex.getMessage());
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "OPENAI_PARSE_FAILED", "OpenAI 응답 파싱 실패");
        }
    }
}

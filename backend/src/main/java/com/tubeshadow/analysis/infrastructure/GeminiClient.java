package com.tubeshadow.analysis.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.domain.ChunkPair;
import com.tubeshadow.analysis.domain.KeyExpression;
import com.tubeshadow.analysis.domain.PracticeScenario;
import com.tubeshadow.analysis.domain.Vocabulary;
import com.tubeshadow.analysis.prompt.ClipAnalysisPrompt;
import com.tubeshadow.common.exception.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Google Gemini 1.5 Flash client. Free tier: 1500 requests/day, 15 RPM, 1M tokens/day.
 * Plenty for a single learner's clip analyses. Uses {@code responseMimeType: application/json}
 * to force JSON output so we can reuse the same parser shape as Claude.
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
        this.http = RestClient.builder()
                .baseUrl(props.baseUrl())
                .defaultHeader("content-type", "application/json")
                .build();
    }

    @Override
    public boolean isConfigured() {
        return props.apiKey() != null && !props.apiKey().isBlank();
    }

    @Override
    public ClaudeClient.AnalysisResult analyzeClip(String transcript) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "GEMINI_NOT_CONFIGURED",
                    "Gemini API key가 설정되지 않았습니다");
        }

        // Gemini 2.5 Flash burns "thinking" tokens before emitting visible text. With
        // maxOutputTokens=800 the visible JSON was getting truncated mid-string. Disable
        // thinking (we don't need it for translation) and give the response room to breathe.
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
            raw = http.post()
                    .uri("/v1beta/models/{model}:generateContent?key={key}",
                            props.model(), props.apiKey())
                    .body(body)
                    .retrieve()
                    .body(String.class);
        } catch (Exception ex) {
            log.error("Gemini API call failed", ex);
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "GEMINI_CALL_FAILED",
                    "Gemini 호출 실패: " + ex.getMessage());
        }

        return parseResponse(raw);
    }

    /** Gemini response shape: candidates[0].content.parts[0].text → our JSON string. */
    public ClaudeClient.AnalysisResult parseResponse(String rawResponse) {
        try {
            JsonNode root = objectMapper.readTree(rawResponse);
            JsonNode candidates = root.path("candidates");
            if (!candidates.isArray() || candidates.isEmpty()) {
                throw new IllegalStateException("Gemini returned no candidates: " + rawResponse);
            }
            String inner = candidates.get(0).path("content").path("parts").get(0).path("text").asText("");
            JsonNode payload = objectMapper.readTree(stripCodeFence(inner.trim()));

            List<String> grammar = readStrings(payload.path("grammar_notes"));
            List<KeyExpression> exprs = new ArrayList<>();
            for (JsonNode n : payload.path("key_expressions")) {
                exprs.add(new KeyExpression(
                        n.path("phrase").asText(""),
                        n.path("meaning").asText(""),
                        n.path("usage").asText("")));
            }
            List<Vocabulary> vocab = new ArrayList<>();
            for (JsonNode n : payload.path("vocabulary")) {
                vocab.add(new Vocabulary(
                        n.path("word").asText(""),
                        n.path("meaning").asText(""),
                        n.path("level").asText("basic")));
            }
            String summary = payload.path("context_summary").asText("");
            JsonNode trNode = payload.path("primary_translation");
            String primaryTranslation = trNode.isMissingNode() || trNode.isNull() ? null : trNode.asText();
            if (primaryTranslation != null && primaryTranslation.isBlank()) primaryTranslation = null;

            List<ChunkPair> chunked = new ArrayList<>();
            for (JsonNode n : payload.path("chunked_translation")) {
                String en = n.path("en").asText("").trim();
                String ko = n.path("ko").asText("").trim();
                if (!en.isEmpty() && !ko.isEmpty()) chunked.add(new ChunkPair(en, ko));
            }

            PracticeScenario scenario = ClaudeClient.parseScenario(payload.path("practice_scenario"));

            return new ClaudeClient.AnalysisResult(grammar, exprs, vocab, summary, primaryTranslation, chunked, scenario);
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
    public String model() {
        return props.model();
    }

    private static String stripCodeFence(String s) {
        if (s.startsWith("```")) {
            int firstNl = s.indexOf('\n');
            int lastFence = s.lastIndexOf("```");
            if (firstNl > 0 && lastFence > firstNl) {
                return s.substring(firstNl + 1, lastFence).trim();
            }
        }
        return s;
    }

    private static List<String> readStrings(JsonNode node) {
        List<String> out = new ArrayList<>();
        if (node.isArray()) for (JsonNode n : node) out.add(n.asText(""));
        return out;
    }
}

package com.tubeshadow.analysis.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.domain.KeyExpression;
import com.tubeshadow.analysis.domain.Vocabulary;
import com.tubeshadow.analysis.prompt.ClipAnalysisPrompt;
import com.tubeshadow.common.exception.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@EnableConfigurationProperties(ClaudeProperties.class)
public class ClaudeClient {

    private static final Logger log = LoggerFactory.getLogger(ClaudeClient.class);

    private final ClaudeProperties props;
    private final ObjectMapper objectMapper;
    private final RestClient http;

    public ClaudeClient(ClaudeProperties props, ObjectMapper objectMapper) {
        this.props = props;
        this.objectMapper = objectMapper;
        this.http = RestClient.builder()
                .baseUrl(props.baseUrl())
                .defaultHeader("anthropic-version", "2023-06-01")
                .defaultHeader("content-type", "application/json")
                .build();
    }

    public boolean isConfigured() {
        return props.apiKey() != null && !props.apiKey().isBlank();
    }

    public AnalysisResult analyzeClip(String transcript) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "CLAUDE_NOT_CONFIGURED",
                    "Anthropic API key가 설정되지 않았습니다");
        }

        // System message uses cache_control so the prompt itself is billed once per 5-minute window.
        Map<String, Object> body = Map.of(
                "model", props.model(),
                "max_tokens", 800,
                "system", List.of(Map.of(
                        "type", "text",
                        "text", ClipAnalysisPrompt.SYSTEM,
                        "cache_control", Map.of("type", "ephemeral")
                )),
                "messages", List.of(Map.of(
                        "role", "user",
                        "content", List.of(Map.of(
                                "type", "text",
                                "text", ClipAnalysisPrompt.userMessage(transcript)
                        ))
                ))
        );

        String raw;
        try {
            raw = http.post()
                    .uri("/v1/messages")
                    .header("x-api-key", props.apiKey())
                    .body(body)
                    .retrieve()
                    .body(String.class);
        } catch (Exception ex) {
            log.error("Claude API call failed", ex);
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "CLAUDE_CALL_FAILED",
                    "Claude 호출 실패: " + ex.getMessage());
        }

        return parseResponse(raw);
    }

    public AnalysisResult parseResponse(String rawResponse) {
        try {
            JsonNode root = objectMapper.readTree(rawResponse);
            StringBuilder textBuilder = new StringBuilder();
            JsonNode content = root.path("content");
            if (content.isArray()) {
                for (JsonNode block : content) {
                    if ("text".equals(block.path("type").asText())) {
                        textBuilder.append(block.path("text").asText());
                    }
                }
            }
            String text = stripCodeFence(textBuilder.toString().trim());
            JsonNode payload = objectMapper.readTree(text);

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

            return new AnalysisResult(grammar, exprs, vocab, summary);
        } catch (Exception ex) {
            log.warn("Claude response parsing failed: {}", ex.getMessage());
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "CLAUDE_PARSE_FAILED",
                    "Claude 응답 파싱 실패");
        }
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

    private static List<String> readStrings(JsonNode array) {
        List<String> out = new ArrayList<>();
        if (array.isArray()) {
            array.forEach(n -> {
                String v = n.asText();
                if (!v.isBlank()) out.add(v);
            });
        }
        return out;
    }

    public String model() {
        return props.model();
    }

    public record AnalysisResult(
            List<String> grammarNotes,
            List<KeyExpression> keyExpressions,
            List<Vocabulary> vocabulary,
            String contextSummary
    ) {
    }
}

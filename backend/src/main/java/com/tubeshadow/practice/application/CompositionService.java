package com.tubeshadow.practice.application;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.api.dto.ComposeFeedback;
import com.tubeshadow.practice.prompt.ComposePrompt;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

/**
 * "영작" check: send the learner's sentence + target to the configured AI provider and parse the
 * verdict. Reuses the analysis provider abstraction's low-level {@code complete()} — no DB, no
 * persistence; one synchronous call. If no provider key is configured the endpoint reports 503.
 */
@Service
public class CompositionService {

    private final AiAnalysisClient ai;
    private final ObjectMapper objectMapper;

    public CompositionService(AiAnalysisClient ai, ObjectMapper objectMapper) {
        this.ai = ai;
        this.objectMapper = objectMapper;
    }

    public ComposeFeedback check(String target, String gloss, String sentence) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(ComposePrompt.SYSTEM, ComposePrompt.userMessage(target, gloss, sentence));
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            return new ComposeFeedback(
                    n.path("ok").asBoolean(false),
                    n.path("usesTarget").asBoolean(false),
                    n.path("feedback").asText(""),
                    n.path("better").asText(""));
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "COMPOSE_PARSE_FAILED",
                    "AI 응답 파싱 실패");
        }
    }

    /**
     * Lenient grade of a spoken interview answer (explain a concept/code). Passes when the core idea
     * is understandable — imperfect or short English still counts; only a real error fails.
     */
    public InterviewCheckResponse interviewCheck(String question, String answer) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(InterviewPrompt.SYSTEM, InterviewPrompt.userMessage(question, answer));
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            return new InterviewCheckResponse(
                    n.path("ok").asBoolean(false),
                    n.path("score").asInt(0),
                    n.path("feedback").asText(""),
                    n.path("better").asText(""));
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "INTERVIEW_PARSE_FAILED",
                    "AI 응답 파싱 실패");
        }
    }

    /** Tolerate a ```json … ``` markdown fence around the JSON, which some models add. */
    static String stripFence(String s) {
        String t = s == null ? "" : s.trim();
        if (t.startsWith("```")) {
            int nl = t.indexOf('\n');
            if (nl >= 0) t = t.substring(nl + 1);
            if (t.endsWith("```")) t = t.substring(0, t.length() - 3);
        }
        return t.trim();
    }
}

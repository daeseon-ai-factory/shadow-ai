package com.tubeshadow.practice.application;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.api.dto.ComposeFeedback;
import com.tubeshadow.practice.api.dto.InterviewCheckResponse;
import com.tubeshadow.practice.api.dto.MockNextResponse;
import com.tubeshadow.practice.api.dto.ScenarioFeedback;
import com.tubeshadow.practice.prompt.ComposePrompt;
import com.tubeshadow.practice.prompt.InterviewPrompt;
import com.tubeshadow.practice.prompt.PrecisionPrompt;
import com.tubeshadow.practice.prompt.MockInterviewPrompt;
import com.tubeshadow.practice.prompt.ScenarioPrompt;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return interviewCheck(question, answer, false);
    }

    /** precision=true also surfaces preposition/article slips (opt-in; pass bar stays lenient). */
    public InterviewCheckResponse interviewCheck(String question, String answer, boolean precision) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String system = precision ? PrecisionPrompt.SYSTEM : InterviewPrompt.SYSTEM;
        String raw = ai.complete(system, InterviewPrompt.userMessage(question, answer));
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

    /**
     * Lenient grade of a scenario answer — the learner responded to a real-world situation in English.
     * Passes when the answer works in context; a different-but-valid answer is NOT penalized for not
     * matching the sample. Fills the output-practice gap (the drill used to show only the sample).
     */
    public ScenarioFeedback scenarioCheck(String situation, String koreanHint, String sample, String answer) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(ScenarioPrompt.SYSTEM,
                ScenarioPrompt.userMessage(situation, koreanHint, sample, answer));
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            return new ScenarioFeedback(
                    n.path("ok").asBoolean(false),
                    n.path("fits").asBoolean(false),
                    n.path("feedback").asText(""),
                    n.path("better").asText(""));
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "SCENARIO_PARSE_FAILED",
                    "AI 응답 파싱 실패");
        }
    }

    /**
     * Next interviewer question in the mock-interview loop — an opener on an empty history,
     * otherwise a follow-up digging into the candidate's last answer. One short question per call.
     */
    public MockNextResponse mockNext(List<MockInterviewPrompt.Turn> history, long seed) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(MockInterviewPrompt.SYSTEM, MockInterviewPrompt.userMessage(history, seed));
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            String q = n.path("question").asText("");
            if (q.isBlank()) throw new IllegalStateException("empty question");
            return new MockNextResponse(q);
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "MOCK_PARSE_FAILED",
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

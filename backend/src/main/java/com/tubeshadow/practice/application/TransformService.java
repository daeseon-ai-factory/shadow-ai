package com.tubeshadow.practice.application;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.api.dto.SentenceTransform;
import com.tubeshadow.practice.api.dto.SentenceTransformSetResponse;
import com.tubeshadow.practice.api.dto.TransformCheckResponse;
import com.tubeshadow.practice.domain.SentenceTransformSet;
import com.tubeshadow.practice.prompt.TransformPrompt;
import com.tubeshadow.practice.repository.SentenceTransformSetRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * The daily "sentence gym": generate (and cache) the 15-transform set for one seed sentence, and
 * optionally AI-check a learner's attempt at one transform. Reuses the provider-neutral
 * {@link AiAnalysisClient#complete} (retry/timeout/provider-selection come free) and
 * {@link CompositionService#stripFence} for the shared ```json fence tolerance.
 */
@Service
public class TransformService {

    /** 15 transforms × Korean glosses overflow the 600-token default and truncate the JSON. Give headroom. */
    private static final int GENERATE_MAX_TOKENS = 2000;

    private final AiAnalysisClient ai;
    private final ObjectMapper objectMapper;
    private final SentenceTransformSetRepository repository;

    public TransformService(AiAnalysisClient ai, ObjectMapper objectMapper,
                            SentenceTransformSetRepository repository) {
        this.ai = ai;
        this.objectMapper = objectMapper;
        this.repository = repository;
    }

    /** Generate, or replay from per-user cache, the 15-transform set for one seed sentence. */
    public SentenceTransformSetResponse generate(UUID userId, String baseSentence, String baseGloss) {
        String hash = hash(normalize(baseSentence));
        Optional<SentenceTransformSet> cached = repository.findByUserIdAndBaseHash(userId, hash);
        if (cached.isPresent()) {
            return toResponse(cached.get());
        }
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(TransformPrompt.SYSTEM_GENERATE,
                TransformPrompt.generateMessage(baseSentence, baseGloss), GENERATE_MAX_TOKENS);
        List<SentenceTransform> transforms = parseTransforms(raw);
        if (transforms.isEmpty()) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "TRANSFORM_PARSE_FAILED", "AI 응답 파싱 실패");
        }
        SentenceTransformSet saved = repository.save(SentenceTransformSet.create(
                userId, hash, baseSentence.trim(),
                (baseGloss == null || baseGloss.isBlank()) ? null : baseGloss.trim(),
                writeJson(transforms)));
        return toResponse(saved);
    }

    /** Optional per-transform self-check (opt-in; the default drill loop is self-grade reveal). */
    public TransformCheckResponse check(String op, String baseSentence, String model, String attempt) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(TransformPrompt.SYSTEM_CHECK,
                TransformPrompt.checkMessage(op, baseSentence, model, attempt));
        try {
            JsonNode n = objectMapper.readTree(CompositionService.stripFence(raw));
            return new TransformCheckResponse(
                    n.path("ok").asBoolean(false),
                    n.path("feedback").asText(""),
                    n.path("better").asText(""));
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "TRANSFORM_PARSE_FAILED", "AI 응답 파싱 실패");
        }
    }

    /**
     * Parse the model's {@code transforms[]} into canonical op order, tolerant of reordering, missing
     * items, and misspelled ops (unknown ops dropped; empty english skipped) — mirroring the defensive
     * JsonNode.path style used across the AI parsers, since claude-haiku/gemini occasionally drift.
     */
    private List<SentenceTransform> parseTransforms(String raw) {
        Map<String, JsonNode> byOp = new HashMap<>();
        try {
            JsonNode arr = objectMapper.readTree(CompositionService.stripFence(raw)).path("transforms");
            if (arr.isArray()) {
                for (JsonNode node : arr) {
                    String op = node.path("op").asText("");
                    if (!op.isBlank()) byOp.put(op, node);
                }
            }
        } catch (Exception ex) {
            return List.of();
        }
        List<SentenceTransform> out = new ArrayList<>();
        for (TransformPrompt.OpSpec spec : TransformPrompt.OPS) {
            JsonNode node = byOp.get(spec.op());
            if (node == null) continue;
            String english = node.path("english").asText("").trim();
            if (english.isBlank()) continue;
            out.add(new SentenceTransform(spec.op(), spec.label(), english,
                    node.path("koreanGloss").asText("").trim()));
        }
        return out;
    }

    private String writeJson(List<SentenceTransform> transforms) {
        try {
            return objectMapper.writeValueAsString(transforms);
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "TRANSFORM_SERIALIZE_FAILED",
                    "변형 직렬화 실패");
        }
    }

    private SentenceTransformSetResponse toResponse(SentenceTransformSet set) {
        List<SentenceTransform> transforms;
        try {
            transforms = objectMapper.readValue(set.getTransformsJson(),
                    new TypeReference<List<SentenceTransform>>() {});
        } catch (Exception ex) {
            transforms = List.of();
        }
        return new SentenceTransformSetResponse(set.getId().toString(), set.getBaseSentence(),
                set.getBaseGloss(), transforms);
    }

    /** Normalize before hashing so trivially different inputs (case, trailing/extra spaces) share a cache row. */
    private static String normalize(String s) {
        return s == null ? "" : s.trim().toLowerCase().replaceAll("\\s+", " ");
    }

    private static String hash(String s) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(md.digest(s.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception ex) {
            // SHA-256 is always present on the JVM; bounded fallback just in case.
            return Integer.toHexString(s.hashCode());
        }
    }
}

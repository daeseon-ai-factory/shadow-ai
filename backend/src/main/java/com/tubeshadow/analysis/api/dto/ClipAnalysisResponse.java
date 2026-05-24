package com.tubeshadow.analysis.api.dto;

import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.domain.KeyExpression;
import com.tubeshadow.analysis.domain.Vocabulary;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ClipAnalysisResponse(
        UUID id,
        UUID clipId,
        String status,
        List<String> grammarNotes,
        List<KeyExpression> keyExpressions,
        List<Vocabulary> vocabulary,
        String contextSummary,
        String model,
        Instant generatedAt,
        String errorMessage
) {
    public static ClipAnalysisResponse from(ClipAnalysis a) {
        return new ClipAnalysisResponse(
                a.getId(),
                a.getClipId(),
                a.getStatus().name(),
                a.getGrammarNotes(),
                a.getKeyExpressions(),
                a.getVocabulary(),
                a.getContextSummary(),
                a.getModel(),
                a.getGeneratedAt(),
                a.getErrorMessage()
        );
    }
}

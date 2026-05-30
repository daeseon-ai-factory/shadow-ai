package com.tubeshadow.analysis.infrastructure;

import com.tubeshadow.analysis.domain.ChunkPair;
import com.tubeshadow.analysis.domain.KeyExpression;
import com.tubeshadow.analysis.domain.PracticeScenario;
import com.tubeshadow.analysis.domain.Vocabulary;

import java.util.List;

/**
 * Provider-neutral analysis result. Both {@link GeminiClient} and {@link ClaudeClient}
 * return this, so {@link AiAnalysisClient} no longer leaks a concrete impl's nested type.
 */
public record AiAnalysisResult(
        List<String> grammarNotes,
        List<KeyExpression> keyExpressions,
        List<Vocabulary> vocabulary,
        String contextSummary,
        String primaryTranslation,
        List<ChunkPair> chunkedTranslation,
        PracticeScenario practiceScenario
) {
}

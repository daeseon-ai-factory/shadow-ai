package com.tubeshadow.practice.api.dto;

/** One produced sentence for one grammatical operation in a {@link SentenceTransformSetResponse}. */
public record SentenceTransform(
        String op,          // unique slot id, e.g. "question_why"
        String category,    // grouping category, e.g. "question" (drives core/extra filtering)
        String label,       // human label, e.g. "Question · why"
        String english,     // the transformed English model answer
        String koreanGloss  // short Korean gloss
) {
}

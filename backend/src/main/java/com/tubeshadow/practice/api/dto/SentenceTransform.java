package com.tubeshadow.practice.api.dto;

/** One produced sentence for one grammatical operation in a {@link SentenceTransformSetResponse}. */
public record SentenceTransform(
        String op,          // operation id, e.g. "relativeClause" (matches core TRANSFORM_OPS)
        String label,       // short English label, e.g. "Relative clause"
        String english,     // the transformed English model answer
        String koreanGloss  // short Korean gloss
) {
}

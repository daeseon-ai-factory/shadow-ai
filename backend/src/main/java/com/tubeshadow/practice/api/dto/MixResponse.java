package com.tubeshadow.practice.api.dto;

/** Result of a "조합" generation: one combined sentence + its Korean gloss, and whether all blocks fit. */
public record MixResponse(
        String sentence,
        String gloss,
        boolean usedAll,
        String note
) {
}

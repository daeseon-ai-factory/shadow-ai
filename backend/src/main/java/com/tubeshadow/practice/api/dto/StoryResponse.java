package com.tubeshadow.practice.api.dto;

/** Result of a "스토리 합성": one short coherent passage + its Korean gloss, and any leftover note. */
public record StoryResponse(
        String story,
        String gloss,
        String note
) {
}

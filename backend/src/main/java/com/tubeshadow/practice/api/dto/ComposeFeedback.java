package com.tubeshadow.practice.api.dto;

/** AI verdict on a composition attempt. */
public record ComposeFeedback(
        boolean ok,          // grammatical, natural, AND uses the target correctly
        boolean usesTarget,  // did the sentence actually use the target pattern/chunk
        String feedback,     // 1-2 short sentences
        String better        // a natural version using the target
) {
}

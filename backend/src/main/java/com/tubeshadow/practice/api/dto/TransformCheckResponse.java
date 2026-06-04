package com.tubeshadow.practice.api.dto;

/** AI verdict on a transform attempt (ComposeFeedback minus usesTarget). */
public record TransformCheckResponse(
        boolean ok,
        String feedback,
        String better
) {
}

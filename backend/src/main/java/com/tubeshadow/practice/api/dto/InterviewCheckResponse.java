package com.tubeshadow.practice.api.dto;

/**
 * Lenient verdict on a spoken interview answer. {@code ok} is true when the learner conveyed the
 * CORE idea understandably — imperfect English or an incomplete answer still passes. {@code better}
 * is empty when ok; otherwise it corrects ONLY the part that was actually wrong (no style nitpicks).
 */
public record InterviewCheckResponse(
        boolean ok,
        int score,
        String feedback,
        String better
) {
}

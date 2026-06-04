package com.tubeshadow.practice.api.dto;

/** AI verdict on a transform attempt: pass/fail + a 0-100 score + feedback + a better version. */
public record TransformCheckResponse(
        boolean ok,
        int score,
        String feedback,
        String better
) {
}

package com.tubeshadow.review.api.dto;

import com.tubeshadow.review.domain.ReviewItem;

import java.time.LocalDate;
import java.util.UUID;

/** Typed body for POST /api/review/items/{id}/respond — the updated SRS schedule. */
public record ReviewRespondResponse(
        UUID id,
        double easiness,
        int intervalDays,
        int repetitions,
        LocalDate dueDate
) {
    public static ReviewRespondResponse from(ReviewItem item) {
        return new ReviewRespondResponse(
                item.getId(), item.getEasiness(), item.getIntervalDays(),
                item.getRepetitions(), item.getDueDate());
    }
}

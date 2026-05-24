package com.tubeshadow.review.api.dto;

import com.tubeshadow.clip.api.dto.ClipResponse;
import com.tubeshadow.review.domain.ReviewItem;

import java.time.LocalDate;
import java.util.UUID;

public record ReviewQueueItem(
        UUID id,
        UUID clipId,
        double easiness,
        int intervalDays,
        int repetitions,
        LocalDate dueDate,
        ClipResponse clip
) {
    public static ReviewQueueItem of(ReviewItem item, ClipResponse clip) {
        return new ReviewQueueItem(
                item.getId(),
                item.getClipId(),
                item.getEasiness(),
                item.getIntervalDays(),
                item.getRepetitions(),
                item.getDueDate(),
                clip
        );
    }
}

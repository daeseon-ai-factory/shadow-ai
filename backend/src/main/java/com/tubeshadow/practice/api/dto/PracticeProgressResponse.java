package com.tubeshadow.practice.api.dto;

import com.tubeshadow.practice.domain.PracticeProgress;

import java.time.LocalDate;

/**
 * Practice progress as of {@code date} (the client's local date). {@code reps} is today's count
 * (0 after the day rolls over); {@code streak} is the live streak (0 if it has lapsed).
 */
public record PracticeProgressResponse(
        LocalDate date,
        int reps,
        int streak,
        int longestStreak,
        long totalReps
) {
    public static PracticeProgressResponse from(PracticeProgress p, LocalDate today) {
        return new PracticeProgressResponse(
                today,
                p.repsOn(today),
                p.effectiveStreak(today),
                p.getLongestStreak(),
                p.getTotalReps());
    }

    public static PracticeProgressResponse empty(LocalDate today) {
        return new PracticeProgressResponse(today, 0, 0, 0, 0);
    }
}

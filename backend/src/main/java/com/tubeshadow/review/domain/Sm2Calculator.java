package com.tubeshadow.review.domain;

import java.time.Clock;
import java.time.LocalDate;

/**
 * SuperMemo-2 implementation. Quality is 0..5 (Anki-style mapping: Again=1, Hard=3, Good=4, Easy=5).
 *
 * <p>Why a separate calculator (not a method on ReviewItem)? It is referentially transparent and
 * benefits from being a tight, deterministic unit testable without Spring or JPA.
 */
public final class Sm2Calculator {

    public static final double MIN_EASINESS = 1.3;

    private final Clock clock;

    public Sm2Calculator() {
        this(Clock.systemDefaultZone());
    }

    public Sm2Calculator(Clock clock) {
        this.clock = clock;
    }

    public Sm2Result apply(ReviewItem item, int quality) {
        if (quality < 0 || quality > 5) {
            throw new IllegalArgumentException("quality must be 0..5, got " + quality);
        }
        double easiness = item.getEasiness() + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (easiness < MIN_EASINESS) easiness = MIN_EASINESS;

        int repetitions;
        int intervalDays;
        if (quality < 3) {
            // Reset learning progress on bad recall but keep adjusted easiness.
            repetitions = 0;
            intervalDays = 1;
        } else {
            repetitions = item.getRepetitions() + 1;
            if (repetitions == 1) {
                intervalDays = 1;
            } else if (repetitions == 2) {
                intervalDays = 6;
            } else {
                int prev = Math.max(item.getIntervalDays(), 1);
                intervalDays = (int) Math.round(prev * easiness);
            }
        }
        LocalDate today = LocalDate.now(clock);
        LocalDate due = today.plusDays(intervalDays);
        return new Sm2Result(easiness, intervalDays, repetitions, due);
    }

    public record Sm2Result(double easiness, int intervalDays, int repetitions, LocalDate nextDueDate) {}
}

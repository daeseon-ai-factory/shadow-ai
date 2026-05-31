package com.tubeshadow.practice.api.dto;

import com.tubeshadow.practice.domain.PracticeCard;

import java.time.LocalDate;

/** One card's spaced-repetition state. The client computes "due" (dueDate &lt;= today) and
 *  "new" (a static card key with no state) from the full list. */
public record PracticeCardResponse(
        String cardKey,
        int box,
        LocalDate dueDate,
        int correctCount,
        int lapseCount
) {
    public static PracticeCardResponse from(PracticeCard c) {
        return new PracticeCardResponse(c.getCardKey(), c.getBox(), c.getDueDate(), c.getCorrectCount(), c.getLapseCount());
    }
}

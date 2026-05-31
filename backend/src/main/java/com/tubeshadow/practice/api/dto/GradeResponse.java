package com.tubeshadow.practice.api.dto;

/** Result of grading one card: the card's new SRS state + the updated daily streak (a graded
 *  card also counts as a rep today, so both move in one round-trip). */
public record GradeResponse(
        PracticeCardResponse card,
        PracticeProgressResponse progress
) {
}

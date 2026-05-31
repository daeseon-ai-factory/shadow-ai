package com.tubeshadow.practice.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

/**
 * One drill rep. {@code localDate} is the client's local calendar date so the streak follows the
 * learner's own midnight, not the server's. Optional — falls back to the server date if absent.
 */
public record PracticeRepRequest(
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate localDate
) {
}

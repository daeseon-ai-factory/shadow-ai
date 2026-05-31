package com.tubeshadow.practice.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/**
 * Grade one drill card. {@code correct} = the learner recalled it (Leitner promote) vs missed it
 * (demote). {@code localDate} is the client's local date (optional; falls back to server date).
 */
public record GradeRequest(
        @NotBlank @Size(max = 120) String cardKey,
        @NotNull Boolean correct,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate localDate
) {
}

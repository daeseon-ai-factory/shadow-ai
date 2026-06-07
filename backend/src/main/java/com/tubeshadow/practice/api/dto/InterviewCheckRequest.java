package com.tubeshadow.practice.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Request to grade a spoken interview answer. {@code question} is what the learner was asked to
 * explain (a concept, or the code itself — so the grader can judge correctness against it);
 * {@code answer} is the learner's spoken/typed explanation.
 */
public record InterviewCheckRequest(
        @NotBlank @Size(max = 3000) String question,
        @NotBlank @Size(max = 1000) String answer
) {
}

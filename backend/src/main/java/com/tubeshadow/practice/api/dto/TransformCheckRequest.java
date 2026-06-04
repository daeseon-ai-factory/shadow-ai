package com.tubeshadow.practice.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** A learner's attempt at one transform op, checked against the reference model. */
public record TransformCheckRequest(
        @NotBlank @Size(max = 40) String op,
        @NotBlank @Size(max = 600) String baseSentence,
        @NotBlank @Size(max = 600) String model,
        @NotBlank @Size(max = 600) String attempt
) {
}

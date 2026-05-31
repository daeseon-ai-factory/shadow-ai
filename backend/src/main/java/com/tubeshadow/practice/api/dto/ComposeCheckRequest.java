package com.tubeshadow.practice.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** A composition attempt: the learner's {@code sentence} written using {@code target} ({@code gloss}). */
public record ComposeCheckRequest(
        @NotBlank @Size(max = 160) String target,
        @Size(max = 160) String gloss,
        @NotBlank @Size(max = 600) String sentence
) {
}

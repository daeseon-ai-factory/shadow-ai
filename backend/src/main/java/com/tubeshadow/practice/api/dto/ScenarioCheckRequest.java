package com.tubeshadow.practice.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** A scenario answer: the learner's English {@code answer} responding to {@code situation}. */
public record ScenarioCheckRequest(
        @NotBlank @Size(max = 600) String situation,
        @Size(max = 300) String koreanHint,
        @Size(max = 600) String sample,
        @NotBlank @Size(max = 600) String answer
) {
}

package com.tubeshadow.practice.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Request to generate the 15-transform "sentence gym" set for one mined/typed base sentence. */
public record TransformGenerateRequest(
        @NotBlank @Size(max = 600) String baseSentence,
        @Size(max = 300) String baseGloss
) {
}

package com.tubeshadow.practice.api.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

/** A "조합" request: 2-4 English chunks to combine into one natural sentence. */
public record MixRequest(
        @NotEmpty @Size(min = 2, max = 4) List<@NotBlank @Size(max = 160) String> chunks
) {
}

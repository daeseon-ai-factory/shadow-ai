package com.tubeshadow.clip.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public record ClipCreateRequest(
        @NotNull UUID videoId,
        @Min(0) long startMs,
        @Min(1) long endMs,
        @NotBlank @Size(max = 200) String name,
        List<@Size(max = 50) String> tags
) {
}

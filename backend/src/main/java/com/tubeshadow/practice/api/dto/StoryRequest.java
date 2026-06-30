package com.tubeshadow.practice.api.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

/** A "스토리 합성" request: the chunks studied today (3-20) to weave into one short passage. */
public record StoryRequest(
        @NotEmpty @Size(min = 3, max = 20) List<@NotBlank @Size(max = 160) String> chunks
) {
}

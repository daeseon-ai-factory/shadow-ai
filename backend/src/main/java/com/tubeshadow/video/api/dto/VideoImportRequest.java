package com.tubeshadow.video.api.dto;

import jakarta.validation.constraints.NotBlank;

public record VideoImportRequest(@NotBlank String url) {
}

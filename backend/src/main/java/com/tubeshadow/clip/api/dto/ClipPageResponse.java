package com.tubeshadow.clip.api.dto;

import java.util.List;

public record ClipPageResponse(
        List<ClipResponse> items,
        long total,
        int page,
        int size
) {
}

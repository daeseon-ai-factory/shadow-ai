package com.tubeshadow.library.api.dto;

import java.util.List;

public record LibraryVideoPageResponse(
        List<LibraryVideoResponse> items,
        long total,
        int page,
        int size
) {
}

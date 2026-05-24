package com.tubeshadow.clip.api.dto;

import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * Partial update. Null fields are left unchanged so the client can send a single
 * property without overwriting others.
 */
public record ClipUpdateRequest(
        @Size(max = 200) String name,
        List<@Size(max = 50) String> tags,
        String transcript,
        String note
) {
}

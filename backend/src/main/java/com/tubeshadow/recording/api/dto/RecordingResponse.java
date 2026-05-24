package com.tubeshadow.recording.api.dto;

import com.tubeshadow.recording.domain.Recording;

import java.time.Instant;
import java.util.UUID;

public record RecordingResponse(
        UUID id,
        UUID clipId,
        long durationMs,
        long sizeBytes,
        String contentType,
        Instant createdAt
) {
    public static RecordingResponse from(Recording r) {
        return new RecordingResponse(
                r.getId(),
                r.getClipId(),
                r.getDurationMs(),
                r.getSizeBytes(),
                r.getContentType(),
                r.getCreatedAt()
        );
    }
}

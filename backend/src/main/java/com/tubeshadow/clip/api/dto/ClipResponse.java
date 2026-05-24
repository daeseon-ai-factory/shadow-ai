package com.tubeshadow.clip.api.dto;

import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.video.domain.Video;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ClipResponse(
        UUID id,
        UUID videoId,
        String youtubeId,
        String videoTitle,
        String thumbnailUrl,
        long startMs,
        long endMs,
        String name,
        List<String> tags,
        String transcript,
        String note,
        Instant createdAt
) {
    public static ClipResponse from(Clip clip, Video video) {
        return new ClipResponse(
                clip.getId(),
                clip.getVideoId(),
                video.getYoutubeId(),
                video.getTitle(),
                video.getThumbnailUrl(),
                clip.getStartMs(),
                clip.getEndMs(),
                clip.getName(),
                clip.getTags(),
                clip.getTranscript(),
                clip.getNote(),
                clip.getCreatedAt()
        );
    }
}

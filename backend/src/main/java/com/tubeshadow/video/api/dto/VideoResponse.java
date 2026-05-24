package com.tubeshadow.video.api.dto;

import com.tubeshadow.video.domain.TranscriptSegment;
import com.tubeshadow.video.domain.Video;

import java.util.List;
import java.util.UUID;

public record VideoResponse(
        UUID id,
        String youtubeId,
        String title,
        String channelName,
        Integer durationSeconds,
        String thumbnailUrl,
        Integer widthPx,
        Integer heightPx,
        String orientation,
        String transcriptStatus,
        List<TranscriptSegment> transcriptSegments,
        List<TranscriptSegment> sentences
) {
    public static VideoResponse from(Video v) {
        return new VideoResponse(
                v.getId(),
                v.getYoutubeId(),
                v.getTitle(),
                v.getChannelName(),
                v.getDurationSeconds(),
                v.getThumbnailUrl(),
                v.getWidthPx(),
                v.getHeightPx(),
                v.getOrientation(),
                v.getTranscriptStatus().name(),
                v.getTranscriptSegments(),
                v.getSentences()
        );
    }

    public static VideoResponse summary(Video v) {
        return new VideoResponse(
                v.getId(),
                v.getYoutubeId(),
                v.getTitle(),
                v.getChannelName(),
                v.getDurationSeconds(),
                v.getThumbnailUrl(),
                v.getWidthPx(),
                v.getHeightPx(),
                v.getOrientation(),
                v.getTranscriptStatus().name(),
                List.of(),
                List.of()
        );
    }
}

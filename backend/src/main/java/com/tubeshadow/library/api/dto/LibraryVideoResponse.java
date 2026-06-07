package com.tubeshadow.library.api.dto;

import com.tubeshadow.video.api.dto.VideoResponse;
import com.tubeshadow.video.domain.Video;

import java.time.Instant;

/**
 * One entry in the user's "My Videos" list: the lightweight video summary (no transcript payload),
 * when they saved it, and how many clips they've made from it (the badge in the list).
 */
public record LibraryVideoResponse(
        VideoResponse video,
        Instant savedAt,
        long clipCount
) {
    public static LibraryVideoResponse of(Video video, Instant savedAt, long clipCount) {
        return new LibraryVideoResponse(VideoResponse.summary(video), savedAt, clipCount);
    }
}

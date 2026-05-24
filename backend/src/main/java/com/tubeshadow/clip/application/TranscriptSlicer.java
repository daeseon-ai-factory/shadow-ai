package com.tubeshadow.clip.application;

import com.tubeshadow.video.domain.TranscriptSegment;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Extracts the text covering [startMs, endMs] from a video's transcript segments.
 * A segment is included when it overlaps the requested range at all.
 */
public final class TranscriptSlicer {

    private TranscriptSlicer() {}

    public static String slice(List<TranscriptSegment> segments, long startMs, long endMs) {
        if (segments == null || segments.isEmpty()) return "";
        return segments.stream()
                .filter(seg -> seg.endMs() > startMs && seg.startMs() < endMs)
                .map(TranscriptSegment::text)
                .collect(Collectors.joining(" "));
    }
}

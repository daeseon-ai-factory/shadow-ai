package com.tubeshadow.video.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record TranscriptSegment(long startMs, long endMs, String text) {

    @JsonCreator
    public static TranscriptSegment of(
            @JsonProperty("startMs") long startMs,
            @JsonProperty("endMs") long endMs,
            @JsonProperty("text") String text) {
        return new TranscriptSegment(startMs, endMs, text);
    }
}

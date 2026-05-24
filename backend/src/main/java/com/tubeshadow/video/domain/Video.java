package com.tubeshadow.video.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "videos", uniqueConstraints = {
        @UniqueConstraint(name = "uk_videos_youtube_id", columnNames = "youtube_id")
})
public class Video extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "youtube_id", nullable = false, length = 32)
    private String youtubeId;

    @Column(name = "title", nullable = false, length = 500)
    private String title;

    @Column(name = "channel_name", length = 255)
    private String channelName;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    /** Pixel width as reported by yt-dlp; null if probe failed. */
    @Column(name = "width_px")
    private Integer widthPx;

    /** Pixel height as reported by yt-dlp; null if probe failed. */
    @Column(name = "height_px")
    private Integer heightPx;

    @Enumerated(EnumType.STRING)
    @Column(name = "transcript_status", nullable = false, length = 32)
    private TranscriptStatus transcriptStatus = TranscriptStatus.PENDING;

    /**
     * Transcript segments serialized as JSONB. List of {startMs, endMs, text}.
     * Stored on Video (not a separate table) because we always read them as a unit
     * and never query individual segments.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "transcript_segments", columnDefinition = "jsonb")
    private List<TranscriptSegment> transcriptSegments = Collections.emptyList();

    protected Video() {
    }

    private Video(UUID id, String youtubeId, String title) {
        this.id = id;
        this.youtubeId = youtubeId;
        this.title = title;
    }

    public static Video createNew(String youtubeId, String title) {
        return new Video(UUID.randomUUID(), youtubeId, title);
    }

    public void applyMetadata(String channelName, Integer durationSeconds, String thumbnailUrl) {
        this.channelName = channelName;
        this.durationSeconds = durationSeconds;
        this.thumbnailUrl = thumbnailUrl;
    }

    public void applyDimensions(Integer widthPx, Integer heightPx, Integer durationSeconds) {
        if (widthPx != null) this.widthPx = widthPx;
        if (heightPx != null) this.heightPx = heightPx;
        if (durationSeconds != null && this.durationSeconds == null) this.durationSeconds = durationSeconds;
    }

    /** True when the video is taller than it is wide — Shorts and most vertical content. */
    public boolean isPortrait() {
        return widthPx != null && heightPx != null && heightPx > widthPx;
    }

    public Integer getWidthPx() { return widthPx; }
    public Integer getHeightPx() { return heightPx; }

    public String getOrientation() {
        if (widthPx == null || heightPx == null) return "UNKNOWN";
        return heightPx > widthPx ? "PORTRAIT" : "LANDSCAPE";
    }

    public void attachTranscript(List<TranscriptSegment> segments) {
        this.transcriptSegments = segments == null ? Collections.emptyList() : List.copyOf(segments);
        this.transcriptStatus = TranscriptStatus.READY;
    }

    public void markTranscriptUnavailable() {
        this.transcriptSegments = Collections.emptyList();
        this.transcriptStatus = TranscriptStatus.UNAVAILABLE;
    }

    public UUID getId() {
        return id;
    }

    public String getYoutubeId() {
        return youtubeId;
    }

    public String getTitle() {
        return title;
    }

    public String getChannelName() {
        return channelName;
    }

    public Integer getDurationSeconds() {
        return durationSeconds;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public TranscriptStatus getTranscriptStatus() {
        return transcriptStatus;
    }

    public List<TranscriptSegment> getTranscriptSegments() {
        return transcriptSegments == null ? Collections.emptyList() : transcriptSegments;
    }

    /**
     * Sentence-level view of the transcript, derived on the fly from raw segments.
     * See {@link SentenceMerger} for the merging rules. Cheap (O(n), no IO),
     * deterministic — safe to call on every request.
     */
    public List<TranscriptSegment> getSentences() {
        return SentenceMerger.merge(getTranscriptSegments());
    }

    public enum TranscriptStatus {
        PENDING, READY, UNAVAILABLE
    }
}

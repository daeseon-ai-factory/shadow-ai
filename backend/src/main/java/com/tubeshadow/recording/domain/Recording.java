package com.tubeshadow.recording.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "recordings", indexes = {
        @Index(name = "idx_recordings_user_id", columnList = "user_id"),
        @Index(name = "idx_recordings_clip_id", columnList = "clip_id")
})
public class Recording extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "clip_id", nullable = false)
    private UUID clipId;

    @Column(name = "file_path", nullable = false, length = 500)
    private String filePath;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Column(name = "duration_ms", nullable = false)
    private long durationMs;

    @Column(name = "size_bytes", nullable = false)
    private long sizeBytes;

    protected Recording() {
    }

    private Recording(UUID id, UUID userId, UUID clipId, String filePath,
                      String contentType, long durationMs, long sizeBytes) {
        this.id = id;
        this.userId = userId;
        this.clipId = clipId;
        this.filePath = filePath;
        this.contentType = contentType;
        this.durationMs = durationMs;
        this.sizeBytes = sizeBytes;
    }

    public static Recording createNew(UUID userId, UUID clipId, String filePath,
                                      String contentType, long durationMs, long sizeBytes) {
        return new Recording(UUID.randomUUID(), userId, clipId, filePath, contentType, durationMs, sizeBytes);
    }

    public UUID getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public UUID getClipId() {
        return clipId;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getContentType() {
        return contentType;
    }

    public long getDurationMs() {
        return durationMs;
    }

    public long getSizeBytes() {
        return sizeBytes;
    }
}

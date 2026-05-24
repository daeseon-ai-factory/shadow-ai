package com.tubeshadow.clip.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "clips", indexes = {
        @Index(name = "idx_clips_user_id", columnList = "user_id"),
        @Index(name = "idx_clips_video_id", columnList = "video_id")
})
public class Clip extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "video_id", nullable = false)
    private UUID videoId;

    @Column(name = "start_ms", nullable = false)
    private long startMs;

    @Column(name = "end_ms", nullable = false)
    private long endMs;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "tags", columnDefinition = "jsonb")
    private List<String> tags = Collections.emptyList();

    @Column(name = "transcript", columnDefinition = "text")
    private String transcript;

    protected Clip() {
    }

    private Clip(UUID id, UUID userId, UUID videoId, long startMs, long endMs, String name) {
        this.id = id;
        this.userId = userId;
        this.videoId = videoId;
        this.startMs = startMs;
        this.endMs = endMs;
        this.name = name;
    }

    public static Clip createNew(UUID userId, UUID videoId, long startMs, long endMs, String name, List<String> tags) {
        if (endMs <= startMs) {
            throw new IllegalArgumentException("endMs must be greater than startMs");
        }
        Clip clip = new Clip(UUID.randomUUID(), userId, videoId, startMs, endMs, name);
        clip.tags = tags == null ? Collections.emptyList() : List.copyOf(tags);
        return clip;
    }

    public void attachTranscript(String transcript) {
        this.transcript = transcript;
    }

    public void rename(String name) {
        this.name = name;
    }

    public void updateTags(List<String> tags) {
        this.tags = tags == null ? Collections.emptyList() : List.copyOf(tags);
    }

    public UUID getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public UUID getVideoId() {
        return videoId;
    }

    public long getStartMs() {
        return startMs;
    }

    public long getEndMs() {
        return endMs;
    }

    public String getName() {
        return name;
    }

    public List<String> getTags() {
        return tags == null ? Collections.emptyList() : tags;
    }

    public String getTranscript() {
        return transcript;
    }
}

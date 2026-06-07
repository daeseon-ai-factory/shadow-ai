package com.tubeshadow.library.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

import java.util.UUID;

/**
 * A user's saved pointer to a (globally-cached) video. This is what turns "videos I imported" into
 * a first-class, reopenable list — see V20 migration. The actual video + transcript live on the
 * shared {@code videos} row; this just records that THIS user has it in their library, and when.
 */
@Entity
@Table(name = "library_videos", indexes = {
        @Index(name = "idx_library_videos_user", columnList = "user_id")
})
public class LibraryVideo extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "video_id", nullable = false)
    private UUID videoId;

    protected LibraryVideo() {
    }

    private LibraryVideo(UUID id, UUID userId, UUID videoId) {
        this.id = id;
        this.userId = userId;
        this.videoId = videoId;
    }

    public static LibraryVideo createNew(UUID userId, UUID videoId) {
        return new LibraryVideo(UUID.randomUUID(), userId, videoId);
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
}

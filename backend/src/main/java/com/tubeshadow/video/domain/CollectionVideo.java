package com.tubeshadow.video.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "collection_videos")
public class CollectionVideo {

    @EmbeddedId
    private Key id;

    @Column(name = "position", nullable = false)
    private int position;

    @Column(name = "category", length = 60)
    private String category;

    protected CollectionVideo() {}

    private CollectionVideo(UUID collectionId, UUID videoId, int position, String category) {
        this.id = new Key(collectionId, videoId);
        this.position = position;
        this.category = category;
    }

    public static CollectionVideo of(UUID collectionId, UUID videoId, int position, String category) {
        return new CollectionVideo(collectionId, videoId, position, category);
    }

    public UUID getCollectionId() { return id.collectionId; }
    public UUID getVideoId() { return id.videoId; }
    public int getPosition() { return position; }
    public String getCategory() { return category; }

    @Embeddable
    public static class Key implements Serializable {
        @Column(name = "collection_id", nullable = false) private UUID collectionId;
        @Column(name = "video_id", nullable = false) private UUID videoId;

        public Key() {}
        public Key(UUID collectionId, UUID videoId) {
            this.collectionId = collectionId;
            this.videoId = videoId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Key key)) return false;
            return Objects.equals(collectionId, key.collectionId) && Objects.equals(videoId, key.videoId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(collectionId, videoId);
        }
    }
}

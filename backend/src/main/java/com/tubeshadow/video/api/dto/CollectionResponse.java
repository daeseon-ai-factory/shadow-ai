package com.tubeshadow.video.api.dto;

import com.tubeshadow.video.domain.Collection;

import java.util.List;
import java.util.UUID;

public record CollectionResponse(
        UUID id,
        String slug,
        String name,
        String description,
        List<CollectionVideoEntry> videos
) {
    public static CollectionResponse summary(Collection c) {
        return new CollectionResponse(c.getId(), c.getSlug(), c.getName(), c.getDescription(), List.of());
    }

    public static CollectionResponse withVideos(Collection c, List<CollectionVideoEntry> videos) {
        return new CollectionResponse(c.getId(), c.getSlug(), c.getName(), c.getDescription(), videos);
    }

    public record CollectionVideoEntry(int position, String category, VideoResponse video) {}
}

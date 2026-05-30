package com.tubeshadow.video.application;

import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.video.api.dto.CollectionResponse;
import com.tubeshadow.video.api.dto.VideoResponse;
import com.tubeshadow.video.domain.Collection;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.CollectionRepository;
import com.tubeshadow.video.repository.CollectionVideoRepository;
import com.tubeshadow.video.repository.VideoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Curated-collection reads. Extracted from CollectionController so the collection domain
 * follows the same Controller → Service → Repository layering as every other domain (the
 * controller no longer holds transactions or talks to three repositories directly).
 */
@Service
public class CollectionService {

    private final CollectionRepository collections;
    private final CollectionVideoRepository collectionVideos;
    private final VideoRepository videoRepository;

    public CollectionService(CollectionRepository collections,
                             CollectionVideoRepository collectionVideos,
                             VideoRepository videoRepository) {
        this.collections = collections;
        this.collectionVideos = collectionVideos;
        this.videoRepository = videoRepository;
    }

    @Transactional(readOnly = true)
    public List<CollectionResponse> listPublic() {
        return collections.findByIsPublicTrueOrderByNameAsc().stream()
                .map(CollectionResponse::summary)
                .toList();
    }

    @Transactional(readOnly = true)
    public CollectionResponse getByIdOrSlug(String idOrSlug) {
        Collection collection = resolve(idOrSlug);
        var entries = collectionVideos.findByIdCollectionIdOrderByPositionAsc(collection.getId());
        Map<UUID, Video> videos = videoRepository.findAllById(
                entries.stream().map(e -> e.getVideoId()).toList()
        ).stream().collect(Collectors.toMap(Video::getId, v -> v));

        List<CollectionResponse.CollectionVideoEntry> entryResponses = entries.stream()
                .map(cv -> {
                    Video v = videos.get(cv.getVideoId());
                    if (v == null) return null;
                    return new CollectionResponse.CollectionVideoEntry(
                            cv.getPosition(), cv.getCategory(), VideoResponse.summary(v));
                })
                .filter(Objects::nonNull)
                .toList();
        return CollectionResponse.withVideos(collection, entryResponses);
    }

    private Collection resolve(String idOrSlug) {
        try {
            UUID id = UUID.fromString(idOrSlug);
            return collections.findById(id)
                    .orElseThrow(() -> new NotFoundException("COLLECTION_NOT_FOUND", "컬렉션이 없습니다"));
        } catch (IllegalArgumentException ignored) {
            return collections.findBySlug(idOrSlug)
                    .orElseThrow(() -> new NotFoundException("COLLECTION_NOT_FOUND", "컬렉션이 없습니다"));
        }
    }
}

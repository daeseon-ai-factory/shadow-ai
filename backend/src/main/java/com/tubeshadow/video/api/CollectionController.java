package com.tubeshadow.video.api;

import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.video.api.dto.CollectionResponse;
import com.tubeshadow.video.api.dto.VideoResponse;
import com.tubeshadow.video.domain.Collection;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.CollectionRepository;
import com.tubeshadow.video.repository.CollectionVideoRepository;
import com.tubeshadow.video.repository.VideoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/collections")
@Tag(name = "Collection", description = "큐레이션 컬렉션")
@SecurityRequirement(name = "bearerAuth")
public class CollectionController {

    private final CollectionRepository collections;
    private final CollectionVideoRepository collectionVideos;
    private final VideoRepository videoRepository;

    public CollectionController(CollectionRepository collections,
                                CollectionVideoRepository collectionVideos,
                                VideoRepository videoRepository) {
        this.collections = collections;
        this.collectionVideos = collectionVideos;
        this.videoRepository = videoRepository;
    }

    @GetMapping
    @Operation(summary = "공개 컬렉션 목록")
    public ApiResponse<List<CollectionResponse>> list() {
        return ApiResponse.ok(collections.findByIsPublicTrueOrderByNameAsc().stream()
                .map(CollectionResponse::summary)
                .toList());
    }

    @GetMapping("/{idOrSlug}")
    @Operation(summary = "컬렉션 + 영상 목록")
    @Transactional(readOnly = true)
    public ApiResponse<CollectionResponse> get(@PathVariable String idOrSlug) {
        Collection collection = resolveCollection(idOrSlug);
        var entries = collectionVideos.findByIdCollectionIdOrderByPositionAsc(collection.getId());
        Map<UUID, Video> videos = videoRepository.findAllById(
                entries.stream().map(e -> e.getVideoId()).toList()
        ).stream().collect(java.util.stream.Collectors.toMap(Video::getId, v -> v));

        var entryResponses = entries.stream()
                .map(cv -> {
                    Video v = videos.get(cv.getVideoId());
                    if (v == null) return null;
                    return new CollectionResponse.CollectionVideoEntry(
                            cv.getPosition(), cv.getCategory(), VideoResponse.summary(v));
                })
                .filter(java.util.Objects::nonNull)
                .toList();
        return ApiResponse.ok(CollectionResponse.withVideos(collection, entryResponses));
    }

    private Collection resolveCollection(String idOrSlug) {
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

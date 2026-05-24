package com.tubeshadow.video.repository;

import com.tubeshadow.video.domain.CollectionVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CollectionVideoRepository extends JpaRepository<CollectionVideo, CollectionVideo.Key> {

    List<CollectionVideo> findByIdCollectionIdOrderByPositionAsc(UUID collectionId);
}

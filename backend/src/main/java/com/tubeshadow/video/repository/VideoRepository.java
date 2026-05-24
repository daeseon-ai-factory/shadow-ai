package com.tubeshadow.video.repository;

import com.tubeshadow.video.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface VideoRepository extends JpaRepository<Video, UUID> {

    Optional<Video> findByYoutubeId(String youtubeId);

    boolean existsByYoutubeId(String youtubeId);
}

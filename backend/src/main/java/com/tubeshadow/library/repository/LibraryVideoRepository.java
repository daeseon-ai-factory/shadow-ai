package com.tubeshadow.library.repository;

import com.tubeshadow.library.domain.LibraryVideo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface LibraryVideoRepository extends JpaRepository<LibraryVideo, UUID> {

    boolean existsByUserIdAndVideoId(UUID userId, UUID videoId);

    Optional<LibraryVideo> findByUserIdAndVideoId(UUID userId, UUID videoId);

    Page<LibraryVideo> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);

    void deleteByUserIdAndVideoId(UUID userId, UUID videoId);
}

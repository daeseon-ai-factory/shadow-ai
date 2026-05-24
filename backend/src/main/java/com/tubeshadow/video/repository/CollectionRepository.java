package com.tubeshadow.video.repository;

import com.tubeshadow.video.domain.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CollectionRepository extends JpaRepository<Collection, UUID> {

    List<Collection> findByIsPublicTrueOrderByNameAsc();

    Optional<Collection> findBySlug(String slug);
}

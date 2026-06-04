package com.tubeshadow.practice.repository;

import com.tubeshadow.practice.domain.SentenceTransformSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SentenceTransformSetRepository extends JpaRepository<SentenceTransformSet, UUID> {

    /** Cache hit lookup — one generation call per unique (user, normalized seed). */
    Optional<SentenceTransformSet> findByUserIdAndBaseHash(UUID userId, String baseHash);
}

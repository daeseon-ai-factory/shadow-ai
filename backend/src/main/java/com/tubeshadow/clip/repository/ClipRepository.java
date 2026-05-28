package com.tubeshadow.clip.repository;

import com.tubeshadow.clip.domain.Clip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClipRepository extends JpaRepository<Clip, UUID> {

    Page<Clip> findByUserId(UUID userId, Pageable pageable);

    Optional<Clip> findByIdAndUserId(UUID id, UUID userId);

    List<Clip> findByUserIdAndVideoId(UUID userId, UUID videoId);

    long countByUserId(UUID userId);

    /** Count clips inside a specific deck. */
    long countByUserIdAndDeckId(UUID userId, UUID deckId);

    /** Count "Inbox" — clips with no deck assigned. */
    long countByUserIdAndDeckIdIsNull(UUID userId);

    /**
     * Case-insensitive search across clip name + transcript for the given user.
     * Tag filter is applied via JSONB containment when provided.
     * Sort order is controlled by {@code sortOrder}: "newest" (default), "oldest", "name", "duration".
     */
    @Query(value = """
            SELECT * FROM clips c
            WHERE c.user_id = :userId
              AND (:q IS NULL OR :q = '' OR
                   LOWER(c.name) LIKE LOWER(CONCAT('%', :q, '%')) OR
                   LOWER(COALESCE(c.transcript, '')) LIKE LOWER(CONCAT('%', :q, '%')))
              AND (:tag IS NULL OR :tag = '' OR c.tags @> CAST(CONCAT('["', :tag, '"]') AS jsonb))
            ORDER BY
                CASE WHEN :sortOrder = 'oldest'  THEN c.created_at END ASC,
                CASE WHEN :sortOrder = 'name'    THEN LOWER(c.name) END ASC,
                CASE WHEN :sortOrder = 'duration' THEN (c.end_ms - c.start_ms) END DESC,
                CASE WHEN :sortOrder NOT IN ('oldest','name','duration') OR :sortOrder IS NULL
                     THEN c.created_at END DESC
            """,
            countQuery = """
            SELECT COUNT(*) FROM clips c
            WHERE c.user_id = :userId
              AND (:q IS NULL OR :q = '' OR
                   LOWER(c.name) LIKE LOWER(CONCAT('%', :q, '%')) OR
                   LOWER(COALESCE(c.transcript, '')) LIKE LOWER(CONCAT('%', :q, '%')))
              AND (:tag IS NULL OR :tag = '' OR c.tags @> CAST(CONCAT('["', :tag, '"]') AS jsonb))
            """,
            nativeQuery = true)
    Page<Clip> search(@Param("userId") UUID userId,
                      @Param("q") String q,
                      @Param("tag") String tag,
                      @Param("sortOrder") String sortOrder,
                      Pageable pageable);
}

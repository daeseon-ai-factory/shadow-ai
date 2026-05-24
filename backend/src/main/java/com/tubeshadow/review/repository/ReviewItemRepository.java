package com.tubeshadow.review.repository;

import com.tubeshadow.review.domain.ReviewItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReviewItemRepository extends JpaRepository<ReviewItem, UUID> {

    List<ReviewItem> findByUserIdAndDueDateLessThanEqualOrderByDueDateAsc(UUID userId, LocalDate cutoff);

    long countByUserIdAndDueDateLessThanEqual(UUID userId, LocalDate cutoff);

    Optional<ReviewItem> findByUserIdAndClipId(UUID userId, UUID clipId);

    Optional<ReviewItem> findByIdAndUserId(UUID id, UUID userId);

    /**
     * Explicit DELETE that does NOT load entities first. Loading entities would race
     * with the parent clip's DB-level CASCADE and throw StaleObjectStateException.
     */
    @Modifying
    @Query("delete from ReviewItem r where r.clipId = :clipId")
    void deleteByClipId(@Param("clipId") UUID clipId);

    /**
     * For streak calculation — distinct dates where the user reviewed at least once.
     */
    @Query("select distinct function('date', r.lastReviewedAt) from ReviewItem r " +
            "where r.userId = :userId and r.lastReviewedAt is not null " +
            "order by function('date', r.lastReviewedAt) desc")
    List<Object> findReviewDatesByUserId(@Param("userId") UUID userId);
}

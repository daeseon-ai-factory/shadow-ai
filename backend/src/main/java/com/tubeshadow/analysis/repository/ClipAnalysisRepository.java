package com.tubeshadow.analysis.repository;

import com.tubeshadow.analysis.domain.ClipAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ClipAnalysisRepository extends JpaRepository<ClipAnalysis, UUID> {

    Optional<ClipAnalysis> findByClipId(UUID clipId);

    /**
     * Explicit DELETE that does NOT load entities first. Derived deleteByClipId would
     * load entities into the session and then race with the cascade DELETE on clips,
     * triggering StaleObjectStateException at flush time.
     */
    @Modifying
    @Query("delete from ClipAnalysis a where a.clipId = :clipId")
    void deleteByClipId(@Param("clipId") UUID clipId);
}

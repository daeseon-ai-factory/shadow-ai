package com.tubeshadow.analysis.repository;

import com.tubeshadow.analysis.domain.ClipAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ClipAnalysisRepository extends JpaRepository<ClipAnalysis, UUID> {

    Optional<ClipAnalysis> findByClipId(UUID clipId);

    void deleteByClipId(UUID clipId);
}

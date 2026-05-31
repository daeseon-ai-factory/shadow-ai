package com.tubeshadow.practice.repository;

import com.tubeshadow.practice.domain.PracticeProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PracticeProgressRepository extends JpaRepository<PracticeProgress, UUID> {

    Optional<PracticeProgress> findByUserId(UUID userId);
}

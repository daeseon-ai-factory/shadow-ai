package com.tubeshadow.practice.repository;

import com.tubeshadow.practice.domain.PracticeCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PracticeCardRepository extends JpaRepository<PracticeCard, UUID> {

    List<PracticeCard> findByUserId(UUID userId);

    Optional<PracticeCard> findByUserIdAndCardKey(UUID userId, String cardKey);
}

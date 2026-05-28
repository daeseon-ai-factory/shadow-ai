package com.tubeshadow.deck.repository;

import com.tubeshadow.deck.domain.Deck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DeckRepository extends JpaRepository<Deck, UUID> {

    List<Deck> findByUserIdOrderByNameAsc(UUID userId);

    Optional<Deck> findByIdAndUserId(UUID id, UUID userId);

    boolean existsByUserIdAndName(UUID userId, String name);
}

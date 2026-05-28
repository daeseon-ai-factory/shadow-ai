package com.tubeshadow.deck.api.dto;

import com.tubeshadow.deck.domain.Deck;

import java.time.Instant;
import java.util.UUID;

public record DeckResponse(
        UUID id,
        String name,
        String description,
        long clipCount,
        Instant createdAt
) {
    public static DeckResponse from(Deck d, long clipCount) {
        return new DeckResponse(d.getId(), d.getName(), d.getDescription(), clipCount, d.getCreatedAt());
    }
}

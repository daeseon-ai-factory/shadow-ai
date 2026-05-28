package com.tubeshadow.deck.api.dto;

import java.util.UUID;

/** {@code deckId} = null → move back to the implicit "Inbox" (deck_id NULL). */
public record MoveClipRequest(UUID deckId) {
}

package com.tubeshadow.deck.application;

import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.deck.domain.Deck;
import com.tubeshadow.deck.repository.DeckRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class DeckService {

    private final DeckRepository deckRepository;
    private final ClipRepository clipRepository;

    public DeckService(DeckRepository deckRepository, ClipRepository clipRepository) {
        this.deckRepository = deckRepository;
        this.clipRepository = clipRepository;
    }

    @Transactional
    public Deck create(UUID userId, String name, String description) {
        String trimmed = name == null ? "" : name.trim();
        if (trimmed.isEmpty()) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "DECK_NAME_REQUIRED",
                    "덱 이름이 필요합니다");
        }
        if (deckRepository.existsByUserIdAndName(userId, trimmed)) {
            throw new BusinessException(HttpStatus.CONFLICT, "DECK_NAME_DUPLICATE",
                    "같은 이름의 덱이 이미 있습니다: " + trimmed);
        }
        return deckRepository.save(Deck.createNew(userId, trimmed, description));
    }

    @Transactional(readOnly = true)
    public List<Deck> list(UUID userId) {
        return deckRepository.findByUserIdOrderByNameAsc(userId);
    }

    @Transactional
    public Deck rename(UUID userId, UUID deckId, String newName) {
        Deck deck = ownedOrThrow(userId, deckId);
        String trimmed = newName == null ? "" : newName.trim();
        if (trimmed.isEmpty()) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "DECK_NAME_REQUIRED",
                    "덱 이름이 필요합니다");
        }
        if (!trimmed.equals(deck.getName())
                && deckRepository.existsByUserIdAndName(userId, trimmed)) {
            throw new BusinessException(HttpStatus.CONFLICT, "DECK_NAME_DUPLICATE",
                    "같은 이름의 덱이 이미 있습니다: " + trimmed);
        }
        deck.rename(trimmed);
        return deck;
    }

    @Transactional
    public void delete(UUID userId, UUID deckId) {
        Deck deck = ownedOrThrow(userId, deckId);
        // DB CASCADE SET NULL on clips.deck_id keeps the clips alive (they fall back to Inbox).
        deckRepository.delete(deck);
    }

    /**
     * Move a clip to a deck (or to Inbox if deckId is null). Verifies both clip and deck
     * belong to this user.
     */
    @Transactional
    public void moveClip(UUID userId, UUID clipId, UUID deckId) {
        var clip = clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "클립이 없습니다"));
        if (deckId != null) {
            // Verify the target deck belongs to this user
            ownedOrThrow(userId, deckId);
        }
        clip.moveToDeck(deckId);
    }

    private Deck ownedOrThrow(UUID userId, UUID deckId) {
        return deckRepository.findByIdAndUserId(deckId, userId)
                .orElseThrow(() -> new NotFoundException("DECK_NOT_FOUND", "덱이 없습니다"));
    }
}

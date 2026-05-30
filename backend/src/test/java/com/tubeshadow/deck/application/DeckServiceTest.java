package com.tubeshadow.deck.application;

import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.deck.repository.DeckRepository;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * moveClip is a cross-entity isolation boundary: it must reject both a clip the caller
 * doesn't own and a target deck the caller doesn't own.
 */
class DeckServiceTest {

    private final DeckRepository deckRepo = mock(DeckRepository.class);
    private final ClipRepository clipRepo = mock(ClipRepository.class);
    private final DeckService service = new DeckService(deckRepo, clipRepo);

    @Test
    void moveClipRejectsClipNotOwnedByUser() {
        UUID userId = UUID.randomUUID();
        UUID clipId = UUID.randomUUID();
        when(clipRepo.findByIdAndUserId(clipId, userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.moveClip(userId, clipId, UUID.randomUUID()))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void moveClipRejectsTargetDeckNotOwnedByUser() {
        UUID userId = UUID.randomUUID();
        UUID clipId = UUID.randomUUID();
        UUID deckId = UUID.randomUUID();
        // Clip is owned by the user...
        when(clipRepo.findByIdAndUserId(clipId, userId)).thenReturn(Optional.of(mock(Clip.class)));
        // ...but the target deck belongs to someone else.
        when(deckRepo.findByIdAndUserId(deckId, userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.moveClip(userId, clipId, deckId))
                .isInstanceOf(NotFoundException.class);
    }
}

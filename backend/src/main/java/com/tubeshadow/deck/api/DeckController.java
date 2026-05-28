package com.tubeshadow.deck.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.deck.api.dto.DeckRequest;
import com.tubeshadow.deck.api.dto.DeckResponse;
import com.tubeshadow.deck.api.dto.MoveClipRequest;
import com.tubeshadow.deck.application.DeckService;
import com.tubeshadow.deck.domain.Deck;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/decks")
@Tag(name = "Deck", description = "Anki-style 덱 (클립 그룹) 관리")
@SecurityRequirement(name = "bearerAuth")
public class DeckController {

    private final DeckService deckService;
    private final ClipRepository clipRepository;

    public DeckController(DeckService deckService, ClipRepository clipRepository) {
        this.deckService = deckService;
        this.clipRepository = clipRepository;
    }

    @PostMapping
    @Operation(summary = "덱 생성")
    public ResponseEntity<ApiResponse<DeckResponse>> create(
            @Valid @RequestBody DeckRequest req,
            @CurrentUser AuthenticatedUser user) {
        Deck deck = deckService.create(user.id(), req.name(), req.description());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(DeckResponse.from(deck, 0)));
    }

    @GetMapping
    @Operation(summary = "내 덱 목록 (각 덱의 클립 수 포함)")
    public ApiResponse<List<DeckResponse>> list(@CurrentUser AuthenticatedUser user) {
        List<DeckResponse> out = deckService.list(user.id()).stream()
                .map(d -> DeckResponse.from(d, clipRepository.countByUserIdAndDeckId(user.id(), d.getId())))
                .toList();
        return ApiResponse.ok(out);
    }

    @PatchMapping("/{deckId}")
    @Operation(summary = "덱 이름 변경")
    public ApiResponse<DeckResponse> rename(@PathVariable UUID deckId,
                                            @Valid @RequestBody DeckRequest req,
                                            @CurrentUser AuthenticatedUser user) {
        Deck deck = deckService.rename(user.id(), deckId, req.name());
        long count = clipRepository.countByUserIdAndDeckId(user.id(), deck.getId());
        return ApiResponse.ok(DeckResponse.from(deck, count));
    }

    @DeleteMapping("/{deckId}")
    @Operation(summary = "덱 삭제 — 안의 클립은 Inbox로 (보존)")
    public ResponseEntity<Void> delete(@PathVariable UUID deckId,
                                       @CurrentUser AuthenticatedUser user) {
        deckService.delete(user.id(), deckId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/clips/{clipId}")
    @Operation(summary = "클립을 덱에 이동 (deckId=null이면 Inbox로)")
    public ResponseEntity<Void> moveClip(@PathVariable UUID clipId,
                                         @RequestBody MoveClipRequest req,
                                         @CurrentUser AuthenticatedUser user) {
        deckService.moveClip(user.id(), clipId, req.deckId());
        return ResponseEntity.noContent().build();
    }
}

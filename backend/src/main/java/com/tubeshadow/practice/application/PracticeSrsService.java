package com.tubeshadow.practice.application;

import com.tubeshadow.practice.api.dto.PracticeCardResponse;
import com.tubeshadow.practice.domain.PracticeCard;
import com.tubeshadow.practice.repository.PracticeCardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class PracticeSrsService {

    private final PracticeCardRepository repository;

    public PracticeSrsService(PracticeCardRepository repository) {
        this.repository = repository;
    }

    /** All of a user's card states — the client computes which are due/new against its local date. */
    @Transactional(readOnly = true)
    public List<PracticeCardResponse> states(UUID userId) {
        return repository.findByUserId(userId).stream()
                .map(PracticeCardResponse::from)
                .toList();
    }

    @Transactional
    public PracticeCardResponse grade(UUID userId, String cardKey, boolean correct, LocalDate today) {
        PracticeCard card = repository.findByUserIdAndCardKey(userId, cardKey)
                .orElseGet(() -> PracticeCard.createNew(userId, cardKey, today));
        card.grade(correct, today, Instant.now());
        repository.save(card);
        return PracticeCardResponse.from(card);
    }
}

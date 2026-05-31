package com.tubeshadow.practice.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * One drill card's spaced-repetition state for a user — a Leitner box (0 = new). A correct recall
 * promotes the card one box (longer until it's due again); a miss drops it to box 1 (due tomorrow).
 * Box → interval is fixed below. The "today" is the client's local date, same as the streak.
 */
@Entity
@Table(name = "practice_card", uniqueConstraints = {
        @UniqueConstraint(name = "uk_practice_card_user_key", columnNames = {"user_id", "card_key"})
})
public class PracticeCard extends BaseEntity {

    static final int MAX_BOX = 6;

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "card_key", nullable = false, length = 120)
    private String cardKey;

    @Column(name = "box", nullable = false)
    private int box = 0;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "correct_count", nullable = false)
    private int correctCount = 0;

    @Column(name = "lapse_count", nullable = false)
    private int lapseCount = 0;

    @Column(name = "last_reviewed_at")
    private Instant lastReviewedAt;

    protected PracticeCard() {}

    private PracticeCard(UUID id, UUID userId, String cardKey, LocalDate dueDate) {
        this.id = id;
        this.userId = userId;
        this.cardKey = cardKey;
        this.dueDate = dueDate;
    }

    /** A brand-new card starts in box 0, due immediately (the first grade moves it on). */
    public static PracticeCard createNew(UUID userId, String cardKey, LocalDate today) {
        return new PracticeCard(UUID.randomUUID(), userId, cardKey, today);
    }

    /** Days until a card in {@code box} is due again. */
    static int intervalDays(int box) {
        return switch (box) {
            case 0, 1 -> 1;
            case 2 -> 2;
            case 3 -> 4;
            case 4 -> 7;
            case 5 -> 14;
            default -> 30;
        };
    }

    public void grade(boolean correct, LocalDate today, Instant now) {
        if (correct) {
            box = Math.min(box + 1, MAX_BOX);
            correctCount += 1;
        } else {
            box = 1;
            lapseCount += 1;
        }
        dueDate = today.plusDays(intervalDays(box));
        lastReviewedAt = now;
    }

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public String getCardKey() { return cardKey; }
    public int getBox() { return box; }
    public LocalDate getDueDate() { return dueDate; }
    public int getCorrectCount() { return correctCount; }
    public int getLapseCount() { return lapseCount; }
    public Instant getLastReviewedAt() { return lastReviewedAt; }
}

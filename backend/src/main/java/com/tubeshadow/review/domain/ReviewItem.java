package com.tubeshadow.review.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/**
 * SM-2 SRS state. One row per (user, clip).
 */
@Entity
@Table(name = "review_items",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_review_items_user_clip", columnNames = {"user_id", "clip_id"})
        },
        indexes = {
                @Index(name = "idx_review_items_user_due", columnList = "user_id, due_date")
        })
public class ReviewItem extends BaseEntity {

    private static final double DEFAULT_EASINESS = 2.5;

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "clip_id", nullable = false)
    private UUID clipId;

    @Column(name = "easiness", nullable = false)
    private double easiness = DEFAULT_EASINESS;

    @Column(name = "interval_days", nullable = false)
    private int intervalDays = 0;

    @Column(name = "repetitions", nullable = false)
    private int repetitions = 0;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "last_reviewed_at")
    private Instant lastReviewedAt;

    protected ReviewItem() {
    }

    private ReviewItem(UUID id, UUID userId, UUID clipId, LocalDate dueDate) {
        this.id = id;
        this.userId = userId;
        this.clipId = clipId;
        this.dueDate = dueDate;
    }

    public static ReviewItem createNew(UUID userId, UUID clipId, LocalDate firstDueDate) {
        return new ReviewItem(UUID.randomUUID(), userId, clipId, firstDueDate);
    }

    public void apply(double newEasiness, int newIntervalDays, int newRepetitions, LocalDate newDueDate) {
        this.easiness = newEasiness;
        this.intervalDays = newIntervalDays;
        this.repetitions = newRepetitions;
        this.dueDate = newDueDate;
        this.lastReviewedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public UUID getClipId() {
        return clipId;
    }

    public double getEasiness() {
        return easiness;
    }

    public int getIntervalDays() {
        return intervalDays;
    }

    public int getRepetitions() {
        return repetitions;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Instant getLastReviewedAt() {
        return lastReviewedAt;
    }
}

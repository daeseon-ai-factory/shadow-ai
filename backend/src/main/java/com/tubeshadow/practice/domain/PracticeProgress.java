package com.tubeshadow.practice.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDate;
import java.util.UUID;

/**
 * One row per user: the daily drill streak (patterns + collocations share it).
 *
 * <p>Streak rules live here as domain behavior. The "current day" is supplied by the caller
 * (the client's local date) rather than read from the server clock, so a learner's midnight is
 * their own, not UTC. {@code recordRep} advances or resets the streak; the {@code *On(today)}
 * readers report what to show for a given day without mutating state.
 */
@Entity
@Table(name = "practice_progress", uniqueConstraints = {
        @UniqueConstraint(name = "uk_practice_progress_user", columnNames = "user_id")
})
public class PracticeProgress extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "current_streak", nullable = false)
    private int currentStreak = 0;

    @Column(name = "longest_streak", nullable = false)
    private int longestStreak = 0;

    @Column(name = "last_date")
    private LocalDate lastDate;

    @Column(name = "reps_today", nullable = false)
    private int repsToday = 0;

    @Column(name = "total_reps", nullable = false)
    private long totalReps = 0;

    protected PracticeProgress() {}

    private PracticeProgress(UUID id, UUID userId) {
        this.id = id;
        this.userId = userId;
    }

    public static PracticeProgress createNew(UUID userId) {
        return new PracticeProgress(UUID.randomUUID(), userId);
    }

    /** Record one rep done on {@code today} (the client's local date), updating streak + counts. */
    public void recordRep(LocalDate today) {
        if (lastDate == null || today.isAfter(lastDate)) {
            boolean consecutive = lastDate != null && lastDate.isEqual(today.minusDays(1));
            currentStreak = consecutive ? currentStreak + 1 : 1;
            longestStreak = Math.max(longestStreak, currentStreak);
            repsToday = 1;
            lastDate = today;
        } else if (today.isEqual(lastDate)) {
            repsToday += 1;
        }
        // else: today is before the last recorded day (clock skew) — count it toward the total only,
        // leaving streak and the recorded day untouched.
        totalReps += 1;
    }

    /** Reps shown for {@code today} — 0 once the day rolls over. */
    public int repsOn(LocalDate today) {
        return lastDate != null && lastDate.isEqual(today) ? repsToday : 0;
    }

    /** The streak is alive only if the last rep was today or yesterday; otherwise it has lapsed. */
    public int effectiveStreak(LocalDate today) {
        if (lastDate == null) return 0;
        return (lastDate.isEqual(today) || lastDate.isEqual(today.minusDays(1))) ? currentStreak : 0;
    }

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public int getCurrentStreak() { return currentStreak; }
    public int getLongestStreak() { return longestStreak; }
    public LocalDate getLastDate() { return lastDate; }
    public int getRepsToday() { return repsToday; }
    public long getTotalReps() { return totalReps; }
}

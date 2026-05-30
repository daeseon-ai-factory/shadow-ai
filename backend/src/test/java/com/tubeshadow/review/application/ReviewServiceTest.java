package com.tubeshadow.review.application;

import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.review.repository.ReviewItemRepository;
import com.tubeshadow.video.repository.VideoRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * Unit tests for the review service's user-isolation boundary (respond) and the streak
 * logic (computeStreak is package-private — hence this test lives in the same package).
 */
class ReviewServiceTest {

    private final ReviewItemRepository reviewRepo = mock(ReviewItemRepository.class);
    private final ClipRepository clipRepo = mock(ClipRepository.class);
    private final VideoRepository videoRepo = mock(VideoRepository.class);
    private final ReviewService service = new ReviewService(reviewRepo, clipRepo, videoRepo);

    @Test
    void respondRejectsAnotherUsersItem() {
        UUID userId = UUID.randomUUID();
        UUID itemId = UUID.randomUUID();
        // findByIdAndUserId is the isolation gate: another user's item resolves to empty.
        when(reviewRepo.findByIdAndUserId(itemId, userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.respond(userId, itemId, 5))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void computeStreakCountsConsecutiveDaysEndingToday() {
        LocalDate today = LocalDate.now();
        List<Object> dates = List.of(today, today.minusDays(1), today.minusDays(2));
        assertThat(service.computeStreak(dates)).isEqualTo(3);
    }

    @Test
    void computeStreakBreaksOnGap() {
        LocalDate today = LocalDate.now();
        // day-2 missing → streak counts only today + yesterday
        List<Object> dates = List.of(today, today.minusDays(1), today.minusDays(3));
        assertThat(service.computeStreak(dates)).isEqualTo(2);
    }

    @Test
    void computeStreakCountsFromYesterdayWhenTodayMissing() {
        LocalDate today = LocalDate.now();
        List<Object> dates = List.of(today.minusDays(1), today.minusDays(2));
        assertThat(service.computeStreak(dates)).isEqualTo(2);
    }

    @Test
    void computeStreakZeroWhenEmptyOrStale() {
        assertThat(service.computeStreak(List.of())).isZero();
        assertThat(service.computeStreak(List.of(LocalDate.now().minusDays(5)))).isZero();
    }
}

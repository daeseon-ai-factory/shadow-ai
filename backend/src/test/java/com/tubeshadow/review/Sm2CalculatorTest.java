package com.tubeshadow.review;

import com.tubeshadow.review.domain.ReviewItem;
import com.tubeshadow.review.domain.Sm2Calculator;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class Sm2CalculatorTest {

    private final Clock fixed = Clock.fixed(java.time.Instant.parse("2026-05-24T00:00:00Z"), ZoneOffset.UTC);
    private final Sm2Calculator calc = new Sm2Calculator(fixed);
    private final LocalDate today = LocalDate.of(2026, 5, 24);

    @Test
    void firstSuccessGivesInterval1() {
        ReviewItem item = ReviewItem.createNew(UUID.randomUUID(), UUID.randomUUID(), today);
        Sm2Calculator.Sm2Result result = calc.apply(item, 4); // Good
        assertThat(result.repetitions()).isEqualTo(1);
        assertThat(result.intervalDays()).isEqualTo(1);
        assertThat(result.nextDueDate()).isEqualTo(today.plusDays(1));
        assertThat(result.easiness()).isGreaterThanOrEqualTo(2.5);
    }

    @Test
    void secondSuccessGivesInterval6() {
        ReviewItem item = ReviewItem.createNew(UUID.randomUUID(), UUID.randomUUID(), today);
        item.apply(2.5, 1, 1, today.plusDays(1)); // after 1st review
        Sm2Calculator.Sm2Result r = calc.apply(item, 4);
        assertThat(r.repetitions()).isEqualTo(2);
        assertThat(r.intervalDays()).isEqualTo(6);
        assertThat(r.nextDueDate()).isEqualTo(today.plusDays(6));
    }

    @Test
    void thirdSuccessMultipliesByEasiness() {
        ReviewItem item = ReviewItem.createNew(UUID.randomUUID(), UUID.randomUUID(), today);
        item.apply(2.5, 6, 2, today); // 2nd review at interval 6
        Sm2Calculator.Sm2Result r = calc.apply(item, 4);
        assertThat(r.repetitions()).isEqualTo(3);
        // 6 * 2.5 = 15
        assertThat(r.intervalDays()).isEqualTo(15);
    }

    @Test
    void failureResetsRepetitionsAndShortenInterval() {
        ReviewItem item = ReviewItem.createNew(UUID.randomUUID(), UUID.randomUUID(), today);
        item.apply(2.5, 6, 2, today);
        Sm2Calculator.Sm2Result r = calc.apply(item, 1); // Again
        assertThat(r.repetitions()).isZero();
        assertThat(r.intervalDays()).isEqualTo(1);
        assertThat(r.nextDueDate()).isEqualTo(today.plusDays(1));
    }

    @Test
    void easinessFloorAt1_3() {
        ReviewItem item = ReviewItem.createNew(UUID.randomUUID(), UUID.randomUUID(), today);
        item.apply(1.4, 1, 1, today);
        Sm2Calculator.Sm2Result r = calc.apply(item, 0); // very bad
        assertThat(r.easiness()).isGreaterThanOrEqualTo(Sm2Calculator.MIN_EASINESS);
    }

    @Test
    void rejectsOutOfRangeQuality() {
        ReviewItem item = ReviewItem.createNew(UUID.randomUUID(), UUID.randomUUID(), today);
        assertThatThrownBy(() -> calc.apply(item, -1)).isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> calc.apply(item, 6)).isInstanceOf(IllegalArgumentException.class);
    }
}

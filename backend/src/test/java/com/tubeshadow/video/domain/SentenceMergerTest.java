package com.tubeshadow.video.domain;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class SentenceMergerTest {

    @Test
    void emptyInput_returnsEmpty() {
        assertThat(SentenceMerger.merge(List.of())).isEmpty();
        assertThat(SentenceMerger.merge(null)).isEmpty();
    }

    @Test
    void singleSegment_passesThrough() {
        var single = new TranscriptSegment(0, 1000, "Hello world");
        assertThat(SentenceMerger.merge(List.of(single))).containsExactly(single);
    }

    @Test
    void adjacentSegmentsWithoutFinalPunctuation_merge() {
        // gap=100ms (< 300), prev ends with "world" → merge expected
        var s1 = new TranscriptSegment(0, 1000, "Hello world");
        var s2 = new TranscriptSegment(1100, 2000, "how are you");
        var merged = SentenceMerger.merge(List.of(s1, s2));
        assertThat(merged).hasSize(1);
        assertThat(merged.get(0).text()).isEqualTo("Hello world how are you");
        assertThat(merged.get(0).startMs()).isZero();
        assertThat(merged.get(0).endMs()).isEqualTo(2000);
    }

    @Test
    void sentenceFinalPunctuation_breaksTheMerge() {
        var s1 = new TranscriptSegment(0, 1000, "Hello world.");
        var s2 = new TranscriptSegment(1100, 2000, "How are you?");
        var s3 = new TranscriptSegment(2100, 3000, "I'm fine");
        var merged = SentenceMerger.merge(List.of(s1, s2, s3));
        assertThat(merged).hasSize(3);
        assertThat(merged.get(0).text()).isEqualTo("Hello world.");
        assertThat(merged.get(1).text()).isEqualTo("How are you?");
        assertThat(merged.get(2).text()).isEqualTo("I'm fine");
    }

    @Test
    void largeGap_breaksTheMerge() {
        // 500ms gap between speaker pauses → keep separate
        var s1 = new TranscriptSegment(0, 1000, "First part");
        var s2 = new TranscriptSegment(1500, 2000, "second part");
        var merged = SentenceMerger.merge(List.of(s1, s2));
        assertThat(merged).hasSize(2);
    }

    @Test
    void durationCap_forcesSplitEvenWithoutPunctuation() {
        // 16 segments × 1s each, all without periods, tight gap → would naively be 16s,
        // but cap is 15s, so we must split.
        List<TranscriptSegment> segs = new java.util.ArrayList<>();
        for (int i = 0; i < 16; i++) {
            segs.add(new TranscriptSegment(i * 1000L, (i + 1) * 1000L, "word" + i));
        }
        var merged = SentenceMerger.merge(segs);
        assertThat(merged).hasSizeGreaterThan(1);
        for (var m : merged) {
            assertThat(m.endMs() - m.startMs()).isLessThanOrEqualTo(SentenceMerger.MAX_DURATION_MS + 1000);
        }
    }

    @Test
    void exclamationAndQuestionMarksBreakMerge() {
        var s1 = new TranscriptSegment(0, 1000, "Wow!");
        var s2 = new TranscriptSegment(1100, 2000, "Are you sure?");
        var s3 = new TranscriptSegment(2100, 3000, "Yes");
        var merged = SentenceMerger.merge(List.of(s1, s2, s3));
        assertThat(merged).extracting(TranscriptSegment::text)
                .containsExactly("Wow!", "Are you sure?", "Yes");
    }

    @Test
    void mergePreservesEarliestStartAndLatestEnd() {
        var s1 = new TranscriptSegment(100, 500, "We");
        var s2 = new TranscriptSegment(600, 1500, "are merging");
        var merged = SentenceMerger.merge(List.of(s1, s2));
        assertThat(merged).hasSize(1);
        assertThat(merged.get(0).startMs()).isEqualTo(100);
        assertThat(merged.get(0).endMs()).isEqualTo(1500);
    }
}

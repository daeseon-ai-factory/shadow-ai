package com.tubeshadow.video.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * Collapses raw YouTube transcript segments (often 1~3 second chunks, ASR can be even
 * finer) into <em>sentence-ish</em> units. Goal: when the user looks at the transcript
 * panel they see meaningful clickable lines, not a wall of fragments.
 *
 * <p>Heuristics — applied in one left-to-right pass. The hard reality is that YouTube
 * AUTO-captions carry no punctuation and no capitalization, so we can't rely on
 * sentence-final marks alone — most lines would never break except at the duration cap,
 * producing 15-second walls. So we break a line at the FIRST of:
 * <ul>
 *   <li>the previous text ends with sentence-final punctuation ({@code .!?…}) — a real
 *       sentence end on the (rarer) punctuated captions;</li>
 *   <li>a pause to the next segment of {@link #BREAK_GAP_MS}+ — in speech a clear pause
 *       is a clause/sentence boundary, the best signal we have without punctuation;</li>
 *   <li>the merged line would exceed {@link #MAX_DURATION_MS}, or</li>
 *   <li>the merged text would exceed {@link #MAX_CHARS} — keeps punctuation-less runs to a
 *       readable, shadowable length instead of a wall.</li>
 * </ul>
 * Otherwise the next segment is merged in. Short within-sentence pauses (a breath) no
 * longer split a line. The sentence's {@code startMs/endMs} are the earliest start and the
 * latest end of its constituent segments.
 *
 * <p>Pure function — no Spring, no IO. Easy to unit test, deterministic. Safe to call
 * on every render because the cost is O(n) over a few hundred segments.
 */
public final class SentenceMerger {

    // A pause >= this reads as a clause/sentence boundary (was 300ms, which split on every breath).
    static final long BREAK_GAP_MS = 900L;
    static final long MAX_DURATION_MS = 8_000L;
    // Cap for punctuation-less auto-captions so one line stays ~a sentence, not a wall.
    static final int MAX_CHARS = 90;

    private SentenceMerger() {}

    public static List<TranscriptSegment> merge(List<TranscriptSegment> segments) {
        if (segments == null || segments.isEmpty()) return List.of();

        List<TranscriptSegment> out = new ArrayList<>();
        long curStart = segments.get(0).startMs();
        long curEnd = segments.get(0).endMs();
        StringBuilder curText = new StringBuilder(segments.get(0).text());

        for (int i = 1; i < segments.size(); i++) {
            TranscriptSegment next = segments.get(i);
            long gap = next.startMs() - curEnd;
            String prevText = curText.toString();
            long projectedDuration = next.endMs() - curStart;
            int projectedChars = curText.length() + 1 + next.text().length();

            boolean canMerge = gap < BREAK_GAP_MS
                    && !endsWithSentenceFinal(prevText)
                    && projectedDuration <= MAX_DURATION_MS
                    && projectedChars <= MAX_CHARS;

            if (canMerge) {
                if (!prevText.isEmpty() && !prevText.endsWith(" ")) curText.append(' ');
                curText.append(next.text());
                curEnd = Math.max(curEnd, next.endMs());
            } else {
                out.add(new TranscriptSegment(curStart, curEnd, curText.toString().trim()));
                curStart = next.startMs();
                curEnd = next.endMs();
                curText.setLength(0);
                curText.append(next.text());
            }
        }
        out.add(new TranscriptSegment(curStart, curEnd, curText.toString().trim()));
        return out;
    }

    private static boolean endsWithSentenceFinal(String text) {
        if (text == null) return false;
        String trimmed = text.stripTrailing();
        if (trimmed.isEmpty()) return false;
        char last = trimmed.charAt(trimmed.length() - 1);
        return last == '.' || last == '!' || last == '?' || last == '…';
    }
}

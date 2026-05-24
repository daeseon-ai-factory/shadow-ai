package com.tubeshadow.video.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * Collapses raw YouTube transcript segments (often 1~3 second chunks, ASR can be even
 * finer) into <em>sentence-ish</em> units. Goal: when the user looks at the transcript
 * panel they see meaningful clickable lines, not a wall of fragments.
 *
 * <p>Heuristics — applied in one left-to-right pass:
 * <ul>
 *   <li>Merge an adjacent segment into the previous one when:
 *     <ul>
 *       <li>the time gap between them is &lt; {@link #MAX_GAP_MS}, AND</li>
 *       <li>the previous text does <em>not</em> end with sentence-final punctuation
 *           ({@code .!?…}), AND</li>
 *       <li>the resulting duration stays under {@link #MAX_DURATION_MS}.</li>
 *     </ul>
 *   </li>
 *   <li>If the merge would exceed the duration cap, start a new sentence instead.</li>
 *   <li>The resulting sentence's {@code startMs/endMs} are the earliest start and the
 *       latest end of its constituent segments.</li>
 * </ul>
 *
 * <p>Pure function — no Spring, no IO. Easy to unit test, deterministic. Safe to call
 * on every render because the cost is O(n) over a few hundred segments.
 */
public final class SentenceMerger {

    static final long MAX_GAP_MS = 300L;
    static final long MAX_DURATION_MS = 15_000L;

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

            boolean canMerge = gap < MAX_GAP_MS
                    && !endsWithSentenceFinal(prevText)
                    && projectedDuration <= MAX_DURATION_MS;

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

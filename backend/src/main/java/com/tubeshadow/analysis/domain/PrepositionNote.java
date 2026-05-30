package com.tubeshadow.analysis.domain;

/**
 * One preposition (or particle) worth understanding in a clip, with the relationship it
 * encodes. The point is intuition — "why 'off of' here?" — not a dictionary gloss.
 *
 * @param preposition the preposition/particle exactly as it appears, e.g. "off of", "into", "up with"
 * @param phrase      the phrase from the transcript it appears in, e.g. "made a living off of lying"
 * @param sense       Korean: the relationship/image it expresses + nuance ("출처·기반 — 무엇에 기대어 살아간다, '~로 먹고살다'")
 */
public record PrepositionNote(String preposition, String phrase, String sense) {
}

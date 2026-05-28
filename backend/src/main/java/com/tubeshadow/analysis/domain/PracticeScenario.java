package com.tubeshadow.analysis.domain;

/**
 * A real-world situation where the clip's English expression would naturally come out.
 * The learner reads the situation, types/says their English response, then compares
 * against a sample. This is OUTPUT practice — the missing piece beyond shadowing.
 *
 * @param situation        Korean description of a real moment ("회의에서 …, 동료가 …")
 * @param koreanHint       brief nudge — which clip expression to weave in
 * @param sampleResponse   one natural English response that uses the target expression
 */
public record PracticeScenario(String situation, String koreanHint, String sampleResponse) {
}

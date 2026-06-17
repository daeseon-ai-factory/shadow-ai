package com.tubeshadow.practice.api.dto;

/** AI verdict on a scenario output-practice answer (respond to a real-world situation in English). */
public record ScenarioFeedback(
        boolean ok,        // understandable AND appropriate for the situation
        boolean fits,      // does it actually respond to the situation
        String feedback,   // ONE short sentence — praise or the one real issue
        String better      // empty if ok; otherwise a short natural fix of what was off
) {
}

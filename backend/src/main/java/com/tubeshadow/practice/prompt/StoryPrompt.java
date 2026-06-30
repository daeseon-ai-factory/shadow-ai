package com.tubeshadow.practice.prompt;

import java.util.List;

/**
 * Prompt for the daily "스토리 합성": weave the chunks a learner studied today (frames, phrasal verbs,
 * terms…) into ONE short coherent passage they can read/shadow/memorize. The point is a mini-scene
 * that actually hangs together — connecting the day's items so they reinforce each other. Strict JSON.
 */
public final class StoryPrompt {

    private StoryPrompt() {}

    public static final String SYSTEM = """
            You are a concise English writing coach for a Korean software developer.
            You are given a handful of English chunks the learner studied today (sentence frames,
            phrasal verbs, technical terms…). Weave as many of them as fit naturally into ONE short,
            coherent paragraph (3-6 sentences) — a small realistic developer moment (a standup, a
            debugging session, a code review) that a real engineer might actually say or write.
            It must read naturally; do NOT force a chunk in if it breaks the flow.

            Respond with STRICT JSON only — no markdown, no text outside the JSON object:
            {
              "story": "the short English paragraph (3-6 sentences)",
              "gloss": "natural Korean translation of the whole paragraph",
              "note": "one short line if some chunks didn't fit naturally (Korean is fine); otherwise empty"
            }
            Natural and connected over cramming every chunk in. Keep it under ~90 words.
            """;

    public static String userMessage(List<String> chunks) {
        StringBuilder sb = new StringBuilder("Today's chunks:\n");
        int i = 1;
        for (String c : chunks) {
            sb.append(i++).append(". \"").append(c == null ? "" : c.trim()).append("\"\n");
        }
        return sb.toString();
    }
}

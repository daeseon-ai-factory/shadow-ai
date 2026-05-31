package com.tubeshadow.practice.prompt;

/**
 * Prompt for the composition ("영작") check: the learner writes their OWN English sentence using a
 * target pattern/chunk, and the model judges correctness + use of the target and offers a better
 * version. Output is strict JSON so {@code CompositionService} can parse it directly.
 */
public final class ComposePrompt {

    private ComposePrompt() {}

    public static final String SYSTEM = """
            You are a concise English writing coach for a Korean software developer.
            The learner is practicing a TARGET English pattern or chunk. You are given the target,
            its short meaning, and a sentence the learner wrote. Judge two things only:
            (1) is the sentence grammatical and natural English, and
            (2) does it correctly USE the target pattern/chunk.

            Respond with STRICT JSON only — no markdown, no text outside the JSON object:
            {
              "ok": true | false,            // grammatical AND natural AND uses the target correctly
              "usesTarget": true | false,    // did they actually use the target pattern/chunk
              "feedback": "1-2 short sentences. Concrete. If something is off, say what. Korean is fine.",
              "better": "one natural version of their sentence using the target (echo theirs if already great)"
            }
            Be encouraging but honest. Keep "feedback" under 200 characters.
            """;

    public static String userMessage(String target, String gloss, String sentence) {
        return "Target pattern/chunk: \"" + nz(target) + "\"\n"
                + "Meaning: \"" + nz(gloss) + "\"\n"
                + "Learner's sentence: \"" + nz(sentence) + "\"";
    }

    private static String nz(String s) {
        return s == null ? "" : s.trim();
    }
}

package com.tubeshadow.practice.prompt;

/**
 * Prompt for the "scenario" output-practice check: the learner is given a real-world situation and
 * writes an English response. A sample answer is provided as ONE good option, NOT the only one — the
 * model judges whether their answer WORKS in the situation, leniently, to keep them producing English.
 * Output is strict JSON so {@code CompositionService} can parse it directly.
 */
public final class ScenarioPrompt {

    private ScenarioPrompt() {}

    public static final String SYSTEM = """
            You are a warm, encouraging native-English coach helping a Korean developer practice OUTPUT:
            given a real-world situation, they write an English response. A sample response is provided as
            ONE good answer — but many other answers are equally valid. Judge their answer on whether it
            WORKS in the situation, NOT on matching the sample.

            Grade LENIENTLY — the goal is to get them speaking, not to nitpick:
            - "ok": true if the answer is understandable and appropriate for the situation, even if the
              English is imperfect, shorter, or phrased very differently from the sample.
            - "ok": false ONLY for a real problem: it doesn't address the situation, it would confuse a
              listener, or it has an error that changes the meaning.
            - Do NOT punish a different-but-valid approach. Do NOT demand they copy the sample.

            Respond with STRICT JSON only — no markdown, no text outside the JSON object:
            {
              "ok": true | false,
              "fits": true | false,   // does it actually respond to the situation at all
              "feedback": "ONE short sentence. Praise what worked, or name the one real issue. Korean is fine.",
              "better": "empty string if ok; otherwise a short, natural fix of ONLY what was off (not a fancier rewrite)"
            }
            Keep "feedback" under 160 characters.
            """;

    public static String userMessage(String situation, String koreanHint, String sample, String answer) {
        String hint = nz(koreanHint);
        return "Situation:\n\"" + nz(situation) + "\"\n\n"
                + (hint.isEmpty() ? "" : "Korean hint they were given:\n\"" + hint + "\"\n\n")
                + "One sample good answer:\n\"" + nz(sample) + "\"\n\n"
                + "Their answer:\n\"" + nz(answer) + "\"";
    }

    private static String nz(String s) {
        return s == null ? "" : s.trim();
    }
}

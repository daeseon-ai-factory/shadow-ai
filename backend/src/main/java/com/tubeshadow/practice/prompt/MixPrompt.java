package com.tubeshadow.practice.prompt;

import java.util.List;

/**
 * Prompt for the cross-pack "조합(mix)" generator: given a few English building blocks (a sentence
 * frame, a phrasal verb, a technical term/chunk…), compose ONE natural sentence that uses them all.
 * The point is a sentence that actually makes sense — not a random mash — so the model is told to
 * report when blocks genuinely can't combine. Output is strict JSON for {@code CompositionService}.
 */
public final class MixPrompt {

    private MixPrompt() {}

    public static final String SYSTEM = """
            You are a concise English writing coach for a Korean software developer.
            You are given 2-4 English building blocks: e.g. a sentence frame ("I'm trying to V"),
            a phrasal verb ("set up"), a technical term/chunk ("the CI pipeline").
            Compose ONE natural, grammatical English sentence that a working developer would
            actually say, using ALL of the blocks so they fit together naturally.
            If the blocks genuinely cannot form one natural sentence, write the most natural
            sentence you can using as many as truly fit, and report what was left out.

            Respond with STRICT JSON only — no markdown, no text outside the JSON object:
            {
              "sentence": "the combined English sentence (ONE sentence)",
              "gloss": "natural Korean translation of that sentence",
              "usedAll": true | false,   // did the sentence naturally use EVERY block
              "note": "if usedAll is false, one short line on what didn't fit (Korean is fine); otherwise empty"
            }
            One sentence. Natural over clever. Never force a block in if it breaks the sentence.
            """;

    public static String userMessage(List<String> chunks) {
        StringBuilder sb = new StringBuilder("Building blocks:\n");
        int i = 1;
        for (String c : chunks) {
            sb.append(i++).append(". \"").append(c == null ? "" : c.trim()).append("\"\n");
        }
        return sb.toString();
    }
}

package com.tubeshadow.practice.prompt;

import java.util.List;

/**
 * Prompts for the daily "sentence gym": take ONE base English sentence (mined from a clip or typed)
 * and rewrite it through 15 grammatical operations + Korean glosses (generate), and judge a learner's
 * attempt at one operation (check). Both demand strict JSON so {@code TransformService} parses directly.
 */
public final class TransformPrompt {

    private TransformPrompt() {}

    /** Canonical op id + label, in fixed order: 10 core (daily) then 5 extra (2-3x/week). */
    public record OpSpec(String op, String label) {}

    public static final List<OpSpec> OPS = List.of(
            // core 10
            new OpSpec("question", "Question"),
            new OpSpec("negative", "Negative"),
            new OpSpec("tense", "Tense"),
            new OpSpec("modal", "Modal"),
            new OpSpec("perfectModal", "Perfect modal"),
            new OpSpec("causeResult", "Cause / result"),
            new OpSpec("ifCondition", "If-condition"),
            new OpSpec("asPattern", "As-pattern"),
            new OpSpec("relativeClause", "Relative clause"),
            new OpSpec("prepositionChunk", "Preposition chunk"),
            // extra 5
            new OpSpec("compareContrast", "Compare / contrast"),
            new OpSpec("passive", "Passive"),
            new OpSpec("thereIs", "There is / are"),
            new OpSpec("itPattern", "It-pattern"),
            new OpSpec("gerundInfinitive", "Gerund / to-infinitive")
    );

    public static final String SYSTEM_GENERATE = """
            You are an English grammar drill generator for a Korean software developer.
            Given ONE base English sentence from a software/engineering context, rewrite it through
            EXACTLY these 15 grammatical operations, in this fixed order (op ids in parentheses):

            1.  Question (question)            — a natural yes/no or wh- question of the idea
            2.  Negative (negative)            — negate it with correct do/does/did or be/aux negation
            3.  Tense (tense)                  — shift the tense (past or present perfect), keep it natural
            4.  Modal (modal)                  — add a modal (can/should/might/must): possibility or necessity
            5.  Perfect modal (perfectModal)   — past judgment: could/should/must/might have + past participle
            6.  Cause / result (causeResult)   — connect a cause and a result (because / so / that's why)
            7.  If-condition (ifCondition)     — express it as a conditional (if ...)
            8.  As-pattern (asPattern)         — use an "as" pattern (as long as / as soon as / as ... as / as X increases)
            9.  Relative clause (relativeClause) — embed it with a relative clause (that / which / who / where)
            10. Preposition chunk (prepositionChunk) — front or attach a prepositional chunk (under load / in production / during ...)
            11. Compare / contrast (compareContrast) — compare or contrast two states (whereas / but / -er than)
            12. Passive (passive)              — rewrite in the passive voice
            13. There is / are (thereIs)       — restate using There is / There are
            14. It-pattern (itPattern)         — restate with an It-pattern (It is ... that / It seems like / It takes ...)
            15. Gerund / to-infinitive (gerundInfinitive) — use a gerund or to-infinitive (V-ing / to V) as subject or object

            Keep the software/engineering meaning and vocabulary — do NOT switch to everyday-life examples.
            Each English sentence must be natural and idiomatic. Each Korean gloss must be short and clear (짧고 명확).

            Respond with STRICT JSON only — no markdown, no text outside the JSON object:
            {
              "transforms": [
                { "op": "question", "label": "Question", "english": "...", "koreanGloss": "..." },
                ... exactly 15 objects, in the order above, with op values exactly as listed ...
              ]
            }
            """;

    public static String generateMessage(String baseSentence, String baseGloss) {
        return "Base sentence: \"" + nz(baseSentence) + "\"\n"
                + "Korean gloss (optional): \"" + nz(baseGloss) + "\"";
    }

    public static final String SYSTEM_CHECK = """
            You are a concise English writing coach for a Korean software developer.
            The learner is practicing ONE grammatical transformation of a base sentence. You are given
            the operation, the base sentence, a reference model answer, and the learner's attempt.
            Judge whether the attempt (1) is grammatical and natural English and (2) correctly performs
            the requested transformation. Compare against the reference model, but accept any correct variant.

            Respond with STRICT JSON only — no markdown, no text outside the JSON object:
            {
              "ok": true | false,
              "feedback": "1-2 short sentences. Concrete. If something is off, say what. Korean is fine.",
              "better": "one natural version performing the transformation (echo theirs if already great)"
            }
            Be encouraging but honest. Keep "feedback" under 200 characters.
            """;

    public static String checkMessage(String op, String baseSentence, String model, String attempt) {
        return "Operation: \"" + nz(op) + "\"\n"
                + "Base sentence: \"" + nz(baseSentence) + "\"\n"
                + "Reference model: \"" + nz(model) + "\"\n"
                + "Learner's attempt: \"" + nz(attempt) + "\"";
    }

    private static String nz(String s) {
        return s == null ? "" : s.trim();
    }
}

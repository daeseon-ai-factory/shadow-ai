package com.tubeshadow.practice.prompt;

import java.util.List;

/**
 * Prompts for the daily "sentence gym": take ONE base English sentence and bend it through a fixed
 * taxonomy of grammatical SLOTS (each category split into its essential sub-variations, ~67 total)
 * + Korean glosses (generate), and score a learner's attempt at one slot (check). Fixed slots —
 * not AI-chosen — so the essential forms (why/how/when, the full tense ladder, the modal set) are
 * guaranteed every time, which is what mastery drilling needs. Both demand strict JSON.
 */
public final class TransformPrompt {

    private TransformPrompt() {}

    /** One drill slot: a unique op id, its category, and a human label. */
    public record OpSpec(String op, String category, String label) {}

    /** Categories drilled every day. */
    public static final List<String> CORE_CATEGORIES = List.of(
            "question", "negative", "tense", "modal", "perfectModal",
            "causeResult", "ifCondition", "asPattern", "relativeClause", "prepositionChunk");

    /** Categories surfaced 2-3x/week. */
    public static final List<String> EXTRA_CATEGORIES = List.of(
            "compareContrast", "passive", "thereIs", "itPattern", "gerundInfinitive");

    public static final List<OpSpec> OPS = List.of(
            // ── core ──────────────────────────────────────────────────────────────
            new OpSpec("question_yesno", "question", "Question · yes/no"),
            new OpSpec("question_why", "question", "Question · why"),
            new OpSpec("question_how", "question", "Question · how"),
            new OpSpec("question_when", "question", "Question · when"),
            new OpSpec("question_where", "question", "Question · where"),
            new OpSpec("question_what", "question", "Question · what (object)"),
            new OpSpec("question_who", "question", "Question · who (subject)"),
            new OpSpec("question_tag", "question", "Question · tag"),
            new OpSpec("question_indirect", "question", "Question · indirect"),
            new OpSpec("question_negative", "question", "Question · negative"),

            new OpSpec("negative_simple", "negative", "Negative · simple"),
            new OpSpec("negative_never", "negative", "Negative · never"),
            new OpSpec("negative_nolonger", "negative", "Negative · no longer"),
            new OpSpec("negative_failto", "negative", "Negative · fails to"),

            new OpSpec("tense_present", "tense", "Tense · present"),
            new OpSpec("tense_past", "tense", "Tense · past"),
            new OpSpec("tense_presperfect", "tense", "Tense · present perfect"),
            new OpSpec("tense_prescontinuous", "tense", "Tense · present continuous"),
            new OpSpec("tense_pastperfect", "tense", "Tense · past perfect"),
            new OpSpec("tense_will", "tense", "Tense · future (will)"),
            new OpSpec("tense_goingto", "tense", "Tense · future (going to)"),

            new OpSpec("modal_can", "modal", "Modal · can"),
            new OpSpec("modal_could", "modal", "Modal · could"),
            new OpSpec("modal_should", "modal", "Modal · should"),
            new OpSpec("modal_must", "modal", "Modal · must"),
            new OpSpec("modal_might", "modal", "Modal · might"),
            new OpSpec("modal_haveto", "modal", "Modal · have to"),

            new OpSpec("perfectModal_could", "perfectModal", "Perfect modal · could have"),
            new OpSpec("perfectModal_should", "perfectModal", "Perfect modal · should have"),
            new OpSpec("perfectModal_would", "perfectModal", "Perfect modal · would have"),
            new OpSpec("perfectModal_might", "perfectModal", "Perfect modal · might have"),
            new OpSpec("perfectModal_must", "perfectModal", "Perfect modal · must have"),

            new OpSpec("causeResult_because", "causeResult", "Cause/result · because"),
            new OpSpec("causeResult_becauseof", "causeResult", "Cause/result · because of"),
            new OpSpec("causeResult_so", "causeResult", "Cause/result · so"),
            new OpSpec("causeResult_thatswhy", "causeResult", "Cause/result · that's why"),

            new OpSpec("if_first", "ifCondition", "If · 1st (real)"),
            new OpSpec("if_second", "ifCondition", "If · 2nd (unreal present)"),
            new OpSpec("if_third", "ifCondition", "If · 3rd (unreal past)"),
            new OpSpec("if_unless", "ifCondition", "If · unless"),

            new OpSpec("as_aslongas", "asPattern", "As · as long as"),
            new OpSpec("as_assoonas", "asPattern", "As · as soon as"),
            new OpSpec("as_asfaras", "asPattern", "As · as far as I know"),
            new OpSpec("as_notasas", "asPattern", "As · not as … as"),

            new OpSpec("relative_that", "relativeClause", "Relative · that/which"),
            new OpSpec("relative_who", "relativeClause", "Relative · who"),
            new OpSpec("relative_where", "relativeClause", "Relative · where"),
            new OpSpec("relative_whose", "relativeClause", "Relative · whose"),

            new OpSpec("prep_under", "prepositionChunk", "Prep · under ~"),
            new OpSpec("prep_in", "prepositionChunk", "Prep · in ~"),
            new OpSpec("prep_during", "prepositionChunk", "Prep · during ~"),
            new OpSpec("prep_without", "prepositionChunk", "Prep · without ~"),

            // ── extra ─────────────────────────────────────────────────────────────
            new OpSpec("compare_erthan", "compareContrast", "Compare · -er than"),
            new OpSpec("compare_whereas", "compareContrast", "Compare · whereas"),
            new OpSpec("compare_while", "compareContrast", "Compare · while"),

            new OpSpec("passive_bepp", "passive", "Passive · be + p.p."),
            new OpSpec("passive_getpp", "passive", "Passive · get + p.p."),
            new OpSpec("passive_havepp", "passive", "Passive · have sth + p.p."),

            new OpSpec("thereis_is", "thereIs", "There is/are · singular"),
            new OpSpec("thereis_are", "thereIs", "There is/are · plural"),

            new OpSpec("it_isto", "itPattern", "It · It is ~ to"),
            new OpSpec("it_takes", "itPattern", "It · It takes"),
            new OpSpec("it_seems", "itPattern", "It · It seems"),
            new OpSpec("it_depends", "itPattern", "It · It depends on"),

            new OpSpec("gerund_subject", "gerundInfinitive", "Gerund/inf · V-ing (subject)"),
            new OpSpec("gerund_tov", "gerundInfinitive", "Gerund/inf · to V (purpose)"),
            new OpSpec("gerund_beforeafter", "gerundInfinitive", "Gerund/inf · before/after V-ing")
    );

    public static final String SYSTEM_GENERATE = """
            You are an English grammar drill generator for a Korean software developer.
            Given ONE base English sentence from a software/engineering context, rewrite it through
            EACH transformation slot listed below. Keep the same meaning and the software/engineering
            vocabulary — never switch to everyday-life examples. For each slot produce a natural,
            idiomatic English sentence and a short, clear Korean gloss (짧고 명확).

            Return STRICT JSON only — no markdown, no text outside the object:
            { "transforms": [ { "op": "<slot id>", "english": "...", "koreanGloss": "..." }, ... ] }

            Use each slot's EXACT "op" id, one object per slot, in the listed order. If a slot is
            genuinely impossible for this sentence, omit it (never invent nonsense to fill it).

            Slots (op — what to do):
            question_yesno — yes/no question (Does/Do/Is …?)
            question_why — why question
            question_how — how question
            question_when — when question
            question_where — where question
            question_what — what question asking about the object
            question_who — who question asking about the subject (no do-support)
            question_tag — statement + tag (…, doesn't it? / …, right?)
            question_indirect — embedded question (Do you know why …?)
            question_negative — negative question (Doesn't …?)
            negative_simple — plain negation (doesn't / isn't)
            negative_never — negate with "never"
            negative_nolonger — negate with "no longer"
            negative_failto — negate with "fails to + verb"
            tense_present — simple present (the base form)
            tense_past — simple past
            tense_presperfect — present perfect (has/have + p.p.)
            tense_prescontinuous — present continuous (is/are + -ing)
            tense_pastperfect — past perfect (had + p.p.)
            tense_will — future with "will"
            tense_goingto — future with "be going to"
            modal_can — with "can" (possibility/ability)
            modal_could — with "could" (tentative possibility)
            modal_should — with "should" (recommendation)
            modal_must — with "must" (strong necessity)
            modal_might — with "might" (weak possibility)
            modal_haveto — with "have to" (obligation)
            perfectModal_could — "could have + p.p." (past possibility)
            perfectModal_should — "should have + p.p." (past regret/advice)
            perfectModal_would — "would have + p.p." (hypothetical past result)
            perfectModal_might — "might have + p.p." (past uncertainty)
            perfectModal_must — "must have + p.p." (confident past guess)
            causeResult_because — cause with "because + clause"
            causeResult_becauseof — cause with "because of + noun"
            causeResult_so — cause→result with "so"
            causeResult_thatswhy — "That's why …"
            if_first — 1st conditional (if + present, … will …)
            if_second — 2nd conditional (if + past, … would …)
            if_third — 3rd conditional (if + had p.p., … would have …)
            if_unless — condition with "unless"
            as_aslongas — condition with "as long as"
            as_assoonas — timing with "as soon as"
            as_asfaras — "As far as I know, …"
            as_notasas — comparison "not as … as …"
            relative_that — defining relative clause with that/which
            relative_who — relative clause with "who" (people)
            relative_where — relative clause with "where" (place)
            relative_whose — relative clause with "whose" (possessive)
            prep_under — attach a chunk with "under ~" (e.g. under load)
            prep_in — attach a chunk with "in ~" (e.g. in production)
            prep_during — attach a chunk with "during ~"
            prep_without — attach a chunk with "without ~"
            compare_erthan — comparison with -er/more … than
            compare_whereas — contrast with "whereas"
            compare_while — contrast with "while"
            passive_bepp — passive with "be + p.p."
            passive_getpp — passive with "get + p.p."
            passive_havepp — causative passive "have/get something + p.p."
            thereis_is — restate with "There is …"
            thereis_are — restate with "There are …"
            it_isto — "It is + adjective + to + verb"
            it_takes — "It takes + time + to + verb"
            it_seems — "It seems (that) …"
            it_depends — "It depends on …"
            gerund_subject — use a gerund (V-ing) as the subject
            gerund_tov — use a to-infinitive for purpose/intent
            gerund_beforeafter — "before/after + V-ing …"
            """;

    public static String generateMessage(String baseSentence, String baseGloss) {
        return "Base sentence: \"" + nz(baseSentence) + "\"\n"
                + "Korean gloss (optional): \"" + nz(baseGloss) + "\"";
    }

    public static final String SYSTEM_CHECK = """
            You are a strict but encouraging English coach for a Korean software developer.
            The learner is practicing ONE grammatical transformation of a base sentence. You are given
            the target transformation, the base sentence, a reference model answer, and the learner's
            attempt. Judge whether the attempt (1) is grammatical and natural English and (2) actually
            performs the requested transformation. Accept ANY correct variant, not only the reference.

            Respond with STRICT JSON only — no markdown, no text outside the JSON object:
            {
              "ok": true | false,
              "score": 0-100,
              "feedback": "1-2 short sentences. Concrete. If something is off, say what. Korean is fine.",
              "better": "one natural version performing the transformation (echo theirs if already great)"
            }
            Be encouraging but honest. Keep "feedback" under 200 characters.
            """;

    public static String checkMessage(String target, String baseSentence, String model, String attempt) {
        return "Target transformation: \"" + nz(target) + "\"\n"
                + "Base sentence: \"" + nz(baseSentence) + "\"\n"
                + "Reference model: \"" + nz(model) + "\"\n"
                + "Learner's attempt: \"" + nz(attempt) + "\"";
    }

    private static String nz(String s) {
        return s == null ? "" : s.trim();
    }
}

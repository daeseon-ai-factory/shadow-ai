package com.tubeshadow.analysis.infrastructure;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.domain.ChunkPair;
import com.tubeshadow.analysis.domain.KeyExpression;
import com.tubeshadow.analysis.domain.PracticeScenario;
import com.tubeshadow.analysis.domain.PrepositionNote;
import com.tubeshadow.analysis.domain.Vocabulary;

import java.util.ArrayList;
import java.util.List;

/**
 * Shared parser for the analysis JSON both providers emit — Gemini and Claude use the same
 * output schema, only the response envelope differs. Each client extracts the model's text
 * and hands it here, deduplicating the grammar / expressions / vocabulary / translation /
 * scenario parsing that used to be copy-pasted in both clients.
 */
final class AiAnalysisParser {

    private AiAnalysisParser() {
    }

    /** Parse the model's JSON text (a markdown code fence is tolerated) into a neutral result. */
    static AiAnalysisResult parse(ObjectMapper objectMapper, String modelText) throws JsonProcessingException {
        JsonNode payload = objectMapper.readTree(stripCodeFence(modelText.trim()));

        List<String> grammar = readStrings(payload.path("grammar_notes"));

        List<KeyExpression> exprs = new ArrayList<>();
        for (JsonNode n : payload.path("key_expressions")) {
            exprs.add(new KeyExpression(
                    n.path("phrase").asText(""),
                    n.path("meaning").asText(""),
                    n.path("usage").asText("")));
        }

        List<Vocabulary> vocab = new ArrayList<>();
        for (JsonNode n : payload.path("vocabulary")) {
            vocab.add(new Vocabulary(
                    n.path("word").asText(""),
                    n.path("meaning").asText(""),
                    n.path("level").asText("basic")));
        }

        String summary = payload.path("context_summary").asText("");

        JsonNode trNode = payload.path("primary_translation");
        String primaryTranslation = trNode.isMissingNode() || trNode.isNull() ? null : trNode.asText();
        if (primaryTranslation != null && primaryTranslation.isBlank()) primaryTranslation = null;

        List<ChunkPair> chunked = new ArrayList<>();
        for (JsonNode n : payload.path("chunked_translation")) {
            String en = n.path("en").asText("").trim();
            String ko = n.path("ko").asText("").trim();
            if (!en.isEmpty() && !ko.isEmpty()) chunked.add(new ChunkPair(en, ko));
        }

        PracticeScenario scenario = parseScenario(payload.path("practice_scenario"));

        List<PrepositionNote> prepositions = new ArrayList<>();
        for (JsonNode n : payload.path("preposition_notes")) {
            String prep = n.path("preposition").asText("").trim();
            String phrase = n.path("phrase").asText("").trim();
            String sense = n.path("sense").asText("").trim();
            if (!prep.isEmpty() && !sense.isEmpty()) prepositions.add(new PrepositionNote(prep, phrase, sense));
        }

        return new AiAnalysisResult(grammar, exprs, vocab, summary, primaryTranslation, chunked, scenario, prepositions);
    }

    private static String stripCodeFence(String s) {
        if (s.startsWith("```")) {
            int firstNl = s.indexOf('\n');
            int lastFence = s.lastIndexOf("```");
            if (firstNl > 0 && lastFence > firstNl) {
                return s.substring(firstNl + 1, lastFence).trim();
            }
        }
        return s;
    }

    private static List<String> readStrings(JsonNode node) {
        List<String> out = new ArrayList<>();
        if (node.isArray()) {
            for (JsonNode n : node) {
                String v = n.asText();
                if (!v.isBlank()) out.add(v);
            }
        }
        return out;
    }

    /** Pull a {@link PracticeScenario} from the JSON node, or null if the LLM omitted it. */
    private static PracticeScenario parseScenario(JsonNode node) {
        if (node == null || node.isMissingNode() || node.isNull() || !node.isObject()) return null;
        String situation = node.path("situation").asText("").trim();
        String hint = node.path("korean_hint").asText("").trim();
        String sample = node.path("sample_response").asText("").trim();
        if (situation.isEmpty() || sample.isEmpty()) return null;
        return new PracticeScenario(situation, hint.isEmpty() ? null : hint, sample);
    }
}

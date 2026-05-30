package com.tubeshadow.analysis;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.infrastructure.AiAnalysisResult;
import com.tubeshadow.analysis.infrastructure.GeminiClient;
import com.tubeshadow.analysis.infrastructure.GeminiProperties;
import com.tubeshadow.common.exception.BusinessException;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Parser tests for the DEFAULT provider (Gemini), which previously had none. Exercises the
 * candidates→content→parts→text unwrap plus the sentence-mining fields (primary/chunked
 * translation) and the failure contract on truncated/empty responses.
 */
class GeminiClientParseTest {

    private final GeminiClient client = new GeminiClient(
            new GeminiProperties("dummy", "http://unused", "gemini-2.5-flash"),
            new ObjectMapper());

    @Test
    void parsesValidGeminiResponseIncludingTranslations() {
        String response = """
                {
                  "candidates": [
                    { "content": { "parts": [
                      { "text": "{\\"grammar_notes\\":[\\"present perfect\\"],\\"key_expressions\\":[{\\"phrase\\":\\"spin up\\",\\"meaning\\":\\"띄우다\\",\\"usage\\":\\"spin up a server\\"}],\\"vocabulary\\":[{\\"word\\":\\"idempotent\\",\\"meaning\\":\\"멱등\\",\\"level\\":\\"advanced\\"}],\\"context_summary\\":\\"Deploying a service.\\",\\"primary_translation\\":\\"서비스를 배포한다\\",\\"chunked_translation\\":[{\\"en\\":\\"spin up a server\\",\\"ko\\":\\"서버를 띄운다\\"}]}" }
                    ] } }
                  ]
                }""";
        AiAnalysisResult result = client.parseResponse(response);

        assertThat(result.grammarNotes()).containsExactly("present perfect");
        assertThat(result.keyExpressions()).hasSize(1);
        assertThat(result.keyExpressions().get(0).phrase()).isEqualTo("spin up");
        assertThat(result.vocabulary().get(0).level()).isEqualTo("advanced");
        assertThat(result.contextSummary()).isEqualTo("Deploying a service.");
        assertThat(result.primaryTranslation()).isEqualTo("서비스를 배포한다");
        assertThat(result.chunkedTranslation()).hasSize(1);
        assertThat(result.chunkedTranslation().get(0).ko()).isEqualTo("서버를 띄운다");
    }

    @Test
    void stripsMarkdownCodeFence() {
        String response = """
                { "candidates": [ { "content": { "parts": [
                  { "text": "```json\\n{\\"grammar_notes\\":[],\\"key_expressions\\":[],\\"vocabulary\\":[],\\"context_summary\\":\\"hi\\"}\\n```" }
                ] } } ] }""";
        assertThat(client.parseResponse(response).contextSummary()).isEqualTo("hi");
    }

    @Test
    void throwsOnTruncatedJson() {
        // gemini-2.5-flash burned thinking tokens and truncated visible JSON mid-string (a
        // real incident); the parser must surface that as a clean BusinessException.
        String response = """
                { "candidates": [ { "content": { "parts": [
                  { "text": "{\\"grammar_notes\\":[\\"unterminated" }
                ] } } ] }""";
        assertThatThrownBy(() -> client.parseResponse(response))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("파싱 실패");
    }

    @Test
    void throwsWhenNoCandidates() {
        assertThatThrownBy(() -> client.parseResponse("{\"candidates\":[]}"))
                .isInstanceOf(BusinessException.class);
    }
}

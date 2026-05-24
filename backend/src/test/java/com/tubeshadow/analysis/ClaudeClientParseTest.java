package com.tubeshadow.analysis;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.infrastructure.ClaudeClient;
import com.tubeshadow.analysis.infrastructure.ClaudeProperties;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ClaudeClientParseTest {

    private final ClaudeClient client = new ClaudeClient(
            new ClaudeProperties("dummy", "http://unused", "claude-haiku-4-5-20251001"),
            new ObjectMapper());

    @Test
    void parsesValidMessagesApiResponse() {
        String response = """
                {
                  "id": "msg_test",
                  "type": "message",
                  "role": "assistant",
                  "model": "claude-haiku-4-5-20251001",
                  "content": [
                    {
                      "type": "text",
                      "text": "{\\"grammar_notes\\":[\\"'be going to' future\\"],\\"key_expressions\\":[{\\"phrase\\":\\"refactor into\\",\\"meaning\\":\\"…로 리팩터\\",\\"usage\\":\\"refactor a class into modules\\"}],\\"vocabulary\\":[{\\"word\\":\\"refactor\\",\\"meaning\\":\\"리팩터하다\\",\\"level\\":\\"intermediate\\"}],\\"context_summary\\":\\"Plan to split a class.\\"}"
                    }
                  ]
                }""";
        ClaudeClient.AnalysisResult result = client.parseResponse(response);

        assertThat(result.grammarNotes()).containsExactly("'be going to' future");
        assertThat(result.keyExpressions()).hasSize(1);
        assertThat(result.keyExpressions().get(0).phrase()).isEqualTo("refactor into");
        assertThat(result.vocabulary()).hasSize(1);
        assertThat(result.vocabulary().get(0).level()).isEqualTo("intermediate");
        assertThat(result.contextSummary()).isEqualTo("Plan to split a class.");
    }

    @Test
    void stripsMarkdownCodeFence() {
        String response = """
                {
                  "content": [
                    {
                      "type": "text",
                      "text": "```json\\n{\\"grammar_notes\\":[],\\"key_expressions\\":[],\\"vocabulary\\":[],\\"context_summary\\":\\"hi\\"}\\n```"
                    }
                  ]
                }""";
        ClaudeClient.AnalysisResult result = client.parseResponse(response);
        assertThat(result.contextSummary()).isEqualTo("hi");
    }
}

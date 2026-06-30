package com.tubeshadow.practice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.api.dto.ComposeFeedback;
import com.tubeshadow.practice.api.dto.MixResponse;
import com.tubeshadow.practice.api.dto.StoryResponse;
import com.tubeshadow.practice.application.CompositionService;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CompositionServiceTest {

    private final AiAnalysisClient ai = mock(AiAnalysisClient.class);
    private final CompositionService service = new CompositionService(ai, new ObjectMapper());

    @Test
    void parsesAiVerdict() {
        when(ai.isConfigured()).thenReturn(true);
        when(ai.complete(anyString(), anyString())).thenReturn(
                "{\"ok\":true,\"usesTarget\":true,\"feedback\":\"natural\",\"better\":\"It depends on the load.\"}");

        ComposeFeedback fb = service.check("depend on", "rely on", "It depends on the traffic");

        assertThat(fb.ok()).isTrue();
        assertThat(fb.usesTarget()).isTrue();
        assertThat(fb.feedback()).isEqualTo("natural");
        assertThat(fb.better()).isEqualTo("It depends on the load.");
    }

    @Test
    void toleratesMarkdownFence() {
        when(ai.isConfigured()).thenReturn(true);
        when(ai.complete(anyString(), anyString())).thenReturn(
                "```json\n{\"ok\":false,\"usesTarget\":false,\"feedback\":\"use 'good at'\",\"better\":\"I'm good at cooking.\"}\n```");

        ComposeFeedback fb = service.check("good at", "skilled at", "I am good in cooking");

        assertThat(fb.ok()).isFalse();
        assertThat(fb.usesTarget()).isFalse();
        assertThat(fb.better()).isEqualTo("I'm good at cooking.");
    }

    @Test
    void throwsWhenAiNotConfigured() {
        when(ai.isConfigured()).thenReturn(false);

        assertThatThrownBy(() -> service.check("x", "y", "z")).isInstanceOf(BusinessException.class);
        verify(ai, never()).complete(anyString(), anyString()); // never calls the provider
    }

    @Test
    void throwsOnMalformedJson() {
        when(ai.isConfigured()).thenReturn(true);
        when(ai.complete(anyString(), anyString())).thenReturn("not json at all");

        assertThatThrownBy(() -> service.check("x", "y", "z")).isInstanceOf(BusinessException.class);
    }

    @Test
    void mixCombinesChunks() {
        when(ai.isConfigured()).thenReturn(true);
        when(ai.complete(anyString(), anyString())).thenReturn(
                "{\"sentence\":\"I'm trying to set up the CI pipeline.\","
                        + "\"gloss\":\"CI 파이프라인을 설정하려고 하고 있어요.\",\"usedAll\":true,\"note\":\"\"}");

        MixResponse r = service.mix(List.of("I'm trying to V", "set up", "the CI pipeline"));

        assertThat(r.sentence()).isEqualTo("I'm trying to set up the CI pipeline.");
        assertThat(r.usedAll()).isTrue();
        assertThat(r.note()).isEmpty();
    }

    @Test
    void mixFlagsLeftoverChunkAndToleratesFence() {
        when(ai.isConfigured()).thenReturn(true);
        when(ai.complete(anyString(), anyString())).thenReturn(
                "```json\n{\"sentence\":\"I'll roll back the migration.\",\"gloss\":\"마이그레이션을 롤백할게요.\","
                        + "\"usedAll\":false,\"note\":\"'recursion'이 자연스럽게 안 들어감\"}\n```");

        MixResponse r = service.mix(List.of("I'll V", "roll back", "recursion"));

        assertThat(r.usedAll()).isFalse();
        assertThat(r.note()).contains("recursion");
    }

    @Test
    void mixThrowsOnEmptySentence() {
        when(ai.isConfigured()).thenReturn(true);
        when(ai.complete(anyString(), anyString())).thenReturn("{\"sentence\":\"\",\"usedAll\":false}");

        assertThatThrownBy(() -> service.mix(List.of("a", "b"))).isInstanceOf(BusinessException.class);
    }

    @Test
    void storyWeavesChunks() {
        when(ai.isConfigured()).thenReturn(true);
        // story uses the wider-budget complete(system, user, maxTokens) overload.
        when(ai.complete(anyString(), anyString(), anyInt())).thenReturn(
                "{\"story\":\"In standup I said I'm trying to set up the CI pipeline.\","
                        + "\"gloss\":\"스탠드업에서 CI 파이프라인을 설정하려 한다고 말했어요.\",\"note\":\"\"}");

        StoryResponse r = service.story(List.of("I'm trying to V", "set up", "the CI pipeline"));

        assertThat(r.story()).contains("CI pipeline");
        assertThat(r.note()).isEmpty();
    }

    @Test
    void toleratesSingleLineFence() {
        when(ai.isConfigured()).thenReturn(true);
        // some providers emit the JSON on one line inside the fence (no internal newline)
        when(ai.complete(anyString(), anyString())).thenReturn(
                "```json {\"ok\":true,\"usesTarget\":true,\"feedback\":\"good\",\"better\":\"It depends on the load.\"}```");

        ComposeFeedback fb = service.check("depend on", "rely on", "It depends on the load");

        assertThat(fb.ok()).isTrue();
        assertThat(fb.better()).isEqualTo("It depends on the load.");
    }

    @Test
    void storyThrowsOnEmpty() {
        when(ai.isConfigured()).thenReturn(true);
        when(ai.complete(anyString(), anyString(), anyInt())).thenReturn("{\"story\":\"\"}");

        assertThatThrownBy(() -> service.story(List.of("a", "b", "c"))).isInstanceOf(BusinessException.class);
    }
}

package com.tubeshadow.practice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.api.dto.ComposeFeedback;
import com.tubeshadow.practice.application.CompositionService;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
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
}

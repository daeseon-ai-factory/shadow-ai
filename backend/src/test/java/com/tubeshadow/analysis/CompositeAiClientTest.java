package com.tubeshadow.analysis;

import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.analysis.infrastructure.CompositeAiClient;
import com.tubeshadow.common.exception.BusinessException;
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

class CompositeAiClientTest {

    private static AiAnalysisClient provider(boolean configured) {
        AiAnalysisClient c = mock(AiAnalysisClient.class);
        when(c.isConfigured()).thenReturn(configured);
        return c;
    }

    @Test
    void usesFirstConfiguredProviderAndDoesntTouchTheRest() {
        AiAnalysisClient a = provider(true);
        when(a.complete(anyString(), anyString(), anyInt())).thenReturn("A");
        AiAnalysisClient b = provider(true);

        CompositeAiClient comp = new CompositeAiClient(List.of(a, b), "");

        assertThat(comp.complete("s", "u", 100)).isEqualTo("A");
        verify(b, never()).complete(anyString(), anyString(), anyInt());
    }

    @Test
    void fallsBackToNextWhenPrimaryFails() {
        AiAnalysisClient a = provider(true);
        when(a.complete(anyString(), anyString(), anyInt()))
                .thenThrow(new RuntimeException("429 quota exhausted"));
        AiAnalysisClient b = provider(true);
        when(b.complete(anyString(), anyString(), anyInt())).thenReturn("B");

        CompositeAiClient comp = new CompositeAiClient(List.of(a, b), "");

        assertThat(comp.complete("s", "u", 100)).isEqualTo("B");
    }

    @Test
    void skipsUnconfiguredProviders() {
        AiAnalysisClient a = provider(false); // no key → never called
        AiAnalysisClient b = provider(true);
        when(b.complete(anyString(), anyString(), anyInt())).thenReturn("B");

        CompositeAiClient comp = new CompositeAiClient(List.of(a, b), "");

        assertThat(comp.complete("s", "u", 100)).isEqualTo("B");
        verify(a, never()).complete(anyString(), anyString(), anyInt());
    }

    @Test
    void throwsWhenEveryProviderFails() {
        AiAnalysisClient a = provider(true);
        when(a.complete(anyString(), anyString(), anyInt())).thenThrow(new RuntimeException("down"));
        AiAnalysisClient b = provider(true);
        when(b.complete(anyString(), anyString(), anyInt())).thenThrow(new RuntimeException("also down"));

        CompositeAiClient comp = new CompositeAiClient(List.of(a, b), "");

        assertThatThrownBy(() -> comp.complete("s", "u", 100)).isInstanceOf(RuntimeException.class);
    }

    @Test
    void throwsNotConfiguredWhenNoProviderHasAKey() {
        CompositeAiClient comp = new CompositeAiClient(List.of(provider(false), provider(false)), "");
        assertThatThrownBy(() -> comp.complete("s", "u", 100)).isInstanceOf(BusinessException.class);
        assertThat(comp.isConfigured()).isFalse();
    }
}

package com.tubeshadow.practice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.api.dto.SentenceTransform;
import com.tubeshadow.practice.api.dto.SentenceTransformSetResponse;
import com.tubeshadow.practice.api.dto.TransformCheckResponse;
import com.tubeshadow.practice.application.TransformService;
import com.tubeshadow.practice.domain.SentenceTransformSet;
import com.tubeshadow.practice.prompt.TransformPrompt;
import com.tubeshadow.practice.repository.SentenceTransformSetRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class TransformServiceTest {

    private static final UUID USER = UUID.randomUUID();

    private final AiAnalysisClient ai = mock(AiAnalysisClient.class);
    @SuppressWarnings("unchecked")
    private final SentenceTransformSetRepository repo = mock(SentenceTransformSetRepository.class);
    private final TransformService service = new TransformService(ai, new ObjectMapper(), repo);

    @Test
    void generatesAllFifteenInCanonicalOrderAndCaches() {
        when(ai.isConfigured()).thenReturn(true);
        when(repo.findByUserIdAndBaseHash(any(), anyString())).thenReturn(Optional.empty());
        when(ai.complete(anyString(), anyString(), anyInt())).thenReturn(strictGenJson());
        when(repo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        SentenceTransformSetResponse res =
                service.generate(USER, "The API returns duplicate data under load", null);

        assertThat(res.transforms()).hasSize(15);
        assertThat(res.transforms().get(0).op()).isEqualTo("question");
        assertThat(res.transforms().get(9).op()).isEqualTo("prepositionChunk");
        assertThat(res.transforms().get(14).op()).isEqualTo("gerundInfinitive");
        assertThat(res.transforms().get(8).english()).isEqualTo("E-relativeClause");
        assertThat(res.seedId()).isNotBlank();
        verify(repo).save(any());
    }

    @Test
    void defensiveParseToleratesFenceReorderUnknownAndMissing() {
        when(ai.isConfigured()).thenReturn(true);
        when(repo.findByUserIdAndBaseHash(any(), anyString())).thenReturn(Optional.empty());
        when(ai.complete(anyString(), anyString(), anyInt())).thenReturn(messyGenJson());
        when(repo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        SentenceTransformSetResponse res = service.generate(USER, "x", "g");

        // 15 ops minus the one we dropped ("passive"); the unknown op is ignored.
        assertThat(res.transforms()).hasSize(14);
        assertThat(res.transforms()).extracting(SentenceTransform::op)
                .doesNotContain("passive", "frobnicate");
        // Output is always canonical order regardless of the model's input order.
        assertThat(res.transforms().get(0).op()).isEqualTo("question");
    }

    @Test
    void cacheHitSkipsProviderAndSave() {
        SentenceTransformSet existing = SentenceTransformSet.create(USER, "hash", "base", null,
                "[{\"op\":\"question\",\"label\":\"Question\",\"english\":\"E\",\"koreanGloss\":\"K\"}]");
        when(repo.findByUserIdAndBaseHash(any(), anyString())).thenReturn(Optional.of(existing));

        SentenceTransformSetResponse res = service.generate(USER, "base", null);

        assertThat(res.transforms()).hasSize(1);
        assertThat(res.transforms().get(0).english()).isEqualTo("E");
        verify(ai, never()).complete(anyString(), anyString(), anyInt());
        verify(repo, never()).save(any());
    }

    @Test
    void generateThrows503WhenAiNotConfiguredOnCacheMiss() {
        when(repo.findByUserIdAndBaseHash(any(), anyString())).thenReturn(Optional.empty());
        when(ai.isConfigured()).thenReturn(false);

        assertThatThrownBy(() -> service.generate(USER, "base", null))
                .isInstanceOf(BusinessException.class);
        verify(ai, never()).complete(anyString(), anyString(), anyInt());
    }

    @Test
    void generateThrowsBadGatewayOnTruncatedJson() {
        when(ai.isConfigured()).thenReturn(true);
        when(repo.findByUserIdAndBaseHash(any(), anyString())).thenReturn(Optional.empty());
        // The exact 600-token-truncation failure mode this whole feature had to defend against.
        when(ai.complete(anyString(), anyString(), anyInt()))
                .thenReturn("{\"transforms\":[{\"op\":\"question\",\"english\":\"E");

        assertThatThrownBy(() -> service.generate(USER, "base", null))
                .isInstanceOf(BusinessException.class);
        verify(repo, never()).save(any());
    }

    @Test
    void checkParsesVerdict() {
        when(ai.isConfigured()).thenReturn(true);
        when(ai.complete(anyString(), anyString()))
                .thenReturn("{\"ok\":true,\"feedback\":\"natural\",\"better\":\"Does the API return duplicates?\"}");

        TransformCheckResponse r = service.check("question", "base", "model", "attempt");

        assertThat(r.ok()).isTrue();
        assertThat(r.feedback()).isEqualTo("natural");
        assertThat(r.better()).isEqualTo("Does the API return duplicates?");
    }

    @Test
    void checkThrows503WhenAiNotConfigured() {
        when(ai.isConfigured()).thenReturn(false);

        assertThatThrownBy(() -> service.check("question", "b", "m", "a"))
                .isInstanceOf(BusinessException.class);
        verify(ai, never()).complete(anyString(), anyString());
    }

    // --- helpers: build provider payloads from the canonical op list so they stay in sync ---

    private static String strictGenJson() {
        StringBuilder sb = new StringBuilder("{\"transforms\":[");
        List<TransformPrompt.OpSpec> ops = TransformPrompt.OPS;
        for (int i = 0; i < ops.size(); i++) {
            if (i > 0) sb.append(',');
            sb.append(opNode(ops.get(i).op(), ops.get(i).label()));
        }
        return sb.append("]}").toString();
    }

    /** Fenced + reordered + an unknown op + one canonical op ("passive") omitted. */
    private static String messyGenJson() {
        List<TransformPrompt.OpSpec> ops = new ArrayList<>(TransformPrompt.OPS);
        ops.removeIf(s -> s.op().equals("passive"));
        Collections.reverse(ops);
        StringBuilder sb = new StringBuilder("```json\n{\"transforms\":[");
        sb.append("{\"op\":\"frobnicate\",\"english\":\"junk\",\"koreanGloss\":\"x\"}");
        for (TransformPrompt.OpSpec s : ops) {
            sb.append(',').append(opNode(s.op(), s.label()));
        }
        return sb.append("]}\n```").toString();
    }

    private static String opNode(String op, String label) {
        return "{\"op\":\"" + op + "\",\"label\":\"" + label
                + "\",\"english\":\"E-" + op + "\",\"koreanGloss\":\"K-" + op + "\"}";
    }
}

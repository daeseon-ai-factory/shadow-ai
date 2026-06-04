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
    private static final int SLOTS = TransformPrompt.OPS.size();

    private final AiAnalysisClient ai = mock(AiAnalysisClient.class);
    private final SentenceTransformSetRepository repo = mock(SentenceTransformSetRepository.class);
    private final TransformService service = new TransformService(ai, new ObjectMapper(), repo);

    @Test
    void generatesAllSlotsInCanonicalOrderWithCategoryAndCaches() {
        when(ai.isConfigured()).thenReturn(true);
        when(repo.findByUserIdAndBaseHash(any(), anyString())).thenReturn(Optional.empty());
        when(ai.complete(anyString(), anyString(), anyInt())).thenReturn(strictGenJson());
        when(repo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        SentenceTransformSetResponse res =
                service.generate(USER, "The API returns duplicate data under load", null);

        assertThat(res.transforms()).hasSize(SLOTS);
        assertThat(res.transforms().get(0).op()).isEqualTo(TransformPrompt.OPS.get(0).op());
        assertThat(res.transforms().get(0).category()).isEqualTo(TransformPrompt.OPS.get(0).category());
        assertThat(res.transforms().get(SLOTS - 1).op())
                .isEqualTo(TransformPrompt.OPS.get(SLOTS - 1).op());
        // categories are carried through (server-assigned from the slot taxonomy, not the model).
        assertThat(res.transforms()).extracting(SentenceTransform::category)
                .contains("question", "tense", "modal", "prepositionChunk");
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

        // all slots minus the one we dropped; the unknown op is ignored.
        assertThat(res.transforms()).hasSize(SLOTS - 1);
        assertThat(res.transforms()).extracting(SentenceTransform::op)
                .doesNotContain("passive_bepp", "frobnicate");
        // output stays canonical order regardless of the model's input order.
        assertThat(res.transforms().get(0).op()).isEqualTo(TransformPrompt.OPS.get(0).op());
    }

    @Test
    void cacheHitSkipsProviderAndSave() {
        SentenceTransformSet existing = SentenceTransformSet.create(USER, "hash", "base", null,
                "[{\"op\":\"question_yesno\",\"category\":\"question\",\"label\":\"Question · yes/no\",\"english\":\"E\",\"koreanGloss\":\"K\"}]");
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
        // The truncation failure mode the bigger token budget defends against.
        when(ai.complete(anyString(), anyString(), anyInt()))
                .thenReturn("{\"transforms\":[{\"op\":\"question_yesno\",\"english\":\"E");

        assertThatThrownBy(() -> service.generate(USER, "base", null))
                .isInstanceOf(BusinessException.class);
        verify(repo, never()).save(any());
    }

    @Test
    void checkParsesVerdictWithScore() {
        when(ai.isConfigured()).thenReturn(true);
        when(ai.complete(anyString(), anyString())).thenReturn(
                "{\"ok\":true,\"score\":90,\"feedback\":\"natural\",\"better\":\"Does the API return duplicates?\"}");

        TransformCheckResponse r = service.check("Question · why", "base", "model", "attempt");

        assertThat(r.ok()).isTrue();
        assertThat(r.score()).isEqualTo(90);
        assertThat(r.feedback()).isEqualTo("natural");
        assertThat(r.better()).isEqualTo("Does the API return duplicates?");
    }

    @Test
    void checkThrows503WhenAiNotConfigured() {
        when(ai.isConfigured()).thenReturn(false);

        assertThatThrownBy(() -> service.check("Question · why", "b", "m", "a"))
                .isInstanceOf(BusinessException.class);
        verify(ai, never()).complete(anyString(), anyString());
    }

    // --- helpers: build provider payloads from the canonical slot list so they stay in sync ---

    private static String strictGenJson() {
        StringBuilder sb = new StringBuilder("{\"transforms\":[");
        for (int i = 0; i < TransformPrompt.OPS.size(); i++) {
            if (i > 0) sb.append(',');
            sb.append(opNode(TransformPrompt.OPS.get(i).op()));
        }
        return sb.append("]}").toString();
    }

    /** Fenced + reordered + an unknown op + one real slot ("passive_bepp") omitted. */
    private static String messyGenJson() {
        List<TransformPrompt.OpSpec> ops = new ArrayList<>(TransformPrompt.OPS);
        ops.removeIf(s -> s.op().equals("passive_bepp"));
        Collections.reverse(ops);
        StringBuilder sb = new StringBuilder("```json\n{\"transforms\":[");
        sb.append("{\"op\":\"frobnicate\",\"english\":\"junk\",\"koreanGloss\":\"x\"}");
        for (TransformPrompt.OpSpec s : ops) {
            sb.append(',').append(opNode(s.op()));
        }
        return sb.append("]}\n```").toString();
    }

    private static String opNode(String op) {
        return "{\"op\":\"" + op + "\",\"english\":\"E-" + op + "\",\"koreanGloss\":\"K-" + op + "\"}";
    }
}

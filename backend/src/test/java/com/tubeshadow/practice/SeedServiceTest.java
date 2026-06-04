package com.tubeshadow.practice;

import com.tubeshadow.analysis.domain.ChunkPair;
import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.domain.KeyExpression;
import com.tubeshadow.analysis.domain.PracticeScenario;
import com.tubeshadow.analysis.repository.ClipAnalysisRepository;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.practice.api.dto.SeedCandidateResponse;
import com.tubeshadow.practice.application.SeedService;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SeedServiceTest {

    private final ClipRepository clipRepo = mock(ClipRepository.class);
    private final ClipAnalysisRepository analysisRepo = mock(ClipAnalysisRepository.class);
    private final SeedService service = new SeedService(clipRepo, analysisRepo);

    @Test
    void extractsPairedSeedsFromReadyAnalysisInPriorityOrder() {
        UUID userId = UUID.randomUUID();
        UUID clipId = UUID.randomUUID();
        Clip clip = mock(Clip.class);
        when(clip.getId()).thenReturn(clipId);
        when(clipRepo.findByUserId(eq(userId), any())).thenReturn(new PageImpl<>(List.of(clip)));

        ClipAnalysis a = ClipAnalysis.pending(clipId);
        a.markReady(
                List.of(),
                List.of(new KeyExpression("roll back the deployment", "배포를 롤백하다", "usage")),
                List.of(),
                "",
                null,
                List.of(new ChunkPair("The API returns duplicate data under load", "API가 부하에서 중복 데이터를 반환한다")),
                new PracticeScenario("an outage", "이걸 영어로 설명해", "We should add an idempotency key here"),
                List.of(),
                "model");
        when(analysisRepo.findByClipIdIn(any())).thenReturn(List.of(a));

        List<SeedCandidateResponse> seeds = service.seedsFor(userId);

        // practiceScenario first, then 직독직해 clause, then key expression.
        assertThat(seeds).extracting(SeedCandidateResponse::english).containsExactly(
                "We should add an idempotency key here",
                "The API returns duplicate data under load",
                "roll back the deployment");
        assertThat(seeds.get(1).koreanGloss()).isEqualTo("API가 부하에서 중복 데이터를 반환한다");
    }

    @Test
    void skipsFragmentsAndDuplicates() {
        UUID userId = UUID.randomUUID();
        UUID clipId = UUID.randomUUID();
        Clip clip = mock(Clip.class);
        when(clip.getId()).thenReturn(clipId);
        when(clipRepo.findByUserId(eq(userId), any())).thenReturn(new PageImpl<>(List.of(clip)));

        ClipAnalysis a = ClipAnalysis.pending(clipId);
        a.markReady(List.of(), List.of(), List.of(), "", null,
                List.of(new ChunkPair("under load", "부하에서"),                 // < 4 words -> dropped
                        new ChunkPair("The cache was never cleared", "캐시가 비워지지 않았다"),
                        new ChunkPair("The cache was never cleared", "dup")),    // duplicate -> dropped
                null, List.of(), "model");
        when(analysisRepo.findByClipIdIn(any())).thenReturn(List.of(a));

        assertThat(service.seedsFor(userId)).extracting(SeedCandidateResponse::english)
                .containsExactly("The cache was never cleared");
    }

    @Test
    void skipsNonReadyAnalyses() {
        UUID userId = UUID.randomUUID();
        UUID clipId = UUID.randomUUID();
        Clip clip = mock(Clip.class);
        when(clip.getId()).thenReturn(clipId);
        when(clipRepo.findByUserId(eq(userId), any())).thenReturn(new PageImpl<>(List.of(clip)));
        // PENDING analysis (never markReady) must contribute nothing.
        when(analysisRepo.findByClipIdIn(any())).thenReturn(List.of(ClipAnalysis.pending(clipId)));

        assertThat(service.seedsFor(userId)).isEmpty();
    }

    @Test
    void emptyWhenNoClips() {
        UUID userId = UUID.randomUUID();
        when(clipRepo.findByUserId(eq(userId), any())).thenReturn(new PageImpl<>(List.of()));
        assertThat(service.seedsFor(userId)).isEmpty();
    }
}

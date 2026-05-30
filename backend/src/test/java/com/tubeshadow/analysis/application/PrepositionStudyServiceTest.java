package com.tubeshadow.analysis.application;

import com.tubeshadow.analysis.api.dto.MinedPrepositionResponse;
import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.domain.PrepositionNote;
import com.tubeshadow.analysis.repository.ClipAnalysisRepository;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PrepositionStudyServiceTest {

    private final ClipRepository clipRepo = mock(ClipRepository.class);
    private final ClipAnalysisRepository analysisRepo = mock(ClipAnalysisRepository.class);
    private final PrepositionStudyService service = new PrepositionStudyService(clipRepo, analysisRepo);

    @Test
    void groupsAndSortsMinedPrepositionsAcrossClips() {
        UUID userId = UUID.randomUUID();
        UUID clipA = UUID.randomUUID();
        UUID clipB = UUID.randomUUID();

        Clip a = mock(Clip.class);
        when(a.getId()).thenReturn(clipA);
        when(a.getName()).thenReturn("clip A");
        Clip b = mock(Clip.class);
        when(b.getId()).thenReturn(clipB);
        when(b.getName()).thenReturn("clip B");
        when(clipRepo.findByUserId(eq(userId), any())).thenReturn(new PageImpl<>(List.of(a, b)));

        ClipAnalysis aa = ClipAnalysis.pending(clipA);
        aa.markReady(List.of(), List.of(), List.of(), "", null, List.of(), null,
                List.of(new PrepositionNote("into", "refactor into modules", "변형"),
                        new PrepositionNote("With", "with this video", "수단")), "model");
        ClipAnalysis ab = ClipAnalysis.pending(clipB);
        ab.markReady(List.of(), List.of(), List.of(), "", null, List.of(), null,
                List.of(new PrepositionNote("into", "walk into the room", "안으로")), "model");
        when(analysisRepo.findByClipIdIn(any())).thenReturn(List.of(aa, ab));

        List<MinedPrepositionResponse> result = service.minedFor(userId);

        // Sorted by normalized key: "into" then "with"
        assertThat(result).extracting(MinedPrepositionResponse::preposition).containsExactly("into", "With");
        // "into" appears in both clips → 2 occurrences merged under one group
        assertThat(result.get(0).occurrences()).hasSize(2);
        assertThat(result.get(1).occurrences()).hasSize(1);
        assertThat(result.get(0).occurrences().get(0).clipName()).isIn("clip A", "clip B");
    }

    @Test
    void emptyWhenUserHasNoClips() {
        UUID userId = UUID.randomUUID();
        when(clipRepo.findByUserId(eq(userId), any())).thenReturn(new PageImpl<>(List.of()));
        assertThat(service.minedFor(userId)).isEmpty();
    }
}

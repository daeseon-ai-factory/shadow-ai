package com.tubeshadow.practice.application;

import com.tubeshadow.analysis.domain.ChunkPair;
import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.domain.KeyExpression;
import com.tubeshadow.analysis.domain.PracticeScenario;
import com.tubeshadow.analysis.repository.ClipAnalysisRepository;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.practice.api.dto.SeedCandidateResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Seed candidates for the sentence gym: English sentences (+ Korean gloss where available) mined
 * from the learner's own clip analyses — practice scenarios, 직독직해 clauses, and key expressions.
 * Pure read, no AI; replaces the mobile client's transcript-splitting heuristic with curated,
 * translation-paired candidates (mirrors {@link PrepositionStudyService}'s aggregate-my-clips read).
 */
@Service
public class SeedService {

    private static final int MAX_SEEDS = 20;

    private final ClipRepository clipRepository;
    private final ClipAnalysisRepository analysisRepository;

    public SeedService(ClipRepository clipRepository, ClipAnalysisRepository analysisRepository) {
        this.clipRepository = clipRepository;
        this.analysisRepository = analysisRepository;
    }

    @Transactional(readOnly = true)
    public List<SeedCandidateResponse> seedsFor(UUID userId) {
        // A personal library is small; one page of clips is plenty and keeps this a cheap read.
        List<Clip> clips = clipRepository.findByUserId(userId, PageRequest.of(0, 1000)).getContent();
        if (clips.isEmpty()) return List.of();
        List<UUID> clipIds = clips.stream().map(Clip::getId).toList();
        List<ClipAnalysis> analyses = analysisRepository.findByClipIdIn(clipIds);

        Set<String> seen = new HashSet<>();
        List<SeedCandidateResponse> out = new ArrayList<>();
        for (ClipAnalysis a : analyses) {
            if (a.getStatus() != ClipAnalysis.AnalysisStatus.READY) continue;
            // Best first: a full practice-scenario sentence carries a Korean hint.
            PracticeScenario ps = a.getPracticeScenario();
            if (ps != null) add(out, seen, ps.sampleResponse(), ps.koreanHint());
            // 직독직해 clauses come pre-paired with Korean.
            for (ChunkPair ch : a.getChunkedTranslation()) add(out, seen, ch.en(), ch.ko());
            // Key expressions are shorter but still drillable.
            for (KeyExpression ke : a.getKeyExpressions()) add(out, seen, ke.phrase(), ke.meaning());
            if (out.size() >= MAX_SEEDS) break;
        }
        return out.size() > MAX_SEEDS ? out.subList(0, MAX_SEEDS) : out;
    }

    /** Keep declarative, drill-sized English; dedupe case-insensitively; pair Korean when present. */
    private static void add(List<SeedCandidateResponse> out, Set<String> seen, String en, String ko) {
        if (en == null) return;
        String s = en.trim();
        if (s.length() < 12 || s.length() > 200) return;
        if (s.split("\\s+").length < 4) return;
        if (!seen.add(s.toLowerCase())) return;
        out.add(new SeedCandidateResponse(s, (ko == null || ko.isBlank()) ? null : ko.trim()));
    }
}

package com.tubeshadow.analysis.application;

import com.tubeshadow.analysis.api.dto.MinedPrepositionResponse;
import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.domain.PrepositionNote;
import com.tubeshadow.analysis.repository.ClipAnalysisRepository;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Aggregates the preposition notes a learner has mined across their own clips (Feature A
 * data) into a per-preposition view for the study page. Pure read, no AI — it's the
 * learner's own collected examples, grouped.
 */
@Service
public class PrepositionStudyService {

    private final ClipRepository clipRepository;
    private final ClipAnalysisRepository analysisRepository;

    public PrepositionStudyService(ClipRepository clipRepository,
                                   ClipAnalysisRepository analysisRepository) {
        this.clipRepository = clipRepository;
        this.analysisRepository = analysisRepository;
    }

    @Transactional(readOnly = true)
    public List<MinedPrepositionResponse> minedFor(UUID userId) {
        // A personal library is small; one page of clips is plenty and keeps this a cheap read.
        List<Clip> clips = clipRepository.findByUserId(userId, PageRequest.of(0, 1000)).getContent();
        if (clips.isEmpty()) return List.of();
        Map<UUID, String> clipNames = clips.stream()
                .collect(Collectors.toMap(Clip::getId, Clip::getName));

        List<ClipAnalysis> analyses = analysisRepository.findByClipIdIn(clipNames.keySet());

        // Group by normalized preposition (case-insensitive), preserving first-seen display form.
        Map<String, List<MinedPrepositionResponse.Occurrence>> grouped = new LinkedHashMap<>();
        Map<String, String> displayForm = new HashMap<>();
        for (ClipAnalysis a : analyses) {
            if (a.getStatus() != ClipAnalysis.AnalysisStatus.READY) continue;
            for (PrepositionNote note : a.getPrepositionNotes()) {
                if (note.preposition() == null || note.preposition().isBlank()) continue;
                String key = note.preposition().trim().toLowerCase();
                displayForm.putIfAbsent(key, note.preposition().trim());
                grouped.computeIfAbsent(key, k -> new ArrayList<>())
                        .add(new MinedPrepositionResponse.Occurrence(
                                a.getClipId(), clipNames.get(a.getClipId()), note.phrase(), note.sense()));
            }
        }

        return grouped.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(e -> new MinedPrepositionResponse(displayForm.get(e.getKey()), e.getValue()))
                .toList();
    }
}

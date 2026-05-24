package com.tubeshadow.analysis.application;

import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.infrastructure.ClaudeClient;
import com.tubeshadow.analysis.repository.ClipAnalysisRepository;
import com.tubeshadow.clip.application.ClipCreatedEvent;
import com.tubeshadow.clip.application.ClipDeletedEvent;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.UUID;

@Service
public class ClipAnalysisService {

    private static final Logger log = LoggerFactory.getLogger(ClipAnalysisService.class);

    private final ClipRepository clipRepository;
    private final ClipAnalysisRepository analysisRepository;
    private final ClaudeClient claudeClient;

    public ClipAnalysisService(ClipRepository clipRepository,
                               ClipAnalysisRepository analysisRepository,
                               ClaudeClient claudeClient) {
        this.clipRepository = clipRepository;
        this.analysisRepository = analysisRepository;
        this.claudeClient = claudeClient;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Async
    public void onClipCreated(ClipCreatedEvent event) {
        triggerAsync(event.clipId());
    }

    @EventListener
    @Transactional
    public void onClipDeleted(ClipDeletedEvent event) {
        analysisRepository.deleteByClipId(event.clipId());
    }

    @Transactional
    public ClipAnalysis triggerAsync(UUID clipId) {
        ClipAnalysis pending = analysisRepository.findByClipId(clipId)
                .orElseGet(() -> ClipAnalysis.pending(clipId));
        if (analysisRepository.findByClipId(clipId).isEmpty()) {
            analysisRepository.save(pending);
        }
        runAnalysis(clipId);
        return pending;
    }

    @Transactional
    public ClipAnalysis runAnalysis(UUID clipId) {
        Clip clip = clipRepository.findById(clipId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "Clip not found"));
        ClipAnalysis analysis = analysisRepository.findByClipId(clipId)
                .orElseGet(() -> analysisRepository.save(ClipAnalysis.pending(clipId)));

        String transcript = clip.getTranscript();
        if (transcript == null || transcript.isBlank()) {
            analysis.markReady(java.util.List.of(), java.util.List.of(), java.util.List.of(),
                    "Transcript unavailable.", claudeClient.model());
            return analysisRepository.save(analysis);
        }

        if (!claudeClient.isConfigured()) {
            log.info("Claude API key absent — skipping analysis for clip {}", clipId);
            analysis.markFailed("Claude API key not configured");
            return analysisRepository.save(analysis);
        }

        try {
            ClaudeClient.AnalysisResult result = claudeClient.analyzeClip(transcript);
            analysis.markReady(result.grammarNotes(), result.keyExpressions(),
                    result.vocabulary(), result.contextSummary(), claudeClient.model());
        } catch (Exception ex) {
            log.warn("Analysis failed for clip {}: {}", clipId, ex.getMessage());
            analysis.markFailed(ex.getMessage());
        }
        return analysisRepository.save(analysis);
    }

    @Transactional
    public ClipAnalysis regenerate(UUID userId, UUID clipId) {
        Clip clip = clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "Clip not found"));
        analysisRepository.deleteByClipId(clipId);
        analysisRepository.flush();
        ClipAnalysis fresh = analysisRepository.save(ClipAnalysis.pending(clip.getId()));
        triggerAsyncOnly(clipId);
        return fresh;
    }

    @Async
    public void triggerAsyncOnly(UUID clipId) {
        runAnalysis(clipId);
    }

    @Transactional(readOnly = true)
    public ClipAnalysis getForUser(UUID userId, UUID clipId) {
        Clip clip = clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "Clip not found"));
        return analysisRepository.findByClipId(clip.getId())
                .orElseThrow(() -> new NotFoundException("ANALYSIS_NOT_FOUND", "Analysis not started"));
    }
}

package com.tubeshadow.analysis.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "clip_analyses", uniqueConstraints = {
        @UniqueConstraint(name = "uk_clip_analyses_clip_id", columnNames = "clip_id")
})
public class ClipAnalysis extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "clip_id", nullable = false)
    private UUID clipId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 16)
    private AnalysisStatus status;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "grammar_notes", columnDefinition = "jsonb")
    private List<String> grammarNotes = Collections.emptyList();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "key_expressions", columnDefinition = "jsonb")
    private List<KeyExpression> keyExpressions = Collections.emptyList();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "vocabulary", columnDefinition = "jsonb")
    private List<Vocabulary> vocabulary = Collections.emptyList();

    @Column(name = "context_summary", columnDefinition = "text")
    private String contextSummary;

    /** Natural Korean (or learner's L1) translation of the full transcript. Used as the
     *  prompt for Quiz Mode 1 (한글 → 영작). One sentence per clip is enough. */
    @Column(name = "primary_translation", columnDefinition = "text")
    private String primaryTranslation;

    /** 직독직해 — English chunks paired with Korean meaning in source order. Optional
     *  visual aid for shadowing; also fed to Quiz Write so the learner can compose in
     *  English word order instead of mentally re-ordering from natural Korean. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "chunked_translation", columnDefinition = "jsonb")
    private List<ChunkPair> chunkedTranslation = Collections.emptyList();

    /** A real-world situation that prompts the learner to use this clip's expression
     *  in their own words. Generated once at analysis time, reused for every review. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "practice_scenario", columnDefinition = "jsonb")
    private PracticeScenario practiceScenario;

    /** Feature A — prepositions/particles in the transcript with the relationship each encodes. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "preposition_notes", columnDefinition = "jsonb")
    private List<PrepositionNote> prepositionNotes = Collections.emptyList();

    @Column(name = "model", length = 100)
    private String model;

    @Column(name = "generated_at")
    private Instant generatedAt;

    @Column(name = "error_message", length = 1000)
    private String errorMessage;

    protected ClipAnalysis() {
    }

    private ClipAnalysis(UUID id, UUID clipId, AnalysisStatus status) {
        this.id = id;
        this.clipId = clipId;
        this.status = status;
    }

    public static ClipAnalysis pending(UUID clipId) {
        return new ClipAnalysis(UUID.randomUUID(), clipId, AnalysisStatus.PENDING);
    }

    public void markReady(List<String> grammarNotes,
                          List<KeyExpression> keyExpressions,
                          List<Vocabulary> vocabulary,
                          String contextSummary,
                          String primaryTranslation,
                          List<ChunkPair> chunkedTranslation,
                          PracticeScenario practiceScenario,
                          List<PrepositionNote> prepositionNotes,
                          String model) {
        this.grammarNotes = grammarNotes == null ? Collections.emptyList() : List.copyOf(grammarNotes);
        this.keyExpressions = keyExpressions == null ? Collections.emptyList() : List.copyOf(keyExpressions);
        this.vocabulary = vocabulary == null ? Collections.emptyList() : List.copyOf(vocabulary);
        this.contextSummary = contextSummary;
        this.primaryTranslation = primaryTranslation;
        this.chunkedTranslation = chunkedTranslation == null ? Collections.emptyList() : List.copyOf(chunkedTranslation);
        this.practiceScenario = practiceScenario;
        this.prepositionNotes = prepositionNotes == null ? Collections.emptyList() : List.copyOf(prepositionNotes);
        this.model = model;
        this.generatedAt = Instant.now();
        this.status = AnalysisStatus.READY;
        this.errorMessage = null;
    }

    public void markFailed(String message) {
        this.status = AnalysisStatus.FAILED;
        this.errorMessage = message;
    }

    public UUID getId() {
        return id;
    }

    public UUID getClipId() {
        return clipId;
    }

    public AnalysisStatus getStatus() {
        return status;
    }

    public List<String> getGrammarNotes() {
        return grammarNotes == null ? Collections.emptyList() : grammarNotes;
    }

    public List<KeyExpression> getKeyExpressions() {
        return keyExpressions == null ? Collections.emptyList() : keyExpressions;
    }

    public List<Vocabulary> getVocabulary() {
        return vocabulary == null ? Collections.emptyList() : vocabulary;
    }

    public String getContextSummary() {
        return contextSummary;
    }

    public String getPrimaryTranslation() {
        return primaryTranslation;
    }

    public List<ChunkPair> getChunkedTranslation() {
        return chunkedTranslation == null ? Collections.emptyList() : chunkedTranslation;
    }

    public PracticeScenario getPracticeScenario() {
        return practiceScenario;
    }

    public List<PrepositionNote> getPrepositionNotes() {
        return prepositionNotes == null ? Collections.emptyList() : prepositionNotes;
    }

    public String getModel() {
        return model;
    }

    public Instant getGeneratedAt() {
        return generatedAt;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public enum AnalysisStatus {
        PENDING, READY, FAILED
    }
}

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
                          String model) {
        this.grammarNotes = grammarNotes == null ? Collections.emptyList() : List.copyOf(grammarNotes);
        this.keyExpressions = keyExpressions == null ? Collections.emptyList() : List.copyOf(keyExpressions);
        this.vocabulary = vocabulary == null ? Collections.emptyList() : List.copyOf(vocabulary);
        this.contextSummary = contextSummary;
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

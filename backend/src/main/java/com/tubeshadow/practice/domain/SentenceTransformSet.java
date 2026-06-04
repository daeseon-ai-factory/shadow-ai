package com.tubeshadow.practice.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.util.UUID;

/**
 * Server-side cache of one seed sentence's generated 15-transform set. One LLM generation call per
 * unique (user, normalized seed) — the JSON is stored verbatim and replayed on cache hit, so
 * re-drilling the same mined sentence costs nothing. The row {@code id} also mints the SRS card keys.
 */
@Entity
@Table(name = "sentence_transform_set", uniqueConstraints = {
        @UniqueConstraint(name = "uk_sentence_transform_set_user_hash", columnNames = {"user_id", "base_hash"})
})
public class SentenceTransformSet extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    /** SHA-256 of the normalized seed (trim + lowercase + collapsed whitespace) — the cache lookup key. */
    @Column(name = "base_hash", nullable = false, length = 64)
    private String baseHash;

    @Column(name = "base_sentence", nullable = false, columnDefinition = "TEXT")
    private String baseSentence;

    @Column(name = "base_gloss", columnDefinition = "TEXT")
    private String baseGloss;

    /** The canonical-order transforms list, serialized JSON. */
    @Column(name = "transforms_json", nullable = false, columnDefinition = "TEXT")
    private String transformsJson;

    protected SentenceTransformSet() {}

    private SentenceTransformSet(UUID id, UUID userId, String baseHash, String baseSentence,
                                 String baseGloss, String transformsJson) {
        this.id = id;
        this.userId = userId;
        this.baseHash = baseHash;
        this.baseSentence = baseSentence;
        this.baseGloss = baseGloss;
        this.transformsJson = transformsJson;
    }

    public static SentenceTransformSet create(UUID userId, String baseHash, String baseSentence,
                                              String baseGloss, String transformsJson) {
        return new SentenceTransformSet(UUID.randomUUID(), userId, baseHash, baseSentence, baseGloss, transformsJson);
    }

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public String getBaseHash() { return baseHash; }
    public String getBaseSentence() { return baseSentence; }
    public String getBaseGloss() { return baseGloss; }
    public String getTransformsJson() { return transformsJson; }
}

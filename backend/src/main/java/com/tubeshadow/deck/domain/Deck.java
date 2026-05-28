package com.tubeshadow.deck.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.util.UUID;

@Entity
@Table(name = "decks", uniqueConstraints = {
        @UniqueConstraint(name = "uk_decks_user_name", columnNames = {"user_id", "name"})
})
public class Deck extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    protected Deck() {}

    private Deck(UUID id, UUID userId, String name, String description) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
    }

    public static Deck createNew(UUID userId, String name, String description) {
        return new Deck(UUID.randomUUID(), userId, name, description);
    }

    public void rename(String name) { this.name = name; }
    public void updateDescription(String description) { this.description = description; }

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public String getName() { return name; }
    public String getDescription() { return description; }
}

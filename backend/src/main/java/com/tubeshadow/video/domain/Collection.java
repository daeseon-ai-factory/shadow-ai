package com.tubeshadow.video.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.util.UUID;

@Entity
@Table(name = "collections", uniqueConstraints = {
        @UniqueConstraint(name = "uk_collections_slug", columnNames = "slug")
})
public class Collection extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "slug", nullable = false, length = 80)
    private String slug;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic;

    protected Collection() {}

    private Collection(UUID id, String slug, String name, String description, boolean isPublic) {
        this.id = id;
        this.slug = slug;
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
    }

    public static Collection createPublic(String slug, String name, String description) {
        return new Collection(UUID.randomUUID(), slug, name, description, true);
    }

    public UUID getId() { return id; }
    public String getSlug() { return slug; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public boolean isPublic() { return isPublic; }
}

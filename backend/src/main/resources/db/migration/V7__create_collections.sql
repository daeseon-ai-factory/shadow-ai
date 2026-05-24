CREATE TABLE collections (
    id           UUID PRIMARY KEY,
    slug         VARCHAR(80)  NOT NULL,
    name         VARCHAR(200) NOT NULL,
    description  VARCHAR(1000),
    is_public    BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP    NOT NULL,
    updated_at   TIMESTAMP
);

CREATE UNIQUE INDEX uk_collections_slug ON collections (slug);

CREATE TABLE collection_videos (
    collection_id UUID NOT NULL REFERENCES collections (id) ON DELETE CASCADE,
    video_id      UUID NOT NULL REFERENCES videos (id) ON DELETE CASCADE,
    position      INTEGER NOT NULL,
    category      VARCHAR(60),
    PRIMARY KEY (collection_id, video_id)
);

CREATE INDEX idx_collection_videos_collection ON collection_videos (collection_id, position);

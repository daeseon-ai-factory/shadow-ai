CREATE TABLE recordings (
    id            UUID PRIMARY KEY,
    user_id       UUID         NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    clip_id       UUID         NOT NULL REFERENCES clips (id) ON DELETE CASCADE,
    file_path     VARCHAR(500) NOT NULL,
    content_type  VARCHAR(100),
    duration_ms   BIGINT       NOT NULL,
    size_bytes    BIGINT       NOT NULL,
    created_at    TIMESTAMP    NOT NULL,
    updated_at    TIMESTAMP
);

CREATE INDEX idx_recordings_user_id ON recordings (user_id);
CREATE INDEX idx_recordings_clip_id ON recordings (clip_id);

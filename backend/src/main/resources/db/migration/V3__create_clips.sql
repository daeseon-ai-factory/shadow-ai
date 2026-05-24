CREATE TABLE clips (
    id          UUID PRIMARY KEY,
    user_id     UUID         NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    video_id    UUID         NOT NULL REFERENCES videos (id) ON DELETE CASCADE,
    start_ms    BIGINT       NOT NULL,
    end_ms      BIGINT       NOT NULL,
    name        VARCHAR(200) NOT NULL,
    tags        JSONB        NOT NULL DEFAULT '[]'::jsonb,
    transcript  TEXT,
    created_at  TIMESTAMP    NOT NULL,
    updated_at  TIMESTAMP,
    CONSTRAINT ck_clips_range CHECK (end_ms > start_ms)
);

CREATE INDEX idx_clips_user_id  ON clips (user_id);
CREATE INDEX idx_clips_video_id ON clips (video_id);
CREATE INDEX idx_clips_tags     ON clips USING GIN (tags);

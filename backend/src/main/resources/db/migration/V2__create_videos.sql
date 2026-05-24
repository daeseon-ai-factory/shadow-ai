CREATE TABLE videos (
    id                  UUID PRIMARY KEY,
    youtube_id          VARCHAR(32)  NOT NULL,
    title               VARCHAR(500) NOT NULL,
    channel_name        VARCHAR(255),
    duration_seconds    INTEGER,
    thumbnail_url       VARCHAR(500),
    transcript_status   VARCHAR(32)  NOT NULL DEFAULT 'PENDING',
    transcript_segments JSONB        NOT NULL DEFAULT '[]'::jsonb,
    created_at          TIMESTAMP    NOT NULL,
    updated_at          TIMESTAMP
);

CREATE UNIQUE INDEX uk_videos_youtube_id ON videos (youtube_id);

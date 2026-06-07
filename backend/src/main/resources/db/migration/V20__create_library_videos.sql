-- A per-user "saved videos" library. `videos` itself is a GLOBAL cache (one row per youtube_id,
-- no owner), so this join table is what makes "the videos I imported" a real, reopenable concept —
-- the missing piece for the TubeShad-style flow (save a video, come back later, read its full
-- transcript, shadow any line). Clips stay independent (they have their own cascade).
CREATE TABLE library_videos (
    id          UUID PRIMARY KEY,
    user_id     UUID      NOT NULL REFERENCES users (id)  ON DELETE CASCADE,
    video_id    UUID      NOT NULL REFERENCES videos (id) ON DELETE CASCADE,
    created_at  TIMESTAMP NOT NULL,
    updated_at  TIMESTAMP,
    -- One library entry per (user, video): makes "save" idempotent (re-import never duplicates).
    CONSTRAINT uk_library_user_video UNIQUE (user_id, video_id)
);

CREATE INDEX idx_library_videos_user ON library_videos (user_id);

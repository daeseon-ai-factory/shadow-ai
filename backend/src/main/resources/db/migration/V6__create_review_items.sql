CREATE TABLE review_items (
    id                 UUID PRIMARY KEY,
    user_id            UUID         NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    clip_id            UUID         NOT NULL REFERENCES clips (id) ON DELETE CASCADE,
    easiness           DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    interval_days      INTEGER      NOT NULL DEFAULT 0,
    repetitions        INTEGER      NOT NULL DEFAULT 0,
    due_date           DATE         NOT NULL,
    last_reviewed_at   TIMESTAMP,
    created_at         TIMESTAMP    NOT NULL,
    updated_at         TIMESTAMP
);

CREATE UNIQUE INDEX uk_review_items_user_clip ON review_items (user_id, clip_id);
CREATE INDEX idx_review_items_user_due ON review_items (user_id, due_date);

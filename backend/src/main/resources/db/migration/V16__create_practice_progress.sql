-- Per-user daily drill progress (pattern + collocation drills share one practice streak).
-- One row per user; the daily streak/reps were previously browser-localStorage only, which
-- meant no cross-device sync and no retention signal. This moves them onto the account.
CREATE TABLE practice_progress (
    id              UUID PRIMARY KEY,
    user_id         UUID    NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    current_streak  INTEGER NOT NULL DEFAULT 0,
    longest_streak  INTEGER NOT NULL DEFAULT 0,
    last_date       DATE,
    reps_today      INTEGER NOT NULL DEFAULT 0,
    total_reps      BIGINT  NOT NULL DEFAULT 0,
    created_at      TIMESTAMP NOT NULL,
    updated_at      TIMESTAMP
);
CREATE UNIQUE INDEX uk_practice_progress_user ON practice_progress (user_id);

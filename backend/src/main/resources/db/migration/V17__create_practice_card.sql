-- Per-user spaced-repetition (Leitner) state for a single drill card. A "card" is one
-- pattern/collocation item, keyed by a stable string (e.g. "pat:on-depend-on#0",
-- "col:about-care-about#1"). The daily drill surfaces the cards due today + a few new ones,
-- instead of reshuffling the whole deck — so weak items come back and mastered ones fade.
CREATE TABLE practice_card (
    id               UUID PRIMARY KEY,
    user_id          UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    card_key         VARCHAR(120) NOT NULL,
    box              INTEGER NOT NULL DEFAULT 0,
    due_date         DATE    NOT NULL,
    correct_count    INTEGER NOT NULL DEFAULT 0,
    lapse_count      INTEGER NOT NULL DEFAULT 0,
    last_reviewed_at TIMESTAMP,
    created_at       TIMESTAMP NOT NULL,
    updated_at       TIMESTAMP
);
CREATE UNIQUE INDEX uk_practice_card_user_key ON practice_card (user_id, card_key);
CREATE INDEX idx_practice_card_user_due ON practice_card (user_id, due_date);

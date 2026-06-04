-- Server-side cache of one seed sentence's generated 15-transform "sentence gym" set. One LLM
-- generation call per unique (user, normalized seed); the transforms JSON is stored verbatim and
-- replayed on cache hit, so re-drilling the same mined sentence is free. The row id doubles as the
-- seedId that mints short SRS card keys (tf:<seedId>:<op>#0), keyed per-user (private mined content).
CREATE TABLE sentence_transform_set (
    id              UUID PRIMARY KEY,
    user_id         UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    base_hash       VARCHAR(64) NOT NULL,
    base_sentence   TEXT NOT NULL,
    base_gloss      TEXT,
    transforms_json TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL,
    updated_at      TIMESTAMP
);
CREATE UNIQUE INDEX uk_sentence_transform_set_user_hash ON sentence_transform_set (user_id, base_hash);

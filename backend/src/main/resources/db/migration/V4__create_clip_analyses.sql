CREATE TABLE clip_analyses (
    id              UUID PRIMARY KEY,
    clip_id         UUID         NOT NULL REFERENCES clips (id) ON DELETE CASCADE,
    status          VARCHAR(16)  NOT NULL,
    grammar_notes   JSONB        NOT NULL DEFAULT '[]'::jsonb,
    key_expressions JSONB        NOT NULL DEFAULT '[]'::jsonb,
    vocabulary      JSONB        NOT NULL DEFAULT '[]'::jsonb,
    context_summary TEXT,
    model           VARCHAR(100),
    generated_at    TIMESTAMP,
    error_message   VARCHAR(1000),
    created_at      TIMESTAMP    NOT NULL,
    updated_at      TIMESTAMP
);

CREATE UNIQUE INDEX uk_clip_analyses_clip_id ON clip_analyses (clip_id);

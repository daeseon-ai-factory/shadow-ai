-- Anki 식 덱. 사용자가 클립들을 명시적으로 그룹화 (출퇴근용 / 인터뷰 표현 / OOP 등).
-- 한 클립은 한 덱에만 속함 (Anki 모델과 동일). deck_id NULL = "Inbox" (덱 미지정).
CREATE TABLE decks (
    id          UUID PRIMARY KEY,
    user_id     UUID         NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    name        VARCHAR(120) NOT NULL,
    description TEXT,
    created_at  TIMESTAMP    NOT NULL,
    updated_at  TIMESTAMP
);

-- 한 사용자 안에서 덱 이름 유일.
CREATE UNIQUE INDEX uk_decks_user_name ON decks (user_id, name);
CREATE INDEX idx_decks_user ON decks (user_id);

-- 클립 → 덱 (nullable = Inbox). 덱 삭제 시 클립은 Inbox로 (SET NULL, 클립 자체는 보존).
ALTER TABLE clips
    ADD COLUMN deck_id UUID REFERENCES decks (id) ON DELETE SET NULL;

CREATE INDEX idx_clips_deck ON clips (deck_id);

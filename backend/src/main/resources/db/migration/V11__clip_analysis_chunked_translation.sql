-- 직독직해 (chunked translation): 영어 chunk와 한국어 chunk를 평행 배열로 저장.
-- AI가 한 번에 같이 만들어서 재호출 없음. Quiz Write 모드의 재료.
-- Schema: [{"en": "He", "ko": "그는"}, {"en": "has made", "ko": "만들어왔다"}, ...]
ALTER TABLE clip_analyses
    ADD COLUMN chunked_translation JSONB NOT NULL DEFAULT '[]'::jsonb;

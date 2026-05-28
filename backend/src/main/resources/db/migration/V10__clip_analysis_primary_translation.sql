-- AI 분석에 "전체 자막의 자연스러운 한국어/모국어 번역" 한 줄 저장.
-- Quiz Mode (한글 → 영작) 의 재료. NULL 허용: 기존 분석은 "다시 분석" 누를 때 채워짐.
ALTER TABLE clip_analyses
    ADD COLUMN primary_translation TEXT;

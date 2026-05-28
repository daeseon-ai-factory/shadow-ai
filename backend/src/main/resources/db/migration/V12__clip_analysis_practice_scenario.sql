-- Step 4: AI가 클립당 자연스러운 사용 상황 1개를 생성.
-- 사용자는 상황 보고 본인이 그 표현을 써서 응답함 → 출력 (output) 학습.
-- Schema: {"situation": "회의에서…", "korean_hint": "~ 표현 사용", "sample_response": "..."}
ALTER TABLE clip_analyses
    ADD COLUMN practice_scenario JSONB;

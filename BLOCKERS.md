# 블로커

> 막힐 때마다 기록. 활성 블로커가 있어도 의존 없는 다른 태스크는 계속 진행.

## 활성

### B-001 (2026-05-24) — YouTube 자막 추출 ToS 회색지대
- **태스크**: T-028 YoutubeTranscriptClient
- **상황**: YouTube 공식 자막 API가 없고, `ytInitialPlayerResponse` 스크래핑 + `timedtext` 호출은 비공식 경로
- **현재 구현**: watch HTML → ytInitialPlayerResponse → captionTracks → fmt=json3 직접 호출 (Mozilla UA)
- **위험**: YouTube가 응답 형식을 바꾸면 깨짐. 상업적 사용 시 ToS 검토 필요
- **MVP 영향**: 본인 학습용으로는 OK. 자막 못 가져오는 영상은 `transcript_status=UNAVAILABLE`로 저장하고 진행
- **다음 단계** (v1 이후 검토): YouTube Data API v3 사용 또는 공식 파트너 채널과 협의

## 해결됨

(없음)

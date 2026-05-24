# 진행 상황

> Claude Code 자율 실행 트래커
> 최종 갱신: 2026-05-24 02:25 KST

## 전체 상태
- **STAGE 0~9: 69개 태스크 모두 완료** ✅
- **추가 폴리시 + 코드 리뷰 수정 완료** ✅
- 백엔드 테스트: **50+ passed** (Sm2, JWT, Auth, AuthRateLimit, Profile, ClipService, ClipDeleteCascade, Recording, ClaudeParse, Domain integration)
- 프론트엔드: Vitest **11 passed** + build success + lint clean
- Docker 이미지 빌드 성공
- 종합 스모크 ALL PASSED + 동시 signup 경합 → 409 검증

## 커밋 히스토리 (16 commits)
```
74b3d74 [review-fixes] 코드 리뷰 HIGH/MEDIUM 이슈 수정
5be5f2f [feat] 클립별 사용자 노트, README 갱신
37a87da [hardening] CORS env-driven, auth rate limit, recording orphan cleanup
4eb98c5 [fix+polish] StaleObjectStateException 수정, 녹음 파일 누수, 정렬, 내보내기
8d2ee04 [polish] N+1 fix, 단축키, 프로필 설정, 클립 편집, 태그 자동완성, CI
1aa36e9 [STAGE-9] 폴리시 + 배포 + 최종 검증 (T-064 ~ T-069)
5633a77 [STAGE-8] 큐레이션 컬렉션 (T-061 ~ T-063)
880b9f7 [STAGE-7] SRS 복습 큐 (T-055 ~ T-060)
23ded56 [STAGE-6] 녹음 + A/B 비교 (T-048 ~ T-054)
c37ce9f [STAGE-5] AI 인라인 설명 (T-042 ~ T-047)
938c945 [STAGE-4] 클립 + 라이브러리 (T-034 ~ T-041)
20ca202 [STAGE-3] YouTube 통합 (T-026 ~ T-033)
40a888d [STAGE-2] 인증 + 사용자 컨텍스트 (T-019 ~ T-025)
de8295b [STAGE-1] 도메인 모델 + DB 스키마 (T-011 ~ T-018)
de5878b [STAGE-0] 부트스트랩 완료 (T-001 ~ T-010)
e04bc34 Initial commit
```

## STAGE 0~9 요약 (생략 — 이전 PROGRESS 참조)
STAGE 0~9의 69개 태스크는 모두 완료. 자세한 내역은 git log 또는 위 커밋 메시지 참조.

## 추가 폴리시 (Roadmap 이후)
### 성능
- ClipService.list: 클립당 video 개별 조회 → `findAllById` 배치 (N+1 제거)
- ReviewService.queue: 큐 항목별 clip+video 개별 조회 → 둘 다 배치
- Claude HTTP 호출이 트랜잭션 안에서 실행되어 커넥션 풀 점유 → 파이프라인 분리로 트랜잭션 밖 실행

### UX / 마찰 제거
- 키보드 단축키: 플레이어 (Space, R, L, ',', '.', 0), 복습 (Space, A, 1~4), 도움말 (?)
- 프로필 설정 페이지: 이름 변경, 비밀번호 변경
- 클립 편집: PATCH 엔드포인트 (name/tags/transcript/note), 태그 자동완성
- 라이브러리 정렬: newest/oldest/name/duration
- JSON 내보내기 (Bearer 헤더 + blob URL 다운로드, truncation 표시)
- 클립별 사용자 노트 (Markdown 자유 텍스트)

### 보안 / 운영 하드닝
- CORS: 환경변수 CORS_ALLOWED_ORIGINS로 운영 도메인 추가
- Auth rate limit: IP당 분당 20회 (signup/login), X-Forwarded-For는 trusted-proxies에서만 신뢰
- Constant-time login: unknown email에도 bcrypt matches 실행 → user enumeration 방지
- DataIntegrityViolation → 409 CONFLICT (동시 signup 경합 안전)
- Multipart 한도 12MB로 설정 + MaxUploadSizeExceededException → 413
- Recording 파일 삭제 afterCommit으로 지연 (롤백 시 orphan 방지)
- ReviewService.onClipCreated 경합 가드 (클립 즉시 삭제 시나리오)
- 프로덕션: server.error.include-message=never (내부 예외 메시지 숨김)

### 테스트
- 프론트엔드 Vitest 설정 + 11 테스트 (apiRequest, useShortcuts)
- AuthRateLimitFilterTest: 6가지 시나리오 (윈도우, 다른 IP, trusted proxy 등)
- ClipDeleteCascadeTest: StaleObjectStateException 회귀 방지
- ProfileEndpointTest: PATCH /me, 비밀번호 변경 happy + 거부 + 약한 비밀번호

### 인프라
- CI: .github/workflows/ci.yml (backend test/build, frontend lint/test/build, docker build)
- 종합 스모크 스크립트: scripts/smoke.sh (모든 엔드포인트 + 정렬 + 페이지)

## NORTH STAR 최종 검증 ✅
- 0.3.1 사용자 자유 구간 선택 (자막 클릭 + 시작/끝 버튼)
- 0.3.2 평생 복습 라이브러리 (Clip + Recording + ReviewItem + Note 영구)
- 0.3.3 앱 안에서 AI 설명 (Claude Haiku 인라인)
- 0.3.4 마찰 제거 (단축키 + 자동 분석 + 무한 루프 + 자동 SRS)
- 0.3.5 운영 비용 낮음 (Haiku + caching, 1000명 ~$30/월)

## OUT-OF-SCOPE 검증 ✅
11개 항목 모두 미포함 — 발음 점수, 프로소디, 직독직해 (WE가 제공 X; 사용자 노트는 본인 데이터),
사용자간 공유, 모바일 네이티브, 결제, 영어 외 언어, 개발자 외 큐레이션, Whisper, 자체 STT, 다국어 UI

## 인프라 메모
- Java 21: `/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home` (~/.zshrc 영구)
- DB 포트: 5434 (호스트 5432 충돌 회피)
- Docker 이미지: `docker build -t tubeshadow-backend ./backend`

## 활성 블로커
- [B-001](./BLOCKERS.md) YouTube 자막 추출 ToS 회색 — 본인 학습 MVP는 OK, 상용 시 검토

## 다음 세션 권장
1. `curated-videos.yml`에 검증된 ~30개 영상 추가 (현재 starter 4개)
2. ANTHROPIC_API_KEY 설정 후 실제 분석 5건 수동 검수
3. Vercel + Railway 배포 → 종단간 스모크
4. 추가 코드 리뷰 LOW 항목: search LIKE escape, JWT tokenVersion claim, 큐레이션 seeder async

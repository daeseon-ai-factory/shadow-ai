# 진행 상황

> Claude Code 24시간 자율 실행 트래커
> 최종 갱신: 2026-05-24 01:05 KST

## 전체 상태
- **모든 69개 태스크 완료** ✅
- STAGE 0~9 게이트 모두 통과
- NORTH STAR 0.3 5가지 가치 모두 충족
- OUT-OF-SCOPE 0.4 11개 항목 모두 미포함 (검증)
- 백엔드 테스트: 41 passed
- 프론트엔드 빌드: 성공
- Docker 이미지 빌드: 성공

## 완료 (스테이지별)

### STAGE 0: 부트스트랩 (T-001 ~ T-010)
- [x] T-001: 모노레포 구조 + .gitignore
- [x] T-002: PostgreSQL docker-compose (호스트 5432 충돌 → 5434 매핑)
- [x] T-003: Spring Boot 3.3.5 + Java 21 toolchain (Homebrew openjdk@21 설치)
- [x] T-004: BaseEntity / ApiResponse / GlobalExceptionHandler / BusinessException 계열
- [x] T-005: GET /api/health → 200
- [x] T-006: application.yml dev/prod/test/integ 프로파일
- [x] T-007: springdoc-openapi → /swagger-ui/index.html
- [x] T-008: Next.js 16 (App Router, TS strict, Tailwind 4, Turbopack)
- [x] T-009: shadcn/ui base-nova (button/card/input/dialog/...)
- [x] T-010: lib/api/client.ts + TanStack Query Providers, 메인 페이지 health 호출 성공

### STAGE 1: 도메인 모델 + DB (T-011 ~ T-018)
- [x] T-011 ~ T-017: User, Video, Clip, ClipAnalysis, Recording, ReviewItem 엔티티 + Repository
- [x] T-012: Flyway V1~V6 마이그레이션 (JSONB 사용)
- [x] T-018: DomainIntegrationTest (전체 도메인 라운드트립)
- 인프라: Testcontainers PostgreSQL 베이스 (싱글톤 재사용)

### STAGE 2: 인증 + 사용자 (T-019 ~ T-025)
- [x] T-019: JwtTokenProvider (HS256, 24h TTL) + BCryptPasswordEncoder
- [x] T-020: SecurityConfig (Stateless + JWT 필터 + CORS)
- [x] T-021, T-022: POST /api/auth/signup, /login (token 발급)
- [x] T-023: @CurrentUser + CurrentUserArgumentResolver
- [x] T-024: AuthForm (signup/login 공유)
- [x] T-025: Zustand auth-store (localStorage 영속), (app) 그룹 보호 라우트

### STAGE 3: YouTube 통합 (T-026 ~ T-033)
- [x] T-026: YoutubeUrlParser (5+ 형식)
- [x] T-027: YoutubeMetadataClient (oEmbed)
- [x] T-028: YoutubeTranscriptClient (ytInitialPlayerResponse + json3) → BLOCKERS B-001 (ToS 회색)
- [x] T-029, T-030: POST /api/videos/import, GET /api/videos/{id}
- [x] T-031: /import 페이지
- [x] T-032: YoutubePlayer 래퍼 (play/pause/seekTo/setPlaybackRate)
- [x] T-033: TranscriptPanel (자동 스크롤, 클릭 시 seek)

### STAGE 4: 클립 + 라이브러리 (T-034 ~ T-041)
- [x] T-034: POST /api/clips + TranscriptSlicer로 transcript 자동
- [x] T-035, T-036: GET /api/clips (검색/태그 필터, JSONB @>), GET/DELETE /api/clips/{id}
- [x] T-037: ClipCreatePanel (시작/끝 버튼 + 자막 더블클릭으로 범위 확장)
- [x] T-038: 저장 모달 (이름 자동 시드, 태그)
- [x] T-039: /library — 카드 그리드, 검색, 태그 필터
- [x] T-040: /player/[clipId] — 무한 반복, 0.5x~1.5x 슬라이더
- [x] T-041: 큰 글씨 자막 패널

### STAGE 5: AI 인라인 설명 (T-042 ~ T-047)
- [x] T-042: ClaudeClient (RestClient, claude-haiku-4-5-20251001, cache_control)
- [x] T-043: ClipAnalysisPrompt (시스템 프롬프트 + 1-shot + 엄격 JSON 스키마)
- [x] T-044: @TransactionalEventListener(AFTER_COMMIT) + @Async → 백그라운드 분석
- [x] T-045: GET /api/clips/{id}/analysis (PENDING→202, READY→200)
- [x] T-046: AnalysisPanel — 맥락/문법/표현/어휘, 3초 폴링
- [x] T-047: POST /api/clips/{id}/analysis/regenerate + UI 버튼

### STAGE 6: 녹음 + A/B (T-048 ~ T-054)
- [x] T-048: RecordingStorage 인터페이스 + LocalRecordingStorage (path escape 방어)
- [x] T-049: POST /api/clips/{id}/recordings (multipart, 화이트리스트 content-type)
- [x] T-050: GET /api/clips/{id}/recordings + GET /api/recordings/{id}/audio (스트리밍)
- [x] T-051: DELETE /api/recordings/{id}
- [x] T-052: Recorder (MediaRecorder, mime 자동 선택)
- [x] T-053: RecordingPanel — 녹음 → 자동 업로드
- [x] T-054: '원본 → 본인' A/B 재생 + 어제/오늘 녹음 비교 청취

### STAGE 7: SRS 복습 (T-055 ~ T-060)
- [x] T-055: Sm2Calculator (표준 SM-2, EF floor 1.3, Clock 주입)
- [x] T-056: 클립 저장 → ReviewItem(dueDate=today) 자동 생성 (REQUIRES_NEW 트랜잭션)
- [x] T-057: GET /api/review/queue
- [x] T-058: POST /api/review/items/{id}/respond
- [x] T-059: /review 페이지 (Again/Hard/Good/Easy + 자막 보기 토글 + 진행 카운트)
- [x] T-060: StreakWidget (라이브러리 상단, due + 연속 일수)

### STAGE 8: 큐레이션 (T-061 ~ T-063)
- [x] T-061: curated-videos.yml + CuratedCollectionSeeder (graceful skip)
- [x] T-062: Collection + CollectionVideo (composite PK) + V7 마이그레이션
- [x] T-063: GET /api/collections, /discover + /discover/[slug] 페이지

### STAGE 9: 폴리시 + 배포 (T-064 ~ T-069)
- [x] T-064: app/error.tsx, app/not-found.tsx, app/(app)/error.tsx
- [x] T-065: 모바일 반응형 — 헤더 nav overflow-x-auto, 패딩 sm:
- [x] T-066: backend/Dockerfile (멀티 스테이지, non-root user, HEALTHCHECK) + .dockerignore + DEPLOY.md
- [x] T-067: DEPLOY.md — Vercel 가이드 (실제 배포는 사용자 계정 필요)
- [x] T-068: DEPLOY.md — Railway/Render 가이드 (실제 배포는 사용자 계정 필요)
- [x] T-069: 로컬 스모크 테스트 — signup/me/clips/collections/review/streak/swagger 모두 200

## NORTH STAR 최종 검증

### 0.3 절대 타협 안 할 5가지 가치
1. ✅ 사용자 자유 구간 선택 — 시작/끝 버튼 + 자막 더블클릭으로 범위 확장
2. ✅ 평생 복습 본인 라이브러리 — 클립 + Recording + ReviewItem 영구 저장
3. ✅ 앱 안에서 AI 설명 — Claude Haiku 인라인 패널, ChatGPT 외부 탭 불필요
4. ✅ 마찰 제거 — 클립 저장 후 자동 분석/플레이어 이동, SRS 자동 큐
5. ✅ 운영 비용 낮음 — Haiku + prompt caching, 1000명 ~$30-50/월

### 0.4 OUT-OF-SCOPE 검증 (모두 미포함 확인)
- ❌ 발음 점수 / Azure Pronunciation Assessment — 없음
- ❌ 프로소디 마크업 — 없음
- ❌ 직독직해 표시 — 없음
- ❌ 사용자간 공유 — 없음 (Collection은 시스템 큐레이션만)
- ❌ 모바일 네이티브 앱 — 웹만 (반응형)
- ❌ 결제 / Stripe — 없음
- ❌ 영어 외 언어 — 없음
- ❌ 개발자 외 직종 — 없음
- ❌ Whisper STT — 없음 (자막 있는 영상만)
- ❌ 자체 STT / 음성 분석 — 없음
- ❌ 다국어 UI — 한국어 단일

## 인프라 메모
- Java 21: `/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home` (zshrc에 영구 설정)
- DB 포트: **5434** (호스트 5432 시스템 postgres 충돌 회피)
- DB 접속: `psql -h localhost -p 5434 -U tubeshadow -d tubeshadow`
- Docker 이미지: `tubeshadow-backend:test` 빌드 성공
- 배포 가이드: `DEPLOY.md`

## 다음 세션을 위한 권장 작업
1. `curated-videos.yml`에 검증된 ~30개 영상 추가 (현재 starter 4개)
2. ANTHROPIC_API_KEY 설정 후 실제 분석 품질 검수
3. Vercel + Railway 배포 → 종단간 스모크
4. T-028 YouTube 자막 추출 ToS 검토 (BLOCKERS B-001)

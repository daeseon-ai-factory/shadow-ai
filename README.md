# TubeShadow

> 개발자/지식노동자를 위한 YouTube 기반 영어 쉐도잉 + Sentence Mining 학습 도구

## 한 줄 미션
**YouTube 영상에서 직접 클립을 따다가, 자기 라이브러리에 모으고, Anki처럼 자동 복습하면서, 앱 안에서 AI 설명까지 받는 영어 쉐도잉 학습 도구.**

자세한 내용은 [`Roadmap.md`](./Roadmap.md) 섹션 0 NORTH STAR 참조.

## 핵심 기능

| 영역 | 기능 |
|------|------|
| **임포트** | YouTube URL 붙여넣기 → 메타데이터 + 자막 자동 추출 |
| **클립** | 시작/끝 버튼 또는 자막 더블클릭으로 자유 구간 선택, 무한반복 + 0.5~1.5x 속도 |
| **라이브러리** | 검색 (이름/자막) · 태그 필터 (자동완성) · 정렬 (최신/오래된/이름/길이) · JSON 내보내기 |
| **AI 설명** | Claude Haiku로 맥락/문법/표현/어휘 자동 분석 (백그라운드, prompt caching) |
| **녹음 + A/B** | MediaRecorder로 녹음 → 자동 업로드 → 원본 → 본인 A/B 청취, 시간순 누적 |
| **SRS 복습** | SM-2 알고리즘, Anki식 Again/Hard/Good/Easy 4버튼, 연속 일수 위젯 |
| **큐레이션** | 큐레이션된 영상 컬렉션 (`curated-videos.yml`), 신규 사용자 즉시 시작 |
| **단축키** | Space/R/L/,./0 (플레이어), 1~4 + A (복습), ? (도움말) |
| **설정** | 이름 변경 · 비밀번호 변경 |

## 기술 스택

| 영역 | 스택 |
|------|------|
| 백엔드 | Java 21 · Spring Boot 3.3 · Gradle Kotlin DSL · PostgreSQL · Flyway · Spring Security + JWT |
| 프론트엔드 | Next.js 16 (App Router) · TypeScript strict · Tailwind 4 · shadcn/ui · Zustand · TanStack Query |
| AI | Anthropic Claude Haiku 4.5 (prompt caching) |
| 인프라 | Docker (PostgreSQL, 백엔드) · Vercel (프론트엔드) · Railway/Render (백엔드) |
| 테스트 | JUnit 5 + Testcontainers + MockMvc (백엔드) · Vitest + Testing Library (프론트엔드) · GitHub Actions CI |

## 디렉터리 구조

```
shadow-ai/
├── backend/                          # Spring Boot 백엔드
│   ├── src/main/java/com/tubeshadow/
│   │   ├── common/                   # ApiResponse, GlobalExceptionHandler, Cors, BaseEntity
│   │   ├── auth/                     # 인증 + 사용자 + JWT + 레이트리밋
│   │   ├── video/                    # YouTube 영상 + 자막 + 큐레이션 컬렉션
│   │   ├── clip/                     # 클립 CRUD + 태그 + 정렬 + 내보내기
│   │   ├── analysis/                 # Claude API 클라이언트 + 분석
│   │   ├── recording/                # 녹음 업로드 + 스트리밍 + 파일 정리
│   │   └── review/                   # SM-2 SRS 큐 + 연속 일수
│   ├── src/main/resources/
│   │   ├── application*.yml          # dev/prod/test/integ 프로파일
│   │   ├── db/migration/             # Flyway V1~V7
│   │   └── curated-videos.yml        # 큐레이션 시드
│   ├── Dockerfile                    # 멀티 스테이지 (non-root, HEALTHCHECK)
│   └── build.gradle.kts
├── frontend/                         # Next.js 프론트엔드
│   ├── app/
│   │   ├── (auth)/{signup,login}
│   │   └── (app)/                    # 인증 필요
│   │       ├── library/              # 클립 카드 그리드
│   │       ├── review/               # SRS 복습
│   │       ├── import/               # YouTube 임포트
│   │       ├── discover/[slug]/      # 큐레이션 컬렉션
│   │       ├── video/[id]/           # 영상 + 자막 + 구간 선택
│   │       ├── player/[clipId]/      # 클립 무한반복 + 녹음 + AI
│   │       └── settings/             # 프로필 / 비밀번호
│   ├── components/                   # YoutubePlayer, ClipCreatePanel,
│   │                                 # AnalysisPanel, RecordingPanel,
│   │                                 # StreakWidget, ShortcutHelp
│   ├── lib/{api,stores}              # API 클라이언트 + Zustand store
│   ├── tests/                        # Vitest
│   └── package.json
├── .github/workflows/ci.yml
├── docker-compose.yml                # PostgreSQL (호스트 5434 매핑)
├── scripts/smoke.sh                  # 종합 API 스모크
├── Roadmap.md                        # 24시간 실행 로드맵
├── CLAUDE.md                         # Claude Code 지침
├── PROGRESS.md                       # 진행 추적
├── BLOCKERS.md                       # 블로커 기록
└── DEPLOY.md                         # 배포 가이드
```

## 빠른 시작 (로컬)

```bash
# 1. 인프라 (PostgreSQL 호스트 5434)
docker compose up -d

# 2. 백엔드 (Java 21 필요)
cd backend
./gradlew bootRun
# → http://localhost:8080
# → http://localhost:8080/swagger-ui/index.html

# 3. 프론트엔드 (Node 20+)
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

## 환경 변수

루트 `.env` (커밋 금지):
```bash
ANTHROPIC_API_KEY=sk-ant-...
JWT_SECRET="$(openssl rand -hex 32)"
DB_PASSWORD=...
CORS_ALLOWED_ORIGINS="http://localhost:3000,https://tubeshadow.app"
AUTH_RATE_LIMIT=20
```

전체 환경변수: [`DEPLOY.md`](./DEPLOY.md)

## 테스트

```bash
# 백엔드 (50+ tests via Testcontainers)
cd backend && ./gradlew test

# 프론트엔드 (Vitest)
cd frontend && npm test

# 종합 스모크 (백엔드 기동 후)
./scripts/smoke.sh
```

## NORTH STAR (변경 금지)
1. **사용자 자유 구간 선택** — 자동 분할 강제 X
2. **평생 복습 라이브러리** — 일회성 소비 X
3. **앱 안에서 AI 설명** — ChatGPT 외부 탭 X
4. **마찰 제거 = 차별화**
5. **운영 비용 낮게** (Haiku + 캐싱, 1000명 ~$30~50/월)

[`Roadmap.md`](./Roadmap.md) 섹션 0.4 OUT-OF-SCOPE 11개 항목 미포함 검증.

## 진행 추적
- 현재 상태: [`PROGRESS.md`](./PROGRESS.md)
- 막힌 항목: [`BLOCKERS.md`](./BLOCKERS.md)
- 배포 가이드: [`DEPLOY.md`](./DEPLOY.md)

## 라이선스
MVP — 개인 학습용.

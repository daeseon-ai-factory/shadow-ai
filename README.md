<div align="center">

# Mimi · 미미

**유튜브를 영어 쉐도잉으로 — 그리고 매일 막히는 문법·콜로케이션·전치사를 간격 반복으로 단련하는 풀스택 학습 앱**
**Turn any YouTube video into spaced-repetition English shadowing — plus daily drills for the grammar patterns, collocations, and prepositions that never come automatically**

<sub>For developers who *read* English fluently but freeze when they have to *produce* it · 영어를 읽는 건 되는데 막상 *말·쓰기* 에서 얼어붙는 개발자를 위해</sub>

[**🌐 Frontend · 프론트엔드 → mimi.daeseon.ai**](https://mimi.daeseon.ai) &nbsp;·&nbsp; [**📓 Build log · 빌드 로그 → daeseon.ai/projects/shadow-ai**](https://daeseon.ai/projects/shadow-ai)

![Java 21](https://img.shields.io/badge/Java-21-007396?logo=openjdk&logoColor=white)
![Spring Boot 3.3](https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?logo=springboot&logoColor=white)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![PostgreSQL 16](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

</div>

---

> **EN — TL;DR.** A solo-built, full-stack English-learning app (Java/Spring Boot API + Next.js/TypeScript). It has **two halves that feed each other**: (1) *shadow from YouTube* — clip a subtitle range, one LLM call returns a translation, a word-by-word literal gloss (직독직해), vocabulary, per-preposition notes, and a practice scenario (cached in JSONB, so studying never re-bills the API), then **SM-2** spaced repetition schedules it; (2) the *Practice hub* — daily **Leitner**-spaced drills over 82 sentence patterns, 101 word+preposition collocations, animated preposition diagrams, an **AI composition check**, and a weak-spots dashboard. Pluggable LLM (Gemini ↔ Claude) and storage (local FS ↔ S3/R2) flip **by env var alone**. Hardened from a prioritized codebase audit (7 batches), content **accuracy-audited**, and covered by Testcontainers + Vitest + Playwright.
>
> **KO — 한 줄 요약.** 솔로로 만든 풀스택 영어 학습 앱(Java/Spring Boot API + Next.js/TypeScript). **서로를 먹여주는 두 반쪽** 으로 이뤄집니다: (1) *유튜브 쉐도잉* — 자막 구간을 클립하면 LLM 한 번 호출로 번역·직독직해·어휘·전치사별 노트·연습 시나리오가 나오고(JSONB 캐시 → 복습은 재과금 0), **SM-2** 간격 반복이 일정을 잡습니다; (2) *Practice 허브* — 문장 패턴 82개, 콜로케이션 101개, 움직이는 전치사 다이어그램, **AI 영작 채점**, 약점 대시보드를 **Leitner** 간격 반복으로 매일 단련. LLM(Gemini↔Claude)과 스토리지(로컬↔S3/R2)는 **환경변수만으로** 전환됩니다. 우선순위 코드 감사(7배치)로 하든잉했고, 콘텐츠는 **정확도 감사**, Testcontainers+Vitest+Playwright로 검증.

## 목차 · Table of contents

- [What is Mimi · 미미란](#what-is-mimi--미미란)
- [Why this project · 이 프로젝트가 보여주는 것](#why-this-project--이-프로젝트가-보여주는-것)
- [Product walkthrough · 제품 둘러보기](#product-walkthrough--제품-둘러보기)
- [Tech stack · 기술 스택](#tech-stack--기술-스택)
- [Architecture · 아키텍처](#architecture--아키텍처)
- [Security & privacy · 보안과 프라이버시](#security--privacy--보안과-프라이버시)
- [Data model & API · 데이터 모델과 API](#data-model--api--데이터-모델과-api)
- [Run it locally · 로컬에서 실행](#run-it-locally--로컬에서-실행)
- [Deployment · 배포](#deployment--배포)
- [Testing · 테스트](#testing--테스트)
- [Engineering log · 엔지니어링 기록](#engineering-log--엔지니어링-기록)
- [Honest limitations · 솔직한 한계](#honest-limitations--솔직한-한계)
- [Project layout · 프로젝트 구조](#project-layout--프로젝트-구조)

---

## What is Mimi · 미미란

**EN.** Most developers read English docs all day and still freeze when they have to *speak* or *write* it. Mimi turns the input you already consume (YouTube) into the output practice you avoid — and drills the specific things that never come automatically (prepositions, fixed chunks, sentence frames) every day.

The thesis is **friction removal, not feature count**: input → output → repeat, the loop language-acquisition research actually supports. No pronunciation scoring, no AI essay grading, no social feed.

**KO.** 개발자는 하루 종일 영어 문서를 읽으면서도 막상 *말하거나 쓸* 때 얼어붙습니다. 미미는 이미 소비하는 입력(유튜브)을 피하던 출력 연습으로 바꾸고, 자동으로 안 나오는 것들(전치사·고정 청크·문장 틀)을 매일 단련합니다.

핵심 명제는 **기능 개수가 아니라 마찰 제거** 입니다: 입력 → 출력 → 반복. 발음 채점도, AI 작문 첨삭도, 소셜 피드도 없습니다.

---

## Why this project · 이 프로젝트가 보여주는 것

> *For reviewers in a hurry — the engineering this repo demonstrates. 바쁜 리뷰어를 위해, 이 저장소가 보여주는 엔지니어링.*

**EN**

- **🔀 Env-gated provider & storage.** The *same code* runs locally and switches to real infrastructure **per env var** — `tubeshadow.ai.provider` picks Gemini or Claude (`@ConditionalOnProperty`, zero call-site changes), `RECORDING_STORAGE` picks local-disk or S3/R2 (objects streamed through the backend, owner-gated). No rebuild, decided at the seam.
- **⚙️ Transaction-safe async AI pipeline.** Creating a clip publishes a domain event; analysis runs on a background thread via `@TransactionalEventListener(AFTER_COMMIT)` + `@Async`, so the multi-second LLM HTTP call runs **outside any DB transaction** and never pins a connection-pool connection — only the small `PENDING → READY/FAILED` writes are transactional. Transient provider failures are retried (429/5xx/timeout) and fail fast on permanent errors.
- **🧮 Two SRS algorithms, matched to the grading shape.** Clip review uses **SM-2** (Again/Hard/Good/Easy); the drills are binary (Got it / Again), so forcing SM-2's 0–5 scale onto two buttons would be the wrong tool — they use a **Leitner box** system instead. Both schedulers are I/O-free pure functions.
- **💸 $0 marginal cost + abuse guards.** Each clip triggers exactly one LLM call, cached in JSONB; every later review/quiz reads the cache. The one authed endpoint that *does* cost money (the AI composition check) is **rate-limited per user** — separate from the IP-based limiter on signup/login.
- **🔐 Multi-tenant safety.** Stateless JWT (HS256) with a **token-version revocation** claim (a password change invalidates old tokens), BCrypt hashing, per-user isolation at the query layer (`findByIdAndUserId`), and access-controlled recordings that are **never served from a public URL**.
- **📈 Observability.** MDC-tagged structured logs (request id + user id) and Micrometer/Actuator metrics exported to Prometheus (`/actuator/prometheus`), including the custom AI-path timings.
- **🧭 Decisions are written down.** Every non-trivial fix/decision is dual-written to a problem-indexed troubleshooting log + a dated narrative (the [daeseon.ai timeline](https://daeseon.ai/projects/shadow-ai)) — with literal error text, verified causes, and post-commit hashes.
- **🌏 Bilingual (ko/en)** UI with SSR + path-based routing, and a strict **content accuracy audit** (every drill cue + model reviewed before merge — in a learning tool a wrong example is worse than none).

**KO**

- **🔀 환경변수로 갈리는 provider·스토리지.** *같은 코드* 가 로컬에서 동작하고 **환경변수별** 로 실제 인프라로 전환 — `tubeshadow.ai.provider` 로 Gemini/Claude 선택(`@ConditionalOnProperty`, 호출부 변경 0), `RECORDING_STORAGE` 로 로컬 디스크/S3·R2(바이트는 백엔드가 스트리밍, 소유자 게이트) 선택. 재빌드 없이 경계에서 결정.
- **⚙️ 트랜잭션-세이프 비동기 AI 파이프라인.** 클립 생성이 도메인 이벤트 발행 → 분석은 `@TransactionalEventListener(AFTER_COMMIT)` + `@Async` 로 백그라운드 실행 → 수 초짜리 LLM HTTP 호출이 **DB 트랜잭션 바깥**에서 돌아 커넥션을 점유하지 않음. 작은 `PENDING → READY/FAILED` 쓰기만 트랜잭셔널. 일시 장애(429/5xx/타임아웃)는 재시도, 영구 오류는 즉시 실패.
- **🧮 grading 형태에 맞춘 2개 SRS.** 클립 복습은 **SM-2**(Again/Hard/Good/Easy), 드릴은 이진(맞음/다시)이라 SM-2의 0–5 척도를 두 버튼에 욱여넣는 건 틀린 도구 → **Leitner 박스** 사용. 둘 다 I/O 없는 순수함수.
- **💸 한계비용 $0 + 남용 가드.** 클립당 LLM 호출 정확히 1번, JSONB 캐시 → 이후 복습·퀴즈는 캐시 읽기. 돈이 드는 유일한 인증 엔드포인트(AI 영작 채점)는 **유저별 rate limit** — 가입/로그인의 IP 기반 리미터와 별개.
- **🔐 멀티테넌트 안전.** 무상태 JWT(HS256) + **토큰 버전 폐기**(비번 변경 시 옛 토큰 무효), BCrypt 해싱, 쿼리 계층 유저 격리(`findByIdAndUserId`), **공개 URL로 안 나가는** 접근통제 녹음.
- **📈 관측성.** MDC 구조화 로그(요청 id + 유저 id) + Micrometer/Actuator → Prometheus(`/actuator/prometheus`), 커스텀 AI 경로 타이밍 포함.
- **🧭 결정은 기록으로.** 사소하지 않은 수정·결정마다 문제 인덱스 트러블슈팅 + 날짜별 서사([daeseon.ai 타임라인](https://daeseon.ai/projects/shadow-ai))에 이중 기록 — 실제 에러 원문·검증 원인·커밋 후 해시.
- **🌏 한/영 이중언어** UI(SSR + 경로 라우팅) + 엄격한 **콘텐츠 정확도 감사**(모든 드릴 cue·모델을 머지 전 검수 — 학습 도구에선 틀린 예시가 없느니만 못함).

---

## Product walkthrough · 제품 둘러보기

| Flow · 흐름 | What happens · 동작 |
|---|---|
| **Sign in · 로그인** | Email/password + JWT; per-user data from day one. 이메일/비번 + JWT, 유저별 데이터. |
| **Import · 임포트** | YouTube URL → metadata (oEmbed) + subtitles (`yt-dlp`); re-import self-heals a missing transcript. URL→메타+자막, 재임포트 자가복구. |
| **Clip · 클립** | Range by subtitle-click or start/end, auto transcript slice, loop + 0.5–1.5× speed, blind mode (full/first-letter/blocked), audio-only mode. 구간 선택·루프·속도·블라인드·오디오전용. |
| **AI analysis · AI 분석** | One LLM call → translation + 직독직해 gloss + vocabulary + per-preposition notes + scenario, cached in JSONB. LLM 1회 → 번역·직독직해·어휘·전치사노트·시나리오, JSONB 캐시. |
| **Review · 복습** | SM-2 queue, 3 modes: *reveal* · *write* (L1 → English, token diff) · *scenario* (AI situation → response). SM-2 큐, 3모드. |
| **Practice — Patterns · 패턴** | 82 frames / 246 say-it-aloud items (the "as" family, relatives, indirect questions, conditionals…). |
| **Practice — Collocations · 콜로케이션** | 101 word+preposition chunks, General / Dev·IT filter. |
| **Practice — Prepositions · 전치사** | Animated per-sense SMIL diagrams + fill-in drill + prepositions mined from your own clips. |
| **Practice — Compose · 영작** | Write your own sentence with a target → AI judges correctness + use of target + a better version. |
| **Practice — Weak spots · 약점** | High-lapse cards surfaced from daily-grade data; seen / misses / mastered stats. |
| **Drill engine · 드릴 엔진** | Leitner SRS per card (account-persisted), shared daily streak, model sentence spoken aloud (Web Speech). |
| **Record + A/B · 녹음** | Record yourself, play "original → you" back to back. |
| **Decks & playlist · 덱** | Anki-style grouping (delete keeps clips → Inbox); play a deck end-to-end with autoplay. |
| **BYOAI** | Send the analysis prompt to your own ChatGPT/Claude/Gemini — zero cost to the app. |

---

## Tech stack · 기술 스택

| Layer · 영역 | Choice · 선택 |
|---|---|
| **Backend** | Java 21 · Spring Boot 3.3.5 · Gradle (Kotlin DSL) · Spring Security + JWT (HS256) · Spring Data JPA |
| **Database** | PostgreSQL 16 · Flyway (17 migrations) · raw-SQL `CHECK` constraints + JPA mapping |
| **Async / resilience** | `@TransactionalEventListener(AFTER_COMMIT)` + `@Async` bounded pool · retry on 429/5xx/timeout |
| **AI** | `AiAnalysisClient` interface → Gemini 2.5 Flash (default, free tier) **or** Claude Haiku 4.5, runtime-selected via `@ConditionalOnProperty` |
| **Object storage** | Local disk (dev) ↔ S3 / Cloudflare R2 (prod) — objects streamed through the backend (owner-gated), env-gated |
| **Observability** | Micrometer + Spring Actuator → Prometheus · MDC request/user logging |
| **Media** | `yt-dlp` subprocess (transcript + `-J` probe) · `MediaRecorder` capture with codec-param-tolerant MIME handling |
| **Frontend** | Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · Zustand · TanStack Query · next-intl |
| **Drills** | Static typed content + Leitner SRS · Web Speech API (TTS) · animated SMIL preposition diagrams |
| **Infra / deploy** | Docker (multi-stage + ffmpeg/yt-dlp) · GitHub Actions CI (lint·test) + **keyless OIDC** deploy to AWS ECS Fargate + RDS · Vercel (frontend) · documented PaaS path |
| **i18n** | `en` (default) · `ko` real · `ja`/`zh`/`es` scaffolded · cookie/path locale + SSR |

---

## Architecture · 아키텍처

**EN — feature-sliced backend, env-gated edges.** Eight bounded contexts (`auth`, `video`, `clip`, `analysis`, `recording`, `review`, `deck`, `practice`) over a shared `common` module — organized by feature, not by layer. External capabilities are decided at a single seam, not sprinkled through the code.

**KO — 기능 단위 백엔드, 경계에서 갈리는 외부 의존.** 8개 바운디드 컨텍스트(`auth`·`video`·`clip`·`analysis`·`recording`·`review`·`deck`·`practice`) + 공용 `common`. 외부 의존은 코드 곳곳이 아니라 경계 한 곳에서 결정됩니다.

```
Browser (Next.js, Vercel) ──JWT (Authorization)──▶ Spring Boot (8 bounded contexts)
                                                       │
   clip created ──▶ ApplicationEvent                   │
        │                                              ├─▶ PostgreSQL 16
   @TransactionalEventListener(AFTER_COMMIT) + @Async  │     users · videos · clips(transcript)
        │   (runs OUTSIDE the txn)                      │     clip_analyses (JSONB cache)
        ▼                                              │     review_items(SM-2) · decks · collections
   AiAnalysisClient ── ai.provider? ─▶ Gemini (free)   │     recordings · practice_progress(streak)
        │              └─ else ──────▶ Claude          │     practice_card (Leitner SRS)
        ▼   (1 call/clip → cached JSONB)               │
   ClipAnalysis: PENDING → READY / FAILED              ├─▶ Recording storage
                                                       │     RECORDING_STORAGE? ─▶ S3/R2 streamed (prod)
                                                       │                       └─▶ local disk (dev)
                                                       └─▶ Observability: MDC logs · Micrometer → Prometheus
```

**Key decisions · 핵심 결정**

- **The expensive call never holds a connection.** Analysis is event-driven and post-commit; the LLM HTTP call is fully outside the DB transaction, so a slow/throttled provider can't exhaust the connection pool. **비싼 호출이 커넥션을 안 쥠** — 분석은 커밋 후 이벤트 기반, LLM 호출은 트랜잭션 바깥.
- **One LLM abstraction, reused twice.** `analyzeClip()` powers clip analysis; a low-level `complete()` added to the *same* interface powers the AI composition check — no parallel client, no coupling to the analysis schema. **LLM 추상화 1개, 두 기능 재사용** — 같은 인터페이스의 `complete()` 가 영작 채점 담당.
- **Env-gated, lazily wired.** Provider and storage switch on config; the prod-only drivers (S3 SDK) live behind that seam so dev stays lean. **환경변수로 갈리고 지연 연결** — prod 전용 드라이버는 경계 뒤에.
- **Two rate limiters for two threat models.** `AuthRateLimitFilter` (per-IP, signup/login — credential stuffing); `ComposeRateLimitInterceptor` (per-user, the AI endpoint — bill/abuse). **위협모델별 리미터 2개** — IP(인증)·유저(AI).

Longer form: [`ARCHITECTURE.md`](./ARCHITECTURE.md). 더 긴 설명: [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## Security & privacy · 보안과 프라이버시

A prioritized codebase audit drove **7 hardening batches** (safety/accuracy, quick wins, high-impact, observability, tests, architecture refactor, docs hygiene). Selected controls:
우선순위 코드 감사가 **7개 하든잉 배치** 를 이끌었습니다(안전/정확성·퀵윈·고임팩트·관측성·테스트·아키텍처 리팩터·문서). 주요 통제:

| Concern · 항목 | Implementation · 구현 |
|---|---|
| **Auth · 인증** | Stateless JWT (HS256) + a `token_version` claim checked against the DB on every request → a password change revokes all older tokens. 매 요청 `token_version` 대조 → 비번 변경 시 옛 토큰 폐기. |
| **Data isolation · 격리** | Every user-scoped read is `findByIdAndUserId(...)` — another user's id returns `404`, not someone else's row. 모든 조회가 `findByIdAndUserId`, 남의 행 노출 0. |
| **Media access · 미디어** | Recordings are never public. The route gates on a validated session (`401`) **and** ownership (`403`), then **streams** the bytes through the backend (`InputStreamResource`; local disk dev / S3·R2 prod) — never a public URL. 세션(`401`)+소유권(`403`) 이중 게이트 후 백엔드가 스트리밍(공개 URL 없음). |
| **Upload MIME · 업로드** | `MediaRecorder` tags audio `audio/webm;codecs=opus`; the upload check compares the **base type** (params stripped) against an allow-list. base 타입으로 화이트리스트 검사. |
| **Rate limiting · 레이트리밋** | Per-IP on auth (fixed window), per-user on the AI composition endpoint — fixed-window interceptors, return `429 RATE_LIMITED`. 인증=IP, AI=유저, `429`. |
| **Passwords · 비밀번호** | BCrypt-hashed (Spring Security). BCrypt 해싱. |
| **CORS** | `allowedOriginPatterns` scoped to the deployed frontend origins (`mimi.daeseon.ai`, Vercel previews). 배포 프론트 출처로 한정. |
| **Your data · 내 데이터** | Export saved clips (JSON); delete a clip and its recording really removes the bytes (DB `@Modifying` delete bypasses the session cache to avoid a `StaleObjectStateException`). 클립 내보내기 + 실삭제. |

---

## Data model & API · 데이터 모델과 API

**Eleven tables · 11개 테이블** (`backend/.../db/migration`, bootstrapped by Flyway):
`users` · `videos` · `clips` (transcript + note) · `clip_analyses` (JSONB analysis cache: translation, chunked 직독직해, vocabulary, preposition notes, scenario) · `recordings` · `review_items` (SM-2: easiness, interval, repetitions, due_date) · `collections` · `collection_videos` · `decks` · `practice_progress` (streak/reps, one per user) · `practice_card` (Leitner box per drill card).

Value constraints (e.g. analysis status, item type) are enforced by **raw-SQL `CHECK`** plus compile-time TypeScript/Java types.
값 제약(분석 상태·아이템 타입 등)은 **원시 SQL `CHECK`** + 컴파일타임 타입으로 강제.

**API surface · API 표면** (`backend/.../api`, all `ApiResponse<T>`-wrapped, `@CurrentUser`-resolved):

```
Auth            POST /api/auth/{signup,login} · GET·PATCH /api/auth/me · POST /api/auth/me/password
Videos          POST /api/videos/import · GET /api/videos/{id}
Clips           POST·GET /api/clips · GET /api/clips/tags · GET·PATCH·DELETE /api/clips/{id}
                GET /api/clips/export · GET /api/clips/{clipId}/analysis · POST .../analysis/regenerate
Recordings      POST /api/clips/{clipId}/recordings · GET .../recordings · GET·DELETE /api/recordings/{id}/audio
Review (SM-2)   GET /api/review/queue · POST /api/review/items/{id}/respond · GET /api/review/streak
Practice        GET /api/practice/progress · POST /api/practice/rep
                GET /api/practice/srs · POST /api/practice/srs/grade · POST /api/practice/compose/check
Prepositions    GET /api/prepositions/mined
Decks           POST·GET /api/decks · PATCH·DELETE /api/decks/{deckId} · PATCH /api/decks/clips/{clipId}
Collections     GET /api/collections · GET /api/collections/{idOrSlug}
Health          GET /api/health
```

---

## Run it locally · 로컬에서 실행

Prereqs: **Docker**, **Java 21**, **Node 22+** (Next.js 16 needs Node 22).
필요: **Docker · Java 21 · Node 22+**.

```bash
# 1. PostgreSQL (port 5434)
docker compose up -d

# 2. Backend → http://localhost:8080   (JAVA_HOME must point at a JDK 21)
cd backend
cp ../.env.example ../.env          # JWT secret; an LLM API key is optional
./gradlew bootRun

# 3. Frontend → http://localhost:3100
cd frontend
npm install
npm run dev
```

The core flow (import → clip → review → record) and all Practice drills run **without any API key**. Add a Gemini or Claude key to `.env` to enable AI analysis + the composition check. One-command full stack (DB + backend w/ JVM debug port + frontend): `docker compose -f docker-compose.dev.yml up`.
핵심 흐름과 모든 드릴은 **API 키 없이** 동작. AI 분석·영작 채점만 키 필요.

---

## Deployment · 배포

Two supported models — the same image/app adapts to both.

**1) Serverless — Vercel + AWS** *(target of the live deploy)*
Frontend on Vercel (`mimi.daeseon.ai`); backend container on **AWS ECS Fargate** behind an ALB; **RDS PostgreSQL** (ca-central-1); recordings on **S3** (private bucket, streamed through the backend). CI/CD is **keyless**: GitHub Actions assumes an IAM role via **OIDC** (`deploy.yml`) → builds + pushes to ECR → rolls the ECS service. A step-by-step first-time runbook lives in [`infrastructure/aws-bootstrap.md`](./infrastructure/aws-bootstrap.md), with the task definition in [`infrastructure/ecs-task-definition.json`](./infrastructure/ecs-task-definition.json).
프론트 Vercel, 백엔드 ECS Fargate+ALB, RDS(ca-central-1), 녹음 S3. CI/CD는 OIDC 키리스. 런북·태스크데프 `infrastructure/`.

**2) Persistent host — Render / Fly / Oracle VM**
The multi-stage **Dockerfile** (JRE + `yt-dlp` + ffmpeg) reads `PORT` for PaaS injection and runs anywhere a container runs; pair it with any managed Postgres + S3/R2.
**Dockerfile**(JRE+yt-dlp+ffmpeg)이 `PORT` 를 읽어 어느 PaaS에서도 동작.

---

## Testing · 테스트

```bash
cd backend  && JAVA_HOME=<jdk21> ./gradlew test   # 26 classes — JUnit 5 + Testcontainers (real PostgreSQL)
cd frontend && npm test                            # Vitest units (incl. the SRS session logic)
cd e2e      && npx playwright test                 # 14 specs (auth, clip, quizzes, decks, i18n, BYOAI, mobile, …)
```

- **Backend** — domain logic (SM-2, Leitner, sentence merge) as pure-function unit tests; controllers/services as **Testcontainers** integration tests against a real PostgreSQL per run (the schema relies on JSONB + `CHECK`, which H2 can't emulate). The AI composition path is Mockito-tested (parse / not-configured / malformed) since the happy path needs a real key.
- **Frontend** — Vitest over the API client + the pure SRS session builder; **14 Playwright** end-to-end specs.
- **CI** — `.github/workflows/ci.yml` runs lint + tests on every push; `deploy.yml` ships the backend image to AWS via OIDC.

백엔드: 순수함수 단위 + 실 PostgreSQL Testcontainers 통합(26 클래스). 프론트: Vitest + Playwright 14. CI가 매 푸시 lint+test.

---

## Engineering log · 엔지니어링 기록

This repo keeps a disciplined, anti-hallucination log — every non-trivial fix or decision is **dual-written**, with literal error text, verified causes, and post-commit hashes.
안티-할루시네이션 규칙 — 사소하지 않은 수정·결정은 **이중 기록**(실제 에러·검증 원인·커밋 후 해시).

- [`docs/troubleshooting.md`](./docs/troubleshooting.md) — `timedtext` token expiry → `yt-dlp`, `StaleObjectStateException` on cascade delete, `Filter`→`HandlerInterceptor` auto-registration trap, Chrome 415 codec MIME, Gemini thinking-token truncation, README/ROADMAP drift, AI-author content nuance errors, a schema-field prose-injection bug, the JDK-11-vs-21 gradle trap, CI lint vs build gap, prod-Dockerfile yt-dlp drift.
- [`content/logs/shadow-ai/`](./content/logs/shadow-ai/) — dated narratives (aggregated live by daeseon.ai): the grammar curriculum, collocation chunk drill, the Practice hub, account-persisted streak, Leitner SRS, the AI composition mode, and a single-read [project showcase](https://daeseon.ai/projects/shadow-ai).
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) · [`DEVOPS.md`](./DEVOPS.md) · [`HANDBOOK.md`](./HANDBOOK.md) · [`PROJECT_SUMMARY.md`](./PROJECT_SUMMARY.md) — longer-form references.

---

## Honest limitations · 솔직한 한계

> Stated plainly — knowing the edges is part of the engineering. 한계를 아는 것도 엔지니어링.

- **Solo, AI-assisted.** Built with Claude Code as a pair programmer. The product direction, the architecture (provider abstraction, the transaction-safe async pipeline, the two-SRS split), prompt design, and the test/content-audit strategy are mine. **솔로·AI 보조** — 방향·아키텍처·프롬프트·테스트/감사 전략은 내 것.
- **Rate-limit & idempotency are in-memory** — correct for a single instance; multi-instance needs a durable store (Redis). **인메모리** — 단일 인스턴스 전제.
- **`ja`/`zh`/`es` locales are scaffolded** (English strings); only `en` and `ko` are fully translated. 일·중·서는 영어 스텁.
- **AWS infra is a documented runbook + task definition, not yet Terraform** — IaC is the obvious next step (and makes apply→destroy reps cheap). **AWS는 런북+태스크데프, Terraform은 다음 단계.**
- **`yt-dlp` caveat.** Subtitle/metadata extraction uses `yt-dlp`, a YouTube ToS gray area — fine for personal use; revisit before public/commercial deployment. **yt-dlp ToS 회색지대** — 개인용 한정.

---

## Project layout · 프로젝트 구조

```
backend/                Spring Boot — 8 bounded contexts + common, 17 Flyway migrations
  com/tubeshadow/
    auth/               JWT + token-version revocation · @CurrentUser resolver · IP rate limiter
    video/ clip/        YouTube import (yt-dlp) · clips · transcript · notes · decks · export
    analysis/           AiAnalysisClient (Gemini/Claude) · async pipeline · prompt + parser · retry
    recording/          local↔S3 storage (env-gated) · range-aware audio route
    review/             SM-2 scheduler (pure) · 3 quiz modes
    practice/           Leitner SRS · streak · collocations/patterns/prepositions · AI compose + per-user limiter
    common/             ApiResponse · exceptions · WebMvc/async/S3 config · MDC logging
frontend/               Next.js 16 App Router · 5-locale i18n · shadcn/ui
  app/[locale]/(app)/   library · player · review · import · discover · prepositions
                        practice · patterns · collocations · compose · weak · settings
  lib/                  api client · practice-srs (session builder) · stores · hooks
e2e/                    Playwright specs (14)
infrastructure/         AWS ECS task definition + first-time bootstrap runbook
docs/                   troubleshooting log (problem → cause → fix → commit)
content/logs/           dated build-log entries (aggregated live by daeseon.ai)
```

---

<div align="center">

**[Mimi · 미미](https://mimi.daeseon.ai)** — input → output → repeat. Built to remove friction, not add features.
**입력 → 출력 → 반복. 기능이 아니라 마찰을 줄이려 만들었습니다.**

<sub>Repo · 저장소: [Daeseon-AI-Factory/shadow-ai](https://github.com/Daeseon-AI-Factory/shadow-ai) · Build log · 빌드 로그: [daeseon.ai/projects/shadow-ai](https://daeseon.ai/projects/shadow-ai)</sub>

## License

MIT

</div>

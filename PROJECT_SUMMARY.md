# TubeShadow — Project Summary

> One-page reference for résumé bullets, interview talking points, and "give an AI this context" tasks.
> 한국어 + English. 둘 다 그대로 복사해서 사용 가능.

---

## 🎯 Elevator Pitch

### 🇨🇦 English (interview / résumé)
> "TubeShadow is a full-stack English-learning web app for Korean software developers. The learner pastes a YouTube URL, clips short segments by selecting subtitle ranges, and the app generates an AI explanation (translation, word-by-word gloss, vocabulary, and a real-world practice scenario) — all cached so each clip costs one API call. Clips enter a SM-2 spaced-repetition queue with three review modes: passive reveal, Korean→English typing, and AI-generated situation response. Built with Spring Boot + Next.js, runs locally via Docker Compose, designed for ECS Fargate deployment, and uses Google Gemini for analysis (free tier, costs zero to operate)."

### 🇰🇷 한국어 (자기소개서)
> "TubeShadow는 한국 개발자를 위한 YouTube 기반 영어 쉐도잉 + 출력 학습 풀스택 웹앱입니다. YouTube URL을 붙여 자막 구간을 클립으로 저장하면 AI가 한국어 번역, 직독직해, 어휘, 실제 사용 상황까지 자동 생성하고 DB에 캐싱합니다. 클립은 Anki SM-2 알고리즘 기반 복습 큐에 들어가 3가지 모드 — 자막 reveal, 한글→영작, 상황→응답 — 로 학습합니다. Spring Boot + Next.js로 만들었고, Docker Compose로 로컬 풀스택을 한 줄로 띄우며, ECS Fargate 배포를 염두에 두고 설계했습니다. Google Gemini 무료 tier 사용으로 운영비 $0."

---

## 🧰 Tech Stack (one line)

```
Backend  : Java 21 · Spring Boot 3.3 · PostgreSQL 16 · Flyway · JWT (HS256) · Spring Security
Frontend : Next.js 16 (App Router) · TypeScript strict · Tailwind 4 · shadcn/ui · Zustand · TanStack Query
AI       : Google Gemini 2.5 Flash (primary, free) · Anthropic Claude Haiku 4.5 (alt) · Provider abstraction
Infra    : Docker + docker-compose · GitHub Actions CI · ECS Fargate / S3 / RDS / OIDC (deploy.yml ready)
Quality  : JUnit 5 + Testcontainers · Vitest · Playwright (14 E2E specs)
i18n     : next-intl, 5 locales (en default, ko/ja/zh/es)
```

---

## 🌟 Key Features (résumé bullets)

| Feature | What it does | Engineering moment |
|---|---|---|
| **YouTube clip mining** | Paste URL → fetch metadata + extract subtitles via `yt-dlp` subprocess → auto-slice transcript at user-selected range | Self-healing import (retries transcript on re-import, captures dimensions via `yt-dlp -J`) |
| **AI explanation pipeline** | Single LLM call returns translation + 직독직해 (word-by-word) + vocabulary + practice scenario, persisted in JSONB so reviews don't re-call | `@TransactionalEventListener(AFTER_COMMIT) + @Async` decouples HTTP from analysis |
| **Provider-agnostic LLM** | `AiAnalysisClient` interface + `@ConditionalOnProperty` switches Claude / Gemini at boot | Demonstrates SOLID + 12-factor config |
| **Spaced repetition (SM-2)** | Anki algorithm, due queue, streak widget | Pure-function domain logic, fully unit-tested |
| **3 review modes** | Reveal / Write (한→영) / Scenario (상황→응답) | LocalStorage-persisted mode, token-level diff highlighting |
| **i18n** | 5 locales, path-based routing (`/en/...`, `/ko/...`), `<LocaleSelector>` | next-intl with `next-intl/navigation` wrapper across all `Link` / `useRouter` |
| **Blind shadowing mode** | Subtitle hide / first-letter / full toggle on player | Pure-function `transform()` with Unicode `\p{L}` support (Korean + English) |
| **Audio-only mode** | CSS overlay hides YouTube iframe, audio keeps playing | Tested with Playwright (`audio-only.spec.ts`) |
| **BYOAI** | Send prompts to user's own ChatGPT/Claude/Gemini via clipboard + window.open fallback | Zero-cost alternative to our API spend |
| **Auth + rate limit** | JWT 24h, constant-time login (bcrypt + dummy hash), 20 req/min per IP | `AuthRateLimitFilter` via `HandlerInterceptor` (Spring auto-registration trap avoided) |

---

## 🏗 Architecture (one diagram in words)

```
Browser (Next.js, Vercel-ready)
   ↓ JWT in Authorization header
Spring Boot (ECS Fargate-ready, Docker)
   ↓                          ↘                    ↘
PostgreSQL (RDS-ready)    Local FS / S3       Google Gemini (or Claude)
   - users                - recordings/         (one call per clip, cached in JSONB)
   - clips (transcript                          ↑
   - clip_analyses (12 Flyway migrations)       Provider abstraction
   - review_items (SM-2)                        AiAnalysisClient interface
   - recordings
   - collections
```

---

## 🎤 Interview Talking Points

### "Walk me through your authentication"
*"Stateless JWT signed with HS256, 24-hour TTL. Login uses constant-time bcrypt comparison plus a dummy-hash branch when the user doesn't exist, so attackers can't tell valid emails from invalid ones by timing. Rate-limited at 20 logins per minute per IP via a `HandlerInterceptor` (I avoided `Filter` because Spring Boot auto-registers them and that bit me once)."*

### "How do you handle expensive AI calls?"
*"The analysis is fire-and-forget — `@TransactionalEventListener(AFTER_COMMIT) + @Async`. The HTTP request that creates a clip returns immediately; the LLM call happens on a worker. Results land in a `clip_analyses` row with a JSONB blob — translation, chunked translation, vocabulary, scenario — so every review afterward is zero LLM cost. A Regenerate button is the only path back to the LLM."*

### "Provider switching?"
*"There's an `AiAnalysisClient` interface and two implementations — `ClaudeClient`, `GeminiClient`. Both are `@ConditionalOnProperty(name='tubeshadow.ai.provider', havingValue='...')`. The default is Gemini for cost (free tier covers personal use), Claude is the upgrade path. Switching is one env var flip."*

### "What was the hardest bug?"
*"YouTube subtitle extraction. The official `timedtext` URL embedded in the watch page returns 200 with zero bytes after a few minutes — short-lived token. I migrated to `yt-dlp` as a subprocess, then added a recovery path in `VideoImportService.recoverIfNeeded` so re-importing the same URL retries the transcript and dimension probe in idempotent way."*

### "Tests?"
*"JUnit 5 + Testcontainers for the integration suite (Postgres in Docker, real Flyway migrations). Vitest for pure TS units like `BlindShadowingPanel.transform`. Playwright for 14 E2E scenarios — auth flow, clip create, audio mode, blind mode, write quiz, scenario quiz, i18n switching. Backend runs `./gradlew test`; frontend runs `vitest run`; both gated in `.github/workflows/ci.yml`."*

### "Deployment?"
*"Locally everything spins up with `docker compose -f docker-compose.dev.yml up` — Postgres, Spring Boot (with JVM debug port exposed), Next.js dev server, all hot-reloading. For production I have `Dockerfile` (multi-stage, non-root user, healthcheck), `ecs-task-definition.json`, `deploy.yml` (GitHub Actions OIDC → ECR push → ECS rolling update), and `aws-bootstrap.md` documenting VPC / RDS / Secrets Manager setup. I haven't pushed to AWS yet — it's a personal study tool — but the path is wired."*

### "What did building this teach you?"
*"Three things. (1) Prompt engineering is real engineering — getting Gemini to do *직독직해* (word-by-word gloss in English order) needed strict rules and counter-examples in the prompt, otherwise it defaults to natural Korean order which is useless for the learner. (2) Always decouple expensive I/O from request handling — the analysis pipeline taught me to think about `AFTER_COMMIT` semantics. (3) Provider abstraction is cheap to add up front and saved me when Claude credit ran out and I switched to Gemini in one afternoon."*

---

## 📈 Numbers / Outcomes (use these in bullets)

- **9 database migrations** (V1–V12), all forward-only via Flyway, applied automatically on startup
- **14 E2E test specs** + 11 Vitest unit tests + JUnit integration tests
- **5 UI locales** with path-based routing, content-aware fallback to English
- **3 review modes** combining input (reveal) and output (write, scenario) practice
- **$0/mo operating cost** at personal-use volume (Gemini free tier: 1500 req/day)
- **One-command local setup** for new contributors (`docker compose up`)
- **Zero static credentials** in CI/CD (GitHub Actions → AWS via OIDC)

---

## 📦 What's in the repo (for a recruiter to scan)

```
backend/           Spring Boot, 7 bounded contexts (auth, video, clip, analysis, recording, review, common)
frontend/          Next.js 16 App Router, 5 locales, shadcn/ui design system
infrastructure/    ECS task definition, AWS bootstrap doc
.github/workflows/ CI (test + build) and deploy.yml (ECR push + ECS update via OIDC)
e2e/               14 Playwright spec files
docs/              ARCHITECTURE, DEVOPS, HANDBOOK, PRODUCT_ROADMAP, BUILD_JOURNAL, CODE_WALKTHROUGH, INFRA_DEEP_DIVE
```

---

## 🤖 "I want to ask another AI about this project" — drop this in the prompt

> *"I built a project called TubeShadow. It's a full-stack web app for Korean software developers learning English. Users paste YouTube URLs, clip subtitle segments, and the app generates AI explanations (Korean translation, word-by-word gloss in English order, vocabulary, real-world practice scenarios) — all cached after one LLM call. Clips enter an SM-2 spaced-repetition queue with three review modes: passive reveal, Korean-to-English typing, and AI-generated situation response.
>
> Stack: Java 21 / Spring Boot 3.3 / PostgreSQL 16 / Flyway / Spring Security + JWT (HS256, constant-time login, rate-limited via HandlerInterceptor) on the backend. Next.js 16 App Router / TypeScript strict / Tailwind 4 / shadcn/ui / Zustand / TanStack Query on the frontend. Provider-abstracted LLM (Google Gemini 2.5 Flash default for $0 operating cost, Claude Haiku 4.5 alternative) via `AiAnalysisClient` interface + `@ConditionalOnProperty`. Analysis is async (`@TransactionalEventListener AFTER_COMMIT + @Async`) and results persist in JSONB for zero-cost replays. i18n via next-intl with 5 locales, path-based routing.
>
> Infrastructure: Docker Compose for local (Postgres + Spring Boot with JDWP debug port + Next.js dev, all hot-reloading), Dockerfile multi-stage for prod, ECS Fargate task definition + GitHub Actions deploy.yml using OIDC (no static AWS keys). 12 Flyway migrations, 14 Playwright E2E specs, JUnit + Testcontainers integration tests.
>
> [Now ask your question — résumé bullets, mock interview questions, README polish, whatever]"*

---

## 🧭 Honest framing (interviewer asks "did you write this yourself?")

> *"Most of the implementation was AI-assisted — I worked with Claude Code as a pair programmer. What I owned were the product decisions (which features survive the OUT-OF-SCOPE filter), the architecture choices (provider abstraction, fire-and-forget analysis, JSONB caching), the prompt engineering for 직독직해, and verification — every feature has Playwright coverage I designed and reviewed. I can step through any code path in the debugger and explain why each piece is there. The way I see modern software work, the value isn't in typing the syntax — it's in deciding what gets built, knowing when an LLM's output is wrong, and owning the operational consequences. This project is where I practice that loop."*

이 한 단락이 "AI가 다 만든 거 아니냐"는 채용자 질문의 정답.

---

## 🔗 Where to put what

| 자료 | 어디에 |
|---|---|
| Elevator pitch (English) | LinkedIn About / 자기소개서 / 이력서 헤더 |
| Tech stack 한 줄 | 이력서 프로젝트 섹션 |
| Key features 표 (5~7개 골라서) | 이력서 bullet (각각 동사로 시작: "Built…", "Designed…") |
| Interview talking points | 면접 전 준비 (외우진 말고 흐름만) |
| Numbers/outcomes | 이력서 정량 bullet |
| AI prompt | 자기소개서 doctor에 컨텍스트로, 또는 다른 AI한테 mock 면접 받을 때 |
| Honest framing | "AI 사용했냐" 질문 받았을 때 |

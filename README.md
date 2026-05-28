# TubeShadow

![Java 21](https://img.shields.io/badge/Java-21-007396?logo=openjdk&logoColor=white)
![Spring Boot 3.3](https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?logo=springboot&logoColor=white)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![PostgreSQL 16](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

**A full-stack web app that turns any YouTube video into spaced-repetition English practice.**
Paste a URL, clip a subtitle range, and the app generates a translation, a word-by-word gloss,
vocabulary, and a real-world practice scenario — then schedules it for review like Anki.

It solves one specific problem: **developers who read English fluently but freeze when they have
to _produce_ it.** TubeShadow closes the gap between input (shadowing) and output (speaking & writing).

> **Solo-built, full-stack.** Java / Spring Boot REST API · Next.js / TypeScript frontend ·
> PostgreSQL · pluggable LLM (Gemini / Claude) · Dockerized · CI/CD to AWS ECS Fargate.

**Quick links**

- **Run it locally** in three commands → [Run it locally](#run-it-locally) _(no API key required for the core flow)_
- **Live demo** — _deploying to AWS ECS Fargate; link coming_
- **Build log & timeline** — [daeseon.ai/projects/shadow-ai](https://daeseon.ai/projects/shadow-ai)

_At a glance: 7 bounded contexts · 13 DB migrations · 16 backend test classes · 14 Playwright E2E specs · 5 UI locales._

---

## What it does

```
paste a YouTube URL
  → clip a subtitle range (click subtitles, or set start/end)
    → AI returns: translation + word-by-word gloss (직독직해) + vocabulary + a practice scenario
      → SM-2 spaced repetition schedules the clip
        → review 3 ways:  reveal  ·  write (L1 prompt → English)  ·  scenario (situation → response)
```

No pronunciation scoring, no social feed, no AI essay grading. Just **input → output → repeat** —
the loop language-acquisition research actually supports.

---

## Engineering highlights

The decisions I'd want to talk through in an interview:

- **Domain-driven backend.** Seven bounded contexts (`auth`, `video`, `clip`, `analysis`,
  `recording`, `review`, `deck`) over a shared `common` module — organized by feature, not by layer.

- **Async, transaction-safe AI pipeline.** Creating a clip publishes a domain event; analysis runs
  on a background thread via `@TransactionalEventListener(AFTER_COMMIT)` + `@Async`. The multi-second
  LLM HTTP call runs **outside** any DB transaction, so it never pins a connection-pool connection —
  only the small `PENDING → READY / FAILED` state writes are transactional.

- **Pluggable LLM provider.** One `AiAnalysisClient` interface, two implementations (Google Gemini,
  Anthropic Claude), selected at runtime with `@ConditionalOnProperty`. Switching providers is a
  single env var — zero call-site changes.

- **$0 marginal cost by design.** Each clip triggers exactly one LLM call; the result (translation,
  gloss, vocabulary, scenario) is cached in a `jsonb` column. Every later review and quiz reads the
  cache, so studying never re-bills the API. Defaults to Gemini's free tier.

- **Pure-function domain core.** The SM-2 scheduler, sentence merger, and blind-shadowing transform
  are I/O-free pure functions — fast, deterministic, and fully unit-tested.

- **Security & data isolation.** Stateless JWT (HS256), bcrypt password hashing, per-user isolation
  enforced at the query layer (`findByIdAndUserId`), and IP-based rate limiting on auth endpoints.

- **Tested top to bottom.** JUnit 5 + Testcontainers (a real PostgreSQL per run) for the backend,
  Vitest for frontend units, and 14 Playwright E2E specs — all gated by GitHub Actions CI on every push.

---

## Features

| Area | What it does |
|------|------|
| **Import** | YouTube URL → metadata (oEmbed) + subtitles (`yt-dlp`). Re-import self-heals a missing transcript. |
| **Clip** | Free range selection (start/end buttons or subtitle click), automatic transcript slice, loop + 0.5–1.5× speed. |
| **AI analysis** | One LLM call per clip → translation, word-by-word literal gloss (직독직해), key expressions, vocabulary, and a usage scenario. Cached in JSONB, so reviews cost $0. |
| **Blind shadowing** | Three reveal levels (full / first-letter / blocked), `b` to cycle. |
| **Audio-only mode** | Hide the video, enlarge the caption, `v` to toggle. |
| **Quiz — Write** | L1 (Korean) prompt → type the English from memory → token-level diff highlight. |
| **Quiz — Scenario** | AI builds a real situation that cues the clip's expression → you respond → sample answer. |
| **Decks** | Anki-style grouping. Deleting a deck keeps the clips (they fall back to Inbox). |
| **Spaced repetition** | SM-2 algorithm, Again / Hard / Good / Easy, deck-filtered queue, streak widget. |
| **Playlist** | Play a deck end to end — prev / next + autoplay. |
| **Recording + A/B** | Record yourself, then play "original → you" back to back. |
| **BYOAI** | Send the analysis prompt to your own ChatGPT / Claude / Gemini — zero cost to the app. |
| **i18n** | 5 locales (en default, ko / ja / zh / es), path-based routing. |

---

## Architecture

```
Browser (Next.js)
   │  JWT in Authorization header
   ▼
Spring Boot ──────────────┬──────────────────┐
   │                      │                   │
   ▼                      ▼                   ▼
PostgreSQL          Local FS / S3       Google Gemini (or Claude)
  users               recordings/        one call per clip,
  videos                                 cached in clip_analyses (jsonb)
  clips (transcript)                            ▲
  clip_analyses                          AiAnalysisClient interface
  review_items (SM-2)                    (@ConditionalOnProperty)
  recordings · decks · collections
```

The async analysis pipeline, the provider abstraction, and the JSONB caching strategy are written up
in detail in [`ARCHITECTURE.md`](./ARCHITECTURE.md); see [Engineering highlights](#engineering-highlights)
for the short version.

---

## Tech stack

**Backend** — Java 21, Spring Boot 3.3, Gradle (Kotlin DSL), PostgreSQL 16, Flyway,
Spring Security + JWT (HS256), `yt-dlp` (subprocess).

**Frontend** — Next.js 16 (App Router), TypeScript (strict), Tailwind CSS 4, shadcn/ui,
Zustand, TanStack Query, next-intl.

**AI** — Google Gemini 2.5 Flash by default (free tier, $0/mo), with Anthropic Claude Haiku 4.5
as a drop-in alternative. Selected at runtime via one env var.

**Infrastructure** — Docker (multi-stage build + Compose), GitHub Actions CI. Deploy target:
AWS ECS Fargate — `infrastructure/` holds the task definition, an AWS bootstrap guide, and an
OIDC-based deploy workflow.

---

## Testing

```bash
cd backend  && ./gradlew test       # JUnit 5 + Testcontainers (real PostgreSQL in Docker)
cd frontend && npm test             # Vitest unit tests
cd e2e      && npx playwright test  # 14 specs (auth, clip, quizzes, decks, i18n, BYOAI, …)
```

CI (`.github/workflows/ci.yml`) runs all three on every push; `deploy.yml` ships the backend image to AWS.

---

## Run it locally

Prereqs: **Docker**, **Java 21**, **Node 22+** (Next.js 16 requires Node 22).

```bash
# 1. PostgreSQL
docker compose up -d

# 2. Backend → http://localhost:8080
cd backend
cp ../.env.example ../.env          # fill in the JWT secret; an LLM API key is optional
./gradlew bootRun

# 3. Frontend → http://localhost:3000
cd frontend
npm install
npm run dev
```

The core flow (import → clip → review → record) runs without any API key. Add a Gemini or Claude key
to `.env` to enable AI analysis. To bring up the whole stack (DB + backend with a JVM debug port +
frontend) in one command:

```bash
docker compose -f docker-compose.dev.yml up
```

---

## Project structure

```
backend/         Spring Boot — 7 bounded contexts + a shared common module, 13 Flyway migrations
frontend/        Next.js 16 App Router, 5-locale i18n, shadcn/ui
e2e/             Playwright specs (14)
infrastructure/  AWS ECS task definition + bootstrap guide
docs/            troubleshooting log
content/logs/    dated build-log entries (aggregated by daeseon.ai)
```

Longer-form docs: [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DEVOPS.md`](./DEVOPS.md),
[`HANDBOOK.md`](./HANDBOOK.md), [`PROJECT_SUMMARY.md`](./PROJECT_SUMMARY.md).

---

## Scope & honesty

- **Solo project, AI-assisted.** Built with Claude Code as a pair programmer. The product direction,
  the architecture (provider abstraction, JSONB caching, the transaction-safe async pipeline), the
  prompt design, and the test strategy are mine — and every feature ships with a Playwright spec I designed.
- **Deliberate non-goals.** No pronunciation scoring, no AI essay grading, no social feed. The thesis
  is friction removal, not feature count.
- **`yt-dlp` caveat.** Subtitle and metadata extraction uses `yt-dlp`, which sits in a YouTube ToS
  gray area — fine for personal use; revisit before any public or commercial deployment.

## License

MIT

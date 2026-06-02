# Mimi

![Java 21](https://img.shields.io/badge/Java-21-007396?logo=openjdk&logoColor=white)
![Spring Boot 3.3](https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?logo=springboot&logoColor=white)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![PostgreSQL 16](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

**A full-stack English-learning app for developers — turn any YouTube video into spaced-repetition
shadowing practice, *and* drill the grammar patterns, collocations, and prepositions you keep
tripping on, every day.**

It solves one specific problem: **developers who read English fluently but freeze when they have to
_produce_ it.** Mimi closes the gap between input (shadowing) and output (speaking & writing) — and
attacks the parts that never come automatically (prepositions, fixed chunks, sentence frames) with
daily, spaced-repetition drills.

> **Solo-built, full-stack.** Java / Spring Boot REST API · Next.js / TypeScript frontend ·
> PostgreSQL · pluggable LLM (Gemini / Claude) · Dockerized · CI/CD to AWS ECS Fargate.

**Quick links**

- **Run it locally** in three commands → [Run it locally](#run-it-locally) _(no API key required for the core flow)_
- **Frontend** — deployed on Vercel at [mimi.daeseon.ai](https://mimi.daeseon.ai) _(UI preview; full-stack AWS ECS/RDS deploy documented in [`infrastructure/`](./infrastructure/aws-bootstrap.md))_
- **Build log & timeline** — [daeseon.ai/projects/shadow-ai](https://daeseon.ai/projects/shadow-ai)

_At a glance: **8 bounded contexts · 17 DB migrations · two SRS algorithms · Testcontainers + Vitest + Playwright · 5 UI locales**. (Repo/package keep the original `shadow-ai` / `tubeshadow` identifiers; "Mimi" is the user-facing brand.)_

---

## What it does

Mimi has two halves that feed each other:

### 1 · Shadow from YouTube
```
paste a YouTube URL
  → clip a subtitle range (click subtitles, or set start/end)
    → AI returns: translation + word-by-word gloss (직독직해) + vocabulary
                  + per-preposition notes + a real-world practice scenario
      → SM-2 spaced repetition schedules the clip
        → review 3 ways:  reveal  ·  write (L1 prompt → English)  ·  scenario (situation → response)
          → record yourself and play "original → you" back to back
```

### 2 · Daily drills (the **Practice** hub)
The grammar you "know" but never produce, forced into your mouth daily — separate from the video loop:

```
Patterns        82 high-frequency sentence frames (the "as" family, relatives,
                indirect questions, conditionals, verb patterns, …) — 246 say-it-aloud items
Collocations    101 word+preposition chunks (depend on, good at, deploy to …), General / Dev filter
Prepositions    animated SMIL diagrams per sense + a fill-in drill + the ones mined from your clips
Compose (영작)   write your own sentence with a target → AI grades it + suggests a better version
Weak spots      the cards you miss most, sorted by lapses, from data the daily drill collects
```
Every drill rep advances a **Leitner** spaced-repetition box (per user, on the account) and a shared
daily streak; the model sentence is spoken aloud (Web Speech API) so you can shadow it.

No pronunciation scoring, no social feed, no AI essay grading. Just **input → output → repeat** —
the loop language-acquisition research actually supports.

---

## Engineering highlights

The decisions I'd want to talk through in an interview:

- **Domain-driven backend.** Eight bounded contexts (`auth`, `video`, `clip`, `analysis`,
  `recording`, `review`, `deck`, `practice`) over a shared `common` module — organized by feature, not layer.

- **Async, transaction-safe AI pipeline.** Creating a clip publishes a domain event; analysis runs on a
  background thread via `@TransactionalEventListener(AFTER_COMMIT)` + `@Async`. The multi-second LLM HTTP
  call runs **outside** any DB transaction, so it never pins a connection-pool connection — only the
  small `PENDING → READY / FAILED` writes are transactional.

- **Pluggable LLM provider, reused for a second feature.** One `AiAnalysisClient` interface, two impls
  (Gemini, Claude), selected at runtime via `@ConditionalOnProperty`. When the AI **composition check**
  was added, it reused the same abstraction (a low-level `complete()` added to the interface) — no new
  client, no coupling to the analysis schema.

- **Two SRS algorithms, matched to the grading shape.** Clip review uses **SM-2** (4-grade
  Again/Hard/Good/Easy). The drills have a binary outcome (Got it / Again), so they use a **Leitner box**
  system instead — the right tool for the data, rather than forcing SM-2's 0–5 scale onto two buttons.

- **Cost & abuse guards.** Each clip triggers exactly one LLM call, cached in a `jsonb` column, so reviews
  never re-bill the API ($0 marginal cost; defaults to Gemini's free tier). The AI composition endpoint —
  the one authed call that costs money — is **per-user rate-limited**, separate from the IP-based limiter
  on signup/login.

- **Observability.** MDC-tagged structured logs (request id + user id) and Micrometer metrics exported to
  Prometheus (`/actuator/prometheus`), including the custom AI-path timings.

- **Pure-function domain core.** SM-2 scheduler, Leitner rules, sentence merger, blind-shadowing
  transform, and the drill-session builder are I/O-free pure functions — fast, deterministic, unit-tested.

- **Content accuracy as a discipline.** The 82 patterns + 101 collocations were authored one-agent-per-
  category in parallel, then **strictly audited item-by-item** (correct preposition, idiomatic model,
  faithful Korean cue) before merging — because in a learning tool a wrong example is worse than none.

- **Security & data isolation.** Stateless JWT (HS256) with a token-version revocation claim, bcrypt
  hashing, per-user isolation at the query layer (`findByIdAndUserId`), timezone-correct streaks
  (client-supplied local date), and Cloudflare-aware rate limiting.

- **Tested top to bottom.** JUnit 5 + Testcontainers (a real PostgreSQL per run) for the backend,
  Vitest for frontend units, Playwright E2E — all gated by GitHub Actions CI on every push.

---

## Features

| Area | What it does |
|------|------|
| **Import** | YouTube URL → metadata (oEmbed) + subtitles (`yt-dlp`). Re-import self-heals a missing transcript. |
| **Clip** | Free range selection (start/end or subtitle click), automatic transcript slice, loop + 0.5–1.5× speed. |
| **AI analysis** | One LLM call per clip → translation, literal gloss (직독직해), key expressions, vocabulary, per-preposition notes, usage scenario. Cached in JSONB, so reviews cost $0. |
| **Blind / audio modes** | Three reveal levels (full / first-letter / blocked, `b` to cycle); hide-video audio-only mode (`v`). |
| **Quiz — Write / Scenario** | L1 prompt → type the English (token-level diff); or an AI situation cueing the clip's expression → you respond → sample answer. |
| **Spaced repetition (clips)** | SM-2, Again/Hard/Good/Easy, deck-filtered queue, streak widget. |
| **Decks & playlist** | Anki-style grouping (delete keeps clips → Inbox); play a deck end-to-end with autoplay. |
| **Recording + A/B** | Record yourself, then play "original → you" back to back. |
| **Practice — Patterns** | 82 sentence frames / 246 items; daily say-it-aloud drill with English-word-order Korean cues. |
| **Practice — Collocations** | 101 word+preposition chunks, General / Dev·IT filter. |
| **Practice — Prepositions** | Animated per-sense diagrams + fill-in drill + prepositions mined from your own clips. |
| **Practice — Compose (영작)** | Write your own sentence using a target; AI judges correctness + use of the target + a better version. |
| **Practice — Weak spots** | High-lapse cards surfaced from the daily-grade data; seen / misses / mastered stats. |
| **Drill SRS + streak + TTS** | Leitner box per card (account-persisted), shared daily streak, model sentence spoken aloud. |
| **BYOAI** | Send the analysis prompt to your own ChatGPT / Claude / Gemini — zero cost to the app. |
| **i18n** | 5 locales (en default, ko / ja / zh / es), path-based routing. |

---

## Architecture

```
Browser (Next.js, Vercel)
   │  JWT in Authorization header
   ▼
Spring Boot (8 bounded contexts) ─────────┬─────────────────────┐
   │                                       │                     │
   ▼                                       ▼                     ▼
PostgreSQL                           Local FS / S3        Gemini (or Claude)
  users · videos · clips(transcript)   recordings/        analyzeClip(): 1 call/clip, cached jsonb
  clip_analyses (jsonb cache)                             complete():   AI composition check
  review_items (SM-2)                                            ▲
  decks · collections · recordings                       AiAnalysisClient interface
  practice_progress (streak)                             (@ConditionalOnProperty, runtime-selected)
  practice_card (Leitner SRS)
```

The async analysis pipeline, the provider abstraction, and the JSONB caching strategy are written up in
[`ARCHITECTURE.md`](./ARCHITECTURE.md); see [Engineering highlights](#engineering-highlights) for the short version.

---

## Tech stack

**Backend** — Java 21, Spring Boot 3.3.5, Gradle (Kotlin DSL), PostgreSQL 16, Flyway (17 migrations),
Spring Security + JWT (HS256), Micrometer/Actuator → Prometheus, `yt-dlp` (subprocess).

**Frontend** — Next.js 16 (App Router), TypeScript (strict), Tailwind CSS 4, shadcn/ui, Zustand,
TanStack Query, next-intl.

**AI** — Google Gemini 2.5 Flash by default (free tier, $0/mo), with Anthropic Claude Haiku 4.5 as a
drop-in alternative. Selected at runtime via one env var.

**Infrastructure** — Docker (multi-stage build + Compose), GitHub Actions CI (lint · test) + OIDC-based
deploy. Targets: AWS ECS Fargate + RDS (`infrastructure/aws-bootstrap.md` is a step-by-step runbook) for
the managed-cloud path; frontend on Vercel.

---

## Testing

```bash
cd backend  && JAVA_HOME=<jdk21> ./gradlew test   # JUnit 5 + Testcontainers (real PostgreSQL in Docker)
cd frontend && npm test                            # Vitest unit tests (incl. the SRS session logic)
cd e2e      && npx playwright test                 # Playwright E2E (auth, clip, quizzes, decks, i18n, …)
```

CI (`.github/workflows/ci.yml`) runs lint + tests on every push; `deploy.yml` ships the backend image to AWS via keyless OIDC.

---

## Run it locally

Prereqs: **Docker**, **Java 21**, **Node 22+** (Next.js 16 requires Node 22).

```bash
# 1. PostgreSQL (port 5434)
docker compose up -d

# 2. Backend → http://localhost:8080
cd backend
cp ../.env.example ../.env          # fill in the JWT secret; an LLM API key is optional
./gradlew bootRun

# 3. Frontend → http://localhost:3100
cd frontend
npm install
npm run dev
```

The core flow (import → clip → review → record) and the Practice drills run without any API key. Add a
Gemini or Claude key to `.env` to enable AI analysis and the composition check. One-command full stack
(DB + backend with a JVM debug port + frontend): `docker compose -f docker-compose.dev.yml up`.

---

## Project structure

```
backend/         Spring Boot — 8 bounded contexts + a shared common module, 17 Flyway migrations
frontend/        Next.js 16 App Router, 5-locale i18n, shadcn/ui
e2e/             Playwright specs
infrastructure/  AWS ECS task definition + a first-time bootstrap runbook
docs/            troubleshooting log (problem → cause → fix → commit)
content/logs/    dated build-log entries (aggregated live by daeseon.ai)
```

Longer-form docs: [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DEVOPS.md`](./DEVOPS.md),
[`HANDBOOK.md`](./HANDBOOK.md), [`PROJECT_SUMMARY.md`](./PROJECT_SUMMARY.md).

---

## Scope & honesty

- **Solo project, AI-assisted.** Built with Claude Code as a pair programmer. The product direction, the
  architecture (provider abstraction, JSONB caching, the transaction-safe async pipeline, the two-SRS
  split), the prompt design, and the test/content-audit strategy are mine.
- **Deliberate non-goals.** No pronunciation scoring, no AI essay grading, no social feed. The thesis is
  friction removal, not feature count.
- **`yt-dlp` caveat.** Subtitle and metadata extraction uses `yt-dlp`, which sits in a YouTube ToS gray
  area — fine for personal use; revisit before any public or commercial deployment.

## License

MIT

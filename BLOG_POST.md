---
title: "TubeShadow build log — shipping a personal English-learning app with Claude Code"
date: "2026-05-27"
description: "How I went from a YouTube URL paste to an Anki-style 직독직해 quiz with provider-abstracted LLMs and zero monthly cost, in a single Claude Code session."
language: en
tags: ["claude-code", "english-learning", "spring-boot", "nextjs", "gemini", "prompt-engineering"]
---

# TubeShadow build log — shipping a personal English-learning app with Claude Code

> What I built, what I tossed, and what AI couldn't decide for me — in the order it actually happened. Not a tutorial. A receipt.

**~14 min read · May 27, 2026**

---

## What it is

[**TubeShadow**](https://github.com/Daeseon-AI-Factory/shadow-ai) is a full-stack web app I wrote for myself — a Korean developer trying to actually *speak* the English I keep reading. The flow:

```
paste YouTube URL
  → clip a subtitle range
    → AI returns translation + 직독직해 + scenario
      → SM-2 spaced repetition queues it
        → three review modes: reveal / write / situation-response
```

No social, no leaderboard, no AI grading my pronunciation. Just **input → output → repeat**, the only language-learning loop that has ever worked.

By the end of the build:
- 9 PostgreSQL tables, 13 Flyway migrations
- 17 Playwright E2E specs, all green
- 5 UI locales (next-intl, path-based routing)
- 3 quiz modes (passive, typing, situation-response)
- Provider-abstracted LLM (Gemini default — **$0/mo**, Claude as drop-in)
- One-command local stack (Docker Compose with JVM debug port exposed)

## Tech stack — one line

```
Backend   Java 21 · Spring Boot 3.3 · PostgreSQL 16 · Flyway · JWT (HS256)
Frontend  Next.js 16 (App Router) · TypeScript strict · Tailwind 4 · shadcn/ui · Zustand · TanStack Query
AI        Google Gemini 2.5 Flash (default) · Claude Haiku 4.5 (alt) · AiAnalysisClient interface
Infra     Docker Compose · GitHub Actions CI · ECS Fargate / S3 / RDS (deploy.yml ready)
Quality   JUnit 5 + Testcontainers · Vitest · Playwright (17 specs)
i18n      next-intl, 5 locales (en default, ko/ja/zh/es)
```

## The actual timeline

The whole thing happened in **one extended Claude Code session**. I'm pacing it out below the way I felt it — not the way `git log` would.

### Phase 0 — North Star first (~30 min)

I wrote `ROADMAP.md` before I wrote any code. Three sections that stayed sacred:

- **5 values to protect** — user-selected ranges, lifetime library, in-app AI, friction removal, low operating cost.
- **11 "OUT-OF-SCOPE" guarantees** — no pronunciation scoring, no social graph, no Whisper, no native mobile, no payments. The list kept me honest every time I had a feature idea.
- **A decision tree** for new ideas: does it strengthen a value? does it violate the OUT list? can I ship in a week? Three yeses or it goes in the "later" file.

This single document is what made AI-assisted building bearable. Every time Claude suggested a feature, I had a place to check it against. Most ideas died here, and that's exactly the point.

### Phase 1 — Stages 0–9 (the firehose)

I described the whole product to Claude as **10 stages, 69 tasks** (`T-001` … `T-069`). One acceptance criterion per task, written in the imperative. Then: "do all of it, mark progress in `PROGRESS.md`, stop in `BLOCKERS.md` if something is ambiguous."

What landed during this run:

- **Auth**: JWT HS256, bcrypt, **constant-time login** (dummy-hash branch for missing emails so attackers can't time-probe). Rate limit at 20 req/min/IP. The trap: I tried `Filter` first → Spring Boot auto-registered it without my config wiring → 500s. Switched to `HandlerInterceptor`. Saved that to my project memory.
- **YouTube import**: `yt-dlp` as a subprocess (not a library). The first take used the `timedtext` URL embedded in the watch HTML; it returned 200 with **zero bytes** after a few minutes because the token is short-lived. `yt-dlp` is the only thing that consistently works.
- **Clips & library**: range selector, automatic transcript slicing, search/tag/sort, JSON export.
- **AI analysis (v1)**: Claude Haiku, fire-and-forget pipeline via `@TransactionalEventListener(AFTER_COMMIT) + @Async`. Result lands in `clip_analyses` JSONB so reviews are zero LLM cost forever after.
- **Recording + A/B**: `MediaRecorder` → multipart upload → playback "original then you". The recording files have an `afterCommit` hook so if the parent transaction rolls back, no orphan binaries.
- **SRS**: SM-2 algorithm, Anki's quality buttons, due-queue endpoint, streak widget.

I want to be clear: this part felt **inhuman**. A normal week of work landed in an evening. I caught my breath, then started worrying about what I didn't understand. That worry was correct — it's why the next phase had to exist.

### Phase 2 — Slow down, fix what AI got slick-fast

Three things changed in this phase:

1. **Code review pass**. I asked Claude to grade its own work. The HIGH issues:
   - Claude HTTP call happening inside a `@Transactional` boundary. Moved out.
   - Multipart upload limit set to 1MB by default → would silently 413 on most recordings. Bumped to 12MB to match the service-level cap.
   - `X-Forwarded-For` was being trusted unconditionally → rate-limit bypass. Whitelisted source.
   - DB constraint violations returned 500. Mapped to 409.
2. **Subtitle quality**. The raw YouTube cues were way too granular ("All right,", "who's ready", "for some more"). Wrote a pure-function `SentenceMerger` (gap < 300ms, period boundary, ≤ 15s) and exposed a toggle in the UI so a person picks "merged sentences" vs "raw cues."
3. **The honest "I don't get any of this" moment**. I wrote `BUILD_JOURNAL.md` and `CODE_WALKTHROUGH.md` for myself — long-form, plain Korean, explaining what every backend bounded context does and why. Not for resumes. For my own sanity.

> If you're using AI to build something bigger than a script, you need a "slow-down" phase like this. Otherwise the speed becomes a liability.

### Phase 3 — Friction features (Shorts, mobile, BYOAI, i18n)

These are the four I shipped before I started thinking about *how I'd actually use this*:

- **Shorts support**. Detected via `yt-dlp -J` (returns `width`/`height`). Portrait videos render in a 9:16 wrapper with a max-width cap so they don't dominate the page. Added a `Shorts (세로)` badge. Tubeshed doesn't do this; I'm not sure why.
- **Mobile-first layout**. Tabs collapsed the four side panels (transcript / note / AI / record) into a `Tabs` control on small screens. I tested in Playwright by overriding the viewport (the device profile preset wanted `webkit`, which I hadn't installed).
- **BYOAI**. A "Send to my own AI" button that builds a prompt locally and opens ChatGPT/Claude/Gemini/Perplexity with `?q=…`, with a clipboard fallback. **Our cost: zero.** I wasn't sure I'd use it, but it's the right escape hatch for a personal-use tool. (Came back to it later — see Phase 4.)
- **i18n**. `next-intl`, path-based routing (`/en`, `/ko`, `/ja`, `/zh`, `/es`). English is the default; only Korean is hand-translated, the others are English fallback. The `<Link>` and `useRouter` imports across 14 files needed a one-shot `sed` replace — lesson here was to centralize navigation imports from day one.

### Phase 4 — The bit that actually matters: output

Here's where I stopped iterating on plumbing and started building the thing I'd been describing to friends for months.

#### Blind shadowing

Three reveal levels — full text / first-letter / blocked. Toggle on the player, `b` key cycles. Pure function:

```ts
function transform(text: string, level: 0 | 1 | 2): string {
  if (level === 2) return text;
  if (level === 0) return text.replace(/\p{L}+/gu, (w) => "▮".repeat(w.length));
  return text.replace(/\p{L}+/gu, (w) => (w.length <= 1 ? w : w[0] + "_".repeat(w.length - 1)));
}
```

`\p{L}` matches Korean syllables too, so it works for both languages. Vitest covers the edge cases.

#### Audio-only mode

I almost built real background audio (yt-dlp `-x`, S3, Media Session API, the whole Spotify-Web-Player thing). Then I thought about my actual usage and realized: **I never listen passively. I listen at a desk with the tab open.** I deleted the plan. Three lines of CSS to hide the iframe and surface the transcript instead, `v` shortcut, done. The fastest feature is the one I don't build.

This was the moment the OUT-OF-SCOPE list paid for itself.

#### Output quizzes — the whole point

Two review modes that aren't "look at the answer":

**Write (한글 → 영작)**: Korean prompt appears, user types the English, click reveals the original with token-level diff highlighting. Matching words bold, missing words green, extras red. Punctuation-stripped, case-insensitive — close enough.

**Scenario (상황 → 응답)**: AI generates a real-world moment that would naturally cue this clip's expression. Three fields land in the analysis JSONB:

```json
{
  "situation": "회의에서 동료가 어떤 영업사원이 매번 거짓말로 계약을 따낸다고 얘기한다. 너도 그 사람을 알고 있고, 동의하는 표현을 한 마디 해야 한다.",
  "korean_hint": "'거짓말로 먹고산다' 표현을 그대로 써보세요.",
  "sample_response": "Yeah, honestly he has made a living off of lying to people. I wouldn't trust a word he says."
}
```

The reason this works (and doesn't trip the "no AI grading" rule): the **AI generates the prompt; the human grades themself**. SRS quality buttons (Again/Hard/Good/Easy) live where they always did.

#### 직독직해 — the prompt I rewrote three times

Word-by-word Korean gloss in **English word order**, not natural Korean order. This is the second-language-acquisition technique that matters for B1–B2 Korean learners trying to output English, and Gemini's default behavior actively sabotages it.

First prompt, Gemini's output:

```
"All right, who's ready"             → "자, 누가 준비됐나요"
"for some more category theory?"     → "범주론을 좀 더 들을"  ← verb at the end
"You're all in the wrong room."      → "여러분 모두 잘못된 방에 있어요."  ← Korean order
```

After hardening the system prompt with explicit BAD examples ("verb at the end = total failure"):

```
"who's ready for"             → "누가 ~할 준비가 됐나요"
"some more"                   → "좀 더 많은"
"category theory?"            → "범주론에 대해?"
"in the wrong room."          → "잘못된 방에 있어요."
```

Then a chunk-size pass — too granular (1 word per chunk) destroys flow, too coarse re-orders into natural Korean. Landed at **2–5 word "sense groups"** matching how a Korean learner actually breathes when reading. Final example output:

```
"so my only goal"              → "그래서 나의 유일한 목표는"
"with this video"              → "이 비디오로"
"is to have you"               → "당신이 ~하게 만드는 것"
"understand"                   → "이해하게"
"object-oriented programming"  → "객체 지향 프로그래밍을"
```

If you read top-to-bottom you hear English syntax in your head. That's the point. If I could only keep one feature from this whole build, it'd be this one.

#### Provider abstraction (the accidental win)

Mid-build, the Anthropic credit on my key ran out. *"Your credit balance is too low to access the Anthropic API."* I had three options: top up $5, switch to free Gemini, or rip out AI entirely.

I introduced an `AiAnalysisClient` interface, made `ClaudeClient` and `GeminiClient` implement it, gated each with `@ConditionalOnProperty(name = "tubeshadow.ai.provider")`. The whole switch was one env var. Operating cost dropped to **$0/mo on Gemini free tier** (1500 requests/day, more than I'll ever use personally).

The lesson, framed for an interview answer: *provider abstraction is cheap when you have one provider; impossible when you have a hundred call sites.* Do it up front.

### Phase 5 — Anki decks + playlist (the "but it's MY library" pass)

Then I noticed something while using my own tool. I clipped 10 phrases, reviewed them, and the review queue went empty. My instinct was *"wait, where did my clips go?"*

DB check: they're fine. The library shows all 40 of them. SM-2 had just bumped the due date out 5 days — exactly like Anki. The *data* was right; the *UX* lied. Two fixes:

1. **Decks** (Anki-style grouping): a new `decks` table, a nullable `deck_id` foreign key on `clips` (delete the deck → clips fall back to "Inbox", `ON DELETE SET NULL`). A left sidebar in the library. Move clips between decks with a `<select>` per card. Review can filter by deck.
2. **Next-due toast**: after Easy/Good/Hard/Again, a `sonner` toast surfaces the actual computed next-due date ("Solid — next due 2026-06-02"). The clip didn't vanish; it's just resting.

And while I was in there: **playlist autoplay**. Hover a deck in the sidebar, hit ▶, the player loads the first clip with `?deck=<id>` in the URL, fetches the rest of the deck's clips, and the player gets a "1 / 5" indicator + Prev / Next buttons + an Autoplay-next checkbox. Loop and autoplay are mutually exclusive — autoplay wins because that's what you actually want during a study run.

That was the last build phase. The tool can carry me through a real study session now.

## Five engineering decisions I'd defend in an interview

1. **Single AI call per clip, cached forever in JSONB.** Translation, chunked translation, key expressions, vocabulary, and the practice scenario all land in one `clip_analyses` row. Reviews are free. Regenerate is an explicit user action.
2. **Fire-and-forget analysis pipeline.** `@TransactionalEventListener(AFTER_COMMIT) + @Async` means the HTTP request that creates a clip doesn't block on the LLM. The clip exists; the analysis catches up.
3. **Provider abstraction by interface + `@ConditionalOnProperty`.** Switching Claude ↔ Gemini ↔ a future local LLM is one env var. No call-site changes.
4. **Native SQL search with sort-CASE pattern.** Avoids dragging in a separate full-text engine for v0. Will need `tsvector + GIN` past ~10K clips per user; not yet.
5. **Pure-function domain logic where possible.** `Sm2Calculator`, `SentenceMerger`, `BlindShadowingPanel.transform` — no I/O, fully unit-tested, easy to swap.

## Where my mind changed

- **"Direct" translation goes in the prompt, not in the post-processor.** I tried generating natural Korean first and then asking another model to re-order it. Got worse output and twice the cost. One well-written prompt beats two pipeline stages.
- **Audio background play wasn't worth it.** I almost spent four hours on yt-dlp extraction + S3 + Media Session API. Then I asked myself when I'd actually use it. Never. Cut.
- **Word-by-word chunks (1-word) are worse than phrase chunks (2-5 words).** SLA research backs this; my own Playwright screenshots confirmed it. Sense groups are the right unit.
- **AI keys belong in `.env`, not in chat.** I almost typed mine into a debugging message once. The reflex saved me. Same goes for paste-bin diagram tools — they cache; never send anything sensitive.

## What this is NOT

- **Not a tutorial.** If you want to clone-and-run, the README has commands. This post is the "why each piece exists" complement.
- **Not a productized service.** Auth, recording storage, and yt-dlp dependencies are wired for personal use. Public deployment changes the trust boundary (and the YouTube ToS posture) considerably.
- **Not a claim that I typed every line.** Most of the implementation was AI-assisted (Claude Code as pair programmer). What I owned were product decisions (NORTH STAR filter), architecture choices (provider abstraction, JSONB caching, fire-and-forget), prompt engineering (직독직해), and verification (every feature has a Playwright spec I designed and reviewed). I can step through any path in the debugger and explain why each piece is there. That's the part that's mine.

## Quick FAQ

**Why Gemini over Claude?**
Free tier covers personal use indefinitely. Claude is wired as a fallback because the abstraction is free to keep.

**Why yt-dlp instead of YouTube Data API?**
Subtitles. The official API needs OAuth + uploader consent for caption tracks. `yt-dlp` works for any video with public captions, which is the only kind I clip.

**Why no native mobile app?**
On the OUT-OF-SCOPE list from day one. Web works fine on a phone if you make the tabs collapse cleanly, which I did in Phase 3.

**How long did this take?**
About a day of intense pair-programming session, plus a few short follow-ups for decks and playlist. The "AI-impossible" estimate would have been 1–2 weeks of solo work; the "AI-trivial" version (cargo-cult prompt and ship) would have produced something I couldn't debug in production. The pace was in between, by design.

**Do you use it?**
Yes. That was the test.

## Source

- Repo: [`github.com/Daeseon-AI-Factory/shadow-ai`](https://github.com/Daeseon-AI-Factory/shadow-ai)
- One-page project reference for recruiters / interview prep: `PROJECT_SUMMARY.md` in the repo
- The decision filter that kept this build sane: `PRODUCT_ROADMAP.md` §1 (NORTH STAR + OUT-OF-SCOPE)
- The same content in Korean, eventually: `/ko/posts/tubeshadow-build-log`

If you build something similar and want to compare notes — especially on the 직독직해 prompt — DM me.

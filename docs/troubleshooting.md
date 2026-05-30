# Troubleshooting log

Issues hit on shadow-ai and the fix for each. Newest at the bottom.

Format: **Symptom** · **Cause** · **Fix** · **Commit** · (optional **Pattern**).

---

## YouTube `timedtext` returns 200 with zero bytes after a few minutes

- **Symptom**: subtitle fetch via the URL embedded in the YouTube watch HTML returns HTTP 200 with an empty body shortly after page load.
- **Cause**: the `timedtext` URL carries a short-lived signed token; expiration is opaque, no caching contract.
- **Fix**: replaced the entire transcript fetch path with a `yt-dlp` subprocess (`ProcessBuilder`). Added a `recoverIfNeeded` hook in `VideoImportService` so re-importing the same URL retries the transcript and the `yt-dlp -J` dimension probe idempotently.
- **Commit**: `8b5eacd`
- **Pattern**: any unofficial YouTube URL that uses a token has a short shelf-life — treat `yt-dlp` as the only stable surface.

---

## `StaleObjectStateException` on clip delete cascading to recordings

- **Symptom**: deleting a clip occasionally threw `StaleObjectStateException`; the recording row was already gone via DB CASCADE while JPA still held the entity in the persistence context.
- **Cause**: Spring Data's derived `deleteByClipId` hydrates the entity into the session before deleting it, racing with the DB-level CASCADE.
- **Fix**: rewrote to `@Modifying @Query` so the delete bypasses the session cache. Added `ClipDeleteCascadeTest` as a regression.
- **Commit**: `146e080`

---

## `AuthRateLimitFilter` failed at boot with "No default constructor found"

- **Symptom**: backend refused to start; Spring complained about no default constructor for `AuthRateLimitFilter`.
- **Cause**: `Filter` beans get auto-registered by Spring Boot independent of our `SecurityFilterChain` wiring — the auto-registrar tried to instantiate it as a generic filter.
- **Fix**: converted from `Filter` to `HandlerInterceptor`. Same behavior, no auto-registration trap.
- **Commit**: `37a87da`
- **Pattern**: per-request middleware in Spring Boot → prefer `HandlerInterceptor` over `Filter` unless you specifically need to run before Spring MVC.

---

## Recording uploads rejected as 415 from Chrome

- **Symptom**: front-end POST `/api/clips/{id}/recordings` returned `415 UNSUPPORTED_FORMAT` with message `지원하지 않는 오디오 형식입니다: audio/webm;codecs=opus`.
- **Cause**: `RecordingService.upload` compared the full `Content-Type` against a whitelist of base types. Chrome's `MediaRecorder` tags audio with `;codecs=opus`, so the literal string was not in the set.
- **Fix**: in `RecordingService.upload`, strip MIME parameters before the whitelist check (`contentType.split(";", 2)[0].trim()`). Added regression `acceptsContentTypeWithCodecParameter` in `RecordingControllerTest`.
- **Commit**: `ba90e00`
- **Pattern**: any MIME-aware whitelist must compare base types, not full headers.

---

## Anthropic Claude returned "credit balance is too low"

- **Symptom**: every clip analysis ended `FAILED` with `400 Bad Request: "Your credit balance is too low to access the Anthropic API."`.
- **Cause**: paid Anthropic account had zero credit; the LLM call never reached completion.
- **Fix**: introduced `AiAnalysisClient` interface; made `ClaudeClient` and a new `GeminiClient` both implement it, gated by `@ConditionalOnProperty(name = "tubeshadow.ai.provider")`. Added `tubeshadow.gemini.*` config block, defaulted `AI_PROVIDER` env var to `gemini`. Switching providers is now one env var; operating cost dropped to `$0/mo` on Gemini's free tier.
- **Commit**: `ba90e00`
- **Pattern**: provider abstraction is cheap to add up front, impossible to add when you have 100 call sites. Do it when you have one.

---

## Gemini `gemini-1.5-flash` returned 404 NOT_FOUND

- **Symptom**: `POST /v1beta/models/gemini-1.5-flash:generateContent` returned `404: "models/gemini-1.5-flash is not found for API version v1beta, or is not supported for generateContent."`
- **Cause**: model id was outdated; the v1beta endpoint no longer serves it.
- **Fix**: queried `GET /v1beta/models?key=...` to enumerate live model names, switched default to `gemini-2.5-flash` in `application.yml` (`GEMINI_MODEL` env var still overrides).
- **Commit**: `ba90e00`

---

## Gemini analysis JSON truncated mid-string

- **Symptom**: every Gemini call returned a `GEMINI_PARSE_FAILED` with `Unexpected end-of-input: was expecting closing quote for a string value at line 3, column 51`.
- **Cause**: `gemini-2.5-flash` burns "thinking" tokens before emitting visible text. With `maxOutputTokens: 800` the visible JSON was being truncated.
- **Fix**: bumped `maxOutputTokens` to `4096` and added `thinkingConfig: { thinkingBudget: 0 }` to disable thinking for this single-shot translation task. Added a short raw-response preview to the parse-failed log to make this kind of issue cheaper to diagnose next time.
- **Commit**: `ba90e00`
- **Pattern**: reasoning-mode models silently steal output tokens; disable thinking for narrow structured-output tasks.

---

## Clip import I/O error: `Connect timed out`

- **Symptom**: front-end import returned `502 BAD_GATEWAY` with `YOUTUBE_FETCH_FAILED: ... I/O error on GET request for "https://www.youtube.com/oembed": Connect timed out`. Direct curl showed `time_connect: 28s` for youtube.com from the same machine; `google.com` timed out outright.
- **Cause**: machine network was throttled (turned out to be a VPN). The default Spring `RestClient` timeout used by `YoutubeMetadataClient` was much shorter than the 28s connect cost.
- **Fix**: configured `SimpleClientHttpRequestFactory` on the `YoutubeMetadataClient` with `connectTimeout = 60s` and `readTimeout = 60s` to ride out slow networks. Real fix is the user's local network, but the client should not silently fail on a network that *is* eventually reachable.
- **Commit**: `ba90e00`

---

## README/ROADMAP drift: docs listed shipped features as out-of-scope

- **Symptom**: while rewriting the README for recruiters, the project's own docs contradicted the code. `ROADMAP.md` §0.4 and `PROGRESS.md` (2026-05-24) both assert these never shipped:
  ```
  ❌ 직독직해 표시 / Korean translation
  ```
  but the README, the UI, and the schema all present translation + 직독직해 + practice scenario as core features.
- **Cause**: verified against code — the features are real and the planning docs are stale. Migrations `V10__clip_analysis_primary_translation`, `V11__clip_analysis_chunked_translation`, `V12__clip_analysis_practice_scenario`; domain fields `ClipAnalysis.primaryTranslation` / `chunkedTranslation` (its own comment: "직독직해 — English chunks paired with Korean meaning in source order") / `practiceScenario`; E2E specs `primary-translation.spec.ts`, `chunked-translation.spec.ts`, `scenario-quiz.spec.ts`. The product pivoted past the original 24h MVP; §0.4 was never updated.
- **Fix**: treated **code as the source of truth** for the README, not ROADMAP/PROGRESS. Rewrote `README.md` to describe only claims traceable to a migration, domain class, or E2E spec. Left ROADMAP §0.4 untouched — it's an honest historical record of the original MVP scope.
- **Commit**: `a8dd7dc`
- **Pattern**: a "source of truth" doc that isn't updated on every pivot becomes a liability — most dangerous exactly when you reach for it to make a public claim. Before repeating any doc's feature claim in a recruiter-facing artifact, grep migrations + domain + E2E specs to confirm it actually shipped.

---

## AI analysis pipeline could hang threads / exhaust the pool (audit-found, latent)

- **Symptom** (latent — surfaced by a codebase audit, not yet observed in prod): a stalled or throttled AI provider would block an analysis thread indefinitely, and a burst of clip imports could spawn unbounded threads.
- **Cause** (verified in code):
  - `GeminiClient`/`ClaudeClient` built their `RestClient` with **no `requestFactory`**, so the JDK default has **no read timeout** — unlike `YoutubeMetadataClient`, which already sets one. A hung `analyzeClip()` never returns and never writes a FAILED status.
  - `@EnableAsync` was on `TubeshadowApplication` with **no `TaskExecutor` bean**, so `@Async` fell back to `SimpleAsyncTaskExecutor` (a new unbounded thread per task). `ClipAnalysisService.onClipCreated` fires one async analysis per clip creation.
  - No `server.shutdown: graceful` anywhere → SIGTERM during an ECS roll kills in-flight analyses, leaving `ClipAnalysis` rows stuck PENDING (no reaper exists).
- **Fix**: `GeminiClient`/`ClaudeClient` now use `SimpleClientHttpRequestFactory` (connect 10s, read 60s); on timeout the pipeline's existing catch marks the analysis FAILED and frees the thread. New `common/config/AsyncConfig` defines a bounded `ThreadPoolTaskExecutor` (core 2 / max 4 / queue 50, CallerRuns back-pressure) named `taskExecutor`, draining on shutdown. `application.yml` adds `server.shutdown: graceful` + `spring.lifecycle.timeout-per-shutdown-phase: 30s`.
- **Commit**: `e2defd4`
- **Pattern**: every outbound HTTP client needs an explicit read timeout, and `@EnableAsync` without a bounded executor is a thread-exhaustion bomb. Audit the two together — an infinite-timeout call on an unbounded pool is the classic prod-hang compound failure.

---

## Bad UUID / malformed JSON returned 500 instead of 400 (audit-found)

- **Symptom** (audit-found): `GET /api/clips/{a-non-uuid}`, `?page=abc`, or a malformed JSON request body returned `500 INTERNAL_ERROR` with a noisy `Unhandled exception` error log, instead of a 4xx client error.
- **Cause** (verified in code): `GlobalExceptionHandler` has an `@ExceptionHandler(RuntimeException.class)` catch-all. `MethodArgumentTypeMismatchException` (bad path-var/param) and `HttpMessageNotReadableException` (unparseable body) are both `RuntimeException` with no closer handler, so they fell through to the 500 branch. Reachable from every `@PathVariable UUID` / typed `@RequestParam` endpoint.
- **Fix**: added explicit `@ExceptionHandler`s for `HttpMessageNotReadableException` → `400 MALFORMED_REQUEST`, `MethodArgumentTypeMismatchException` → `400 TYPE_MISMATCH` (reports the offending param **name** only, never the raw value/stacktrace), and `MissingServletRequestParameterException` → `400 MISSING_PARAMETER`. The `RuntimeException` catch-all stays as the last-resort 500.
- **Commit**: `e2defd4`
- **Pattern**: a `RuntimeException` catch-all in `@RestControllerAdvice` silently swallows Spring MVC's own 4xx exceptions. Handle the framework's client-error exceptions explicitly, or extend `ResponseEntityExceptionHandler`, so a genuine 5xx stays a meaningful signal.

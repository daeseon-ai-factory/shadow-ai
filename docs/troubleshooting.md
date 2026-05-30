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

---

## Scope-drift docs RESOLVED: planning docs certified shipped features as out-of-scope

- **Symptom**: `Roadmap.md` §0.4 listed `직독직해 / Korean translation` and `다국어 UI` as ❌ OUT-OF-SCOPE, and `PROGRESS.md` affirmatively certified "11개 항목 모두 미포함" — but both shipped (V10/V11 migrations, `ClipAnalysis` translation fields, next-intl `[locale]` routing). An interviewer reading top-down hits the contradiction before the code.
- **Cause**: the original finding was logged at `a8dd7dc` (see "README/ROADMAP drift" above) but only the README was corrected then; the planning docs were left stale.
- **Fix**: added `Roadmap.md` §0.4.1 "스코프 진화 노트" — keeps the original ❌ list as honest MVP history, annotates the two reconsidered items inline, and cites the migrations/E2E that prove they shipped. Rewrote `PROGRESS.md`'s OUT-OF-SCOPE block to "9 still absent, 2 intentionally shipped." Doc-only, no behaviour change. The other 9 OUT-OF-SCOPE items remain genuinely unshipped.
- **Commit**: `ef860d5`
- **Pattern**: when you find doc/code drift, fix *every* surface in the same pass — correcting the README but leaving the roadmap stale just relocates the contradiction.

---

## Prod could boot with the public dev JWT secret + over-exposed actuator (audit-found)

- **Symptom** (audit-found, latent): under the `prod` profile, a missing `JWT_SECRET` env silently fell back to the dev default `dev-only-secret-please-change-in-prod-…`, and `/actuator/**` (incl. `metrics`/`info`) plus Swagger were publicly reachable.
- **Cause** (verified in code): `application.yml` sets `tubeshadow.jwt.secret: ${JWT_SECRET:dev-only-secret-…}`; that default is >=32 bytes so `JwtTokenProvider`'s length-only check passed it — and the dev secret is committed in the repo, so anyone could forge tokens. `SecurityConfig` permit-listed `/actuator/**`, and `application-prod.yml` exposed `health,info,metrics`.
- **Fix**: `JwtTokenProvider` now takes `Environment` and throws on startup if the `prod` profile is active and the secret starts with `dev-only-secret` (PROD-4) — two guard tests added. `SecurityConfig` permit-list narrowed to `/actuator/health` + `/actuator/health/**`; prod actuator exposure cut to `health` only and `springdoc.api-docs/swagger-ui.enabled=false` in prod (SEC-1).
- **Commit**: `e7e45a8`
- **Pattern**: a length/format check on a secret is not a "is this a real secret" check. Fail-fast on the *known placeholder value* under the prod profile, and never expose actuator/Swagger publicly in prod.

---

## Clip search treated user-typed `%` / `_` as SQL wildcards (audit-found)

- **Symptom** (audit-found): searching the clip library for a literal `%` or `_` matched everything / arbitrary single chars, because the native `LIKE` query interpolated the raw term. No length cap either, so a pathological term hit the DB unbounded.
- **Cause** (verified in code): `ClipRepository.search` used `LIKE LOWER(CONCAT('%', :q, '%'))` with no `ESCAPE`; `ClipService.list` passed the raw `q`; `ClipController` had no size constraint.
- **Fix**: escape `\`, `%`, `_` in `ClipService.escapeLike` (backslash first), add `ESCAPE '\'` to all four LIKE clauses, and cap `?q` at 100 chars via `@Validated` + `@Size`. Added a `ConstraintViolationException` → 400 handler so the cap returns a clean 400 instead of falling through to the 500 catch-all.
- **Commit**: `e7e45a8`
- **Pattern**: any user string that reaches a `LIKE` needs both metacharacter-escaping (with an explicit `ESCAPE`) and a length bound — escaping without the `ESCAPE` clause silently does nothing on some engines.

---

## Hardcoded Korean in Recorder/error boundary + stale review queue after grading (audit-found)

- **Symptom** (audit-found): `Recorder.tsx` (6 strings) and the `(app)` route error boundary rendered hardcoded Korean regardless of the active locale, so an `en` user saw Korean. Separately, grading a review card invalidated only the streak query, leaving the queue (and due counts seen elsewhere) stale.
- **Cause** (verified in code): the two components never called `useTranslations`; the review `respondMutation.onSuccess` invalidated `["review","streak"]` only. Also discovered: `messages/ja.json`, `zh.json`, `es.json` are NOT real translations — they mirror the English values (e.g. `review.doneTitle` = "Done for today 🎉" in all three), so the repo's "5 locales" claim is really en + ko + 3 English stubs.
- **Fix**: moved the strings into the `recording` + `globalError` i18n namespaces (en/ko real; ja/zh/es English stubs, matching the existing convention). Review grading now also invalidates `["review","queue"]` with `refetchType: "none"` — marks every queue variant stale for the next mount/deck-switch without refetching the active query, which would reshuffle the in-memory `index` walk underneath the user. The locale-set trim (en+ko only) is deferred to batch 7.
- **Commit**: `1c4e17b`
- **Pattern**: `invalidateQueries` defaults to refetching *active* queries — when a screen walks a loaded list by local index, use `refetchType: "none"` to mark-stale-without-refetch so you don't yank the data out from under the current session.

---

## No retry on transient AI failures + credentialed CORS wildcard fallback (audit-found)

- **Symptom** (audit-found): a single 429/5xx/timeout from the AI provider failed the whole analysis with no retry; and `SecurityConfig` fell back to `allowedOriginPatterns(["http://localhost:*","https://*.vercel.app"])` with `allowCredentials(true)` whenever the configured origins were empty.
- **Cause** (verified in code): the `RestClient` calls had no retry wrapper; `SecurityConfig.corsConfigurationSource` hardcoded that wildcard fallback. A credentialed wildcard means any `*.vercel.app` origin could make authenticated cross-origin requests.
- **Fix**: `AiRetry.withRetry` — 3-attempt linear backoff retrying only transient failures (`HttpClientErrorException.TooManyRequests`, `HttpServerErrorException`, `ResourceAccessException`), permanent errors re-throw immediately; wired into both AI clients (PROD-9). `SecurityConfig` now reads origins solely from `tubeshadow.cors.allowed-origins` and throws on empty instead of falling back to a wildcard (SEC-3) — dev keeps its localhost+vercel default via application.yml; prod requires `CORS_ALLOWED_ORIGINS`.
- **Commit**: `7c88054`
- **Pattern**: `allowCredentials(true)` must never pair with a wildcard origin — and a "safe default" that is itself the insecure value defeats the point. Fail closed.

---

## Password change didn't invalidate existing JWTs (audit-found)

- **Symptom** (audit-found): after a user changed their password, a token issued before the change kept working until its 24h expiry — so a leaked/stolen token survived the exact action a user takes to recover from compromise.
- **Cause** (verified in code): tokens were stateless with no revocation path; `AuthService.changePassword` only swapped the hash. Nothing tied a token's validity to "current" account state.
- **Fix**: added a `token_version` column (migration V14) and a `"tv"` claim on the token. `JwtAuthenticationFilter` now compares the token's `tv` against the user's current `token_version` (one indexed PK lookup per request) and rejects on mismatch; `changePassword` bumps the version. Tokens predating the claim default to `tv=0`, matching the column default, so deploying doesn't log everyone out. Proven by an end-to-end test (old token → 401 after change).
- **Commit**: `941369c`
- **Pattern**: stateless JWTs have no revocation by default. A monotonically-increasing per-user version claim, checked against the DB per request, is the lightweight way to add targeted revocation without a session store — at the cost of one cheap lookup per authenticated request.

---

## YouTube import held a DB connection across 2–3 HTTP calls (audit-found)

- **Symptom** (audit-found): `VideoImportService.importByUrl` was `@Transactional` and made oEmbed + yt-dlp probe + transcript HTTP calls inside it, so a Hikari connection was pinned for the entire (multi-second) network round-trip — the same anti-pattern the analysis pipeline already avoids.
- **Cause** (verified in code): the `@Transactional` on `importByUrl` spanned the whole method including the blocking client calls.
- **Fix**: removed `@Transactional` from `importByUrl`. The HTTP work now runs with no transaction, and each `videoRepository` find/save runs in its own short Spring-Data-managed transaction. Safe to drop the ambient tx here because `Video` has no lazy associations — `transcript_segments` is a JSONB column, not a lazy collection — so the detached entity from `findByYoutubeId` is fully loaded and can be mutated + merged in `recoverIfNeeded`. Added a comment warning against re-adding the annotation.
- **Commit**: `d508633`
- **Pattern**: never hold a DB transaction across a network call. Before removing an ambient `@Transactional`, confirm the entity has no lazy associations (or reload inside the write tx) so detached-entity access doesn't blow up.

---

## Logger declared MDC keys nothing populated; AI path had no metrics (audit-found)

- **Symptom** (audit-found): `logback-spring.xml`'s prod JSON encoder listed `requestId` and `userId` MDC keys, but no code ever put them in the MDC, so every prod log line emitted them empty — no per-request correlation. And there were no metrics on the AI call (the slowest, most failure-prone path), so latency/error-rate were invisible.
- **Cause** (verified in code): no filter populated the MDC; `build.gradle.kts` had `spring-boot-starter-actuator` but no Micrometer registry, and nothing timed `aiClient.analyzeClip`.
- **Fix**: `RequestLoggingFilter` (`@Order(HIGHEST_PRECEDENCE)`) stamps a short `requestId` into the MDC + an `X-Request-Id` header, clearing the MDC in `finally`; `JwtAuthenticationFilter` adds `userId` on successful auth. Added `micrometer-registry-prometheus`; `ClipAnalysisService` wraps the AI call in a `Timer` (`tubeshadow.ai.analysis`, tagged `model` + `outcome`) exposed at `/actuator/prometheus` (auth-protected in prod).
- **Commit**: `eec6176`
- **Pattern**: declaring MDC keys in the log encoder does nothing on its own — a filter has to populate them, ordered to wrap the whole chain, and clear them in `finally` so pooled threads don't leak context across requests.

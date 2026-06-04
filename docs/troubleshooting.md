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

---

## AiAnalysisClient leaked a concrete impl's type; CollectionController bypassed the service layer (audit-found)

- **Symptom** (audit-found): the provider abstraction `AiAnalysisClient.analyzeClip` returned `ClaudeClient.AnalysisResult` — so the interface (and the default GeminiClient) depended on a nested type of one concrete implementation. The grammar/expression/vocabulary/translation parsing was also copy-pasted in both clients. Separately, `CollectionController` held a `@Transactional` and orchestrated three repositories directly, the only domain not following Controller→Service→Repository.
- **Cause** (verified in code): `AnalysisResult` was declared as a nested record inside `ClaudeClient`; `GeminiClient` imported and returned it and even called `ClaudeClient.parseScenario`. No `CollectionService` existed.
- **Fix**: introduced a top-level provider-neutral `AiAnalysisResult` + a shared `AiAnalysisParser` (both clients extract their envelope's text, then delegate the schema parsing) — removing ~40 lines of duplication and the cross-impl dependency. Extracted `CollectionService` and slimmed the controller to delegation. Also moved `/me` and `/respond` off `Map<String,Object>` to typed DTOs. No behaviour change; full suite green.
- **Commit**: `843ec87`
- **Pattern**: an interface that returns `ConcreteImpl.NestedType` isn't an abstraction — the seam leaks. Put the shared return type and the shared parsing at the abstraction's level, and keep only the envelope-specific bits in each implementation.

---

## Docs only mentioned ANTHROPIC_API_KEY, but the default provider is Gemini (audit-found)

- **Symptom** (audit-found): `.env.example` and `DEPLOY.md` listed only `ANTHROPIC_API_KEY`. The app defaults to `AI_PROVIDER=gemini` (reading `GEMINI_API_KEY`), so anyone deploying by following the docs verbatim would boot with no Gemini key and AI analysis would silently no-op (`GeminiClient.isConfigured()==false` → analysis skipped/FAILED) with no obvious error.
- **Cause** (verified in code): `application.yml` sets `ai.provider: ${AI_PROVIDER:gemini}` and `gemini.api-key: ${GEMINI_API_KEY:}`, but the env docs predated the Gemini provider and were never updated. The canonical ECS task definition was already correct; this was doc-only drift on the docker-run / PaaS path.
- **Fix**: added `AI_PROVIDER` + `GEMINI_API_KEY` (and `GEMINI_MODEL`) to `.env.example` and the DEPLOY.md env table + docker-run example, marking each key provider-conditional. Also renamed `Roadmap.md` → `ROADMAP.md` (CLAUDE.md referenced the all-caps name; case-sensitive Linux would 404 the source-of-truth doc) and removed the tracked `temp.md` scratchpad.
- **Commit**: `5619660`
- **Pattern**: when the default changes (Claude → Gemini), the env docs are the easiest thing to forget — and a missing key that fails *silently* is worse than one that crashes. Document the selector + every provider's key, conditional on the selector.

---

## AI-authored learning content had nuance errors (wrong content is worse than a bug)

- **Symptom**: in the pattern drill, the cue for `Have you deployed it to staging yet?` rendered **"yet"** as **"벌써"** — which the learner reads as *already*. In a learning tool, a wrong gloss gets memorized as correct.
- **Cause**: 246 drill cues were AI-authored in parallel and only **spot-checked** on a few categories before shipping. A strict full audit then found **38 flags** — and confirmed a real gap: nuance traps (`yet` vs `already`, `get sb to do` vs `make sb do`, `twice as ~ as` = 보다 not 만큼, `be supposed to` ≠ prohibition, `had better` strength).
- **Fix**: ran a strict bilingual audit over **every** cue + English model; applied **32** hand-reviewed cue corrections. Crucially, **all 246 English models were correct** — every error was in the Korean meaning-label, so the English the learner produces was never wrong. **2 of the audit's own suggested fixes were themselves wrong** (`"이걸을"` typo; `"교통 상황"` assumed road traffic where web traffic fits) and were rejected — the verifier is also an AI, so its output was reviewed too.
- **Commit**: `f91bf03`
- **Pattern**: AI-generated *learning* content is not the same risk class as AI-generated code — a wrong example is silently internalized as truth. Spot-checking is not enough; audit every item, and review the auditor too (don't auto-apply AI "fixes"). Bias the audit toward the L1 gloss / nuance, since the target-language sentences are usually the safer half.

---

## A schema-driven agent stuffed prose into a structural field

- **Symptom**: building `lib/collocations.ts` from a parallel generate+audit workflow, the `prep` (preposition label) field of 10 items came back not as `"about"` but as an entire review paragraph:
```
"All 10 anchors are real, standard English collocations ... After review, all items are correct; no fixes needed.:10"
```
  A separate cluster (`dev-core`) silently came back relabeled `prep: "into"`.
- **Cause**: the audit agent's output schema declared `prep` as a free-form `string`. When the agent had a summary to give ("everything's fine"), it wrote that summary **into the nearest string field** instead of the `changes` array. Schema validation passed because a paragraph *is* a valid string. Grouping the UI by `prep` would have produced one garbage section header.
- **Fix**: normalize structural/label fields against an allow-list after the workflow returns, before writing the data file — `prep = p if p in VALID else "about"` (the 10 corrupted ones were all the `about` cluster). `e40ed78`. Caught only because the generator script printed `group_by(prep)` counts and one "group" was a paragraph.
- **Pattern**: a JSON-Schema `string` constrains *type*, not *meaning* — an agent will overload a loosely-typed field with prose it has nowhere else to put. For any field that's really an enum/key/label, declare it as `enum` in the schema, or re-derive/validate it against an allow-list on the way out. Never group or key UI off an un-validated agent-supplied label.

---

## Gradle build fails: "Dependency requires at least JVM runtime version 17. This build uses a Java 11 JVM."

- **Symptom**: `./gradlew compileJava` on the backend dies during configuration:
```
> Could not resolve org.springframework.boot:spring-boot-gradle-plugin:3.3.5.
   > Dependency requires at least JVM runtime version 17. This build uses a Java 11 JVM.
* Try: > Run this build using a Java 17 or newer JVM.
```
- **Cause**: this machine's default JDK (what `/usr/libexec/java_home` returns) is AdoptOpenJDK **11** — the only JDK registered there. The Gradle **launcher** itself needs 17+ to load the Spring Boot 3.x plugin; the project's `toolchain { languageVersion = 21 }` only governs *compilation*, not the launcher JVM, so it can't save you here. A native **JDK 21 does exist** via Homebrew (`/opt/homebrew/opt/openjdk@21`) but isn't on `java_home`'s radar.
- **Fix**: export `JAVA_HOME` before any gradle command — `export JAVA_HOME=/opt/homebrew/opt/openjdk@21 && ./gradlew …`. Verified: compiles + `PracticeControllerTest` (Testcontainers) goes green. `7729abe`.
- **Pattern**: Homebrew `openjdk@N` kegs are keg-only and never registered with macOS `java_home`, so `java_home -v 21` won't find them — check `/opt/homebrew/opt/openjdk@*` directly. Any backend gradle invocation in this repo needs `JAVA_HOME` pointed at 21 first.

---

## Frontend pages 404 in dev (port stolen by a sibling project; .next corrupted by a concurrent build)

- **Symptom**: every locale route 404'd in dev even though the routes exist:
```
GET /ko/practice → HTTP 404
GET /ko/collocations → HTTP 404   (but the server was clearly up — / returned 307)
```
- **Cause**: two compounding things. (1) The sibling repo `ai-product/motivation` also runs Next on **:3000**, and its dev server had won the port — so requests hit *that* app, which has no `/practice` route → 404. `lsof -nP -iTCP:3000` showed `.../ai-product/motivation/node_modules/.bin/next dev`. (2) Separately, running `npm run build` (`next build`) while `next dev` is live corrupts the shared `.next/` dir and makes the dev server 404 routes it had served fine.
- **Fix**: pinned shadow-ai's dev/start to port **3100** (`next dev -p 3100`) so it never collides — `85ce604`. When `.next` gets into a bad state: kill the dev server, `rm -rf .next`, restart `npm run dev`. Don't run `next build` against a directory with a live `next dev`.
- **Pattern**: a 404 on a route you *know* exists, with the server otherwise responding, means you're talking to the wrong server (port collision) or a stale/corrupt `.next` — check `lsof -iTCP:<port>` for *which* app owns the port before debugging routing. Give each local project a distinct fixed port.

---

## CI lint went red on a rule that `tsc` + `next build` don't run

- **Symptom**: GitHub Actions CI failed (and emailed) right after a push, despite local `tsc --noEmit` and `next build` both being clean:
```
react-hooks/use-memo  Error: Expected the first argument to be an inline function expression
✖ 11 problems (1 error, 10 warnings)   Process completed with exit code 1
```
- **Cause**: `useMemo(buildPool, [])` passed a function *reference*; Next 16 / eslint-config-next's `react-hooks/use-memo` requires an **inline** function expression. Neither `tsc` nor `next build` runs ESLint, so the local type-check + build passed while CI's `npm run lint` (bare `eslint`, which exits 1 on any error) failed. The same lint also surfaces pre-existing `react-hooks/set-state-in-effect` *warnings* in older files — warnings don't fail `eslint`, only errors do, so those don't block CI.
- **Fix**: `useMemo(() => buildPool(), [])`. `2258fbf`. Confirmed `npm run lint` → exit 0.
- **Pattern**: build/type-check passing ≠ lint passing. Next 16's react-hooks rules (`use-memo`, `set-state-in-effect`) flag patterns the compiler happily accepts. Run `npm run lint` locally before pushing — it's exactly what CI gates on.

---

## Prod Docker image was missing yt-dlp (commit message lied about the diff)

- **Symptom** (latent — caught while prepping the AWS deploy, before it shipped): the prod image `deploy.yml` builds + pushes to ECR had **no yt-dlp**, so clip import / transcript fetch / the `yt-dlp -J` dimension probe (all external `ProcessBuilder` calls) would fail on a clean ECS container.
- **Cause**: commit `8f5bad0` ("yt-dlp in prod Dockerfile") *described* installing python3 + yt-dlp in `backend/Dockerfile`, but `git show 8f5bad0 -- backend/Dockerfile` shows it only changed a comment line — the actual install landed in **`backend/Dockerfile.dev`**, not the prod `backend/Dockerfile` that deploy.yml ships. The message and the diff drifted.
- **Fix**: added `apk add python3 py3-pip ffmpeg && pip install --break-system-packages yt-dlp` to the runtime stage (as root, before the non-root `USER app`), mirroring Dockerfile.dev. Verified locally: `docker run --entrypoint yt-dlp … --version` → `2026.03.17`. `05333b1`.
- **Pattern**: a commit *message* is not proof the change shipped — `git show <hash> -- <file>` is. Same class as the README/ROADMAP drift: before trusting "we added X", show the actual artifact. For prod Dockerfiles the failure is silent until a fresh container runs the missing binary.
<!-- skipped: dfa9fe3 Add log entries for shadow-ai (arch overview + 1 backfill) [no-log] -->
<!-- skipped: 7353f87 docs(log): hardening — AI rate limit + frontend tests (1b4fd3f) [no-log] -->
<!-- skipped: 7f93bbe docs(log): AI composition (영작) mode (437afc7) [no-log] -->
<!-- skipped: d4d6a5c docs(log): drill UX batch — requeue/TTS/weak-spots (0548ee6) [no-log] -->
<!-- skipped: acdecdc docs(log): SRS (Leitner) for drills (5b971b8) [no-log] -->
<!-- skipped: 4f80294 docs(log): drill streak persisted to account (7729abe) [no-log] -->
<!-- skipped: 8b82463 docs(log): collocations drill + Practice hub (e40ed78) [no-log] -->
<!-- skipped: 7e621f5 docs(log): pattern-content accuracy audit (f91bf03) [no-log] -->
<!-- skipped: e0e382d fix(web): pattern cue — gloss "yet" as 이제, not 벌써(already) [no-log] -->
<!-- skipped: 183a67e feat(web): pattern-drill cues now in English word order (chunked 직독직해) [no-log] -->
<!-- skipped: f508806 docs(log): full pattern-drill grammar curriculum (2a017f7) [no-log] -->
<!-- skipped: 314f77c docs(log): daily pattern drill feature (7f3ba45) [no-log] -->
<!-- skipped: 272d2d3 feat(web): honest diagrams for abstract preposition senses [no-log] -->
<!-- skipped: 993706f docs(log): chunk-by-chunk shadowing feature (389bf7b) [no-log] -->
<!-- skipped: 5f8c2b1 docs(log): preposition fill-in drill feature (b66f7ac) [no-log] -->
<!-- skipped: 8a696f3 docs(log): multi-sense + no-forced-diagram update (eeed066) [no-log] -->
<!-- skipped: df899ff docs(log): visual preposition diagrams redesign (95b376b) [no-log] -->
<!-- skipped: 0d89445 docs(log): preposition study page feature (64523df) [no-log] -->
<!-- skipped: 9b901d4 docs(log): preposition spotlight feature (02c8c57) [no-log] -->
<!-- skipped: 5327ab9 docs(log): env-doc drift (GEMINI_API_KEY) + ROADMAP rename (5619660) [no-log] -->
<!-- skipped: c728f39 docs(log): leaky AI abstraction + CollectionService refactor (843ec87) [no-log] -->
<!-- skipped: d4cf1a7 docs(log): test coverage for signature pipeline + isolation (0d815cf) [no-log] -->
<!-- skipped: c378fb1 docs(log): observability — requestId MDC + Micrometer (eec6176) [no-log] -->
<!-- skipped: 7f1f982 docs(log): YouTube import tx boundary (d508633) [no-log] -->
<!-- skipped: 57c8906 docs(log): JWT revocation via token_version (941369c) [no-log] -->
<!-- skipped: 7f57d59 docs(log): AI retry + CORS hardening (7c88054) [no-log] -->
<!-- skipped: 581fb74 docs(log): frontend i18n + review-queue staleness (1c4e17b) [no-log] -->
<!-- skipped: e10488a docs(log): security + perf quick wins (e7e45a8) [no-log] -->
<!-- skipped: a594e34 docs(log): scope-drift reconciliation resolved (ef860d5) [no-log] -->
<!-- skipped: bc0d3c7 chore(infra): revert hardcoded AWS account ID to ACCOUNT_ID placeholder [no-log] -->
<!-- skipped: 250484f docs(log): AI pipeline prod-hardening + 4xx mapping (e2defd4) [no-log] -->
<!-- skipped: bcb0777 docs(log): private monetization/payments/tax structure memo [no-log] -->
<!-- skipped: ee71dc6 docs(log): record README recruiter-rewrite + ROADMAP/code drift finding [no-log] -->
<!-- skipped: 46a121b docs(troubleshoot): CI lint vs tsc/build gap (2258fbf) [no-log] -->
<!-- skipped: 6b3b432 docs(infra): fix two first-deploy traps in the AWS bootstrap runbook [no-log] -->
<!-- skipped: 395aa0a chore(web): rebrand user-facing name TubeShadow → Mimi [no-log] -->
<!-- skipped: aa4bdfe docs(infra): frontend at mimi.daeseon.ai — CORS + DNS approach [no-log] -->
<!-- skipped: b728fc7 docs(log): prod Dockerfile yt-dlp drift fix (05333b1) [no-log] -->
<!-- override-trigger: ddca23e docs(readme): rebrand to Mimi + full feature/architecture rewrite for recruiters [no-log] — false positive: keyword "architecture" matched, but this commit makes NO architecture decision and fixes NO bug. It only documents features/architecture already built AND already logged this session in their own commits + mdx entries (collocations e40ed78, SRS 5b971b8, compose 437afc7, hardening 1b4fd3f, yt-dlp 05333b1). A Symptom/Cause/Fix entry doesn't apply (nothing broke); a narrative mdx would duplicate those per-feature logs. README content updates are documentation of already-logged work. -->
<!-- skipped: 61a262c docs(troubleshoot): override-trigger note for ddca23e README rewrite [no-log] -->
<!-- skipped: 815dda2 docs(blog): Mimi single-read project showcase post [no-log] -->

---

## README rewrite imported claims the code doesn't back (cross-repo copy drift)

- **Symptom**: rewriting the README to match a sibling repo's caliber, the draft claimed recordings are served via **presigned S3/R2 URLs** with **HTTP `Range`** handling for iOS audio — neither of which Mimi actually does.
- **Cause**: those lines were lifted from the sibling `motivation` (Beside) repo's README, where they're true. In Mimi, `S3RecordingStorage.load()` returns a streamed `ResponseInputStream` and `RecordingController.stream()` serves it via `InputStreamResource` — bytes stream straight through the backend; there is no presigning and no `Range`/`206` support.
- **Fix**: grep-verified every imported security/infra claim against source *before* committing — corrected 6 presigned/Range spots and deleted the iOS-Range row; kept only code-traceable controls (`BCryptPasswordEncoder` in `SecurityConfig`, `token_version` check in `JwtAuthenticationFilter`, `findByIdAndUserId` isolation, two rate limiters, env-gated local↔S3 storage, JSON `ClipExportController`). Also did **not** claim Terraform — Mimi has a runbook + ECS task definition, not IaC.
- **Commit**: `328f68a`
- **Pattern**: copying a strong README from another project imports its *claims*, not its *code*. Every security/infra line in a recruiter-facing README must be grep-verified against *this* repo's source — the same anti-fabrication rule as the earlier README/ROADMAP drift, now for cross-repo copy-paste.
<!-- override-trigger: 1fb8886 docs(readme): English-primary README.md + separate README.ko.md (ko/en split) [no-log] — false positive on the 394-LOC size trigger: this is a presentation split (English-primary README.md + Korean README.ko.md) of already-documented README content, with NO new technical claims. The substantive README rewrite and its lesson (cross-repo claim drift, caught by verifying every claim against code) are logged at 328f68a + d35889e (troubleshooting entry + narrative mdx). Splitting one bilingual doc into two language files is reformatting, not a new decision/fix. -->
<!-- skipped: 0a7ec74 docs(troubleshoot): override-trigger note for 1fb8886 ko/en README split [no-log] -->
<!-- skipped: 5843be4 chore(log): hook skip-marker for 0a7ec74 [no-log] -->

---

## Entitlement skeleton: who is allowed to write `users.plan`?

- **Context**: Productizing toward an App Store launch. iOS digital subscriptions *must* use Apple IAP; the web can use a processor like Stripe/Toss; Google Play has its own billing. Three payment sources, one entitlement.
- **Decision**: Mimi stores only the *outcome* — `plan` ('free'|'pro') + `plan_valid_until` + an opaque `billing_customer_id`. It never touches a card. Every payment source resolves to a Mimi user and POSTs `/api/billing/webhook` to flip the plan. One column, many sources.
- **Auth model**: the webhook carries no JWT (the caller is a server, not the user), so it is in SecurityConfig's `permitAll` list — its gate is a constant-time `X-Billing-Secret` check (`MessageDigest.isEqual`) against `BILLING_WEBHOOK_SECRET`, **failing closed** (503 `BILLING_NOT_CONFIGURED`) when the secret is unset. A blank secret must never accept an entitlement write.
- **Expiry is read-time, not a cron**: `User.effectivePlan(now)` degrades an expired 'pro' to 'free' on read, and `MeResponse` serves the effective value. No scheduled job needed to "downgrade" lapsed users — the column can lag, the read can't.
- **Idempotency**: `setPlan` is a plain overwrite, so a retried webhook delivery can't corrupt state.
- **Fix files**: `V18__user_plan.sql`, `auth/domain/User.java` (applyPlan/effectivePlan), `auth/api/dto/MeResponse.java`, `billing/` slice (Controller/Service/dtos), `auth/security/SecurityConfig.java` (permitAll), `application.yml` (`tubeshadow.billing.webhook-secret`). Frontend: public `/terms` + `/privacy`, settings Plan badge.
- **Commit**: 9dd1a59
- **Pattern**: an unauthenticated-but-secret-gated server-to-server endpoint belongs in `permitAll` *because* the secret, not Spring Security, is its gate — and such a gate must fail closed when the secret is missing, never open.
<!-- skipped: e112e9a docs(log): entitlement skeleton — secret-gated billing webhook + read-time expiry (9dd1a59) [no-log] -->
<!-- skipped: 13ed264 chore(log): hook skip-marker for e112e9a [no-log] -->

---

## Going native: monorepo + Expo app, without breaking the live web app

- **Decision**: ship a real native iOS/Android app (Expo SDK 56 + expo-router), built *fresh*, not a Capacitor WebView wrap. Reasoning: wrapping a website risks App Store rejection (Guideline 4.2), and the architecture already separates cleanly — the backend (API+DB) is the shared source of truth, so a second client is the honest shape. The web app's `apiClient` was *already* platform-agnostic (token injected via `setTokenProvider`), which made this cheap.
- **Monorepo**: introduced a root npm workspace (`packages/*` + `frontend` + `mobile`) and extracted `@shadow-ai/core` — drill content (`patterns`/`collocations`/`prepositions-primer`, ~3.4k lines), SRS logic, and the 12-module typed API layer. No DOM/Next deps in core.
- **Zero-touch web migration**: instead of rewriting ~40 import sites, `frontend/lib/*` became one-line re-export shims (`export * from "@shadow-ai/core/..."`), so every existing `@/lib/...` import is unchanged. Web verified: `next build` OK, 29 vitest pass, lint 0 errors.
- **Native wiring**: `metro.config.js` adds `watchFolders=[workspaceRoot]` + `nodeModulesPaths` so Metro resolves the out-of-root core package. `react-native-url-polyfill` fills RN's incomplete `URL` (core's client uses `new URL()`). JWT lives in `expo-secure-store` (OS keychain), mirrored to an in-memory zustand store that feeds `setTokenProvider` synchronously. `configureApiBaseUrl()` (added to core) points the client at the dev machine's LAN host.
- **Verified**: `tsc` clean, `expo-doctor` 21/21, and the definitive check — `expo export --platform ios` bundles **1169 modules / 2.8MB Hermes**, proving core ships native. (Simulator run is on-device; this env has no Xcode.)
- **Live-site safety**: all of this is on branch `feat/mobile-app`, NOT main — merging will require flipping Vercel's Root Directory to the repo root (workspace), so the live deploy isn't touched until that's coordinated.
- **Commits**: abdd776 (core extraction) + cd4f8d0 (mobile app)
- **Pattern**: when a client is already API-driven with an injectable auth token, "share the brain, rebuild the shell" beats both a WebView wrapper (store risk) and a copy-paste fork (drift). Re-export shims let the working client migrate to the shared package with a near-empty diff.
<!-- override-trigger: 7b697b2 docs(log): going-native monorepo + Expo pivot (abdd776, cd4f8d0) [no-log] — false positive: 7b697b2 IS the logging commit for the pivot (it added this very troubleshooting entry + the 2026-06-02-going-native-monorepo-expo.mdx narrative). The substantive work (abdd776 core extraction, cd4f8d0 mobile scaffold) is already dual-logged here and in the mdx. The "pivot" keyword fired on the doc commit's own subject. -->
<!-- skipped: 7b697b2 docs(log): going-native monorepo + Expo pivot (abdd776, cd4f8d0) [no-log] -->
<!-- skipped: 5b2cc08 chore(log): override-trigger note for 7b697b2 (doc commit's own keyword) [no-log] -->

---

## First real feature on the native app: Pattern Drill from shared core

- **Context**: the Expo app had only auth (login + home). This is the first screen that does the product's actual job, and the test of whether the monorepo split pays off — can a native UI run the *same* content + SRS the web app does, with no duplicated logic?
- **Fix**: `mobile/src/app/practice.tsx` imports `PATTERNS`, `patternKey`, `buildSession`, `localToday`, and `practiceApi` from `@shadow-ai/core` — zero drill logic re-implemented. It flattens patterns into keyed entries, builds the day's session (due cards + a capped `NEW_PER_DAY` trickle) against the account's SRS states, and runs the reveal → Again/Got-it loop natively. Grading calls the real `practiceApi.grade` (Leitner box + streak rep); missed cards requeue in-session; each card scores SRS once (first attempt), mirroring the web `PatternDrill` exactly.
- **Verified**: `tsc` clean; Metro iOS bundle 1170 modules (was 1169 — the one new screen).
- **Commit**: 37a1a59
- **Pattern**: the payoff of "share the brain, rebuild the shell" — the native drill is ~290 lines of *UI only*; every piece of behavior (key format, session policy, grading) came from core unchanged, so web and mobile can't drift on the thing that matters (what counts as due, how a card is scored).
<!-- skipped: 6ec990c docs(log): native Pattern Drill from shared core (37a1a59) [no-log] -->

---

## Mobile reaches Practice-half parity (collocations, compose, weak-spots)

- **Context**: continuing the web→mobile port. The whole Practice half of the web app needed native screens, all on `@shadow-ai/core`.
- **Fix**: extracted a shared `DrillRunner` component from the pattern screen so the pattern and collocation drills share one reveal→Again/Got-it loop (first-attempt-only SRS grade via `practiceApi.grade`, in-session requeue on miss). Added: collocations screen with the General/Dev/All `domain` filter and `collocationKey`-built sessions; a compose screen that targets a collocation anchor and grades the user's sentence through `practiceApi.composeCheck`; a weak-spots screen joining `srsStates` to core's `cardIndex()` for seen/lapses/mastered stats + a most-missed list. Home became a Practice hub.
- **Verified**: `tsc` clean; Metro iOS bundle 1174 modules (1170 → +4 for three screens and the shared runner).
- **Commit**: a3d0ba2
- **Pattern**: porting accelerates once the first screen establishes the seam — each new Practice screen was a thin native view over core data + the one `practiceApi` call it needs; no logic was re-derived. The remaining gap (YouTube import/player/review/recording) is the genuinely harder batch because it needs native video + audio modules, not just core data.
<!-- skipped: 2eb5825 docs(log): mobile Practice-half parity (a3d0ba2) [no-log] -->

---

## Mobile YouTube half, part 1: Library + Import (the pure-API slice)

- **Context**: the shadowing half is the harder port (needs native video/audio), so I split it — the parts that are just core API calls first, the native-media parts after.
- **Fix**: `library.tsx` lists clips (`clipsApi.list`, pull-to-refresh) → tap opens detail. `import.tsx` runs the real pipeline: paste URL → `videosApi.importByUrl` (server fetches subtitles via yt-dlp) → tap a transcript sentence → `clipsApi.create` makes a one-sentence clip. `player/[clipId].tsx` fetches the clip; until the in-app player exists, "Watch on YouTube" opens the video at the clip's start via `Linking` — a usable interim instead of a dead button.
- **Verified**: `tsc` clean; Metro iOS bundle 1177 modules.
- **Commit**: bee5489
- **Pattern**: split a hard feature by *dependency*, not by screen — the clip CRUD + import flow is identical to the web's and needed zero new native modules, so it shipped immediately; only the actual segment playback + mic recording carry the `expo-video`/`expo-audio` cost, and they're isolated to the next batch. An honest placeholder (open-in-YouTube) keeps the flow whole meanwhile.
<!-- skipped: 6dbbab5 docs(log): mobile YouTube half part 1 — Library + Import (bee5489) [no-log] -->

---

## Mobile YouTube half, part 2: in-app segment player (the first native-media piece)

- **Context**: clip detail had an open-in-YouTube placeholder. The real shadowing experience needs the video *in* the app, looping a sub-segment.
- **Fix**: added `react-native-youtube-iframe` (+ its `react-native-webview` peer) and rebuilt `player/[clipId].tsx` around it. The YouTube IFrame plays the clip's `[startMs, endMs]` segment via `initialPlayerParams.start/end`; for shadowing, an `onChangeState('ended')` handler seeks back to the clip start and resumes (a toggleable loop), with Play/Pause and "Replay segment" controls. Player height adapts to the clip's `videoOrientation` (portrait vs 16:9).
- **Why IFrame, not a native video element**: YouTube terms require playback through their player; you can't pull the raw stream into `expo-video`. The IFrame-in-WebView is the sanctioned path and the same approach the web app uses.
- **Verified**: `tsc` clean; Metro iOS bundle 1191 modules (1177 → +14 for webview + iframe).
- **Commit**: 58ed646
- **Pattern**: the segment-loop is the whole shadowing primitive — `start/end` params get you a one-shot segment, but the repeat-until-you-can-say-it loop only exists if you re-seek on `ended`. That tiny handler is the feature, not the embed.

---

## Mobile YouTube half, part 3: record yourself (expo-audio) — and the FormData that isn't a Blob

- **Context**: the last active-shadowing piece — record your own take and play it back against the original.
- **Fix**: `RecordPanel` (expo-audio): `useAudioRecorder(RecordingPresets.HIGH_QUALITY)` to capture, `useAudioRecorderState` for the live duration, `useAudioPlayer` to play the take back. Embedded under the segment controls in the clip player.
- **The gotcha — RN FormData ≠ web FormData**: core's `recordingsApi.upload` builds a web `File`/`Blob`, which doesn't exist for a local file URI on React Native. The mobile upload instead appends a `{ uri, name, type }` descriptor (`form.append('file', { uri, name, type: 'audio/mp4' })`) and sends it through core's `apiRequest` so the JWT + base URL stay in one place. `audio/mp4` (the iOS/Android m4a container) is already in the backend's `ALLOWED_CONTENT_TYPES`, so no server change was needed.
- **Verified**: `tsc` clean; Metro iOS bundle 1202 modules (1191 → +11 for expo-audio). Mic permission string added to the expo-audio plugin in app.json.
- **Commit**: 1b5382f
- **Pattern**: the shared API client carried over to native for free *except* at the multipart boundary — a file part is the one place web (`Blob`/`File`) and RN (`{ uri }` descriptor) genuinely diverge, so that one call gets a platform-specific body while everything else reuses core verbatim.
<!-- skipped: b201e47 docs(log): mobile shadowing recording with expo-audio (1b5382f) [no-log] -->

---

## Mobile reaches active-learning parity: SM-2 Review ported

- **Context**: the last core learning screen still web-only was the spaced-repetition clip review.
- **Fix**: `review.tsx` drives a session from `reviewApi.queue()`; for each card it fetches the clip's Korean prompt via `analysisApi.get().primaryTranslation`, reveals the English transcript, and grades Again/Hard/Good/Easy through `reviewApi.respond` with the shared `REVIEW_QUALITY` map (SM-2). "Open clip & shadow" deep-links into the segment player.
- **Verified**: `tsc` clean; Metro iOS bundle 1203 modules.
- **Scope reached**: mobile now covers Mimi's entire *active learning* surface — pattern + collocation drills, compose check, weak-spots, import/library, in-app segment player with loop, voice recording, and SM-2 review — all on `@shadow-ai/core`. Remaining is non-learning: account deletion (App Store launch requirement), and secondary screens (prepositions primer, settings, legal).
- **Commit**: 56873e2
- **Pattern**: "parity" is worth defining narrowly — the *active learning* loop (drill, shadow, review) is the product; settings/legal/primer are table stakes that can follow. Calling the learning surface done is a truer status than a raw screen count.
<!-- skipped: 2b341a2 docs(log): mobile SM-2 review parity (56873e2) [no-log] -->

---

## Account deletion: audit the FK cascade before trusting it

- **Context**: App Store (5.1.1v) requires in-app account deletion; a prior note *assumed* "only 5 tables cascade, the rest orphan." Before building, I audited the actual schema.
- **Finding (verified, not assumed)**: every user-owned table already has `ON DELETE CASCADE` — `clips` (→ `clip_analyses` via clip_id, `recordings`, `review_items`), `decks`, `practice_progress`, `practice_card`. `videos` (keyed by `youtube_id`) and `collections` (editorial) have no `user_id` and are shared — correctly untouched. So a single `users` delete wipes the DB cleanly; the earlier worry was wrong.
- **The one real gap**: recording **audio binaries** live in storage (local/S3), not the DB, so the cascade can't reach them. `AuthService.deleteAccount` purges the user's files first (rows still present to read their paths), then deletes the user.
- **Two bugs found while testing**:
  1. `deleteFileQuietly` only caught `IOException`, but `LocalRecordingStorage.delete` throws `SecurityException` on a path outside its root → a legacy/odd path 500'd the whole deletion. Broadened to catch all exceptions (best-effort by contract).
  2. The integration test was `@Transactional`, so the service's delete never flushed/committed and the post-delete `JdbcTemplate` counts saw stale rows. Removed `@Transactional` — the cascade has to actually commit to be observable.
- **Regression**: `AccountDeletionTest` plants a row in every user-owned table, deletes via `DELETE /api/auth/me`, and asserts all gone + the shared video survives. If a future migration adds a user-owned table without CASCADE, this fails.
- **Commit**: 7028fdc
- **Pattern**: never trust a remembered claim about a destructive cascade — `grep REFERENCES` across every migration and prove it with a test that seeds *all* children. An "assumed orphan" turned out fully wired; assuming the opposite would've meant pointless manual-delete code.
<!-- override-trigger: 6527880 docs(log): account deletion + FK cascade audit (7028fdc) [no-log] — false positive: 6527880 IS the logging commit for the account-deletion work (it added this very troubleshooting entry + the 2026-06-03-account-deletion-cascade-audit.mdx narrative). The substantive change is 7028fdc, already dual-logged here and in the mdx. The "audit" keyword fired on the doc commit's own subject. -->
<!-- skipped: 6527880 docs(log): account deletion + FK cascade audit (7028fdc) [no-log] -->
<!-- skipped: f73ed31 chore(log): override-trigger note for 6527880 (doc commit's own keyword) [no-log] -->

---

## Mobile reaches full web parity: prepositions screen (the last one)

- **Context**: the preposition primer + mined view were the last web-only screen.
- **Fix**: `prepositions.tsx` renders `PREPOSITION_PRIMER` (each preposition's senses + real examples) from core, plus the mined view from `prepositionsApi.mined()` (prepositions the AI flagged across the user's clips). The web shows animated SVG diagrams per sense; mobile hints the same archetype with a small text chip instead of pulling in `react-native-svg` — the content (sense + example) is the value, the picture is a nicety.
- **Verified**: `tsc` clean; Metro iOS bundle 1205 modules.
- **Status**: every web screen now has a native counterpart on `@shadow-ai/core` — auth, home hub, pattern/collocation drills, compose, weak-spots, library/import, segment player, recording, SM-2 review, prepositions, settings (with account deletion). Only the SVG preposition diagrams and live IAP remain as deliberate follow-ups.
- **Commit**: fd31d1c
- **Pattern**: when porting a visual feature, separate the *content* from the *decoration* — the senses/examples ported verbatim from core; the SVG diagram was decoration, so a text chip kept parity on meaning without a new native dependency. Ship the content, defer the polish.
<!-- skipped: 5d4566a docs(log): mobile prepositions — full web parity (fd31d1c) [no-log] -->

---

## `next dev` (Turbopack) worker storm exhausted host memory → fork() failed machine-wide

- **Symptom** (literal, while bringing up local web + backend to test): the `next dev` server reached "Ready" but a request to `/[locale]` never finished compiling; then ordinary commands began dying:
  ```
  (eval):11: fork failed: resource temporarily unavailable
  grep:9: fork failed: resource temporarily unavailable
  웹 /en = HTTP 000  (120.003895s)        # curl: 120s, no response
  ```
  `ps`, `pkill`, and `curl` all failed to fork. A fresh `npm run dev` ballooned the `node` process count from **8 → 466 in ~18s**, and after a partial kill it was still **864**.
- **Verified** (facts, not guesses):
  - NOT a process-count limit: `ulimit -u` = 5333 but the uid had only ~600 processes. So fork's `EAGAIN` was **memory**, not max-procs.
  - `vm_stat` showed `Pages free: 8305` (≈130 MB on a 16 KB page) — effectively out of free RAM. ~85+ Turbopack `node` workers at ~70–105 MB each ≈ several GB, on top of a JVM and 61 Chrome renderers.
  - Stopping the dev task dropped `node` 864 → 8 and total procs 992 → ~815, and `fork` worked again immediately. The backend (JVM) was unaffected the whole time.
- **Cause** — **Hypothesis (not root-caused)**: Turbopack dev workers OOM under memory pressure and get **respawned with no backoff** → a crash-loop that spawns processes faster than they die. The exact trigger (memory pressure alone, vs. a monorepo `transpilePackages`/`reactCompiler` interaction) was not isolated. `Verified by`: the worker-count explosion + the free-memory reading; the precise respawn mechanism is inferred, not proven.
- **Fix / triage**: stop the offender first to save the host (`TaskStop` on the dev task; `pkill -9 -f "node_modules/next"` for orphaned workers), *then* diagnose — the correct incident order when diagnostics themselves can't fork. To actually run the web locally, use **production mode** (`next build` → `next start`): one stable server, no dev worker pool. This is local/dev-only — production (Vercel prebuilt bundle, or `next start`) has no Turbopack dev workers.
- **Commit**: (incident/learning entry — no code change; root-cause + a worker cap are a tracked follow-up)
- **Pattern**: this is a textbook **crash-loop → resource exhaustion → host-wide failure**, the same class as a container that OOMKills into `CrashLoopBackOff` and, without a memory limit, starves its neighbors. Defenses: **bounded pools** (the backend already caps its async threads + Hikari — see the "AI analysis pipeline could hang threads" entry above), **per-container memory limits** (ECS task `memory` — pending AWS deploy), **restart backoff**, and **health-check eviction**. When diagnostics can't fork, triage = kill the offender before you investigate.
<!-- skipped: 81c55dd docs(log): dev-server fork-bomb incident — crash-loop / resource-exhaustion ops lesson [no-log] -->

---

## Mobile app: 26-finding multi-agent audit, 24 fixed (the build-passes ≠ works gap)

- **Symptom**: the Expo mobile app's 11 screens all passed `tsc` + Metro bundle, but had never run on a device. "Compiles" said nothing about runtime correctness.
- **Method**: ran a 6-dimension adversarial audit (api-contract, state/hooks, RN/Expo, auth/session, web-parity, launch-readiness). Each finding was re-checked by a skeptic agent against the actual code; 21 raw → 20 confirmed, plus a completeness critic that caught the biggest one.
- **What "passes the build" hid** — real bugs only a reader/runner finds:
  - **No signup screen at all** (critic) — a new user literally could not create an account; only login existed. Hard launch blocker.
  - **The shadowing loop never looped**: the player relied on the YouTube IFrame `'ended'` state while setting an `end` playerVar, but YouTube fires `PAUSED` (not `ENDED`) at a *mid-video* boundary — so a short clip played once and stopped. Fixed by polling `getCurrentTime()` like the web does.
  - **Release build pointed at `http://localhost:8080`**: `resolveBaseUrl()` fell back to the Metro host, which is undefined in a standalone build → the phone's own localhost, over plaintext http (ATS-blocked). Gated behind `__DEV__`, throw otherwise, inject the prod URL via a new `eas.json`.
  - **iOS app icon was the Expo placeholder** (an `ios.icon` override shadowing the real top-level icon) — App Review reject.
  - **AI analysis (translation/직독직해/vocab) was absent from the mobile player** — the product's core sentence-mining value, present on web, simply never wired up.
  - Plus: no global 401 handler (expired JWT → stuck), cache not cleared on sign-out (next user sees prior data), deep-link hydration race bouncing logged-in users to login, missing query invalidation after grade/import, iOS record-mode left on (playback to earpiece), Review screen stuck on "done", portrait videos squished.
- **Fix**: `dd0adfe` — 24 of 26 addressed (full i18n + clip range-selection deferred). Verified `tsc` clean, `expo-doctor` 21/21, Metro bundle 1209 modules.
- **Pattern**: a green build is the *floor*, not the bar — none of these would fail compilation, and several (loop dead, prod points at localhost, no signup) would have shipped a broken app. For an unrunnable target (no simulator here), an adversarially-verified read-the-code audit across explicit failure dimensions is the substitute for clicking through it. The audit's own value came from the *verify* pass and the *completeness critic*: the single worst blocker (no signup) was the one the six dimensions missed and the critic caught.

---

## Mobile Korean localization via a per-screen parallel pass (and the &amp; gotcha)

- **Context**: the app was English-only despite a Korean user base. No portable i18n existed (web uses next-intl).
- **Fix**: a lightweight `src/lib/i18n.ts` — `t(key, vars)` with `{placeholder}` interpolation, device locale resolved once via `expo-localization`. Localized all 18 screens (en/ko, 181 keys) by fanning out one agent per file: each agent edited its screen to call `t('ns.key')` and returned its `{en, ko}` slice; the slices were merged into one `i18n-messages.ts`. Cross-checked that all 176 distinct `t()` keys used in source exist in the dictionary.
- **Gotcha — HTML entities in a non-JSX string**: agents that converted JSX text like `import &amp; shadow` carried the `&amp;` into the dictionary *value*. In JSX, `&amp;` is decoded by the compiler; but a string returned from `t()` and rendered as a `<Text>` child is **not** — React renders entity strings verbatim, so the UI would show a literal "&amp;". Fixed by decoding `&amp;/&apos;/&quot;/&#39;/&lt;/&gt;` when generating the dictionary.
- **Verified**: `tsc` clean, Metro iOS bundle 1214 modules, 0 missing keys, 0 residual entities, Korean spot-checked for naturalness.
- **Commit**: 6fc46a8
- **Pattern**: parallelize a mechanical, file-local transform (string extraction + translation) one-agent-per-file, then merge the structured slices centrally — agents touch disjoint files (no edit races) and only the merge is single-threaded. And remember entity-escaping is a *JSX* convenience: the moment a string leaves JSX for a data layer, it must hold literal characters, not entities.
<!-- skipped: 635b503 docs(log): mobile Korean i18n via per-screen parallel pass (6fc46a8) [no-log] -->

---

## Backend AWS deployment as Terraform (the whole thing, validated)

- **Context**: the backend deploy existed only as a manual console runbook (`aws-bootstrap.md`). Wanted it as reviewable, reproducible IaC — and as a thing to *study* line by line.
- **Fix**: `infrastructure/terraform/` — the full stack, split by concern (network/security/rds/s3/secrets/ecr/iam/alb/ecs + variables/outputs/versions), each file heavily commented. Covers VPC, RDS Postgres (private), S3, Secrets Manager, ECR, IAM (execution + task + keyless GitHub OIDC deploy role), ALB + ACM, ECS Fargate.
- **Decisions worth keeping**:
  - **No NAT gateway** — Fargate in *public* subnets with a public IP pulls ECR/Secrets directly, saving ~$32/mo; the DB stays private and the SG chain (alb→fargate→rds, by SG reference not CIDR) keeps tasks unexposed.
  - **TF creates the ECS service once; CI owns the image** — `lifecycle { ignore_changes = [task_definition, desired_count] }` so `terraform apply` and the GitHub Actions deploy don't fight over the running revision.
  - **Secrets generated, not typed** — `random_password` for the DB master + JWT, written to Secrets Manager; the Gemini key comes from a gitignored `terraform.tfvars`. State holds these, so state is gitignored too.
  - **Cloudflare DNS** — TF can't write Cloudflare records, so ACM cert-validation + the api CNAME are emitted as `outputs` to add by hand (no `aws_acm_certificate_validation`, which would otherwise block `apply`).
  - **First-apply reality** — the service points at `ECR:latest` before any image exists; tasks fail to start until CI pushes the first image. Documented, not a bug.
- **Verified**: `terraform fmt`, `terraform init`, and `terraform validate` all pass. `plan`/`apply` need the user's AWS creds (their step). No `*.tfstate`/`terraform.tfvars` committed; `.terraform.lock.hcl` is committed on purpose.
- **Commit**: 47ba028
- **Pattern**: codify infra you intend to *learn* with one file per concern + comments that explain the "why" (no NAT, SG-by-reference, who-owns-deploys), and validate locally before spending a cent — `fmt`+`init`+`validate` catch the HCL/schema/reference errors for free; only `plan`/`apply` touch the account.
<!-- skipped: a9440c0 docs(log): backend Terraform IaC — full deploy as code (47ba028) [no-log] -->

---

## Vercel build breaks after monorepo: `@parcel/watcher-linux-x64-glibc` not found

- **Symptom**: Vercel's frontend build (branch preview) failed:
  ```
  Error: No prebuild or local build of @parcel/watcher found. Tried @parcel/watcher-linux-x64-glibc.
  npm error workspace frontend@0.1.0 ... command sh -c next build ... exited 1
  ```
- **Cause**: making `mobile` an npm workspace meant Vercel, installing the workspace, pulled in the Expo/React-Native/Metro dependency tree — including `@parcel/watcher`, a native module with no Linux prebuild for Vercel's environment. The web app never needed it; it leaked in purely because the mobile workspace was installed alongside.
- **Fix**: `mobile` is no longer an npm workspace. Root `workspaces` is now `["packages/*", "frontend"]`; `mobile` depends on the shared core via `"@shadow-ai/core": "file:../packages/core"` and is installed on its own (`cd mobile && npm install`). So the root install (what Vercel runs) resolves only web deps — no `@parcel/watcher`.
- **Verified**: root `npm install` leaves no `@parcel/watcher` at the root; `next build` passes; `expo export` still bundles 1214 modules (core resolves through the `file:` link); tsc clean. (prod on `main` was never affected — main doesn't have the monorepo yet.)
- **Commit**: cc48293
- **Pattern**: a monorepo only wants in one workspace the things that *that* platform can build. Don't co-install a React Native app with a web app under one workspace root — RN's native deps (no Linux/serverless prebuilds) will break the web deploy. Keep the cross-platform app out of the workspace and share code via a `file:`/published package instead.
<!-- skipped: 9fb260e docs(log): monorepo Vercel @parcel/watcher break — mobile out of workspaces (cc48293) [no-log] -->
<!-- skipped: 15bd9cc docs(infra): Korean deep-dive guide for the Terraform stack (terms + flow + file-by-file) [no-log] -->

<!-- no-commit: read-only task — produced Korean walkthrough of providers.tf via StructuredOutput, no file changes -->
<!-- override-trigger: 4734df3 docs(infra): line-by-line Korean walkthrough of all 13 Terraform files [no-log] — false positive on the >200-LOC size trigger: this is a single pure-documentation file (WALKTHROUGH.ko.md, a Korean teaching companion to GUIDE.ko.md) explaining the already-committed Terraform. No code, config, or behavior changes — large only because it's a thorough line-by-line explainer. Nothing to log as a fix/decision. -->
<!-- skipped: 4734df3 docs(infra): line-by-line Korean walkthrough of all 13 Terraform files [no-log] -->
<!-- skipped: 9bfa845 chore(log): override-trigger note for 4734df3 (pure teaching doc) [no-log] -->

---

## Daily "sentence gym": 15 grammar transforms of one mined sentence (new feature)

- **Context**: a daily drill that takes ONE base English sentence and bends it through 15 grammatical operations (10 core + 5 extra) to train *production* reflexes — orthogonal to the existing pattern-*breadth* drills. Locked decisions: seed = mined/typed sentence + AI-generated transforms (cached); grading = self-grade reveal default + optional per-transform AI check.
- **Trap that would have silently broken it**: the shared `AiAnalysisClient.complete(system, user)` hardcoded the output-token cap to 600 in BOTH providers — `ClaudeClient` (`max_tokens`, line 124) and `GeminiClient` (`maxOutputTokens`, line 133). 15 transforms + Korean glosses overflow 600 tokens → JSON truncates mid-object → `BAD_GATEWAY` parse failure. And the default provider is **Gemini** (`tubeshadow.ai.provider` defaults to `gemini`), so fixing only Claude would pass local tests yet break prod.
- **Fix**: added a 3-arg `complete(system, user, maxTokens)` to the interface (the 2-arg overload is now a `default` delegating with 600); both clients parameterize the cap; `TransformService` generates at 2000. New backend: `TransformPrompt` (strict-JSON, fixed 15-op order), `TransformService` (per-user cache keyed by SHA-256 of the normalized seed — one LLM call per unique seed; canonical-order parse tolerant of fence/reorder/missing/unknown ops; reuses `CompositionService.stripFence`), `SentenceTransformSet` entity + `V19__create_sentence_transform_set.sql`, and `POST /api/practice/compose/{transforms,transform-check}` added to the `WebMvcConfig` rate-limit path list. Client: `transformKey = tf:<seedId>:<op>#0` (seedId is the cache UUID, keeping the key inside `card_key`'s 120-char limit), and a `/gym` screen reusing the existing `DrillRunner`.
- **Verified**: `./gradlew test --tests "com.tubeshadow.practice.*" --tests "com.tubeshadow.analysis.*"` green, including JPA-context tests (Flyway applied V19 and Hibernate `validate` accepted the entity → migration↔mapping agree); `TransformServiceTest` covers strict/fenced/truncated JSON, cache-hit-skips-provider, 503, and BAD_GATEWAY; mobile `tsc --noEmit` clean after Expo regenerated typed routes for `/gym`. NOT run: live end-to-end against a real provider key + simulator.
- **Commit**: 28c7cad
- **Pattern**: a shared LLM `complete()` with a fixed token cap is a latent truncation bug for any later caller that needs more output than the first caller did — parameterize the cap, and fix it on **every** provider impl, because the one that bites you in prod is the default-wired provider, not the one the request happens to name.

---

## `expo lint` rewrites package.json + scaffolds eslint.config.js on first run

- **Symptom**: after a first-ever `npx expo lint`, `git status` showed `M mobile/package.json`, `M mobile/package-lock.json`, and a new `?? mobile/eslint.config.js` — none related to the feature being built.
- **Cause**: `expo lint` bootstraps ESLint when none is configured: it writes a flat `eslint.config.js` and adds `eslint` + `eslint-config-expo` as devDependencies, mutating `package.json` and the lockfile.
- **Fix**: reverted the tooling churn (`git checkout -- mobile/package.json mobile/package-lock.json && rm mobile/eslint.config.js`) so the feature commit stayed scoped — dependency additions need explicit approval (CLAUDE.md §5) and weren't part of the task. (The lint run itself still reported only pre-existing issues in `settings.tsx` / `use-color-scheme.web.ts`; the new gym/DrillRunner code was clean.)
- **Commit**: ee3de5d (sentence-gym follow-ups; the lint scaffolding was intentionally NOT committed)
- **Pattern**: `expo lint` is not read-only on first run — it sets up ESLint and edits `package.json`. Run it expecting a dirtied tree, and revert the scaffolding unless enabling lint is the actual task.

---

## `expo start --web` crash-loops: native-only deps + dynamic-route `.web` not swapped

- **Symptom**: `npx expo start --web` repeatedly fails the bundle:
  ```
  Metro error: Unable to resolve module react-native-web-webview from
  node_modules/react-native-youtube-iframe/lib/commonjs/WebView.web.js
   | import "react-native-youtube-iframe"   ← src/app/player/[clipId].tsx
  ```
- **Cause**: the app is native-first. Three modules have no web build: `react-native-youtube-iframe` (player), `expo-audio` (record-panel, imported only by the player), and `expo-secure-store` (secure-token, loaded at startup in `_layout`). A `secure-token.web.ts` (localStorage) shim fixes the startup blocker, but a `player/[clipId].web.tsx` stub did **not** override the native route — Expo Router does not apply `.web.tsx` platform variants to **dynamic** route segments (`[clipId]`), so the native player (and its youtube/audio imports) stayed in the eagerly-bundled web graph.
- **Fix**: none shipped — the shims were reverted. Web is a separate porting task (web variants for the 3 native deps + a non-dynamic-route workaround), out of scope for the sentence gym. The gym was verified LIVE via the backend API instead (signup → generate → 62/67 transforms across all 15 categories).
- **Commit**: d7d1d42 (gym v2; web shims NOT committed)
- **Pattern**: an Expo app importing native-only modules at startup or in eagerly-bundled routes can't `expo start --web` without per-module web shims — and `.web.tsx` route variants don't apply to dynamic `[param]` segments, so a native screen behind a dynamic route still breaks the web bundle. Demo native-first apps on the simulator, not web.

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

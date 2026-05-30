package com.tubeshadow.analysis.infrastructure;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;

import java.util.function.Supplier;

/**
 * Bounded retry with linear backoff for the AI providers, shared by GeminiClient and
 * ClaudeClient. Retries ONLY transient failures — HTTP 429 (rate limit), any 5xx, and
 * I/O errors / read timeouts (ResourceAccessException). Permanent failures (400/401/403,
 * malformed key, etc.) are not retried — they re-throw immediately so the caller fails fast.
 *
 * <p>No external dependency (Spring Retry / Resilience4j) on purpose: this runs on the
 * bounded @Async analysis pool, so a tiny hand-rolled loop keeps the behaviour obvious and
 * the thread-occupancy bounded (max attempts × read-timeout).
 */
final class AiRetry {

    private static final Logger log = LoggerFactory.getLogger(AiRetry.class);
    private static final int MAX_ATTEMPTS = 3;
    private static final long BASE_BACKOFF_MS = 500;

    private AiRetry() {}

    static <T> T withRetry(String provider, Supplier<T> call) {
        RuntimeException last = null;
        for (int attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            try {
                return call.get();
            } catch (HttpClientErrorException.TooManyRequests
                     | HttpServerErrorException
                     | ResourceAccessException ex) {
                last = ex;
                if (attempt == MAX_ATTEMPTS) break;
                long backoff = BASE_BACKOFF_MS * attempt;
                log.warn("{} transient failure (attempt {}/{}): {} — retrying in {}ms",
                        provider, attempt, MAX_ATTEMPTS, ex.getMessage(), backoff);
                try {
                    Thread.sleep(backoff);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }
        throw last;
    }
}

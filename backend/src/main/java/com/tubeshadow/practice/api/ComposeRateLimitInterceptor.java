package com.tubeshadow.practice.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.common.web.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Clock;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Per-USER fixed-window limiter for the AI composition check. {@code /api/practice/compose/check}
 * costs a real LLM call, so an authenticated user looping it could run up the provider bill/quota
 * — and {@link com.tubeshadow.auth.security.AuthRateLimitFilter} only guards signup/login. Keyed by
 * the authenticated user id (falls back to remote IP). Registered on the compose path in
 * {@link com.tubeshadow.common.config.WebMvcConfig}; window resets every minute.
 */
@Component
@ConditionalOnProperty(prefix = "tubeshadow.rate-limit", name = "enabled", havingValue = "true", matchIfMissing = true)
public class ComposeRateLimitInterceptor implements HandlerInterceptor {

    private static final long WINDOW_MS = 60_000;

    private final int maxPerMinute;
    private final ObjectMapper objectMapper;
    private final Clock clock;
    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Autowired
    public ComposeRateLimitInterceptor(ObjectMapper objectMapper,
                                       @Value("${tubeshadow.rate-limit.ai-per-minute:15}") int maxPerMinute) {
        this(objectMapper, maxPerMinute, Clock.systemUTC());
    }

    ComposeRateLimitInterceptor(ObjectMapper objectMapper, int maxPerMinute, Clock clock) {
        this.objectMapper = objectMapper;
        this.maxPerMinute = maxPerMinute;
        this.clock = clock;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String key = subjectKey(request);
        long now = Instant.now(clock).toEpochMilli();
        Bucket bucket = buckets.computeIfAbsent(key, k -> new Bucket(now));
        synchronized (bucket) {
            if (now - bucket.windowStartMs >= WINDOW_MS) {
                bucket.windowStartMs = now;
                bucket.count.set(0);
            }
            if (bucket.count.incrementAndGet() > maxPerMinute) {
                response.setStatus(429);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                objectMapper.writeValue(response.getOutputStream(),
                        ApiResponse.fail(new ApiResponse.ApiError("RATE_LIMITED",
                                "AI 채점 요청이 너무 잦습니다. 잠시 후 다시 시도해주세요.")));
                return false;
            }
        }
        return true;
    }

    String subjectKey(HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof AuthenticatedUser user) {
            return "u:" + user.id();
        }
        return "ip:" + request.getRemoteAddr();
    }

    private static class Bucket {
        long windowStartMs;
        final AtomicInteger count = new AtomicInteger(0);

        Bucket(long windowStartMs) {
            this.windowStartMs = windowStartMs;
        }
    }
}

package com.tubeshadow.auth.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.common.web.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.time.Clock;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Fixed-window per-IP rate limiter for the public auth endpoints. Implemented as a
 * Spring MVC {@link HandlerInterceptor} (not a servlet Filter) so Spring Boot's filter
 * auto-registration cannot also register us as a servlet filter — which would require
 * a no-arg constructor we deliberately don't expose.
 *
 * <p>Goal: blunt-force credential stuffing and signup spam. Window resets every minute.
 *
 * <p>Proxy handling: {@code X-Forwarded-For} is only honored when the connecting
 * remoteAddr starts with one of {@code tubeshadow.rate-limit.trusted-proxies}.
 * Empty list (default) → always use the raw remoteAddr so spoofed headers cannot
 * defeat the limiter. Production should set this to the load-balancer CIDR prefix.
 */
@Component
@ConditionalOnProperty(prefix = "tubeshadow.rate-limit", name = "enabled", havingValue = "true", matchIfMissing = true)
public class AuthRateLimitFilter implements HandlerInterceptor {

    private static final long WINDOW_MS = 60_000;

    private final int maxAttemptsPerMinute;
    private final ObjectMapper objectMapper;
    private final Clock clock;
    private final List<String> trustedProxyPrefixes;
    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Autowired
    public AuthRateLimitFilter(ObjectMapper objectMapper,
                               @Value("${tubeshadow.rate-limit.auth-attempts-per-minute:20}") int maxAttempts,
                               @Value("${tubeshadow.rate-limit.trusted-proxies:}") String trustedProxies) {
        this(objectMapper, maxAttempts, Clock.systemUTC(), trustedProxies);
    }

    AuthRateLimitFilter(ObjectMapper objectMapper, int maxAttempts, Clock clock) {
        this(objectMapper, maxAttempts, clock, "");
    }

    AuthRateLimitFilter(ObjectMapper objectMapper, int maxAttempts, Clock clock, String trustedProxies) {
        this.objectMapper = objectMapper;
        this.maxAttemptsPerMinute = maxAttempts;
        this.clock = clock;
        this.trustedProxyPrefixes = trustedProxies == null || trustedProxies.isBlank()
                ? List.of()
                : List.of(trustedProxies.split("\\s*,\\s*"));
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getServletPath();
        if (!path.equals("/api/auth/signup") && !path.equals("/api/auth/login")) {
            return true;
        }
        String ip = clientIp(request);
        long now = Instant.now(clock).toEpochMilli();
        Bucket bucket = buckets.computeIfAbsent(ip, k -> new Bucket(now));
        synchronized (bucket) {
            if (now - bucket.windowStartMs >= WINDOW_MS) {
                bucket.windowStartMs = now;
                bucket.count.set(0);
            }
            int after = bucket.count.incrementAndGet();
            if (after > maxAttemptsPerMinute) {
                writeRateLimited(response);
                return false;
            }
        }
        return true;
    }

    private void writeRateLimited(HttpServletResponse response) throws IOException {
        response.setStatus(429);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(),
                ApiResponse.fail(new ApiResponse.ApiError("RATE_LIMITED",
                        "요청이 너무 잦습니다. 잠시 후 다시 시도해주세요.")));
    }

    String clientIp(HttpServletRequest request) {
        String remote = request.getRemoteAddr();
        if (remote != null && isTrustedProxy(remote)) {
            String forwarded = request.getHeader("X-Forwarded-For");
            if (forwarded != null && !forwarded.isBlank()) {
                return forwarded.split(",")[0].trim();
            }
        }
        return remote;
    }

    private boolean isTrustedProxy(String remoteAddr) {
        for (String prefix : trustedProxyPrefixes) {
            if (!prefix.isEmpty() && remoteAddr.startsWith(prefix)) return true;
        }
        return false;
    }

    private static class Bucket {
        long windowStartMs;
        final AtomicInteger count = new AtomicInteger(0);

        Bucket(long windowStartMs) {
            this.windowStartMs = windowStartMs;
        }
    }
}

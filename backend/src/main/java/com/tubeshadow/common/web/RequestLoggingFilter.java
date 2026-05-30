package com.tubeshadow.common.web;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

/**
 * Stamps a per-request correlation id into the SLF4J MDC (and an {@code X-Request-Id}
 * response header) so every log line for one request can be tied together. The prod JSON
 * encoder (logback-spring.xml) already emits the {@code requestId} and {@code userId} MDC
 * keys — this filter populates {@code requestId}; {@link com.tubeshadow.auth.security.JwtAuthenticationFilter}
 * adds {@code userId} once a request is authenticated.
 *
 * <p>Ordered first so its try/finally wraps the entire chain (incl. the Spring Security
 * filters that set {@code userId}); the {@code finally} clears the MDC so a pooled worker
 * thread never leaks one request's context into the next.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestLoggingFilter extends OncePerRequestFilter {

    public static final String REQUEST_ID = "requestId";
    public static final String USER_ID = "userId";
    private static final String REQUEST_ID_HEADER = "X-Request-Id";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String requestId = UUID.randomUUID().toString().substring(0, 8);
        MDC.put(REQUEST_ID, requestId);
        response.setHeader(REQUEST_ID_HEADER, requestId);
        try {
            filterChain.doFilter(request, response);
        } finally {
            MDC.clear();
        }
    }
}

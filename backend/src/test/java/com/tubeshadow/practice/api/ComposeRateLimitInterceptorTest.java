package com.tubeshadow.practice.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.tubeshadow.auth.security.AuthenticatedUser;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class ComposeRateLimitInterceptorTest {

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    private final Clock clock = Clock.fixed(Instant.parse("2026-05-31T00:00:00Z"), ZoneOffset.UTC);

    @AfterEach
    void clearContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void allowsUpToTheLimitThenReturns429() throws Exception {
        authAs(UUID.randomUUID());
        var rate = new ComposeRateLimitInterceptor(objectMapper, 3, clock);

        for (int i = 0; i < 3; i++) {
            MockHttpServletResponse res = new MockHttpServletResponse();
            assertThat(rate.preHandle(request(), res, new Object())).isTrue();
            assertThat(res.getStatus()).isEqualTo(200);
        }

        MockHttpServletResponse blocked = new MockHttpServletResponse();
        assertThat(rate.preHandle(request(), blocked, new Object())).isFalse();
        assertThat(blocked.getStatus()).isEqualTo(429);
        assertThat(blocked.getContentAsString()).contains("RATE_LIMITED");
    }

    @Test
    void differentUsersHaveSeparateBuckets() throws Exception {
        var rate = new ComposeRateLimitInterceptor(objectMapper, 1, clock);

        authAs(UUID.randomUUID()); // user A uses the single slot
        rate.preHandle(request(), new MockHttpServletResponse(), new Object());

        authAs(UUID.randomUUID()); // user B has their own bucket
        MockHttpServletResponse res = new MockHttpServletResponse();
        assertThat(rate.preHandle(request(), res, new Object())).isTrue();
        assertThat(res.getStatus()).isEqualTo(200);
    }

    private void authAs(UUID id) {
        var principal = new AuthenticatedUser(id, id + "@example.com", 0);
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(principal, null, List.of()));
    }

    private MockHttpServletRequest request() {
        MockHttpServletRequest r = new MockHttpServletRequest("POST", "/api/practice/compose/check");
        r.setServletPath("/api/practice/compose/check");
        r.setRemoteAddr("9.9.9.9");
        return r;
    }
}

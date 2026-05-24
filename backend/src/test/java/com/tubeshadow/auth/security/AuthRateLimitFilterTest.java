package com.tubeshadow.auth.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;

class AuthRateLimitFilterTest {

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @Test
    void firstNRequestsPass() throws Exception {
        var clock = Clock.fixed(Instant.parse("2026-05-24T00:00:00Z"), ZoneOffset.UTC);
        var rate = new AuthRateLimitFilter(objectMapper, 3, clock);
        for (int i = 0; i < 3; i++) {
            MockHttpServletResponse res = new MockHttpServletResponse();
            boolean cont = rate.preHandle(request("/api/auth/login"), res, new Object());
            assertThat(cont).isTrue();
            assertThat(res.getStatus()).isEqualTo(200);
        }
    }

    @Test
    void fourthRequestReturns429() throws Exception {
        var clock = Clock.fixed(Instant.parse("2026-05-24T00:00:00Z"), ZoneOffset.UTC);
        var rate = new AuthRateLimitFilter(objectMapper, 3, clock);

        for (int i = 0; i < 3; i++) {
            rate.preHandle(request("/api/auth/signup"), new MockHttpServletResponse(), new Object());
        }
        MockHttpServletResponse res = new MockHttpServletResponse();
        boolean cont = rate.preHandle(request("/api/auth/signup"), res, new Object());

        assertThat(cont).isFalse();
        assertThat(res.getStatus()).isEqualTo(429);
        assertThat(res.getContentAsString()).contains("RATE_LIMITED");
    }

    @Test
    void requestsOnOtherPathsAreNotLimited() throws Exception {
        var rate = new AuthRateLimitFilter(objectMapper, 1, Clock.systemUTC());
        for (int i = 0; i < 10; i++) {
            MockHttpServletResponse res = new MockHttpServletResponse();
            assertThat(rate.preHandle(request("/api/clips"), res, new Object())).isTrue();
            assertThat(res.getStatus()).isEqualTo(200);
        }
    }

    @Test
    void differentIpsHaveSeparateBuckets() throws Exception {
        var rate = new AuthRateLimitFilter(objectMapper, 1, Clock.systemUTC());

        MockHttpServletRequest r1 = request("/api/auth/login");
        r1.setRemoteAddr("1.1.1.1");
        rate.preHandle(r1, new MockHttpServletResponse(), new Object());

        MockHttpServletRequest r2 = request("/api/auth/login");
        r2.setRemoteAddr("2.2.2.2");
        MockHttpServletResponse res2 = new MockHttpServletResponse();
        assertThat(rate.preHandle(r2, res2, new Object())).isTrue();
        assertThat(res2.getStatus()).isEqualTo(200);
    }

    private MockHttpServletRequest request(String path) {
        MockHttpServletRequest r = new MockHttpServletRequest("POST", path);
        r.setServletPath(path);
        r.setRemoteAddr("9.9.9.9");
        return r;
    }
}

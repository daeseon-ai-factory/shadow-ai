package com.tubeshadow.auth.security;

import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtTokenProviderTest {

    private static final String SECRET = "test-secret-that-is-long-enough-for-hs256-algorithm-please";

    private final JwtTokenProvider provider = new JwtTokenProvider(new JwtProperties(SECRET, 3600));

    @Test
    void issueAndParseRoundtrip() {
        UUID userId = UUID.randomUUID();
        String token = provider.issueAccessToken(userId, "user@example.com");

        AuthenticatedUser parsed = provider.parse(token);
        assertThat(parsed.id()).isEqualTo(userId);
        assertThat(parsed.email()).isEqualTo("user@example.com");
    }

    @Test
    void rejectsTokenSignedWithDifferentKey() {
        JwtTokenProvider other = new JwtTokenProvider(
                new JwtProperties("different-secret-that-is-also-long-enough-for-hs256", 3600));
        String token = other.issueAccessToken(UUID.randomUUID(), "x@example.com");

        assertThatThrownBy(() -> provider.parse(token))
                .isInstanceOf(JwtTokenProvider.InvalidTokenException.class);
    }

    @Test
    void rejectsExpiredToken() throws InterruptedException {
        JwtTokenProvider shortLived = new JwtTokenProvider(new JwtProperties(SECRET, 1));
        String token = shortLived.issueAccessToken(UUID.randomUUID(), "x@example.com");
        Thread.sleep(1100);

        assertThatThrownBy(() -> shortLived.parse(token))
                .isInstanceOf(JwtTokenProvider.InvalidTokenException.class)
                .hasMessageContaining("expired");
    }

    @Test
    void rejectsTooShortSecret() {
        assertThatThrownBy(() -> new JwtTokenProvider(new JwtProperties("short", 60)))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("32 bytes");
    }
}

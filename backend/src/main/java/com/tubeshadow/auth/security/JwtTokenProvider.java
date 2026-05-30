package com.tubeshadow.auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtTokenProvider {

    /** Prefix of the dev default in application.yml — long enough to pass the 32-byte check. */
    private static final String DEV_PLACEHOLDER_PREFIX = "dev-only-secret";

    private final SecretKey signingKey;
    private final Duration accessTokenTtl;

    public JwtTokenProvider(JwtProperties properties, Environment environment) {
        byte[] keyBytes = properties.secret().getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            throw new IllegalStateException("tubeshadow.jwt.secret must be at least 32 bytes for HS256");
        }
        // Fail fast rather than silently signing prod tokens with the well-known dev secret.
        // A forgotten JWT_SECRET env falls back to the dev default (which IS >=32 bytes, so the
        // length check alone wouldn't catch it) — that key is public in the repo, so anyone
        // could forge tokens. Only enforced under the 'prod' profile so local dev stays frictionless.
        if (environment.matchesProfiles("prod") && properties.secret().startsWith(DEV_PLACEHOLDER_PREFIX)) {
            throw new IllegalStateException(
                    "Refusing to start under the 'prod' profile with the default dev JWT secret. "
                            + "Set JWT_SECRET to a strong random value (>=32 bytes).");
        }
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenTtl = Duration.ofSeconds(properties.accessTokenTtlSeconds());
    }

    public String issueAccessToken(UUID userId, String email, int tokenVersion) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(userId.toString())
                .claim("email", email)
                .claim("tv", tokenVersion)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(accessTokenTtl)))
                .signWith(signingKey, Jwts.SIG.HS256)
                .compact();
    }

    public AuthenticatedUser parse(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            Integer tv = claims.get("tv", Integer.class);
            return new AuthenticatedUser(
                    UUID.fromString(claims.getSubject()),
                    claims.get("email", String.class),
                    tv != null ? tv : 0  // tokens predating the tv claim default to version 0
            );
        } catch (ExpiredJwtException ex) {
            throw new InvalidTokenException("Token has expired", ex);
        } catch (JwtException | IllegalArgumentException ex) {
            throw new InvalidTokenException("Invalid token", ex);
        }
    }

    public long accessTokenTtlSeconds() {
        return accessTokenTtl.toSeconds();
    }

    public static class InvalidTokenException extends RuntimeException {
        public InvalidTokenException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}

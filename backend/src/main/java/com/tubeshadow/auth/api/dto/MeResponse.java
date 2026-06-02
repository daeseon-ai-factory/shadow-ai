package com.tubeshadow.auth.api.dto;

import com.tubeshadow.auth.domain.User;

import java.time.Instant;
import java.util.UUID;

/** Typed body for GET /api/auth/me (replaces an untyped Map → documented in OpenAPI, type-safe). */
public record MeResponse(UUID id, String email, String displayName, Instant createdAt,
                         String plan, Instant planValidUntil) {
    public static MeResponse from(User user) {
        // effectivePlan, not the raw column: an expired 'pro' must read as 'free' for the client.
        return new MeResponse(user.getId(), user.getEmail(), user.getDisplayName(), user.getCreatedAt(),
                user.effectivePlan(Instant.now()), user.getPlanValidUntil());
    }
}

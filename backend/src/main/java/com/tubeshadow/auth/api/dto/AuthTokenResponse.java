package com.tubeshadow.auth.api.dto;

import java.util.UUID;

public record AuthTokenResponse(
        String accessToken,
        long expiresInSeconds,
        UserSummary user
) {
    public record UserSummary(UUID id, String email, String displayName) {}
}

package com.tubeshadow.auth.security;

import java.util.UUID;

/**
 * The authenticated principal in the security context. {@code tokenVersion} is the JWT's
 * "tv" claim; the auth filter compares it against the user's current version in the DB to
 * enforce revocation (a password change bumps the DB version, invalidating older tokens).
 */
public record AuthenticatedUser(UUID id, String email, int tokenVersion) {
}

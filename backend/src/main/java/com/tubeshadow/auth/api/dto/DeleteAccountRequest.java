package com.tubeshadow.auth.api.dto;

import jakarta.validation.constraints.NotBlank;

/** Body for DELETE /api/auth/me — the current password, required as a deletion confirmation guard. */
public record DeleteAccountRequest(@NotBlank String password) {
}

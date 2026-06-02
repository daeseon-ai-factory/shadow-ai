package com.tubeshadow.billing.api.dto;

import java.time.Instant;
import java.util.UUID;

/** Echoes back the entitlement Mimi now holds, so the billing platform can confirm the write. */
public record BillingStatusResponse(UUID userId, String plan, Instant planValidUntil) {
}

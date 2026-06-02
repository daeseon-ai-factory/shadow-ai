package com.tubeshadow.billing.api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.Instant;
import java.util.UUID;

/**
 * Entitlement push from the external billing platform. Deliberately payment-source agnostic:
 * whether the money came from web Stripe/Toss, Apple IAP, or Google Play Billing, the platform
 * resolves it to a Mimi user + plan and posts this. Mimi stores the decision; it never sees a card.
 *
 * @param userId         the Mimi user whose entitlement changed
 * @param plan           'free' or 'pro'
 * @param planValidUntil when 'pro' lapses (null for 'free' or non-expiring grants)
 * @param customerId     opaque id from the source platform (null leaves the stored value untouched)
 */
public record BillingWebhookRequest(
        @NotNull UUID userId,
        @NotNull @Pattern(regexp = "free|pro", message = "plan must be 'free' or 'pro'") String plan,
        Instant planValidUntil,
        String customerId
) {
}

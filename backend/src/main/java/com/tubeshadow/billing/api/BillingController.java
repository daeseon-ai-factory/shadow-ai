package com.tubeshadow.billing.api;

import com.tubeshadow.auth.domain.User;
import com.tubeshadow.billing.api.dto.BillingStatusResponse;
import com.tubeshadow.billing.api.dto.BillingWebhookRequest;
import com.tubeshadow.billing.application.BillingService;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.common.exception.UnauthorizedException;
import com.tubeshadow.common.web.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

/**
 * Unauthenticated endpoint the external billing platform calls to flip a user's entitlement.
 * It carries no JWT (the caller is a server, not the user), so it is gated by a shared secret
 * sent in {@code X-Billing-Secret} and compared in constant time. This path is in SecurityConfig's
 * permitAll list precisely because the secret check, not Spring Security, is its gate.
 */
@RestController
@RequestMapping("/api/billing")
@Tag(name = "Billing", description = "Entitlement webhook (secret-gated, no JWT)")
public class BillingController {

    private final BillingService billingService;
    private final String webhookSecret;

    public BillingController(BillingService billingService,
                            @Value("${tubeshadow.billing.webhook-secret:}") String webhookSecret) {
        this.billingService = billingService;
        this.webhookSecret = webhookSecret;
    }

    @PostMapping("/webhook")
    @Operation(summary = "Set a user's plan", description =
            "Payment-source agnostic. Requires the X-Billing-Secret header to match the configured secret.")
    public ApiResponse<BillingStatusResponse> webhook(
            @RequestHeader(value = "X-Billing-Secret", required = false) String providedSecret,
            @Valid @RequestBody BillingWebhookRequest request) {

        verifySecret(providedSecret);

        User user = billingService.setPlan(
                request.userId(), request.plan(), request.planValidUntil(), request.customerId());

        return ApiResponse.ok(new BillingStatusResponse(
                user.getId(), user.getPlan(), user.getPlanValidUntil()));
    }

    private void verifySecret(String provided) {
        if (webhookSecret == null || webhookSecret.isBlank()) {
            // Fail closed: an unconfigured secret must never accept an entitlement write.
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "BILLING_NOT_CONFIGURED",
                    "Billing webhook secret is not configured");
        }
        byte[] expected = webhookSecret.getBytes(StandardCharsets.UTF_8);
        byte[] actual = provided == null ? new byte[0] : provided.getBytes(StandardCharsets.UTF_8);
        if (!MessageDigest.isEqual(expected, actual)) {
            throw new UnauthorizedException("BILLING_BAD_SECRET", "Invalid billing webhook secret");
        }
    }
}

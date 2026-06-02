package com.tubeshadow.auth.domain;

import com.tubeshadow.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users", uniqueConstraints = {
        @jakarta.persistence.UniqueConstraint(name = "uk_users_email", columnNames = "email")
})
public class User extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "display_name", nullable = false, length = 80)
    private String displayName;

    /** Bumped to invalidate all previously-issued JWTs (e.g. on password change). */
    @Column(name = "token_version", nullable = false)
    private int tokenVersion;

    /**
     * Entitlement, set ONLY by the billing webhook — Mimi never processes payments itself.
     * 'free' or 'pro'. A 'pro' value past {@link #planValidUntil} reads as free via
     * {@link #effectivePlan(Instant)}.
     */
    @Column(name = "plan", nullable = false, length = 20)
    private String plan = "free";

    /** When the current paid plan lapses (null = no expiry tracked / free). */
    @Column(name = "plan_valid_until")
    private Instant planValidUntil;

    /** Opaque customer id from whichever payment platform owns this user (Stripe/Apple/Google). */
    @Column(name = "billing_customer_id", length = 255)
    private String billingCustomerId;

    protected User() {
    }

    private User(UUID id, String email, String passwordHash, String displayName) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = displayName;
        this.tokenVersion = 0;
    }

    public static User createNew(String email, String passwordHash, String displayName) {
        return new User(UUID.randomUUID(), normalizeEmail(email), passwordHash, displayName);
    }

    public static String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    public void changePasswordHash(String newPasswordHash) {
        this.passwordHash = newPasswordHash;
    }

    /** Invalidate every token issued so far (call after a password change / forced logout). */
    public void revokeExistingTokens() {
        this.tokenVersion++;
    }

    public void changeDisplayName(String displayName) {
        this.displayName = displayName;
    }

    /**
     * Apply an entitlement decision from the billing layer. {@code customerId} is only overwritten
     * when non-null, so a renewal webhook that omits it won't wipe the stored id.
     */
    public void applyPlan(String plan, Instant validUntil, String customerId) {
        this.plan = plan;
        this.planValidUntil = validUntil;
        if (customerId != null) {
            this.billingCustomerId = customerId;
        }
    }

    /** Plan as it should be enforced right now — an expired paid plan degrades to 'free'. */
    public String effectivePlan(Instant now) {
        if (!"free".equals(plan) && (planValidUntil == null || planValidUntil.isAfter(now))) {
            return plan;
        }
        return "free";
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getDisplayName() {
        return displayName;
    }

    public int getTokenVersion() {
        return tokenVersion;
    }

    public String getPlan() {
        return plan;
    }

    public Instant getPlanValidUntil() {
        return planValidUntil;
    }

    public String getBillingCustomerId() {
        return billingCustomerId;
    }
}

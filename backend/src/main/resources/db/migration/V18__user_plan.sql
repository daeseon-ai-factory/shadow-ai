-- Entitlement skeleton: a user's plan, flipped by an external billing platform via the webhook.
-- Mimi never processes payments itself — it only stores "is this user pro, until when". Any payment
-- source (web Stripe/Toss, Apple IAP, Google Play Billing) calls /api/billing/webhook to set this.
ALTER TABLE users ADD COLUMN plan                 VARCHAR(20)  NOT NULL DEFAULT 'free';
ALTER TABLE users ADD COLUMN plan_valid_until      TIMESTAMP;
ALTER TABLE users ADD COLUMN billing_customer_id    VARCHAR(255);
ALTER TABLE users ADD CONSTRAINT chk_users_plan CHECK (plan IN ('free', 'pro'));

-- JWT revocation support.
-- The access token carries a "tv" (token version) claim; the auth filter compares it
-- against this column on every request. Bumping token_version (e.g. on password change)
-- invalidates every token issued before the bump. Existing rows default to 0, matching
-- the default "tv" of tokens that predate this column, so no one is logged out on deploy.
ALTER TABLE users ADD COLUMN token_version INTEGER NOT NULL DEFAULT 0;

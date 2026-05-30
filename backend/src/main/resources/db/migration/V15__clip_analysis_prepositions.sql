-- Feature A: preposition spotlight.
-- Per-clip notes explaining the prepositions/particles in the transcript — which
-- relationship/image each one encodes — so a learner builds intuition ("why 'off of' here?")
-- instead of guessing. JSONB list of {preposition, phrase, sense}. Nullable: existing READY
-- rows simply have none until re-analyzed (the entity getter null-coalesces to an empty list).
ALTER TABLE clip_analyses ADD COLUMN preposition_notes JSONB;

import { apiClient } from "./client";

// The daily "sentence gym": take ONE base sentence and bend it through 15 grammatical operations.
// First 10 = core (drilled every day); last 5 = extra (surfaced 2-3x/week). Op ids here MUST match
// the server's TransformPrompt.OPS exactly — they key both the generated content and the SRS cards.
export const TRANSFORM_OPS = [
  "question",
  "negative",
  "tense",
  "modal",
  "perfectModal",
  "causeResult",
  "ifCondition",
  "asPattern",
  "relativeClause",
  "prepositionChunk",
  "compareContrast",
  "passive",
  "thereIs",
  "itPattern",
  "gerundInfinitive",
] as const;
export type TransformOp = (typeof TRANSFORM_OPS)[number];

export const CORE_OPS: readonly TransformOp[] = TRANSFORM_OPS.slice(0, 10);
export const EXTRA_OPS: readonly TransformOp[] = TRANSFORM_OPS.slice(10);

/** One produced sentence for one grammatical operation. */
export interface SentenceTransform {
  op: TransformOp;
  label: string; // short English label, e.g. "Relative clause"
  english: string; // the transformed English model answer
  koreanGloss: string; // short Korean gloss (the cue the learner produces from)
}

/** The full server-cached transform set for one seed sentence. */
export interface SentenceTransformSet {
  seedId: string; // cache row UUID — mints the SRS card keys (tf:<seedId>:<op>#0)
  baseSentence: string;
  baseGloss: string | null;
  transforms: SentenceTransform[]; // canonical order; fewer than 15 if the model dropped any
}

/** AI verdict on a learner's attempt at one transform (optional, opt-in). */
export interface TransformCheckResult {
  ok: boolean;
  feedback: string;
  better: string;
}

/** A base-sentence candidate mined from the learner's own clip analyses (English + optional Korean). */
export interface SeedCandidate {
  english: string;
  koreanGloss: string | null;
}

export const transformsApi = {
  // One LLM call per UNIQUE seed; the server caches by (userId, normalized seed) and replays for free.
  generate: (baseSentence: string, baseGloss?: string) =>
    apiClient.post<SentenceTransformSet>("/api/practice/compose/transforms", { baseSentence, baseGloss }),
  // Optional self-check of the learner's attempt for one op against the reference model.
  check: (op: TransformOp, baseSentence: string, model: string, attempt: string) =>
    apiClient.post<TransformCheckResult>("/api/practice/compose/transform-check", {
      op,
      baseSentence,
      model,
      attempt,
    }),
  // Seed candidates aggregated server-side from the learner's clips (replaces client transcript parsing).
  seeds: () => apiClient.get<SeedCandidate[]>("/api/practice/seeds"),
};

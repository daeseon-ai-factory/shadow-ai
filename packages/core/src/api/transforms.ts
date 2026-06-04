import { apiClient } from "./client";

// The daily "sentence gym": take ONE base sentence and bend it through a FIXED taxonomy of
// grammatical slots — each category split into its essential sub-variations (~52 core + ~15 extra,
// ~67 total). The slot `op` ids, categories, and labels are defined server-side (TransformPrompt);
// the client only groups by category to decide what to drill on a given day.
export const CORE_CATEGORIES = [
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
] as const;
export const EXTRA_CATEGORIES = [
  "compareContrast",
  "passive",
  "thereIs",
  "itPattern",
  "gerundInfinitive",
] as const;
export type TransformCategory = (typeof CORE_CATEGORIES)[number] | (typeof EXTRA_CATEGORIES)[number];

/** One produced sentence for one slot. */
export interface SentenceTransform {
  op: string; // unique slot id, e.g. "question_why"
  category: string; // grouping category, e.g. "question"
  label: string; // human label, e.g. "Question · why"
  english: string;
  koreanGloss: string;
}

/** The full server-cached transform set for one seed sentence (~52 core slots + ~15 extra). */
export interface SentenceTransformSet {
  seedId: string;
  baseSentence: string;
  baseGloss: string | null;
  transforms: SentenceTransform[];
}

/** AI verdict on a learner's attempt at one slot: pass/fail + a 0-100 score + feedback + better. */
export interface TransformCheckResult {
  ok: boolean;
  score: number;
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
  // Optional self-check of the learner's attempt at one slot against the reference model.
  // `target` is the slot label (e.g. "Question · why") — what transformation they were asked to do.
  check: (target: string, baseSentence: string, model: string, attempt: string) =>
    apiClient.post<TransformCheckResult>("/api/practice/compose/transform-check", {
      op: target,
      baseSentence,
      model,
      attempt,
    }),
  // Seed candidates aggregated server-side from the learner's clips (replaces client transcript parsing).
  seeds: () => apiClient.get<SeedCandidate[]>("/api/practice/seeds"),
};

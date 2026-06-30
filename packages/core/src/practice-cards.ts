// Single source of truth for drill CARD KEYS — the stable string that ties a static drill item
// (pattern/collocation) to its SRS state on the server. The drill pages build sessions with
// these keys; the weak-spots dashboard maps states back to content with cardIndex(). They MUST
// agree, so the key format lives here and nowhere else.

import { PATTERNS } from "./patterns";
import { COLLOCATIONS } from "./collocations";
import { VERB_PACK } from "./phrasal-verbs";
import { ENGLISH_PATTERNS } from "./english-patterns";
import { PHRASAL_500 } from "./phrasal-500";
import { IT_PATTERNS } from "./it-patterns";
import { IT_TERMS } from "./it-terms";
import { AI_CODING } from "./ai-coding";

export const patternKey = (id: string, i: number) => `pat:${id}#${i}`;
export const collocationKey = (id: string, i: number) => `col:${id}#${i}`;
// Base-verb phrasal/pattern card. id is the verb slug (e.g. "cut"), so the key stays short:
// "pv:" + slug + "#" + index ≈ well under the 120-char card_key budget.
export const verbKey = (id: string, i: number) => `pv:${id}#${i}`;
// The four flat user-authored lists key purely by array index (stable as long as the source
// docs aren't reordered): daily patterns, phrasal-500, IT chunks, code-explanation terms.
export const englishPatternKey = (i: number) => `ep:${i}`;
export const phrasal500Key = (i: number) => `p5:${i}`;
export const itPatternKey = (i: number) => `itp:${i}`;
export const itTermKey = (i: number) => `itt:${i}`;
export const aiCodingKey = (i: number) => `aic:${i}`;
// Sentence-gym transform card. seedId is the server cache-row UUID (NOT the raw sentence), which
// keeps the key inside the 120-char card_key budget: "tf:" + 36 + op + "#0" ≈ 59 chars.
export const transformKey = (seedId: string, op: string, i: number) => `tf:${seedId}:${op}#${i}`;

export interface CardInfo {
  kind: "pattern" | "collocation" | "verb" | "englishPattern" | "phrasal500" | "itPattern" | "itTerm" | "aiCoding";
  title: string; // the frame / anchor / base verb / category
  cue: string;
  model: string;
}

let cached: Map<string, CardInfo> | null = null;

/** Map every card key → its human-readable content, for the weak-spots view. */
export function cardIndex(): Map<string, CardInfo> {
  if (cached) return cached;
  const m = new Map<string, CardInfo>();
  for (const p of PATTERNS) {
    p.items.forEach((it, i) =>
      m.set(patternKey(p.id, i), { kind: "pattern", title: p.frame, cue: it.cue, model: it.model }),
    );
  }
  for (const c of COLLOCATIONS) {
    c.items.forEach((it, i) =>
      m.set(collocationKey(c.id, i), { kind: "collocation", title: c.anchor, cue: it.cue, model: it.model }),
    );
  }
  for (const g of VERB_PACK) {
    g.items.forEach((it, i) =>
      m.set(verbKey(g.id, i), { kind: "verb", title: g.verb, cue: it.cue, model: it.model }),
    );
  }
  ENGLISH_PATTERNS.forEach((p, i) =>
    m.set(englishPatternKey(i), { kind: "englishPattern", title: p.category, cue: p.frame, model: p.example }),
  );
  PHRASAL_500.forEach((p, i) =>
    m.set(phrasal500Key(i), { kind: "phrasal500", title: p.phrasal, cue: p.ko, model: p.example }),
  );
  IT_PATTERNS.forEach((p, i) =>
    m.set(itPatternKey(i), { kind: "itPattern", title: p.category, cue: p.ko, model: p.en }),
  );
  IT_TERMS.forEach((p, i) =>
    m.set(itTermKey(i), { kind: "itTerm", title: p.section, cue: p.ko, model: p.en }),
  );
  AI_CODING.forEach((p, i) =>
    m.set(aiCodingKey(i), { kind: "aiCoding", title: p.category, cue: p.ko, model: p.en }),
  );
  cached = m;
  return m;
}

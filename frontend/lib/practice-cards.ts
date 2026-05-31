// Single source of truth for drill CARD KEYS — the stable string that ties a static drill item
// (pattern/collocation) to its SRS state on the server. The drill pages build sessions with
// these keys; the weak-spots dashboard maps states back to content with cardIndex(). They MUST
// agree, so the key format lives here and nowhere else.

import { PATTERNS } from "@/lib/patterns";
import { COLLOCATIONS } from "@/lib/collocations";

export const patternKey = (id: string, i: number) => `pat:${id}#${i}`;
export const collocationKey = (id: string, i: number) => `col:${id}#${i}`;

export interface CardInfo {
  kind: "pattern" | "collocation";
  title: string; // the frame / anchor
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
  cached = m;
  return m;
}

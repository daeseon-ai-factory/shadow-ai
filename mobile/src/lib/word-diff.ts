/**
 * Word-level diff used by both the dictation drill (decode) and the shadowing STT feedback.
 * An LCS alignment over normalized tokens marks which reference words the learner's attempt
 * actually produced — so the gaps (the schwa they dropped, the linked word they swallowed) show
 * in red. Punctuation/case are ignored so "kind of" matches "kind-of." and capital differences.
 */
export function splitWords(s: string): string[] {
  return s.trim().split(/\s+/).filter(Boolean);
}

export function normWord(w: string): string {
  return w.toLowerCase().replace(/[^a-z0-9']/g, '');
}

/** LCS over normalized tokens → the set of reference indices the attempt actually produced. */
export function matchedRefIdx(refN: string[], usrN: string[]): Set<number> {
  const n = refN.length;
  const m = usrN.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = refN[i] === usrN[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const matched = new Set<number>();
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (refN[i] === usrN[j]) {
      matched.add(i);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }
  return matched;
}

export interface WordDiff {
  /** Each reference word + whether the attempt produced it. */
  ref: { word: string; matched: boolean }[];
  matchedCount: number;
  total: number;
}

/** Compare an attempt against the reference; null if there is nothing meaningful to compare. */
export function diffWords(reference: string, attempt: string): WordDiff | null {
  const ref = splitWords(reference);
  if (ref.length < 2) return null;
  const usr = splitWords(attempt);
  const matched = matchedRefIdx(ref.map(normWord), usr.map(normWord));
  return {
    ref: ref.map((word, i) => ({ word, matched: matched.has(i) })),
    matchedCount: matched.size,
    total: ref.length,
  };
}

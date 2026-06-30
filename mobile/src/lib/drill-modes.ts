// Shared study-mode layer so every pack (verbs, collocations, the four lists) can be drilled the
// same several ways — not one fixed drill. All modes ride the same card content + the same
// practice_card SRS; only the prompt direction / interaction changes.
//   recall  = Korean cue → produce English (the default reveal+grade)
//   reverse = English → recall the Korean meaning (cue/model swapped)
//   compose = write your OWN sentence using the chunk → AI grades it (existing /compose/check)
import { practiceApi } from '@shadow-ai/core';
import type { DrillItem, DrillCheck } from '@/components/drill-runner';
import { t } from '@/lib/i18n';

export type DeckMode = 'recall' | 'reverse' | 'compose';

export function modeLabel(m: DeckMode): string {
  return m === 'recall' ? t('mode.recall') : m === 'reverse' ? t('mode.reverse') : t('mode.compose');
}

/** Apply a mode to a deck's items. recall = as-is; reverse = swap what's shown (key unchanged). */
export function applyMode(items: DrillItem[], mode: DeckMode): DrillItem[] {
  if (mode === 'reverse') return items.map((d) => ({ ...d, cue: d.model, model: d.cue, note: undefined }));
  return items;
}

/** AI free-write check, reused across every pack. target = the chunk to use, gloss = the Korean cue. */
export const composeOnCheck: DrillCheck = async (item, attempt) => {
  const fb = await practiceApi.composeCheck(item.target ?? item.model, item.cue, attempt);
  return {
    ok: fb.ok,
    score: fb.ok ? 100 : fb.usesTarget ? 60 : 30,
    feedback: fb.feedback,
    better: fb.better,
  };
};

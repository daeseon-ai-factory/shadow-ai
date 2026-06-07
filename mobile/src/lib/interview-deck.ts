// Maps the bundled SPEAKING decks (@shadow-ai/core) into drill items, shared by the Interview
// menu and the interview-run drill screen. (The code-explain deck is handled separately by CodeDrill.)
import {
  REFLEX_CLUSTERS,
  REFLEX_CARDS,
  CORE_REFLEX,
  INTERVIEW_CONCEPTS,
  INTERVIEW_FRAMES,
  INTERVIEW_SCENARIOS,
  type ReflexCard,
  type InterviewCard,
} from '@shadow-ai/core';

import { type IvItem } from '@/components/interview-drill';
import { t } from '@/lib/i18n';

const REFLEX_LABEL = new Map<string, string>();
REFLEX_CLUSTERS.forEach((cl) => cl.cards.forEach((c) => REFLEX_LABEL.set(c.key, cl.labelEn)));

export function reflexIv(c: ReflexCard): IvItem {
  const label = REFLEX_LABEL.get(c.key) ?? 'Reflex';
  return { key: c.key, tag: label, promptKo: c.cue, promptEn: label, answer: c.model, meaningKo: c.meaning };
}

export function cardIv(c: InterviewCard): IvItem {
  const tag =
    c.group === 'scenario'
      ? c.sub === 'pair'
        ? t('iv.pair')
        : t('iv.interviewer')
      : c.group === 'concept'
        ? t('iv.concept')
        : t('iv.frame');
  return { key: c.key, tag, promptKo: c.cue, promptEn: c.title, answer: c.model, note: c.note };
}

export type ScopeKind = 'due' | 'core' | 'cluster' | 'concept' | 'scenario' | 'frame';

export function scopeItems(kind: ScopeKind, clusterId?: string): IvItem[] {
  switch (kind) {
    case 'due':
      return [
        ...REFLEX_CARDS.map(reflexIv),
        ...INTERVIEW_CONCEPTS.map(cardIv),
        ...INTERVIEW_FRAMES.map(cardIv),
        ...INTERVIEW_SCENARIOS.map(cardIv),
      ];
    case 'core':
      return CORE_REFLEX.map(reflexIv);
    case 'cluster': {
      const cl = REFLEX_CLUSTERS.find((c) => c.id === clusterId);
      return cl ? cl.cards.map(reflexIv) : [];
    }
    case 'concept':
      return INTERVIEW_CONCEPTS.map(cardIv);
    case 'scenario':
      return INTERVIEW_SCENARIOS.map(cardIv);
    case 'frame':
      return INTERVIEW_FRAMES.map(cardIv);
  }
}

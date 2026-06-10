// Maps the bundled SPEAKING decks (@shadow-ai/core) into drill items, shared by the Interview
// menu and the interview-run drill screen. (The code-explain deck is handled separately by CodeDrill.)
import {
  REFLEX_CLUSTERS,
  REFLEX_CARDS,
  CORE_REFLEX,
  INTERVIEW_CONCEPTS,
  INTERVIEW_FRAMES,
  INTERVIEW_SCENARIOS,
  PHRASAL_CARDS,
  EXPR_CARDS,
  CODE_NARRATION_CARDS,
  UI_CARDS,
  BACKEND_CARDS,
  SD_CARDS,
  PAIR_CARDS,
  CLARIFY_CARDS,
  CONNECTORS,
  type ReflexCard,
  type InterviewCard,
  type PhraseCard,
  type Connector,
  type SrsCard,
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

// A phrasal verb / expression / code-narration phrase → produce drill. A RANDOM situation is the
// cue each time the deck is built, so the same target phrase is practiced from many angles over
// reps ("다양한 상황서 같은 표현"). The card identity (key) is stable, so SRS tracking is unaffected.
export function phraseIv(c: PhraseCard): IvItem {
  const sit = c.situations[Math.floor(Math.random() * c.situations.length)] ?? c.ko;
  return {
    key: c.key,
    tag: c.en,
    promptKo: sit,
    promptEn: c.questionEn || c.en,
    answer: c.example,
    meaningKo: c.ko,
    note: c.exampleKo || c.ko,
    detail: c.detail || undefined,
    terms: c.termsKo || undefined,
  };
}

// Backend vocab is sentence-level, so the cue is a situation (not the phrase, which would give away
// the answer) and the model is the full English sentence.
export function backendIv(c: PhraseCard): IvItem {
  const sit = c.situations[Math.floor(Math.random() * c.situations.length)] ?? c.ko;
  return {
    key: c.key,
    tag: 'Backend',
    promptKo: sit,
    promptEn: c.questionEn || 'Backend',
    answer: c.en,
    meaningKo: c.ko,
    note: c.exampleKo || c.ko,
    detail: c.detail || undefined,
    terms: c.termsKo || undefined,
  };
}

// Chaining drill: the connector is BLANKED OUT of its 2-sentence example — speak the full chain
// with the right connector. Trains connector selection + fluent linking, the core of the
// "short sentences, logically connected" method. Reuses the connector's SRS key, so mastery is shared.
export function chainIv(c: Connector): IvItem {
  const re = new RegExp(c.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const cloze = c.example.replace(re, '___');
  return {
    key: c.key,
    tag: `chain · ${c.fn}`,
    promptKo: `${cloze}\n(___ = ${c.ko})`,
    promptEn: cloze,
    answer: c.example,
    meaningKo: c.ko,
    note: c.exampleKo || undefined,
    detail: c.detail || undefined,
    terms: c.termsKo || undefined,
  };
}

// Cards the learner keeps missing (2+ lapses) across the whole speaking mix — for focused repair.
export function weakItems(states: SrsCard[]): IvItem[] {
  const weakKeys = new Set(states.filter((s) => s.lapseCount >= 2).map((s) => s.cardKey));
  return scopeItems('due').filter((it) => weakKeys.has(it.key));
}

// A connector → chaining drill: link two short sentences with the right discourse marker.
export function connectorIv(c: Connector): IvItem {
  return {
    key: c.key,
    tag: c.fn,
    promptKo: `${c.ko} — 짧은 두 문장을 '${c.en}'(으)로 잇기`,
    promptEn: c.questionEn || c.en,
    answer: c.example,
    meaningKo: c.ko,
    note: c.exampleKo || undefined,
    detail: c.detail || undefined,
    terms: c.termsKo || undefined,
  };
}

export type ScopeKind =
  | 'due'
  | 'core'
  | 'cluster'
  | 'concept'
  | 'scenario'
  | 'frame'
  | 'phrasal'
  | 'expr'
  | 'codenarr'
  | 'ui'
  | 'backend'
  | 'sd'
  | 'pair'
  | 'clarify'
  | 'connector'
  | 'chain'
  | 'weak';

export function scopeItems(kind: ScopeKind, clusterId?: string): IvItem[] {
  switch (kind) {
    case 'due':
      return [
        ...REFLEX_CARDS.map(reflexIv),
        ...INTERVIEW_CONCEPTS.map(cardIv),
        ...INTERVIEW_FRAMES.map(cardIv),
        ...INTERVIEW_SCENARIOS.map(cardIv),
        ...PHRASAL_CARDS.map(phraseIv),
        ...EXPR_CARDS.map(phraseIv),
        ...CODE_NARRATION_CARDS.map(phraseIv),
        ...UI_CARDS.map(phraseIv),
        ...BACKEND_CARDS.map(backendIv),
        ...SD_CARDS.map(phraseIv),
        ...PAIR_CARDS.map(phraseIv),
        ...CLARIFY_CARDS.map(phraseIv),
        ...CONNECTORS.map(connectorIv),
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
    case 'phrasal':
      return PHRASAL_CARDS.map(phraseIv);
    case 'expr':
      return EXPR_CARDS.map(phraseIv);
    case 'codenarr':
      return CODE_NARRATION_CARDS.map(phraseIv);
    case 'ui':
      return UI_CARDS.map(phraseIv);
    case 'backend':
      return BACKEND_CARDS.map(backendIv);
    case 'sd':
      return SD_CARDS.map(phraseIv);
    case 'pair':
      return PAIR_CARDS.map(phraseIv);
    case 'clarify':
      return CLARIFY_CARDS.map(phraseIv);
    case 'connector':
      return CONNECTORS.map(connectorIv);
    case 'chain':
      return CONNECTORS.map(chainIv);
    case 'weak':
      return []; // needs SRS states — interview-run resolves this via weakItems()
  }
}

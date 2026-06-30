import { PHRASAL_500, phrasal500Key } from '@shadow-ai/core';
import { DeckScreen } from '@/components/deck-screen';
import { type DrillItem } from '@/components/drill-runner';
import { t } from '@/lib/i18n';

// Conversational phrasal verbs: Korean meaning → recall the phrasal, see it in an example.
const build = (): DrillItem[] =>
  PHRASAL_500.map((p, i) => ({
    key: phrasal500Key(i),
    title: p.phrasal,
    cue: p.ko,
    model: p.example || p.phrasal,
    note: [p.note, p.exampleKo].filter(Boolean).join('  ·  ') || undefined,
    target: p.phrasal, // compose mode: write your own sentence using the phrasal
  }));

export default function Phrasal500Screen() {
  return (
    <DeckScreen
      title={t('home.phrasal500')}
      subtitle={t('home.phrasal500Sub', { n: PHRASAL_500.length })}
      build={build}
      modes={['recall', 'reverse', 'compose']}
    />
  );
}

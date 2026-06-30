import { IT_PATTERNS, itPatternKey } from '@shadow-ai/core';
import { DeckScreen } from '@/components/deck-screen';
import { type DrillItem } from '@/components/drill-runner';
import { t } from '@/lib/i18n';

// IT interview/work English chunks: Korean → produce the English chunk.
const build = (): DrillItem[] =>
  IT_PATTERNS.map((p, i) => ({
    key: itPatternKey(i),
    title: p.category,
    cue: p.ko,
    model: p.en,
  }));

export default function ItPatternsScreen() {
  return (
    <DeckScreen
      title={t('home.itPatterns')}
      subtitle={t('home.itPatternsSub', { n: IT_PATTERNS.length })}
      build={build}
      modes={['recall', 'reverse', 'compose']}
    />
  );
}

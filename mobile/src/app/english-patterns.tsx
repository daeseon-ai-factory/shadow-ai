import { ENGLISH_PATTERNS, englishPatternKey } from '@shadow-ai/core';
import { DeckScreen } from '@/components/deck-screen';
import { type DrillItem } from '@/components/drill-runner';
import { t } from '@/lib/i18n';

// Daily speaking frames: show the frame, recall/produce an English example of it.
const build = (): DrillItem[] =>
  ENGLISH_PATTERNS.map((p, i) => ({
    key: englishPatternKey(i),
    title: p.category,
    cue: p.frame,
    model: p.example,
  }));

export default function EnglishPatternsScreen() {
  return (
    <DeckScreen
      title={t('home.dailyPatterns')}
      subtitle={t('home.dailyPatternsSub', { n: ENGLISH_PATTERNS.length })}
      build={build}
    />
  );
}

import { IT_TERMS, itTermKey } from '@shadow-ai/core';
import { DeckScreen } from '@/components/deck-screen';
import { type DrillItem } from '@/components/drill-runner';
import { t } from '@/lib/i18n';

// Code-explanation expressions/terms: Korean → produce the English term.
const build = (): DrillItem[] =>
  IT_TERMS.map((p, i) => ({
    key: itTermKey(i),
    title: p.section,
    cue: p.ko,
    model: p.en,
  }));

export default function ItTermsScreen() {
  return (
    <DeckScreen
      title={t('home.itTerms')}
      subtitle={t('home.itTermsSub', { n: IT_TERMS.length })}
      build={build}
      modes={['recall', 'reverse', 'compose']}
    />
  );
}

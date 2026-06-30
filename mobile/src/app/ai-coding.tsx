import { AI_CODING, aiCodingKey } from '@shadow-ai/core';
import { DeckScreen } from '@/components/deck-screen';
import { type DrillItem } from '@/components/drill-runner';
import { t } from '@/lib/i18n';

// Prompting an AI coding assistant: Korean intent → produce the English prompt.
const build = (): DrillItem[] =>
  AI_CODING.map((p, i) => ({
    key: aiCodingKey(i),
    title: p.category,
    cue: p.ko,
    model: p.en,
  }));

export default function AiCodingScreen() {
  return (
    <DeckScreen
      title={t('home.aiCoding')}
      subtitle={t('home.aiCodingSub', { n: AI_CODING.length })}
      build={build}
      modes={['recall', 'reverse', 'compose']}
    />
  );
}

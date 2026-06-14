import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import type { PracticeScenario } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { t } from '@/lib/i18n';

/**
 * Output practice on the learner's OWN clip — the input→output bridge the mobile player
 * was missing (the web already has this as ScenarioQuiz). The AI mined a real-world Korean
 * situation + a sample English response into ClipAnalysis.practiceScenario at analysis time;
 * this surfaces it: read the situation, type an English response that uses the clip's
 * expression, then reveal the sample. Pure client-side — no AI call, no cost.
 */
export function ScenarioQuiz({ scenario }: { scenario?: PracticeScenario | null }) {
  const [draft, setDraft] = useState('');
  const [checked, setChecked] = useState(false);

  if (!scenario) return null;

  const trimmed = draft.trim();

  return (
    <View style={styles.box}>
      <ThemedText type="smallBold">{t('scenario.title')}</ThemedText>

      <View style={styles.situation}>
        <ThemedText style={styles.situationText}>{scenario.situation}</ThemedText>
        {scenario.koreanHint ? (
          <ThemedText type="small" style={styles.hint}>
            💡 {t('scenario.hint')}: {scenario.koreanHint}
          </ThemedText>
        ) : null}
      </View>

      {!checked ? (
        <>
          <TextInput
            style={styles.input}
            placeholder={t('scenario.placeholder')}
            placeholderTextColor="#9ca3af"
            multiline
            value={draft}
            onChangeText={setDraft}
          />
          <Pressable
            style={[styles.checkBtn, trimmed.length === 0 && styles.disabled]}
            disabled={trimmed.length === 0}
            onPress={() => setChecked(true)}
          >
            <ThemedText style={styles.checkText}>{t('scenario.check')}</ThemedText>
          </Pressable>
        </>
      ) : (
        <View style={styles.result}>
          <View style={styles.section}>
            <ThemedText type="small" style={styles.label}>{t('scenario.yourAnswer')}</ThemedText>
            <ThemedText>{trimmed}</ThemedText>
          </View>
          <View style={styles.section}>
            <ThemedText type="small" style={styles.label}>{t('scenario.sample')}</ThemedText>
            <ThemedText style={styles.sample}>{scenario.sampleResponse}</ThemedText>
          </View>
          <Pressable style={styles.retryBtn} onPress={() => { setDraft(''); setChecked(false); }}>
            <ThemedText style={styles.retryText}>{t('scenario.retry')}</ThemedText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 12,
  },
  situation: {
    backgroundColor: 'rgba(32,138,239,0.08)',
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  situationText: { fontSize: 15, lineHeight: 22 },
  hint: { color: '#6b7280' },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    minHeight: 90,
    textAlignVertical: 'top',
    color: '#111827',
    backgroundColor: '#fff',
  },
  checkBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabled: { opacity: 0.5 },
  checkText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  result: { gap: 12 },
  section: { gap: 4 },
  label: { color: '#6b7280', textTransform: 'uppercase', fontSize: 11 },
  sample: { fontWeight: '600', fontSize: 15, lineHeight: 22 },
  retryBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  retryText: { fontWeight: '600' },
});

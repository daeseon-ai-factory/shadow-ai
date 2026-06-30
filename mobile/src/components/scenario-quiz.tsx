import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { practiceApi, ApiError, type PracticeScenario } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { haptic } from '@/lib/haptics';
import { t } from '@/lib/i18n';

/**
 * Output practice on the learner's OWN clip — the input→output bridge. The AI mined a real-world
 * Korean situation + a sample English response into ClipAnalysis.practiceScenario; the learner reads
 * the situation, writes an English response, and gets a LENIENT AI verdict (does it work in the
 * situation — a different-but-valid answer passes). If grading is unavailable it degrades to just
 * revealing the sample, so the drill is never a dead end.
 */
export function ScenarioQuiz({ scenario }: { scenario?: PracticeScenario | null }) {
  const [draft, setDraft] = useState('');

  const check = useMutation({
    mutationFn: (answer: string) =>
      practiceApi.scenarioCheck(
        scenario!.situation,
        scenario!.koreanHint ?? '',
        scenario!.sampleResponse ?? '',
        answer,
      ),
    onSuccess: (data) => (data.ok ? haptic.success : haptic.light)(),
    onError: () => haptic.error(),
  });

  if (!scenario) return null;

  const trimmed = draft.trim();
  const fb = check.data;
  // Even if grading fails (e.g. offline), still reveal the sample — never strand the learner.
  const done = fb != null || check.isError;
  const errorMessage =
    check.error instanceof ApiError ? check.error.message : check.error ? t('scenario.checkFailed') : null;

  const reset = () => {
    setDraft('');
    check.reset();
  };

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

      {!done ? (
        <>
          <TextInput
            style={styles.input}
            placeholder={t('scenario.placeholder')}
            placeholderTextColor="#9ca3af"
            multiline
            editable={!check.isPending}
            value={draft}
            onChangeText={setDraft}
          />
          <Pressable
            style={[styles.checkBtn, (trimmed.length === 0 || check.isPending) && styles.disabled]}
            disabled={trimmed.length === 0 || check.isPending}
            onPress={() => check.mutate(trimmed)}
            accessibilityRole="button"
            accessibilityLabel={t('scenario.check')}
          >
            {check.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.checkText}>{t('scenario.check')}</ThemedText>
            )}
          </Pressable>
        </>
      ) : (
        <View style={styles.result}>
          {fb ? (
            <View style={[styles.fbBox, fb.ok ? styles.fbOk : styles.fbWork]}>
              <ThemedText type="smallBold">
                {fb.ok ? t('scenario.good') : t('scenario.needsWork')}
              </ThemedText>
              {fb.feedback ? <ThemedText type="small">{fb.feedback}</ThemedText> : null}
              {fb.better ? (
                <ThemedText style={styles.better}>{t('scenario.betterLabel', { text: fb.better })}</ThemedText>
              ) : null}
            </View>
          ) : (
            <ThemedText type="small" style={styles.error}>
              {errorMessage}
            </ThemedText>
          )}

          <View style={styles.section}>
            <ThemedText type="small" style={styles.label}>{t('scenario.yourAnswer')}</ThemedText>
            <ThemedText>{trimmed}</ThemedText>
          </View>
          <View style={styles.section}>
            <ThemedText type="small" style={styles.label}>{t('scenario.sample')}</ThemedText>
            <ThemedText style={styles.sample}>{scenario.sampleResponse}</ThemedText>
          </View>
          <Pressable
            style={styles.retryBtn}
            onPress={reset}
            accessibilityRole="button"
            accessibilityLabel={t('scenario.retry')}
          >
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
    minHeight: 48,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.5 },
  checkText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  error: { color: '#dc2626' },
  result: { gap: 12 },
  fbBox: { borderRadius: 12, borderWidth: 1, padding: 14, gap: 6 },
  fbOk: { borderColor: '#10b98155', backgroundColor: '#10b98111' },
  fbWork: { borderColor: '#f59e0b55', backgroundColor: '#f59e0b11' },
  better: { fontStyle: 'italic' },
  section: { gap: 4 },
  label: { color: '#6b7280', textTransform: 'uppercase', fontSize: 11 },
  sample: { fontWeight: '600', fontSize: 15, lineHeight: 22 },
  retryBtn: {
    borderRadius: 10,
    minHeight: 44,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  retryText: { fontWeight: '600' },
});

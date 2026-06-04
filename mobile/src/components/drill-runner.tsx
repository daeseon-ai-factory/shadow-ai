import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { localToday, practiceApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { t } from '@/lib/i18n';

export interface DrillItem {
  key: string; // SRS card key (pat:… / col:…)
  title: string; // the frame / anchor to produce
  subtitle?: string; // category / gloss
  cue: string; // Korean cue to express
  model: string; // English model answer
  note?: string; // gloss shown under the model
}

/**
 * Shared reveal → Again/Got-it loop for any keyed drill (patterns, collocations).
 * All behavior — first-attempt-only SRS grade, in-session requeue on miss — matches the
 * web app's drills, because the grading call and key format come from @shadow-ai/core.
 */
export function DrillRunner({ items }: { items: DrillItem[] }) {
  const [queue, setQueue] = useState<DrillItem[]>(items);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [got, setGot] = useState(0);
  const [streak, setStreak] = useState<number | null>(null);
  const graded = useRef<Set<string>>(new Set());
  const qc = useQueryClient();

  const grade = useMutation({
    mutationFn: ({ key, ok }: { key: string; ok: boolean }) =>
      practiceApi.grade(key, ok, localToday()),
    onSuccess: (res) => {
      setStreak(res.progress.streak);
      // Due/new counts + lapse/mastered stats shift after every grade — refresh the SRS-backed
      // screens (Pattern, Collocation, Weak spots) so they don't show pre-grade state.
      qc.invalidateQueries({ queryKey: ['srs'] });
    },
  });

  if (items.length === 0) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={[styles.flex, styles.center]}>
          <ThemedText type="subtitle">{t('drill.allCaughtUp')}</ThemedText>
          <ThemedText type="small">{t('drill.nothingDue')}</ThemedText>
          <Pressable style={styles.linkBtn} onPress={() => router.back()}>
            <ThemedText style={styles.linkText}>{t('drill.back')}</ThemedText>
          </Pressable>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const done = pos >= queue.length;

  const answer = (ok: boolean) => {
    const cur = queue[pos];
    if (!graded.current.has(cur.key)) {
      grade.mutate({ key: cur.key, ok });
      graded.current.add(cur.key);
      if (ok) setGot((g) => g + 1);
    }
    if (!ok) setQueue((q) => [...q, cur]);
    setRevealed(false);
    setPos((p) => p + 1);
  };

  if (done) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={[styles.flex, styles.center]}>
          <ThemedText type="title">{t('drill.done')}</ThemedText>
          <ThemedText type="small">
            {t('drill.firstTry', { got, total: items.length })}
          </ThemedText>
          {streak !== null && (
            <ThemedText type="small">{t('drill.streak', { n: streak })}</ThemedText>
          )}
          <Pressable style={styles.primaryBtn} onPress={() => router.replace('/')}>
            <ThemedText style={styles.primaryText}>{t('drill.home')}</ThemedText>
          </Pressable>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const item = queue[pos];

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <ThemedText type="small">
            {pos + 1} / {queue.length}
            {streak !== null ? `   🔥 ${streak}` : ''}
          </ThemedText>

          <View style={styles.frameBox}>
            {item.subtitle ? (
              <ThemedText type="small" style={styles.subtitle}>
                {item.subtitle}
              </ThemedText>
            ) : null}
            <ThemedText style={styles.frame}>{item.title}</ThemedText>
          </View>

          <View style={styles.cueBox}>
            <ThemedText type="small">{t('drill.sayThis')}</ThemedText>
            <ThemedText style={styles.cue}>{item.cue}</ThemedText>
          </View>

          {!revealed ? (
            <Pressable style={styles.primaryBtn} onPress={() => setRevealed(true)}>
              <ThemedText style={styles.primaryText}>{t('drill.reveal')}</ThemedText>
            </Pressable>
          ) : (
            <View style={styles.gap}>
              <View style={styles.modelBox}>
                <ThemedText style={styles.model}>{item.model}</ThemedText>
                {item.note ? (
                  <ThemedText type="small" style={styles.gloss}>
                    {item.note}
                  </ThemedText>
                ) : null}
              </View>
              <View style={styles.row}>
                <Pressable style={[styles.gradeBtn, styles.again]} onPress={() => answer(false)}>
                  <ThemedText style={styles.againText}>{t('drill.again')}</ThemedText>
                </Pressable>
                <Pressable style={[styles.gradeBtn, styles.gotIt]} onPress={() => answer(true)}>
                  <ThemedText style={styles.primaryText}>{t('drill.gotIt')}</ThemedText>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  container: { flex: 1, padding: 24, gap: 18 },
  gap: { gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  subtitle: { textTransform: 'uppercase', letterSpacing: 1 },
  frameBox: { alignItems: 'center', gap: 6, marginTop: 8 },
  frame: { fontSize: 18, color: '#208AEF', fontFamily: 'Menlo', textAlign: 'center' },
  cueBox: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  cue: { fontSize: 22, textAlign: 'center' },
  modelBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  model: { fontSize: 18, fontFamily: 'Menlo', textAlign: 'center' },
  gloss: { textAlign: 'center' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  gradeBtn: { flex: 1, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  again: { borderWidth: 1, borderColor: '#9ca3af' },
  againText: { fontWeight: '600' },
  gotIt: { backgroundColor: '#208AEF' },
  linkBtn: { paddingVertical: 10 },
  linkText: { color: '#208AEF', fontWeight: '600' },
});

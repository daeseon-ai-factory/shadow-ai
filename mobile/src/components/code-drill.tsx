import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { localToday, practiceApi, type CodeCard } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SpokenCheck } from '@/components/spoken-check';
import { t } from '@/lib/i18n';

/**
 * Look at real Java → SAY the core in English (mic) → lenient AI check → reveal a short model
 * answer + the key points. Pushed route, so iOS swipe-back works; grading feeds the same SRS.
 */
export function CodeDrill({ cards, onExit }: { cards: CodeCard[]; onExit: () => void }) {
  const [queue, setQueue] = useState<CodeCard[]>(cards);
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
      qc.invalidateQueries({ queryKey: ['srs'] });
    },
  });

  const header = (
    <View style={styles.header}>
      <Pressable hitSlop={12} onPress={onExit}>
        <ThemedText style={styles.exit}>‹ {t('iv.exit')}</ThemedText>
      </Pressable>
      <ThemedText type="small">
        {Math.min(pos + 1, queue.length)} / {queue.length}
        {streak !== null ? `   🔥 ${streak}` : ''}
      </ThemedText>
    </View>
  );

  if (cards.length === 0) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {header}
          <View style={styles.center}>
            <ThemedText type="subtitle">{t('drill.allCaughtUp')}</ThemedText>
            <Pressable style={styles.linkBtn} onPress={onExit}>
              <ThemedText style={styles.linkText}>{t('iv.backToModes')}</ThemedText>
            </Pressable>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (pos >= queue.length) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          {header}
          <View style={styles.center}>
            <ThemedText type="title">{t('drill.done')}</ThemedText>
            <ThemedText type="small">{t('drill.firstTry', { got, total: cards.length })}</ThemedText>
            {streak !== null && <ThemedText type="small">{t('drill.streak', { n: streak })}</ThemedText>}
            <Pressable style={styles.primaryBtn} onPress={onExit}>
              <ThemedText style={styles.primaryText}>{t('iv.backToModes')}</ThemedText>
            </Pressable>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const card = queue[pos];
  const advance = (ok: boolean) => {
    if (!graded.current.has(card.key)) {
      grade.mutate({ key: card.key, ok });
      graded.current.add(card.key);
      if (ok) setGot((g) => g + 1);
    }
    // "Again" re-shows the card ~2 cards later (Anki-style short interval), NOT at the very end,
    // so a missed card actually comes back within the session instead of feeling skipped.
    if (!ok) setQueue((q) => { const n = [...q]; n.splice(pos + 3, 0, card); return n; });
    setPos((p) => p + 1);
    setRevealed(false);
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        {header}
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <ThemedText type="small" style={styles.tag}>{card.title}</ThemedText>
          <ScrollView horizontal style={styles.codeScroll} showsHorizontalScrollIndicator>
            <ThemedText style={styles.code}>{card.code}</ThemedText>
          </ScrollView>

          {!revealed ? (
            <View style={styles.gap}>
              <ThemedText type="small" style={styles.hint}>{t('code.explain')}</ThemedText>
              <SpokenCheck question={card.code} />
              <Pressable style={styles.primaryBtn} onPress={() => setRevealed(true)}>
                <ThemedText style={styles.primaryText}>{t('code.reveal')}</ThemedText>
              </Pressable>
            </View>
          ) : (
            <View style={styles.gap}>
              <View style={styles.answerBox}>
                <ThemedText style={styles.answer}>{card.answer}</ThemedText>
              </View>
              <View style={styles.points}>
                {card.keyPoints.map((p, i) => (
                  <ThemedText key={i} type="small" style={styles.point}>• {p}</ThemedText>
                ))}
              </View>
              <View style={styles.row}>
                <Pressable style={[styles.gradeBtn, styles.again]} onPress={() => advance(false)}>
                  <ThemedText style={styles.againText}>{t('drill.again')}</ThemedText>
                </Pressable>
                <Pressable style={[styles.gradeBtn, styles.gotIt]} onPress={() => advance(true)}>
                  <ThemedText style={styles.primaryText}>{t('drill.gotIt')}</ThemedText>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#9ca3af55',
  },
  exit: { color: '#208AEF', fontWeight: '700', fontSize: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24 },
  container: { padding: 20, gap: 12, paddingBottom: 40 },
  gap: { gap: 12 },
  row: { flexDirection: 'row', gap: 12, marginTop: 4 },
  tag: { textTransform: 'uppercase', letterSpacing: 1, opacity: 0.6 },
  codeScroll: { borderRadius: 12, backgroundColor: '#0b1021', padding: 14, maxHeight: 320 },
  code: { fontFamily: 'Menlo', fontSize: 13, lineHeight: 20, color: '#e5e7eb' },
  hint: { textAlign: 'center', opacity: 0.7 },
  answerBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
  },
  answer: { fontSize: 17, lineHeight: 25 },
  points: { gap: 4, paddingHorizontal: 4 },
  point: { color: '#6b7280', lineHeight: 20 },
  primaryBtn: { backgroundColor: '#208AEF', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  gradeBtn: { flex: 1, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  again: { borderWidth: 1, borderColor: '#9ca3af' },
  againText: { fontWeight: '600' },
  gotIt: { backgroundColor: '#208AEF' },
  linkBtn: { paddingVertical: 10 },
  linkText: { color: '#208AEF', fontWeight: '600' },
});

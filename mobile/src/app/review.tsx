import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { reviewApi, analysisApi, REVIEW_QUALITY, type ReviewQueueItem } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const GRADES = [
  { label: 'Again', labelKey: 'review.again', quality: REVIEW_QUALITY.AGAIN, color: '#dc2626' },
  { label: 'Hard', labelKey: 'review.hard', quality: REVIEW_QUALITY.HARD, color: '#f59e0b' },
  { label: 'Good', labelKey: 'review.good', quality: REVIEW_QUALITY.GOOD, color: '#208AEF' },
  { label: 'Easy', labelKey: 'review.easy', quality: REVIEW_QUALITY.EASY, color: '#10b981' },
];

export default function ReviewScreen() {
  const token = useAuthStore((s) => s.token);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const queue = useQuery({
    queryKey: ['review', 'queue'],
    queryFn: () => reviewApi.queue(),
    enabled: !!token,
  });

  // expo-router keeps screens mounted, so a returning user would land past the end of a
  // finished session ("Review done") even with new cards due. Reset + refetch on every focus.
  useFocusEffect(
    useCallback(() => {
      setPos(0);
      setRevealed(false);
      queue.refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const item: ReviewQueueItem | undefined = queue.data?.[pos];

  // Korean prompt for the current clip (recall cue). Falls back gracefully if not analyzed.
  const analysis = useQuery({
    queryKey: ['analysis', item?.clipId],
    queryFn: () => analysisApi.get(item!.clipId),
    enabled: !!item,
  });

  const respond = useMutation({
    mutationFn: (quality: number) => reviewApi.respond(item!.id, quality),
    onSuccess: () => {
      setRevealed(false);
      setPos((p) => p + 1);
    },
  });

  if (!token) return <Redirect href="/login" />;
  if (queue.isPending) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (queue.isError) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.error}>{(queue.error as Error).message}</ThemedText>
      </ThemedView>
    );
  }

  const total = queue.data?.length ?? 0;
  const done = pos >= total;

  if (total === 0 || done) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={[styles.flex, styles.center]}>
          <ThemedText type="title">{total === 0 ? t('review.nothingDue') : t('review.reviewDone')}</ThemedText>
          <ThemedText type="small">
            {total === 0 ? t('review.nothingDueSub') : t('review.reviewedCount', { n: total })}
          </ThemedText>
          <Pressable style={styles.primaryBtn} onPress={() => router.replace('/')}>
            <ThemedText style={styles.primaryText}>{t('review.home')}</ThemedText>
          </Pressable>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const clip = item!.clip;
  const koPrompt = analysis.data?.primaryTranslation;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="small">
            {t('review.progress', { current: pos + 1, total })} · {clip.videoTitle}
          </ThemedText>

          <View style={styles.promptBox}>
            <ThemedText type="small">{t('review.recallInEnglish')}</ThemedText>
            <ThemedText style={styles.prompt}>
              {koPrompt ?? clip.name ?? t('review.recallThisClip')}
            </ThemedText>
          </View>

          {!revealed ? (
            <Pressable style={styles.primaryBtn} onPress={() => setRevealed(true)}>
              <ThemedText style={styles.primaryText}>{t('review.reveal')}</ThemedText>
            </Pressable>
          ) : (
            <View style={styles.gap}>
              <View style={styles.answerBox}>
                <ThemedText style={styles.answer}>
                  {clip.transcript ?? t('review.noTranscript')}
                </ThemedText>
              </View>
              <Pressable
                style={styles.linkBtn}
                onPress={() => router.push(`/player/${clip.id}`)}
              >
                <ThemedText style={styles.linkText}>{t('review.openClip')}</ThemedText>
              </Pressable>

              <View style={styles.gradeRow}>
                {GRADES.map((g) => (
                  <Pressable
                    key={g.label}
                    style={[styles.gradeBtn, { backgroundColor: g.color }]}
                    disabled={respond.isPending}
                    onPress={() => respond.mutate(g.quality)}
                  >
                    <ThemedText style={styles.gradeText}>{t(g.labelKey)}</ThemedText>
                  </Pressable>
                ))}
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  container: { padding: 24, gap: 16 },
  error: { color: '#dc2626' },
  gap: { gap: 12 },
  promptBox: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 18,
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  prompt: { fontSize: 20, textAlign: 'center' },
  answerBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
  },
  answer: { fontSize: 18, textAlign: 'center' },
  gradeRow: { flexDirection: 'row', gap: 8 },
  gradeBtn: { flex: 1, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  gradeText: { color: '#fff', fontWeight: '700' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkBtn: { paddingVertical: 8, alignItems: 'center' },
  linkText: { color: '#208AEF', fontWeight: '600' },
});

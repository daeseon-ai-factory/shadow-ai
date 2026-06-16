import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { practiceApi, type MockTurn } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SpokenCheck } from '@/components/spoken-check';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const QUESTIONS_PER_SESSION = 5;

/**
 * AI mock interview: the model plays the interviewer — it opens with a realistic question, the
 * learner answers BY VOICE (SpokenCheck = mic → transcript → lenient grade), and the model asks a
 * follow-up that digs into that answer. Five questions per session. This is the live-assembly
 * bridge between drilled short sentences and a real interview.
 */
export default function MockRunScreen() {
  const token = useAuthStore((s) => s.token);
  const [history, setHistory] = useState<MockTurn[]>([]);
  const [question, setQuestion] = useState<string | null>(null);
  const [asked, setAsked] = useState(0);
  const [done, setDone] = useState(false);
  const seed = useRef(Math.floor(Math.random() * 1_000_000));

  const next = useMutation({
    mutationFn: (h: MockTurn[]) => practiceApi.mockNext(h, seed.current),
    onSuccess: (res) => {
      setQuestion(res.question);
      setHistory((h) => [...h, { role: 'interviewer', text: res.question }]);
      setAsked((n) => n + 1);
    },
  });

  // Opening question on mount.
  useEffect(() => {
    next.mutate([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAnswered = (answer: string) => {
    const h: MockTurn[] = [...history, { role: 'candidate', text: answer }];
    setHistory(h);
    if (asked >= QUESTIONS_PER_SESSION) {
      setDone(true);
      return;
    }
    setQuestion(null);
    next.mutate(h);
  };

  if (!token) return <Redirect href="/login" />;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.header}>
          <Pressable hitSlop={12} onPress={() => router.back()}>
            <ThemedText style={styles.exit}>‹ {t('iv.exit')}</ThemedText>
          </Pressable>
          <ThemedText type="small">
            {Math.min(asked, QUESTIONS_PER_SESSION)} / {QUESTIONS_PER_SESSION}
          </ThemedText>
        </View>
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          {done ? (
            <View style={styles.center}>
              <ThemedText type="title">{t('mock.done')}</ThemedText>
              <ThemedText type="small" style={styles.hint}>{t('mock.doneSub')}</ThemedText>
              <Pressable style={styles.primaryBtn} onPress={() => router.back()}>
                <ThemedText style={styles.primaryText}>{t('iv.backToModes')}</ThemedText>
              </Pressable>
            </View>
          ) : next.isPending || question === null ? (
            <View style={styles.center}>
              <ActivityIndicator />
              <ThemedText type="small" style={styles.hint}>{t('mock.thinking')}</ThemedText>
              {next.isError ? (
                <Pressable style={styles.primaryBtn} onPress={() => next.mutate(history)}>
                  <ThemedText style={styles.primaryText}>{t('mock.retry')}</ThemedText>
                </Pressable>
              ) : null}
            </View>
          ) : (
            <>
              <ThemedText type="small" style={styles.tag}>{t('mock.interviewer')}</ThemedText>
              <View style={styles.questionBox}>
                <ThemedText style={styles.question}>{question}</ThemedText>
              </View>
              <ThemedText type="small" style={styles.hint}>{t('mock.hint')}</ThemedText>
              <SpokenCheck key={asked} question={question} onChecked={onAnswered} />
            </>
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
  body: { padding: 20, gap: 14, paddingBottom: 40, flexGrow: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  tag: { textTransform: 'uppercase', letterSpacing: 1, opacity: 0.6 },
  questionBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 18,
  },
  question: { fontSize: 19, lineHeight: 28, fontWeight: '600' },
  hint: { textAlign: 'center', opacity: 0.7 },
  primaryBtn: { backgroundColor: '#208AEF', borderRadius: 10, paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center', marginTop: 8 },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  PATTERNS,
  patternKey,
  buildSession,
  localToday,
  practiceApi,
  type SrsCard,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';

interface Entry {
  key: string;
  category: string;
  frame: string;
  gloss: string;
  cue: string;
  model: string;
}

// Flatten the bundled patterns into one keyed list (same key format the web app + SRS use).
function allEntries(): Entry[] {
  const out: Entry[] = [];
  for (const p of PATTERNS) {
    p.items.forEach((it, i) =>
      out.push({
        key: patternKey(p.id, i),
        category: p.category,
        frame: p.frame,
        gloss: p.gloss,
        cue: it.cue,
        model: it.model,
      }),
    );
  }
  return out;
}

export default function PracticeScreen() {
  const token = useAuthStore((s) => s.token);

  // Pull the account's SRS state, then build today's session (due + a trickle of new).
  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
  });

  const entries = useMemo(() => allEntries(), []);
  const session = useMemo<Entry[]>(() => {
    if (!srs.data) return [];
    return buildSession(entries, srs.data as SrsCard[], localToday());
  }, [entries, srs.data]);

  if (!token) return <Redirect href="/login" />;

  if (srs.isPending) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (srs.isError) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.error}>{(srs.error as Error).message}</ThemedText>
        <Pressable style={styles.linkBtn} onPress={() => router.back()}>
          <ThemedText style={styles.linkText}>Back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return <Drill key={session.map((e) => e.key).join(',')} items={session} />;
}

function Drill({ items }: { items: Entry[] }) {
  const [queue, setQueue] = useState<Entry[]>(items);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [got, setGot] = useState(0);
  const [streak, setStreak] = useState<number | null>(null);
  const graded = useRef<Set<string>>(new Set());

  // Grading a card advances its Leitner box and counts a rep on the server.
  const grade = useMutation({
    mutationFn: ({ key, ok }: { key: string; ok: boolean }) =>
      practiceApi.grade(key, ok, localToday()),
    onSuccess: (res) => setStreak(res.progress.streak),
  });

  if (items.length === 0) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText type="subtitle">All caught up 🎉</ThemedText>
        <ThemedText type="small">No patterns due today.</ThemedText>
        <Pressable style={styles.linkBtn} onPress={() => router.back()}>
          <ThemedText style={styles.linkText}>Back to home</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const done = pos >= queue.length;

  const answer = (ok: boolean) => {
    const cur = queue[pos];
    if (!graded.current.has(cur.key)) {
      grade.mutate({ key: cur.key, ok }); // first attempt only → SRS + streak
      graded.current.add(cur.key);
      if (ok) setGot((g) => g + 1);
    }
    if (!ok) setQueue((q) => [...q, cur]); // missed → requeue this session
    setRevealed(false);
    setPos((p) => p + 1);
  };

  if (done) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={[styles.flex, styles.center]}>
          <ThemedText type="title">Done</ThemedText>
          <ThemedText type="small">
            {got} / {items.length} on the first try
          </ThemedText>
          {streak !== null && <ThemedText type="small">🔥 {streak}-day streak</ThemedText>}
          <Pressable style={styles.primaryBtn} onPress={() => router.replace('/')}>
            <ThemedText style={styles.primaryText}>Home</ThemedText>
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
            <ThemedText type="small" style={styles.category}>
              {item.category}
            </ThemedText>
            <ThemedText style={styles.frame}>{item.frame}</ThemedText>
          </View>

          <View style={styles.cueBox}>
            <ThemedText type="small">Say this</ThemedText>
            <ThemedText style={styles.cue}>{item.cue}</ThemedText>
          </View>

          {!revealed ? (
            <Pressable style={styles.primaryBtn} onPress={() => setRevealed(true)}>
              <ThemedText style={styles.primaryText}>Reveal</ThemedText>
            </Pressable>
          ) : (
            <View style={styles.gap}>
              <View style={styles.modelBox}>
                <ThemedText style={styles.model}>{item.model}</ThemedText>
                <ThemedText type="small" style={styles.gloss}>
                  {item.gloss}
                </ThemedText>
              </View>
              <View style={styles.row}>
                <Pressable style={[styles.gradeBtn, styles.again]} onPress={() => answer(false)}>
                  <ThemedText style={styles.againText}>Again</ThemedText>
                </Pressable>
                <Pressable style={[styles.gradeBtn, styles.gotIt]} onPress={() => answer(true)}>
                  <ThemedText style={styles.primaryText}>Got it</ThemedText>
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
  error: { color: '#dc2626' },
  category: { textTransform: 'uppercase', letterSpacing: 1 },
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

import { useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
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
import { DrillRunner, type DrillItem } from '@/components/drill-runner';
import { useAuthStore } from '@/lib/auth-store';

// Flatten the bundled patterns into keyed drill items (same key format the web app + SRS use).
function allItems(): DrillItem[] {
  const out: DrillItem[] = [];
  for (const p of PATTERNS) {
    p.items.forEach((it, i) =>
      out.push({
        key: patternKey(p.id, i),
        title: p.frame,
        subtitle: p.category,
        cue: it.cue,
        model: it.model,
        note: p.gloss,
      }),
    );
  }
  return out;
}

export default function PatternDrillScreen() {
  const token = useAuthStore((s) => s.token);
  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
  });

  const items = useMemo(() => allItems(), []);
  const session = useMemo<DrillItem[]>(() => {
    if (!srs.data) return [];
    return buildSession(items, srs.data as SrsCard[], localToday());
  }, [items, srs.data]);

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

  return <DrillRunner key={session.map((e) => e.key).join(',')} items={session} />;
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  error: { color: '#dc2626' },
  linkBtn: { paddingVertical: 10 },
  linkText: { color: '#208AEF', fontWeight: '600' },
});

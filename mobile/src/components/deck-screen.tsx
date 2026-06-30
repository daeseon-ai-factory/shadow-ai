import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { partition, shuffle, localToday, NEW_PER_DAY, practiceApi, type SrsCard } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DrillRunner, type DrillItem } from '@/components/drill-runner';
import { ErrorState } from '@/components/error-state';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';
import { applyMode, composeOnCheck, modeLabel, type DeckMode } from '@/lib/drill-modes';

export type { DeckMode };

export function DeckScreen({
  title,
  subtitle,
  build,
  modes = ['recall'],
}: {
  title: string;
  subtitle: string;
  build: () => DrillItem[];
  modes?: DeckMode[];
}) {
  const token = useAuthStore((s) => s.token);
  const [mode, setMode] = useState<DeckMode>(modes[0]);
  const [started, setStarted] = useState(false);

  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
  });

  // Same card keys regardless of mode (one SRS state per item). Reverse only swaps what's shown.
  const session = useMemo<DrillItem[]>(() => {
    if (!srs.data) return [];
    const items = applyMode(build(), mode);
    const { due, fresh } = partition(items, srs.data as SrsCard[], localToday());
    return [...shuffle(due), ...fresh.slice(0, NEW_PER_DAY)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srs.data, mode]);

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
      <ThemedView style={styles.flex}>
        <ErrorState message={(srs.error as Error).message} onRetry={() => srs.refetch()} />
      </ThemedView>
    );
  }

  if (started) {
    return (
      <DrillRunner
        key={`${mode}:${session.map((e) => e.key).join(',')}`}
        items={session}
        onCheck={mode === 'compose' ? composeOnCheck : undefined}
      />
    );
  }

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <ThemedText type="title">{title}</ThemedText>
          <ThemedText type="small">{subtitle}</ThemedText>

          {modes.length > 1 ? (
            <View style={styles.chips}>
              {modes.map((m) => (
                <Pressable
                  key={m}
                  style={[styles.chip, mode === m && styles.chipActive]}
                  onPress={() => setMode(m)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: mode === m }}
                >
                  <ThemedText style={mode === m ? styles.chipTextActive : styles.chipText}>{modeLabel(m)}</ThemedText>
                </Pressable>
              ))}
            </View>
          ) : null}

          <ThemedText type="small">{t('verbs.due', { n: session.length })}</ThemedText>
          <Pressable
            style={[styles.primaryBtn, session.length === 0 && styles.disabled]}
            disabled={session.length === 0}
            onPress={() => setStarted(true)}
            accessibilityRole="button"
            accessibilityLabel={session.length === 0 ? t('verbs.allCaughtUp') : t('verbs.beginDrill')}
          >
            <ThemedText style={styles.primaryText}>
              {session.length === 0 ? t('verbs.allCaughtUp') : t('verbs.beginDrill')}
            </ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  container: { flex: 1, padding: 24, gap: 14 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  chipText: { fontWeight: '600' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minHeight: 48,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  disabled: { opacity: 0.5 },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

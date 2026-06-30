import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  COLLOCATIONS,
  COLLOCATION_DOMAINS,
  collocationKey,
  buildSession,
  localToday,
  practiceApi,
  type SrsCard,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DrillRunner, type DrillItem } from '@/components/drill-runner';
import { ErrorState } from '@/components/error-state';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';
import { applyMode, composeOnCheck, modeLabel, type DeckMode } from '@/lib/drill-modes';

type Filter = 'all' | (typeof COLLOCATION_DOMAINS)[number];
const FILTERS: Filter[] = ['all', ...COLLOCATION_DOMAINS];

function itemsFor(filter: Filter): DrillItem[] {
  const cols = filter === 'all' ? COLLOCATIONS : COLLOCATIONS.filter((c) => c.domain === filter);
  return cols.flatMap((c) =>
    c.items.map((it, i) => ({
      key: collocationKey(c.id, i),
      title: c.anchor,
      subtitle: c.gloss,
      cue: it.cue,
      model: it.model,
      target: c.anchor, // compose mode: write your own sentence using the anchor chunk
    })),
  );
}

export default function CollocationDrillScreen() {
  const token = useAuthStore((s) => s.token);
  const [filter, setFilter] = useState<Filter>('all');
  const [mode, setMode] = useState<DeckMode>('recall');
  const [started, setStarted] = useState(false);

  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
  });

  const session = useMemo<DrillItem[]>(() => {
    if (!srs.data) return [];
    return buildSession(applyMode(itemsFor(filter), mode), srs.data as SrsCard[], localToday());
  }, [filter, mode, srs.data]);

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
        key={`${filter}:${mode}:${session.map((e) => e.key).join(',')}`}
        items={session}
        onCheck={mode === 'compose' ? composeOnCheck : undefined}
      />
    );
  }

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <ThemedText type="title">{t('collocations.title')}</ThemedText>
          <ThemedText type="small">
            {t('collocations.subtitle')}
          </ThemedText>

          <View style={styles.chips}>
            {FILTERS.map((f) => (
              <Pressable
                key={f}
                style={[styles.chip, filter === f && styles.chipActive]}
                onPress={() => setFilter(f)}
                accessibilityRole="button"
                accessibilityState={{ selected: filter === f }}
              >
                <ThemedText style={filter === f ? styles.chipTextActive : styles.chipText}>
                  {f === 'all' ? t('collocations.filterAll') : f === 'dev' ? t('collocations.filterDev') : t('collocations.filterGeneral')}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          <View style={styles.chips}>
            {(['recall', 'reverse', 'compose'] as DeckMode[]).map((m) => (
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

          <ThemedText type="small">{t('collocations.due', { n: session.length })}</ThemedText>

          <Pressable
            style={[styles.primaryBtn, session.length === 0 && styles.disabled]}
            disabled={session.length === 0}
            onPress={() => setStarted(true)}
            accessibilityRole="button"
            accessibilityLabel={session.length === 0 ? t('collocations.allCaughtUp') : t('collocations.beginDrill')}
          >
            <ThemedText style={styles.primaryText}>
              {session.length === 0 ? t('collocations.allCaughtUp') : t('collocations.beginDrill')}
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

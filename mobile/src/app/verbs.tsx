import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  VERB_PACK,
  verbKey,
  PARTICLE_INFO,
  partition,
  shuffle,
  localToday,
  NEW_PER_DAY,
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

// Frequency is the spine: T1 (daily core) before T2/T3, starred first within a tier. The particle
// (up/off/out…) is layered on as a "feel" hint, not as the ordering — the queue stays frequency-first.
type Filter = 'all' | 1 | 2 | 3;
const FILTERS: Filter[] = ['all', 1, 2, 3];

function filterLabel(f: Filter): string {
  return f === 'all'
    ? t('verbs.filterAll')
    : f === 1
      ? t('verbs.filterT1')
      : f === 2
        ? t('verbs.filterT2')
        : t('verbs.filterT3');
}

/** Flatten the verb pack into drill items, frequency-ordered (T1 first), with a particle feel note. */
function itemsFor(filter: Filter): DrillItem[] {
  const rows: { tier: number; star: number; di: DrillItem }[] = [];
  for (const g of VERB_PACK) {
    const verbLabel = g.verb === 'APPENDIX' ? 'PHRASE' : g.verb;
    g.items.forEach((it, i) => {
      if (filter !== 'all' && it.tier !== filter) return;
      const key = verbKey(g.id, i);
      const p = PARTICLE_INFO[key];
      const hasFeel = !!(p && p.particleType === 'adverb' && p.particle);
      const feelNote = hasFeel && p!.sense ? `${p!.particle} = ${p!.sense}` : undefined;
      const note = [feelNote, it.easyEn].filter(Boolean).join('  ·  ') || undefined;
      rows.push({
        tier: it.tier,
        star: it.star ? 0 : 1,
        di: {
          key,
          title: verbLabel,
          subtitle: `${verbLabel} · T${it.tier}${hasFeel ? ` · ${p!.particle}` : ''}`,
          cue: it.cue,
          model: it.model,
          note,
        },
      });
    });
  }
  rows.sort((a, b) => a.tier - b.tier || a.star - b.star);
  return rows.map((r) => r.di);
}

export default function VerbDrillScreen() {
  const token = useAuthStore((s) => s.token);
  const [filter, setFilter] = useState<Filter>('all');
  const [mode, setMode] = useState<DeckMode>('recall');
  const [started, setStarted] = useState(false);

  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
  });

  // The day's session: all due reviews (shuffled) + a frequency-ordered trickle of new cards.
  // partition() keeps `fresh` in the order of `itemsFor` (tier-sorted), so new cards arrive T1-first.
  const session = useMemo<DrillItem[]>(() => {
    if (!srs.data) return [];
    const { due, fresh } = partition(applyMode(itemsFor(filter), mode), srs.data as SrsCard[], localToday());
    return [...shuffle(due), ...fresh.slice(0, NEW_PER_DAY)];
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
          <ThemedText type="title">{t('verbs.title')}</ThemedText>
          <ThemedText type="small">{t('verbs.subtitle')}</ThemedText>

          <View style={styles.chips}>
            {FILTERS.map((f) => (
              <Pressable
                key={String(f)}
                style={[styles.chip, filter === f && styles.chipActive]}
                onPress={() => setFilter(f)}
                accessibilityRole="button"
                accessibilityState={{ selected: filter === f }}
              >
                <ThemedText style={filter === f ? styles.chipTextActive : styles.chipText}>
                  {filterLabel(f)}
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

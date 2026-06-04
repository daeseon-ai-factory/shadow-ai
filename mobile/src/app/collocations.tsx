import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
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
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

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
    })),
  );
}

export default function CollocationDrillScreen() {
  const token = useAuthStore((s) => s.token);
  const [filter, setFilter] = useState<Filter>('all');
  const [started, setStarted] = useState(false);

  const srs = useQuery({
    queryKey: ['srs'],
    queryFn: () => practiceApi.srsStates(),
    enabled: !!token,
  });

  const session = useMemo<DrillItem[]>(() => {
    if (!srs.data) return [];
    return buildSession(itemsFor(filter), srs.data as SrsCard[], localToday());
  }, [filter, srs.data]);

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
          <ThemedText style={styles.linkText}>{t('collocations.back')}</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  if (started) {
    return <DrillRunner key={`${filter}:${session.map((e) => e.key).join(',')}`} items={session} />;
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
              >
                <ThemedText style={filter === f ? styles.chipTextActive : styles.chipText}>
                  {f === 'all' ? t('collocations.filterAll') : f === 'dev' ? t('collocations.filterDev') : t('collocations.filterGeneral')}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          <ThemedText type="small">{t('collocations.due', { n: session.length })}</ThemedText>

          <Pressable
            style={[styles.primaryBtn, session.length === 0 && styles.disabled]}
            disabled={session.length === 0}
            onPress={() => setStarted(true)}
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
  error: { color: '#dc2626' },
  chips: { flexDirection: 'row', gap: 8, marginTop: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
  },
  chipActive: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  chipText: { fontWeight: '600' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  disabled: { opacity: 0.5 },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkBtn: { paddingVertical: 10 },
  linkText: { color: '#208AEF', fontWeight: '600' },
});

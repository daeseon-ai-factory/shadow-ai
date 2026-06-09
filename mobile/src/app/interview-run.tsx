import { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { buildSession, buildDailySession, localToday, practiceApi, shuffle, type SrsCard } from '@shadow-ai/core';

import { ThemedView } from '@/components/themed-view';
import { InterviewDrill, type IvMode } from '@/components/interview-drill';
import { scopeItems, weakItems, type ScopeKind } from '@/lib/interview-deck';
import { useAuthStore } from '@/lib/auth-store';

/**
 * The drill runs as its OWN pushed route (not an in-place state swap), so iOS gives us the native
 * edge-swipe-back gesture + back button for free. Exit (button or swipe) pops back to the menu.
 */
export default function InterviewRunScreen() {
  const token = useAuthStore((s) => s.token);
  const { mode, scope, cluster, speed } = useLocalSearchParams<{
    mode?: IvMode;
    scope?: ScopeKind;
    cluster?: string;
    speed?: string;
  }>();
  const srs = useQuery({ queryKey: ['srs'], queryFn: () => practiceApi.srsStates(), enabled: !!token });

  const states = srs.data;
  // Build the session once per (scope, states) so re-renders don't reshuffle mid-drill.
  const items = useMemo(() => {
    if (!states) return [];
    const kind = scope ?? 'due';
    const s = states as SrsCard[];
    // Weak-card repair: only cards with 2+ lapses, regardless of due date.
    if (kind === 'weak') return shuffle(weakItems(s)).slice(0, 30);
    const all = scopeItems(kind, cluster);
    // "오늘의 30" is the SRS-paced loop (due first, hard-capped). A category tile means "drill THIS
    // bank" — show the WHOLE bank shuffled, not the due/new trickle (which hid most cards).
    return kind === 'due' ? buildDailySession(all, s, localToday(), 30) : shuffle(all);
  }, [scope, cluster, states]);

  if (!token) return <Redirect href="/login" />;
  if (srs.isPending) {
    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <InterviewDrill
      items={items}
      mode={mode ?? 'produce'}
      timerSec={speed ? 8 : undefined}
      onExit={() => router.back()}
    />
  );
}

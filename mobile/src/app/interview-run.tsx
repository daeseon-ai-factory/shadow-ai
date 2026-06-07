import { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { buildSession, localToday, practiceApi, type SrsCard } from '@shadow-ai/core';

import { ThemedView } from '@/components/themed-view';
import { InterviewDrill, type IvMode } from '@/components/interview-drill';
import { scopeItems, type ScopeKind } from '@/lib/interview-deck';
import { useAuthStore } from '@/lib/auth-store';

/**
 * The drill runs as its OWN pushed route (not an in-place state swap), so iOS gives us the native
 * edge-swipe-back gesture + back button for free. Exit (button or swipe) pops back to the menu.
 */
export default function InterviewRunScreen() {
  const token = useAuthStore((s) => s.token);
  const { mode, scope, cluster } = useLocalSearchParams<{
    mode?: IvMode;
    scope?: ScopeKind;
    cluster?: string;
  }>();
  const srs = useQuery({ queryKey: ['srs'], queryFn: () => practiceApi.srsStates(), enabled: !!token });

  const states = srs.data;
  // Build the session once per (scope, states) so re-renders don't reshuffle mid-drill.
  const items = useMemo(
    () => (states ? buildSession(scopeItems(scope ?? 'due', cluster), states as SrsCard[], localToday()) : []),
    [scope, cluster, states],
  );

  if (!token) return <Redirect href="/login" />;
  if (srs.isPending) {
    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  return <InterviewDrill items={items} mode={mode ?? 'produce'} onExit={() => router.back()} />;
}

import { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  INTERVIEW_CODE_CARDS,
  BACKEND_CODE_CARDS,
  shuffle,
  practiceApi,
  type CodeCard,
} from '@shadow-ai/core';

import { ThemedView } from '@/components/themed-view';
import { CodeDrill } from '@/components/code-drill';
import { useAuthStore } from '@/lib/auth-store';

/** Code-explain drill for one category (or all), as a pushed route → native swipe-back. */
export default function CodeRunScreen() {
  const token = useAuthStore((s) => s.token);
  const { cat } = useLocalSearchParams<{ cat?: string }>();
  const srs = useQuery({ queryKey: ['srs'], queryFn: () => practiceApi.srsStates(), enabled: !!token });

  const pool = useMemo<CodeCard[]>(() => {
    const all = [...INTERVIEW_CODE_CARDS, ...BACKEND_CODE_CARDS];
    return cat && cat !== 'all' ? all.filter((c) => c.category === cat) : all;
  }, [cat]);
  // A category tile means "drill THIS bank" — show the whole pool shuffled, not the SRS trickle.
  const items = useMemo(
    () => (srs.data ? shuffle(pool) : []),
    [pool, srs.data],
  );

  if (!token) return <Redirect href="/login" />;
  if (srs.isPending) {
    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  return <CodeDrill cards={items} onExit={() => router.back()} />;
}

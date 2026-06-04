import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { authApi, PATTERNS, COLLOCATIONS } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';

export default function HomeScreen() {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);

  // Hooks must run unconditionally — gate the request with `enabled`, redirect in render.
  const me = useQuery({ queryKey: ['me'], queryFn: () => authApi.me(), enabled: !!token });

  if (!hydrated) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (!token) return <Redirect href="/login" />;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">Mimi</ThemedText>

          {me.isPending && <ActivityIndicator style={styles.gap} />}
          {me.isError && (
            <ThemedText style={styles.error}>{(me.error as Error).message}</ThemedText>
          )}
          {me.data && (
            <View style={styles.gap}>
              <ThemedText type="subtitle">Welcome back, {me.data.displayName}</ThemedText>
              <View style={styles.row}>
                <View style={me.data.plan === 'pro' ? styles.proBadge : styles.freeBadge}>
                  <ThemedText style={styles.badgeText}>
                    {me.data.plan === 'pro' ? 'PRO' : 'FREE'}
                  </ThemedText>
                </View>
                <ThemedText type="small">{me.data.email}</ThemedText>
              </View>
            </View>
          )}

          {/* Practice hub — each runs shared core content/logic as a native screen. */}
          <View style={styles.hub}>
            <HubCard
              title="Review"
              sub="Clips due today (spaced repetition)"
              onPress={() => router.push('/review')}
            />
            <HubCard
              title="Library"
              sub="Your YouTube clips — import & shadow"
              onPress={() => router.push('/library')}
            />
            <HubCard
              title="Discover"
              sub="Curated collections to start from"
              onPress={() => router.push('/discover')}
            />
            <HubCard
              title="Pattern drill"
              sub={`${PATTERNS.length} sentence frames`}
              onPress={() => router.push('/practice')}
            />
            <HubCard
              title="Collocations"
              sub={`${COLLOCATIONS.length} word + preposition chunks`}
              onPress={() => router.push('/collocations')}
            />
            <HubCard
              title="Compose check"
              sub="Write a sentence, AI grades it"
              onPress={() => router.push('/compose')}
            />
            <HubCard
              title="Weak spots"
              sub="The cards you keep missing"
              onPress={() => router.push('/weak')}
            />
            <HubCard
              title="Prepositions"
              sub="Senses + examples, and yours from clips"
              onPress={() => router.push('/prepositions')}
            />
            <HubCard
              title="Settings"
              sub="Account, plan, sign out"
              onPress={() => router.push('/settings')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function HubCard({ title, sub, onPress }: { title: string; sub: string; onPress: () => void }) {
  return (
    <Pressable style={styles.hubCard} onPress={onPress}>
      <ThemedText type="smallBold">{title} →</ThemedText>
      <ThemedText type="small">{sub}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: 24, gap: 16, paddingBottom: 40 },
  hub: { gap: 10, marginTop: 4 },
  hubCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    gap: 3,
  },
  gap: { marginTop: 8, gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  error: { color: '#dc2626', marginTop: 8 },
  proBadge: {
    backgroundColor: '#208AEF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  freeBadge: {
    backgroundColor: '#9ca3af',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  statsCard: {
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    gap: 4,
  },
  signOut: { marginTop: 'auto', alignSelf: 'flex-start', paddingVertical: 10 },
  signOutText: { color: '#dc2626', fontWeight: '600' },
});

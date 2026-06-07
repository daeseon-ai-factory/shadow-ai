import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { authApi, COLLOCATIONS } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

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
      {/* Top inset only — the bottom tab bar already clears the bottom safe area. */}
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">Mimi</ThemedText>

          {me.isPending && <ActivityIndicator style={styles.gap} />}
          {me.isError && (
            <ThemedText style={styles.error}>{(me.error as Error).message}</ThemedText>
          )}
          {me.data && (
            <View style={styles.gap}>
              <ThemedText type="subtitle">{t('home.welcome', { name: me.data.displayName })}</ThemedText>
              <View style={styles.row}>
                <View style={me.data.plan === 'pro' ? styles.proBadge : styles.freeBadge}>
                  <ThemedText style={styles.badgeText}>
                    {me.data.plan === 'pro' ? t('home.planPro') : t('home.planFree')}
                  </ThemedText>
                </View>
                <ThemedText type="small">{me.data.email}</ThemedText>
              </View>
            </View>
          )}

          {/* Primary destinations (Review / My Videos / Practice / Settings) now live in the
              bottom tab bar, so Home only surfaces the secondary shortcuts that have no tab. */}

          {/* Today — the daily anchor. */}
          <ThemedText type="smallBold" style={styles.section}>{t('home.todaySection')}</ThemedText>
          <Pressable style={styles.featured} onPress={() => router.push('/gym')}>
            <ThemedText type="smallBold">{t('home.gym')} →</ThemedText>
            <ThemedText type="small">{t('home.gymSub')}</ThemedText>
          </Pressable>

          {/* Practice tools — sentence-level drills beyond the Pattern-drill tab. */}
          <ThemedText type="smallBold" style={styles.section}>{t('home.toolsSection')}</ThemedText>
          <View style={styles.grid}>
            <GridCard
              title={t('home.collocations')}
              sub={t('home.collocationsSub', { n: COLLOCATIONS.length })}
              onPress={() => router.push('/collocations')}
            />
            <GridCard
              title={t('home.composeCheck')}
              sub={t('home.composeCheckSub')}
              onPress={() => router.push('/compose')}
            />
            <GridCard
              title={t('home.weakSpots')}
              sub={t('home.weakSpotsSub')}
              onPress={() => router.push('/weak')}
            />
            <GridCard
              title={t('home.prepositions')}
              sub={t('home.prepositionsSub')}
              onPress={() => router.push('/prepositions')}
            />
          </View>

          {/* Your clips — content sources not in the tab bar. */}
          <ThemedText type="smallBold" style={styles.section}>{t('home.contentSection')}</ThemedText>
          <View style={styles.grid}>
            <GridCard
              title={t('home.library')}
              sub={t('home.librarySub')}
              onPress={() => router.push('/library')}
            />
            <GridCard
              title={t('home.discover')}
              sub={t('home.discoverSub')}
              onPress={() => router.push('/discover')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function GridCard({ title, sub, onPress }: { title: string; sub: string; onPress: () => void }) {
  return (
    <Pressable style={styles.gridCard} onPress={onPress}>
      <ThemedText type="smallBold">{title}</ThemedText>
      <ThemedText type="small" numberOfLines={2}>
        {sub}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: 24, gap: 12, paddingBottom: 32 },
  gap: { marginTop: 8, gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  error: { color: '#dc2626', marginTop: 8 },
  section: { marginTop: 14, opacity: 0.55, letterSpacing: 0.5 },
  featured: {
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#208AEF',
    backgroundColor: '#208AEF0d',
    gap: 4,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  gridCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    gap: 3,
  },
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
});

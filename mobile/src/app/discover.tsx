import { ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { collectionsApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

export default function DiscoverScreen() {
  const token = useAuthStore((s) => s.token);
  const collections = useQuery({
    queryKey: ['collections'],
    queryFn: () => collectionsApi.list(),
    enabled: !!token,
  });

  if (!token) return <Redirect href="/login" />;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        {collections.isPending ? (
          <ActivityIndicator style={styles.mt} />
        ) : collections.isError ? (
          <ThemedText style={styles.error}>{(collections.error as Error).message}</ThemedText>
        ) : (
          <FlatList
            data={collections.data ?? []}
            keyExtractor={(c) => c.id}
            contentContainerStyle={styles.list}
            ListHeaderComponent={
              <ThemedText type="small" style={styles.intro}>
                {t('discover.intro')}
              </ThemedText>
            }
            ListEmptyComponent={
              <ThemedText type="small" style={styles.empty}>
                {t('discover.empty')}
              </ThemedText>
            }
            renderItem={({ item }) => (
              <Pressable style={styles.card} onPress={() => router.push(`/discover/${item.slug}`)}>
                <ThemedText type="smallBold">{t('discover.cardName', { name: item.name })}</ThemedText>
                {item.description ? (
                  <ThemedText type="small" numberOfLines={2}>
                    {item.description}
                  </ThemedText>
                ) : null}
                <ThemedText type="small">{t('discover.videoCount', { n: item.videos.length })}</ThemedText>
              </Pressable>
            )}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mt: { marginTop: 24 },
  list: { padding: 24, gap: 12 },
  intro: { marginBottom: 4 },
  empty: { textAlign: 'center', marginTop: 24 },
  error: { color: '#dc2626', padding: 24 },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 4,
  },
});

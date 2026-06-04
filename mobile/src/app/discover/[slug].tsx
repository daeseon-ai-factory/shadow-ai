import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { collectionsApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

export default function CollectionScreen() {
  const token = useAuthStore((s) => s.token);
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const collection = useQuery({
    queryKey: ['collection', slug],
    queryFn: () => collectionsApi.get(slug),
    enabled: !!token && !!slug,
  });

  if (!token) return <Redirect href="/login" />;
  if (collection.isPending) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (collection.isError || !collection.data) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.error}>
          {collection.error ? (collection.error as Error).message : t('collection.notFound')}
        </ThemedText>
      </ThemedView>
    );
  }

  const c = collection.data;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <FlatList
          data={c.videos}
          keyExtractor={(v) => v.video.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.header}>
              <ThemedText type="title">{c.name}</ThemedText>
              {c.description ? <ThemedText type="small">{c.description}</ThemedText> : null}
              <ThemedText type="small">{t('collection.tapToImport')}</ThemedText>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/import',
                  params: { url: `https://www.youtube.com/watch?v=${item.video.youtubeId}` },
                })
              }
            >
              <ThemedText type="smallBold" numberOfLines={2}>
                {item.video.title}
              </ThemedText>
              {item.video.channelName ? (
                <ThemedText type="small">{item.video.channelName}</ThemedText>
              ) : null}
            </Pressable>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { color: '#dc2626' },
  list: { padding: 24, gap: 12 },
  header: { gap: 4, marginBottom: 8 },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 4,
  },
});

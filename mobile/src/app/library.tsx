import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { clipsApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';

function ms(msVal: number) {
  const s = Math.round(msVal / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export default function LibraryScreen() {
  const token = useAuthStore((s) => s.token);
  const clips = useQuery({
    queryKey: ['clips', 'list'],
    queryFn: () => clipsApi.list({ page: 0, size: 50, sort: 'createdAt,desc' }),
    enabled: !!token,
  });

  if (!token) return <Redirect href="/login" />;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <View style={styles.header}>
          <ThemedText type="title">Library</ThemedText>
          <Pressable style={styles.importBtn} onPress={() => router.push('/import')}>
            <ThemedText style={styles.importText}>+ Import</ThemedText>
          </Pressable>
        </View>

        {clips.isPending ? (
          <ActivityIndicator style={styles.mt} />
        ) : clips.isError ? (
          <ThemedText style={styles.error}>{(clips.error as Error).message}</ThemedText>
        ) : (
          <FlatList
            data={clips.data?.items ?? []}
            keyExtractor={(c) => c.id}
            contentContainerStyle={styles.list}
            onRefresh={() => clips.refetch()}
            refreshing={clips.isFetching}
            ListEmptyComponent={
              <ThemedText type="small" style={styles.empty}>
                No clips yet. Import a YouTube video to make your first one.
              </ThemedText>
            }
            renderItem={({ item }) => (
              <Pressable style={styles.card} onPress={() => router.push(`/player/${item.id}`)}>
                <View style={styles.cardTop}>
                  <ThemedText type="smallBold" numberOfLines={1} style={styles.flex}>
                    {item.name || item.videoTitle}
                  </ThemedText>
                  <ThemedText type="small">
                    {ms(item.startMs)}–{ms(item.endMs)}
                  </ThemedText>
                </View>
                {item.transcript ? (
                  <ThemedText type="small" numberOfLines={2}>
                    {item.transcript}
                  </ThemedText>
                ) : null}
                {item.tags.length > 0 && (
                  <View style={styles.tags}>
                    {item.tags.map((t) => (
                      <View key={t} style={styles.tag}>
                        <ThemedText style={styles.tagText}>{t}</ThemedText>
                      </View>
                    ))}
                  </View>
                )}
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  importBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  importText: { color: '#fff', fontWeight: '700' },
  list: { paddingHorizontal: 24, paddingBottom: 24, gap: 10 },
  empty: { textAlign: 'center', marginTop: 32 },
  error: { color: '#dc2626', padding: 24 },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 14,
    gap: 6,
  },
  cardTop: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  tags: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  tag: { backgroundColor: '#208AEF22', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  tagText: { fontSize: 11, color: '#1d4ed8', fontWeight: '600' },
});

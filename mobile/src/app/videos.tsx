import { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { libraryApi, type LibraryVideoResponse } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

export default function VideosScreen() {
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();

  const videos = useQuery({
    queryKey: ['library', 'videos'],
    queryFn: () => libraryApi.list({ page: 0, size: 50 }),
    enabled: !!token,
  });

  const remove = useMutation({
    mutationFn: (videoId: string) => libraryApi.remove(videoId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['library', 'videos'] }),
  });

  const confirmRemove = useCallback(
    (item: LibraryVideoResponse) => {
      Alert.alert(t('videos.removeTitle'), item.video.title, [
        { text: t('library.cancel'), style: 'cancel' },
        { text: t('library.delete'), style: 'destructive', onPress: () => remove.mutate(item.video.id) },
      ]);
    },
    [remove],
  );

  if (!token) return <Redirect href="/login" />;

  const items = videos.data?.items ?? [];

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <View style={styles.header}>
          <Pressable style={styles.importBtn} onPress={() => router.push('/import')}>
            <ThemedText style={styles.importText}>＋ {t('videos.import')}</ThemedText>
          </Pressable>
        </View>

        {videos.isPending ? (
          <ActivityIndicator style={styles.mt} />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(it) => it.video.id}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={videos.isFetching} onRefresh={() => videos.refetch()} />
            }
            renderItem={({ item }) => (
              <Pressable
                style={styles.card}
                onPress={() => router.push(`/video/${item.video.id}`)}
                onLongPress={() => confirmRemove(item)}
              >
                {item.video.thumbnailUrl ? (
                  <Image source={{ uri: item.video.thumbnailUrl }} style={styles.thumb} />
                ) : (
                  <View style={[styles.thumb, styles.thumbPlaceholder]} />
                )}
                <View style={styles.cardBody}>
                  <ThemedText type="smallBold" numberOfLines={2}>
                    {item.video.title}
                  </ThemedText>
                  {item.video.channelName ? (
                    <ThemedText type="small" numberOfLines={1} style={styles.muted}>
                      {item.video.channelName}
                    </ThemedText>
                  ) : null}
                  <ThemedText type="small" style={styles.muted}>
                    {t('videos.clipCount', { count: item.clipCount })}
                  </ThemedText>
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <ThemedText type="small" style={styles.empty}>
                {t('videos.empty')}
              </ThemedText>
            }
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mt: { marginTop: 24 },
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  importBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  importText: { color: '#fff', fontWeight: '700' },
  list: { padding: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 10,
    alignItems: 'center',
  },
  thumb: { width: 120, height: 68, borderRadius: 8, backgroundColor: '#e5e7eb' },
  thumbPlaceholder: { backgroundColor: '#d1d5db' },
  cardBody: { flex: 1, gap: 3 },
  muted: { color: '#6b7280' },
  empty: { textAlign: 'center', marginTop: 40, paddingHorizontal: 24 },
});

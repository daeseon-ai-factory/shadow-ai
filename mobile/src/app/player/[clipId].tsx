import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { clipsApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';

function ms(msVal: number) {
  const s = Math.round(msVal / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export default function ClipPlayerScreen() {
  const token = useAuthStore((s) => s.token);
  const { clipId } = useLocalSearchParams<{ clipId: string }>();

  const clip = useQuery({
    queryKey: ['clip', clipId],
    queryFn: () => clipsApi.get(clipId),
    enabled: !!token && !!clipId,
  });

  if (!token) return <Redirect href="/login" />;
  if (clip.isPending) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (clip.isError || !clip.data) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.error}>
          {clip.error ? (clip.error as Error).message : 'Clip not found'}
        </ThemedText>
      </ThemedView>
    );
  }

  const c = clip.data;
  const startSec = Math.floor(c.startMs / 1000);
  // Interim playback until the native in-app YouTube player lands: open YouTube at the clip start.
  const youtubeUrl = `https://www.youtube.com/watch?v=${c.youtubeId}&t=${startSec}s`;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">{c.name || c.videoTitle}</ThemedText>
          <ThemedText type="small">
            {c.videoTitle} · {ms(c.startMs)}–{ms(c.endMs)}
          </ThemedText>

          {/* Native segment player (expo / youtube-iframe) ships in the next batch. */}
          <View style={styles.playerPlaceholder}>
            <ThemedText type="small">In-app segment player coming next</ThemedText>
            <Pressable style={styles.primaryBtn} onPress={() => Linking.openURL(youtubeUrl)}>
              <ThemedText style={styles.primaryText}>▶ Watch on YouTube</ThemedText>
            </Pressable>
          </View>

          {c.transcript ? (
            <View style={styles.transcriptBox}>
              <ThemedText type="smallBold">Transcript</ThemedText>
              <ThemedText>{c.transcript}</ThemedText>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { color: '#dc2626' },
  container: { padding: 24, gap: 14 },
  playerPlaceholder: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 20,
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  transcriptBox: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 6,
  },
});

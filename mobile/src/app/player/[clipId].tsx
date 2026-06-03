import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import YoutubePlayer, { type YoutubeIframeRef } from 'react-native-youtube-iframe';
import { clipsApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { RecordPanel } from '@/components/record-panel';
import { useAuthStore } from '@/lib/auth-store';

function ms(msVal: number) {
  const s = Math.round(msVal / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export default function ClipPlayerScreen() {
  const token = useAuthStore((s) => s.token);
  const { clipId } = useLocalSearchParams<{ clipId: string }>();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);

  const clip = useQuery({
    queryKey: ['clip', clipId],
    queryFn: () => clipsApi.get(clipId),
    enabled: !!token && !!clipId,
  });

  const startSec = clip.data ? Math.floor(clip.data.startMs / 1000) : 0;

  // Loop the clip's segment for shadowing: on "ended", seek back to the start and keep playing.
  const onState = useCallback(
    (state: string) => {
      if (state === 'ended') {
        if (loop) {
          playerRef.current?.seekTo(startSec, true);
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      }
    },
    [loop, startSec],
  );

  const replay = () => {
    playerRef.current?.seekTo(startSec, true);
    setPlaying(true);
  };

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
  const endSec = Math.ceil(c.endMs / 1000);
  const width = Dimensions.get('window').width;
  const portrait = c.videoOrientation === 'PORTRAIT';
  const height = portrait ? Math.round(width * 1.0) : Math.round(width * (9 / 16));

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.playerWrap}>
            <YoutubePlayer
              ref={playerRef}
              height={height}
              width={width}
              play={playing}
              videoId={c.youtubeId}
              initialPlayerParams={{ start: startSec, end: endSec, rel: false, modestbranding: true }}
              onChangeState={onState}
            />
          </View>

          <View style={styles.controls}>
            <Pressable style={styles.primaryBtn} onPress={() => setPlaying((p) => !p)}>
              <ThemedText style={styles.primaryText}>{playing ? '⏸ Pause' : '▶ Play'}</ThemedText>
            </Pressable>
            <Pressable style={styles.secondaryBtn} onPress={replay}>
              <ThemedText style={styles.secondaryText}>↺ Replay segment</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.loopBtn, loop && styles.loopOn]}
              onPress={() => setLoop((l) => !l)}
            >
              <ThemedText style={loop ? styles.primaryText : styles.secondaryText}>
                Loop {loop ? 'on' : 'off'}
              </ThemedText>
            </Pressable>
          </View>

          <ThemedText type="subtitle">{c.name || c.videoTitle}</ThemedText>
          <ThemedText type="small">
            {c.videoTitle} · {ms(c.startMs)}–{ms(c.endMs)}
          </ThemedText>

          <RecordPanel clipId={c.id} />

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
  container: { padding: 16, gap: 12 },
  playerWrap: { marginHorizontal: -16, backgroundColor: '#000' },
  controls: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  primaryBtn: { backgroundColor: '#208AEF', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: { borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, borderWidth: 1, borderColor: '#9ca3af' },
  secondaryText: { fontWeight: '600' },
  loopBtn: { borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, borderWidth: 1, borderColor: '#9ca3af' },
  loopOn: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  transcriptBox: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 6,
  },
});

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import YoutubePlayer, { type YoutubeIframeRef } from 'react-native-youtube-iframe';
import { clipsApi, videosApi, type TranscriptSegment } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

export default function VideoDetailScreen() {
  const token = useAuthStore((s) => s.token);
  const { id } = useLocalSearchParams<{ id: string }>();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [playing, setPlaying] = useState(false);
  const [currentMs, setCurrentMs] = useState(0);
  const [mode, setMode] = useState<'sentences' | 'full'>('sentences');

  const video = useQuery({
    queryKey: ['video', id],
    queryFn: () => videosApi.get(id),
    enabled: !!token && !!id,
  });

  // Make a one-line clip from a transcript line, then open the clip player (loop + record + AI).
  const makeClip = useMutation({
    mutationFn: (seg: TranscriptSegment) =>
      clipsApi.create({
        videoId: id,
        startMs: seg.startMs,
        endMs: seg.endMs,
        name: seg.text.slice(0, 40),
        tags: [],
      }),
    onSuccess: (clip) => router.push(`/player/${clip.id}`),
  });

  // Poll the player position so we can highlight the line currently being spoken.
  useEffect(() => {
    if (!playing) return;
    const handle = setInterval(async () => {
      const sec = await playerRef.current?.getCurrentTime?.();
      if (typeof sec === 'number') setCurrentMs(sec * 1000);
    }, 300);
    return () => clearInterval(handle);
  }, [playing]);

  const seekToLine = useCallback((seg: TranscriptSegment) => {
    playerRef.current?.seekTo(seg.startMs / 1000, true);
    setCurrentMs(seg.startMs);
    setPlaying(true);
  }, []);

  const lines: TranscriptSegment[] = useMemo(() => {
    const v = video.data;
    if (!v) return [];
    if (mode === 'sentences' && v.sentences.length > 0) return v.sentences;
    return v.transcriptSegments;
  }, [video.data, mode]);

  const activeIndex = useMemo(
    () => lines.findIndex((l) => currentMs >= l.startMs && currentMs < l.endMs),
    [lines, currentMs],
  );

  if (!token) return <Redirect href="/login" />;
  if (video.isPending) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (video.isError || !video.data) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.error}>{t('video.notFound')}</ThemedText>
      </ThemedView>
    );
  }

  const v = video.data;
  const screenW = Dimensions.get('window').width;
  const screenH = Dimensions.get('window').height;
  const portrait = v.orientation === 'PORTRAIT';
  const playerWidth = portrait
    ? Math.min(screenW, Math.round(screenH * 0.5 * (9 / 16)))
    : screenW;
  const height = portrait ? Math.round(playerWidth * (16 / 9)) : Math.round(screenW * (9 / 16));

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        {/* Player */}
        <View style={[styles.playerWrap, portrait && styles.playerWrapPortrait]}>
          <YoutubePlayer
            ref={playerRef}
            height={height}
            width={playerWidth}
            play={playing}
            videoId={v.youtubeId}
            initialPlayerParams={{ rel: false, modestbranding: true }}
            onChangeState={(s: string) => {
              if (s === 'ended') setPlaying(false);
            }}
          />
        </View>

        {/* Controls + script-mode toggle */}
        <View style={styles.bar}>
          <Pressable style={styles.playBtn} onPress={() => setPlaying((p) => !p)}>
            <ThemedText style={styles.playText}>
              {playing ? t('video.pause') : t('video.play')}
            </ThemedText>
          </Pressable>
          <View style={styles.toggle}>
            <Pressable
              style={[styles.toggleItem, mode === 'sentences' && styles.toggleOn]}
              onPress={() => setMode('sentences')}
            >
              <ThemedText type="small" style={mode === 'sentences' ? styles.toggleOnText : undefined}>
                {t('video.sentences')}
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.toggleItem, mode === 'full' && styles.toggleOn]}
              onPress={() => setMode('full')}
            >
              <ThemedText type="small" style={mode === 'full' ? styles.toggleOnText : undefined}>
                {t('video.fullScript')}
              </ThemedText>
            </Pressable>
          </View>
        </View>

        <ThemedText type="small" style={styles.hint}>
          {t('video.tapToPlay')}
        </ThemedText>

        {/* Full transcript — tap a line to play from there; active line highlighted */}
        <FlatList
          data={lines}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const active = index === activeIndex;
            return (
              <View style={[styles.lineRow, active && styles.lineRowActive]}>
                <Pressable style={styles.lineText} onPress={() => seekToLine(item)}>
                  <ThemedText style={active ? styles.lineActiveText : undefined}>{item.text}</ThemedText>
                </Pressable>
                <Pressable
                  style={styles.clipBtn}
                  disabled={makeClip.isPending}
                  onPress={() => makeClip.mutate(item)}
                >
                  <ThemedText type="small" style={styles.clipBtnText}>
                    {t('video.clipLine')}
                  </ThemedText>
                </Pressable>
              </View>
            );
          }}
          ListEmptyComponent={
            <ThemedText type="small" style={styles.empty}>
              {t('video.noTranscript')}
            </ThemedText>
          }
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { color: '#dc2626' },
  playerWrap: { backgroundColor: '#000' },
  playerWrapPortrait: { alignItems: 'center' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  playBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  playText: { color: '#fff', fontWeight: '700' },
  toggle: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    overflow: 'hidden',
  },
  toggleItem: { paddingVertical: 8, paddingHorizontal: 14 },
  toggleOn: { backgroundColor: '#208AEF' },
  toggleOnText: { color: '#fff', fontWeight: '700' },
  hint: { textAlign: 'center', color: '#6b7280', paddingBottom: 6 },
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 6 },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
  },
  lineRowActive: { backgroundColor: 'rgba(32,138,239,0.12)', borderColor: '#208AEF' },
  lineText: { flex: 1 },
  lineActiveText: { fontWeight: '700' },
  clipBtn: {
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#208AEF',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  clipBtnText: { color: '#208AEF' },
  empty: { textAlign: 'center', marginTop: 32 },
});

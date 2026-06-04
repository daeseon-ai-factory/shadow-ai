import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import YoutubePlayer, { type YoutubeIframeRef } from 'react-native-youtube-iframe';
import { analysisApi, clipsApi, type ClipAnalysis } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { RecordPanel } from '@/components/record-panel';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

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

  // The clip's AI analysis (translation / 직독직해 / vocabulary). Poll while PENDING.
  const analysis = useQuery({
    queryKey: ['analysis', clipId],
    queryFn: () => analysisApi.get(clipId),
    enabled: !!token && !!clipId,
    refetchInterval: (q) => (q.state.data?.status === 'PENDING' ? 3000 : false),
  });

  const startSec = clip.data ? Math.floor(clip.data.startMs / 1000) : 0;
  const endMs = clip.data ? clip.data.endMs : 0;

  // Enforce the segment boundary + loop by polling position. The YouTube IFrame's `end` param
  // fires PAUSED (not ENDED) at a mid-video boundary, so relying on onChangeState('ended') never
  // re-loops a short clip. Polling getCurrentTime is what the web player does.
  useEffect(() => {
    if (!playing || !endMs) return;
    const id = setInterval(async () => {
      const t = await playerRef.current?.getCurrentTime?.();
      if (typeof t === 'number' && t * 1000 >= endMs) {
        if (loop) {
          playerRef.current?.seekTo(startSec, true);
        } else {
          setPlaying(false);
        }
      }
    }, 250);
    return () => clearInterval(id);
  }, [playing, loop, endMs, startSec]);

  const onState = useCallback(
    (state: string) => {
      // Natural end of the source video — re-seek if looping.
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
          {clip.error ? (clip.error as Error).message : t('player.clipNotFound')}
        </ThemedText>
      </ThemedView>
    );
  }

  const c = clip.data;
  const screenW = Dimensions.get('window').width;
  const screenH = Dimensions.get('window').height;
  const portrait = c.videoOrientation === 'PORTRAIT';
  // Portrait (Shorts) is 9:16; cap its height to ~55% of the screen so it doesn't overflow.
  const playerWidth = portrait
    ? Math.min(screenW, Math.round(screenH * 0.55 * (9 / 16)))
    : screenW;
  const height = portrait ? Math.round(playerWidth * (16 / 9)) : Math.round(screenW * (9 / 16));

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={[styles.playerWrap, portrait && styles.playerWrapPortrait]}>
            <YoutubePlayer
              ref={playerRef}
              height={height}
              width={playerWidth}
              play={playing}
              videoId={c.youtubeId}
              initialPlayerParams={{ start: startSec, rel: false, modestbranding: true }}
              onChangeState={onState}
            />
          </View>

          <View style={styles.controls}>
            <Pressable style={styles.primaryBtn} onPress={() => setPlaying((p) => !p)}>
              <ThemedText style={styles.primaryText}>{playing ? t('player.pause') : t('player.play')}</ThemedText>
            </Pressable>
            <Pressable style={styles.secondaryBtn} onPress={replay}>
              <ThemedText style={styles.secondaryText}>{t('player.replaySegment')}</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.loopBtn, loop && styles.loopOn]}
              onPress={() => setLoop((l) => !l)}
            >
              <ThemedText style={loop ? styles.primaryText : styles.secondaryText}>
                {loop ? t('player.loopOn') : t('player.loopOff')}
              </ThemedText>
            </Pressable>
          </View>

          <ThemedText type="subtitle">{c.name || c.videoTitle}</ThemedText>
          <ThemedText type="small">
            {c.videoTitle} · {ms(c.startMs)}–{ms(c.endMs)}
          </ThemedText>

          <RecordPanel clipId={c.id} />

          {c.transcript ? (
            <View style={styles.box}>
              <ThemedText type="smallBold">{t('player.transcript')}</ThemedText>
              <ThemedText>{c.transcript}</ThemedText>
            </View>
          ) : null}

          <AnalysisSection data={analysis.data} pending={analysis.isPending} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

/** Sentence-mining payload: Korean translation, 직독직해 chunks, vocabulary, expressions. */
function AnalysisSection({ data, pending }: { data?: ClipAnalysis; pending: boolean }) {
  if (pending) {
    return (
      <View style={styles.box}>
        <ActivityIndicator />
      </View>
    );
  }
  if (!data || data.status === 'FAILED') return null;
  if (data.status === 'PENDING') {
    return (
      <View style={styles.box}>
        <ThemedText type="small">{t('player.analyzing')}</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.gap}>
      {data.primaryTranslation ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.translation')}</ThemedText>
          <ThemedText>{data.primaryTranslation}</ThemedText>
        </View>
      ) : null}

      {data.chunkedTranslation.length > 0 ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.literal')}</ThemedText>
          {data.chunkedTranslation.map((ch, i) => (
            <View key={i} style={styles.chunkRow}>
              <ThemedText style={styles.chunkEn}>{ch.en}</ThemedText>
              <ThemedText type="small">{ch.ko}</ThemedText>
            </View>
          ))}
        </View>
      ) : null}

      {data.vocabulary.length > 0 ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.vocabulary')}</ThemedText>
          {data.vocabulary.map((v, i) => (
            <ThemedText key={i} type="small">
              <ThemedText style={styles.bold}>{v.word}</ThemedText> — {v.meaning}
            </ThemedText>
          ))}
        </View>
      ) : null}

      {data.keyExpressions.length > 0 ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.keyExpressions')}</ThemedText>
          {data.keyExpressions.map((k, i) => (
            <ThemedText key={i} type="small">
              <ThemedText style={styles.bold}>{k.phrase}</ThemedText> — {k.meaning}
            </ThemedText>
          ))}
        </View>
      ) : null}

      {data.prepositionNotes.length > 0 ? (
        <View style={styles.box}>
          <ThemedText type="smallBold">{t('player.prepositions')}</ThemedText>
          {data.prepositionNotes.map((p, i) => (
            <ThemedText key={i} type="small">
              <ThemedText style={styles.bold}>{p.preposition}</ThemedText>{t('player.prepLine', { phrase: p.phrase, sense: p.sense })}
            </ThemedText>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gap: { gap: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { color: '#dc2626' },
  container: { padding: 16, gap: 12 },
  playerWrap: { marginHorizontal: -16, backgroundColor: '#000' },
  playerWrapPortrait: { marginHorizontal: 0, alignItems: 'center', borderRadius: 12, overflow: 'hidden' },
  controls: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  primaryBtn: { backgroundColor: '#208AEF', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: { borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, borderWidth: 1, borderColor: '#9ca3af' },
  secondaryText: { fontWeight: '600' },
  loopBtn: { borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, borderWidth: 1, borderColor: '#9ca3af' },
  loopOn: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  box: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 6,
  },
  bold: { fontWeight: '700' },
  chunkRow: { gap: 1, marginBottom: 4 },
  chunkEn: { fontFamily: 'Menlo' },
});

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import YoutubePlayer, { type YoutubeIframeRef } from 'react-native-youtube-iframe';
import { analysisApi, clipsApi, type ClipAnalysis } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ChunkLadder } from '@/components/chunk-ladder';
import { DictationDrill } from '@/components/dictation-drill';
import { RecordPanel } from '@/components/record-panel';
import { ScenarioQuiz } from '@/components/scenario-quiz';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

function ms(msVal: number) {
  const s = Math.round(msVal / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// The learning modes, in pedagogical order: hear it → see the order → produce it → say it → reference.
type DrillTab = 'decode' | 'reorder' | 'produce' | 'shadow' | 'analysis';

export default function ClipPlayerScreen() {
  const token = useAuthStore((s) => s.token);
  const { clipId } = useLocalSearchParams<{ clipId: string }>();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [tab, setTab] = useState<DrillTab>('decode');

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
  // Pinned at the top now, so cap portrait (Shorts) harder (~42% height) to leave room for the
  // drill below; landscape stays 16:9.
  const playerWidth = portrait
    ? Math.min(screenW, Math.round(screenH * 0.42 * (9 / 16)))
    : screenW;
  const height = portrait ? Math.round(playerWidth * (16 / 9)) : Math.round(screenW * (9 / 16));

  const chunks = analysis.data?.chunkedTranslation ?? [];
  const scenario = analysis.data?.practiceScenario;
  const analysisPending = analysis.isPending || analysis.data?.status === 'PENDING';

  const TABS: { key: DrillTab; label: string }[] = [
    { key: 'decode', label: t('player.tabDecode') },
    { key: 'reorder', label: t('player.tabReorder') },
    { key: 'produce', label: t('player.tabProduce') },
    { key: 'shadow', label: t('player.tabShadow') },
    { key: 'analysis', label: t('player.tabAnalysis') },
  ];

  const renderTab = () => {
    switch (tab) {
      case 'decode':
        return c.transcript ? (
          <DictationDrill embedded transcript={c.transcript} onReplayAudio={replay} />
        ) : (
          <TabMessage text={t('player.tabEmpty')} />
        );
      case 'reorder':
        if (chunks.length >= 2) {
          return <ChunkLadder embedded chunks={chunks} clipId={c.id} onReplayAudio={replay} />;
        }
        return <TabMessage text={analysisPending ? t('player.tabPending') : t('player.tabEmpty')} />;
      case 'produce':
        if (scenario) return <ScenarioQuiz scenario={scenario} />;
        return <TabMessage text={analysisPending ? t('player.tabPending') : t('player.tabEmpty')} />;
      case 'shadow':
        return <RecordPanel clipId={c.id} targetTranscript={c.transcript} />;
      case 'analysis':
        return <AnalysisSection data={analysis.data} pending={analysis.isPending} />;
      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        {/* Pinned header — the video never scrolls away while you drill below. */}
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

        <View style={styles.header}>
          <View style={styles.controls}>
            <Pressable style={styles.primaryBtn} onPress={() => setPlaying((p) => !p)}>
              <ThemedText style={styles.primaryText}>{playing ? t('player.pause') : t('player.play')}</ThemedText>
            </Pressable>
            <Pressable style={styles.secondaryBtn} onPress={replay}>
              <ThemedText style={styles.secondaryText}>{t('player.replaySegment')}</ThemedText>
            </Pressable>
            <Pressable style={[styles.loopBtn, loop && styles.loopOn]} onPress={() => setLoop((l) => !l)}>
              <ThemedText style={loop ? styles.primaryText : styles.secondaryText}>
                {loop ? t('player.loopOn') : t('player.loopOff')}
              </ThemedText>
            </Pressable>
          </View>
          <ThemedText type="small" numberOfLines={1}>
            {c.name || c.videoTitle} · {ms(c.startMs)}–{ms(c.endMs)}
          </ThemedText>
        </View>

        {/* Mode tabs — pick one drill at a time instead of an endless stack. */}
        <View style={styles.tabBar}>
          {TABS.map((td) => {
            const active = tab === td.key;
            return (
              <Pressable key={td.key} style={styles.tab} onPress={() => setTab(td.key)}>
                <ThemedText style={[styles.tabLabel, active && styles.tabLabelActive]}>{td.label}</ThemedText>
                <View style={[styles.tabUnderline, active && styles.tabUnderlineActive]} />
              </Pressable>
            );
          })}
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            {renderTab()}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

/** Empty / pending placeholder shown inside a tab when that drill's data isn't available. */
function TabMessage({ text }: { text: string }) {
  return (
    <View style={styles.tabMsg}>
      <ThemedText type="small" style={styles.tabMsgText}>{text}</ThemedText>
    </View>
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
  if (!data || data.status === 'FAILED') return <TabMessage text={t('player.tabEmpty')} />;
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
  playerWrap: { backgroundColor: '#000' },
  playerWrapPortrait: { alignItems: 'center' },
  header: { paddingHorizontal: 16, paddingTop: 12, gap: 8 },
  controls: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  primaryBtn: { backgroundColor: '#208AEF', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, borderWidth: 1, borderColor: '#9ca3af' },
  secondaryText: { fontWeight: '600' },
  loopBtn: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, borderWidth: 1, borderColor: '#9ca3af' },
  loopOn: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginTop: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#9ca3af',
  },
  tab: { flex: 1, alignItems: 'center', paddingTop: 10, gap: 8 },
  tabLabel: { fontWeight: '600', color: '#9ca3af' },
  tabLabelActive: { color: '#208AEF' },
  tabUnderline: { height: 2, alignSelf: 'stretch', backgroundColor: 'transparent' },
  tabUnderlineActive: { backgroundColor: '#208AEF' },
  content: { padding: 16, gap: 12 },
  tabMsg: { padding: 24, alignItems: 'center' },
  tabMsgText: { color: '#9ca3af', textAlign: 'center' },
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

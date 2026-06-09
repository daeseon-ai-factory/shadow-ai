import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { REFLEX_CLUSTERS, INTERVIEW_DECK_COUNTS, INTERVIEW_CODE_CARDS, BACKEND_CODE_CARDS, PHRASE_DECK_COUNTS } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { type IvMode } from '@/components/interview-drill';
import { type ScopeKind } from '@/lib/interview-deck';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const MODES: { id: IvMode; label: string }[] = [
  { id: 'shadow', label: 'iv.modeShadow' },
  { id: 'produce', label: 'iv.modeProduce' },
  { id: 'respond', label: 'iv.modeRespond' },
];

const CODE_CATS: { cat: string; label: string }[] = [
  { cat: 'all', label: 'iv.codeAll' },
  { cat: 'ds', label: 'iv.ds' },
  { cat: 'algo', label: 'iv.algo' },
  { cat: 'pattern', label: 'iv.pattern' },
  { cat: 'method', label: 'iv.method' },
  { cat: 'design', label: 'iv.design' },
  { cat: 'backend', label: 'iv.codeBackend' },
];
const ALL_CODE_CARDS = [...INTERVIEW_CODE_CARDS, ...BACKEND_CODE_CARDS];
const codeCount = (cat: string) =>
  cat === 'all' ? ALL_CODE_CARDS.length : ALL_CODE_CARDS.filter((c) => c.category === cat).length;

export default function InterviewScreen() {
  const token = useAuthStore((s) => s.token);
  const [mode, setMode] = useState<IvMode>('produce');

  if (!token) return <Redirect href="/login" />;

  const startCode = (cat: string) => router.push({ pathname: '/code-run', params: { cat } });
  const startSpeak = (scope: ScopeKind, cluster?: string, speed?: boolean) =>
    router.push({
      pathname: '/interview-run',
      params: { mode, scope, ...(cluster ? { cluster } : {}), ...(speed ? { speed: '1' } : {}) },
    });

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="small">{t('iv.subtitle')}</ThemedText>

          {/* ── MAIN: look at real code → say the core in English → model answer ── */}
          <ThemedText type="smallBold" style={styles.section}>{t('iv.codeSection')}</ThemedText>
          <View style={styles.grid}>
            {CODE_CATS.map((c) => (
              <Pressable
                key={c.cat}
                style={[styles.tile, c.cat === 'all' && styles.tileMain]}
                onPress={() => startCode(c.cat)}
              >
                <ThemedText type="smallBold" style={c.cat === 'all' ? styles.tileMainText : undefined}>
                  💻 {t(c.label)}
                </ThemedText>
                <ThemedText type="small" style={c.cat === 'all' ? styles.tileMainText : undefined}>
                  {codeCount(c.cat)}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          {/* ── Speaking-card drills: pick a mode, then a deck ── */}
          <ThemedText type="smallBold" style={styles.section}>{t('iv.mode')}</ThemedText>
          <View style={styles.modeRow}>
            {MODES.map((m) => (
              <Pressable
                key={m.id}
                style={[styles.modeChip, mode === m.id && styles.modeChipOn]}
                onPress={() => setMode(m.id)}
              >
                <ThemedText style={mode === m.id ? styles.modeChipOnText : styles.modeChipText}>
                  {t(m.label)}
                </ThemedText>
              </Pressable>
            ))}
          </View>
          <ThemedText type="small" style={styles.modeHint}>{t(`iv.modeHint.${mode}`)}</ThemedText>

          <Pressable style={styles.featured} onPress={() => startSpeak('due')}>
            <ThemedText type="smallBold">{t('iv.modeDue')} →</ThemedText>
            <ThemedText type="small">{t('iv.modeDueSub')}</ThemedText>
          </Pressable>

          {/* Training intensity: speed pressure, weak-card repair, sustained 60s speech. */}
          <View style={styles.modeRow}>
            <Pressable style={styles.trainBtn} onPress={() => startSpeak('due', undefined, true)}>
              <ThemedText type="smallBold">⚡ {t('iv.speed')}</ThemedText>
            </Pressable>
            <Pressable style={styles.trainBtn} onPress={() => startSpeak('weak')}>
              <ThemedText type="smallBold">🎯 {t('iv.weak')}</ThemedText>
            </Pressable>
            <Pressable style={styles.trainBtn} onPress={() => router.push('/speech-run')}>
              <ThemedText type="smallBold">🗣 {t('iv.speech')}</ThemedText>
            </Pressable>
          </View>

          <Pressable style={styles.coreBtn} onPress={() => startSpeak('core')}>
            <ThemedText style={styles.coreText}>
              {t('iv.modeCore', { n: INTERVIEW_DECK_COUNTS.core })} →
            </ThemedText>
          </Pressable>

          <View style={styles.grid}>
            <Pressable style={styles.tile} onPress={() => startSpeak('concept')}>
              <ThemedText type="smallBold">{t('iv.concepts')}</ThemedText>
              <ThemedText type="small">{INTERVIEW_DECK_COUNTS.concept}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('scenario')}>
              <ThemedText type="smallBold">{t('iv.scenarios')}</ThemedText>
              <ThemedText type="small">{INTERVIEW_DECK_COUNTS.scenario}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('frame')}>
              <ThemedText type="smallBold">{t('iv.frames')}</ThemedText>
              <ThemedText type="small">{INTERVIEW_DECK_COUNTS.frame}</ThemedText>
            </Pressable>
          </View>

          <ThemedText type="smallBold" style={styles.section}>{t('iv.practicalSection')}</ThemedText>
          <View style={styles.grid}>
            <Pressable style={styles.tile} onPress={() => startSpeak('phrasal')}>
              <ThemedText type="smallBold">{t('iv.phrasal')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.phrasal}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('expr')}>
              <ThemedText type="smallBold">{t('iv.expr')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.expr}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('codenarr')}>
              <ThemedText type="smallBold">{t('iv.codenarr')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.code}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('ui')}>
              <ThemedText type="smallBold">{t('iv.ui')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.ui}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('backend')}>
              <ThemedText type="smallBold">{t('iv.backend')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.backend}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('sd')}>
              <ThemedText type="smallBold">{t('iv.sysdesign')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.sd}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('pair')}>
              <ThemedText type="smallBold">{t('iv.pairTalk')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.pair}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('clarify')}>
              <ThemedText type="smallBold">{t('iv.clarify')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.clarify}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('connector')}>
              <ThemedText type="smallBold">{t('iv.connector')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.connectors}</ThemedText>
            </Pressable>
            <Pressable style={styles.tile} onPress={() => startSpeak('chain')}>
              <ThemedText type="smallBold">🔗 {t('iv.chain')}</ThemedText>
              <ThemedText type="small">{PHRASE_DECK_COUNTS.connectors}</ThemedText>
            </Pressable>
          </View>

          <ThemedText type="smallBold" style={styles.section}>{t('iv.sectionReflex')}</ThemedText>
          <View style={styles.chips}>
            {REFLEX_CLUSTERS.map((cl) => (
              <Pressable key={cl.id} style={styles.chip} onPress={() => startSpeak('cluster', cl.id)}>
                <ThemedText type="small">
                  {cl.labelKo} · {cl.cards.length}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 24, gap: 10, paddingBottom: 36 },
  section: { marginTop: 14, opacity: 0.55, letterSpacing: 0.5 },
  modeRow: { flexDirection: 'row', gap: 8 },
  modeChip: {
    flex: 1,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    paddingVertical: 10,
    alignItems: 'center',
  },
  modeChipOn: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  modeChipText: { fontWeight: '600', fontSize: 13 },
  modeChipOnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  modeHint: { opacity: 0.7 },
  featured: {
    padding: 18,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    gap: 4,
    marginTop: 4,
  },
  coreBtn: { backgroundColor: '#208AEF', borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  trainBtn: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    paddingVertical: 12,
    alignItems: 'center',
  },
  coreText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    gap: 3,
    alignItems: 'center',
  },
  tileMain: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  tileMainText: { color: '#fff' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

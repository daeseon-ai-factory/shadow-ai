import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ApiError,
  clipsApi,
  CORE_OPS,
  transformKey,
  transformsApi,
  TRANSFORM_OPS,
  type SentenceTransformSet,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DrillRunner, type DrillItem } from '@/components/drill-runner';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

// Mon/Wed/Fri also drill the 5 extra transforms; other days are core-10 only.
function includesExtraToday(): boolean {
  return [1, 3, 5].includes(new Date().getDay());
}

// Split a clip transcript into candidate base sentences (drop fragments/questions-only chunks).
function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 12 && s.length <= 200 && s.split(' ').length >= 4 && /[a-zA-Z]/.test(s));
}

// Seed candidates come straight from the learner's mined clips (one list call — no per-clip fan-out).
async function fetchSeedCandidates(): Promise<string[]> {
  const page = await clipsApi.list({ size: 12 });
  const seen = new Set<string>();
  const out: string[] = [];
  for (const c of page.items) {
    if (!c.transcript) continue;
    for (const s of splitSentences(c.transcript)) {
      const k = s.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(s);
      if (out.length >= 12) return out;
    }
  }
  return out;
}

type Mode = 'pick' | 'drill' | 'check';

export default function SentenceGymScreen() {
  const token = useAuthStore((s) => s.token);
  const [text, setText] = useState('');
  const [mode, setMode] = useState<Mode>('pick');

  const seeds = useQuery({
    queryKey: ['gym-seeds'],
    queryFn: fetchSeedCandidates,
    enabled: !!token,
  });

  const gen = useMutation({
    mutationFn: (base: string) => transformsApi.generate(base),
  });

  const set = gen.data ?? null;

  if (!token) return <Redirect href="/login" />;

  // DRILL mode — hand the core (+ extra, on gating days) transforms to the shared self-grade runner.
  if (mode === 'drill' && set) {
    const ops = includesExtraToday() ? TRANSFORM_OPS : CORE_OPS;
    const items: DrillItem[] = set.transforms
      .filter((tr) => ops.includes(tr.op))
      .map((tr) => ({
        key: transformKey(set.seedId, tr.op, 0),
        title: set.baseSentence,
        subtitle: tr.label,
        cue: tr.koreanGloss,
        model: tr.english,
      }));
    return <DrillRunner key={set.seedId} items={items} />;
  }

  // CHECK mode — optional, opt-in AI check over each transform.
  if (mode === 'check' && set) {
    return <CheckMode set={set} onExit={() => setMode('pick')} />;
  }

  const errorMessage =
    gen.error instanceof ApiError ? gen.error.message : gen.error ? t('gym.generateFailed') : null;
  const coreCount = includesExtraToday() ? set?.transforms.length ?? 0 : Math.min(set?.transforms.length ?? 0, CORE_OPS.length);

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <ThemedText type="title">{t('gym.title')}</ThemedText>
            <ThemedText type="small">{t('gym.subtitle')}</ThemedText>

            {!set ? (
              <>
                <ThemedText type="smallBold" style={styles.section}>{t('gym.inputLabel')}</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder={t('gym.inputPlaceholder')}
                  placeholderTextColor="#9ca3af"
                  multiline
                  value={text}
                  onChangeText={setText}
                />
                {errorMessage && <ThemedText style={styles.error}>{errorMessage}</ThemedText>}
                <Pressable
                  style={[styles.primaryBtn, (!text.trim() || gen.isPending) && styles.disabled]}
                  disabled={!text.trim() || gen.isPending}
                  onPress={() => gen.mutate(text.trim())}
                >
                  {gen.isPending ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ThemedText style={styles.primaryText}>{t('gym.generate')}</ThemedText>
                  )}
                </Pressable>

                <ThemedText type="smallBold" style={styles.section}>{t('gym.fromClips')}</ThemedText>
                {seeds.isPending && <ActivityIndicator />}
                {seeds.data && seeds.data.length === 0 && (
                  <ThemedText type="small">{t('gym.noClipSeeds')}</ThemedText>
                )}
                {seeds.data?.map((s, i) => (
                  <Pressable key={i} style={styles.seedChip} onPress={() => setText(s)}>
                    <ThemedText type="small">{s}</ThemedText>
                  </Pressable>
                ))}
              </>
            ) : (
              <View style={styles.gap}>
                <View style={styles.baseBox}>
                  <ThemedText type="small">{t('gym.ready')}</ThemedText>
                  <ThemedText style={styles.base}>{set.baseSentence}</ThemedText>
                </View>
                <ThemedText type="small">
                  {t('gym.transformCount', { n: coreCount })}
                  {includesExtraToday() ? `  ·  ${t('gym.extraToday')}` : ''}
                </ThemedText>
                <Pressable style={styles.primaryBtn} onPress={() => setMode('drill')}>
                  <ThemedText style={styles.primaryText}>{t('gym.startDrill')}</ThemedText>
                </Pressable>
                <Pressable style={styles.secondaryBtn} onPress={() => setMode('check')}>
                  <ThemedText style={styles.secondaryText}>{t('gym.aiCheckMode')}</ThemedText>
                </Pressable>
                <Pressable
                  style={styles.linkBtn}
                  onPress={() => {
                    gen.reset();
                    setText('');
                  }}
                >
                  <ThemedText style={styles.linkText}>{t('gym.newSentence')}</ThemedText>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

/** Opt-in AI check: type your version of each transform, get ok/feedback/better from the model. */
function CheckMode({ set, onExit }: { set: SentenceTransformSet; onExit: () => void }) {
  const [pos, setPos] = useState(0);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);

  const done = pos >= set.transforms.length;
  const current = done ? null : set.transforms[pos];

  const check = useMutation({
    mutationFn: () => transformsApi.check(current!.op, set.baseSentence, current!.english, text.trim()),
  });

  if (done || !current) {
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={[styles.flex, styles.center]}>
          <ThemedText type="title">{t('gym.checkDone')}</ThemedText>
          <Pressable style={styles.primaryBtn} onPress={onExit}>
            <ThemedText style={styles.primaryText}>{t('gym.home')}</ThemedText>
          </Pressable>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const next = () => {
    setPos((p) => p + 1);
    setText('');
    setRevealed(false);
    check.reset();
  };

  const fb = check.data;
  const advanced = fb != null || revealed;
  const errorMessage =
    check.error instanceof ApiError ? check.error.message : check.error ? t('gym.checkFailed') : null;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <ThemedText type="small">
              {t('gym.progress', { current: pos + 1, total: set.transforms.length })}
            </ThemedText>
            <View style={styles.frameBox}>
              <ThemedText type="small" style={styles.subtitle}>{current.label}</ThemedText>
              <ThemedText style={styles.base}>{set.baseSentence}</ThemedText>
            </View>
            <View style={styles.cueBox}>
              <ThemedText style={styles.cue}>{current.koreanGloss}</ThemedText>
            </View>

            <TextInput
              style={styles.input}
              placeholder={t('gym.checkPlaceholder')}
              placeholderTextColor="#9ca3af"
              multiline
              value={text}
              onChangeText={setText}
            />

            {errorMessage && <ThemedText style={styles.error}>{errorMessage}</ThemedText>}

            {fb && (
              <View style={[styles.fbBox, fb.ok ? styles.fbOk : styles.fbWork]}>
                <ThemedText type="smallBold">{fb.ok ? t('gym.good') : t('gym.needsWork')}</ThemedText>
                <ThemedText type="small">{fb.feedback}</ThemedText>
                {fb.better ? (
                  <ThemedText style={styles.better}>{t('gym.better', { text: fb.better })}</ThemedText>
                ) : null}
              </View>
            )}

            {revealed && !fb && (
              <View style={styles.modelBox}>
                <ThemedText style={styles.model}>{current.english}</ThemedText>
              </View>
            )}

            {!advanced ? (
              <View style={styles.row}>
                <Pressable
                  style={[styles.primaryBtn, (!text.trim() || check.isPending) && styles.disabled]}
                  disabled={!text.trim() || check.isPending}
                  onPress={() => check.mutate()}
                >
                  {check.isPending ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ThemedText style={styles.primaryText}>{t('gym.check')}</ThemedText>
                  )}
                </Pressable>
                <Pressable style={styles.secondaryBtn} onPress={() => setRevealed(true)}>
                  <ThemedText style={styles.secondaryText}>{t('gym.reveal')}</ThemedText>
                </Pressable>
              </View>
            ) : (
              <Pressable style={styles.primaryBtn} onPress={next}>
                <ThemedText style={styles.primaryText}>{t('gym.next')}</ThemedText>
              </Pressable>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  container: { padding: 24, gap: 12 },
  gap: { gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  section: { marginTop: 8 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    minHeight: 90,
    textAlignVertical: 'top',
    color: '#111827',
    backgroundColor: '#fff',
  },
  error: { color: '#dc2626' },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryBtn: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  secondaryText: { fontWeight: '600' },
  disabled: { opacity: 0.5 },
  linkBtn: { paddingVertical: 10, alignItems: 'center' },
  linkText: { color: '#208AEF', fontWeight: '600' },
  seedChip: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 12,
  },
  baseBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
    gap: 4,
  },
  base: { fontSize: 17, fontFamily: 'Menlo' },
  frameBox: { alignItems: 'center', gap: 6, marginTop: 4 },
  subtitle: { textTransform: 'uppercase', letterSpacing: 1 },
  cueBox: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    alignItems: 'center',
  },
  cue: { fontSize: 20, textAlign: 'center' },
  fbBox: { borderRadius: 12, borderWidth: 1, padding: 14, gap: 6 },
  fbOk: { borderColor: '#10b98155', backgroundColor: '#10b98111' },
  fbWork: { borderColor: '#f59e0b55', backgroundColor: '#f59e0b11' },
  better: { fontStyle: 'italic' },
  modelBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#208AEF55',
    backgroundColor: '#208AEF11',
    padding: 16,
    alignItems: 'center',
  },
  model: { fontSize: 17, fontFamily: 'Menlo', textAlign: 'center' },
});

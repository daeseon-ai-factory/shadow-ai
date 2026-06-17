import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, type Href } from 'expo-router';
import { PATTERNS, COLLOCATIONS, PARTICLE_GROUPS, PREP_GROUPS, REASONING_PREP_GROUPS, ARGUMENT_GROUPS, TRAP_CARDS, WORKSHOP_COUNTS } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const patternCount = PATTERNS.reduce((n, p) => n + p.items.length, 0);

type Tool = { href: Href; title: string; sub: string; icon: string };

/**
 * Practice hub. Used to dump every tool + every phrasal chip on one screen — overwhelming. Now it
 * leads with 3 recommended sessions and tucks the full toolbox + the advanced "workshop" chips behind
 * a single "More practice" toggle, so the first thing you see is a short, clear choice.
 */
export default function PracticeMenuScreen() {
  const token = useAuthStore((s) => s.token);
  const [showMore, setShowMore] = useState(false);
  if (!token) return <Redirect href="/login" />;

  const recommended: Tool[] = [
    { href: '/weak', title: t('home.weakSpots'), sub: t('home.weakSpotsSub'), icon: '🎯' },
    { href: '/pattern-run', title: t('home.patternDrill'), sub: t('home.patternDrillSub', { n: patternCount }), icon: '🧱' },
    { href: '/gym', title: t('home.gym'), sub: t('home.gymSub'), icon: '🏋️' },
  ];
  const moreTools: Tool[] = [
    { href: '/collocations', title: t('home.collocations'), sub: t('home.collocationsSub', { n: COLLOCATIONS.length }), icon: '🔗' },
    { href: '/compose', title: t('home.composeCheck'), sub: t('home.composeCheckSub'), icon: '✍️' },
    { href: '/prepositions', title: t('home.prepositions'), sub: t('home.prepositionsSub'), icon: '🧭' },
  ];

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="smallBold" style={styles.section}>{t('practice.recommended')}</ThemedText>
          {recommended.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}

          <Pressable style={styles.moreToggle} onPress={() => setShowMore((v) => !v)} accessibilityRole="button">
            <ThemedText type="smallBold" style={styles.moreText}>
              {t('practice.more')}  {showMore ? '⌃' : '⌄'}
            </ThemedText>
          </Pressable>

          {showMore && (
            <>
              {moreTools.map((tool) => (
                <ToolCard key={tool.title} tool={tool} />
              ))}

              {/* 💼 실무 연습장: dev collocations + the particle/preposition/argument phrasal systems. */}
              <ThemedText type="smallBold" style={styles.section}>{t('practice.workshop')}</ThemedText>
              <Pressable
                style={[styles.card, styles.featured]}
                onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'collocation' } })}
              >
                <ThemedText style={styles.icon}>💼</ThemedText>
                <View style={styles.cardBody}>
                  <ThemedText type="smallBold">{t('practice.devColloc')}</ThemedText>
                  <ThemedText type="small" style={styles.sub}>{t('practice.devCollocSub', { n: WORKSHOP_COUNTS.collocations })}</ThemedText>
                </View>
                <ThemedText style={styles.chev}>›</ThemedText>
              </Pressable>

              <ThemedText type="small" style={styles.sub}>{t('practice.prepHint')}</ThemedText>
              <View style={styles.chips}>
                {[...PREP_GROUPS, ...REASONING_PREP_GROUPS].map((g) => (
                  <Pressable
                    key={`pr-${g.particle}`}
                    style={[styles.chip, styles.prepChip]}
                    onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'prep', cluster: g.particle } })}
                  >
                    <ThemedText type="small">{g.particle} · {g.items.length}</ThemedText>
                  </Pressable>
                ))}
              </View>

              <Pressable
                style={[styles.card, styles.trapCard]}
                onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'trap' } })}
              >
                <ThemedText style={styles.icon}>🚨</ThemedText>
                <View style={styles.cardBody}>
                  <ThemedText type="smallBold">{t('practice.traps')}</ThemedText>
                  <ThemedText type="small" style={styles.sub}>{t('practice.trapsSub', { n: TRAP_CARDS.length })}</ThemedText>
                </View>
                <ThemedText style={styles.chev}>›</ThemedText>
              </Pressable>

              <ThemedText type="small" style={styles.sub}>{t('practice.argHint')}</ThemedText>
              <View style={styles.chips}>
                {ARGUMENT_GROUPS.map((g) => (
                  <Pressable
                    key={`ag-${g.fn}`}
                    style={[styles.chip, styles.argChip]}
                    onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'argument', cluster: g.fn } })}
                  >
                    <ThemedText type="small">{g.labelKo} · {g.items.length}</ThemedText>
                  </Pressable>
                ))}
              </View>

              <ThemedText type="small" style={styles.sub}>{t('practice.particleHint')}</ThemedText>
              <View style={styles.chips}>
                {PARTICLE_GROUPS.map((g) => (
                  <Pressable
                    key={g.particle}
                    style={styles.chip}
                    onPress={() => router.push({ pathname: '/interview-run', params: { mode: 'produce', scope: 'particle', cluster: g.particle } })}
                  >
                    <ThemedText type="small">{g.particle} · {g.items.length}+</ThemedText>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Pressable style={styles.card} onPress={() => router.push(tool.href)} accessibilityRole="button" accessibilityLabel={tool.title}>
      <ThemedText style={styles.icon}>{tool.icon}</ThemedText>
      <View style={styles.cardBody}>
        <ThemedText type="smallBold">{tool.title}</ThemedText>
        <ThemedText type="small" style={styles.sub} numberOfLines={1}>{tool.sub}</ThemedText>
      </View>
      <ThemedText style={styles.chev}>›</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 16, gap: 10, paddingBottom: 32 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af77',
    padding: 14,
  },
  icon: { fontSize: 22 },
  cardBody: { flex: 1, gap: 2 },
  sub: { color: '#6b7280' },
  chev: { color: '#9ca3af', fontSize: 22 },
  section: { marginTop: 6, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.7 },
  moreToggle: { alignSelf: 'flex-start', paddingVertical: 12, paddingHorizontal: 4, marginTop: 4 },
  moreText: { color: '#208AEF' },
  featured: { borderColor: '#208AEF', backgroundColor: '#208AEF11' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#208AEF55',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  prepChip: { borderColor: '#16a34a88' },
  argChip: { borderColor: '#d9770688' },
  trapCard: { borderColor: '#dc2626', backgroundColor: '#dc262611' },
});

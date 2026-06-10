import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, type Href } from 'expo-router';
import { PATTERNS, COLLOCATIONS } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const patternCount = PATTERNS.reduce((n, p) => n + p.items.length, 0);

/**
 * Practice tab = the menu of ALL practice tools (it used to render only the pattern drill, hiding
 * the rest behind home cards — "6개 섹션 다 보이게"). Each tool is a pushed route.
 */
export default function PracticeMenuScreen() {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Redirect href="/login" />;

  const tools: { href: Href; title: string; sub: string; icon: string }[] = [
    { href: '/pattern-run', title: t('home.patternDrill'), sub: t('home.patternDrillSub', { n: patternCount }), icon: '🧱' },
    { href: '/collocations', title: t('home.collocations'), sub: t('home.collocationsSub', { n: COLLOCATIONS.length }), icon: '🔗' },
    { href: '/compose', title: t('home.composeCheck'), sub: t('home.composeCheckSub'), icon: '✍️' },
    { href: '/weak', title: t('home.weakSpots'), sub: t('home.weakSpotsSub'), icon: '🎯' },
    { href: '/prepositions', title: t('home.prepositions'), sub: t('home.prepositionsSub'), icon: '🧭' },
    { href: '/gym', title: t('home.gym'), sub: t('home.gymSub'), icon: '🏋️' },
  ];

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          {tools.map((tool) => (
            <Pressable key={tool.title} style={styles.card} onPress={() => router.push(tool.href)}>
              <ThemedText style={styles.icon}>{tool.icon}</ThemedText>
              <View style={styles.cardBody}>
                <ThemedText type="smallBold">{tool.title}</ThemedText>
                <ThemedText type="small" style={styles.sub}>{tool.sub}</ThemedText>
              </View>
              <ThemedText style={styles.chev}>›</ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
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
});

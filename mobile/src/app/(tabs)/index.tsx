import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useQuery } from '@tanstack/react-query';
import { authApi, COLLOCATIONS } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

const appIcon = require('@/assets/images/icon.png');
type SymbolName = SymbolViewProps['name'];

export default function HomeScreen() {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);
  const theme = useTheme();

  const me = useQuery({ queryKey: ['me'], queryFn: () => authApi.me(), enabled: !!token });

  if (!hydrated) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (!token) return <Redirect href="/login" />;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.brandRow}>
            <Image source={appIcon} style={styles.brandIcon} />
            <View style={styles.brandCopy}>
              <ThemedText style={[styles.brandEyebrow, { color: theme.primary }]}>Mimi</ThemedText>
              <ThemedText type="title" style={styles.brandTitle}>
                {me.data ? t('home.welcome', { name: me.data.displayName }) : 'Mimi'}
              </ThemedText>
            </View>
          </View>

          {me.isPending && <ActivityIndicator style={styles.gap} />}
          {me.isError && (
            <ThemedText style={styles.error}>{(me.error as Error).message}</ThemedText>
          )}
          {me.data && (
            <View style={[styles.accountCard, { borderColor: theme.border, backgroundColor: theme.surfaceRaised }]}>
              <View style={me.data.plan === 'pro' ? styles.proBadge : styles.freeBadge}>
                <ThemedText style={styles.badgeText}>
                  {me.data.plan === 'pro' ? t('home.planPro') : t('home.planFree')}
                </ThemedText>
              </View>
              <View style={styles.accountText}>
                <ThemedText type="smallBold" numberOfLines={1}>
                  {me.data.email}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
                  {t('home.heroSub')}
                </ThemedText>
              </View>
            </View>
          )}

          <View style={[styles.hero, { backgroundColor: theme.primary }]}>
            <View style={styles.heroText}>
              <ThemedText style={styles.heroKicker}>{t('home.todaySection')}</ThemedText>
              <ThemedText style={styles.heroTitle}>{t('home.heroTitle')}</ThemedText>
              <ThemedText style={styles.heroSub}>{t('home.heroSub')}</ThemedText>
            </View>
            <Pressable style={styles.heroButton} onPress={() => router.push('/gym')}>
              <SymbolView
                name={{ ios: 'waveform', android: 'graphic_eq', web: 'graphic_eq' }}
                size={18}
                weight="bold"
                tintColor="#096AE8"
              />
              <ThemedText style={styles.heroButtonText}>{t('home.heroCta')}</ThemedText>
            </Pressable>
          </View>

          <View style={styles.quickRow}>
            <QuickCard
              icon={{ ios: 'arrow.triangle.2.circlepath', android: 'sync', web: 'sync' }}
              title={t('home.review')}
              sub={t('home.reviewSub')}
              onPress={() => router.push('/review')}
              tone="accent"
            />
            <QuickCard
              icon={{ ios: 'play.rectangle.fill', android: 'smart_display', web: 'smart_display' }}
              title={t('home.videos')}
              sub={t('home.videosSub')}
              onPress={() => router.push('/videos')}
              tone="primary"
            />
          </View>

          <SectionLabel label={t('home.toolsSection')} />
          <View style={styles.grid}>
            <GridCard
              icon={{ ios: 'textformat.abc', android: 'abc', web: 'abc' }}
              title={t('home.collocations')}
              sub={t('home.collocationsSub', { n: COLLOCATIONS.length })}
              onPress={() => router.push('/collocations')}
            />
            <GridCard
              icon={{ ios: 'pencil.and.scribble', android: 'edit_note', web: 'edit_note' }}
              title={t('home.composeCheck')}
              sub={t('home.composeCheckSub')}
              onPress={() => router.push('/compose')}
            />
            <GridCard
              icon={{ ios: 'target', android: 'adjust', web: 'adjust' }}
              title={t('home.weakSpots')}
              sub={t('home.weakSpotsSub')}
              onPress={() => router.push('/weak')}
            />
            <GridCard
              icon={{ ios: 'point.3.connected.trianglepath.dotted', android: 'hub', web: 'hub' }}
              title={t('home.prepositions')}
              sub={t('home.prepositionsSub')}
              onPress={() => router.push('/prepositions')}
            />
          </View>

          <SectionLabel label={t('home.contentSection')} />
          <View style={styles.grid}>
            <GridCard
              icon={{ ios: 'rectangle.stack.fill', android: 'view_carousel', web: 'view_carousel' }}
              title={t('home.library')}
              sub={t('home.librarySub')}
              onPress={() => router.push('/library')}
            />
            <GridCard
              icon={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
              title={t('home.discover')}
              sub={t('home.discoverSub')}
              onPress={() => router.push('/discover')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <View style={styles.sectionRow}>
      <View style={styles.sectionRule} />
      <ThemedText type="smallBold" style={styles.section}>
        {label}
      </ThemedText>
    </View>
  );
}

function QuickCard({
  icon,
  title,
  sub,
  onPress,
  tone,
}: {
  icon: SymbolName;
  title: string;
  sub: string;
  onPress: () => void;
  tone: 'primary' | 'accent';
}) {
  const theme = useTheme();
  const color = tone === 'primary' ? theme.primary : theme.accent;
  const backgroundColor = tone === 'primary' ? theme.primarySoft : theme.accentSoft;

  return (
    <Pressable style={[styles.quickCard, { backgroundColor }]} onPress={onPress}>
      <View style={[styles.quickIcon, { backgroundColor: theme.surfaceRaised }]}>
        <SymbolView name={icon} size={20} weight="bold" tintColor={color} />
      </View>
      <View style={styles.quickText}>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {sub}
        </ThemedText>
      </View>
    </Pressable>
  );
}

function GridCard({
  icon,
  title,
  sub,
  onPress,
}: {
  icon: SymbolName;
  title: string;
  sub: string;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable style={[styles.gridCard, { borderColor: theme.border, backgroundColor: theme.surfaceRaised }]} onPress={onPress}>
      <View style={[styles.iconBadge, { backgroundColor: theme.primarySoft }]}>
        <SymbolView name={icon} size={18} weight="bold" tintColor={theme.primary} />
      </View>
      <View style={styles.cardCopy}>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
          {sub}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: 20, gap: 16, paddingBottom: 32 },
  gap: { marginTop: 8, gap: 8 },
  error: { color: '#dc2626', marginTop: 8 },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 4,
  },
  brandIcon: {
    width: 58,
    height: 58,
    borderRadius: 14,
  },
  brandCopy: {
    flex: 1,
  },
  brandEyebrow: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '900',
  },
  brandTitle: {
    fontSize: 26,
    lineHeight: 32,
  },
  accountCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountText: {
    flex: 1,
    gap: 2,
  },
  hero: {
    borderRadius: 22,
    padding: 20,
    gap: 18,
    overflow: 'hidden',
  },
  heroText: {
    gap: 6,
  },
  heroKicker: {
    color: '#C8F7FF',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '900',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
  },
  heroSub: {
    color: '#E5F4FF',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  heroButton: {
    alignSelf: 'flex-start',
    minHeight: 44,
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  heroButtonText: {
    color: '#096AE8',
    fontWeight: '900',
  },
  quickRow: {
    gap: 10,
  },
  quickCard: {
    minHeight: 68,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quickIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickText: {
    flex: 1,
    gap: 4,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  sectionRule: {
    width: 5,
    height: 18,
    borderRadius: 999,
    backgroundColor: '#FF744D',
  },
  section: { opacity: 0.68 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  gridCard: {
    width: '48%',
    minHeight: 128,
    padding: 14,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCopy: {
    gap: 4,
  },
  proBadge: {
    backgroundColor: '#096AE8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  freeBadge: {
    backgroundColor: '#66758A',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});

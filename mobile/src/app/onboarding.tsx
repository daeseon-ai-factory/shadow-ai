import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { completeOnboarding } from '@/lib/onboarding';
import { t } from '@/lib/i18n';

type SymbolName = SymbolViewProps['name'];

/**
 * First-run onboarding for a fresh signup: orient the learner (what Mimi is, the loop), let them set
 * a daily target, then hand off to the first real action (import). Keeps a brand-new account from
 * landing on an empty Today with no idea what to tap.
 */
export default function OnboardingScreen() {
  const theme = useTheme();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<number | null>(null);

  const finish = async (dest: '/import' | '/') => {
    await completeOnboarding(goal ?? undefined);
    router.replace(dest);
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
        <View style={styles.topBar}>
          <View style={styles.dots}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[styles.dot, { backgroundColor: i === step ? theme.primary : theme.border }]}
              />
            ))}
          </View>
          <Pressable onPress={() => finish('/')} accessibilityRole="button" accessibilityLabel={t('onboard.skip')}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('onboard.skip')}
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.body}>
          {step === 0 && (
            <View style={styles.center}>
              <View style={[styles.hero, { backgroundColor: theme.primarySoft }]}>
                <SymbolView name={{ ios: 'waveform', android: 'graphic_eq', web: 'graphic_eq' }} size={48} weight="bold" tintColor={theme.primary} />
              </View>
              <ThemedText type="title" style={styles.title}>{t('onboard.welcomeTitle')}</ThemedText>
              <ThemedText style={styles.lead} themeColor="textSecondary">{t('onboard.welcomeBody')}</ThemedText>
            </View>
          )}

          {step === 1 && (
            <View style={styles.stepWrap}>
              <ThemedText type="title" style={styles.title}>{t('onboard.howTitle')}</ThemedText>
              <View style={styles.rows}>
                <HowRow icon={{ ios: 'plus.rectangle.on.rectangle', android: 'add_to_queue', web: 'add_to_queue' }} text={t('onboard.step1')} />
                <HowRow icon={{ ios: 'scissors', android: 'content_cut', web: 'content_cut' }} text={t('onboard.step2')} />
                <HowRow icon={{ ios: 'ear', android: 'hearing', web: 'hearing' }} text={t('onboard.step3')} />
                <HowRow icon={{ ios: 'arrow.triangle.2.circlepath', android: 'sync', web: 'sync' }} text={t('onboard.step4')} />
              </View>
            </View>
          )}

          {step === 2 && (
            <View style={styles.stepWrap}>
              <ThemedText type="title" style={styles.title}>{t('onboard.goalTitle')}</ThemedText>
              <ThemedText style={styles.lead} themeColor="textSecondary">{t('onboard.goalBody')}</ThemedText>
              <View style={styles.goals}>
                {[5, 15, 30].map((m) => {
                  const active = goal === m;
                  return (
                    <Pressable
                      key={m}
                      style={[styles.goal, { borderColor: active ? theme.primary : theme.border, backgroundColor: active ? theme.primarySoft : theme.surfaceRaised }]}
                      onPress={() => setGoal(m)}
                      accessibilityRole="button"
                      accessibilityLabel={t('onboard.min', { n: m })}
                    >
                      <ThemedText type="title" style={[styles.goalNum, active && { color: theme.primary }]}>{m}</ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">{t('onboard.minUnit')}</ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          {step < 2 ? (
            <Pressable style={[styles.primary, { backgroundColor: theme.primary }]} onPress={() => setStep((s) => s + 1)} accessibilityRole="button" accessibilityLabel={t('onboard.next')}>
              <ThemedText style={styles.primaryText}>{t('onboard.next')}</ThemedText>
            </Pressable>
          ) : (
            <>
              <Pressable style={[styles.primary, { backgroundColor: theme.primary }]} onPress={() => finish('/import')} accessibilityRole="button" accessibilityLabel={t('onboard.start')}>
                <ThemedText style={styles.primaryText}>{t('onboard.start')}</ThemedText>
              </Pressable>
              <Pressable style={styles.ghost} onPress={() => finish('/')} accessibilityRole="button" accessibilityLabel={t('onboard.browse')}>
                <ThemedText type="small" style={{ color: theme.primary, fontWeight: '700' }}>{t('onboard.browse')}</ThemedText>
              </Pressable>
            </>
          )}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

function HowRow({ icon, text }: { icon: SymbolName; text: string }) {
  const theme = useTheme();
  return (
    <View style={styles.howRow}>
      <View style={[styles.howIcon, { backgroundColor: theme.primarySoft }]}>
        <SymbolView name={icon} size={22} weight="bold" tintColor={theme.primary} />
      </View>
      <ThemedText style={styles.howText}>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  body: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  center: { alignItems: 'center', gap: 16 },
  hero: { width: 104, height: 104, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  title: { fontSize: 26, lineHeight: 32, textAlign: 'center' },
  lead: { fontSize: 16, lineHeight: 24, textAlign: 'center' },
  stepWrap: { gap: 18 },
  rows: { gap: 14 },
  howRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  howIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  howText: { flex: 1, fontSize: 16, lineHeight: 22, fontWeight: '600' },
  goals: { flexDirection: 'row', gap: 12, marginTop: 8 },
  goal: { flex: 1, borderRadius: 18, borderWidth: 1.5, paddingVertical: 22, alignItems: 'center', gap: 2 },
  goalNum: { fontSize: 30, lineHeight: 34 },
  footer: { paddingHorizontal: 20, paddingBottom: 8, gap: 6 },
  primary: { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  ghost: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
});

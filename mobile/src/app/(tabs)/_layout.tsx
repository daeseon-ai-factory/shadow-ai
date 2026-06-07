import { Text } from 'react-native';
import { Tabs } from 'expo-router';

import { t } from '@/lib/i18n';

// Bottom tab bar. No @expo/vector-icons in this project, so icons are plain emoji
// rendered as <Text> (the callback `color` is ignored by multicolor glyphs, so we
// distinguish the active tab with opacity instead).
const tabIcon =
  (emoji: string) =>
  ({ focused }: { focused: boolean }) => (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#208AEF',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      {/* Home draws its own SafeAreaView + "Mimi" title — no native header. */}
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: t('nav.home'),
          tabBarIcon: tabIcon('🏠'),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{ title: t('nav.videos'), tabBarIcon: tabIcon('🎬') }}
      />
      <Tabs.Screen
        name="review"
        options={{ title: t('nav.review'), tabBarIcon: tabIcon('🔁') }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          // Header keeps the specific "Pattern drill" title; the tab reads the shorter "Practice".
          title: t('nav.practice'),
          tabBarLabel: t('nav.practiceTab'),
          tabBarIcon: tabIcon('🏋️'),
        }}
      />
      <Tabs.Screen
        name="interview"
        options={{ title: t('nav.interview'), tabBarIcon: tabIcon('🎤') }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: t('nav.settings'), tabBarIcon: tabIcon('⚙️') }}
      />
    </Tabs>
  );
}

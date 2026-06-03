import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { bootstrapApi } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { loadToken } from '@/lib/secure-token';

// Configure the shared API client once, before any screen renders.
bootstrapApi();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const hydrate = useAuthStore((s) => s.hydrate);

  // Read the persisted JWT once at startup so a returning user skips the login screen.
  useEffect(() => {
    loadToken().then((token) => hydrate(token));
  }, [hydrate]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" options={{ presentation: 'modal' }} />
          <Stack.Screen name="practice" options={{ headerShown: true, title: 'Pattern drill' }} />
          <Stack.Screen name="collocations" options={{ headerShown: true, title: 'Collocations' }} />
          <Stack.Screen name="compose" options={{ headerShown: true, title: 'Compose check' }} />
          <Stack.Screen name="weak" options={{ headerShown: true, title: 'Weak spots' }} />
          <Stack.Screen name="review" options={{ headerShown: true, title: 'Review' }} />
          <Stack.Screen name="library" options={{ headerShown: true, title: 'Library' }} />
          <Stack.Screen name="import" options={{ headerShown: true, title: 'Import' }} />
          <Stack.Screen name="player/[clipId]" options={{ headerShown: true, title: 'Clip' }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

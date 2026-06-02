import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { authApi, ApiError } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useAuthStore((s) => s.signIn);

  const login = useMutation({
    mutationFn: () => authApi.login({ email: email.trim(), password }),
    onSuccess: async (res) => {
      await signIn(res.accessToken);
      router.replace('/');
    },
  });

  const errorMessage =
    login.error instanceof ApiError ? login.error.message : login.error ? 'Login failed' : null;

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            <ThemedText type="title">Sign in to Mimi</ThemedText>
            <ThemedText type="small">Turn YouTube into daily English practice.</ThemedText>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              autoComplete="password"
              value={password}
              onChangeText={setPassword}
            />

            {errorMessage && <ThemedText style={styles.error}>{errorMessage}</ThemedText>}

            <Pressable
              style={[styles.button, (!email || !password) && styles.buttonDisabled]}
              disabled={!email || !password || login.isPending}
              onPress={() => login.mutate()}
            >
              {login.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Sign in</ThemedText>
              )}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 24, gap: 14, justifyContent: 'center' },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#fff',
  },
  error: { color: '#dc2626' },
  button: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

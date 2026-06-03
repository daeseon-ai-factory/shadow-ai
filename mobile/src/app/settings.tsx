import { useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi, ApiError } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';

export default function SettingsScreen() {
  const token = useAuthStore((s) => s.token);
  const signOut = useAuthStore((s) => s.signOut);
  const [password, setPassword] = useState('');

  const me = useQuery({ queryKey: ['me'], queryFn: () => authApi.me(), enabled: !!token });

  const del = useMutation({
    mutationFn: () => authApi.deleteAccount(password),
    onSuccess: async () => {
      await signOut();
      router.replace('/login');
    },
    onError: (e) =>
      Alert.alert('Delete failed', e instanceof ApiError ? e.message : 'Could not delete account'),
  });

  if (!token) return <Redirect href="/login" />;

  const confirmDelete = () => {
    Alert.alert(
      'Delete account?',
      'This cannot be undone. Your clips, recordings, drill progress, and account are erased.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => del.mutate() },
      ],
    );
  };

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">Settings</ThemedText>

          {me.data && (
            <View style={styles.box}>
              <View style={styles.row}>
                <View style={me.data.plan === 'pro' ? styles.proBadge : styles.freeBadge}>
                  <ThemedText style={styles.badgeText}>
                    {me.data.plan === 'pro' ? 'PRO' : 'FREE'}
                  </ThemedText>
                </View>
                <ThemedText type="small">{me.data.email}</ThemedText>
              </View>
              <ThemedText type="small">{me.data.displayName}</ThemedText>
            </View>
          )}

          <Pressable style={styles.signOut} onPress={() => signOut()}>
            <ThemedText style={styles.signOutText}>Sign out</ThemedText>
          </Pressable>

          <View style={styles.danger}>
            <ThemedText type="smallBold" style={styles.dangerTitle}>
              Delete account
            </ThemedText>
            <ThemedText type="small">
              Permanently delete your account and all data. This cannot be undone.
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your password to confirm"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              autoComplete="current-password"
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              style={[styles.deleteBtn, (!password || del.isPending) && styles.disabled]}
              disabled={!password || del.isPending}
              onPress={confirmDelete}
            >
              {del.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.deleteText}>Delete my account</ThemedText>
              )}
            </Pressable>
          </View>

          <View style={styles.legal}>
            <Pressable onPress={() => Linking.openURL('https://mimi.daeseon.ai/en/terms')}>
              <ThemedText style={styles.link}>Terms</ThemedText>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('https://mimi.daeseon.ai/en/privacy')}>
              <ThemedText style={styles.link}>Privacy</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 24, gap: 16 },
  box: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  proBadge: { backgroundColor: '#208AEF', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  freeBadge: { backgroundColor: '#9ca3af', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  signOut: { paddingVertical: 12 },
  signOutText: { color: '#208AEF', fontWeight: '600', fontSize: 16 },
  danger: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dc262655',
    backgroundColor: '#dc26260a',
    padding: 16,
    gap: 10,
    marginTop: 8,
  },
  dangerTitle: { color: '#dc2626' },
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
  deleteBtn: { backgroundColor: '#dc2626', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  disabled: { opacity: 0.5 },
  deleteText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  legal: { flexDirection: 'row', gap: 18, paddingTop: 8 },
  link: { color: '#9ca3af', fontWeight: '600' },
});

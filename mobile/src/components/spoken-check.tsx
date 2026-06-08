import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { practiceApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { MicInput } from '@/components/mic-input';
import { t } from '@/lib/i18n';

/**
 * Speak your answer (mic → live transcript, editable) → lenient AI check.
 * `question` is what the answer is graded against (the code, or the model English). Shared by the
 * code-explain drill and the speaking drills so every interview section is mic-first, not typing.
 */
export function SpokenCheck({ question }: { question: string }) {
  const [text, setText] = useState('');
  const check = useMutation({ mutationFn: () => practiceApi.interviewCheck(question, text.trim()) });
  const fb = check.data;

  return (
    <View style={styles.box}>
      <MicInput onText={setText} />
      <TextInput
        style={styles.input}
        placeholder={t('mic.placeholder')}
        placeholderTextColor="#9ca3af"
        multiline
        value={text}
        onChangeText={setText}
      />
      {check.isError ? <ThemedText style={styles.err}>{t('code.checkFailed')}</ThemedText> : null}
      {fb ? (
        <View style={[styles.verdict, fb.ok ? styles.vOk : styles.vWork]}>
          <ThemedText type="smallBold">
            {fb.ok ? t('code.good') : t('code.needsWork')}  ·  {fb.score}/100
          </ThemedText>
          <ThemedText type="small">{fb.feedback}</ThemedText>
          {fb.better ? (
            <ThemedText style={styles.better}>{t('code.better', { text: fb.better })}</ThemedText>
          ) : null}
        </View>
      ) : null}
      <Pressable
        style={[styles.btn, (!text.trim() || check.isPending) && styles.disabled]}
        disabled={!text.trim() || check.isPending}
        onPress={() => check.mutate()}
      >
        {check.isPending ? (
          <ActivityIndicator color="#208AEF" />
        ) : (
          <ThemedText style={styles.btnText}>{t('code.aiCheck')}</ThemedText>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { gap: 8 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    minHeight: 56,
    textAlignVertical: 'top',
    color: '#111827',
    backgroundColor: '#fff',
  },
  err: { color: '#dc2626' },
  verdict: { borderRadius: 10, borderWidth: 1, padding: 12, gap: 4 },
  vOk: { borderColor: '#10b98155', backgroundColor: '#10b98111' },
  vWork: { borderColor: '#f59e0b55', backgroundColor: '#f59e0b11' },
  better: { fontStyle: 'italic' },
  btn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#208AEF',
  },
  btnText: { color: '#208AEF', fontWeight: '700' },
  disabled: { opacity: 0.5 },
});

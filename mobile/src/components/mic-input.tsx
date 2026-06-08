import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useAudioRecorder, AudioModule, RecordingPresets, setAudioModeAsync } from 'expo-audio';
import { useMutation } from '@tanstack/react-query';
import { practiceApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { t } from '@/lib/i18n';

/**
 * Tap-to-talk → record audio → upload → Whisper (Groq) transcription. Whisper is far more accurate
 * on developer jargon than the on-device iOS recognizer ("idempotency", "deque", "BFS" come through).
 * Recording uses the system mic, so AirPods are used automatically when they're connected — no audio
 * session category fight. Flow: tap → speak → tap → "transcribing…" → transcript → onText.
 */
export function MicInput({ onText }: { onText: (text: string) => void }) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transcribe = useMutation({
    mutationFn: (file: { uri: string; name: string; type: string }) => practiceApi.transcribe(file),
    onSuccess: (res) => {
      if (res.text) onText(res.text);
      else setError(t('mic.error'));
    },
    onError: () => setError(t('mic.error')),
  });

  const start = async () => {
    setError(null);
    try {
      const perm = await AudioModule.requestRecordingPermissionsAsync();
      if (!perm.granted) {
        setError(t('mic.denied'));
        return;
      }
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      setRecording(true);
    } catch {
      setError(t('mic.error'));
      setRecording(false);
    }
  };

  const stop = async () => {
    setRecording(false);
    try {
      await recorder.stop();
    } catch {
      /* stop can throw if already stopped — ignore */
    }
    const uri = recorder.uri;
    if (uri) {
      const name = uri.split('/').pop() || 'audio.m4a';
      transcribe.mutate({ uri, name, type: 'audio/m4a' });
    }
  };

  const busy = transcribe.isPending;
  return (
    <View style={styles.wrap}>
      <Pressable
        style={[styles.btn, recording && styles.btnOn, busy && styles.disabled]}
        disabled={busy}
        onPress={() => (recording ? stop() : start())}
      >
        {busy ? (
          <ActivityIndicator color="#208AEF" />
        ) : (
          <ThemedText style={recording ? styles.btnOnText : styles.btnText}>
            {recording ? t('mic.listening') : t('mic.tap')}
          </ThemedText>
        )}
      </Pressable>
      {busy ? <ThemedText type="small" style={styles.hint}>{t('mic.transcribing')}</ThemedText> : null}
      {error ? <ThemedText style={styles.err}>{error}</ThemedText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  btn: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#208AEF',
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnOn: { backgroundColor: '#dc2626', borderColor: '#dc2626' },
  disabled: { opacity: 0.6 },
  btnText: { color: '#208AEF', fontWeight: '700' },
  btnOnText: { color: '#fff', fontWeight: '700' },
  hint: { textAlign: 'center', opacity: 0.7 },
  err: { color: '#dc2626', textAlign: 'center' },
});

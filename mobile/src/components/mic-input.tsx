import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useAudioRecorder, AudioModule, RecordingPresets, setAudioModeAsync } from 'expo-audio';
import { useMutation } from '@tanstack/react-query';
import { uploadAsync, FileSystemUploadType } from 'expo-file-system/legacy';

import { ThemedText } from '@/components/themed-text';
import { getApiBaseUrl } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
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

  // DIAGNOSTIC: surface the real error + which stage failed (recording vs upload), so a screenshot
  // pinpoints the cause instead of a generic message. Revert to friendly text once the bug is found.
  const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));

  const transcribe = useMutation({
    // Native multipart upload via expo-file-system. RN's fetch FormData can't send a file-URI part
    // ("Unsupported FormDataPart"), so we read + post the file natively instead.
    mutationFn: async (uri: string) => {
      const token = useAuthStore.getState().token;
      const res = await uploadAsync(`${getApiBaseUrl()}/api/practice/transcribe`, uri, {
        httpMethod: 'POST',
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        mimeType: 'audio/m4a',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`HTTP ${res.status}: ${(res.body || '').slice(0, 180)}`);
      }
      const env = JSON.parse(res.body) as { data?: { text?: string }; error?: { message?: string } };
      if (env.error) throw new Error(env.error.message || 'transcribe error');
      return env.data?.text ?? '';
    },
    onSuccess: (text) => {
      if (text) onText(text);
      else setError('전사 결과 비어있음 (200, text empty)');
    },
    onError: (e) => setError('전사실패(UPLOAD): ' + msg(e)),
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
    } catch (e) {
      setError('녹음실패(REC): ' + msg(e));
      setRecording(false);
    }
  };

  const stop = async () => {
    setRecording(false);
    try {
      await recorder.stop();
    } catch (e) {
      setError('정지실패(STOP): ' + msg(e));
      return;
    }
    const uri = recorder.uri;
    if (!uri) {
      setError('녹음파일 없음 (recorder.uri = null)');
      return;
    }
    transcribe.mutate(uri);
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

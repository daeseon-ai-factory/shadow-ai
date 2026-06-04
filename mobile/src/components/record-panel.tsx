import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest, recordingsApi } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';

/**
 * Record yourself shadowing the clip, upload to the account, play your take back.
 * Uses expo-audio for capture; the upload is RN FormData ({ uri, name, type }) — not the
 * web Blob path — sent through core's apiRequest so the JWT + base URL come from one place.
 */
export function RecordPanel({ clipId }: { clipId: string }) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);
  const [lastUri, setLastUri] = useState<string | null>(null);
  const player = useAudioPlayer(lastUri ? { uri: lastUri } : undefined);
  const queryClient = useQueryClient();

  const recs = useQuery({
    queryKey: ['recordings', clipId],
    queryFn: () => recordingsApi.list(clipId),
  });

  const upload = useMutation({
    mutationFn: ({ uri, durationMs }: { uri: string; durationMs: number }) => {
      const form = new FormData();
      // RN file part: a { uri, name, type } descriptor, not a Blob.
      form.append('file', { uri, name: `rec-${clipId}.m4a`, type: 'audio/mp4' } as never);
      form.append('durationMs', String(Math.floor(durationMs)));
      return apiRequest(`/api/clips/${clipId}/recordings`, { method: 'POST', body: form });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recordings', clipId] }),
  });

  const start = async () => {
    const perm = await AudioModule.requestRecordingPermissionsAsync();
    if (!perm.granted) return;
    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    await recorder.prepareToRecordAsync();
    recorder.record();
  };

  const stop = async () => {
    const durationMs = state.durationMillis ?? 0;
    await recorder.stop();
    // Leave record mode so "Play my take" routes to the loudspeaker, not the iOS earpiece.
    await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
    const uri = recorder.uri;
    if (uri) {
      setLastUri(uri);
      upload.mutate({ uri, durationMs });
    }
  };

  return (
    <View style={styles.box}>
      <View style={styles.headerRow}>
        <ThemedText type="smallBold">Shadow yourself</ThemedText>
        {recs.data ? <ThemedText type="small">{recs.data.length} saved</ThemedText> : null}
      </View>

      {state.isRecording ? (
        <Pressable style={[styles.recBtn, styles.recording]} onPress={stop}>
          <ThemedText style={styles.recText}>
            ■ Stop · {Math.floor((state.durationMillis ?? 0) / 1000)}s
          </ThemedText>
        </Pressable>
      ) : (
        <Pressable style={styles.recBtn} onPress={start}>
          <ThemedText style={styles.recText}>● Record</ThemedText>
        </Pressable>
      )}

      {upload.isPending && (
        <View style={styles.statusRow}>
          <ActivityIndicator size="small" />
          <ThemedText type="small">Uploading…</ThemedText>
        </View>
      )}
      {upload.isError && <ThemedText style={styles.error}>Upload failed</ThemedText>}

      {lastUri && !upload.isPending && (
        <Pressable
          style={styles.playBtn}
          onPress={() => {
            player.seekTo(0);
            player.play();
          }}
        >
          <ThemedText style={styles.playText}>▶ Play my take</ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 16,
    gap: 10,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  recording: { backgroundColor: '#dc2626' },
  recText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  statusRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  error: { color: '#dc2626' },
  playBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  playText: { fontWeight: '600' },
});

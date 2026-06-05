import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  videosApi,
  clipsApi,
  ApiError,
  type VideoResponse,
  type TranscriptSegment,
} from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';
import {
  YoutubeTranscriptWebView,
  type DeviceTranscriptResult,
} from '@/lib/youtube-transcript-webview';

export default function ImportScreen() {
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();
  // Discover deep-links here with a ?url= to prefill (tap a curated video to import it).
  const params = useLocalSearchParams<{ url?: string }>();
  const [url, setUrl] = useState(params.url ?? '');
  const [video, setVideo] = useState<VideoResponse | null>(null);
  const [deviceFetchUrl, setDeviceFetchUrl] = useState<string | null>(null);

  const importVideo = useMutation({
    mutationFn: (request: {
      sourceUrl: string;
      transcriptSegments?: TranscriptSegment[];
      title?: string;
    }) =>
      videosApi.importByUrl(request.sourceUrl, {
        transcriptSegments: request.transcriptSegments,
        title: request.title,
      }),
    onSuccess: (v) => setVideo(v),
  });

  // Tap a sentence → make a one-sentence clip from it.
  const makeClip = useMutation({
    mutationFn: (seg: TranscriptSegment) =>
      clipsApi.create({
        videoId: video!.id,
        startMs: seg.startMs,
        endMs: seg.endMs,
        name: seg.text.slice(0, 40),
        tags: [],
      }),
    onSuccess: (clip) => {
      // Refresh the Library list so the just-created clip is there when the user goes back.
      qc.invalidateQueries({ queryKey: ['clips'] });
      router.replace(`/player/${clip.id}`);
    },
  });

  if (!token) return <Redirect href="/login" />;

  const importError =
    importVideo.error instanceof ApiError
      ? importVideo.error.message
      : importVideo.error
        ? t('import.importFailed')
        : null;
  const isImporting = importVideo.isPending || deviceFetchUrl !== null;

  const startImport = () => {
    const trimmed = url.trim();
    if (!trimmed || isImporting) return;
    setDeviceFetchUrl(trimmed);
  };

  const handleDeviceTranscript = (result: DeviceTranscriptResult) => {
    const sourceUrl = deviceFetchUrl ?? url.trim();
    setDeviceFetchUrl(null);
    if (result.ok && result.segments.length > 0) {
      importVideo.mutate({
        sourceUrl,
        transcriptSegments: result.segments,
        title: result.title,
      });
      return;
    }
    importVideo.mutate({ sourceUrl });
  };

  if (video) {
    const lines = video.sentences.length > 0 ? video.sentences : video.transcriptSegments;
    return (
      <ThemedView style={styles.flex}>
        <SafeAreaView style={styles.flex} edges={['bottom']}>
          <View style={styles.resultHeader}>
            <ThemedText type="subtitle" numberOfLines={2}>
              {video.title}
            </ThemedText>
            <ThemedText type="small">{t('import.tapSentence')}</ThemedText>
          </View>
          {makeClip.isPending && <ActivityIndicator style={styles.mt} />}
          <FlatList
            data={lines}
            keyExtractor={(_, i) => String(i)}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <Pressable
                style={styles.line}
                disabled={makeClip.isPending}
                onPress={() => makeClip.mutate(item)}
              >
                <ThemedText>{item.text}</ThemedText>
              </Pressable>
            )}
            ListEmptyComponent={
              <ThemedText type="small" style={styles.empty}>
                {t('import.noTranscript')}
              </ThemedText>
            }
          />
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            {deviceFetchUrl && (
              <YoutubeTranscriptWebView
                url={deviceFetchUrl}
                onResult={handleDeviceTranscript}
              />
            )}

            <ThemedText type="title">{t('import.title')}</ThemedText>
            <ThemedText type="small">{t('import.subtitle')}</ThemedText>

            <TextInput
              style={styles.input}
              placeholder={t('import.urlPlaceholder')}
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              value={url}
              onChangeText={setUrl}
            />

            {importError && <ThemedText style={styles.error}>{importError}</ThemedText>}

            <Pressable
              style={[styles.primaryBtn, (!url.trim() || isImporting) && styles.disabled]}
              disabled={!url.trim() || isImporting}
              onPress={startImport}
            >
              {isImporting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.primaryText}>{t('import.importBtn')}</ThemedText>
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
  mt: { marginTop: 16 },
  container: { flex: 1, padding: 24, gap: 14, justifyContent: 'center' },
  resultHeader: { padding: 24, paddingBottom: 8, gap: 4 },
  list: { paddingHorizontal: 24, paddingBottom: 24, gap: 8 },
  line: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9ca3af',
    padding: 14,
  },
  empty: { textAlign: 'center', marginTop: 24 },
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
  primaryBtn: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabled: { opacity: 0.5 },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

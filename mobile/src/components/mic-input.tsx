import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
  AVAudioSessionCategory,
  AVAudioSessionCategoryOptions,
  AVAudioSessionMode,
} from 'expo-speech-recognition';
import { INTERVIEW_DEV_TERMS } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { t } from '@/lib/i18n';

/**
 * Tap-to-talk English speech-to-text. On-device (free, offline, no API cost), and the iOS audio
 * session is opened with Bluetooth allowed so an AirPods mic is used for input — not just the
 * built-in mic. Emits the live transcript via onText; onText fires on every partial + the final.
 */
export function MicInput({ onText }: { onText: (text: string) => void }) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the screen unmounts mid-listen (swipe-back / navigate away), kill the native recognizer so
  // the mic + audio session don't stay hot and orphaned global 'result' events don't fire into a
  // dead tree. abort() is a safe no-op when idle and discards the final result (no 'result' emit).
  useEffect(() => () => ExpoSpeechRecognitionModule.abort(), []);

  useSpeechRecognitionEvent('start', () => setListening(true));
  useSpeechRecognitionEvent('end', () => setListening(false));
  useSpeechRecognitionEvent('result', (e) => {
    const txt = e.results?.[0]?.transcript ?? '';
    if (txt) onText(txt);
  });
  useSpeechRecognitionEvent('error', () => {
    // Friendly retry message instead of raw iOS errors like "Audio session was interrupted".
    setError(t('mic.error'));
    setListening(false);
  });

  const start = async () => {
    setError(null);
    const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!perm.granted) {
      setError(t('mic.denied'));
      return;
    }
    ExpoSpeechRecognitionModule.start({
      lang: 'en-US',
      interimResults: true,
      continuous: true,
      // Apple's network recognizer is far more accurate on dev jargon than on-device (free, needs net).
      requiresOnDeviceRecognition: false,
      addsPunctuation: true,
      // Bias the recognizer toward developer/CS vocabulary so it stops hearing "deque" as "deck".
      contextualStrings: INTERVIEW_DEV_TERMS,
      // Route input through Bluetooth (AirPods) — the library's tested default. NOTE: do NOT add
      // allowBluetoothA2DP here; mixing it with allowBluetooth on playAndRecord makes iOS fight over
      // the route (HFP mic-input vs A2DP stereo-output) and fires an "audio session interrupted" error.
      iosCategory: {
        category: AVAudioSessionCategory.playAndRecord,
        categoryOptions: [
          AVAudioSessionCategoryOptions.defaultToSpeaker,
          AVAudioSessionCategoryOptions.allowBluetooth,
        ],
        mode: AVAudioSessionMode.measurement,
      },
    });
  };

  const stop = () => ExpoSpeechRecognitionModule.stop();

  return (
    <View style={styles.wrap}>
      <Pressable
        style={[styles.btn, listening && styles.btnOn]}
        onPress={() => (listening ? stop() : start())}
      >
        <ThemedText style={listening ? styles.btnOnText : styles.btnText}>
          {listening ? t('mic.listening') : t('mic.tap')}
        </ThemedText>
      </Pressable>
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
  btnText: { color: '#208AEF', fontWeight: '700' },
  btnOnText: { color: '#fff', fontWeight: '700' },
  err: { color: '#dc2626', textAlign: 'center' },
});

import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
  AVAudioSessionCategory,
  AVAudioSessionCategoryOptions,
  AVAudioSessionMode,
} from 'expo-speech-recognition';

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

  useSpeechRecognitionEvent('start', () => setListening(true));
  useSpeechRecognitionEvent('end', () => setListening(false));
  useSpeechRecognitionEvent('result', (e) => {
    const txt = e.results?.[0]?.transcript ?? '';
    if (txt) onText(txt);
  });
  useSpeechRecognitionEvent('error', (e) => {
    setError(e.message || t('mic.error'));
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
      requiresOnDeviceRecognition: true, // free + offline + private
      addsPunctuation: true,
      // Route input through Bluetooth (AirPods) instead of only the built-in mic.
      iosCategory: {
        category: AVAudioSessionCategory.playAndRecord,
        categoryOptions: [
          AVAudioSessionCategoryOptions.allowBluetooth,
          AVAudioSessionCategoryOptions.allowBluetoothA2DP,
          AVAudioSessionCategoryOptions.defaultToSpeaker,
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

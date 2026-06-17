import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// The last clip the learner actually opened — powers Today's "Continue" so it resumes where they
// left off, not just the newest clip they happened to create.
const KEY = 'lastClip.v1';

export type LastClip = { id: string; name: string };

export async function setLastClip(clip: LastClip): Promise<void> {
  await SecureStore.setItemAsync(KEY, JSON.stringify(clip));
}

/** Re-reads on focus so returning to Today reflects the clip you just opened. */
export function useLastClip(): LastClip | null {
  const [clip, setClip] = useState<LastClip | null>(null);
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      SecureStore.getItemAsync(KEY).then((v) => {
        if (!alive || !v) return;
        try {
          setClip(JSON.parse(v));
        } catch {
          // ignore corrupt value
        }
      });
      return () => {
        alive = false;
      };
    }, []),
  );
  return clip;
}

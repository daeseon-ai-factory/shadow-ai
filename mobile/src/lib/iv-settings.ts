// Interview drill settings. EN immersion mode hides every Korean crutch in the drill (gloss,
// translation, detail collapsed behind a tap) so advanced reps run English-only — the
// "monolingual transition" step. In-memory zustand mirrored to SecureStore (same pattern as auth).
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const KEY = 'iv-en-only';

interface IvSettings {
  enOnly: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setEnOnly: (v: boolean) => void;
}

export const useIvSettings = create<IvSettings>((set, get) => ({
  enOnly: false,
  hydrated: false,
  hydrate: async () => {
    if (get().hydrated) return;
    const v = await SecureStore.getItemAsync(KEY).catch(() => null);
    set({ enOnly: v === '1', hydrated: true });
  },
  setEnOnly: (v) => {
    set({ enOnly: v });
    SecureStore.setItemAsync(KEY, v ? '1' : '0').catch(() => {});
  },
}));

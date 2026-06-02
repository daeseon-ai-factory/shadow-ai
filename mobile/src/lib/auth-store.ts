// In-memory auth state. The core API client reads the token synchronously via
// setTokenProvider(), but SecureStore is async — so we hold the token in memory here
// (hydrated once at startup) and mirror writes to SecureStore.
import { create } from 'zustand';
import { clearToken, saveToken } from './secure-token';

interface AuthState {
  token: string | null;
  /** False until SecureStore has been read once at startup (avoids a redirect flash). */
  hydrated: boolean;
  hydrate: (token: string | null) => void;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  hydrated: false,
  hydrate: (token) => set({ token, hydrated: true }),
  signIn: async (token) => {
    await saveToken(token);
    set({ token });
  },
  signOut: async () => {
    await clearToken();
    set({ token: null });
  },
}));

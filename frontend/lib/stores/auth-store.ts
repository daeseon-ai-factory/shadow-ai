"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { setTokenProvider } from "@/lib/api/client";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  hydrated: boolean;
  setSession: (token: string, user: AuthUser) => void;
  clear: () => void;
  _setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hydrated: false,
      setSession: (token, user) => set({ token, user }),
      clear: () => set({ token: null, user: null }),
      _setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "tubeshadow.auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?._setHydrated();
      },
    },
  ),
);

// Wire the API client to read its bearer token from this store.
if (typeof window !== "undefined") {
  setTokenProvider(() => useAuthStore.getState().token);
}

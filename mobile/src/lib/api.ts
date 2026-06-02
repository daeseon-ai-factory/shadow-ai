// Wires @shadow-ai/core's platform-agnostic API client to this device:
//  - polyfills WHATWG URL (React Native's built-in URL is incomplete)
//  - points the client at the backend
//  - feeds it the in-memory JWT
import 'react-native-url-polyfill/auto';
import Constants from 'expo-constants';
import { configureApiBaseUrl, setTokenProvider } from '@shadow-ai/core';
import { useAuthStore } from './auth-store';

function resolveBaseUrl(): string {
  // Explicit override wins (set EXPO_PUBLIC_API_URL for staging/prod builds).
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;
  // Dev default: reach the backend on the same machine running Metro. On a physical
  // device "localhost" is the phone itself, so use Metro's LAN host instead.
  const host = (Constants.expoConfig?.hostUri ?? 'localhost:8081').split(':')[0];
  return `http://${host}:8080`;
}

let configured = false;

export function bootstrapApi() {
  if (configured) return;
  configureApiBaseUrl(resolveBaseUrl());
  setTokenProvider(() => useAuthStore.getState().token);
  configured = true;
}

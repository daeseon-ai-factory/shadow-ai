import { apiClient } from "./client";

export interface SignupPayload {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  expiresInSeconds: number;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
}

export const authApi = {
  signup: (payload: SignupPayload) => apiClient.post<AuthTokenResponse>("/api/auth/signup", payload),
  login: (payload: LoginPayload) => apiClient.post<AuthTokenResponse>("/api/auth/login", payload),
  me: () => apiClient.get<{ id: string; email: string }>("/api/auth/me"),
};

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

export interface UpdateProfilePayload {
  displayName: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
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

export interface MeResponse {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export const authApi = {
  signup: (payload: SignupPayload) => apiClient.post<AuthTokenResponse>("/api/auth/signup", payload),
  login: (payload: LoginPayload) => apiClient.post<AuthTokenResponse>("/api/auth/login", payload),
  me: () => apiClient.get<MeResponse>("/api/auth/me"),
  updateProfile: (payload: UpdateProfilePayload) =>
    apiClient.patch<AuthTokenResponse>("/api/auth/me", payload),
  changePassword: (payload: ChangePasswordPayload) =>
    apiClient.post<void>("/api/auth/me/password", payload),
};

import { apiClient } from "./client";

export interface ClipResponse {
  id: string;
  videoId: string;
  youtubeId: string;
  videoTitle: string;
  thumbnailUrl: string | null;
  startMs: number;
  endMs: number;
  name: string;
  tags: string[];
  transcript: string | null;
  createdAt: string;
}

export interface ClipPageResponse {
  items: ClipResponse[];
  total: number;
  page: number;
  size: number;
}

export interface ClipCreatePayload {
  videoId: string;
  startMs: number;
  endMs: number;
  name: string;
  tags: string[];
}

export const clipsApi = {
  create: (payload: ClipCreatePayload) => apiClient.post<ClipResponse>("/api/clips", payload),
  list: (params: { q?: string; tag?: string; page?: number; size?: number }) =>
    apiClient.get<ClipPageResponse>("/api/clips", { query: { ...params } }),
  get: (id: string) => apiClient.get<ClipResponse>(`/api/clips/${id}`),
  delete: (id: string) => apiClient.delete<void>(`/api/clips/${id}`),
};

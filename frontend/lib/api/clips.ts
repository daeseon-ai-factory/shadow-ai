import { apiClient } from "./client";

export interface ClipResponse {
  id: string;
  videoId: string;
  youtubeId: string;
  videoTitle: string;
  thumbnailUrl: string | null;
  videoOrientation: "PORTRAIT" | "LANDSCAPE" | "UNKNOWN";
  videoWidthPx: number | null;
  videoHeightPx: number | null;
  startMs: number;
  endMs: number;
  name: string;
  tags: string[];
  transcript: string | null;
  note: string | null;
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

export interface ClipUpdatePayload {
  name?: string;
  tags?: string[];
  transcript?: string;
  note?: string;
}

export const clipsApi = {
  create: (payload: ClipCreatePayload) => apiClient.post<ClipResponse>("/api/clips", payload),
  list: (params: { q?: string; tag?: string; sort?: string; page?: number; size?: number }) =>
    apiClient.get<ClipPageResponse>("/api/clips", { query: { ...params } }),
  tags: () => apiClient.get<string[]>("/api/clips/tags"),
  get: (id: string) => apiClient.get<ClipResponse>(`/api/clips/${id}`),
  update: (id: string, payload: ClipUpdatePayload) => apiClient.patch<ClipResponse>(`/api/clips/${id}`, payload),
  delete: (id: string) => apiClient.delete<void>(`/api/clips/${id}`),
};

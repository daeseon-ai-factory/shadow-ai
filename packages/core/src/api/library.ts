import { apiClient } from "./client";
import type { VideoResponse } from "./videos";

/** One entry in the user's "My Videos" list. `video` is a summary (no transcript payload). */
export interface LibraryVideoResponse {
  video: VideoResponse;
  savedAt: string;
  clipCount: number;
}

export interface LibraryVideoPageResponse {
  items: LibraryVideoResponse[];
  total: number;
  page: number;
  size: number;
}

export const libraryApi = {
  /** "My Videos", newest first. */
  list: (params?: { page?: number; size?: number }) =>
    apiClient.get<LibraryVideoPageResponse>("/api/library/videos", { query: { ...params } }),

  /** Save a video to the library (idempotent). Import already auto-saves; use for Discover deep-links. */
  save: (videoId: string) =>
    apiClient.post<void>("/api/library/videos", { videoId }),

  /** Remove a video from the library. Clips made from it are kept. */
  remove: (videoId: string) =>
    apiClient.delete<void>(`/api/library/videos/${videoId}`),
};

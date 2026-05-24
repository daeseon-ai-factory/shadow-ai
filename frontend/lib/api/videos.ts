import { apiClient } from "./client";

export interface TranscriptSegment {
  startMs: number;
  endMs: number;
  text: string;
}

export interface VideoResponse {
  id: string;
  youtubeId: string;
  title: string;
  channelName: string | null;
  durationSeconds: number | null;
  thumbnailUrl: string | null;
  transcriptStatus: "PENDING" | "READY" | "UNAVAILABLE";
  transcriptSegments: TranscriptSegment[];
}

export const videosApi = {
  importByUrl: (url: string) => apiClient.post<VideoResponse>("/api/videos/import", { url }),
  get: (id: string) => apiClient.get<VideoResponse>(`/api/videos/${id}`),
};

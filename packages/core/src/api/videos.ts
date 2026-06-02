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
  widthPx: number | null;
  heightPx: number | null;
  orientation: "PORTRAIT" | "LANDSCAPE" | "UNKNOWN";
  transcriptStatus: "PENDING" | "READY" | "UNAVAILABLE";
  /** Raw YouTube transcript segments (1~3s chunks). */
  transcriptSegments: TranscriptSegment[];
  /** Server-merged sentence-level view, derived from segments via SentenceMerger. */
  sentences: TranscriptSegment[];
}

export const videosApi = {
  importByUrl: (url: string) => apiClient.post<VideoResponse>("/api/videos/import", { url }),
  get: (id: string) => apiClient.get<VideoResponse>(`/api/videos/${id}`),
};

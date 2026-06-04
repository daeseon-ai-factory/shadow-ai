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
  /**
   * Import a YouTube video.
   * @param opts.transcriptSegments transcript fetched on the device (mobile, via
   *   {@link fetchYoutubeTranscript}). When provided the server stores it directly and skips
   *   yt-dlp — this is how mobile bypasses YouTube's datacenter-IP block. Web omits it.
   * @param opts.title device-read title; used by the server only if its own oEmbed lookup fails.
   */
  importByUrl: (
    url: string,
    opts?: { transcriptSegments?: TranscriptSegment[]; title?: string },
  ) => apiClient.post<VideoResponse>("/api/videos/import", { url, ...opts }),
  get: (id: string) => apiClient.get<VideoResponse>(`/api/videos/${id}`),
};

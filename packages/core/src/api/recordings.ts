import { apiClient, apiRequest } from "./client";

export interface RecordingResponse {
  id: string;
  clipId: string;
  durationMs: number;
  sizeBytes: number;
  contentType: string | null;
  createdAt: string;
}

export const recordingsApi = {
  list: (clipId: string) => apiClient.get<RecordingResponse[]>(`/api/clips/${clipId}/recordings`),
  upload: (clipId: string, blob: Blob, durationMs: number) => {
    const form = new FormData();
    const filename = `rec-${Date.now()}.${blob.type.includes("ogg") ? "ogg" : "webm"}`;
    form.append("file", new File([blob], filename, { type: blob.type || "audio/webm" }));
    form.append("durationMs", String(Math.floor(durationMs)));
    return apiRequest<RecordingResponse>(`/api/clips/${clipId}/recordings`, {
      method: "POST",
      body: form,
    });
  },
  delete: (id: string) => apiClient.delete<void>(`/api/recordings/${id}`),
  audioUrl: (id: string) => `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}/api/recordings/${id}/audio`,
};

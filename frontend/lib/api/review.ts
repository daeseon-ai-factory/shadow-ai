import { apiClient } from "./client";
import type { ClipResponse } from "./clips";

export interface ReviewQueueItem {
  id: string;
  clipId: string;
  easiness: number;
  intervalDays: number;
  repetitions: number;
  dueDate: string;
  clip: ClipResponse;
}

export interface StreakResponse {
  dueToday: number;
  streakDays: number;
}

export const reviewApi = {
  queue: () => apiClient.get<ReviewQueueItem[]>("/api/review/queue"),
  respond: (id: string, quality: number) =>
    apiClient.post<unknown>(`/api/review/items/${id}/respond`, { quality }),
  streak: () => apiClient.get<StreakResponse>("/api/review/streak"),
};

export const REVIEW_QUALITY = {
  AGAIN: 1,
  HARD: 3,
  GOOD: 4,
  EASY: 5,
} as const;

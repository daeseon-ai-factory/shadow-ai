import { apiClient } from "./client";

export interface PracticeProgress {
  date: string; // the local date this reflects (YYYY-MM-DD)
  reps: number; // reps done today
  streak: number; // live day streak (0 if it has lapsed)
  longestStreak: number;
  totalReps: number;
}

// localDate is the client's own calendar date so the streak follows the learner's midnight,
// not the server's (UTC).
export const practiceApi = {
  progress: (localDate: string) =>
    apiClient.get<PracticeProgress>("/api/practice/progress", { query: { localDate } }),
  rep: (localDate: string) =>
    apiClient.post<PracticeProgress>("/api/practice/rep", { localDate }),
};

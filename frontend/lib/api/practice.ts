import { apiClient } from "./client";

export interface PracticeProgress {
  date: string; // the local date this reflects (YYYY-MM-DD)
  reps: number; // reps done today
  streak: number; // live day streak (0 if it has lapsed)
  longestStreak: number;
  totalReps: number;
}

// Spaced-repetition (Leitner) state for one drill card. The client computes "due"
// (dueDate <= today) and "new" (a card key with no state) against its own local date.
export interface SrsCard {
  cardKey: string;
  box: number;
  dueDate: string; // YYYY-MM-DD
  correctCount: number;
  lapseCount: number;
}

// Grading a card also counts as a rep today, so the streak comes back in the same response.
export interface GradeResult {
  card: SrsCard;
  progress: PracticeProgress;
}

// AI verdict on a composition ("영작") attempt.
export interface ComposeFeedback {
  ok: boolean; // grammatical, natural, AND uses the target correctly
  usesTarget: boolean;
  feedback: string;
  better: string;
}

export const practiceApi = {
  progress: (localDate: string) =>
    apiClient.get<PracticeProgress>("/api/practice/progress", { query: { localDate } }),
  srsStates: () => apiClient.get<SrsCard[]>("/api/practice/srs"),
  grade: (cardKey: string, correct: boolean, localDate: string) =>
    apiClient.post<GradeResult>("/api/practice/srs/grade", { cardKey, correct, localDate }),
  composeCheck: (target: string, gloss: string, sentence: string) =>
    apiClient.post<ComposeFeedback>("/api/practice/compose/check", { target, gloss, sentence }),
};

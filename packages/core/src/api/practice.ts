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

// Lenient verdict on a spoken interview/code explanation — passes when the CORE is understandable.
export interface InterviewFeedback {
  ok: boolean;
  score: number;
  feedback: string;
  better: string;
}

// Whisper transcript of an uploaded audio clip (dev-jargon-aware).
export interface TranscribeResult {
  text: string;
}

// One turn of the AI mock interview; empty history asks for the opening question.
export interface MockTurn {
  role: "interviewer" | "candidate";
  text: string;
}
export interface MockNext {
  question: string;
}

export const practiceApi = {
  progress: (localDate: string) =>
    apiClient.get<PracticeProgress>("/api/practice/progress", { query: { localDate } }),
  srsStates: () => apiClient.get<SrsCard[]>("/api/practice/srs"),
  grade: (cardKey: string, correct: boolean, localDate: string) =>
    apiClient.post<GradeResult>("/api/practice/srs/grade", { cardKey, correct, localDate }),
  composeCheck: (target: string, gloss: string, sentence: string) =>
    apiClient.post<ComposeFeedback>("/api/practice/compose/check", { target, gloss, sentence }),
  // Lenient grade of a spoken explanation — `question` is the code/topic, `answer` is what the learner said.
  interviewCheck: (question: string, answer: string, precision?: boolean) =>
    apiClient.post<InterviewFeedback>("/api/practice/interview/check", { question, answer, precision }),
  // Next interviewer question in the AI mock interview (opener on empty history, else a follow-up).
  mockNext: (history: MockTurn[], seed?: number) =>
    apiClient.post<MockNext>("/api/practice/interview/mock", { history, seed }),
  // Upload an audio clip → Whisper transcript. `file` is a React Native file descriptor.
  transcribe: (file: { uri: string; name: string; type: string }) => {
    const form = new FormData();
    form.append("file", file as unknown as Blob);
    return apiClient.post<TranscribeResult>("/api/practice/transcribe", form);
  },
};

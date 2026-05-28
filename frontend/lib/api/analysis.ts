import { apiClient } from "./client";

export interface KeyExpression {
  phrase: string;
  meaning: string;
  usage: string;
}

export interface VocabularyItem {
  word: string;
  meaning: string;
  level: "basic" | "intermediate" | "advanced" | string;
}

export interface ChunkPair {
  en: string;
  ko: string;
}

export interface PracticeScenario {
  situation: string;
  koreanHint: string | null;
  sampleResponse: string;
}

export interface ClipAnalysis {
  id: string;
  clipId: string;
  status: "PENDING" | "READY" | "FAILED";
  grammarNotes: string[];
  keyExpressions: KeyExpression[];
  vocabulary: VocabularyItem[];
  contextSummary: string | null;
  primaryTranslation: string | null;
  chunkedTranslation: ChunkPair[];
  practiceScenario: PracticeScenario | null;
  model: string | null;
  generatedAt: string | null;
  errorMessage: string | null;
}

export const analysisApi = {
  get: (clipId: string) => apiClient.get<ClipAnalysis>(`/api/clips/${clipId}/analysis`),
  regenerate: (clipId: string) => apiClient.post<ClipAnalysis>(`/api/clips/${clipId}/analysis/regenerate`),
};

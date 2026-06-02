import { apiClient } from "./client";

export interface MinedOccurrence {
  clipId: string;
  clipName: string;
  phrase: string;
  sense: string;
}

export interface MinedPreposition {
  preposition: string;
  occurrences: MinedOccurrence[];
}

export const prepositionsApi = {
  /** Prepositions the user has mined across their clips, grouped by preposition. */
  mined: () => apiClient.get<MinedPreposition[]>("/api/prepositions/mined"),
};

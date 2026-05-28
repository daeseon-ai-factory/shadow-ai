import { apiClient, apiRequest } from "./client";

export interface Deck {
  id: string;
  name: string;
  description: string | null;
  clipCount: number;
  createdAt: string;
}

export interface DeckRequest {
  name: string;
  description?: string | null;
}

export const decksApi = {
  list: () => apiClient.get<Deck[]>("/api/decks"),

  create: (req: DeckRequest) => apiClient.post<Deck>("/api/decks", req),

  rename: (deckId: string, name: string) =>
    apiClient.patch<Deck>(`/api/decks/${deckId}`, { name }),

  delete: (deckId: string) =>
    apiRequest<void>(`/api/decks/${deckId}`, { method: "DELETE" }),

  moveClip: (clipId: string, deckId: string | null) =>
    apiRequest<void>(`/api/decks/clips/${clipId}`, {
      method: "PATCH",
      body: { deckId },
    }),
};

import { apiClient } from "./client";
import type { VideoResponse } from "./videos";

export interface CollectionVideoEntry {
  position: number;
  category: string | null;
  video: VideoResponse;
}

export interface CollectionSummary {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  videos: CollectionVideoEntry[];
}

export const collectionsApi = {
  list: () => apiClient.get<CollectionSummary[]>("/api/collections"),
  get: (idOrSlug: string) => apiClient.get<CollectionSummary>(`/api/collections/${idOrSlug}`),
};

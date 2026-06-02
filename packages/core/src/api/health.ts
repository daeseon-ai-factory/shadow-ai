import { apiClient } from "./client";

export interface HealthStatus {
  status: string;
}

export const healthApi = {
  get: () => apiClient.get<HealthStatus>("/api/health"),
};

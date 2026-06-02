// Web (Next.js) inlines NEXT_PUBLIC_API_URL at build time. Mobile (Expo) has no such var,
// so it calls configureApiBaseUrl() in its bootstrap. Either way the client stays platform-agnostic.
let baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

/** Override the API base URL at runtime (used by the mobile client; web sets it via env). */
export function configureApiBaseUrl(url: string) {
  baseUrl = url;
}

export interface ApiEnvelope<T> {
  data: T | null;
  error: { code: string; message: string } | null;
  timestamp: string;
}

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

let tokenProvider: (() => string | null) | null = null;

export function setTokenProvider(provider: () => string | null) {
  tokenProvider = provider;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Body = Record<string, any> | unknown[] | FormData | undefined;

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Body;
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

function buildUrl(path: string, query?: FetchOptions["query"]) {
  const url = new URL(path.startsWith("http") ? path : `${baseUrl}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function apiRequest<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, query, signal } = options;

  const headers: Record<string, string> = {};
  const token = tokenProvider?.();
  if (token) headers.Authorization = `Bearer ${token}`;

  let serialized: BodyInit | undefined;
  if (body instanceof FormData) {
    serialized = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    serialized = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers,
    body: serialized,
    signal,
    cache: "no-store",
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as ApiEnvelope<T>) : ({ data: null, error: null, timestamp: "" } as ApiEnvelope<T>);

  if (!response.ok || payload.error) {
    const error = payload.error ?? { code: "HTTP_ERROR", message: response.statusText };
    throw new ApiError(response.status, error.code, error.message);
  }

  return payload.data as T;
}

export const apiClient = {
  get: <T>(path: string, opts?: Omit<FetchOptions, "method" | "body">) => apiRequest<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, body?: Body, opts?: Omit<FetchOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "POST", body }),
  put: <T>(path: string, body?: Body, opts?: Omit<FetchOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "PUT", body }),
  patch: <T>(path: string, body?: Body, opts?: Omit<FetchOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "PATCH", body }),
  delete: <T>(path: string, opts?: Omit<FetchOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "DELETE" }),
};

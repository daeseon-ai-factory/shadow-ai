import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { apiRequest, ApiError, setTokenProvider } from "@/lib/api/client";

const originalFetch = global.fetch;

describe("apiRequest", () => {
  beforeEach(() => {
    setTokenProvider(() => "test-token");
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("returns the data field when the response envelope has no error", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: { hello: "world" }, error: null, timestamp: "" }), {
        status: 200,
      }),
    );

    const result = await apiRequest<{ hello: string }>("/api/x");
    expect(result).toEqual({ hello: "world" });
  });

  it("attaches the bearer token from the provider", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: null, error: null, timestamp: "" }), { status: 200 }),
    );
    global.fetch = fetchMock;

    await apiRequest("/api/x");

    const [, init] = fetchMock.mock.calls[0];
    expect((init as RequestInit).headers).toEqual({
      Authorization: "Bearer test-token",
    });
  });

  it("throws ApiError when the envelope contains an error", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        data: null,
        error: { code: "BAD_REQUEST", message: "nope" },
        timestamp: "",
      }), { status: 400 }),
    );

    await expect(apiRequest("/api/x")).rejects.toMatchObject({
      name: "Error",
      status: 400,
      code: "BAD_REQUEST",
      message: "nope",
    });
  });

  it("throws ApiError on HTTP failure even when body has no envelope error", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response("", { status: 500, statusText: "Server Error" }),
    );

    await expect(apiRequest("/api/x")).rejects.toBeInstanceOf(ApiError);
  });

  it("serializes a JSON body and sets the content type", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: null, error: null, timestamp: "" }), { status: 200 }),
    );
    global.fetch = fetchMock;

    await apiRequest("/api/x", { method: "POST", body: { a: 1 } });

    const [, init] = fetchMock.mock.calls[0];
    const i = init as RequestInit;
    expect((i.headers as Record<string, string>)["Content-Type"]).toBe("application/json");
    expect(i.body).toBe(JSON.stringify({ a: 1 }));
  });

  it("does not set content type when body is FormData", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: null, error: null, timestamp: "" }), { status: 200 }),
    );
    global.fetch = fetchMock;

    const form = new FormData();
    form.append("file", new Blob(["x"], { type: "audio/webm" }));
    await apiRequest("/api/x", { method: "POST", body: form });

    const [, init] = fetchMock.mock.calls[0];
    const headers = (init as RequestInit).headers as Record<string, string>;
    expect(headers["Content-Type"]).toBeUndefined();
    expect(headers["Authorization"]).toBe("Bearer test-token");
  });
});

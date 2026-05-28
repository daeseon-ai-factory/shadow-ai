import { test, expect, Page, APIRequestContext } from "@playwright/test";

const BACKEND = "http://localhost:8080";

interface User { email: string; password: string; displayName: string; }

function freshUser(suffix = ""): User {
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    email: `e2e-${stamp}${suffix}@example.com`,
    password: "supersecret123",
    displayName: `E2E ${stamp}`,
  };
}

async function signupEn(page: Page, user: User) {
  await page.goto("/en/signup");
  await page.getByLabel("Name").fill(user.displayName);
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.waitForURL(/\/library/, { timeout: 15_000 });
}

async function loginViaApi(request: APIRequestContext, user: User): Promise<string> {
  const r = await request.post(`${BACKEND}/api/auth/login`, {
    data: { email: user.email, password: user.password },
  });
  expect(r.ok()).toBeTruthy();
  return (await r.json()).data.accessToken;
}

async function videoWithTranscript(request: APIRequestContext, token: string): Promise<string | null> {
  const r = await request.get(`${BACKEND}/api/collections/developer-picks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok()) return null;
  const body = await r.json();
  const entries = body.data?.videos ?? [];
  const ready = entries.find((e: { video: { transcriptStatus: string } }) =>
    e.video?.transcriptStatus === "READY");
  return ready?.video?.id ?? entries[0]?.video?.id ?? null;
}

test.describe("AI primaryTranslation", () => {
  test("Claude returns a Korean translation field and the AI panel renders it", async ({ page, request }) => {
    test.setTimeout(120_000); // Claude call can take 5-30s

    const user = freshUser("-tr");
    await signupEn(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await videoWithTranscript(request, token);
    test.skip(!videoId, "no seeded video");

    const created = await request.post(`${BACKEND}/api/clips`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { videoId, startMs: 0, endMs: 8000, name: "Translation test", tags: [] },
    });
    const clipId = (await created.json()).data.id;

    // Wait for analysis to flip PENDING → READY (Claude returns; max ~60s with retries).
    let status = "PENDING";
    let analysis: { primaryTranslation?: string | null; status?: string } = {};
    for (let i = 0; i < 30; i++) {
      const r = await request.get(`${BACKEND}/api/clips/${clipId}/analysis`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (r.ok()) {
        analysis = (await r.json()).data;
        status = analysis.status ?? "PENDING";
        if (status === "READY" || status === "FAILED") break;
      }
      await new Promise((res) => setTimeout(res, 2000));
    }
    expect(status, `analysis ended ${status}`).toBe("READY");
    expect(analysis.primaryTranslation, "primaryTranslation should be populated").toBeTruthy();
    expect(analysis.primaryTranslation!.length).toBeGreaterThan(2);

    // UI renders the translation section
    await page.goto(`/en/player/${clipId}`);
    await expect(page.getByRole("heading", { name: "Translation test" })).toBeVisible({ timeout: 15_000 });
    await page.getByRole("tab", { name: /AI/i }).click();
    const section = page.getByTestId("primary-translation");
    await expect(section).toBeVisible({ timeout: 15_000 });
    await expect(section).toContainText(analysis.primaryTranslation!);
    await page.screenshot({ path: "test-results/primary-translation.png", fullPage: true });
  });
});

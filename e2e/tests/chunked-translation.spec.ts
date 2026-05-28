import { test, expect, Page, APIRequestContext } from "@playwright/test";

const BACKEND = "http://localhost:8080";

interface User { email: string; password: string; displayName: string; }

function freshUser(suffix = ""): User {
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return { email: `e2e-${stamp}${suffix}@example.com`, password: "supersecret123", displayName: `E2E ${stamp}` };
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
  const r = await request.post(`${BACKEND}/api/auth/login`, { data: { email: user.email, password: user.password } });
  expect(r.ok()).toBeTruthy();
  return (await r.json()).data.accessToken;
}

async function firstVideoId(request: APIRequestContext, token: string): Promise<string | null> {
  const r = await request.get(`${BACKEND}/api/collections/developer-picks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok()) return null;
  const body = await r.json();
  const entries = body.data?.videos ?? [];
  return entries.find((e: { video: { transcriptStatus: string } }) =>
    e.video?.transcriptStatus === "READY")?.video?.id ?? entries[0]?.video?.id ?? null;
}

test.describe("Chunked translation (직독직해)", () => {
  test("Gemini returns chunked_translation pairs; UI renders en/ko in source order", async ({ page, request }) => {
    test.setTimeout(120_000);

    const user = freshUser("-chunk");
    await signupEn(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await firstVideoId(request, token);
    test.skip(!videoId, "no seeded video");

    const created = await request.post(`${BACKEND}/api/clips`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { videoId, startMs: 0, endMs: 8000, name: "Chunk test", tags: [] },
    });
    const clipId = (await created.json()).data.id;

    // Wait for analysis
    let analysis: { status?: string; chunkedTranslation?: { en: string; ko: string }[] } = {};
    for (let i = 0; i < 30; i++) {
      const r = await request.get(`${BACKEND}/api/clips/${clipId}/analysis`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (r.ok()) {
        analysis = (await r.json()).data;
        if (analysis.status === "READY" || analysis.status === "FAILED") break;
      }
      await new Promise((res) => setTimeout(res, 2000));
    }
    expect(analysis.status, `ended ${analysis.status}`).toBe("READY");
    expect(analysis.chunkedTranslation, "chunkedTranslation should be populated").toBeTruthy();
    expect(analysis.chunkedTranslation!.length).toBeGreaterThanOrEqual(2);

    // Every chunk must have non-empty en + ko
    for (const c of analysis.chunkedTranslation!) {
      expect(c.en.length).toBeGreaterThan(0);
      expect(c.ko.length).toBeGreaterThan(0);
    }

    // UI renders the chunked section under AI tab
    await page.goto(`/en/player/${clipId}`);
    await expect(page.getByRole("heading", { name: "Chunk test" })).toBeVisible({ timeout: 15_000 });
    await page.getByRole("tab", { name: /AI/i }).click();
    const section = page.getByTestId("chunked-translation");
    await expect(section).toBeVisible({ timeout: 15_000 });

    // First chunk's English should appear in the UI
    const firstEn = analysis.chunkedTranslation![0].en;
    await expect(section).toContainText(firstEn);
    await page.screenshot({ path: "test-results/chunked-translation.png", fullPage: true });
  });
});

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

test.describe("Quiz Scenario mode", () => {
  test("AI generates a practice scenario; UI renders it and shows sample after Check", async ({ page, request }) => {
    test.setTimeout(120_000);

    const user = freshUser("-sc");
    await signupEn(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await firstVideoId(request, token);
    test.skip(!videoId, "no seeded video");

    const created = await request.post(`${BACKEND}/api/clips`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { videoId, startMs: 0, endMs: 15000, name: "Scenario test", tags: [] },
    });
    const clipId = (await created.json()).data.id;

    let analysis: { status?: string; practiceScenario?: { situation: string; sampleResponse: string } | null } = {};
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
    expect(analysis.status).toBe("READY");
    expect(analysis.practiceScenario).toBeTruthy();
    expect(analysis.practiceScenario!.situation.length).toBeGreaterThan(10);
    expect(analysis.practiceScenario!.sampleResponse.length).toBeGreaterThan(5);

    await page.goto("/en/review");
    await expect(page.getByRole("heading", { name: /Scenario test|Review/i })).toBeVisible({ timeout: 15_000 });
    await page.getByTestId("mode-scenario").click();

    const quiz = page.getByTestId("scenario-quiz");
    await expect(quiz).toBeVisible({ timeout: 10_000 });
    // Situation should appear
    await expect(quiz).toContainText(analysis.practiceScenario!.situation.slice(0, 20));

    // Type something + Check → sample reveals
    await page.getByTestId("scenario-input").fill("I would say something like that.");
    await page.getByTestId("scenario-check").click();
    const sample = page.getByTestId("scenario-sample");
    await expect(sample).toBeVisible();
    await expect(sample).toContainText(analysis.practiceScenario!.sampleResponse.slice(0, 15));
    await page.screenshot({ path: "test-results/scenario-quiz.png", fullPage: true });
  });
});

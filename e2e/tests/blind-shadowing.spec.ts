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
  // Prefer a video that already has subtitles READY — otherwise the player won't show
  // a transcript and the blind panel won't render.
  const ready = entries.find((e: { video: { transcriptStatus: string } }) =>
    e.video?.transcriptStatus === "READY");
  return ready?.video?.id ?? entries[0]?.video?.id ?? null;
}

test.describe("Blind shadowing mode", () => {
  test("toggle cycles Show → Hints → Blank, transcript transforms accordingly", async ({ page, request }) => {
    const user = freshUser("-blind");
    await signupEn(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await videoWithTranscript(request, token);
    test.skip(!videoId, "no seeded video");

    const created = await request.post(`${BACKEND}/api/clips`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { videoId, startMs: 0, endMs: 8000, name: "Blind test", tags: [] },
    });
    expect(created.ok()).toBeTruthy();
    const clipId = (await created.json()).data.id;

    await page.goto(`/en/player/${clipId}`);
    await expect(page.getByRole("heading", { name: "Blind test" })).toBeVisible({ timeout: 15_000 });
    const transcript = page.getByTestId("blind-transcript");
    await expect(transcript).toBeVisible({ timeout: 10_000 });
    await expect(transcript).toHaveAttribute("data-blind-level", "2");
    const original = (await transcript.textContent()) ?? "";
    expect(original.length).toBeGreaterThan(0);
    expect(original).not.toMatch(/▮/);

    await page.getByRole("button", { name: "Blank" }).click();
    await expect(transcript).toHaveAttribute("data-blind-level", "0");
    await expect(transcript).toContainText("▮");
    await page.screenshot({ path: "test-results/blind-level-0.png", fullPage: true });

    await page.getByRole("button", { name: "Hints" }).click();
    await expect(transcript).toHaveAttribute("data-blind-level", "1");
    const hint = (await transcript.textContent()) ?? "";
    expect(hint).toMatch(/_/);
    expect(hint).not.toMatch(/▮/);
    await page.screenshot({ path: "test-results/blind-level-1.png", fullPage: true });

    await page.getByRole("button", { name: "Show" }).click();
    await expect(transcript).toHaveAttribute("data-blind-level", "2");
    await expect(transcript).toHaveText(original);
  });

  test("'b' shortcut cycles 2 → 1 → 0 → 2", async ({ page, request }) => {
    const user = freshUser("-blindkey");
    await signupEn(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await videoWithTranscript(request, token);
    test.skip(!videoId, "no seeded video");

    const r = await request.post(`${BACKEND}/api/clips`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { videoId, startMs: 0, endMs: 8000, name: "Blind key", tags: [] },
    });
    const clipId = (await r.json()).data.id;
    await page.goto(`/en/player/${clipId}`);
    await expect(page.getByRole("heading", { name: "Blind key" })).toBeVisible({ timeout: 15_000 });
    const transcript = page.getByTestId("blind-transcript");
    await expect(transcript).toBeVisible({ timeout: 10_000 });
    await expect(transcript).toHaveAttribute("data-blind-level", "2");

    await page.keyboard.press("b");
    await expect(transcript).toHaveAttribute("data-blind-level", "1");
    await page.keyboard.press("b");
    await expect(transcript).toHaveAttribute("data-blind-level", "0");
    await page.keyboard.press("b");
    await expect(transcript).toHaveAttribute("data-blind-level", "2");
  });
});

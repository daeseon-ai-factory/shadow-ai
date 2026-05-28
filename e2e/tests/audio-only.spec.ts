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

test.describe("Audio-only mode", () => {
  test("toggle hides the video and shows large caption; persists across reload", async ({ page, request }) => {
    const user = freshUser("-audio");
    await signupEn(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await videoWithTranscript(request, token);
    test.skip(!videoId, "no seeded video");

    const created = await request.post(`${BACKEND}/api/clips`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { videoId, startMs: 0, endMs: 8000, name: "Audio mode test", tags: [] },
    });
    const clipId = (await created.json()).data.id;
    await page.goto(`/en/player/${clipId}`);
    await expect(page.getByRole("heading", { name: "Audio mode test" })).toBeVisible({ timeout: 15_000 });

    // Default: overlay NOT visible.
    const overlay = page.getByTestId("audio-only-overlay");
    await expect(overlay).toBeHidden();

    // Click the toggle.
    await page.getByTestId("audio-only-toggle").click();
    await expect(overlay).toBeVisible();

    // Overlay shows transcript text large.
    const transcriptText = await page.evaluate(() =>
      document.querySelector('[data-testid="audio-only-overlay"] p')?.textContent ?? ""
    );
    expect(transcriptText.length).toBeGreaterThan(0);
    await page.screenshot({ path: "test-results/audio-only-on.png", fullPage: true });

    // Toggle off via the same button.
    await page.getByTestId("audio-only-toggle").click();
    await expect(overlay).toBeHidden();
    await page.screenshot({ path: "test-results/audio-only-off.png", fullPage: true });

    // 'v' shortcut also toggles.
    await page.keyboard.press("v");
    await expect(overlay).toBeVisible();

    // Persists across reload.
    await page.reload();
    await expect(page.getByRole("heading", { name: "Audio mode test" })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("audio-only-overlay")).toBeVisible({ timeout: 10_000 });
  });
});

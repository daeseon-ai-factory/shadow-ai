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
  return (await r.json()).data?.videos?.[0]?.video?.id ?? null;
}

test.describe("Playlist + Review deck filter", () => {
  test("Play deck → Next button moves to next clip in queue", async ({ page, request }) => {
    test.setTimeout(60_000);

    const user = freshUser("-pl");
    await signupEn(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await firstVideoId(request, token);
    test.skip(!videoId, "no seeded video");

    // Create deck + two clips in it
    const deck = await request.post(`${BACKEND}/api/decks`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { name: "Playlist test deck" },
    });
    const deckId = (await deck.json()).data.id;
    const clipIds: string[] = [];
    for (const name of ["one", "two"]) {
      const r = await request.post(`${BACKEND}/api/clips`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { videoId, startMs: 0, endMs: 3000, name, tags: [] },
      });
      const id = (await r.json()).data.id;
      clipIds.push(id);
      await request.patch(`${BACKEND}/api/decks/clips/${id}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { deckId },
      });
    }

    // Library → click ▶ (hover-only opacity, so force-click directly)
    await page.goto("/en/library");
    const row = page.locator(`[data-testid='deck-sidebar']`).getByText("Playlist test deck");
    await expect(row).toBeVisible({ timeout: 10_000 });
    await row.hover();
    const playBtn = page.getByTestId("deck-play").last();
    await playBtn.click({ force: true });

    // Should land on /player/<first>?deck=<deckId>
    await page.waitForURL(/\/player\/.+\?deck=.+/, { timeout: 10_000 });
    // Playlist controls visible
    const controls = page.getByTestId("playlist-controls");
    await expect(controls).toBeVisible({ timeout: 15_000 });
    await expect(controls).toContainText("1 / 2");

    // Click Next
    await controls.getByRole("button", { name: /Next|다음/i }).click();
    await page.waitForURL(/\/player\/.+\?deck=.+/, { timeout: 10_000 });
    const controls2 = page.getByTestId("playlist-controls");
    await expect(controls2).toContainText("2 / 2", { timeout: 10_000 });
    await page.screenshot({ path: "test-results/playlist-next.png", fullPage: true });
  });

  test("Review deck filter narrows the queue", async ({ page, request }) => {
    test.setTimeout(60_000);

    const user = freshUser("-rd");
    await signupEn(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await firstVideoId(request, token);
    test.skip(!videoId, "no seeded video");

    // Two clips in one deck, one in inbox
    const deck = await request.post(`${BACKEND}/api/decks`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { name: "OOP" },
    });
    const deckId = (await deck.json()).data.id;
    for (const name of ["a", "b"]) {
      const r = await request.post(`${BACKEND}/api/clips`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { videoId, startMs: 0, endMs: 3000, name, tags: [] },
      });
      await request.patch(`${BACKEND}/api/decks/clips/${(await r.json()).data.id}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { deckId },
      });
    }
    await request.post(`${BACKEND}/api/clips`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { videoId, startMs: 0, endMs: 3000, name: "inbox-clip", tags: [] },
    });

    await page.goto("/en/review");
    // Default: ALL → 3 items
    await expect(page.locator("text=1 / 3")).toBeVisible({ timeout: 10_000 });

    // Switch to OOP deck → 2 items
    await page.getByTestId("review-deck-filter").selectOption({ label: "OOP" });
    await expect(page.locator("text=1 / 2")).toBeVisible({ timeout: 10_000 });

    // Inbox → 1 item
    await page.getByTestId("review-deck-filter").selectOption({ label: "Inbox" });
    await expect(page.locator("text=1 / 1")).toBeVisible({ timeout: 10_000 });
  });
});

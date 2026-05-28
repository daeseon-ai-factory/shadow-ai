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
  return entries[0]?.video?.id ?? null;
}

test.describe("Decks", () => {
  test("create deck → move clip to deck → filter library → clip count updates", async ({ page, request }) => {
    test.setTimeout(60_000);

    const user = freshUser("-deck");
    await signupEn(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await firstVideoId(request, token);
    test.skip(!videoId, "no seeded video");

    // Make two clips so filter is meaningful
    for (const name of ["clip A", "clip B"]) {
      await request.post(`${BACKEND}/api/clips`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { videoId, startMs: 0, endMs: 5000, name, tags: [] },
      });
    }

    await page.goto("/en/library");
    const sidebar = page.getByTestId("deck-sidebar");
    await expect(sidebar).toBeVisible({ timeout: 10_000 });

    // Create a deck
    await page.getByTestId("deck-new-button").click();
    await page.getByTestId("deck-create-input").fill("OOP basics");
    await page.keyboard.press("Enter");
    await expect(sidebar).toContainText("OOP basics", { timeout: 5000 });

    // Move clip A → OOP basics (first card's deck <select>)
    const selects = page.getByTestId("clip-deck-select");
    await selects.first().selectOption({ label: "OOP basics" });
    // Sidebar count should bump to 1
    await expect(sidebar.getByText(/OOP basics\s*\(1\)/)).toBeVisible({ timeout: 5000 });

    // Filter to OOP basics — only clip A visible
    await sidebar.getByText("OOP basics").click();
    const cards = page.locator("[data-testid='clip-deck-select']");
    await expect(cards).toHaveCount(1);

    // Back to All — both visible
    await sidebar.getByText("All clips").click();
    await expect(cards).toHaveCount(2);

    await page.screenshot({ path: "test-results/decks-sidebar.png", fullPage: true });
  });
});

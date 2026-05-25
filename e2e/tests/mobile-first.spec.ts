import { test, expect } from "@playwright/test";

const BACKEND = "http://localhost:8080";

function freshUser() {
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  return {
    email: `e2e-mob-${stamp}@example.com`,
    password: "supersecret123",
    displayName: `Mob ${stamp}`,
  };
}

// File-level use() — keep chromium (webkit not installed) but emulate iPhone 12 metrics.
test.use({
  viewport: { width: 390, height: 664 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
});

test.describe("Mobile-first checks", () => {

  test("library + nav fit a 390px viewport without horizontal scroll", async ({ page, request }) => {
    const user = freshUser();
    await page.goto("/signup");
    await page.getByLabel("이름").fill(user.displayName);
    await page.getByLabel("이메일").fill(user.email);
    await page.getByLabel("비밀번호").fill(user.password);
    await page.getByRole("button", { name: "회원가입" }).click();
    await page.waitForURL("**/library");

    // No body horizontal scroll
    const overflowsX = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflowsX).toBeFalsy();

    await expect(page.getByRole("heading", { name: "라이브러리" })).toBeVisible();
    await page.screenshot({ path: "test-results/mobile-library.png", fullPage: true });
  });

  test("clip player on mobile shows 4 tabs (script/note/ai/record), not 4 stacked cards", async ({ page, request }) => {
    const user = freshUser();
    await page.goto("/signup");
    await page.getByLabel("이름").fill(user.displayName);
    await page.getByLabel("이메일").fill(user.email);
    await page.getByLabel("비밀번호").fill(user.password);
    await page.getByRole("button", { name: "회원가입" }).click();
    await page.waitForURL("**/library");

    const token = await page.request
      .post(`${BACKEND}/api/auth/login`, { data: { email: user.email, password: user.password } })
      .then((r) => r.json()).then((j) => j.data.accessToken);
    const collection = await page.request
      .get(`${BACKEND}/api/collections/developer-picks`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json());
    const videoId = collection.data.videos?.[0]?.video?.id;
    test.skip(!videoId, "no seeded video");

    const clip = await page.request
      .post(`${BACKEND}/api/clips`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { videoId, startMs: 0, endMs: 3000, name: "Mobile player", tags: [] },
      })
      .then((r) => r.json());

    await page.goto(`/player/${clip.data.id}`);
    await expect(page.getByRole("heading", { name: "Mobile player" })).toBeVisible({ timeout: 15_000 });

    // 4 tab triggers
    await expect(page.getByRole("tab", { name: "자막" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "노트" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "AI" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "녹음" })).toBeVisible();

    // Default visible panel is 자막 (CardTitle is a div, so match by text)
    await expect(page.getByText("쉐도잉 자막")).toBeVisible();

    // Switching tabs reveals the other panels
    await page.getByRole("tab", { name: "노트" }).click();
    await expect(page.getByText("내 노트")).toBeVisible();

    await page.getByRole("tab", { name: "AI" }).click();
    await expect(page.getByText("AI 설명")).toBeVisible();

    await page.getByRole("tab", { name: "녹음" }).click();
    await expect(page.getByText("녹음 + A/B 비교")).toBeVisible();

    await page.screenshot({ path: "test-results/mobile-player.png", fullPage: true });

    const overflowsX = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflowsX).toBeFalsy();
  });
});

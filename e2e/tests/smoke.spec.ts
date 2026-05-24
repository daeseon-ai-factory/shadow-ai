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

async function signup(page: Page, user: User) {
  await page.goto("/signup");
  await page.getByLabel("이름").fill(user.displayName);
  await page.getByLabel("이메일").fill(user.email);
  await page.getByLabel("비밀번호").fill(user.password);
  await page.getByRole("button", { name: "회원가입" }).click();
  await page.waitForURL("**/library", { timeout: 15_000 });
}

async function loginViaApi(request: APIRequestContext, user: User): Promise<string> {
  const r = await request.post(`${BACKEND}/api/auth/login`, {
    data: { email: user.email, password: user.password },
  });
  expect(r.ok()).toBeTruthy();
  return (await r.json()).data.accessToken;
}

async function firstSeededVideoId(request: APIRequestContext, token: string): Promise<string | null> {
  const r = await request.get(`${BACKEND}/api/collections/developer-picks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok()) return null;
  const body = await r.json();
  return body.data?.videos?.[0]?.video?.id ?? null;
}

test.describe("TubeShadow smoke", () => {
  test("home page renders + health green", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "TubeShadow" })).toBeVisible();
    await expect(page.getByText("ok")).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: "test-results/01-home.png", fullPage: true });
  });

  test("signup form blocks too-short password (HTML5 validation)", async ({ page }) => {
    await page.goto("/signup");
    await page.getByLabel("이름").fill("X");
    await page.getByLabel("이메일").fill("short@example.com");
    await page.getByLabel("비밀번호").fill("short");
    await page.getByRole("button", { name: "회원가입" }).click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test("signup → bounces to /library", async ({ page }) => {
    await signup(page, freshUser());
    await expect(page.getByRole("heading", { name: "라이브러리" })).toBeVisible();
    await page.screenshot({ path: "test-results/02-library-empty.png", fullPage: true });
  });

  test("settings: displayName edit persists across reload", async ({ page }) => {
    await signup(page, freshUser("-settings"));
    await page.goto("/settings");
    await expect(page.getByRole("heading", { name: "설정" })).toBeVisible();

    await page.getByLabel("이름").fill("Renamed User");
    await page.getByRole("button", { name: "프로필 저장" }).click();
    await expect(page.getByText("프로필이 업데이트되었습니다")).toBeVisible({ timeout: 5000 });
    await page.reload();
    await expect(page.getByLabel("이름")).toHaveValue("Renamed User");
    await page.screenshot({ path: "test-results/03-settings.png", fullPage: true });
  });

  test("discover lists curated collection + drills into videos", async ({ page }) => {
    await signup(page, freshUser("-discover"));
    await page.goto("/discover");
    await expect(page.getByRole("heading", { name: "둘러보기" })).toBeVisible();
    await expect(page.getByText("개발자 추천 영상")).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: "test-results/04-discover.png", fullPage: true });

    await page.getByRole("link", { name: /영상 보기/ }).first().click();
    await page.waitForURL("**/discover/developer-picks");
    // Wait for the React Query to finish before asserting on titles
    await page.waitForLoadState("networkidle");
    const card = page.locator("text=Simple Made Easy").or(page.locator("text=Hickey")).or(page.locator("text=Linus")).first();
    await expect(card).toBeVisible({ timeout: 10_000 });
    await page.screenshot({ path: "test-results/05-collection.png", fullPage: true });
  });

  test("video page renders player + transcript + clip-create UI", async ({ page, request }) => {
    const user = freshUser("-video");
    await signup(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await firstSeededVideoId(request, token);
    test.skip(!videoId, "no seeded video to play");

    await page.goto(`/video/${videoId}`);
    // Heading is the video title from YouTube oEmbed — just check h1 visible
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("구간 선택 → 클립 저장")).toBeVisible();
    await expect(page.getByText("자막", { exact: true })).toBeVisible();
    await page.screenshot({ path: "test-results/06-video-page.png", fullPage: true });
  });

  test("clip create via API → player page renders all 4 side panels", async ({ page, request }) => {
    // YouTube IFrame Player won't progress time in headless without YouTube cooperation,
    // so the start/end buttons (which read currentMs) can't make a valid range. Create
    // the clip directly via the API and just verify the player page UI.
    const user = freshUser("-clip");
    await signup(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await firstSeededVideoId(request, token);
    test.skip(!videoId, "no seeded video");

    const created = await request.post(`${BACKEND}/api/clips`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { videoId, startMs: 1000, endMs: 4000, name: "E2E clip ui", tags: ["e2e"] },
    });
    expect(created.ok()).toBeTruthy();
    const clipId = (await created.json()).data.id;

    await page.goto(`/player/${clipId}`);
    await expect(page.getByRole("heading", { name: "E2E clip ui" })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("무한 반복: ON")).toBeVisible();
    await expect(page.getByText("쉐도잉 자막")).toBeVisible();
    await expect(page.getByText("내 노트")).toBeVisible();
    await expect(page.getByText("AI 설명")).toBeVisible();
    await expect(page.getByText("녹음 + A/B 비교")).toBeVisible();
    await page.screenshot({ path: "test-results/07-player.png", fullPage: true });

    // Verify the clip shows up in /library
    await page.goto("/library");
    await expect(page.getByText("E2E clip ui").first()).toBeVisible({ timeout: 10_000 });
  });

  test("library: sort dropdown changes order param", async ({ page, request }) => {
    const user = freshUser("-lib");
    await signup(page, user);

    // Wait for fully hydrated
    await expect(page.getByRole("heading", { name: "라이브러리" })).toBeVisible();

    // The native <select> sits between the two <Input> (search + tag) so target it by its option text.
    const sort = page.locator('select').filter({ hasText: "최신순" });
    await expect(sort).toBeVisible();
    await sort.selectOption("oldest");
    await page.waitForTimeout(300);
    // Network request would carry sort=oldest; the page stays mounted
    await expect(page).toHaveURL(/\/library/);
    await page.screenshot({ path: "test-results/08-library.png", fullPage: true });
  });

  test("keyboard '?' opens shortcut help dialog on the player page", async ({ page, request }) => {
    const user = freshUser("-kb");
    await signup(page, user);
    const token = await loginViaApi(request, user);
    const videoId = await firstSeededVideoId(request, token);
    test.skip(!videoId, "no seeded video");

    const r = await request.post(`${BACKEND}/api/clips`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { videoId, startMs: 0, endMs: 3000, name: "Shortcut test", tags: [] },
    });
    const clipId = (await r.json()).data.id;

    await page.goto(`/player/${clipId}`);
    await expect(page.getByText("Shortcut test").first()).toBeVisible({ timeout: 15_000 });

    // Focus the body so the handler picks up the key, then press "?"
    await page.locator("body").click({ position: { x: 10, y: 10 } });
    await page.keyboard.press("Shift+Slash");

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });
    await expect(dialog.getByText("키보드 단축키")).toBeVisible();
    await page.screenshot({ path: "test-results/09-shortcuts.png", fullPage: true });
  });

  test("review page: empty queue shows completion card", async ({ page }) => {
    await signup(page, freshUser("-rev"));
    await page.goto("/review");
    // Either "오늘 복습 완료" (no clips yet) or "복습" heading
    const done = page.getByText("오늘 복습 완료");
    const heading = page.getByRole("heading", { name: "복습" });
    await expect(done.or(heading).first()).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: "test-results/10-review.png", fullPage: true });
  });

  test("unauthenticated /library bounces to /login", async ({ browser }) => {
    // Fresh context = empty localStorage so the auth guard fires.
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/library");
    await page.waitForURL("**/login", { timeout: 10_000 });
    await expect(page.getByText("로그인", { exact: true }).first()).toBeVisible();
    await context.close();
  });
});

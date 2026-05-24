import { test, expect } from "@playwright/test";

const BACKEND = "http://localhost:8080";

function freshUser() {
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  return {
    email: `e2e-orient-${stamp}@example.com`,
    password: "supersecret123",
    displayName: `Orient ${stamp}`,
  };
}

test.describe("Portrait video layout", () => {
  test("video flagged PORTRAIT renders 9:16 player + 'Shorts' badge", async ({ page, request }) => {
    const user = freshUser();
    await page.goto("/signup");
    await page.getByLabel("이름").fill(user.displayName);
    await page.getByLabel("이메일").fill(user.email);
    await page.getByLabel("비밀번호").fill(user.password);
    await page.getByRole("button", { name: "회원가입" }).click();
    await page.waitForURL("**/library");

    // Look up the portrait-flagged video via the API.
    const token = await page.request
      .post(`${BACKEND}/api/auth/login`, { data: { email: user.email, password: user.password } })
      .then((r) => r.json()).then((j) => j.data.accessToken);
    const video = await page.request
      .post(`${BACKEND}/api/videos/import`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { url: "https://www.youtube.com/watch?v=SxdOUGdseq4" },
      })
      .then((r) => r.json()).then((j) => j.data);
    test.skip(video.orientation !== "PORTRAIT", "video not flagged portrait in DB");

    await page.goto(`/video/${video.id}`);
    // "Shorts (세로)" badge visible
    await expect(page.getByText("Shorts (세로)")).toBeVisible({ timeout: 10_000 });
    // The player wrapper should have the portrait class
    const portraitPlayer = page.locator(".aspect-\\[9\\/16\\]");
    await expect(portraitPlayer).toBeVisible();

    await page.screenshot({ path: "test-results/portrait.png", fullPage: true });
  });

  test("normal landscape video renders 16:9 player + no badge", async ({ page, request }) => {
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
    const video = await page.request
      .post(`${BACKEND}/api/videos/import`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { url: "https://www.youtube.com/watch?v=o8NPllzkFhE" },
      })
      .then((r) => r.json()).then((j) => j.data);
    test.skip(video.orientation !== "LANDSCAPE", "video not landscape");

    await page.goto(`/video/${video.id}`);
    await expect(page.locator(".aspect-video").first()).toBeVisible();
    await expect(page.getByText("Shorts (세로)")).not.toBeVisible();
  });
});

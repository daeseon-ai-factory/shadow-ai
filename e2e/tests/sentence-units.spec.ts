import { test, expect, APIRequestContext } from "@playwright/test";

const BACKEND = "http://localhost:8080";

function freshUser() {
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    email: `e2e-sent-${stamp}@example.com`,
    password: "supersecret123",
    displayName: `Sent ${stamp}`,
  };
}

async function signupViaApi(request: APIRequestContext) {
  const user = freshUser();
  const r = await request.post(`${BACKEND}/api/auth/signup`, {
    data: { email: user.email, password: user.password, displayName: user.displayName },
  });
  const token = (await r.json()).data.accessToken;
  return { user, token };
}

async function importLinusVideo(request: APIRequestContext, token: string) {
  const r = await request.post(`${BACKEND}/api/videos/import`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    data: { url: "https://www.youtube.com/watch?v=o8NPllzkFhE" },
  });
  return (await r.json()).data;
}

test.describe("Sentence-level transcript + click-to-select", () => {
  test("API returns sentences shorter than raw segments and >= 1 chars", async ({ request }) => {
    const { token } = await signupViaApi(request);
    const video = await importLinusVideo(request, token);

    expect(video.transcriptStatus).toBe("READY");
    expect(video.transcriptSegments.length).toBeGreaterThan(0);
    expect(video.sentences.length).toBeGreaterThan(0);
    // Merging should at least not increase the count
    expect(video.sentences.length).toBeLessThanOrEqual(video.transcriptSegments.length);
    // Sentences are typically much fewer
    expect(video.sentences.length).toBeLessThan(video.transcriptSegments.length);
    // Every sentence has text + valid time range
    for (const s of video.sentences) {
      expect(typeof s.text).toBe("string");
      expect(s.text.length).toBeGreaterThan(0);
      expect(s.endMs).toBeGreaterThan(s.startMs);
    }
  });

  test("video page shows sentence count badge + click-to-select state machine", async ({ page, request }) => {
    const { user } = await signupViaApi(request);

    // signup via UI so localStorage has the token for the browsing flow
    await page.goto("/signup");
    await page.getByLabel("이름").fill(user.displayName);
    await page.getByLabel("이메일").fill(user.email + "-ui");
    await page.getByLabel("비밀번호").fill(user.password);
    await page.getByRole("button", { name: "회원가입" }).click();
    await page.waitForURL("**/library");

    // We need a Linus video imported under THIS user — sign-in token of API is different,
    // so just trigger import via UI quickly through /import or directly via api/videos/import.
    const apiToken = await page
      .request.post(`${BACKEND}/api/auth/login`, {
        data: { email: user.email + "-ui", password: user.password },
      })
      .then((r) => r.json())
      .then((j) => j.data.accessToken);
    const video = await page.request
      .post(`${BACKEND}/api/videos/import`, {
        headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
        data: { url: "https://www.youtube.com/watch?v=o8NPllzkFhE" },
      })
      .then((r) => r.json())
      .then((j) => j.data);
    test.skip(video.transcriptStatus !== "READY", "transcript not available");

    await page.goto(`/video/${video.id}`);
    // sentence count badge (e.g. "자막 246문장 (원본 460개)")
    await expect(page.getByText(/자막 \d+문장/)).toBeVisible({ timeout: 10_000 });

    // The transcript panel renders as a list of buttons; pick the first two.
    const sentenceButtons = page.locator('[data-idx]');
    await expect(sentenceButtons.first()).toBeVisible();
    const count = await sentenceButtons.count();
    expect(count).toBeGreaterThan(10);

    // Hint should say "start point"
    await expect(page.getByText(/자막을 클릭하면 시작점/)).toBeVisible();

    // 1st click → start
    await sentenceButtons.nth(2).click();
    await expect(page.getByText("시작", { exact: true })).toBeVisible();
    // Hint changes to "end"
    await expect(page.getByText(/끝낼 자막을 한 번 더 클릭/)).toBeVisible();

    // 2nd click below → end
    await sentenceButtons.nth(5).click();
    await expect(page.getByText("끝", { exact: true })).toBeVisible();

    // "이 구간 클립 저장" enabled now
    const saveBtn = page.getByRole("button", { name: "이 구간 클립 저장" });
    await expect(saveBtn).toBeEnabled();

    await page.screenshot({ path: "test-results/sentence-select.png", fullPage: true });
  });
});

import { test, expect } from "@playwright/test";

const BACKEND = "http://localhost:8080";

function freshUser() {
  const s = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  return {
    email: `e2e-byo-${s}@example.com`,
    password: "supersecret123",
    displayName: `Byo ${s}`,
  };
}

test.describe("BYOAI (Bring Your Own AI)", () => {
  test("AnalysisPanel shows '내 AI 도구로 보내기' section + tool dropdown", async ({ page, request }) => {
    const u = freshUser();
    await page.goto("/signup");
    await page.getByLabel("이름").fill(u.displayName);
    await page.getByLabel("이메일").fill(u.email);
    await page.getByLabel("비밀번호").fill(u.password);
    await page.getByRole("button", { name: "회원가입" }).click();
    await page.waitForURL("**/library");

    const token = await page.request
      .post(`${BACKEND}/api/auth/login`, { data: { email: u.email, password: u.password } })
      .then((r) => r.json()).then((j) => j.data.accessToken);

    const collection = await page.request
      .get(`${BACKEND}/api/collections/developer-picks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => r.json());
    const videoId = collection.data.videos?.[0]?.video?.id;
    test.skip(!videoId, "no seeded video");

    // Create a clip with non-empty transcript (Linus video at 13~22s has subs)
    const clip = await page.request
      .post(`${BACKEND}/api/clips`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { videoId, startMs: 13460, endMs: 22400, name: "BYOAI test clip", tags: [] },
      })
      .then((r) => r.json());

    await page.goto(`/player/${clip.data.id}`);
    await expect(page.getByRole("heading", { name: "BYOAI test clip" })).toBeVisible({ timeout: 15_000 });

    // BYOAI section
    const section = page.getByText("내 AI 도구로 보내기").locator("..").locator("..");
    await expect(section).toBeVisible();
    await expect(section.getByText("우리 비용 0")).toBeVisible();

    // Dropdown has the 5 known tools
    const select = section.locator("select");
    await expect(select).toBeVisible();
    const options = await select.locator("option").allTextContents();
    expect(options.join(" ")).toContain("ChatGPT");
    expect(options.join(" ")).toContain("Claude");
    expect(options.join(" ")).toContain("Gemini");
    expect(options.join(" ")).toContain("Perplexity");
    expect(options.join(" ")).toContain("복사");

    // "보내기" enabled when clip has transcript
    const sendBtn = section.getByRole("button", { name: "보내기" });
    await expect(sendBtn).toBeEnabled();

    await page.screenshot({ path: "test-results/byoai-panel.png", fullPage: true });
  });

  test("'보내기' click on '복사만' option puts prompt on clipboard", async ({ page, request, browser }) => {
    // Need clipboard permission
    const ctx = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
    const p = await ctx.newPage();
    const u = freshUser();

    await p.goto("/signup");
    await p.getByLabel("이름").fill(u.displayName);
    await p.getByLabel("이메일").fill(u.email);
    await p.getByLabel("비밀번호").fill(u.password);
    await p.getByRole("button", { name: "회원가입" }).click();
    await p.waitForURL("**/library");

    const token = await p.request
      .post(`${BACKEND}/api/auth/login`, { data: { email: u.email, password: u.password } })
      .then((r) => r.json()).then((j) => j.data.accessToken);
    const collection = await p.request
      .get(`${BACKEND}/api/collections/developer-picks`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json());
    const videoId = collection.data.videos?.[0]?.video?.id;
    test.skip(!videoId, "no seeded video");

    const clip = await p.request
      .post(`${BACKEND}/api/clips`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { videoId, startMs: 13460, endMs: 22400, name: "Clip text test", tags: [] },
      })
      .then((r) => r.json());

    await p.goto(`/player/${clip.data.id}`);
    await expect(p.getByRole("heading", { name: "Clip text test" })).toBeVisible({ timeout: 15_000 });

    const section = p.getByText("내 AI 도구로 보내기").locator("..").locator("..");
    const select = section.locator("select");
    // Find the "copy only" option value
    const copyOptValue = await select.locator("option", { hasText: "복사" }).first().getAttribute("value");
    expect(copyOptValue).toBe("copy");
    await select.selectOption("copy");

    await section.getByRole("button", { name: "보내기" }).click();

    // Wait for toast
    await expect(p.getByText(/복사됨/)).toBeVisible({ timeout: 3000 });

    // Read clipboard
    const clipboardText = await p.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain("자막:");
    expect(clipboardText).toContain("문법 포인트");
    expect(clipboardText).toContain("핵심 표현");
    expect(clipboardText).toContain("어휘");
    // The transcript is wrapped in triple quotes — that delimiter must be there
    expect(clipboardText).toContain('"""');
    await ctx.close();
  });
});

import { test, expect } from "@playwright/test";

/**
 * i18n routing + locale-specific rendering + language selector.
 * 5 locales: en (default), ko, ja, zh, es.
 * Backend + frontend dev servers must be up.
 */

test.describe("i18n", () => {
  test("/ redirects to /en (default locale)", async ({ page }) => {
    const response = await page.goto("/");
    expect(page.url()).toMatch(/\/en\/?$/);
    expect(response?.status()).toBeLessThan(400);
  });

  test("/en renders English home + LocaleSelector with 5 options", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: "TubeShadow" })).toBeVisible();
    await expect(page.getByText(/Clip directly from YouTube/i)).toBeVisible();
    await expect(page.getByText("Backend status")).toBeVisible();
    const selector = page.getByLabel("Language");
    await expect(selector).toBeVisible();
    const options = await selector.locator("option").allTextContents();
    expect(options).toEqual(["English", "한국어", "日本語", "中文", "Español"]);
    await page.screenshot({ path: "test-results/i18n-home-en.png", fullPage: true });
  });

  test("/ko renders Korean home", async ({ page }) => {
    await page.goto("/ko");
    await expect(page.getByText(/YouTube 영상에서 직접/)).toBeVisible();
    await expect(page.getByText("백엔드 연결 상태")).toBeVisible();
    await page.screenshot({ path: "test-results/i18n-home-ko.png", fullPage: true });
  });

  test("/ja /zh /es fall back to English content (translation pending)", async ({ page }) => {
    for (const loc of ["ja", "zh", "es"] as const) {
      await page.goto(`/${loc}`);
      await expect(page.getByText(/Clip directly from YouTube/i)).toBeVisible();
      await page.screenshot({ path: `test-results/i18n-home-${loc}.png`, fullPage: true });
    }
  });

  test("LocaleSelector switches /en → /ko", async ({ page }) => {
    await page.goto("/en");
    await page.getByLabel("Language").selectOption("ko");
    await expect(page).toHaveURL(/\/ko\/?$/);
    await expect(page.getByText(/YouTube 영상에서 직접/)).toBeVisible();
    await page.screenshot({ path: "test-results/i18n-switched-to-ko.png", fullPage: true });
  });

  test("/en/login renders English login form", async ({ page }) => {
    await page.goto("/en/login");
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await page.screenshot({ path: "test-results/i18n-login-en.png", fullPage: true });
  });

  test("/ko/login renders Korean login form", async ({ page }) => {
    await page.goto("/ko/login");
    await expect(page.getByLabel("이메일")).toBeVisible();
    await expect(page.getByLabel("비밀번호")).toBeVisible();
    await page.screenshot({ path: "test-results/i18n-login-ko.png", fullPage: true });
  });

  test("/en/signup shows Name + Email + Password labels", async ({ page }) => {
    await page.goto("/en/signup");
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await page.screenshot({ path: "test-results/i18n-signup-en.png", fullPage: true });
  });

  test("/ko/signup shows 이름 + 이메일 + 비밀번호 labels", async ({ page }) => {
    await page.goto("/ko/signup");
    await expect(page.getByLabel("이름")).toBeVisible();
    await expect(page.getByLabel("이메일")).toBeVisible();
    await expect(page.getByLabel("비밀번호")).toBeVisible();
    await page.screenshot({ path: "test-results/i18n-signup-ko.png", fullPage: true });
  });
});

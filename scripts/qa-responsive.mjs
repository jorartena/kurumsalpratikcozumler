import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const widths = [1440, 1180, 980, 820, 760, 560, 390, 320];
const issues = [];
const consoleErrors = [];
const failedRequests = [];
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("response", (response) => {
  if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`);
});

await mkdir("qa-screenshots", { recursive: true });

for (const language of ["tr", "en"]) {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:4177", { waitUntil: "networkidle" });

    if (language === "en") {
      if (width <= 820) {
        await page.getByRole("button", { name: "Menüyü aç" }).click();
      }
      const languageButtons = page.locator(".language-switch button");
      const languageButtonCount = await languageButtons.count();
      if (languageButtonCount !== 2) {
        throw new Error(`Language switch is incomplete at ${width}px (${languageButtonCount} buttons): ${await page.locator("body").innerText()}`);
      }
      await languageButtons.nth(1).click();
    }

    await page.waitForTimeout(1600);
    const result = await page.evaluate(() => {
      const root = document.documentElement;
      const hiddenReveals = [...document.querySelectorAll("[data-reveal]")].filter(
        (node) => getComputedStyle(node).opacity === "0",
      ).length;
      const clippedText = [...document.querySelectorAll("h1,h2,h3,p,summary,a,button,label,span,strong")]
        .filter((node) => {
          const style = getComputedStyle(node);
          if (style.display === "none" || style.visibility === "hidden") return false;
          return node.scrollWidth > node.clientWidth + 2 && style.overflowX !== "visible";
        })
        .slice(0, 8)
        .map((node) => `${node.tagName}.${node.className}`);
      return {
        overflow: root.scrollWidth - root.clientWidth,
        hiddenReveals,
        clippedText,
        images: document.images.length,
        h1: document.querySelectorAll("h1").length,
        h2: document.querySelectorAll("h2").length,
      };
    });

    if (result.overflow > 1 || result.hiddenReveals || result.clippedText.length || result.images !== 1 || result.h1 !== 1) {
      issues.push({ language, width, ...result });
    }

    if ((language === "tr" && width === 1440) || (language === "en" && width === 390)) {
      await page.screenshot({ path: `qa-screenshots/flow-${width}-${language}.png`, fullPage: true });
    }
  }
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:4177", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Menüyü aç" }).click();
const mobileMenuVisible = await page.locator(".header-actions").isVisible();
await page.keyboard.press("Escape");
const mobileMenuClosed = !(await page.locator(".header-actions").isVisible());

await page.locator("details").first().click();
const faqOpen = await page.locator("details").first().getAttribute("open") !== null;

await page.getByRole("button", { name: "Teklif talebi gönder" }).click();
const invalidBlocked = await page.locator(".form-note").getAttribute("class") === "form-note ";
await page.getByLabel("Ad Soyad").fill("Test Kullanıcı");
await page.getByLabel("Kurum / Şirket").fill("Test Kurum");
await page.getByLabel("E-posta").fill("test@example.com");
await page.getByLabel("Talep özeti").fill("Test talebi");
await page.getByRole("button", { name: "Teklif talebi gönder" }).click();
const previewSuccess = (await page.locator(".form-note").getAttribute("class"))?.includes("is-success");

await page.emulateMedia({ reducedMotion: "reduce" });
await page.reload({ waitUntil: "networkidle" });
const reducedMotionVisible = await page.evaluate(
  () => [...document.querySelectorAll("[data-reveal]")].every((node) => getComputedStyle(node).opacity === "1"),
);

console.log(JSON.stringify({
  issues,
  interactions: { mobileMenuVisible, mobileMenuClosed, faqOpen, invalidBlocked, previewSuccess, reducedMotionVisible },
  consoleErrors: [...new Set(consoleErrors)],
  failedRequests: [...new Set(failedRequests)],
}, null, 2));

await browser.close();

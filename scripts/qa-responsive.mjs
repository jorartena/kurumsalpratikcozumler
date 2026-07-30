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

    await page.waitForTimeout(1900);
    const serviceTriggers = page.locator(".service-trigger-hitbox");
    await serviceTriggers.first().click();
    await page.locator(".service-detail img").waitFor({ state: "visible" });
    const result = await page.evaluate(() => {
      const root = document.documentElement;
      const hiddenReveals = [...document.querySelectorAll("[data-reveal]")].filter(
        (node) => getComputedStyle(node).opacity === "0",
      ).length;
      const clippedText = [...document.querySelectorAll("h1,h2,h3,p,summary,a,button,label,span,strong")]
        .filter((node) => {
          const style = getComputedStyle(node);
          if (style.display === "none" || style.visibility === "hidden" || node.classList.contains("sr-only")) return false;
          return node.scrollWidth > node.clientWidth + 2 && style.overflowX !== "visible";
        })
        .slice(0, 8)
        .map((node) => `${node.tagName}.${node.className}`);
      return {
        overflow: root.scrollWidth - root.clientWidth,
        hiddenReveals,
        clippedText,
        heroImages: document.querySelectorAll(".hero-media img").length,
        logos: document.querySelectorAll(".brand-logo").length,
        h1: document.querySelectorAll("h1").length,
        h2: document.querySelectorAll("h2").length,
        processSections: document.querySelectorAll("#process.process-section").length,
        introBands: document.querySelectorAll(".intro-band").length,
        referenceMarks: document.querySelectorAll(".reference-mark").length,
        referenceLinks: document.querySelectorAll(".references-section a, .references-section button").length,
        referenceNotes: document.querySelectorAll(".references-note").length,
        supplyStrips: document.querySelectorAll(".supply-strip").length,
        sectionOrder: (() => {
          const services = document.querySelector(".services-section");
          const references = document.querySelector(".references-section");
          const scope = document.querySelector(".scope-panel");
          if (!services || !references || !scope) return false;
          return Boolean(
            services.compareDocumentPosition(references) & Node.DOCUMENT_POSITION_FOLLOWING
            && references.compareDocumentPosition(scope) & Node.DOCUMENT_POSITION_FOLLOWING
          );
        })(),
        heroStatValues: [...document.querySelectorAll(".hero-stats strong")].map((node) => node.textContent?.trim()),
        accessibleHeroStats: document.querySelectorAll(".hero-stats .sr-only").length,
        hiddenAnimatedHeroStats: [...document.querySelectorAll(".hero-stats strong")].every(
          (node) => node.getAttribute("aria-hidden") === "true",
        ),
        heroStatsStacked: [...document.querySelectorAll(".hero-stats > div")].every((stat) => {
          const number = stat.querySelector("strong");
          const label = stat.querySelector(".hero-stat-label");
          if (!number || !label) return false;
          const numberBox = number.getBoundingClientRect();
          const labelBox = label.getBoundingClientRect();
          return labelBox.top >= numberBox.bottom && Math.abs(labelBox.left - numberBox.left) <= 1;
        }),
        heroStatsDominant: [...document.querySelectorAll(".hero-stats > div")].every((stat) => {
          const number = stat.querySelector("strong");
          const label = stat.querySelector(".hero-stat-label");
          return number && label
            ? parseFloat(getComputedStyle(number).fontSize) > parseFloat(getComputedStyle(label).fontSize) * 2
            : false;
        }),
        serviceTriggers: document.querySelectorAll(".service-trigger-hitbox").length,
        openServiceDetails: document.querySelectorAll(".service-detail").length,
        expandedServiceTriggers: document.querySelectorAll('.service-trigger-hitbox[aria-expanded="true"]').length,
        visibleServiceImages: document.querySelectorAll(".service-detail img").length,
      };
    });

    if (
      result.overflow > 1
      || result.hiddenReveals
      || result.clippedText.length
      || result.heroImages !== 1
      || result.logos !== 2
      || result.h1 !== 1
      || result.processSections !== 1
      || result.introBands !== 0
      || result.referenceMarks !== 6
      || result.referenceLinks !== 0
      || result.referenceNotes !== 1
      || result.supplyStrips !== 0
      || !result.sectionOrder
      || result.heroStatValues.join("|") !== "9|40+|250+"
      || result.accessibleHeroStats !== 3
      || !result.hiddenAnimatedHeroStats
      || !result.heroStatsStacked
      || !result.heroStatsDominant
      || result.serviceTriggers !== 9
      || result.openServiceDetails !== 1
      || result.expandedServiceTriggers !== 1
      || result.visibleServiceImages !== 1
    ) {
      issues.push({ language, width, ...result });
    }

    if ((language === "tr" && width === 1440) || (language === "en" && width === 390)) {
      await page.waitForTimeout(320);
      await page.locator(".site-header").evaluate((header) => { header.style.visibility = "hidden"; });
      await page.locator(".feature-card.is-open").screenshot({ path: `qa-screenshots/services-open-${width}-${language}.png` });
      await page.locator(".site-header").evaluate((header) => { header.style.visibility = ""; });
      await page.evaluate(() => window.scrollTo(0, 0));
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

const serviceTriggers = page.locator(".service-trigger-hitbox");
await serviceTriggers.first().focus();
await page.keyboard.press("Enter");
const serviceEnterOpens = await serviceTriggers.first().getAttribute("aria-expanded") === "true";
await serviceTriggers.nth(1).focus();
await page.keyboard.press("Space");
const serviceSpaceOpens = (
  await serviceTriggers.first().getAttribute("aria-expanded") === "false"
  && await serviceTriggers.nth(1).getAttribute("aria-expanded") === "true"
  && await page.locator(".service-detail").count() === 1
);
await page.keyboard.press("Space");
const serviceCloses = (
  await serviceTriggers.nth(1).getAttribute("aria-expanded") === "false"
  && await page.locator(".service-detail").count() === 0
);
let everyServiceOpens = true;
for (let index = 0; index < await serviceTriggers.count(); index += 1) {
  await serviceTriggers.nth(index).click();
  const activeImage = page.locator(".service-detail img");
  everyServiceOpens = everyServiceOpens && (
    await serviceTriggers.nth(index).getAttribute("aria-expanded") === "true"
    && await page.locator('.service-trigger-hitbox[aria-expanded="true"]').count() === 1
    && await page.locator(".service-detail").count() === 1
    && await activeImage.count() === 1
    && await activeImage.getAttribute("alt") !== ""
  );
}
await serviceTriggers.last().click();
await serviceTriggers.first().click();
await page.getByRole("button", { name: "Menüyü aç" }).click();
await page.locator(".language-switch button").nth(1).click();
const servicePersistsAcrossLanguage = (
  await page.locator(".service-trigger-hitbox").first().getAttribute("aria-expanded") === "true"
  && await page.getByText("Service file", { exact: true }).isVisible()
);

await page.emulateMedia({ reducedMotion: "no-preference" });
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(1700);
const counterValuesBeforeLanguageChange = await page.locator(".hero-stats strong").allTextContents();
const countersCompleteWithin1700 = counterValuesBeforeLanguageChange.join("|") === "9|40+|250+";
await page.getByRole("button", { name: "Menüyü aç" }).click();
await page.locator(".language-switch button").nth(1).click();
const counterValuesAfterLanguageChange = await page.locator(".hero-stats strong").allTextContents();
const countersPersistAcrossLanguage = (
  countersCompleteWithin1700
  && counterValuesAfterLanguageChange.join("|") === "9|40+|250+"
);

await page.emulateMedia({ reducedMotion: "reduce" });
await page.reload({ waitUntil: "networkidle" });
const reducedMotionVisible = await page.evaluate(
  () => [...document.querySelectorAll("[data-reveal]")].every((node) => getComputedStyle(node).opacity === "1"),
);
const reducedMotionCounterValues = await page.locator(".hero-stats strong").allTextContents();
const reducedMotionCountersFinal = reducedMotionCounterValues.join("|") === "9|40+|250+";

console.log(JSON.stringify({
  issues,
  interactions: {
    mobileMenuVisible,
    mobileMenuClosed,
    faqOpen,
    invalidBlocked,
    previewSuccess,
    serviceEnterOpens,
    serviceSpaceOpens,
    serviceCloses,
    everyServiceOpens,
    servicePersistsAcrossLanguage,
    countersCompleteWithin1700,
    countersPersistAcrossLanguage,
    reducedMotionVisible,
    reducedMotionCountersFinal,
  },
  consoleErrors: [...new Set(consoleErrors)],
  failedRequests: [...new Set(failedRequests)],
}, null, 2));

await browser.close();

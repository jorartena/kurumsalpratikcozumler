import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const widths = [1440, 1180, 980, 820, 760, 560, 390, 360, 320];
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
          if (node.closest(".mobile-section-index")) return false;
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
        referenceImages: document.querySelectorAll(".reference-mark img").length,
        accessibleReferenceMarks: document.querySelectorAll('.reference-group:not([aria-hidden="true"]) .reference-mark').length,
        filledReferenceAlts: document.querySelectorAll('.reference-group:not([aria-hidden="true"]) img[alt]:not([alt=""])').length,
        decorativeReferenceAlts: document.querySelectorAll('.reference-group[aria-hidden="true"] img[alt=""]').length,
        referenceImagesReady: [...document.querySelectorAll(".reference-mark img")].every(
          (image) => image.complete && image.naturalWidth > 0,
        ),
        referenceLinks: document.querySelectorAll(".references-section a, .references-section button").length,
        referenceNotes: document.querySelectorAll(".references-note").length,
        navLinks: document.querySelectorAll(".site-nav a").length,
        navOrder: [...document.querySelectorAll(".site-nav a")].map((link) => link.getAttribute("href")),
        referencesNavLinks: document.querySelectorAll('.site-nav a[href="#references"]').length,
        referenceIntroFirst: (() => {
          const section = document.querySelector(".references-section");
          const intro = document.querySelector(".references-intro");
          const marquee = document.querySelector(".reference-marquee");
          return Boolean(
            section
            && intro
            && marquee
            && section.firstElementChild === intro
            && intro.compareDocumentPosition(marquee) & Node.DOCUMENT_POSITION_FOLLOWING
          );
        })(),
        referenceLayout: (() => {
          const groups = [...document.querySelectorAll(".reference-group")];
          const track = document.querySelector(".reference-track");
          if (groups.length !== 2 || !track) return false;
          const widths = groups.map((group) => group.getBoundingClientRect().width);
          const animation = getComputedStyle(track);
          return Math.abs(widths[0] - widths[1]) <= 1
            && animation.animationIterationCount === "infinite"
            && animation.animationTimingFunction === "linear";
        })(),
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
        mobileHeaderReady: window.innerWidth > 820 || (() => {
          const header = document.querySelector(".site-header");
          const logo = document.querySelector(".brand-logo");
          const languageSwitch = document.querySelector(".language-switch");
          const nav = document.querySelector(".site-nav");
          if (!header || !logo || !languageSwitch || !nav) return false;
          const minimumLogoHeight = window.innerWidth <= 360 ? 44 : 47;
          return header.getBoundingClientRect().height >= 77
            && logo.getBoundingClientRect().height >= minimumLogoHeight
            && languageSwitch.getBoundingClientRect().width > 0
            && getComputedStyle(nav).display === "none";
        })(),
        sectionIndexResponsive: (() => {
          const index = document.querySelector(".mobile-section-index");
          const trigger = document.querySelector(".mobile-section-trigger");
          const oldIndicator = document.querySelector(".mobile-scroll-indicator");
          if (!index || !trigger || oldIndicator) return false;
          const isMobile = window.innerWidth <= 820;
          const triggerBox = trigger.getBoundingClientRect();
          return getComputedStyle(index).display === (isMobile ? "flex" : "none")
            && (!isMobile || (triggerBox.width >= 44 && triggerBox.height >= 44));
        })(),
        menuToggles: document.querySelectorAll(".menu-toggle").length,
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
      || result.referenceMarks !== 14
      || result.referenceImages !== 14
      || result.accessibleReferenceMarks !== 7
      || result.filledReferenceAlts !== 7
      || result.decorativeReferenceAlts !== 7
      || !result.referenceImagesReady
      || result.referenceLinks !== 0
      || result.referenceNotes !== 0
      || result.navLinks !== 5
      || result.navOrder.join("|") !== "#process|#services|#references|#principles|#contact"
      || result.referencesNavLinks !== 1
      || !result.referenceIntroFirst
      || !result.referenceLayout
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
      || !result.mobileHeaderReady
      || !result.sectionIndexResponsive
      || result.menuToggles !== 0
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
      await page.locator(".references-section").screenshot({ path: `qa-screenshots/references-${width}-${language}.png` });
    }
  }
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:4177", { waitUntil: "networkidle" });
const mobileMenuToggleAbsent = await page.locator(".menu-toggle").count() === 0;
const mobileLanguageVisible = await page.locator(".language-switch").isVisible();
const mobileNavHidden = !(await page.locator(".site-nav").isVisible());
await page.evaluate(() => window.scrollTo(0, (document.documentElement.scrollHeight - window.innerHeight) / 2));
await page.waitForTimeout(80);
const sectionLabelShowsOnScroll = await page.locator(".mobile-section-index").evaluate(
  (index) => index.classList.contains("is-label-visible"),
);
const currentSectionLabel = (await page.locator(".mobile-section-readout strong").textContent())?.trim();
await page.screenshot({ path: "qa-screenshots/section-label-390-tr.png" });
await page.waitForTimeout(1050);
const sectionLabelSettlesToTab = !(await page.locator(".mobile-section-index").evaluate(
  (index) => index.classList.contains("is-label-visible"),
));
const sectionTrigger = page.locator(".mobile-section-trigger");
await sectionTrigger.click();
const sectionIndexOpens = (
  await sectionTrigger.getAttribute("aria-expanded") === "true"
  && await page.locator(".mobile-section-menu").isVisible()
  && await page.locator('.mobile-section-menu a[aria-current="location"]').count() === 1
);
await page.locator(".language-switch button").nth(1).click();
const sectionIndexTranslatesLive = (
  (await page.locator(".mobile-section-menu a").allTextContents()).map((label) => label.trim()).join("|")
  === "Home|Process|Services|References|Why Us|Contact"
);
await page.locator(".language-switch button").first().click();
await sectionTrigger.click();
await page.waitForTimeout(250);
await page.screenshot({ path: "qa-screenshots/section-index-open-390-tr.png" });
await page.evaluate(() => window.scrollBy(0, 240));
await page.waitForTimeout(1050);
const sectionIndexStaysOpenOnScroll = (
  await sectionTrigger.getAttribute("aria-expanded") === "true"
  && await page.locator(".mobile-section-index").evaluate((index) => index.classList.contains("is-label-visible"))
);
await page.keyboard.press("Escape");
const sectionIndexClosesWithEscape = await sectionTrigger.getAttribute("aria-expanded") === "false";
await sectionTrigger.click();
await page.mouse.click(10, 400);
const sectionIndexClosesOutside = await sectionTrigger.getAttribute("aria-expanded") === "false";
await sectionTrigger.click();
await page.locator('.mobile-section-menu a[href="#services"]').click();
await page.waitForTimeout(650);
const sectionSelectionWorks = (
  await sectionTrigger.getAttribute("aria-expanded") === "false"
  && await page.locator('.mobile-section-menu a[href="#services"]').getAttribute("aria-current") === "location"
);
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(80);
const sectionIndexEndsAtContact = await page.locator('.mobile-section-menu a[href="#contact"]').getAttribute("aria-current") === "location";
await page.evaluate(() => window.scrollTo(0, 0));

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
const reducedMotionReferences = await page.evaluate(() => {
  const track = document.querySelector(".reference-track");
  const primary = document.querySelector('.reference-group:not([aria-hidden="true"])');
  const duplicate = document.querySelector('.reference-group[aria-hidden="true"]');
  const intro = document.querySelector(".references-intro");
  const marquee = document.querySelector(".reference-marquee");
  if (!track || !primary || !duplicate || !intro || !marquee) return false;
  const visibleMarks = [...primary.querySelectorAll(".reference-mark")].filter((mark) => {
    const box = mark.getBoundingClientRect();
    return box.width > 0 && box.height > 0;
  });
  return getComputedStyle(track).animationName === "none"
    && getComputedStyle(duplicate).display === "none"
    && intro.getBoundingClientRect().bottom <= marquee.getBoundingClientRect().top
    && visibleMarks.length === 7;
});

console.log(JSON.stringify({
  issues,
  interactions: {
    mobileMenuToggleAbsent,
    mobileLanguageVisible,
    mobileNavHidden,
    sectionLabelShowsOnScroll,
    currentSectionLabel,
    sectionLabelSettlesToTab,
    sectionIndexOpens,
    sectionIndexTranslatesLive,
    sectionIndexStaysOpenOnScroll,
    sectionIndexClosesWithEscape,
    sectionIndexClosesOutside,
    sectionSelectionWorks,
    sectionIndexEndsAtContact,
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
    reducedMotionReferences,
  },
  consoleErrors: [...new Set(consoleErrors)],
  failedRequests: [...new Set(failedRequests)],
}, null, 2));

await browser.close();

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Globe2, Menu, X } from "lucide-react";
import heroImage from "./assets/procurement-hero.png";
import dispatchHero from "./assets/dispatch-hero.png";
import dispatchDetail from "./assets/dispatch-detail.png";
import orbitHero from "./assets/orbit-hero.png";
import orbitDetail from "./assets/orbit-detail.png";
import { content, languages, type Language } from "./content";

const CheckIcon = () => <Check size={17} strokeWidth={3} />;

const sectionIds = {
  services: "services",
  process: "process",
  principles: "principles",
  contact: "contact",
};
const themeOptions = [
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Klasik" },
  { id: "premium", label: "Premium" },
  { id: "supply", label: "Tedarik" },
  { id: "flow", label: "S\u00fcre\u00e7" },
  { id: "legacy", label: "Keskin" },
  { id: "dispatch", label: "Sevk" },
  { id: "orbit", label: "Y\u00f6rünge" },
] as const;

type ThemeId = (typeof themeOptions)[number]["id"];

const themeImages: Record<ThemeId, { hero: string; detail: string }> = {
  modern: { hero: heroImage, detail: heroImage },
  classic: { hero: heroImage, detail: heroImage },
  premium: { hero: heroImage, detail: heroImage },
  supply: { hero: heroImage, detail: heroImage },
  flow: { hero: heroImage, detail: heroImage },
  legacy: { hero: heroImage, detail: heroImage },
  dispatch: { hero: dispatchHero, detail: dispatchDetail },
  orbit: { hero: orbitHero, detail: orbitDetail },
};

const themeStorageKey = "optimal-presentation-theme";

const getStoredTheme = (): ThemeId => {
  if (typeof window === "undefined") {
    return "modern";
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey);
  const themeExists = themeOptions.some((option) => option.id === storedTheme);

  return themeExists ? (storedTheme as ThemeId) : "modern";
};

export function App() {
  const [language, setLanguage] = useState<Language>("tr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(getStoredTheme);
  const t = content[language];
  const selectedImages = themeImages[selectedTheme];
  const year = useMemo(() => new Date().getFullYear(), []);
  const visualTiles = [
    {
      title: t.services.items[2].title,
      copy: t.supplyScope.items[0],
    },
    {
      title: t.services.items[3].title,
      copy: t.supplyScope.items[1],
    },
    {
      title: t.services.items[4].title,
      copy: t.supplyScope.items[2],
    },
    {
      title: t.services.items[5].title,
      copy: t.supplyScope.items[3],
    },
  ];

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!elements.length) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.16,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(themeStorageKey, selectedTheme);
  }, [selectedTheme]);

  const switchLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
    document.documentElement.lang = nextLanguage;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`site-shell theme-${selectedTheme}`}>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Optimal Kurumsal Çözümler">
          <span className="brand-mark">O</span>
          <span>
            <strong>Optimal</strong>
            <small>Kurumsal Çözümler</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`header-actions ${menuOpen ? "is-open" : ""}`}>
          <nav className="site-nav" aria-label="Ana navigasyon">
            <a href={`#${sectionIds.services}`} onClick={closeMenu}>
              {t.nav.services}
            </a>
            <a href={`#${sectionIds.process}`} onClick={closeMenu}>
              {t.nav.process}
            </a>
            <a href={`#${sectionIds.principles}`} onClick={closeMenu}>
              {t.nav.principles}
            </a>
            <a href={`#${sectionIds.contact}`} onClick={closeMenu}>
              {t.nav.contact}
            </a>
          </nav>
          <div className="language-switch" aria-label="Dil seçimi">
            <Globe2 size={16} />
            {(Object.keys(languages) as Language[]).map((item) => (
              <button
                key={item}
                type="button"
                className={language === item ? "is-active" : ""}
                onClick={() => switchLanguage(item)}
              >
                {languages[item]}
              </button>
            ))}
          </div>
        </div>
      </header>


      <aside className="theme-switcher" aria-label="Tasarım tarzı seçimi">
        <span>Tarz</span>
        <div>
          {themeOptions.map((theme, index) => (
            <button
              key={theme.id}
              type="button"
              className={selectedTheme === theme.id ? "is-active" : ""}
              onClick={() => setSelectedTheme(theme.id)}
              aria-pressed={selectedTheme === theme.id}
            >
              {String(index + 1).padStart(2, "0")} {theme.label}
            </button>
          ))}
        </div>
      </aside>
      <main className="site-main" id="top">
        <section className="hero-section">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.copy}</p>
            <div className="hero-buttons">
              <a className="button primary" href={`#${sectionIds.contact}`}>
                {t.hero.primary}
                <ArrowRight size={18} />
              </a>
              <a className="button secondary" href={`#${sectionIds.services}`}>
                {t.hero.secondary}
              </a>
            </div>
          </div>
          <div className="hero-media" data-reveal aria-label="Tedarik destek danışmanlığı görseli">
            <img src={selectedImages.hero} alt="" />
          </div>
          <div className="hero-stats" data-reveal aria-label="Özet bilgiler">
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          {selectedTheme === "dispatch" && (
            <div className="dispatch-manifest" data-reveal aria-label={t.process.title}>
              <span className="manifest-id" aria-hidden="true">MNF / 08-24</span>
              <ol>
                {t.process.steps.map((step, index) => (
                  <li key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step.title}</strong>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {selectedTheme === "orbit" && (
            <div className="orbit-constellation" data-reveal aria-label={t.services.title}>
              <span className="orbit-track orbit-track-a" aria-hidden="true" />
              <span className="orbit-track orbit-track-b" aria-hidden="true" />
              {t.services.items.slice(0, 4).map((service, index) => (
                <a className={`orbit-node orbit-node-${index + 1}`} href={`#${sectionIds.services}`} key={service.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{service.title}</strong>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="intro-band" data-reveal>
          <div>
            <span>{t.intro.label}</span>
            <h2>{t.intro.title}</h2>
          </div>
          <p>{t.intro.copy}</p>
        </section>

        <section className="visual-story" aria-label={language === "tr" ? "Tedarik operasyonu gorsel ozeti" : "Visual summary of supply operations"}>
          {visualTiles.map((item, index) => (
            <article className={`visual-tile visual-tile-${index + 1}`} data-reveal key={item.title}>
              <img src={selectedImages.detail} alt="" />
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </section>


        <section className="section compact-section segment-section">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t.segments.label}</p>
            <h2>{t.segments.title}</h2>
            <p>{t.segments.copy}</p>
          </div>
          <div className="segment-grid">
            {t.segments.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="segment-card" data-reveal key={item.title}>
                  <div className={`card-visual segment-visual segment-visual-${index + 1}`}>
                    <img src={selectedImages.detail} alt="" />
                  </div>
                  <Icon size={24} />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section className="section services-section" id={sectionIds.services}>
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t.nav.services}</p>
            <h2>{t.services.title}</h2>
            <p>{t.services.copy}</p>
          </div>
          <div className="service-grid">
            {t.services.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="feature-card" data-reveal key={item.title}>
                  <div className={`card-visual service-visual service-visual-${index + 1}`}>
                    <img src={selectedImages.detail} alt="" />
                  </div>
                  <div className="icon-box">
                    <Icon size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              );
            })}
          </div>
        </section>


        <section className="scope-panel scope-section" data-reveal>
          <div className="scope-copy">
            <p className="eyebrow">{t.supplyScope.label}</p>
            <h2>{t.supplyScope.title}</h2>
            <p>{t.supplyScope.copy}</p>
          </div>
          <div className="scope-grid">
            {t.supplyScope.items.map((item) => (
              <div className="scope-item" key={item}>
                <CheckIcon />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="benefits-band benefits-section" data-reveal>
          <div className="benefits-copy">
            <p className="eyebrow">{t.benefits.title}</p>
            <h2>{t.intro.title}</h2>
          </div>
          <ul className="benefit-list">
            {t.benefits.items.map((item) => (
              <li key={item}>
                <span aria-hidden="true"></span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="section process-section" id={sectionIds.process}>
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t.nav.process}</p>
            <h2>{t.process.title}</h2>
            <p>{t.process.copy}</p>
          </div>
          <div className="process-list">
            {t.process.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article className="process-item" data-reveal key={step.title}>
                  <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="icon-box">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                  <div className={`process-visual process-visual-${index + 1}`}>
                    <img src={selectedImages.detail} alt="" />
                  </div>
                </article>
              );
            })}
          </div>
        </section>


        <section className="quote-panel quote-section" data-reveal>
          <div>
            <p className="eyebrow">{t.contact.label}</p>
            <h2>{t.quoteChecklist.title}</h2>
            <p>{t.quoteChecklist.copy}</p>
          </div>
          <ul className="quote-list">
            {t.quoteChecklist.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="section principles-section" id={sectionIds.principles}>
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t.nav.principles}</p>
            <h2>{t.principles.title}</h2>
            <p>{t.principles.copy}</p>
          </div>
          <div className="principles-grid">
            {t.principles.items.map((item) => {
              const Icon = item.icon;
              return (
                <article className="principle-card" data-reveal key={item.title}>
                  <Icon size={24} />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section faq-section">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t.faq.label}</p>
            <h2>{t.faq.title}</h2>
            <p>{t.faq.copy}</p>
          </div>
          <div className="faq-list">
            {t.faq.items.map((item) => (
              <details className="faq-item" data-reveal key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="contact-section" data-reveal id={sectionIds.contact}>
          <div className="contact-copy">
            <p className="eyebrow">{t.contact.label}</p>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.copy}</p>
            <div className="contact-details">
              {t.contact.details.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div key={detail.label}>
                    <Icon size={20} />
                    <span>{detail.label}</span>
                    <strong>{detail.value}</strong>
                  </div>
                );
              })}
            </div>
          </div>
          <form className="contact-form" name="consultation" method="post">
            <input type="hidden" name="form-name" value="consultation" />
            <label>
              {t.contact.name}
              <input name="name" type="text" placeholder={t.contact.placeholders.name} required />
            </label>
            <label>
              {t.contact.company}
              <input name="company" type="text" placeholder={t.contact.placeholders.company} required />
            </label>
            <label>
              {t.contact.contact}
              <input name="contact" type="text" placeholder={t.contact.placeholders.contact} required />
            </label>
            <label>
              {t.contact.message}
              <textarea name="message" rows={5} placeholder={t.contact.placeholders.message} required />
            </label>
            <button className="button primary form-button" type="submit">
              {t.contact.submit}
              <ArrowRight size={18} />
            </button>
            <p className="form-note">{t.contact.note}</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand footer-brand">
          <span className="brand-mark">O</span>
          <span>
            <strong>Optimal</strong>
            <small>Kurumsal Çözümler</small>
          </span>
        </div>
        <p>{t.footer.copy}</p>
        <span>
          © {year} Optimal Kurumsal Çözümler. {t.footer.rights}
        </span>
      </footer>
    </div>
  );
}

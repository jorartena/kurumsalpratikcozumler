import { type FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Globe2, Menu, X } from "lucide-react";
import heroImage from "./assets/procurement-hero.png";
import { content, languages, type Language } from "./content";

const sectionIds = {
  services: "services",
  process: "process",
  principles: "principles",
  contact: "contact",
};

export function App() {
  const [language, setLanguage] = useState<Language>("tr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formPreviewed, setFormPreviewed] = useState(false);
  const t = content[language];
  const year = useMemo(() => new Date().getFullYear(), []);
  const supplyStrip = t.supplyScope.items.slice(0, 4);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    elements.forEach((element) => element.classList.remove("is-visible"));

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      { rootMargin: "0px 0px -5% 0px", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));
    const fallback = window.setTimeout(
      () => elements.forEach((element) => element.classList.add("is-visible")),
      1400,
    );

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [language]);

  useEffect(() => {
    const updateHeaderState = () => setIsScrolled(window.scrollY > 24);
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const switchLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
    setFormPreviewed(false);
    document.documentElement.lang = nextLanguage;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setFormPreviewed(true);
  };

  return (
    <div className="site-shell theme-flow">
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Optimal Kurumsal Çözümler">
          <span className="brand-mark" aria-hidden="true">O</span>
          <span>
            <strong>Optimal</strong>
            <small>Kurumsal Çözümler</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? (language === "tr" ? "Menüyü kapat" : "Close menu") : (language === "tr" ? "Menüyü aç" : "Open menu")}
          aria-expanded={menuOpen}
          aria-controls="header-actions"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`header-actions ${menuOpen ? "is-open" : ""}`} id="header-actions">
          <nav className="site-nav" aria-label={language === "tr" ? "Ana navigasyon" : "Main navigation"}>
            <a href={`#${sectionIds.services}`} onClick={() => setMenuOpen(false)}>{t.nav.services}</a>
            <a href={`#${sectionIds.process}`} onClick={() => setMenuOpen(false)}>{t.nav.process}</a>
            <a href={`#${sectionIds.principles}`} onClick={() => setMenuOpen(false)}>{t.nav.principles}</a>
            <a href={`#${sectionIds.contact}`} onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
          </nav>
          <div className="language-switch" aria-label={language === "tr" ? "Dil seçimi" : "Language selection"}>
            <Globe2 size={16} aria-hidden="true" />
            {(Object.keys(languages) as Language[]).map((item) => (
              <button
                key={item}
                type="button"
                className={language === item ? "is-active" : ""}
                onClick={() => switchLanguage(item)}
                aria-pressed={language === item}
              >
                {languages[item]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="site-main" id="top">
        <section className="hero-section">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.copy}</p>
            <div className="hero-buttons">
              <a className="button primary" href={`#${sectionIds.contact}`}>
                {t.hero.primary}<ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button secondary" href={`#${sectionIds.services}`}>{t.hero.secondary}</a>
            </div>
          </div>
          <figure className="hero-media" data-reveal>
            <img src={heroImage} alt="" />
            <figcaption>{language === "tr" ? "Talep · Teklif · Tedarik · Teslimat" : "Request · Quote · Supply · Delivery"}</figcaption>
          </figure>
          <div className="hero-stats" data-reveal aria-label={language === "tr" ? "Operasyon özeti" : "Operations summary"}>
            {t.hero.stats.map((stat) => (
              <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}
          </div>
        </section>

        <section className="intro-band" data-reveal>
          <div><p className="eyebrow">{t.intro.label}</p><h2>{t.intro.title}</h2></div>
          <p>{t.intro.copy}</p>
        </section>

        <section className="supply-strip" aria-label={language === "tr" ? "Tedarik özeti" : "Supply summary"}>
          {supplyStrip.map((item, index) => (
            <article data-reveal key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p>
            </article>
          ))}
        </section>

        <section className="section segment-section">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow">{t.segments.label}</p><h2>{t.segments.title}</h2></div>
            <p>{t.segments.copy}</p>
          </div>
          <div className="segment-grid">
            {t.segments.items.map((item) => {
              const Icon = item.icon;
              return <article className="segment-card" data-reveal key={item.title}><Icon size={24} /><h3>{item.title}</h3><p>{item.copy}</p></article>;
            })}
          </div>
        </section>

        <section className="section services-section" id={sectionIds.services}>
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow">{t.nav.services}</p><h2>{t.services.title}</h2></div>
            <p>{t.services.copy}</p>
          </div>
          <div className="service-list">
            {t.services.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="feature-card" data-reveal key={item.title}>
                  <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="icon-box"><Icon size={21} /></div>
                  <h3>{item.title}</h3><p>{item.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="scope-panel" data-reveal>
          <div className="scope-copy"><p className="eyebrow">{t.supplyScope.label}</p><h2>{t.supplyScope.title}</h2><p>{t.supplyScope.copy}</p></div>
          <div className="scope-grid">
            {t.supplyScope.items.map((item) => <div className="scope-item" key={item}><Check size={17} strokeWidth={3} /><span>{item}</span></div>)}
          </div>
        </section>

        <section className="section process-section" id={sectionIds.process}>
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow">{t.nav.process}</p><h2>{t.process.title}</h2></div>
            <p>{t.process.copy}</p>
          </div>
          <div className="process-list">
            {t.process.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article className="process-item" data-reveal key={step.title}>
                  <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="process-node"><Icon size={21} /></div>
                  <h3>{step.title}</h3><p>{step.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="benefits-band" data-reveal>
          <div><p className="eyebrow">{t.benefits.title}</p><h2>{language === "tr" ? "Satın alma yükünü azaltan net bir operasyon." : "A clear operation that reduces purchasing workload."}</h2></div>
          <ol className="benefit-list">
            {t.benefits.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
          </ol>
        </section>

        <section className="section principles-section" id={sectionIds.principles}>
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow">{t.nav.principles}</p><h2>{t.principles.title}</h2></div>
            <p>{t.principles.copy}</p>
          </div>
          <div className="principles-grid">
            {t.principles.items.map((item) => {
              const Icon = item.icon;
              return <article className="principle-card" data-reveal key={item.title}><Icon size={24} /><h3>{item.title}</h3><p>{item.copy}</p></article>;
            })}
          </div>
        </section>

        <section className="quote-panel" data-reveal>
          <div><p className="eyebrow">{t.contact.label}</p><h2>{t.quoteChecklist.title}</h2><p>{t.quoteChecklist.copy}</p></div>
          <ul className="quote-list">{t.quoteChecklist.items.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
        </section>

        <section className="section faq-section">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow">{t.faq.label}</p><h2>{t.faq.title}</h2></div>
            <p>{t.faq.copy}</p>
          </div>
          <div className="faq-list">
            {t.faq.items.map((item) => <details className="faq-item" data-reveal key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </section>

        <section className="contact-section" data-reveal id={sectionIds.contact}>
          <div className="contact-copy">
            <p className="eyebrow">{t.contact.label}</p><h2>{t.contact.title}</h2><p>{t.contact.copy}</p>
            {t.contact.details.slice(0, 1).map((detail) => {
              const Icon = detail.icon;
              return <a className="contact-detail" href={`mailto:${detail.value}`} key={detail.label}><Icon size={20} /><span>{detail.label}</span><strong>{detail.value}</strong></a>;
            })}
          </div>
          <form className="contact-form" name="consultation" onSubmit={handleSubmit}>
            <label>{t.contact.name}<input name="name" type="text" placeholder={t.contact.placeholders.name} autoComplete="name" required /></label>
            <label>{t.contact.company}<input name="company" type="text" placeholder={t.contact.placeholders.company} autoComplete="organization" required /></label>
            <label>{language === "tr" ? "E-posta" : "Email"}<input name="email" type="email" placeholder={language === "tr" ? "ornek@firma.com" : "name@company.com"} autoComplete="email" required /></label>
            <label>{t.contact.message}<textarea name="message" rows={5} placeholder={t.contact.placeholders.message} required /></label>
            <button className="button primary form-button" type="submit">{t.contact.submit}<ArrowRight size={18} /></button>
            <p className={`form-note ${formPreviewed ? "is-success" : ""}`} role="status">
              {formPreviewed
                ? (language === "tr" ? "Form doğrulandı. Yayında gönderim e-posta servisine bağlanacaktır." : "Form validated. Live submission will connect to the email service.")
                : (language === "tr" ? "Bu form şu an önizleme modundadır; bilgi göndermez." : "This form is in preview mode and does not send data.")}
            </p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand footer-brand"><span className="brand-mark" aria-hidden="true">O</span><span><strong>Optimal</strong><small>Kurumsal Çözümler</small></span></div>
        <p>{t.footer.copy}</p>
        <span>© {year} Optimal Kurumsal Çözümler. {t.footer.rights}</span>
      </footer>
    </div>
  );
}

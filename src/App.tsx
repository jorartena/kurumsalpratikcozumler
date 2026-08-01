import { type FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Globe2, MapPinned, Menu, X } from "lucide-react";
import heroImage from "./assets/procurement-hero.png";
import logo from "./assets/logo.svg";
import { content, languages, type Language } from "./content";

const sectionIds = {
  services: "services",
  references: "references",
  process: "process",
  principles: "principles",
  contact: "contact",
};

type SectionTitleBlockProps = {
  title: string;
  subtitle?: string;
};

type AnimatedStatProps = {
  target: number;
  suffix?: string;
  label: string;
  delay: number;
};

function SectionTitleBlock({ title, subtitle }: SectionTitleBlockProps) {
  return (
    <div className="section-title-block">
      <h2>{title}</h2>
      <span className="section-title-divider" aria-hidden="true" />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function AnimatedStat({ target, suffix = "", label, delay }: AnimatedStatProps) {
  const [value, setValue] = useState(() => (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? target : 0
  ));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let frame = 0;
    const startedAt = performance.now() + delay;
    const duration = 1400;

    const update = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - startedAt) / duration));
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(update);
      }
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [delay, target]);

  const finalValue = `${target}${suffix}`;

  return (
    <div>
      <strong aria-hidden="true">
        <span className="hero-stat-number">{value}{suffix}</span>
      </strong>
      <span className="hero-stat-label" aria-hidden="true">{label}</span>
      <span className="sr-only">{finalValue} — {label}</span>
    </div>
  );
}

export function App() {
  const [language, setLanguage] = useState<Language>("tr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formPreviewed, setFormPreviewed] = useState(false);
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);
  const t = content[language];
  const year = useMemo(() => new Date().getFullYear(), []);

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
          <img className="brand-logo" src={logo} alt="" />
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
            <a href={`#${sectionIds.process}`} onClick={() => setMenuOpen(false)}>{t.nav.process}</a>
            <a href={`#${sectionIds.services}`} onClick={() => setMenuOpen(false)}>{t.nav.services}</a>
            <a href={`#${sectionIds.references}`} onClick={() => setMenuOpen(false)}>{t.nav.references}</a>
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
          <div className="hero-stats" aria-label={language === "tr" ? "Operasyon özeti" : "Operations summary"}>
            {t.hero.stats.map((stat, index) => (
              <AnimatedStat
                key={stat.target}
                target={stat.target}
                suffix={"suffix" in stat ? stat.suffix : undefined}
                label={stat.label}
                delay={index * 100}
              />
            ))}
          </div>
        </section>

        <section className="section process-section process-section-early" id={sectionIds.process}>
          <div className="section-heading" data-reveal>
            <SectionTitleBlock title={t.nav.process} subtitle={t.process.title} />
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

        <section className="section segment-section">
          <div className="section-heading" data-reveal>
            <SectionTitleBlock title={t.segments.label} subtitle={t.segments.title} />
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
            <SectionTitleBlock title={t.nav.services} subtitle={t.services.title} />
            <p>{t.services.copy}</p>
          </div>
          <div className="service-list">
            {t.services.items.map((item, index) => {
              const Icon = item.icon;
              const isOpen = openServiceId === item.id;
              const titleId = `service-${item.id}-title`;
              const detailId = `service-${item.id}-detail`;
              return (
                <article className={`feature-card ${isOpen ? "is-open" : ""}`} key={item.id}>
                  <div className="service-trigger" data-reveal>
                    <button
                      className="service-trigger-hitbox"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={detailId}
                      aria-label={`${item.title}: ${isOpen ? t.services.detailLabels.close : t.services.detailLabels.open}`}
                      onClick={() => setOpenServiceId(isOpen ? null : item.id)}
                    />
                    <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="icon-box"><Icon size={21} aria-hidden="true" /></div>
                    <div className="service-card-copy">
                      <h3 id={titleId}>{item.title}</h3>
                      <p>{item.copy}</p>
                      <span className="service-disclosure" aria-hidden="true"><ChevronDown size={18} /></span>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="service-detail" id={detailId} role="region" aria-labelledby={titleId}>
                      <div className="service-detail-copy">
                        <p className="service-detail-kicker">{t.services.detailLabels.file}</p>
                        <div className="service-detail-columns">
                          <div>
                            <h4>{t.services.detailLabels.coverage}</h4>
                            <ul>
                              {item.coverage.map((entry) => (
                                <li key={entry}><Check size={16} aria-hidden="true" />{entry}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4>{t.services.detailLabels.approach}</h4>
                            <p>{item.approach}</p>
                          </div>
                        </div>
                        <a className="service-cta" href={`#${sectionIds.contact}`}>
                          {t.services.detailLabels.cta}<ArrowRight size={17} aria-hidden="true" />
                        </a>
                      </div>
                      <figure className="service-media">
                        <img src={item.image} alt={item.imageAlt} width="1200" height="900" loading="lazy" />
                        <figcaption>{t.services.detailLabels.imageCaption}</figcaption>
                      </figure>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="references-section" data-reveal id={sectionIds.references}>
          <div className="references-intro">
            <SectionTitleBlock title={t.references.label} subtitle={t.references.title} />
          </div>
          <div className="reference-marquee">
            <div className="reference-track">
              {[false, true].map((isDuplicate) => (
                <ul
                  className="reference-group"
                  key={isDuplicate ? "duplicate" : "primary"}
                  aria-hidden={isDuplicate || undefined}
                >
                  {t.references.items.map((item) => (
                    <li className={`reference-mark ${item.scaleClass}`} key={item.name}>
                      <span className="reference-logo-plate">
                        <img src={item.logo} alt={isDuplicate ? "" : item.alt} loading="eager" />
                      </span>
                      <span className="reference-wordmark">{item.name}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section className="scope-panel" data-reveal>
          <div className="scope-copy">
            <SectionTitleBlock title={t.supplyScope.label} subtitle={t.supplyScope.title} />
            <p>{t.supplyScope.copy}</p>
          </div>
          <div className="scope-grid">
            {t.supplyScope.items.map((item) => <div className="scope-item" key={item}><Check size={17} strokeWidth={3} /><span>{item}</span></div>)}
          </div>
        </section>

        <section className="benefits-band" data-reveal>
          <SectionTitleBlock
            title={t.benefits.title}
            subtitle={language === "tr" ? "Satın alma yükünü azaltan net bir operasyon." : "A clear operation that reduces purchasing workload."}
          />
          <ol className="benefit-list">
            {t.benefits.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
          </ol>
        </section>

        <section className="section principles-section" id={sectionIds.principles}>
          <div className="section-heading" data-reveal>
            <SectionTitleBlock title={t.nav.principles} subtitle={t.principles.title} />
            <p>{t.principles.copy}</p>
          </div>
          <div className="principles-grid">
            {t.principles.items.map((item) => {
              const Icon = item.icon;
              return <article className="principle-card" data-reveal key={item.title}><Icon size={24} /><h3>{item.title}</h3><p>{item.copy}</p></article>;
            })}
          </div>
        </section>

        <section className="section faq-section">
          <div className="section-heading" data-reveal>
            <SectionTitleBlock title={t.faq.label} subtitle={t.faq.title !== t.faq.label ? t.faq.title : undefined} />
            <p>{t.faq.copy}</p>
          </div>
          <div className="faq-list">
            {t.faq.items.map((item) => <details className="faq-item" data-reveal key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </section>

        <section className="contact-section" data-reveal id={sectionIds.contact}>
          <div className="contact-copy">
            <SectionTitleBlock title={t.contact.label} subtitle={t.contact.title} />
            <p>{t.contact.copy}</p>
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

        <section className="location-section" data-reveal aria-labelledby="location-title">
          <div className="location-map">
            <iframe
              title={t.location.mapTitle}
              src="https://www.google.com/maps?q=Y%20Ofis%2C%20Merkez%2C%20Ka%C4%9F%C4%B1thane%20Cd.%20No%3A7%2C%2034406%20Ka%C4%9F%C4%B1thane%2F%C4%B0stanbul&output=embed"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="location-card">
            <span className="location-kicker"><MapPinned size={18} aria-hidden="true" />{t.location.label}</span>
            <div>
              <h2 id="location-title">{t.location.title}</h2>
              <address>{t.location.address}</address>
            </div>
            <a
              className="location-directions"
              href="https://maps.app.goo.gl/VXkYL7VdomXeiivE8"
              target="_blank"
              rel="noreferrer"
            >
              {t.location.directions}<ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" aria-label="Optimal Kurumsal Çözümler">
          <img className="brand-logo" src={logo} alt="" />
        </a>
        <p>{t.footer.copy}</p>
        <span>© {year} Optimal Kurumsal Çözümler. {t.footer.rights}</span>
      </footer>
    </div>
  );
}

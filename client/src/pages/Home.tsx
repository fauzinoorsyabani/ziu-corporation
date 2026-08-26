/**
 * Quiet Constellation page: asymmetric editorial framing, obsidian space, and a lime orbit signal
 * present Ziu's diverse ventures as independent lights held by a single clear direction.
 */
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ZiuMark } from "@/components/ZiuMark";

type Venture = {
  id: string;
  name: string;
  descriptor: string;
  category: "Commerce" | "Digital" | "Food";
  number: string;
  accent: string;
  image: string;
  imagePosition?: string;
  websiteUrl?: string;
  summary: string;
  note: string;
};

const ventures: Venture[] = [
  {
    id: "xyla-gudang",
    name: "Xyla Gudang",
    descriptor: "Commerce / Stock-led retail",
    category: "Commerce",
    number: "01",
    accent: "#D6FF1F",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663567085695/bnjpwsWeuaEfakdl.png",
    summary: "A commerce-led identity with a confident, graphic visual signature.",
    note: "A portfolio reference surfaced through the current Ziu social archive.",
  },
  {
    id: "mutther-bakery",
    name: "Mutther Cake & Bakery",
    descriptor: "Food / Made-to-order baking",
    category: "Food",
    number: "02",
    accent: "#F2D6C5",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663567085695/pOdmJuDuusNwxPJM.png",
    summary: "A soft, celebratory bakery expression shaped around made-to-order moments.",
    note: "Current social material suggests a bakery-focused, made-to-order business.",
  },
  {
    id: "ziu-gaming",
    name: "Ziu Gaming Store",
    descriptor: "Digital / Game services",
    category: "Digital",
    number: "03",
    accent: "#9D6BFF",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663567085695/fVomjnJRzyngHmgT.png",
    summary: "A distinctly Ziu-branded gaming service with a fast, energetic retail language.",
    note: "The visual archive indicates game top-up and digital gaming services.",
  },
  {
    id: "code-auction",
    name: "Code of Auction",
    descriptor: "Commerce / Curated apparel",
    category: "Commerce",
    number: "04",
    accent: "#73FF00",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663567085695/RUFjMYKmCmnSIDCn.png",
    summary: "A high-contrast apparel and auction identity built for immediate visual recognition.",
    note: "The referenced profile presents curated apparel and auction-oriented activity.",
  },
  {
    id: "mega-phone",
    name: "Mega Phone Cell",
    descriptor: "Digital / Mobile services",
    category: "Digital",
    number: "05",
    accent: "#B52CFF",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663567085695/EkAvzeFvLeHBXGtO.png",
    summary: "A mobile-services identity made legible through direct product and payment messaging.",
    note: "The visual reference indicates prepaid, mobile, and related consumer services.",
  },
  {
    id: "joki-tugas",
    name: "Joki Tugas",
    descriptor: "Digital / Study support",
    category: "Digital",
    number: "06",
    accent: "#F9C744",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663567085695/FzzkvuriyMFPOYxv.png",
    summary: "An education-support brand with a bright, approachable information-first identity.",
    note: "The available reference presents study-help and task-assistance content.",
  },
  {
    id: "ruangsi",
    name: "RuangSi",
    descriptor: "Education / SI & IT guidance",
    category: "Digital",
    number: "07",
    accent: "#2ED8D0",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663567085695/TWJEbGOsfEJBmQPV.webp",
    imagePosition: "center top",
    websiteUrl: "https://ruangsi.vercel.app/#faq",
    summary: "A guided education service that helps SI and IT students clarify topics, research decisions, systems, and presentation flow.",
    note: "Archive visual captured from the supplied RuangSi website.",
  },
];

const filters = ["All", "Commerce", "Digital", "Food"] as const;
type Filter = (typeof filters)[number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedId, setSelectedId] = useState(ventures[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPortfolioPaused, setIsPortfolioPaused] = useState(false);

  const filteredVentures = useMemo(
    () => (activeFilter === "All" ? ventures : ventures.filter((venture) => venture.category === activeFilter)),
    [activeFilter],
  );
  const loopedVentures = useMemo(
    () => Array.from({ length: 4 }, () => filteredVentures).flat(),
    [filteredVentures],
  );
  const selectedVenture = ventures.find((venture) => venture.id === selectedId) ?? ventures[0];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const chooseVenture = (id: string) => {
    setSelectedId(id);
    window.setTimeout(() => scrollToSection("venture-focus"), 30);
  };

  const showContactToast = () =>
    toast("Partnership desk", {
      description: "Official contact details will be added to this page shortly.",
    });

  return (
    <div className="ziu-site">
      <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
        <a className="brand-link" href="#top" aria-label="Ziu Corporation home">
          <ZiuMark withWordmark />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => scrollToSection("portfolio")}>Portfolio</button>
          <button onClick={() => scrollToSection("approach")}>Approach</button>
          <button onClick={() => scrollToSection("archive")}>Archive</button>
        </nav>
        <button className="header-contact" onClick={showContactToast}>
          Talk with Ziu <ArrowUpRight aria-hidden="true" size={15} />
        </button>
        <button
          className="menu-trigger"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={21} /> : <Menu size={22} />}
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          >
            {[
              ["Portfolio", "portfolio"],
              ["Approach", "approach"],
              ["Archive", "archive"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection(id);
                }}
              >
                {label} <ArrowDownRight size={20} />
              </button>
            ))}
            <button className="mobile-menu__contact" onClick={showContactToast}>
              Open a conversation <ArrowUpRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__grain" />
          <div className="hero__halo hero__halo--one" />
          <div className="hero__halo hero__halo--two" />
          <div className="hero__grid" />
          <motion.div
            className="hero__copy"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.16 }}
          >
            <motion.p variants={fadeUp} transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }} className="eyebrow">
              <span className="signal-dot" /> 01 / ZIU CORPORATION
            </motion.p>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }} id="hero-title">
              Different ventures.
              <em> One clear direction.</em>
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }} className="hero__lede">
              Ziu Corporation is the intentional home for independent brands moving with more clarity, system, and momentum.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }} className="hero__actions">
              <button className="button button--signal" onClick={() => scrollToSection("portfolio")}>
                Explore the portfolio <ArrowDownRight size={18} />
              </button>
              <button className="button button--quiet" onClick={() => scrollToSection("approach")}>
                How we move <span className="button__line" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="orbit-stage"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.56, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
            aria-label="An abstract orbit graphic representing Ziu's portfolio"
            role="img"
          >
            <div className="orbit-stage__ripple orbit-stage__ripple--one" />
            <div className="orbit-stage__ripple orbit-stage__ripple--two" />
            <div className="orbit-stage__axis orbit-stage__axis--a" />
            <div className="orbit-stage__axis orbit-stage__axis--b" />
            <div className="orbit-stage__track orbit-stage__track--a" />
            <div className="orbit-stage__track orbit-stage__track--b" />
            <div className="orbit-stage__core"><ZiuMark /></div>
            <span className="orbit-node orbit-node--lime" />
            <span className="orbit-node orbit-node--violet" />
            <span className="orbit-node orbit-node--cream" />
            <span className="orbit-node orbit-node--amber" />
            <div className="orbit-stage__caption orbit-stage__caption--top">PORTFOLIO / 07</div>
            <div className="orbit-stage__caption orbit-stage__caption--bottom">ORBITAL MAP</div>
          </motion.div>

          <div className="hero__footer">
            <span>INDONESIA / MULTI-VENTURE</span>
            <span className="hero__footer-line" />
            <span>QUIETLY AMBITIOUS</span>
          </div>
        </section>

        <section className="signal-ticker" aria-label="Selected Ziu portfolio ventures in motion">
          <span className="ticker-accessible">Selected portfolio ventures: Xyla Gudang, Mutther Cake and Bakery, Ziu Gaming Store, Code of Auction, Mega Phone Cell, Joki Tugas, and RuangSi.</span>
          <div className="signal-ticker__caption"><span className="signal-dot" /> LIVE PORTFOLIO SIGNAL</div>
          <div className="signal-ticker__viewport" aria-hidden="true">
            <div className="ticker-track ticker-track--left">
              {[...ventures, ...ventures].map((venture, index) => (
                <span className="ticker-pill" key={`left-${venture.id}-${index}`} style={{ "--ticker-accent": venture.accent } as React.CSSProperties}>
                  <i /> {venture.name} <small>{venture.category}</small>
                </span>
              ))}
            </div>
            <div className="ticker-track ticker-track--right">
              {[...ventures, ...ventures].map((venture, index) => (
                <span className="ticker-pill ticker-pill--outline" key={`right-${venture.id}-${index}`} style={{ "--ticker-accent": venture.accent } as React.CSSProperties}>
                  <i /> {venture.descriptor}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="statement" aria-label="Ziu Corporation introduction">
          <p className="statement__index">02 / THE PARENT PERSPECTIVE</p>
          <div>
            <p className="statement__quote">
              We give distinct businesses a shared sense of <span>structure, focus,</span> and forward motion.
            </p>
            <p className="statement__support">
              The portfolio is intentionally varied. The operating mindset is not.
            </p>
          </div>
        </section>

        <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="signal-dot" /> 03 / THE ZIU CONSTELLATION</p>
              <h2 id="portfolio-title">Seven brands. <em>Seven signals.</em></h2>
            </div>
            <p className="section-heading__copy">
              Each venture keeps a recognisable character. Together, they make a more adaptive portfolio.
            </p>
          </div>

          <div className="filter-row" aria-label="Filter ventures by category">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "filter-button filter-button--active" : "filter-button"}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter} <span>{filter === "All" ? ventures.length : ventures.filter((venture) => venture.category === filter).length}</span>
              </button>
            ))}
          </div>

          <div className={`portfolio-rail ${isPortfolioPaused ? "portfolio-rail--paused" : ""}`}>
            <div className="portfolio-rail__orbit" aria-hidden="true"><span /><i /></div>
            <div className="portfolio-rail__track" aria-label="Scrolling portfolio ventures">
              {loopedVentures.map((venture, index) => (
                <article
                  key={`${venture.id}-${index}`}
                  className={`venture-card venture-card--rail venture-card--${venture.id} ${index % 6 === 0 ? "venture-card--rail-anchor" : index % 3 === 0 ? "venture-card--rail-offset" : "venture-card--rail-signal"}`}
                  style={{ "--venture-accent": venture.accent } as React.CSSProperties}
                  onMouseEnter={() => setIsPortfolioPaused(true)}
                  onMouseLeave={() => setIsPortfolioPaused(false)}
                >
                  <button
                    className="venture-card__inner"
                    onClick={() => chooseVenture(venture.id)}
                    onFocus={() => setIsPortfolioPaused(true)}
                    onBlur={() => setIsPortfolioPaused(false)}
                    aria-label={`Explore ${venture.name}`}
                  >
                    <img src={venture.image} alt={`${venture.name} social brand reference`} loading="lazy" />
                    <span className="venture-card__veil" />
                    <span className="venture-card__parent-mark"><ZiuMark /></span>
                    <span className="venture-card__number">{venture.number}</span>
                    <span className="venture-card__corner" />
                    <span className="venture-card__source">ARCHIVE / {venture.number}</span>
                    <span className="venture-card__copy">
                      <span>{venture.name}</span>
                      <small>{venture.descriptor}</small>
                    </span>
                    <span className="venture-card__action"><ArrowUpRight size={17} /></span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="venture-focus" id="venture-focus" aria-labelledby="venture-focus-title">
          <div className="venture-focus__rail" />
          <div className="venture-focus__image">
            <img src={selectedVenture.image} alt={`${selectedVenture.name} social brand reference`} />
            <span className="venture-focus__wash" style={{ background: selectedVenture.accent }} />
          </div>
          <motion.div
            key={selectedVenture.id}
            className="venture-focus__content"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="eyebrow"><span className="signal-dot" style={{ background: selectedVenture.accent }} /> SELECTED SIGNAL / {selectedVenture.number}</p>
            <h2 id="venture-focus-title">{selectedVenture.name}</h2>
            <p className="venture-focus__descriptor">{selectedVenture.descriptor}</p>
            <p className="venture-focus__summary">{selectedVenture.summary}</p>
            <div className="venture-focus__meta">
              <span>Portfolio reference</span>
              <span>{selectedVenture.note}</span>
            </div>
            <button className="text-button" onClick={showContactToast}>
              Enquire about this venture <ArrowUpRight size={16} />
            </button>
            {selectedVenture.websiteUrl && (
              <a className="text-button" href={selectedVenture.websiteUrl} target="_blank" rel="noreferrer">
                Visit {selectedVenture.name} <ArrowUpRight size={16} />
              </a>
            )}
          </motion.div>
        </section>

        <section className="approach-section" id="approach" aria-labelledby="approach-title">
          <div className="approach-section__visual" aria-hidden="true">
            <div className="approach-token approach-token--one" />
            <div className="approach-token approach-token--two" />
            <div className="approach-token approach-token--three" />
            <div className="approach-token approach-token--four" />
            <div className="approach-connector approach-connector--one" />
            <div className="approach-connector approach-connector--two" />
            <div className="approach-origin"><span /></div>
          </div>
          <div className="approach-section__copy">
            <p className="eyebrow"><span className="signal-dot" /> 04 / HOW ZIU CREATES ROOM TO MOVE</p>
            <h2 id="approach-title">Independent by design.<br /><em>Connected by intent.</em></h2>
            <p>
              We think the strongest portfolio does not flatten the businesses inside it. It gives them a dependable frame to make sharper decisions, keep their identities, and move with purpose.
            </p>
            <div className="principle-list">
              <div><span>01</span><strong>Clear identity</strong><p>Each brand keeps a point of view people can recognise.</p></div>
              <div><span>02</span><strong>Shared direction</strong><p>Foundational thinking makes diverse operations more coherent.</p></div>
              <div><span>03</span><strong>Useful momentum</strong><p>Every signal is assessed by whether it creates real forward motion.</p></div>
            </div>
          </div>
        </section>

        <section className="archive-section" id="archive" aria-labelledby="archive-title">
          <div className="archive-section__top">
            <div>
              <p className="eyebrow"><span className="signal-dot" /> 05 / BRAND ARCHIVE</p>
              <h2 id="archive-title">Signals in <em>the wild.</em></h2>
            </div>
            <p>Live brand material, gathered from the supplied social portfolio references.</p>
          </div>
          <div className="archive-rail" role="list">
            {ventures.map((venture) => (
              <button
                key={venture.id}
                className={`archive-card archive-card--${venture.id}`}
                style={{ "--archive-accent": venture.accent } as React.CSSProperties}
                onClick={() => chooseVenture(venture.id)}
                role="listitem"
              >
                <img src={venture.image} alt={`${venture.name} archive reference`} loading="lazy" />
                <span className="archive-card__wash" />
                <span className="archive-card__parent-mark"><ZiuMark /></span>
                <span className="archive-card__label"><b>{venture.number}</b>{venture.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="contact-section" aria-labelledby="contact-title">
          <div className="contact-section__grid" />
          <div className="contact-section__orbit" aria-hidden="true"><Sparkles size={30} /></div>
          <p className="eyebrow"><span className="signal-dot" /> 06 / OPEN THE NEXT CONVERSATION</p>
          <h2 id="contact-title">Building something <em>with direction?</em></h2>
          <p>Whether you are developing a new venture or exploring a partnership, start the conversation with Ziu.</p>
          <button className="button button--signal button--large" onClick={showContactToast}>
            Talk with Ziu <ArrowUpRight size={19} />
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__top">
          <ZiuMark withWordmark inverse />
          <p>Independent ventures, held in a clear orbit.</p>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Ziu Corporation</span>
          <span>Portfolio / Direction / Momentum</span>
          <button onClick={() => scrollToSection("top")}>Back to top <ChevronDown size={14} /></button>
        </div>
      </footer>
    </div>
  );
}

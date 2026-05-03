import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../constants";
import { scrollToSection } from "../utils/scrollTo";
import { SunIcon, MoonIcon } from "./Icons";
import { useLang } from "../context/LangContext";
import styles from "./Navbar.module.css";
import LogoNavbar from "../assets/KODEX.png";
import LangSwitcher from "./LangSwitcher";

// ── Mapa: clave constante → sección DOM ───────────────────────
const SECTION_MAP = {
  Inicio:      "inicio",
  "Sobre mí":  "sobre-mi",
  Servicios:   "servicios",
  Proyectos:   "proyectos",
  Stack:       "stack",
  Precios:     "precios",
  Testimonios: "testimonios",
  "AI Pitch":  "ai-pitch",
  Contacto:    "contacto",
};

// ── Mapa: clave constante → clave i18n ────────────────────────
const I18N_MAP = {
  Inicio:      "nav.inicio",
  "Sobre mí":  "nav.sobreMi",
  Servicios:   "nav.servicios",
  Proyectos:   "nav.proyectos",
  Stack:       "nav.stack",
  Precios:     "nav.precios",
  Testimonios: "nav.testimonios",
  "AI Pitch":  "nav.aiPitch",
  Contacto:    "nav.contacto",
};

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8EB12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("Inicio");

  useEffect(() => {
    const observers = [];
    NAV_LINKS.forEach((label) => {
      const el = document.getElementById(SECTION_MAP[label]);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(label); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

export default function Navbar({ dark, toggleTheme, T }) {
  const { t } = useLang();
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [downloaded,  setDownloaded]  = useState(false);
  const active = useActiveSection();

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    setTimeout(() => document.addEventListener("click", close), 10);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <nav
      className={styles.nav}
      style={{
        background:     scrolled ? T.navBg : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom:   scrolled ? "1px solid var(--clr-accent)18" : "none",
      }}
    >
      <div className={styles.navInner}>

        {/* ── Logo ── */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flexShrink: 0 }}
          onClick={() => scrollToSection("Inicio")}
        >
          <img src={LogoNavbar} alt="KODEX" style={{ height: "34px", width: "auto" }} />
        </div>

        {/* ── Desktop nav ── */}
        <div className="dnav">
          {NAV_LINKS.map((l) => {
            const isActive = active === l;
            const label    = t(I18N_MAP[l]) || l;
            return (
              <div key={l} className={styles.navLinkWrap}>
                <span
                  className={styles.navLink}
                  style={{ color: isActive ? "var(--clr-pink)" : T.textMid }}
                  onClick={() => scrollToSection(l)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-pink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "var(--clr-pink)" : T.textMid)}
                >
                  {label}
                </span>
                <div
                  className={styles.activeBar}
                  style={{
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    opacity:   isActive ? 1 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Controls ── */}
        <div className={styles.controls}>

          {/* Botón descargar CV */}
          <a
            href="/kodex-cv.pdf"
            download="CV-Crishtian-Rodriguez.pdf"
            className={`${styles.cvBtn} ${downloaded ? styles.cvBtnDone : ""}`}
            title={t("nav.downloadCV")}
            aria-label={t("nav.downloadCV")}
            onClick={handleDownload}
          >
            <span className={styles.cvIcon}>
              {downloaded ? <CheckIcon /> : <DownloadIcon />}
            </span>
          </a>

          {/* Idioma */}
          <LangSwitcher dark={dark} T={T} />

          {/* Dark / Light toggle */}
          <button className="t-btn" onClick={toggleTheme} aria-label="Cambiar tema">
            <div className="t-track" style={{ background: dark ? "#2d1a4a" : "#c46cff" }} />
            <div className="t-thumb" style={{ left: dark ? 4 : 28, background: dark ? "#1a0a2e" : "#fff" }}>
              <div className={`i-wrap ${dark ? "off" : "on"}`} style={{ color: "#f59e0b" }}>
                <SunIcon />
              </div>
              <div className={`i-wrap ${dark ? "on" : "off"}`} style={{ color: "#c4b5fd" }}>
                <MoonIcon />
              </div>
            </div>
          </button>

          {/* Hamburger */}
          <div
            className={`hnav ${menuOpen ? "open" : ""}`}
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
          >
            <span style={{ background: menuOpen ? "var(--clr-pink)" : T.text }} />
            <span style={{ background: menuOpen ? "var(--clr-pink)" : T.text }} />
            <span style={{ background: menuOpen ? "var(--clr-pink)" : T.text }} />
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mmenu"
            style={{ background: T.mMenuBg }}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="mitem"
                style={{
                  color:       active === l ? "var(--clr-pink)" : T.text,
                  borderLeft:  active === l ? "3px solid var(--clr-pink)" : "3px solid transparent",
                  paddingLeft: 12,
                }}
                onClick={() => { scrollToSection(l); setMenuOpen(false); }}
              >
                {t(I18N_MAP[l]) || l}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

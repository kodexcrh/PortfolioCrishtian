import { useState } from "react";
import styles from "./Footer.module.css";
import { scrollToSection } from "../utils/scrollTo";
import { SOCIAL_LINKS } from "../constants";
import { useLang } from "../context/LangContext";
import LogoImg from "../assets/KODEX.png";

export default function Footer({ T, dark }) {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const bg       = dark ? "#07071a"                  : "#f0eeff";
  const border   = dark ? "rgba(124,58,237,0.15)"    : "rgba(124,58,237,0.2)";
  const textMain = dark ? "#e8e8f0"                  : "#0a0a1a";   // eslint-disable-line no-unused-vars
  const textSub  = dark ? "#8888a8"                  : "#555570";
  const gridLine = dark ? "rgba(124,58,237,0.07)"    : "rgba(124,58,237,0.08)";

  const NAV_GROUPS = [
    {
      label: t("footer.nav") || "Navegación",
      links: [
        { name: t("nav.inicio"),    section: "inicio"    },
        { name: t("nav.sobreMi"),   section: "sobre-mi"  },
        { name: t("nav.servicios"), section: "servicios" },
        { name: t("nav.proyectos"), section: "proyectos" },
      ],
    },
    {
      label: t("footer.more") || "Más",
      links: [
        { name: t("nav.stack"),       section: "stack"      },
        { name: t("nav.precios"),     section: "precios"    },
        { name: t("nav.testimonios"), section: "testimonios"},
        { name: t("nav.contacto"),    section: "contacto"   },
      ],
    },
  ];

  const SERVICES_LIST = t("services.items")?.map((s) => s.title) || [
    "Desarrollo Frontend",
    "Análisis de Datos",
    "Automatización n8n",
    "Apps con IA",
  ];

  return (
    <footer
      className={styles.footer}
      style={{ background: bg, borderTop: `1px solid ${border}` }}
    >
      <div
        className={styles.gridBg}
        style={{
          backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px), linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
        }}
      />
      <div className={styles.glow} />

      <div className={styles.inner}>

        {/* ── TOP ─────────────────────────────────────────── */}
        <div className={styles.top}>

          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <img src={LogoImg} alt="KODEX" className={styles.logoImg} />
            </div>
            <p className={styles.tagline} style={{ color: textSub }}>
              {t("footer.tagline")}
            </p>
            <p className={styles.desc} style={{ color: textSub }}>
              {t("footer.desc") || "Soluciones digitales a medida para empresas y emprendedores. Código limpio, diseño memorable, resultados reales."}
            </p>
            <div className={styles.socials}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={styles.socialBtn}
                  style={{
                    background: hoveredSocial === s.name
                      ? s.bg
                      : dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
                    border: `1px solid ${hoveredSocial === s.name ? "transparent" : border}`,
                    transform: hoveredSocial === s.name ? "translateY(-3px) scale(1.08)" : "none",
                  }}
                  onMouseEnter={() => setHoveredSocial(s.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {s.icon(hoveredSocial === s.name ? "#fff" : textSub)}
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div className={styles.col}>
            <h4 className={styles.colTitle} style={{ color: "var(--clr-accent)" }}>
              <span className={styles.colDot} />{t("nav.servicios")}
            </h4>
            <ul className={styles.linkList}>
              {SERVICES_LIST.map((s) => (
                <li key={s}>
                  <button
                    className={styles.footLink}
                    style={{ color: textSub }}
                    onClick={() => scrollToSection("servicios")}
                  >
                    <span className={styles.arrow}>→</span>{s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav grupos */}
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className={styles.col}>
              <h4 className={styles.colTitle} style={{ color: "var(--clr-accent)" }}>
                <span className={styles.colDot} />{group.label}
              </h4>
              <ul className={styles.linkList}>
                {group.links.map((link) => (
                  <li key={link.name}>
                    <button
                      className={styles.footLink}
                      style={{ color: textSub }}
                      onClick={() => scrollToSection(link.section)}
                    >
                      <span className={styles.arrow}>→</span>{link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacto */}
          <div className={styles.col}>
            <h4 className={styles.colTitle} style={{ color: "var(--clr-accent)" }}>
              <span className={styles.colDot} />{t("nav.contacto")}
            </h4>
            <ul className={styles.contactList}>
              <li>
                <a
                  href="https://wa.me/51960959529"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactItem}
                  style={{ color: textSub }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  +51 960 959 529
                </a>
              </li>
              <li>
                <a
                  href="mailto:kodex.crh@proton.me"
                  className={styles.contactItem}
                  style={{ color: textSub }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent)" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  kodex.crh@proton.me
                </a>
              </li>
              <li>
                <span className={styles.contactItem} style={{ color: textSub }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent2)" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {t("contact.location")}
                </span>
              </li>
            </ul>
            <a
              href="https://wa.me/51960959529?text=Hola%2C%20quiero%20hablar%20sobre%20un%20proyecto"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              {t("footer.cta") || "Hablemos"} →
            </a>
          </div>
        </div>

        {/* ── DIVIDER ──────────────────────────────────────── */}
        <div className={styles.divider} style={{ background: border }} />

        {/* ── BOTTOM ───────────────────────────────────────── */}
        <div className={styles.bottom}>
          <div className={styles.copyright} style={{ color: textSub }}>
            © {year}{" "}
            <span style={{ color: "var(--clr-accent2)", fontWeight: 700 }}>
              K<span style={{ color: "var(--clr-pink)" }}>ODE</span>X
            </span>{" "}
            · {t("footer.rights")}
          </div>
          <div className={styles.statusRow}>
            <span className={styles.statusDot} />
            <span className={styles.statusText} style={{ color: textSub }}>
              {t("footer.available") || "Disponible para proyectos"}
            </span>
          </div>
          <div className={styles.madeWith} style={{ color: textSub }}>
            <span>{t("footer.madeWith")}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#EA4B71">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>en React JS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

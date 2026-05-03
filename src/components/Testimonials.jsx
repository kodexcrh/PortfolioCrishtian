import { useState, useEffect, useRef } from "react";
import { useLang } from "../context/LangContext";
import Reveal from "./Reveal";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "CEO · StartupMX",
    avatar: "MG",
    color: "#7C3AED",
    bgActive: "rgba(124,58,237,0.25)",
    rating: 5,
    text: "Crishtian transformó nuestra idea en una plataforma funcional en tiempo récord. Su dominio de React y la automatización con n8n nos ahorró semanas de trabajo manual.",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    role: "Director de Operaciones · FinTech PE",
    avatar: "CR",
    color: "#A8EB12",
    bgActive: "rgba(168,235,18,0.25)",
    rating: 5,
    text: "El dashboard de Power BI que nos entregó superó todas nuestras expectativas. Los datos ahora hablan solos y nuestro equipo toma decisiones 3x más rápido.",
  },
  {
    id: 3,
    name: "Sofía Herrera",
    role: "Fundadora · EcomStore",
    avatar: "SH",
    color: "#01D4E8",
    bgActive: "rgba(1,212,232,0.25)",
    rating: 5,
    text: "La automatización con n8n y Telegram cambió por completo nuestra gestión de pedidos. Ahorramos 20 horas semanales desde el primer día.",
  },
  {
    id: 4,
    name: "Diego Morales",
    role: "CTO · AgencyDigital",
    avatar: "DM",
    color: "#FEC303",
    bgActive: "rgba(254,195,3,0.25)",
    rating: 5,
    text: "Entregó un sistema completo con Claude AI integrado que automatiza el 80% de nuestro soporte. Profesionalismo, código limpio y resultados reales.",
  },
  {
    id: 5,
    name: "Valeria Castro",
    role: "Product Manager · SaaS CO",
    avatar: "VC",
    color: "#9333EA",
    bgActive: "rgba(147,51,234,0.25)",
    rating: 5,
    text: "Increíble capacidad para entender el negocio y traducirlo en soluciones técnicas. El portfolio que nos construyó nos consiguió 3 clientes nuevos el primer mes.",
  },
];

const StarIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const QuoteIcon = ({ color }) => (
  <svg
    className={styles.quoteIcon}
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

export default function Testimonials({ dark, T }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const autoRef = useRef(null);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => goTo("next"), 5000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [active]);

  const goTo = (dir, index = null) => {
    if (animating) return;
    clearInterval(autoRef.current);
    setDirection(
      typeof dir === "string" ? dir : index > active ? "next" : "prev",
    );
    setAnimating(true);
    setTimeout(() => {
      if (index !== null) {
        setActive(index);
      } else {
        setActive((prev) =>
          dir === "next"
            ? (prev + 1) % testimonials.length
            : (prev - 1 + testimonials.length) % testimonials.length,
        );
      }
      setAnimating(false);
    }, 320);
  };

  const item = testimonials[active];

  return (
    <section id="testimonios" className="sec">
      <div className="c">
        <Reveal>
          <span className="stag">// {t("testimonials.tag")}</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="sh2">
            {t("testimonials.title")}{" "}
            <span className="glow-text">{t("testimonials.titleSpan")}</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="sdesc" style={{ color: T.textSub }}>
            {t("testimonials.sub")}
          </p>
        </Reveal>

        {/* ── Main card ── */}
        <Reveal delay={180}>
          <div
            className={`${styles.card} ${animating ? (direction === "next" ? styles.exitNext : styles.exitPrev) : ""}`}
            style={{
              background: T.bgCard || (dark ? "#0f0f1e" : "#ffffff"),
              border: `1px solid ${item.color}44`,
            }}
          >
            <div
              className={styles.cardTop}
              style={{
                background: `linear-gradient(90deg, ${item.color}, ${item.color}66, transparent)`,
              }}
            />

            <QuoteIcon color={item.color} />

            <div className={styles.stars}>
              {Array.from({ length: item.rating }).map((_, i) => (
                <StarIcon key={i} color={item.color} />
              ))}
            </div>

            <p className={styles.text} style={{ color: T.textMid }}>
              "{item.text}"
            </p>

            <div className={styles.author}>
              <div
                className={styles.avatar}
                style={{
                  background: `${item.color}22`,
                  border: `2px solid ${item.color}55`,
                  boxShadow: `0 0 20px ${item.color}33`,
                  color: item.color,
                }}
              >
                {item.avatar}
              </div>
              <div>
                <div className={styles.authorName}>{item.name}</div>
                <div
                  className={styles.authorRole}
                  style={{ color: T.textFaint }}
                >
                  {item.role}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Controls ── */}
        <Reveal delay={220}>
          <div className={styles.controls}>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                  style={
                    i === active
                      ? { background: item.color }
                      : {
                          background: dark
                            ? "#ffffff18"
                            : "var(--clr-accent)22",
                        }
                  }
                  onClick={() => goTo(i > active ? "next" : "prev", i)}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>

            <span className={styles.counter} style={{ color: T.textFaint }}>
              <span style={{ color: item.color, fontWeight: 700 }}>
                {String(active + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(testimonials.length).padStart(2, "0")}
            </span>

            <div className={styles.navBtns}>
              <button
                className={styles.navBtn}
                style={{
                  border: `1px solid ${dark ? "var(--clr-accent)33" : "var(--clr-accent)22"}`,
                  background: dark
                    ? "rgba(124,58,237,0.06)"
                    : "rgba(124,58,237,0.04)",
                }}
                onClick={() => goTo("prev")}
                aria-label="Anterior"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--clr-accent2)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className={styles.navBtn}
                style={{
                  border: `1px solid ${dark ? "var(--clr-accent)33" : "var(--clr-accent)22"}`,
                  background: dark
                    ? "rgba(124,58,237,0.06)"
                    : "rgba(124,58,237,0.04)",
                }}
                onClick={() => goTo("next")}
                aria-label="Siguiente"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--clr-accent2)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        {/* ── Mini cards ── */}
        <Reveal delay={260}>
          <div className={styles.miniGrid}>
            {testimonials.map((tes, i) => (
              <div
                key={tes.id}
                className={`card-hover-wrap ${styles.miniCardWrap}`}
                onClick={() => goTo(i > active ? "next" : "prev", i)}
              >
                <div
                  className={styles.miniCard}
                  style={{
                    background:
                      i === active
                        ? tes.bgActive
                        : dark
                          ? "#0f0f1e"
                          : "#f3f0ff",
                    border: `1.5px solid ${i === active ? tes.color : dark ? "#ffffff12" : "#c8b0e820"}`,
                    boxShadow:
                      i === active ? `0 0 16px ${tes.color}50` : "none",
                  }}
                >
                  <div
                    className={styles.miniAvatar}
                    style={{
                      background: `${tes.color}22`,
                      border: `1.5px solid ${tes.color}55`,
                      color: tes.color,
                    }}
                  >
                    {tes.avatar}
                  </div>
                  <div className={styles.miniInfo}>
                    <div
                      className={styles.miniName}
                      style={{ color: i === active ? T.text : T.textSub }}
                    >
                      {tes.name.split(" ")[0]}
                    </div>
                    <div className={styles.miniStars}>
                      {Array.from({ length: 5 }).map((_, si) => (
                        <svg
                          key={si}
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill={i === active ? tes.color : "#ffc75f88"}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

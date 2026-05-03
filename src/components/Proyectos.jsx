import { useState } from "react";
import { PROJECTS } from "../constants";
import { PROJECT_DETAILS } from "./projectData";
import { useLang } from "../context/LangContext";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";
import styles from "./Proyectos.module.css";

export default function Proyectos({ dark, T }) {
  const { t } = useLang();
  const [openCategory, setOpenCategory] = useState(null);
  const [openAccent,   setOpenAccent]   = useState("var(--clr-accent)");
  const [hoveredIdx,   setHoveredIdx]   = useState(null);

  const handleOpen = (title, accent) => {
    setOpenAccent(accent);
    setOpenCategory(title);
  };

  const getPreview = (title) => {
    const items = PROJECT_DETAILS[title] ?? [];
    return items.find((p) => p.image)?.image ?? null;
  };

  return (
    <>
      <section id="proyectos" className="sec">
        <div className="c">
          <Reveal><span className="stag">// {t("projects.tag")}</span></Reveal>
          <Reveal delay={80}>
            <h2 className="sh2">
              {t("projects.title")}{" "}
              <span className="glow-text">{t("projects.titleSpan")}</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="sdesc" style={{ color: T.textSub }}>
              {t("projects.sub")}
            </p>
          </Reveal>

          <div className="g3">
            {PROJECTS.map((p, i) => {
              const preview   = getPreview(p.title);
              const isHovered = hoveredIdx === i;
              const count     = PROJECT_DETAILS[p.title]?.length ?? 0;
              return (
                <Reveal key={i} delay={i * 110} style={{ height: "100%" }}>
                  <div
                    className="card-hover-wrap"
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div
                      className={styles.card}
                      style={{
                        background: T.bgCard,
                        border: `1px solid ${p.accent}${isHovered ? "55" : "22"}`,
                      }}
                      onClick={() => handleOpen(p.title, p.accent)}
                    >
                      <div
                        className="card-top"
                        style={{ background: `linear-gradient(90deg,${p.accent},${p.accent}88,transparent)` }}
                      />

                      {/* Thumbnail */}
                      <div className={styles.imgWrap} style={{ borderColor: `${p.accent}25` }}>
                        {preview ? (
                          <>
                            <img
                              src={preview}
                              alt={p.title}
                              className={styles.img}
                              style={{ transform: isHovered ? "scale(1.06)" : "scale(1)" }}
                              loading="lazy"
                            />
                            <div className={styles.imgOverlay} style={{ opacity: isHovered ? 1 : 0 }}>
                              <span className={styles.overlayText} style={{ background: p.accent }}>
                                {count} {t("projects.count")}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div
                            className={styles.imgPlaceholder}
                            style={{ background: `${p.accent}10`, borderColor: `${p.accent}30` }}
                          >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="1.5" opacity="0.5">
                              <rect x="3" y="3" width="18" height="18" rx="3" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="M21 15l-5-5L5 21" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Contenido */}
                      <h3 className={styles.title} style={{ color: p.color }}>{p.title}</h3>
                      <p className={styles.desc} style={{ color: T.textSub }}>{p.desc}</p>
                      <div className={styles.tags}>
                        {p.tech.map((tech) => (
                          <span
                            key={tech}
                            className="tag"
                            style={{
                              background: `${p.accent}18`,
                              color: p.accent,
                              border: `1px solid ${p.accent}35`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className={styles.cta} style={{ color: p.color }}>
                        {t("projects.cta")}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {openCategory && (
        <ProjectModal
          category={openCategory}
          accent={openAccent}
          onClose={() => setOpenCategory(null)}
          dark={dark}
          T={T}
        />
      )}
    </>
  );
}

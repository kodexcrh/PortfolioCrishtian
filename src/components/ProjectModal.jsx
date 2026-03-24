import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PROJECT_DETAILS } from "./projectData.js";
import styles from "./ProjectModal.module.css";

const STATUS_LABEL = {
  live:    { text: "En vivo",       color: "#A8EB12" },
  dev:     { text: "En desarrollo", color: "#ffc75f" },
  private: { text: "Privado",       color: "#888899" },
};

/* ── Lightbox fullscreen ─────────────────────────────────────── */
function Lightbox({ image, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose} aria-label="Cerrar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <img
        src={image}
        alt={title}
        className={styles.lightboxImg}
        onClick={(e) => e.stopPropagation()}
      />
      <p className={styles.lightboxTitle}>{title}</p>
    </div>
  );
}

/* ── Image preview dentro de la card ────────────────────────── */
function ImagePreview({ image, accent, title, onExpand }) {
  if (image) {
    return (
      <div className={styles.pImgWrap} onClick={(e) => { e.stopPropagation(); e.preventDefault(); onExpand && onExpand(); }} title="Click para ampliar">
        <img src={image} alt={title} className={styles.pImg} loading="lazy" />
        <div className={styles.pImgOverlay}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          <span>Ampliar</span>
        </div>
      </div>
    );
  }
  return (
    <div
      className={styles.pImgPlaceholder}
      style={{ background: `linear-gradient(135deg, ${accent}18, ${accent}08)`, border: `1px dashed ${accent}44` }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span style={{ color: accent, opacity: 0.5, fontSize: 11, fontFamily: "'Space Mono', monospace" }}>
        Sin imagen
      </span>
    </div>
  );
}

/* ── Project card ────────────────────────────────────────────── */
function ProjectCard({ project, index, onExpandImage }) {
  const status = STATUS_LABEL[project.status];
  return (
    <div
      className={styles.pCard}
      style={{ border: `1px solid ${project.accent}28`, animationDelay: `${index * 80}ms` }}
    >
      <div className={styles.pCardTop} style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}55, transparent)` }} />

      <ImagePreview
        image={project.image}
        accent={project.accent}
        title={project.title}
        onExpand={project.image ? () => onExpandImage(project.image, project.title) : undefined}
      />

      <div className={styles.pCardHeader}>
        <h3 className={styles.pCardTitle} style={{ color: project.accent }}>{project.title}</h3>
        <span className={styles.pStatus} style={{ background: `${status.color}18`, color: status.color, border: `1px solid ${status.color}44` }}>
          <span className={styles.pStatusDot} style={{ background: status.color }} />
          {status.text}
        </span>
      </div>

      <p className={styles.pCardDetail}>{project.detail}</p>

      <div className={styles.pTags}>
        {project.tech.map((t) => (
          <span key={t} className={styles.pTag} style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}>
            {t}
          </span>
        ))}
      </div>

      <div className={styles.pCardFooter}>
        <span className={styles.pYear}>{project.year}</span>
        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.pLink} style={{ color: project.accent }}>
            Ver proyecto →
          </a>
        ) : (
          <span className={styles.pLinkDisabled}>Próximamente</span>
        )}
      </div>
    </div>
  );
}

/* ── Modal principal ─────────────────────────────────────────── */
export default function ProjectModal({ category, accent, onClose, dark, T }) {
  const projects = PROJECT_DETAILS[category] ?? [];
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && !lightbox) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, lightbox]);

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.modal}
          style={{ background: dark ? "#0d0d1a" : "#f7f4ff" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalBar} style={{ background: `linear-gradient(90deg, ${accent}, ${accent}66, transparent)` }} />

          <div className={styles.modalHeader}>
            <div>
              <span className={styles.modalTag} style={{ color: "#8F00FF" }}>// Proyectos</span>
              <h2 className={styles.modalTitle} style={{ color: dark ? "#e8e8f0" : "#0a0a0a" }}>
                {category.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="glow-text">{category.split(" ").slice(-1)[0]}</span>
              </h2>
              <p className={styles.modalSub} style={{ color: T.textSub }}>
                {projects.length} proyecto{projects.length !== 1 ? "s" : ""} en esta categoría
              </p>
            </div>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Cerrar"
              style={{ background: dark ? "#1a0a2e" : "#ede5ff", border: "1.5px solid #8F00FF33" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#AE35FF" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className={styles.modalGrid}>
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                dark={dark}
                onExpandImage={(img, title) => setLightbox({ image: img, title })}
              />
            ))}
          </div>
        </div>
      </div>

      {lightbox && createPortal(
        <Lightbox
          image={lightbox.image}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />,
        document.body
      )}
    </>
  );
}

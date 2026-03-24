import { useState } from "react";
import { PROJECTS } from "../constants";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";
import styles from "./Proyectos.module.css";

export default function Proyectos({ dark, T }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [openAccent, setOpenAccent] = useState("#8F00FF");

  const handleOpen = (title, accent) => {
    setOpenAccent(accent);
    setOpenCategory(title);
  };

  return (
    <>
      <section id="proyectos" className="sec">
        <div className="c">
          <Reveal><span className="stag">// Proyectos</span></Reveal>
          <Reveal delay={80}><h2 className="sh2">Trabajo <span className="glow-text">destacado</span></h2></Reveal>
          <Reveal delay={140}><p className="sdesc" style={{ color: T.textSub }}>Proyectos reales que demuestran mis capacidades técnicas y analíticas.</p></Reveal>
          <div className="g3">
            {PROJECTS.map((p, i) => (
              <Reveal key={i} delay={i * 110} style={{ height: "100%" }}>
                <div className="card-hover-wrap">
                  <div className={styles.card} style={{ background: T.bgCard, border: `1px solid ${p.accent}22` }}>
                    <div className="card-top" style={{ background: `linear-gradient(90deg,${p.accent},${p.accent}88,transparent)` }} />
                    <h3 className={styles.title} style={{ color: p.color }}>{p.title}</h3>
                    <p className={styles.desc} style={{ color: T.textSub }}>{p.desc}</p>
                    <div className={styles.tags}>{p.tech.map((t) => <span key={t} className="tag" style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}35` }}>{t}</span>)}</div>
                    <span
                      className={styles.cta}
                      style={{ color: p.color }}
                      onClick={() => handleOpen(p.title, p.accent)}
                    >
                      Ver proyecto →
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
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

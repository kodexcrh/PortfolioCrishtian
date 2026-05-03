import { useState } from "react";
import { CORNER_LOGOS } from "../constants";
import { useLang } from "../context/LangContext";
import Reveal from "./Reveal";
import EstudiosModal from "./EstudiosModal";
import ExperienciasModal from "./ExperienciasModal";
import styles from "./SobreMi.module.css";
import fotoProfile from "../assets/foto.png";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

export default function SobreMi({ dark, T }) {
  const { t } = useLang();
  const [showEstudios,     setShowEstudios]     = useState(false);
  const [showExperiencias, setShowExperiencias] = useState(false);

  return (
    <section id="sobre-mi" className="sec">
      <div className="c">
        <Reveal>
          <span className="stag">// {t("about.tag")}</span>
        </Reveal>

        <div className={styles.grid}>
          {/* ── Columna foto ── */}
          <Reveal delay={100}>
            <div className={styles.photoWrap}>
              <div className={styles.photoInner}>
                <div className={styles.photoRing} />
                <img src={fotoProfile} alt="Crishtian" className={styles.photoImg} loading="lazy" />
                {CORNER_LOGOS.map((cl) => (
                  <div key={cl.name} className={`corner-badge-wrap ${cl.pos}`}>
                    <div
                      className="corner-badge"
                      style={{
                        background: dark ? "rgba(15,15,30,0.92)" : "rgba(255,255,255,0.94)",
                        border: `1.5px solid ${cl.color}44`,
                        boxShadow: `0 4px 20px ${cl.color}33`,
                      }}
                      title={cl.name}
                    >
                      {cl.icon(26)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Columna texto ── */}
          <div className={styles.textCol}>
            <Reveal delay={120}>
              <h2 className={styles.title}>
                {t("about.title").split("IA")[0]}
                <span className="glow-text">IA</span>
                {t("about.title").split("IA")[1] || ""}
              </h2>
            </Reveal>

            {/* p1 — 4 keywords coloreadas */}
            <Reveal delay={180}>
              <p className={styles.desc} style={{ color: T.textMid }}>
                {(() => {
                  const p1 = t("about.p1");
                  const [a, rest1 = ""] = p1.split("React JS");
                  const [b, rest2 = ""] = rest1.split("Power BI");
                  const [c, rest3 = ""] = rest2.split("n8n");
                  const [d, rest4 = ""] = rest3.split("Claude AI");
                  return (
                    <>
                      {a}
                      <strong style={{ color: "var(--clr-accent2)" }}>React JS</strong>
                      {b}
                      <strong style={{ color: "#F2C811" }}>Power BI</strong>
                      {c}
                      <strong style={{ color: "#EA4B71" }}>n8n</strong>
                      {d}
                      <strong style={{ color: "var(--clr-accent)" }}>Claude AI</strong>
                      {rest4}
                    </>
                  );
                })()}
              </p>
            </Reveal>

            {/* p2 — texto limpio sin keywords */}
            <Reveal delay={220}>
              <p className={styles.desc2} style={{ color: T.textMid }}>
                {t("about.p2")}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className={styles.tags}>
                {[
                  ["React JS",     "#9333EA"],
                  ["Power BI",     "#F2C811"],
                  ["Claude AI",    "#A855F7"],
                  ["n8n",          "#EA4B71"],
                  ["JavaScript",   "#F7DF1E"],
                  ["Tailwind CSS", "#38BDF8"],
                  ["Git",          "#F05032"],
                  ["REST APIs",    "#A8EB12"],
                  ["Figma",        "#A259FF"],
                  ["Illustrator",  "#FF9A00"],
                  ["GitHub",       "#ffffff"],
                ].map(([skill, color]) => (
                  <span
                    key={skill}
                    className="tag"
                    style={{
                      background: `${color}18`,
                      color,
                      border: `1px solid ${color}35`,
                      fontSize: 12,
                      padding: "5px 14px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* ── Botones ── */}
            <Reveal delay={300}>
              <div className={styles.btns}>
                <button className="btn-p" onClick={() => setShowEstudios(true)}>
                  {t("about.btnStudies")}{" "}
                  <span className={styles.icon}><FaGraduationCap /></span>
                </button>
                <button className="btn-o" onClick={() => setShowExperiencias(true)}>
                  {t("about.btnExp")}{" "}
                  <span className={styles.icon}><FaBriefcase /></span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Modales ── */}
      {showEstudios && (
        <EstudiosModal onClose={() => setShowEstudios(false)} dark={dark} T={T} />
      )}
      {showExperiencias && (
        <ExperienciasModal onClose={() => setShowExperiencias(false)} dark={dark} T={T} />
      )}
    </section>
  );
}

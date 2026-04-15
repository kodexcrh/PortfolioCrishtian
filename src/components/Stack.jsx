import { useState } from "react";
import { STACK_ITEMS } from "../constants";
import Reveal from "./Reveal";
import styles from "./Stack.module.css";

const LEVEL_COLOR = {
  "Avanzado":   "#A8EB12",
  "Intermedio": "#ffc75f",
  "Básico":     "#4ffbdf",
};

export default function Stack({ dark, T }) {
  const [hovStack, setHovStack] = useState(null);

  // Cicla entre los 3 colores de root para el hover
  const HOVER_COLORS = ["#01D4E8", "#FF3E81", "#FEC303"];

  return (
    <section id="stack" className="sec">
      <div className="c">
        <Reveal><span className="stag">// Habilidades</span></Reveal>
        <Reveal delay={80}><h2 className="sh2">Mi <span className="glow-text">Stack</span></h2></Reveal>
        <Reveal delay={140}><p className="sdesc" style={{ color: T.textSub }}>Herramientas y tecnologías con las que trabajo a diario.</p></Reveal>
        <Reveal delay={180}>
          <div className="stack-grid">
            {STACK_ITEMS.map((s, idx) => {
              const isHov = hovStack === s.name;
              const levelColor = LEVEL_COLOR[s.level] || "#7C3AED";
              const hc = HOVER_COLORS[idx % 3];
              return (
                <div
                  key={s.name}
                  className={`stack-item ${styles.itemWrap}`}
                  onMouseEnter={() => setHovStack(s.name)}
                  onMouseLeave={() => setHovStack(null)}
                  style={{
                    background: isHov ? (dark ? `${hc}18` : `${hc}12`) : (dark ? "#0f0f1e" : "#f8f4ff"),
                    border: `1.5px solid ${isHov ? hc + "66" : (dark ? "#ffffff08" : "#7C3AED12")}`,
                    boxShadow: isHov ? `0 12px 32px ${hc}35` : "none",
                    position: "relative",
                  }}
                >
                  {s.icon()}
                  <span className={styles.name} style={{ color: isHov ? hc : T.textSub }}>
                    {s.name}
                  </span>

                  {/* Tooltip */}
                  {isHov && (
                    <div
                      className={styles.tooltip}
                      style={{
                        background: dark ? "#0f0f1e" : "#ffffff",
                        border: `1px solid ${hc}44`,
                        boxShadow: `0 8px 24px ${hc}22`,
                      }}
                    >
                      {/* Flecha del tooltip */}
                      <div className={styles.tooltipArrow} style={{ borderTopColor: dark ? "#0f0f1e" : "#ffffff" }} />

                      {/* Nivel */}
                      <div className={styles.tooltipLevel}>
                        <span
                          className={styles.levelDot}
                          style={{ background: levelColor }}
                        />
                        <span style={{ color: levelColor, fontWeight: 700, fontSize: 11 }}>
                          {s.level}
                        </span>
                      </div>

                      {/* Barra de nivel */}
                      <div className={styles.levelBar} style={{ background: dark ? "#ffffff10" : "#00000010" }}>
                        <div
                          className={styles.levelFill}
                          style={{
                            width: s.level === "Avanzado" ? "90%" : s.level === "Intermedio" ? "65%" : "40%",
                            background: levelColor,
                          }}
                        />
                      </div>

                      {/* Descripción */}
                      <p className={styles.tooltipDesc} style={{ color: T.textSub }}>
                        {s.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useState } from "react";
import { STACK_ITEMS } from "../constants";
import { useLang } from "../context/LangContext";
import Reveal from "./Reveal";
import styles from "./Stack.module.css";

const LEVEL_COLOR = {
  "Avanzado":   "#A8EB12",
  "Intermedio": "var(--clr-gold)",
  "Básico":     "var(--clr-cyan)",
};

const HOVER_COLORS = ["var(--clr-cyan)", "var(--clr-pink)", "var(--clr-gold)"];

export default function Stack({ dark, T }) {
  const { t } = useLang();
  const [hovStack, setHovStack] = useState(null);

  const levels = t("stack.levels");

  return (
    <section id="stack" className="sec">
      <div className="c">
        <Reveal><span className="stag">// {t("stack.tag")}</span></Reveal>
        <Reveal delay={80}>
          <h2 className="sh2">
            {t("stack.title")}{" "}
            <span className="glow-text">{t("stack.titleSpan")}</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="sdesc" style={{ color: T.textSub }}>
            {t("stack.sub")}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="stack-grid">
            {STACK_ITEMS.map((s, idx) => {
              const isHov      = hovStack === s.name;
              const levelColor = LEVEL_COLOR[s.level] || "var(--clr-accent)";
              const hc         = HOVER_COLORS[idx % 3];
              const levelLabel = levels?.[s.level] || s.level;

              return (
                <div
                  key={s.name}
                  className={`stack-item ${styles.itemWrap}`}
                  onMouseEnter={() => setHovStack(s.name)}
                  onMouseLeave={() => setHovStack(null)}
                  style={{
                    background:  isHov ? (dark ? `${hc}18` : `${hc}12`) : (dark ? "#0f0f1e" : "#f8f4ff"),
                    border:      `1.5px solid ${isHov ? hc + "66" : (dark ? "#ffffff08" : "var(--clr-accent)12")}`,
                    boxShadow:   isHov ? `0 12px 32px ${hc}35` : "none",
                    position:    "relative",
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
                        border:     `1px solid ${hc}44`,
                        boxShadow:  `0 8px 24px ${hc}22`,
                      }}
                    >
                      <div className={styles.tooltipArrow} style={{ borderTopColor: dark ? "#0f0f1e" : "#ffffff" }} />

                      <div className={styles.tooltipLevel}>
                        <span className={styles.levelDot} style={{ background: levelColor }} />
                        <span style={{ color: levelColor, fontWeight: 700, fontSize: 11 }}>
                          {levelLabel}
                        </span>
                      </div>

                      <div className={styles.levelBar} style={{ background: dark ? "#ffffff10" : "#00000010" }}>
                        <div
                          className={styles.levelFill}
                          style={{
                            width:      s.level === "Avanzado" ? "90%" : s.level === "Intermedio" ? "65%" : "40%",
                            background: levelColor,
                          }}
                        />
                      </div>

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

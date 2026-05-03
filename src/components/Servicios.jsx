import { SERVICES } from "../constants";
import { useLang } from "../context/LangContext";
import Reveal from "./Reveal";
import styles from "./Servicios.module.css";

export default function Servicios({ T }) {
  const { t } = useLang();
  const serviceItems = t("services.items");

  return (
    <section id="servicios" className="sec">
      <div className="c">
        <Reveal><span className="stag">// {t("services.tag")}</span></Reveal>
        <Reveal delay={80}>
          <h2 className="sh2">
            {t("services.title")}{" "}
            <span className="glow-text">{t("services.titleSpan")}</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="sdesc" style={{ color: T.textSub }}>
            {t("services.sub")}
          </p>
        </Reveal>

        <div className="g3">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 110} style={{ height: "100%" }}>
              <div className="card-hover-wrap">
                <div
                  className={styles.card}
                  style={{
                    background: T.bgCard,
                    border: `1px solid ${s.accent}22`,
                  }}
                >
                  <div
                    className="card-top"
                    style={{
                      background: `linear-gradient(90deg,${s.accent},${s.accent}88,transparent)`,
                    }}
                  />
                  <div className={styles.icon}>{s.icon}</div>
                  <h3 className={styles.title}>
                    {serviceItems?.[i]?.title || s.title}
                  </h3>
                  <p className={styles.desc} style={{ color: T.textSub }}>
                    {serviceItems?.[i]?.desc || s.desc}
                  </p>
                  <div>
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag"
                        style={{
                          background: `${s.accent}18`,
                          color: s.accent,
                          border: `1px solid ${s.accent}35`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

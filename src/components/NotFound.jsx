import { useEffect, useState } from "react";
import { scrollToSection } from "../utils/scrollTo";
import styles from "./NotFound.module.css";

export default function NotFound({ T, dark }) {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrap} style={{ background: dark ? "#07070f" : "#f7f4ff", color: dark ? "#e8e8f0" : "#1a0033" }}>

      {/* Fondo */}
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      <div className={styles.content}>

        {/* 404 grande */}
        <div className={styles.code}>
          <span className={styles.four}>4</span>
          <span className={styles.zero}>
            {/* Logo como el 0 */}
            <svg viewBox="0 0 1000 833" xmlns="http://www.w3.org/2000/svg" className={styles.logoZero}>
              <path d="M0 0 C61.43 4.24 90.28 9.31 138.43 30.24 C157.02 39.46 186.43 61.24 223.43 96.24 C247.61 124.99 277.43 189.24 283.43 212.24 C319.17 221.46 379.43 260.24 445.33 325.75 C488.43 439.24 492.68 487.05 485.96 554.08 C473.59 605.91 419.47 683.01 392.43 710.24 C353.43 640.24 412.82 497.46 393.43 406.24 C352.43 348.24 262.43 296.24 213.31 286.22 C146.5 136.63 39.43 86.24 -55.57 94.24 C-108.57 121.24 -155.57 167.24 -195.57 288.24 C-280.86 304.04 -348.57 364.24 -394.81 515.99 C-387.57 551.24 -348.57 625.24 -274.57 682.24 C-163.47 701.73 -118.22 704.88 -84.39 679.12 C-29.09 581.75 -35.37 503.16 -142.57 314.24 C-50.57 314.24 78.43 547.24 71.74 559.55 C28.49 635.11 -54.57 780.24 -245.62 781.04 C-344.64 742.32 -461.57 594.24 -477.7 548.76 C-482.61 503.02 -451.57 371.24 -413.57 311.24 C-371.57 269.24 -261.57 214.24 -195.57 288.24 C-229.13 127.49 -97.58 18.44 0 0 Z" fill="#8B5CF6" transform="translate(493.57,26.76)"/>
              <path d="M0 0 C86.27 -1.32 94 9 114.94 46.44 C215.42 222.27 220.76 234.39 172.13 320.75 C98.69 449.44 85.11 466.6 -4 466 C21.8 418.92 90 299.5 114.93 220.3 C43.61 78.07 0 2.21 0 0 Z" fill="#8B5CF6" transform="translate(538,341)"/>
            </svg>
          </span>
          <span className={styles.four}>4</span>
        </div>

        {/* Mensaje */}
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.desc} style={{ color: dark ? "#66668a" : "#7a5a99" }}>
          Parece que esta página no existe o fue movida.
        </p>

        {/* Contador regresivo */}
        <div className={styles.counter} style={{ color: dark ? "#44445e" : "#b8a0cc" }}>
          <span className={styles.monospace}>Redirigiendo en </span>
          <span className={styles.countNum}>{count}</span>
          <span className={styles.monospace}> segundos...</span>
        </div>

        {/* Botones */}
        <div className={styles.btns}>
          <button className="btn-p" onClick={() => window.location.href = "/"}>
            ← Volver al inicio
          </button>
          <button className="btn-o" onClick={() => { window.location.href = "/"; setTimeout(() => scrollToSection("Contacto"), 500); }}>
            Contactar
          </button>
        </div>

        {/* Links rápidos */}
        <div className={styles.links}>
          {["Proyectos", "Servicios", "Precios"].map(sec => (
            <span
              key={sec}
              className={styles.link}
              style={{ color: "#8B5CF6" }}
              onClick={() => { window.location.href = "/"; setTimeout(() => scrollToSection(sec), 500); }}
            >
              {sec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import styles from "./SplashScreen.module.css";
import KodexLogo from "../assets/KODEX.png";

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("idle");
  const [revealWidth, setRevealWidth] = useState(0);
  const [showGlow, setShowGlow] = useState(false);
  const animRef = useRef(null);

  useEffect(() => {
    let start = null;
    const DRAW_DURATION = 900;
    setPhase("draw");

    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / DRAW_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setRevealWidth(eased * 100);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setRevealWidth(100);
        setShowGlow(true);
        setPhase("hold");
      }
    };

    const t1 = setTimeout(() => {
      animRef.current = requestAnimationFrame(animate);
    }, 300);

    const t2 = setTimeout(() => setPhase("exit"), 2600);
    const t3 = setTimeout(() => { setPhase("done"); onFinish(); }, 3300);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [onFinish]);

  if (phase === "done") return null;

  return (
    <div className={`${styles.splash} ${phase === "exit" ? styles.exit : ""}`}>
      <div className={styles.bg}>
        <div className={styles.bgNoise} />
        <div className={styles.grid} />
        <div className={styles.scanLines} />
      </div>

      {[...Array(8)].map((_, i) => (
        <div key={i} className={`${styles.particle} ${styles["p" + (i + 1)]}`} />
      ))}

      <div className={styles.center}>
        <div className={styles.borderTop} style={{ width: `${revealWidth}%` }} />

        <div className={styles.logoWrap}>
          <div
            className={styles.logoReveal}
            style={{ clipPath: `inset(0 ${100 - revealWidth}% 0 0)` }}
          >
            <img
              src={KodexLogo}
              alt="KODEX"
              className={`${styles.logoImg} ${showGlow ? styles.logoGlow : ""}`}
            />
          </div>
          <div
            className={styles.typedCursor}
            style={{ left: `${revealWidth}%`, opacity: phase === "hold" ? 0 : 1 }}
          />
        </div>

        <div className={styles.borderBottom} style={{ width: `${revealWidth}%` }} />

        <div className={styles.subtitle} style={{ opacity: revealWidth > 80 ? 1 : 0 }}>
          <span className={styles.subtitleDot} />&nbsp;
          <span>Dev &amp; Data Solutions</span>
          &nbsp;<span className={styles.subtitleDot} />
        </div>
      </div>

      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />

      <div className={styles.loadBarWrap}>
        <div className={styles.loadBar} style={{ width: `${revealWidth}%` }} />
      </div>
    </div>
  );
}

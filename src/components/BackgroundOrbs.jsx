import { useParallax } from "../hooks/useParallax";
import styles from "./BackgroundOrbs.module.css";

export default function BackgroundOrbs({ dark }) {
  const offsetSlow = useParallax(0.08, 80);
  const offsetMid  = useParallax(0.14, 100);
  const offsetFast = useParallax(0.20, 120);

  return (
    <div aria-hidden="true" className={styles.container}>
      <div className={`${styles.orb} ${styles.orb1}`} style={{ background: `radial-gradient(circle,${dark ? "#8F00FF18" : "#8F00FF0e"} 0%,transparent 70%)`, transform: `translateY(${offsetSlow}px)` }} />
      <div className={`${styles.orb} ${styles.orb2}`} style={{ background: `radial-gradient(circle,${dark ? "#AE35FF14" : "#AE35FF0a"} 0%,transparent 70%)`, transform: `translateY(-${offsetMid}px)` }} />
      <div className={`${styles.orb} ${styles.orb3}`} style={{ background: `radial-gradient(circle,${dark ? "#A8EB1208" : "#A8EB1206"} 0%,transparent 70%)`, transform: `translate(-50%, calc(-50% + ${offsetFast * 0.5}px))` }} />
    </div>
  );
}

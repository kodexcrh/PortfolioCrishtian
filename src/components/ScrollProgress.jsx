import { useScrollProgress } from "../hooks/useScrollProgress";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div aria-hidden="true" className={styles.track}>
      <div className={styles.bar} style={{ transform: `scaleX(${progress})`, opacity: progress > 0.01 ? 1 : 0 }} />
    </div>
  );
}

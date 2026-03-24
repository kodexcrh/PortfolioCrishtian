import { useState, useEffect } from "react";
import styles from "./ScrollToTop.module.css";

/*
  ScrollToTop
  Botón flotante en la esquina inferior derecha.
  - Aparece solo cuando el usuario ha scrolleado más de 400px
  - Animación suave de entrada/salida con CSS
  - Click → vuelve al top con scroll suave
*/
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : styles.hidden}`}
      onClick={handleClick}
      aria-label="Volver al inicio"
      title="Volver al inicio"
    >
      {/* Flecha hacia arriba */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

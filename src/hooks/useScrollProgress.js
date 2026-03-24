import { useEffect, useRef, useState } from "react";

/**
 * useScrollProgress
 * Devuelve el progreso de scroll de la página como valor 0→1.
 *
 * Técnica: (scrollY) / (scrollHeight - clientHeight)
 * Usa RAF + listener pasivo para máximo rendimiento.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const calculate = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Evitar división por cero si la página no hace scroll
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(pct);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(calculate);
    };

    // Calcular al montar (por si la página carga con scroll)
    calculate();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return progress;
}

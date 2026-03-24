import { useEffect, useRef, useState } from "react";

/**
 * useParallax
 * Devuelve un valor de desplazamiento Y proporcional al scroll.
 *
 * @param {number} speed  — factor de velocidad (0.1 = lento, 0.5 = rápido)
 * @param {number} max    — límite máximo de píxeles de desplazamiento
 * @returns {number}       offsetY en px
 *
 * Usa requestAnimationFrame para no bloquear el hilo principal.
 * El listener de scroll es { passive: true } para máximo rendimiento.
 */
export function useParallax(speed = 0.15, max = 120) {
  const [offsetY, setOffsetY] = useState(0);
  const rafRef = useRef(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;

      // Cancelar frame anterior si no se procesó aún
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const raw = scrollY.current * speed;
        // Clamp para que no se vaya infinito
        setOffsetY(Math.min(raw, max));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, max]);

  return offsetY;
}

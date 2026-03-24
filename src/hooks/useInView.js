import { useState, useEffect, useRef } from "react";

/**
 * useInView — optimizado
 *
 * Mejoras vs versión original:
 * 1. once: true (default) → desconecta el IntersectionObserver después de
 *    la primera vez que el elemento es visible. Evita trabajo innecesario
 *    del observer en elementos que ya animaron.
 * 2. rootMargin configurable para afinar cuándo se dispara.
 * 3. El ref es estable — no se recrea en cada render.
 *
 * @param {number}  threshold   — 0.0 a 1.0, fracción visible para disparar
 * @param {boolean} once        — si true, desconecta tras la primera vez
 * @param {string}  rootMargin  — margin del viewport para el observer
 */
export function useInView(threshold = 0.1, once = true, rootMargin = "0px") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Desconectar inmediatamente para liberar recursos
          if (once) observer.disconnect();
        } else if (!once) {
          // Solo actualizar si once=false (para animaciones reversibles)
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return [ref, visible];
}

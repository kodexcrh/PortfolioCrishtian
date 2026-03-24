import { useState, useEffect, useRef } from "react";

/**
 * useCountUp — anima un número desde 0 hasta el valor objetivo
 * @param {number} end       — valor final
 * @param {number} duration  — duración en ms (default 2000)
 * @param {boolean} trigger  — cuando se vuelve true, inicia la animación
 */
export function useCountUp(end, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const started  = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const startVal  = 0;

    const animate = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startVal + (end - startVal) * eased);
      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger, end, duration]);

  return count;
}

import { useState, useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";
import KodexIcon from "../assets/BotonFlotante.png";

export default function CustomCursor() {
  const cursorRef  = useRef(null);
  const trailRef   = useRef(null);
  const pos        = useRef({ x: -100, y: -100 });
  const trailPos   = useRef({ x: -100, y: -100 });
  const [clicking, setClicking]   = useState(false);
  const [hovering, setHovering]   = useState(false);
  const [visible,  setVisible]    = useState(false);
  const frameRef   = useRef(null);

  useEffect(() => {
    // Ocultar cursor nativo
    document.body.style.cursor = "none";

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Detectar si está sobre elemento clickeable
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isClickable = el?.closest("a, button, [role='button'], input, select, textarea, label, [onClick]");
      setHovering(!!isClickable);
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Animación suave del trail
    const animate = () => {
      const lerp = (a, b, t) => a + (b - a) * t;
      trailPos.current.x = lerp(trailPos.current.x, pos.current.x, 0.12);
      trailPos.current.y = lerp(trailPos.current.y, pos.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // No mostrar en móvil/touch
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Trail suave detrás */}
      <div
        ref={trailRef}
        className={`${styles.trail} ${hovering ? styles.trailHover : ""} ${clicking ? styles.trailClick : ""} ${visible ? styles.visible : styles.hidden}`}
      />

      {/* Cursor principal con logo */}
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${hovering ? styles.cursorHover : ""} ${clicking ? styles.cursorClick : ""} ${visible ? styles.visible : styles.hidden}`}
      >
        {/* Logo KODEX */}
        <img src={KodexIcon} alt="KX" className={styles.logo} />
      </div>
    </>
  );
}

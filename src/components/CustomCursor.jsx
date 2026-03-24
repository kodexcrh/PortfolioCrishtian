import { useState, useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

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
        {/* Logo SVG de CloudCoders */}
        <svg viewBox="0 0 1000 833" xmlns="http://www.w3.org/2000/svg" className={styles.logo}>
          <path
            d="M0 0 C0.79 0 2.41 -0.03 61.43 4.24 C90.28 9.31 115.01 18.58 138.43 30.24 C157.02 39.46 172.34 49.52 186.43 61.24 C200.62 72.87 212.95 83.76 223.43 96.24 C247.61 124.99 266.18 155.59 277.43 189.24 C283.43 208.24 283.43 212.24 319.17 221.46 C352.04 238.45 379.43 260.24 445.33 325.75 C475.14 390.5 485.38 422.78 488.43 439.24 C492.3 463.22 492.68 487.05 492.68 487.05 C492.66 511.27 491.23 532.95 485.96 554.08 C473.59 605.91 451.01 648.74 419.47 683.01 C392.43 710.24 353.43 640.24 412.82 497.46 C410.76 456.42 393.43 406.24 352.43 348.24 C309.96 313.68 262.43 296.24 213.31 286.22 C146.5 136.63 114.43 113.24 39.43 86.24 C10.24 83.86 -13.86 83.94 -55.57 94.24 C-75.86 100.83 -108.57 121.24 -133.57 142.24 C-155.57 167.24 -182.14 203.92 -195.57 288.24 C-224.25 291.42 -238.91 294.75 -280.86 304.04 C-322.41 330.03 -348.57 364.24 -376.57 409.24 C-393.57 470.24 -394.83 497.62 -394.81 515.99 C-392.29 533.5 -387.57 551.24 -379.6 579.86 C-365.44 604.6 -348.57 625.24 -327.61 651.04 C-302.67 669.22 -274.57 682.24 -242.76 694.05 C-214.95 701.44 -163.47 701.73 -144.42 702.21 C-118.22 704.88 -93.98 698 -84.39 679.12 C-67.34 648.09 -44.2 608 -29.09 581.75 C-11.57 545.24 -14.46 539.69 -35.37 503.16 C-63.19 454.46 -103.63 383.91 -142.57 314.24 C-81.85 314.24 16.43 431.49 78.43 547.24 C71.74 559.55 28.49 635.11 -14.73 711.1 C-44.38 762.93 -54.57 780.24 -163.35 780.79 C-245.62 781.04 -264.57 775.24 -279.45 770.61 C-344.64 742.32 -414.57 677.24 -436.33 649.69 C-451.48 622.82 -461.57 594.24 -477.7 548.76 C-482.61 503.02 -476.84 458.34 -473.18 424.56 C-463.78 396.46 -451.57 371.24 -440.7 348.36 C-428.41 328.94 -413.57 311.24 -399.34 293.99 C-386.28 280.4 -371.57 269.24 -357.52 258.13 C-346.83 250.93 -335.57 244.24 -311.54 230.05 C-286.59 218.27 -261.57 214.24 -251.29 168.3 C-229.13 127.49 -199.64 95.49 -186.13 80.07 C-177.26 71.89 -167.57 64.24 -155.08 53.91 C-145.63 47.34 -135.57 41.24 -97.58 18.44 C-59.14 6.47 -17.57 1.24 0 0 Z"
            fill="#8B5CF6"
            transform="translate(493.57,26.76)"
          />
          <path
            d="M0 0 C34.11 -0.47 86.27 -1.32 90.44 1.85 C94 9 99.25 18.32 114.94 46.44 C127.73 68.78 215.42 222.27 220.76 234.39 C217.33 241.86 198.88 273.69 172.13 320.75 C141.17 375.13 98.69 449.44 92 461 C85.11 466.6 68.36 466.49 28.91 466.24 C6.97 466.11 -4 466 -4 466 C0.98 455.45 21.8 418.92 42.43 610.74 C57.98 306.71 90 299.5 104 275 C123.58 240.52 128.79 228.66 114.93 220.3 C88.94 157.94 43.61 78.07 2.84 6.95 C0 2.21 0 0 0 0 Z"
            fill="#8B5CF6"
            transform="translate(538,341)"
          />
        </svg>
      </div>
    </>
  );
}

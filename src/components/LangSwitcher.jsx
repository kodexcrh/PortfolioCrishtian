import { useState, useRef, useEffect } from "react";
import { MdLanguage } from "react-icons/md";
import { useLang } from "../context/LangContext";
import styles from "./LangSwitcher.module.css";

const LANGS = [
  { code: "es", label: "Español", short: "ES" },
  { code: "en", label: "English", short: "EN" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "zh", label: "中文", short: "ZH" },
];

export default function LangSwitcher({ dark, T }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Cerrar al click fuera
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    setTimeout(() => document.addEventListener("click", close), 10);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const active = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <div className={styles.wrapper} ref={ref}>
      {/* ── Trigger ── */}
      <button
        className={styles.trigger}
        style={{
          background: open
            ? dark
              ? "#7C3AED22"
              : "#7C3AED14"
            : "transparent",
          border: `1.5px solid ${open ? "#7C3AED66" : dark ? "#7C3AED22" : "#7C3AED18"}`,
          color: open ? "#7C3AED" : T?.textMid || "#8888a8",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-label="Cambiar idioma"
        title="Cambiar idioma"
      >
        <MdLanguage size={15} />
        <span className={styles.shortLabel}>{active.short}</span>
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div
          className={styles.dropdown}
          style={{
            background: dark ? "rgba(7,7,15,0.97)" : "rgba(247,244,255,0.97)",
            border: `1px solid ${dark ? "#7C3AED22" : "#7C3AED18"}`,
            backdropFilter: "blur(20px)",
          }}
        >
          {LANGS.map((l) => {
            const isActive = l.code === lang;
            return (
              <button
                key={l.code}
                className={styles.option}
                style={{
                  background: isActive
                    ? "#7C3AED18"
                    : "transparent",
                  color: isActive ? "#7C3AED" : T?.textMid || "#8888a8",
                  fontWeight: isActive ? 700 : 500,
                }}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
              >
                <span className={styles.optionShort}>{l.short}</span>
                <span className={styles.optionFull}>{l.label}</span>
                {isActive && (
                  <span className={styles.activeDot} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

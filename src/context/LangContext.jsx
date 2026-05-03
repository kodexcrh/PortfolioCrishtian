import { createContext, useContext, useState, useEffect } from "react";
import es from "../i18n/es.json";
import en from "../i18n/en.json";
import pt from "../i18n/pt.json";
import zh from "../i18n/zh.json";

// ── Diccionario de traducciones ────────────────────────────────
const translations = { es, en, pt, zh };

// ── Contexto ───────────────────────────────────────────────────
const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("kodex-lang") || "es";
  });

  useEffect(() => {
    localStorage.setItem("kodex-lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  /**
   * t("hero.greeting") → string del idioma activo
   * Soporta dot-notation para claves anidadas
   */
  const t = (key) =>
    key.split(".").reduce((obj, k) => obj?.[k], translations[lang]) ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

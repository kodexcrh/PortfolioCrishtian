import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaBriefcase,
  FaRocket,
  FaHandshake,
  FaCode,
  FaChartLine,
  FaPalette,
  FaWhatsapp,
  FaRedo,
} from "react-icons/fa";
import { MdContentCopy, MdCheck, MdFlashOn } from "react-icons/md";
import { useLang } from "../context/LangContext";
import styles from "./AIPitchGenerator.module.css";

// ── Datos del portfolio ────────────────────────────────────────
const MY_INFO = `
Nombre: Crishtian Rodriguez Herrera
Rol profesional: Frontend Developer, Data Analyst & Automation Specialist
Stack principal: React JS, Power BI, n8n, Claude AI, JavaScript, PostgreSQL, Supabase, Node.js
Experiencia: 3+ años, 20+ proyectos entregados en producción
Ubicación: Huaraz, Perú — trabajo 100% remoto
Marca: KODEX — soluciones digitales con propósito
Portfolio: portfolio-crishtian.vercel.app
WhatsApp: +51 960 959 529

Proyectos reales destacados:
— SisEducacion: sistema ERP escolar completo (React+Vite, Node.js, PostgreSQL, 16 módulos: matrículas, pensiones, asistencia por QR, facturación, preuniversitaria con ranking automático)
— RestaurantePro: ERP de restaurante full-stack con 46 módulos (delivery, facturación electrónica, RRHH, pasarela de pago Culqi/Yape/Plin)
— Bot de gastos: agente IA en Telegram que categoriza gastos automáticamente y los registra en Google Sheets + Supabase vía n8n
— Dashboard Analytics: Power BI con DAX avanzado e integración Claude AI para análisis predictivo

Servicios que ofrezco:
1. Desarrollo Frontend React JS — interfaces que convierten, escalan y se ven brutales
2. Análisis de Datos con Power BI + IA — dashboards que toman decisiones solas
3. Automatización n8n — flujos que trabajan mientras duermes

Diferenciador clave: No solo codifico. Integro IA para que los sistemas piensen, no solo funcionen.
`;

// ── Mapeo emojis → react-icons ─────────────────────────────────
const ROLE_ICONS = {
  0: FaRobot,
  1: FaRocket,
  2: FaBriefcase,
  3: FaCode,
  4: FaChartLine,
  5: FaPalette,
};

// ── Typewriter hook ────────────────────────────────────────────
function useTypewriter(text, speed = 18) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      setDone(false);
      return;
    }
    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    timerRef.current = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(timerRef.current);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(timerRef.current);
  }, [text, speed]);

  return { displayed, done };
}

// ── Componente principal ───────────────────────────────────────
export default function AIPitchGenerator({ dark, T }) {
  const { t } = useLang();

  const ROLES = t("pitch.roles");
  const TONES = t("pitch.tones");

  const [selectedRole, setSelectedRole] = useState(null);
  const [customRole, setCustomRole] = useState("");
  const [selectedTone, setSelectedTone] = useState(TONES[0].value);
  const [industry, setIndustry] = useState("");
  const [rawResult, setRawResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const activeRole = selectedRole?.label || customRole.trim();
  const activeAccent = selectedRole?.accent || "#7C3AED";

  const { displayed, done } = useTypewriter(rawResult, 16);

  async function generate() {
    if (!activeRole) return;
    setLoading(true);
    setRawResult("");
    setError("");

    const industryLine = industry.trim()
      ? `\nSector/Industria del visitante: ${industry.trim()}`
      : "";

    const systemPrompt = `Eres Crishtian Rodriguez Herrera. Hablas en primera persona, directamente a quien visita tu portfolio ahora mismo.

REGLAS ABSOLUTAS:
- Máximo 4 oraciones naturales. Sin excepciones.
- Primera persona siempre. Nunca "Crishtian hace" — siempre "yo hago".
- Menciona UN proyecto real o resultado concreto tuyo, no genérico.
- Termina con una invitación directa y específica a contactar.
- CERO asteriscos, CERO markdown, CERO listas, CERO subtítulos.
- Tono: ${selectedTone}.
- Suenas como una persona real hablando, no como un CV ni un chatbot.
- Si el visitante es reclutador: menciona impacto medible. Si es founder: menciona velocidad y ROI. Si es cliente: menciona el problema que resuelves. Si es developer: habla de arquitectura y código limpio.
- Incluye al menos una tecnología concreta relevante para ese perfil.`;

    const userPrompt = `Genera el pitch para: "${activeRole}"${industryLine}

Mis datos: ${MY_INFO}

Habla directo a esta persona. Hazlo memorable y humano.`;

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 180,
          temperature: 0.9,
          top_p: 0.95,
          frequency_penalty: 0.3,
          presence_penalty: 0.2,
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setRawResult(
        data.choices?.[0]?.message?.content?.trim() || "No se pudo generar el pitch."
      );
    } catch {
      setError(t("pitch.errorMsg"));
    }

    setLoading(false);
  }

  function copyText() {
    navigator.clipboard.writeText(rawResult).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function openWhatsApp() {
    const text = encodeURIComponent(
      `Hola Crishtian, vi tu portfolio y me interesa tu trabajo. ${rawResult}`
    );
    window.open(`https://wa.me/51960959529?text=${text}`, "_blank");
  }

  // Sync tones al cambiar idioma
  useEffect(() => {
    setSelectedTone(TONES[0].value);
    setSelectedRole(null);
  }, [t]);

  return (
    <section id="ai-pitch" className={styles.section}>
      <div className={`c ${styles.inner}`}>
        {/* ── Header ── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="stag">
            <MdFlashOn style={{ verticalAlign: "middle", marginRight: 4 }} />
            {t("pitch.tag")}
          </span>
          <h2 className="htitle" style={{ marginTop: 12 }}>
            {t("pitch.title")}{" "}
            <span className="glow-text">{t("pitch.titleSpan")}</span>
          </h2>
          <p
            className="hsub"
            style={{ color: T.textMid, maxWidth: 520, margin: "0 auto" }}
          >
            {t("pitch.sub")}
          </p>
        </motion.div>

        {/* ── Card ── */}
        <motion.div
          className={styles.card}
          style={{
            background: dark
              ? "linear-gradient(135deg,#0f0f1e,#12121f)"
              : "linear-gradient(135deg,#ffffff,#faf5ff)",
            border: `1px solid ${dark ? "#7C3AED22" : "#7C3AED18"}`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className={styles.topBar} />

          {/* Paso 1: rol */}
          <div className={styles.step}>
            <p className={styles.stepLabel} style={{ color: T.textSub }}>
              {t("pitch.step1")}
            </p>
            <div className={styles.roleGrid}>
              {ROLES.map((r, i) => {
                const Icon = ROLE_ICONS[i] || FaBriefcase;
                return (
                  <button
                    key={r.label}
                    className={styles.roleBtn}
                    style={{
                      background:
                        selectedRole?.label === r.label
                          ? `${r.accent}18`
                          : dark ? "#0a0a18" : "#f5f0ff",
                      border:
                        selectedRole?.label === r.label
                          ? `1.5px solid ${r.accent}99`
                          : `1px solid ${dark ? "#7C3AED22" : "#7C3AED18"}`,
                      color:
                        selectedRole?.label === r.label ? r.accent : T.textMid,
                    }}
                    onClick={() => {
                      setSelectedRole(r);
                      setCustomRole("");
                    }}
                  >
                    <Icon size={14} />
                    {r.label}
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              className={styles.customInput}
              style={{
                background: dark ? "#0a0a18" : "#f5f0ff",
                border: customRole
                  ? "1.5px solid #7C3AED99"
                  : `1px solid ${dark ? "#7C3AED22" : "#7C3AED18"}`,
                color: T.text,
              }}
              placeholder={t("pitch.customPlaceholder")}
              value={customRole}
              onChange={(e) => {
                setCustomRole(e.target.value);
                setSelectedRole(null);
              }}
            />
          </div>

          {/* Paso 2: tono */}
          <div className={styles.step}>
            <p className={styles.stepLabel} style={{ color: T.textSub }}>
              {t("pitch.step2")}
            </p>
            <div className={styles.toneRow}>
              {TONES.map((tone) => (
                <button
                  key={tone.value}
                  className={styles.toneChip}
                  style={{
                    background:
                      selectedTone === tone.value
                        ? "#7C3AED18"
                        : dark ? "#0a0a18" : "#f5f0ff",
                    border:
                      selectedTone === tone.value
                        ? "1.5px solid #7C3AED99"
                        : `1px solid ${dark ? "#7C3AED22" : "#7C3AED18"}`,
                    color: selectedTone === tone.value ? "#7C3AED" : T.textMid,
                  }}
                  onClick={() => setSelectedTone(tone.value)}
                >
                  {tone.label}
                </button>
              ))}
            </div>
          </div>

          {/* Paso 3: industria (NUEVO) */}
          <div className={styles.step}>
            <p className={styles.stepLabel} style={{ color: T.textSub }}>
              {t("pitch.step3")}
            </p>
            <input
              type="text"
              className={styles.customInput}
              style={{
                background: dark ? "#0a0a18" : "#f5f0ff",
                border: industry
                  ? "1.5px solid #A8EB1299"
                  : `1px solid ${dark ? "#7C3AED22" : "#7C3AED18"}`,
                color: T.text,
              }}
              placeholder={t("pitch.industryPlaceholder")}
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          {/* Botón generar */}
          <motion.button
            className="btn-p"
            style={{
              width: "100%",
              marginTop: 8,
              opacity: activeRole ? 1 : 0.45,
              cursor: activeRole ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onClick={generate}
            disabled={!activeRole || loading}
            whileTap={activeRole ? { scale: 0.97 } : {}}
          >
            {loading ? (
              <span className={styles.loadingDots}>
                {t("pitch.btnGenerating")}
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            ) : (
              <>
                <MdFlashOn size={15} />
                {t("pitch.btnGenerate")}
              </>
            )}
          </motion.button>

          {/* Resultado */}
          <AnimatePresence>
            {(rawResult || error) && (
              <motion.div
                className={styles.resultWrap}
                style={{
                  background: dark ? "#07070f" : "#f5f0ff",
                  border: `1px solid ${activeAccent}33`,
                  boxShadow: `0 0 32px ${activeAccent}11`,
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {error ? (
                  <p
                    style={{
                      color: "#FF3E81",
                      fontSize: 14,
                      fontFamily: "'Space Mono',monospace",
                    }}
                  >
                    {error}
                  </p>
                ) : (
                  <>
                    {/* Badge */}
                    <div
                      className={styles.resultBadge}
                      style={{
                        background: `${activeAccent}18`,
                        color: activeAccent,
                      }}
                    >
                      {t("pitch.targetLabel")}{" "}
                      {activeRole.toLowerCase()}
                    </div>

                    {/* Texto con typewriter */}
                    <p className={styles.resultText} style={{ color: T.text }}>
                      {displayed}
                      {!done && (
                        <span className={styles.cursor}>|</span>
                      )}
                    </p>

                    {/* Botones post-generación (aparecen al terminar) */}
                    {done && (
                      <motion.div
                        className={styles.actionRow}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Copiar */}
                        <button
                          className={styles.actionBtn}
                          style={{
                            color: copied ? "#A8EB12" : T.textSub,
                            border: `1px solid ${copied ? "#A8EB1244" : dark ? "#7C3AED22" : "#7C3AED18"}`,
                            background: copied ? "#A8EB1208" : "transparent",
                          }}
                          onClick={copyText}
                        >
                          {copied ? (
                            <MdCheck size={13} />
                          ) : (
                            <MdContentCopy size={13} />
                          )}
                          {copied ? t("pitch.btnCopied") : t("pitch.btnCopy")}
                        </button>

                        {/* WhatsApp */}
                        <button
                          className={styles.actionBtn}
                          style={{
                            color: "#25D366",
                            border: "1px solid #25D36644",
                            background: "#25D36608",
                          }}
                          onClick={openWhatsApp}
                        >
                          <FaWhatsapp size={13} />
                          {t("pitch.btnWhatsApp")}
                        </button>

                        {/* Regenerar */}
                        <button
                          className={styles.actionBtn}
                          style={{
                            color: activeAccent,
                            border: `1px solid ${activeAccent}44`,
                            background: `${activeAccent}08`,
                          }}
                          onClick={generate}
                        >
                          <FaRedo size={11} />
                          {t("pitch.btnRegenerate")}
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

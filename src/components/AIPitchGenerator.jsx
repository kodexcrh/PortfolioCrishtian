import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AIPitchGenerator.module.css";

// ── Datos del portfolio (personaliza estos datos) ──────────────
const MY_INFO = `
Nombre: Crishtian
Rol: Developer & Data Analyst
Skills principales: React JS, Power BI, n8n (automatización), Claude AI, JavaScript, Tailwind CSS, PostgreSQL, Figma
Experiencia: 3+ años, 20+ proyectos
Servicios: Desarrollo Frontend con React, Análisis de datos con Power BI + IA, Automatización de flujos con n8n
LinkedIn: https://www.linkedin.com/in/crishtian-rodriguez-herrera-76b5223b9/
GitHub: https://github.com/cloudcoders-C2
WhatsApp: +51960959529
`;

const ROLES = [
  { label: "Reclutador tech", emoji: "🎯", accent: "#7C3AED" },
  { label: "Founder / Startup", emoji: "🚀", accent: "#FF3E81" },
  { label: "Cliente potencial", emoji: "💼", accent: "#A8EB12" },
  { label: "Colega developer", emoji: "👨‍💻", accent: "#01D4E8" },
  { label: "Inversor", emoji: "📈", accent: "#FEC303" },
  { label: "Colaborador creativo", emoji: "🎨", accent: "#EA4B71" },
];

const TONES = [
  { label: "Profesional", value: "profesional y directo" },
  { label: "Entusiasta", value: "entusiasta y enérgico" },
  { label: "Cercano", value: "cercano y humano" },
  { label: "Con humor", value: "ingenioso con humor sutil" },
];

export default function AIPitchGenerator({ dark, T }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [customRole, setCustomRole] = useState("");
  const [selectedTone, setSelectedTone] = useState(TONES[0].value);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const activeRole = selectedRole?.label || customRole.trim();
  const activeAccent = selectedRole?.accent || "#7C3AED";

  async function generate() {
    if (!activeRole) return;
    setLoading(true);
    setResult("");
    setError("");

    const prompt = `Con mis datos reales, genera un pitch como si YO mismo estuviera hablando — natural, directo, con personalidad. Para quien visita con este rol: "${activeRole}".
Datos del profesional:
${MY_INFO}

Tono: ${selectedTone}.

Reglas:
-  MÁXIMO 3 oraciones cortas e impactantes. Sin excepciones..
- Habla en primera persona, como si el portfolio cobrara vida.
- Destaca exactamente lo más relevante para ese rol específico.
- Termina con una llamada a la acción concreta y directa.
- Solo texto plano, sin asteriscos ni markdown.
- Sé específico y memorable. Cero frases genéricas.`;

    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content:
                  "Eres el portfolio web de Crishtian, pero hablas como si fueras él mismo — con personalidad, carisma y naturalidad. No suenas como un bot ni como un CV. Hablas en primera persona, en español, con energía real. Máximo 3 oraciones cortas e impactantes. Sin markdown, sin asteriscos, sin listas.",
              },
              { role: "user", content: prompt },
            ],

            max_tokens: 150,
            temperature: 0.85,
          }),
        },
      );

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setResult(
        data.choices?.[0]?.message?.content?.trim() ||
          "No se pudo generar el pitch.",
      );
    } catch (e) {
      setError("No se pudo conectar con la IA. Verifica tu API key en .env");
    }

    setLoading(false);
  }

  function copyText() {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <section id="ai-pitch" className={styles.section}>
      <div className={`c ${styles.inner}`}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="stag">✦ Impulsado por IA</span>
          <h2 className="htitle" style={{ marginTop: 12 }}>
            Mi portfolio <span className="glow-text">te habla</span>
          </h2>
          <p
            className="hsub"
            style={{ color: T.textMid, maxWidth: 520, margin: "0 auto" }}
          >
            Dime quién eres y la IA genera un pitch personalizado de cómo puedo
            ayudarte.
          </p>
        </motion.div>

        {/* Card principal */}
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
          {/* Barra top accent */}
          <div className={styles.topBar} />

          {/* Paso 1: rol */}
          <div className={styles.step}>
            <p className={styles.stepLabel} style={{ color: T.textSub }}>
              01 — ¿Quién me visita?
            </p>
            <div className={styles.roleGrid}>
              {ROLES.map((r) => (
                <button
                  key={r.label}
                  className={styles.roleBtn}
                  style={{
                    background:
                      selectedRole?.label === r.label
                        ? `${r.accent}18`
                        : dark
                          ? "#0a0a18"
                          : "#f5f0ff",
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
                  <span style={{ fontSize: 16 }}>{r.emoji}</span>
                  {r.label}
                </button>
              ))}
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
              placeholder="O escribe tu propio rol…"
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
              02 — Tono del pitch
            </p>
            <div className={styles.toneRow}>
              {TONES.map((t) => (
                <button
                  key={t.value}
                  className={styles.toneChip}
                  style={{
                    background:
                      selectedTone === t.value
                        ? "#7C3AED18"
                        : dark
                          ? "#0a0a18"
                          : "#f5f0ff",
                    border:
                      selectedTone === t.value
                        ? "1.5px solid #7C3AED99"
                        : `1px solid ${dark ? "#7C3AED22" : "#7C3AED18"}`,
                    color: selectedTone === t.value ? "#7C3AED" : T.textMid,
                  }}
                  onClick={() => setSelectedTone(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Botón generar */}
          <motion.button
            className="btn-p"
            style={{
              width: "100%",
              marginTop: 8,
              opacity: activeRole ? 1 : 0.45,
              cursor: activeRole ? "pointer" : "not-allowed",
            }}
            onClick={generate}
            disabled={!activeRole || loading}
            whileTap={activeRole ? { scale: 0.97 } : {}}
          >
            {loading ? (
              <span className={styles.loadingDots}>
                Generando pitch<span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            ) : (
              "✦ Generar mi pitch"
            )}
          </motion.button>

          {/* Resultado */}
          <AnimatePresence>
            {(result || error) && (
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
                    <div
                      className={styles.resultBadge}
                      style={{
                        background: `${activeAccent}18`,
                        color: activeAccent,
                      }}
                    >
                      Para {activeRole.toLowerCase()}
                    </div>
                    <p className={styles.resultText} style={{ color: T.text }}>
                      {result}
                    </p>
                    <button
                      className={styles.copyBtn}
                      style={{ color: copied ? "#A8EB12" : T.textSub }}
                      onClick={copyText}
                    >
                      {copied ? "✓ Copiado" : "Copiar texto"}
                    </button>
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

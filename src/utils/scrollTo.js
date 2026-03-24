const SECTION_MAP = {
  "Inicio":      "inicio",
  "Sobre mí":    "sobre-mi",
  "Servicios":   "servicios",
  "Proyectos":   "proyectos",
  "Stack":       "stack",
  "Precios":     "precios",
  "Testimonios": "testimonios",
  "Contacto":    "contacto",
};

export function scrollToSection(id, onClose) {
  document.getElementById(SECTION_MAP[id])?.scrollIntoView({ behavior: "smooth" });
  if (onClose) onClose();
}

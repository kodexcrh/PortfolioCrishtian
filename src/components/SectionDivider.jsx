export default function SectionDivider({ dark }) {
  const accent = "#7C3AED";
  const accentAlt = "#01D4E8";

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        position: "relative",
        height: "1px",
        overflow: "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0",
      }}
    >
      {/* Línea principal con gradiente */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg,
            transparent 0%,
            ${accent}55 15%,
            ${accent}cc 40%,
            ${accentAlt}99 60%,
            ${accent}55 85%,
            transparent 100%
          )`,
        }}
      />

      {/* Punto central con glow */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: accent,
          boxShadow: `0 0 10px 3px ${accent}66, 0 0 20px 6px ${accent}22`,
        }}
      />

      {/* Ticks decorativos laterales */}
      <div style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(calc(-50% - 20px))",
        width: "10px",
        height: "1px",
        background: `${accentAlt}70`,
        zIndex: 2,
      }} />
      <div style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(calc(-50% + 10px))",
        width: "10px",
        height: "1px",
        background: `${accentAlt}70`,
        zIndex: 2,
      }} />
    </div>
  );
}

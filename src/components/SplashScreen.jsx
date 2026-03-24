import { useState, useEffect } from "react";
import styles from "./SplashScreen.module.css";

function CloudCodersLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 1000 833" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 C330 0 660 0 1000 0 C1000 274.89 1000 549.78 1000 833 C670 833 340 833 0 833 C0 558.11 0 283.22 0 0 Z" fill="transparent"/>
      <path d="M0 0 C0.79385101 -0.00974854 1.58770203 -0.01949707 2.40560913 -0.02954102 C22.45711639 -0.22452583 41.64280154 0.68262353 61.42578125 4.23828125 C90.27698107 9.31130818 115.01385562 18.57806272 138.42578125 30.23828125 C157.01697905 39.46051706 172.3445744 49.52448527 186.42578125 61.23828125 C200.62335153 72.87200727 212.94781339 83.76110998 223.42578125 96.23828125 C247.61041967 124.99199768 266.18205936 155.59390924 277.42578125 189.23828125 C283.42578125 208.23828125 283.42578125 212.23828125 319.17039603 221.45754272 C352.03615883 238.44566863 379.42578125 260.23828125 445.3304997 325.74551366 C475.13671875 390.50390625 485.37813931 422.77543974 488.42578125 439.23828125 C492.29736525 463.21955623 492.67578125 487.05078125 492.67578125 487.05078125 C492.66116929 511.27085131 491.23081835 532.95131385 485.96289062 554.08007812 C473.59415363 605.91079101 451.00560719 648.73980668 419.46875 683.01171875 C392.42578125 710.23828125 353.42578125 640.23828125 412.81689453 497.45654297 C410.76072094 456.41711341 393.42578125 406.23828125 352.42578125 348.23828125 C309.95869963 313.67826432 262.42578125 296.23828125 213.30566406 286.21655273 C146.5 136.62890625 114.42578125 113.23828125 39.42578125 86.23828125 C10.23828125 83.86328125 -13.85849933 83.93838148 -55.57421875 94.23828125 C-75.86112737 100.83319921 -108.57421875 121.23828125 -133.57421875 142.23828125 C-155.57421875 167.23828125 -182.14164744 203.92437671 -195.57421875 288.23828125 C-224.24611607 291.4187939 -238.90722656 294.74853516 -280.85669907 304.0379831 C-322.40567035 330.03259185 -348.57421875 364.23828125 -376.57421875 409.23828125 C-393.57421875 470.23828125 -394.82727051 497.61819458 -394.80956271 515.99446354 C-392.29140823 533.49630137 -387.57421875 551.23828125 -379.59819195 579.86044458 C-365.44017264 604.59951649 -348.57421875 625.23828125 -327.61426106 651.04129112 C-302.66642713 669.22185424 -274.57421875 682.23828125 -242.76171875 694.05078125 C-214.95143951 701.43735103 -163.46604156 701.72816753 -144.41894531 702.21362305 C-118.21837279 704.87804162 -93.9826355 698.00292969 -84.38909912 679.11868286 C-67.33741727 648.09168183 -44.20361328 607.99707031 -29.09375 581.75317383 C-11.57421875 545.23828125 -14.4609375 539.6875 -35.37182617 503.16088867 C-63.18798828 454.45996094 -103.62548828 383.91139221 -142.57421875 314.23828125 C-81.85421875 314.23828125 16.42573547 431.48820496 78.42578125 547.23828125 C71.73828125 559.55078125 28.48828125 635.11328125 -14.72875977 711.09838867 C-44.37942505 762.92510986 -54.57421875 780.23828125 -163.35462397 780.79257154 C-245.61531029 781.04101974 -264.57421875 775.23828125 -279.44921875 770.61328125 C-344.64217085 742.31709209 -414.57421875 677.23828125 -436.33409224 649.69421402 C-451.48327867 622.82157512 -461.57421875 594.23828125 -477.69894154 548.76079606 C-482.60903751 503.0207582 -476.83886719 458.3359375 -473.17647436 424.56419011 C-463.78251431 396.46183032 -451.57421875 371.23828125 -440.70194842 348.36464716 C-428.40810845 328.93875751 -413.57421875 311.23828125 -399.33645299 293.98689898 C-386.27711378 280.39709002 -371.57421875 269.23828125 -357.51903602 258.12916276 C-346.82950439 250.92932636 -335.57421875 244.23828125 -311.54230453 230.04796381 C-286.59468719 218.27384068 -261.57421875 214.23828125 -251.28863505 168.30443823 C-229.12934763 127.4940004 -199.64453125 95.4921875 -186.12870478 80.06572487 C-177.25818714 71.8882325 -167.57421875 64.23828125 -155.07794401 53.9148737 C-145.62592207 47.34169254 -135.57421875 41.23828125 -97.5760291 18.44238008 C-59.14444523 6.47105422 -17.57421875 1.23828125 0 0 Z" fill="#8B5CF6" transform="translate(493.57421875,26.76171875)"/>
      <path d="M0 0 C34.11045265 -0.46630955 86.26699828 -1.31666797 90.43618774 1.85092163 C94 9 99.24975586 18.32202148 114.9375 46.4375 C127.73147583 68.77932739 215.42382812 222.26806641 220.75952148 234.38500977 C217.33203125 241.859375 198.875 273.6875 172.125 320.75 C141.17480469 375.13085938 98.6875 449.4375 92 461 C85.1085968 466.60127258 68.36328125 466.48828125 28.91210938 466.24414062 C6.9706127 466.1051469 -4 466 -4 466 C0.984375 455.44921875 21.79785156 418.92260742 42.42578125 610.73828125 C57.98495244 306.71453859 90 299.5 104 275 C123.57910156 240.51513672 128.78808594 228.66259766 114.9296875 220.30078125 C88.9375 157.9375 43.60791016 78.07128906 2.84277344 6.94750977 C0 2.20975565 0 0 0 0 Z" fill="#8B5CF6" transform="translate(538,341)"/>
    </svg>
  );
}

// Planetas del sistema solar con sus colores y características
const PLANETS = [
  { name: "Mercurio", color: "#b5b5b5", size: 6,  orbit: 90,  speed: 4.1,  angle: 0 },
  { name: "Venus",    color: "#e8cda0", size: 9,  orbit: 118, speed: 3.2,  angle: 45 },
  { name: "Tierra",   color: "#4fc3f7", size: 10, orbit: 150, speed: 2.6,  angle: 100 },
  { name: "Marte",    color: "#ef5350", size: 8,  orbit: 185, speed: 2.1,  angle: 160 },
  { name: "Júpiter",  color: "#ff9800", size: 18, orbit: 230, speed: 1.4,  angle: 220 },
  { name: "Saturno",  color: "#fdd835", size: 15, orbit: 275, speed: 1.0,  angle: 280 },
  { name: "Urano",    color: "#80deea", size: 12, orbit: 318, speed: 0.7,  angle: 320 },
  { name: "Neptuno",  color: "#5c6bc0", size: 11, orbit: 355, speed: 0.5,  angle: 30 },
  { name: "Plutón",   color: "#bcaaa4", size: 5,  orbit: 390, speed: 0.35, angle: 190 },
];

function SolarSystem() {
  const [angles, setAngles] = useState(PLANETS.map(p => p.angle));

  useEffect(() => {
    let frame;
    const animate = () => {
      setAngles(prev => prev.map((a, i) => (a + PLANETS[i].speed * 0.3) % 360));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const center = 400;

  return (
    <svg className={styles.solarSvg} viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      {/* Órbitas */}
      {PLANETS.map((planet) => (
        <circle
          key={`orbit-${planet.name}`}
          cx={center} cy={center}
          r={planet.orbit}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray={planet.name === "Plutón" ? "4 6" : "none"}
        />
      ))}

      {/* Planetas */}
      {PLANETS.map((planet, i) => {
        const rad = (angles[i] * Math.PI) / 180;
        const x = center + planet.orbit * Math.cos(rad);
        const y = center + planet.orbit * Math.sin(rad);

        return (
          <g key={planet.name}>
            {/* Glow */}
            <circle cx={x} cy={y} r={planet.size + 4} fill={planet.color} opacity="0.15" />
            {/* Planeta */}
            <circle cx={x} cy={y} r={planet.size} fill={planet.color} />
            {/* Anillo de Saturno */}
            {planet.name === "Saturno" && (
              <ellipse
                cx={x} cy={y}
                rx={planet.size + 10} ry={4}
                fill="none"
                stroke={planet.color}
                strokeWidth="2"
                opacity="0.6"
                transform={`rotate(20, ${x}, ${y})`}
              />
            )}
            {/* Nombre del planeta */}
            <text
              x={x} y={y + planet.size + 14}
              textAnchor="middle"
              fill={planet.color}
              fontSize="9"
              fontFamily="Space Mono, monospace"
              opacity="0.7"
            >
              {planet.name}
            </text>
          </g>
        );
      })}

      {/* Sol — logo CloudCoders en el centro */}
      {/* Glow del sol */}
      <circle cx={center} cy={center} r={58} fill="#8B5CF6" opacity="0.08" />
      <circle cx={center} cy={center} r={48} fill="#8B5CF6" opacity="0.12" />
      <circle cx={center} cy={center} r={38} fill="#8B5CF6" opacity="0.18" />

      {/* Rayos del sol */}
      {[...Array(12)].map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r1 = 42, r2 = 55;
        return (
          <line
            key={i}
            x1={center + r1 * Math.cos(a)} y1={center + r1 * Math.sin(a)}
            x2={center + r2 * Math.cos(a)} y2={center + r2 * Math.sin(a)}
            stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4"
          />
        );
      })}
    </svg>
  );
}

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    setTimeout(() => setPhase("reveal"), 3200);
    setTimeout(() => setPhase("done"), 4000);
    setTimeout(() => onFinish(), 4200);
  }, [onFinish]);

  if (phase === "done") return null;

  return (
    <div className={`${styles.splash} ${phase === "reveal" ? styles.exit : ""}`}>

      {/* Fondo */}
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      {/* Sistema solar */}
      <div className={styles.solarWrap}>
        <SolarSystem />

        {/* Logo en el centro del sol */}
        <div className={styles.logoCenter}>
          <CloudCodersLogo className={styles.logoSvg} />
        </div>
      </div>

      {/* Nombre */}
      <div className={styles.nameWrap}>
        <span className={styles.nameCloud}>Cloud</span>
        <span className={styles.nameCoders}>Coders</span>
      </div>

      {/* Partículas */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`${styles.particle} ${styles[`p${i + 1}`]}`} />
      ))}
    </div>
  );
}

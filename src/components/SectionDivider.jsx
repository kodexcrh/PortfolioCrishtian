import { useEffect, useRef, useState } from "react";

export default function SectionDivider({ dark }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, active: false });
  const explodedRef = useRef(false);
  const [exploded, setExploded] = useState(false);

  const COUNT = 26;
  const H_PX = 56;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = window.devicePixelRatio || 1;

    function resize() {
      const w = canvas.parentElement.offsetWidth;
      canvas.width = w * DPR;
      canvas.height = H_PX * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = H_PX + "px";
      ctx.scale(DPR, DPR);
    }

    function makeParticle(explode = false) {
      const W = canvas.width / DPR;
      const colors = ["#8F00FF","#AE35FF","#C46CFF","#A8EB12","#4ffbdf","#ffffff"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 1.4 + Math.random() * 2.8;
      const alpha = 0.2 + Math.random() * 0.65;
      if (explode) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2.5;
        return { x: W/2 + (Math.random()-0.5)*10, y: H_PX/2 + (Math.random()-0.5)*6,
          vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
          color, size, alpha, life: 1, decay: 0.008 + Math.random()*0.012 };
      }
      // reposo: flotan cerca de la línea
      return { x: Math.random()*W, y: H_PX/2 + (Math.random()-0.5)*14,
        vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.18,
        color, size, alpha, life: 1, decay: 0 };
    }

    function initIdle() {
      explodedRef.current = false;
      particlesRef.current = Array.from({length: COUNT}, () => makeParticle(false));
    }

    function triggerExplode() {
      if (explodedRef.current) return;
      explodedRef.current = true;
      setExploded(true);
      particlesRef.current = Array.from({length: COUNT*2}, () => makeParticle(true));
      setTimeout(() => {
        explodedRef.current = false;
        setExploded(false);
        particlesRef.current = Array.from({length: COUNT}, () => makeParticle(false));
      }, 1800);
    }

    resize();
    initIdle();

    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize);

    canvas.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    });
    canvas.addEventListener("mouseleave", () => { mouseRef.current.active = false; });
    canvas.addEventListener("click", triggerExplode);

    function draw() {
      const W = canvas.width / DPR;
      ctx.clearRect(0, 0, W, H_PX);

      // Línea central con gradiente
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.15, "#8F00FF33");
      grad.addColorStop(0.5, explodedRef.current ? "#AE35FFaa" : "#8F00FF66");
      grad.addColorStop(0.85, "#8F00FF33");
      grad.addColorStop(1, "transparent");
      ctx.save();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H_PX/2);
      ctx.lineTo(W, H_PX/2);
      ctx.stroke();
      ctx.restore();

      // Rombo central
      const cx = W/2, cy = H_PX/2;
      const ds = explodedRef.current ? 5 : 4;
      ctx.save();
      ctx.fillStyle = explodedRef.current ? "#AE35FF" : "#8F00FF";
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI/4);
      ctx.fillRect(-ds, -ds, ds*2, ds*2);
      ctx.restore();

      // Partículas
      const mouse = mouseRef.current;
      const isExploding = explodedRef.current;
      const alive = [];

      for (const p of particlesRef.current) {
        if (!isExploding) {
          // repulsión del mouse en modo idle
          if (mouse.active) {
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 55 && dist > 0) {
              const force = (55 - dist) / 55 * 1.2;
              p.vx += (dx/dist) * force * 0.12;
              p.vy += (dy/dist) * force * 0.12;
            }
          }
          // damping + wrap
          p.vx *= 0.97; p.vy *= 0.97;
          p.x += p.vx; p.y += p.vy;
          const W2 = W;
          if (p.x < -5) p.x = W2+5;
          if (p.x > W2+5) p.x = -5;
          if (p.y < H_PX/2-18) p.vy += 0.04;
          if (p.y > H_PX/2+18) p.vy -= 0.04;
          alive.push(p);
        } else {
          // modo explosión
          p.vx *= 0.97; p.vy *= 0.97;
          p.x += p.vx; p.y += p.vy;
          p.life -= p.decay;
          if (p.life > 0) alive.push(p);
        }

        ctx.save();
        ctx.globalAlpha = isExploding ? p.alpha * p.life : p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
      }

      particlesRef.current = alive;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div style={{ width: "100%", position: "relative", cursor: "pointer" }}
      title="Click para explotar">
      <canvas ref={canvasRef} />
    </div>
  );
}

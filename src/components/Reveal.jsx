import { useInView } from "../hooks/useInView";

export default function Reveal({ children, delay = 0, distance = 36, direction = "up", style = {} }) {
  const [ref, visible] = useInView(0.08, true);
  const transforms = {
    up:    `translateY(${distance}px)`,
    down:  `translateY(-${distance}px)`,
    left:  `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translate(0,0)" : transforms[direction], transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`, willChange: visible ? "auto" : "transform, opacity", ...style }}>
      {children}
    </div>
  );
}

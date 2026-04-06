import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, distance = 30, direction = "up", style = {} }) {
  const variants = {
    hidden: { 
      opacity: 0, 
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0 
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: "easeOut" }}
      variants={variants}
      style={{ ...style }}
    >
      {children}
    </motion.div>
  );
}

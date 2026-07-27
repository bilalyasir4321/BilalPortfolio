import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[150] h-[3px] w-full origin-left bg-gradient-to-r from-electric-400 via-accent-400 to-electric-400"
      style={{ scaleX }}
    />
  );
}

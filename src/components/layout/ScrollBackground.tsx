import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ScrollBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const hueShift = useTransform(scrollYProgress, [0, 1], [210, 280]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const blob3X = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.4, 0.7, 0.7, 0.4]);

  useEffect(() => {
    const updateHue = (val: number) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--hue', `${val}deg`);
      }
    };
    const unsub = hueShift.on('change', updateHue);
    return () => unsub();
  }, [hueShift]);

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
      style={{ opacity }}
    >
      <motion.div
        className="absolute left-[-10%] top-[-10%] h-[40vw] w-[40vw] rounded-full blur-[120px]"
        style={{
          y: blob1Y,
          background:
            'radial-gradient(circle, hsl(var(--hue, 210) 80% 55% / 0.18), transparent 70%)',
        }}
      />
      <motion.div
        className="absolute right-[-10%] top-[20%] h-[35vw] w-[35vw] rounded-full blur-[120px]"
        style={{
          y: blob2Y,
          background:
            'radial-gradient(circle, hsl(calc(var(--hue, 210) + 60) 80% 55% / 0.15), transparent 70%)',
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] h-[30vw] w-[30vw] rounded-full blur-[120px]"
        style={{
          x: blob3X,
          background:
            'radial-gradient(circle, hsl(calc(var(--hue, 210) + 30) 80% 55% / 0.12), transparent 70%)',
        }}
      />
    </motion.div>
  );
}

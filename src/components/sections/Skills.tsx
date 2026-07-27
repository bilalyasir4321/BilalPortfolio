import { Suspense, lazy, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Skill } from '@/types';

const SkillsNetwork = lazy(() => import('@/components/three/SkillsNetwork'));

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'from-electric-500 to-electric-400',
  Backend: 'from-accent-500 to-accent-400',
  Database: 'from-success to-emerald-400',
  AI: 'from-fuchsia-500 to-accent-400',
  Tooling: 'from-amber-500 to-orange-400',
  DevOps: 'from-cyan-500 to-electric-400',
  Design: 'from-rose-500 to-pink-400',
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative overflow-hidden rounded-xl glass p-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/90">{skill.name}</span>
        <span className="text-xs text-white/40">{skill.level}%</span>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${CATEGORY_COLORS[skill.category] ?? 'from-electric-500 to-accent-400'}`}
        />
      </div>
      <p className="mt-2 text-xs text-white/45 line-clamp-1">{skill.description}</p>
    </motion.div>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set(skills.map((s) => s.category));
    return ['All', ...Array.from(set)];
  }, [skills]);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  return (
    <section id="skills" className="section-pad relative">
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-20 pointer-events-none" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Skills"
          title="An interactive neural network of capabilities"
          subtitle="Each glowing node represents a technology in my toolkit. Click any node to explore proficiency, or browse the full skill matrix below."
        />

        <Reveal className="mt-12" delay={0.1}>
          <Suspense fallback={<div className="h-[420px] animate-pulse rounded-2xl bg-white/5" />}>
            <SkillsNetwork skills={skills} />
          </Suspense>
        </Reveal>

        <Reveal className="mt-14" delay={0.15}>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs uppercase tracking-wider text-white/40">Categories</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-electric-500 to-accent-500 text-white shadow-glow'
                    : 'glass text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

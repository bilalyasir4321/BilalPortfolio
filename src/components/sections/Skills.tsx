import { Suspense, lazy } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Skill } from '@/types';

const SkillsNetwork = lazy(() => import('@/components/three/SkillsNetwork'));

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="section-pad relative">
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-20 pointer-events-none" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Skills"
          title="An interactive neural network of capabilities"
          subtitle="Each glowing node represents a technology in my toolkit. Click any node to explore proficiency and context."
        />
        <Reveal className="mt-12" delay={0.1}>
          <Suspense fallback={<div className="h-[420px] animate-pulse rounded-2xl bg-white/5" />}>
            <SkillsNetwork skills={skills} />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Lightbulb, Search, ClipboardList, Cpu, Code2, TestTube2, Rocket, Gauge,
  Sparkles, Brain, Zap, Wand2,
} from 'lucide-react';
import Reveal, { RevealText } from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { AI_EXPERTISE } from '@/constants';
import type { AIWorkflowStep } from '@/types';

const ICONS = [Lightbulb, Search, ClipboardList, Cpu, Code2, TestTube2, Rocket, Gauge];
const EXPERTISE_ICONS = [Brain, Wand2, Zap, Sparkles];

export default function AISection({ workflow }: { workflow: AIWorkflowStep[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="ai" ref={sectionRef} className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade opacity-50 pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-electric-400/20 to-transparent" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="AI Assisted Development"
          title={
            <>
              <RevealText text="AI enhances — it doesn't replace —" />
              <br />
              <RevealText text="the workflow." delay={0.12} />
            </>
          }
          subtitle="A structured pipeline where AI accelerates every stage, while engineering judgment stays in the driver's seat."
        />

        <Reveal className="mt-16" delay={0.1}>
          <div className="relative">
            <div className="absolute left-4 top-0 hidden h-full w-0.5 overflow-hidden rounded-full bg-white/5 md:block lg:left-1/2 lg:-translate-x-1/2">
              <motion.div
                style={{ scaleY: lineScale }}
                className="h-full w-full origin-top bg-gradient-to-b from-electric-400 via-accent-400 to-electric-400"
              />
              <motion.div
                style={{ top: glowY }}
                className="absolute left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-electric-400/30 blur-2xl"
              />
            </div>

            <div className="space-y-4">
              {workflow.map((step, i) => {
                const Icon = ICONS[i % ICONS.length];
                const left = i % 2 === 0;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: left ? -40 : 40, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex ${left ? 'md:justify-start' : 'md:justify-end'}`}
                  >
                    <div
                      className={`glass-strong group relative w-full overflow-hidden p-5 md:w-[44%] ${
                        left ? 'md:ml-0' : 'md:mr-0'
                      }`}
                    >
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-electric-500/10 blur-3xl transition duration-500 group-hover:bg-electric-500/25" />
                      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent-500/10 blur-3xl transition duration-500 group-hover:bg-accent-500/25" />

                      <div className="relative flex items-center gap-3">
                        <motion.span
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-accent-500 text-white shadow-glow"
                        >
                          <Icon className="h-5 w-5" />
                        </motion.span>
                        <div>
                          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-electric-400">
                            Step {i + 1}
                          </span>
                          <h3 className="font-display text-base font-semibold text-white">
                            {step.step}
                          </h3>
                        </div>
                        <span className="ml-auto font-mono text-2xl font-bold text-white/5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="relative mt-3 text-sm text-white/55">{step.description}</p>
                    </div>

                    <div className="absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-electric-400 bg-ink-950 md:block lg:left-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={0.15}>
          <div className="relative overflow-hidden glass-strong p-6 md:p-10">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent-500/15 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-electric-500/15 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-electric-400" />
                <h3 className="font-display text-xl font-semibold text-white">Areas of Expertise</h3>
              </div>
              <p className="mt-2 text-sm text-white/50">
                Specialized skills that bridge traditional engineering with modern AI workflows.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {AI_EXPERTISE.map((area, i) => {
                  const Icon = EXPERTISE_ICONS[i % EXPERTISE_ICONS.length];
                  return (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="group relative overflow-hidden rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10 transition hover:ring-electric-400/40 hover:glow-ring"
                    >
                      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-electric-500/10 blur-2xl transition group-hover:bg-electric-500/30" />
                      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/20 to-accent-500/20 text-electric-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h4 className="relative mt-4 font-display text-sm font-semibold text-white">
                        {area}
                      </h4>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

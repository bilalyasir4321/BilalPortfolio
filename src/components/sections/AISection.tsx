import { motion } from 'framer-motion';
import { Lightbulb, Search, ClipboardList, Cpu, Code2, TestTube2, Rocket, Gauge } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { AI_EXPERTISE } from '@/constants';
import type { AIWorkflowStep } from '@/types';

const ICONS = [Lightbulb, Search, ClipboardList, Cpu, Code2, TestTube2, Rocket, Gauge];

export default function AISection({ workflow }: { workflow: AIWorkflowStep[] }) {
  return (
    <section id="ai" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade opacity-50 pointer-events-none" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="AI Assisted Development"
          title="AI enhances — it doesn't replace — the workflow"
          subtitle="A structured pipeline where AI accelerates every stage, while engineering judgment stays in the driver's seat."
        />

        <Reveal className="mt-14" delay={0.1}>
          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-electric-400/40 via-accent-400/30 to-transparent lg:block" />
            <div className="grid gap-4 lg:grid-cols-2">
              {workflow.map((step, i) => {
                const Icon = ICONS[i % ICONS.length];
                const left = i % 2 === 0;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: left ? -30 : 30, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`relative ${left ? 'lg:pr-10' : 'lg:col-start-2 lg:pl-10'}`}
                  >
                    <div className="glass-strong group relative overflow-hidden p-5">
                      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-electric-500/10 blur-2xl transition group-hover:bg-electric-500/20" />
                      <div className="relative flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-accent-500 text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-electric-400">
                            Step {i + 1}
                          </span>
                          <h3 className="font-display text-base font-semibold text-white">
                            {step.step}
                          </h3>
                        </div>
                      </div>
                      <p className="relative mt-3 text-sm text-white/55">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12" delay={0.2}>
          <div className="glass-strong p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-white">Areas of Expertise</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {AI_EXPERTISE.map((area, i) => (
                <motion.span
                  key={area}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-full bg-gradient-to-r from-electric-500/15 to-accent-500/15 px-4 py-2 text-sm text-white/85 ring-1 ring-white/10"
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

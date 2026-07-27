import { motion } from 'framer-motion';
import { Briefcase, Sparkles } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import type { ExperienceData } from '@/types';

export default function Experience({ data }: { data: ExperienceData | null }) {
  return (
    <section id="experience" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="Turning business requirements into scalable products"
          subtitle="Although still a student, the work below represents real, production-ready systems."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="glass-strong relative h-full overflow-hidden p-6 md:p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl" />
              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-accent-500">
                  <Briefcase className="h-5 w-5 text-white" />
                </span>
                <h3 className="font-display text-xl font-semibold text-white">
                  {data?.experience.title ?? 'Full Stack Developer'}
                </h3>
              </div>
              <p className="relative mt-5 text-base leading-relaxed text-white/65">
                {data?.experience.description ??
                  'Developed multiple production-ready web applications including eCommerce platforms, ERP systems, Hospital Management Systems, Restaurant Systems, and AI-assisted software solutions.'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass-strong h-full p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-electric-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">AI Workflow</h3>
              </div>
              <p className="mt-4 text-sm text-white/55">
                A structured pipeline from idea to optimization, accelerated by AI-assisted
                development.
              </p>
              <div className="mt-5 space-y-1.5">
                {(data?.aiWorkflow ?? []).slice(0, 4).map((step, i) => (
                  <div key={step.step} className="flex items-center gap-2 text-xs text-white/60">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-electric-500/15 text-[10px] font-semibold text-electric-300">
                      {i + 1}
                    </span>
                    {step.step}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10">
          <Reveal>
            <h3 className="mb-6 text-center font-display text-2xl font-semibold text-white">
              Achievements
            </h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(data?.achievements ?? []).map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass group relative overflow-hidden p-5 transition hover:glow-ring"
              >
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-electric-500/10 blur-2xl transition group-hover:bg-electric-500/30" />
                <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-accent-500/10 blur-2xl transition group-hover:bg-accent-500/25" />
                <h4 className="relative font-display text-sm font-semibold text-white">{a.title}</h4>
                <p className="relative mt-2 text-xs text-white/50">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

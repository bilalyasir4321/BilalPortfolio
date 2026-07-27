import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import type { TimelineItem } from '@/types';

export default function Education({ timeline }: { timeline: TimelineItem[] }) {
  return (
    <section id="education" className="section-pad relative">
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-20 pointer-events-none" />
      <div className="container-x relative">
        <SectionHeading eyebrow="Education" title="Academic journey" />

        <div className="relative mt-12 pl-6">
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-electric-400/60 via-accent-400/40 to-transparent" />
          {timeline.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <div className="relative pb-10 last:pb-0">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute -left-[27px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-electric-500 shadow-glow"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </motion.span>

                <div className="glass-strong p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-500/15 text-electric-400">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-white/55">{item.org}</p>
                    </div>
                    <span className="ml-auto rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/60">{item.description}</p>
                  <p className="mt-2 text-xs text-white/40">{item.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

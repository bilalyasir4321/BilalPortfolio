import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Mail, Copy, MessageCircle } from 'lucide-react';
import Reveal, { RevealText } from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import type { Profile, Stat } from '@/types';
import { useToast } from '@/components/ui/Toast';

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const value = useCountUp(stat.value, 2000, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass group relative overflow-hidden p-5"
    >
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-electric-500/10 blur-2xl transition group-hover:bg-electric-500/20" />
      <div className="font-display text-3xl font-bold text-white md:text-4xl">
        {value}
        <span className="text-electric-400">{stat.suffix}</span>
      </div>
      <div className="mt-1 text-sm text-white/55">{stat.label}</div>
    </motion.div>
  );
}

export default function About({
  profile,
  stats,
}: {
  profile: Profile | null;
  stats: Stat[];
}) {
  const { notify } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText(profile?.email ?? 'hello@bilalyasir.dev');
    notify('Email copied to clipboard', 'success');
  };

  return (
    <section id="about" className="section-pad relative">
      <div className="absolute inset-0 bg-radial-fade opacity-40 pointer-events-none" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              <RevealText text="Engineering software that" delay={0} />
              <br />
              <RevealText text="solves real business problems." delay={0.15} />
            </>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="glass-strong relative h-full overflow-hidden p-6 md:p-8">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-electric-500/10 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl" />

              <p className="relative text-base leading-relaxed text-white/70 md:text-lg">
                {profile?.bio ??
                  'Bilal Yasir is a Full Stack Developer and Software Engineering student at The University of Chenab, Gujrat, Pakistan.'}
              </p>

              <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
                <InfoRow icon={MapPin} label="Location" value={profile?.location ?? 'Gujrat, Pakistan'} />
                <InfoRow
                  icon={GraduationCap}
                  label="University"
                  value={profile?.university ?? 'The University of Chenab'}
                />
              </div>

              <div className="relative mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-white/80 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-electric-400" />
                  {profile?.email ?? 'hello@bilalyasir.dev'}
                  <Copy className="h-3.5 w-3.5 text-white/40" />
                </button>
                <a
                  href={profile?.whatsapp ?? 'https://wa.me/923467555698'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-white/80 hover:text-white"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4 text-success" />
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-electric-500/10 text-electric-400">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
        <div className="text-sm text-white/85">{value}</div>
      </div>
    </div>
  );
}

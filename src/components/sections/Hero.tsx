import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Send } from 'lucide-react';
import TypingText from '@/components/ui/TypingText';
import { MagneticButton } from '@/components/ui/Magnetic';
import { downloadCV } from '@/services/portfolioApi';
import { useToast } from '@/components/ui/Toast';
import { scrollToSection } from '@/utils';
import type { Profile } from '@/types';

const HeroScene = lazy(() => import('@/components/three/HeroScene'));

export default function Hero({ profile }: { profile: Profile | null }) {
  const { notify } = useToast();
  const roles = profile?.roles ?? [
    'Full Stack Developer',
    'AI Assisted Developer',
    'React Developer',
  ];

  const handleCV = async () => {
    try {
      await downloadCV();
      notify('CV download started', 'success');
    } catch {
      notify('Could not start download', 'error');
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-30 pointer-events-none mask-fade-b" />

      <div className="container-x relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-white/70"
        >
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
          Available for new projects
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="gradient-text">{profile?.name ?? 'Bilal Yasir'}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-5 font-mono text-lg text-white/70 sm:text-xl md:text-2xl"
        >
          <TypingText words={roles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-6 max-w-2xl text-base text-white/55 md:text-lg"
        >
          {profile?.subtitles.join(' · ') ??
            'Full Stack Developer · AI Assisted Software Engineer · Building Modern Web Experiences'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton onClick={() => scrollToSection('projects')} variant="primary">
            View Projects <ArrowDown className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton onClick={handleCV} variant="outline">
            Download CV <Download className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton onClick={() => scrollToSection('contact')} variant="ghost">
            Contact Me <Send className="h-4 w-4" />
          </MagneticButton>
        </motion.div>

        <motion.button
          onClick={() => scrollToSection('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}

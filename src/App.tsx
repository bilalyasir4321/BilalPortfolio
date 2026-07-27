import { useEffect, useState } from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import LoadingScreen from '@/components/layout/LoadingScreen';
import CustomCursor from '@/components/layout/CustomCursor';
import ScrollProgress from '@/components/layout/ScrollProgress';
import ScrollBackground from '@/components/layout/ScrollBackground';
import BackToTop from '@/components/layout/BackToTop';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/layout/CommandPalette';
import DeveloperModeOverlay from '@/components/layout/DeveloperModeOverlay';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import AISection from '@/components/sections/AISection';
import Contact from '@/components/sections/Contact';
import { useLenis } from '@/hooks/useLenis';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import {
  fetchProfile,
  fetchSkills,
  fetchProjects,
  fetchExperience,
  trackVisit,
} from '@/services/portfolioApi';
import type {
  Profile,
  Stat,
  Skill,
  Project,
  ExperienceData,
} from '@/types';

function Portfolio() {
  useLenis();
  const { unlocked, setUnlocked } = useKonamiCode();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [experience, setExperience] = useState<ExperienceData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [profileData, skillsData, projectsData, expData] = await Promise.all([
          fetchProfile(),
          fetchSkills(),
          fetchProjects(),
          fetchExperience(),
        ]);
        setProfile(profileData.profile);
        setStats(profileData.stats);
        setSkills(skillsData.skills);
        setProjects(projectsData.projects);
        setCategories(projectsData.categories);
        setExperience(expData);
      } catch (err) {
        console.error('Failed to load portfolio data', err);
      }
    })();
    trackVisit().catch(() => {});
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollBackground />
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <DeveloperModeOverlay open={unlocked} onClose={() => setUnlocked(false)} />

      <main>
        <Hero profile={profile} />
        <About profile={profile} stats={stats} />
        <Skills skills={skills} />
        <Projects projects={projects} categories={categories} />
        <Experience data={experience} />
        <AISection workflow={experience?.aiWorkflow ?? []} />
        <Education timeline={experience?.timeline ?? []} />
        <Contact profile={profile} />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Portfolio />
    </ToastProvider>
  );
}

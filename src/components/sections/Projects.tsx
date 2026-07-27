import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ExternalLink, Github, Eye, Filter } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import Modal from '@/components/ui/Modal';
import { MagneticButton } from '@/components/ui/Magnetic';
import { useToast } from '@/components/ui/Toast';
import { trackProjectView } from '@/services/portfolioApi';
import type { Project } from '@/types';

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <TiltCard className="h-full" max={10}>
      <div className="gradient-border group relative h-full overflow-hidden rounded-2xl glass">
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-electric-500/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            {project.category}
          </span>
          {project.featured && (
            <span className="absolute right-3 top-3 rounded-full bg-accent-500/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              Featured
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/55">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/60"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/40">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <Eye className="h-3.5 w-3.5" /> Details
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Visit
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white/50 transition hover:text-white"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Projects({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);
  const { notify } = useToast();

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = category === 'All' || p.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [projects, category, search]);

  const openProject = (p: Project) => {
    setSelected(p);
    trackProjectView(p.id).catch(() => {});
  };

  return (
    <section id="projects" className="section-pad relative">
      <div className="absolute inset-0 bg-radial-fade opacity-30 pointer-events-none" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Projects"
          title="Interactive project showcase"
          subtitle="A curated selection of production-ready applications spanning eCommerce, ERP, healthcare, and restaurant systems."
        />

        <Reveal className="mt-10" delay={0.1}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 inline-flex items-center gap-1.5 text-xs text-white/40">
                <Filter className="h-3.5 w-3.5" /> Filter
              </span>
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    category === cat
                      ? 'bg-gradient-to-r from-electric-500 to-accent-500 text-white'
                      : 'glass text-white/60 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-full glass py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-electric-400/40"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProjectCard project={project} onOpen={() => openProject(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-white/40">No projects match your search.</p>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} maxWidth="max-w-3xl">
        {selected && (
          <div>
            <div className="relative h-56 overflow-hidden rounded-xl">
              <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
            </div>
            <div className="mt-5">
              <span className="text-xs uppercase tracking-wider text-electric-400">
                {selected.category}
              </span>
              <h3 className="mt-1 font-display text-2xl font-semibold text-white">{selected.title}</h3>
              <p className="mt-3 text-sm text-white/65">{selected.longDescription}</p>

              <div className="mt-5">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                  Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.features.map((f) => (
                    <span key={f} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-white/70">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span key={t} className="rounded-md bg-electric-500/10 px-2.5 py-1 text-xs text-electric-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <MagneticButton
                  onClick={() => {
                    window.open(selected.url, '_blank');
                    notify(`Opening ${selected.title}`, 'info');
                  }}
                  variant="primary"
                >
                  Visit Project <ExternalLink className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton
                  onClick={() => window.open(selected.github, '_blank')}
                  variant="outline"
                >
                  <Github className="h-4 w-4" /> GitHub
                </MagneticButton>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

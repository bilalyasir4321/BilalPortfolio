import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/constants';
import { scrollToSection } from '@/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      const current = sections.findIndex((s) => {
        if (!s) return false;
        const rect = s.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current !== -1) setActive(NAV_ITEMS[current].id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-4 left-1/2 z-[120] -translate-x-1/2 transition-all duration-300 ${
          scrolled ? 'w-[92%] max-w-3xl' : 'w-[94%] max-w-5xl'
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
            scrolled ? 'glass-strong shadow-card' : 'glass'
          }`}
        >
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 font-display text-lg font-semibold text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-accent-500 text-sm font-bold">
              B
            </span>
            <span className="hidden sm:inline">Bilal</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="relative px-3.5 py-1.5 text-sm transition-colors"
              >
                <span
                  className={active === item.id ? 'text-white' : 'text-white/55 hover:text-white/90'}
                >
                  {item.label}
                </span>
                {active === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-electric-400 to-accent-400"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => go('contact')}
            className="hidden md:inline-flex magnetic-btn bg-white/5 px-4 py-2 text-xs font-medium text-white/90 hover:bg-white/10"
          >
            Let's Talk
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-lg p-2 text-white"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] md:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute left-4 right-4 top-24 glass-strong p-4"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="block w-full rounded-lg px-4 py-3 text-left text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

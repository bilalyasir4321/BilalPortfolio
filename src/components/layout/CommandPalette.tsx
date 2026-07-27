import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, CornerDownLeft } from 'lucide-react';
import { NAV_ITEMS } from '@/constants';
import { scrollToSection } from '@/utils';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items = NAV_ITEMS.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  const go = (id: string) => {
    setOpen(false);
    setQuery('');
    scrollToSection(id);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[140] flex items-start justify-center pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="glass-strong relative z-10 w-[90%] max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
              <Search className="h-5 w-5 text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section..."
                className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
              />
              <kbd className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-xs text-white/40">
                Esc
              </kbd>
            </div>
            <div className="max-h-72 overflow-y-auto no-scrollbar p-2">
              {items.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-white/40">No results</p>
              )}
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  <span>{item.label}</span>
                  <CornerDownLeft className="h-4 w-4 text-white/30" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

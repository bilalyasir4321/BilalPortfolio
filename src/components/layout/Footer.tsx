import { motion } from 'framer-motion';
import { Mail, Heart, MessageCircle } from 'lucide-react';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/constants';
import { scrollToSection } from '@/utils';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink-950">
      <div className="absolute inset-0 bg-radial-fade opacity-50" />
      <div className="container-x relative px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-xl font-semibold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-accent-500 text-sm font-bold">
                B
              </span>
              Bilal Yasir
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              Full Stack Developer & AI Assisted Software Engineer building modern web experiences.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
              Navigate
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm text-white/55 transition hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { icon: MessageCircle, href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp' },
                { icon: Mail, href: `mailto:${SOCIAL_LINKS.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="glass flex h-11 w-11 items-center justify-center rounded-xl text-white/70 hover:text-electric-400"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center text-sm text-white/40 md:flex-row md:text-left">
          <p>Designed & Developed by Bilal Yasir</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-danger" /> using React, TypeScript & Three.js
          </p>
          <p>&copy; {year} Bilal Yasir. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

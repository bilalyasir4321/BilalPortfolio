import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, GraduationCap, Mail, Loader2, Copy, MessageCircle } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { MagneticButton } from '@/components/ui/Magnetic';
import { useToast } from '@/components/ui/Toast';
import { submitContact } from '@/services/portfolioApi';
import type { Profile } from '@/types';

export default function Contact({ profile }: { profile: Profile | null }) {
  const { notify } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      const res = await submitContact(form);
      notify(res.message || 'Message sent successfully', 'success');
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      const errs = err?.errors || [err?.message || 'Something went wrong'];
      setErrors(errs);
      notify(errs[0], 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile?.email ?? 'hello@bilalyasir.dev');
    notify('Email copied', 'success');
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="absolute inset-0 bg-radial-fade opacity-40 pointer-events-none" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something exceptional"
          subtitle="Have a project in mind or just want to say hello? Send a message and I'll get back to you."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" delay={0.1}>
            <form onSubmit={handleSubmit} className="glass-strong p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="you@example.com"
                />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-electric-400/40"
                />
              </div>

              {errors.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {errors.map((e) => (
                    <li key={e} className="text-xs text-danger">
                      {e}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6">
                <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4" />
                    </>
                  )}
                </MagneticButton>
              </div>
            </form>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.2}>
            <div className="glass-strong h-full p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-white">Details</h3>
              <div className="mt-5 space-y-4">
                <ContactRow icon={GraduationCap} label="University" value={profile?.university ?? 'The University of Chenab'} />
                <ContactRow icon={MapPin} label="Location" value={profile?.location ?? 'Gujrat, Pakistan'} />
                <div>
                  <div className="mb-1.5 text-xs uppercase tracking-wider text-white/40">WhatsApp</div>
                  <a
                    href={profile?.whatsapp ?? 'https://wa.me/923467555698'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-left text-sm text-white/85 transition hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4 text-success" />
                    <span className="flex-1 truncate">{profile?.whatsappNumber ?? '+92 346 7555698'}</span>
                  </a>
                </div>
                <div>
                  <div className="mb-1.5 text-xs uppercase tracking-wider text-white/40">Email</div>
                  <button
                    onClick={copyEmail}
                    className="flex w-full items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-left text-sm text-white/85 transition hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4 text-electric-400" />
                    <span className="flex-1 truncate">{profile?.email ?? 'hello@bilalyasir.dev'}</span>
                    <Copy className="h-3.5 w-3.5 text-white/40" />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 text-xs uppercase tracking-wider text-white/40">Connect</div>
                <div className="flex gap-3">
                  {[
                    { icon: MessageCircle, href: profile?.whatsapp ?? 'https://wa.me/923467555698', label: 'WhatsApp' },
                    { icon: Mail, href: `mailto:${profile?.email ?? ''}`, label: 'Email' },
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-electric-400/40"
      />
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
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

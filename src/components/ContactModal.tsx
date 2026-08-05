import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { X, ArrowRight, LoaderCircle } from 'lucide-react';
import DrawnUnderline from '@/components/DrawnUnderline';
import { Button } from '@/components/ui/button';
import { useModal } from '@/lib/modal-context';

const fields = [
  { name: 'name',         label: 'Full name',            type: 'text',  required: true,  placeholder: 'Your name' },
  { name: 'email',        label: 'Email',                 type: 'email', required: true,  placeholder: 'you@company.com' },
  { name: 'company',      label: 'Company or startup',    type: 'text',  required: false, placeholder: 'Company name' },
  { name: 'project_type', label: 'Product or focus area', type: 'text',  required: false, placeholder: 'e.g. MPP Studio, deployment, AI workflow' },
] as const;

export default function ContactModal() {
  const { contactOpen, closeContact } = useModal();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({
    name: '',
    email: '',
    company: '',
    project_type: '',
    message: '',
  });

  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success("Message sent. We'll reply within 24 hours.");
      setForm({ name: '', email: '', company: '', project_type: '', message: '' });
      closeContact();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {contactOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full"
          >
            {/* Top bar */}
            <div className="glass-strong sticky top-0 z-10 flex h-14 items-center justify-between border-b border-white/[0.06] px-6 sm:px-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Get in touch
              </span>
              <button
                onClick={closeContact}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-10">
              <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">

                {/* Left — identity */}
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="font-serif tracking-[-0.03em] text-white"
                    style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.05 }}
                  >
                    Tell us what you're building.
                  </motion.h1>
                  <DrawnUnderline className="mt-3" width={56} delay={0.4} color="#00E699" />

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.16 }}
                    className="mt-5 text-base leading-7 text-white/50"
                  >
                    We're building in public. If something here almost fits your problem, tell us. We read every message.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.22 }}
                    className="mt-10 space-y-0 border-t border-white/[0.06]"
                  >
                    {[
                      "You have a workflow or product surface that almost works, but needs the last 20%.",
                      'You want a builder who thinks in products and ships in code.',
                      "You're tired of AI demos and want something you can actually use.",
                    ].map((signal) => (
                      <div
                        key={signal}
                        className="border-b border-white/[0.06] py-4"
                      >
                        <p className="text-sm leading-6 text-white/45">{signal}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right — form */}
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {fields.map((field) => (
                      <div key={field.name} className="glass-card rounded-xl p-5">
                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                            {field.label}
                            {field.required && <span className="ml-1 text-white/20">*</span>}
                          </span>
                          <input
                            type={field.type}
                            value={form[field.name] || ''}
                            onChange={(e) => update(field.name, e.target.value)}
                            required={field.required}
                            placeholder={field.placeholder}
                            className="w-full border-b border-white/10 bg-transparent pb-2 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-white/40"
                          />
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Message — full width */}
                  <div className="glass-card mt-3 rounded-xl p-5">
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                        Message <span className="text-white/20">*</span>
                      </span>
                      <textarea
                        value={form.message || ''}
                        onChange={(e) => update('message', e.target.value)}
                        required
                        rows={5}
                        placeholder="Describe the problem, the current workflow, and what success looks like."
                        className="w-full border-b border-white/10 bg-transparent pb-2 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-white/40 resize-none"
                      />
                    </label>
                  </div>

                  <div className="mt-6">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="group rounded-full bg-white px-8 py-5 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send project brief
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

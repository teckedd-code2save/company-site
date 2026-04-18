import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Mail, User, MessageSquare, Briefcase, Building2, CheckCircle2, LoaderCircle } from 'lucide-react';

const fitSignals = [
  "You have a workflow or product surface that almost works, but needs the last 20%.",
  'You want a builder who thinks in products and ships in code.',
  "You're tired of AI demos and want something you can actually use.",
] as const;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
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
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f4f2_0%,#ece9e3_100%)] py-24 dark:bg-[linear-gradient(180deg,#0a1628_0%,#020617_100%)] lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[6%] top-16 h-[20rem] w-[20rem] rounded-full bg-white/80 blur-[90px] dark:bg-slate-700/20" />
        <div className="absolute left-[4%] bottom-10 h-[18rem] w-[18rem] rounded-full bg-stone-100/65 blur-[80px] dark:bg-sky-900/10" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
            Get in touch
          </p>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-black dark:text-white lg:text-5xl">
            Get in touch.
          </h2>
          <p className="mx-auto max-w-md text-base text-slate-500 dark:text-slate-400">
            We're early-stage and hands-on. If you have a real problem, we want to hear it.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-950/38 dark:text-white"
          >
            <h3 className="text-3xl font-semibold leading-tight">
              Early-stage and hands-on. If you have a real problem, we want to hear it.
            </h3>
            <div className="mt-8 space-y-4">
              {fitSignals.map((signal) => (
                <div key={signal} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/40">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{signal}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="rounded-2xl border border-white/55 bg-white/92 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.12)] backdrop-blur-3xl dark:border-slate-700/50 dark:bg-slate-900/80 sm:p-8"
          >
            <div className="mb-5 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                  <User className="mr-2 h-4 w-4" />
                  Full name
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <div className="mb-5 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                  <Building2 className="mr-2 h-4 w-4" />
                  Company or startup
                </span>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                  placeholder="Your company name"
                />
              </label>

              <label className="block">
                <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Product or focus area
                </span>
                <input
                  type="text"
                  value={form.project_type}
                  onChange={(e) => update('project_type', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                  placeholder="e.g. MPP Studio, Shipd, internal AI workflow, data product"
                />
              </label>
            </div>

            <div className="mb-5">
              <label className="block">
                <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </span>
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  required
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                  placeholder="Describe the workflow, current bottleneck, and what success should look like."
                />
              </label>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-black px-7 py-5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send project brief'
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

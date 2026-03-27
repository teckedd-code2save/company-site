import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, User, MessageSquare, Briefcase, Building2, Clock3, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

const fitSignals = [
  'You want to explore MPP Studio, B2DP, or Datafy for a real business workflow.',
  'You need a product, workflow, or infrastructure direction customers can evaluate clearly.',
];

export default function ContactForm() {
  return (
    <section id="contact" className="bg-gray-50 py-24 dark:bg-slate-950 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-slate-800 dark:text-gray-200">
            Start a conversation
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-white lg:text-5xl">
            Tell Serendepify AI what your team is trying to solve
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Share the workflow, the customer need, or the system you want to improve.
            That makes it easier to recommend the right product, demo, or implementation path.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] dark:border dark:border-slate-800"
          >
            <h3 className="text-3xl font-semibold leading-tight">
              Best for teams ready to evaluate a product seriously.
            </h3>
            <div className="mt-8 space-y-4">
              {fitSignals.map((signal) => (
                <div key={signal} className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-300" />
                  <p className="text-sm leading-7 text-slate-300">{signal}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            action={`https://formsubmit.co/${siteConfig.contactEmail}`}
            method="POST"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="rounded-2xl bg-white p-6 shadow-[0_16px_48px_rgba(15,23,42,0.12)] dark:bg-slate-900 dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10"
        >
          <input type="hidden" name="_subject" value="New project request from serendepifywebsite" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="mb-5 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                <User className="mr-2 h-4 w-4" />
                Full name
              </span>
              <input
                type="text"
                name="name"
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
                name="email"
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
                name="company"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                placeholder="Your company name"
              />
            </label>

            <label className="block">
              <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                <Briefcase className="mr-2 h-4 w-4" />
                Project type
              </span>
              <input
                type="text"
                name="project_type"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                placeholder="e.g. internal AI workflow, customer-facing product, data platform"
              />
            </label>
          </div>

          <div className="mb-5 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                <Briefcase className="mr-2 h-4 w-4" />
                Success metric
              </span>
              <input
                type="text"
                name="success_metric"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                placeholder="e.g. reduce support workload, launch MVP, improve data access speed"
              />
            </label>

            <label className="block">
              <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                <Clock3 className="mr-2 h-4 w-4" />
                Timeline
              </span>
              <input
                type="text"
                name="timeline"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                placeholder="e.g. need pilot in 4-6 weeks"
              />
            </label>
          </div>

          <div className="mb-7">
            <label className="block">
              <span className="mb-2 inline-flex text-sm font-medium text-gray-700 dark:text-gray-200">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </span>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-gray-100"
                placeholder="Describe the customer problem, the workflow you want to improve, your timeline, and what success should look like."
              />
            </label>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              type="submit"
              className="rounded-lg bg-black px-7 py-5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Send project brief
            </Button>
          </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

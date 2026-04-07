import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, User, MessageSquare, Briefcase, Building2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function ContactForm() {
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
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-black dark:text-white lg:text-5xl">
            Contact
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Describe your use case and we will follow up.</p>
        </motion.div>

        <motion.form
          action={`https://formsubmit.co/${siteConfig.contactEmail}`}
          method="POST"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="rounded-2xl border border-white/55 bg-white/92 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.12)] backdrop-blur-3xl dark:border-slate-700/50 dark:bg-slate-900/80 sm:p-8"
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
                Product or focus area
              </span>
              <input
                type="text"
                name="project_type"
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
                name="message"
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
              className="rounded-lg bg-black px-7 py-5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Send project brief
            </Button>
          </div>
          </motion.form>
      </div>
    </section>
  );
}

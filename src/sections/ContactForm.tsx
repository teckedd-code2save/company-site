import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, User, MessageSquare, Briefcase } from 'lucide-react';

export default function ContactForm() {
  return (
    <section id="contact" className="py-24 lg:py-28 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4 dark:bg-slate-800 dark:text-gray-200">
            Start a Conversation
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-white tracking-tight mb-4">
            Send a project request
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Share what you are building and get a response directly via email.
          </p>
        </motion.div>

        <motion.form
          action="https://formsubmit.co/edwardktwumasi1000@gmail.com"
          method="POST"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_16px_48px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          <input type="hidden" name="_subject" value="New project request from serendepifywebsite" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          {/* Honeypot */}
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 inline-flex items-center gap-2">
                <User className="w-4 h-4" />
                Full name
              </span>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 inline-flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="you@company.com"
              />
            </label>
          </div>

          <div className="mb-5">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 inline-flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Project type
              </span>
              <input
                type="text"
                name="project_type"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="e.g. AI platform, backend architecture, product build"
              />
            </label>
          </div>

          <div className="mb-7">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 inline-flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </span>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="Tell me about your project goals, timeline, and requirements."
              />
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Button
              type="submit"
              className="rounded-lg bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 px-7 py-5 text-sm font-medium"
            >
              Send Request
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Submissions are sent directly to `edwardktwumasi1000@gmail.com`.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

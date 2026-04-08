import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/lib/modal-context';
import { siteConfig } from '@/lib/site-config';

const fields = [
  { name: 'name',         label: 'Full name',            type: 'text',  required: true,  placeholder: 'Your name' },
  { name: 'email',        label: 'Email',                 type: 'email', required: true,  placeholder: 'you@company.com' },
  { name: 'company',      label: 'Company or startup',    type: 'text',  required: false, placeholder: 'Company name' },
  { name: 'project_type', label: 'Product or focus area', type: 'text',  required: false, placeholder: 'e.g. MPP Studio, deployment, AI workflow' },
];

export default function ContactModal() {
  const { contactOpen, closeContact } = useModal();

  return (
    <AnimatePresence>
      {contactOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-slate-950"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full"
          >
            {/* Top bar */}
            <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-100 bg-white/95 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 sm:px-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Contact sales
              </span>
              <button
                onClick={closeContact}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
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
                    className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl"
                  >
                    Let's figure out if we're the right fit.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.16 }}
                    className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400"
                  >
                    Open to new work, partnerships, and grant collaborations. Real problem, clear outcome — we want to hear it.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.22 }}
                    className="mt-10 space-y-0 border-t border-slate-100 dark:border-slate-800"
                  >
                    {[
                      'You want to evaluate one of our products for a real workflow — not a proof of concept that lives in a slide.',
                      'You need product direction that moves into implementation, not just concepting.',
                      "You're a startup, operator, or grant-funded team building AI into a product with real users at the end.",
                    ].map((signal) => (
                      <div
                        key={signal}
                        className="border-b border-slate-100 py-4 dark:border-slate-800"
                      >
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{signal}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right — form */}
                <motion.form
                  action={`https://formsubmit.co/${siteConfig.contactEmail}`}
                  method="POST"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                >
                  <input type="hidden" name="_subject" value="New project request — Serendepify AI" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 gap-px bg-slate-200/60 dark:bg-slate-800/60 sm:grid-cols-2">
                    {fields.map((field) => (
                      <div key={field.name} className="bg-white p-5 dark:bg-slate-950">
                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                            {field.label}
                            {field.required && <span className="ml-1 text-slate-300">*</span>}
                          </span>
                          <input
                            type={field.type}
                            name={field.name}
                            required={field.required}
                            placeholder={field.placeholder}
                            className="w-full border-b border-slate-200 bg-transparent pb-2 text-sm text-slate-950 placeholder-slate-300 outline-none transition-colors focus:border-slate-950 dark:border-slate-800 dark:text-white dark:placeholder-slate-600 dark:focus:border-white"
                          />
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Message — full width */}
                  <div className="mt-px bg-white p-5 dark:bg-slate-950 border-x border-slate-200/60 dark:border-slate-800/60">
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                        Message <span className="text-slate-300">*</span>
                      </span>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Describe the problem, the current workflow, and what success looks like."
                        className="w-full border-b border-slate-200 bg-transparent pb-2 text-sm text-slate-950 placeholder-slate-300 outline-none transition-colors focus:border-slate-950 dark:border-slate-800 dark:text-white dark:placeholder-slate-600 dark:focus:border-white resize-none"
                      />
                    </label>
                  </div>

                  <div className="mt-6">
                    <Button
                      type="submit"
                      className="group rounded-none bg-slate-950 px-8 py-5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
                    >
                      Send project brief
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

import { motion } from 'framer-motion';
import DrawnUnderline from '@/components/DrawnUnderline';

const featured = [
  {
    name: 'Stripe',
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M13.976 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 1L24 22H0L12 1z" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M14.74 9.54c.36-.07.73-.1 1.1-.1 2.47 0 4.52 1.8 4.9 4.16.04.27.26.47.53.47h.02c.3 0 .55-.24.53-.54-.47-3.15-3.2-5.56-6.48-5.56-.46 0-.9.05-1.33.14-.28.06-.46.33-.4.6.06.29.33.47.6.42.17-.03.35-.05.53-.05zm-4.28 5.9c-.03-.15-.05-.3-.05-.46 0-1.86 1.5-3.36 3.36-3.36.35 0 .68.05 1 .15.26.08.54-.06.62-.32.08-.26-.06-.53-.32-.62-.44-.13-.9-.2-1.38-.2-2.47 0-4.48 1.9-4.66 4.32-.02.27.2.5.47.5h.02c.26 0 .48-.2.5-.46.03-.17.08-.33.14-.5.1-.27-.04-.56-.3-.65-.03 0-.06 0-.1.02-.06.3-.1.6-.1.92 0 .16.02.3.04.46.05.28.3.47.58.42.27-.04.46-.3.42-.58-.02-.1-.03-.2-.03-.3 0-.1.01-.2.03-.3-.16.08-.3.18-.42.3zm-2.26 2.2h8.92c.3 0 .54-.24.54-.54 0-.3-.24-.54-.54-.54h-8.92c-.3 0-.54.24-.54.54 0 .3.24.54.54.54zm-3.2 0h1.62c.3 0 .54-.24.54-.54 0-.3-.24-.54-.54-.54H4.99c-.3 0-.54.24-.54.54 0 .3.24.54.54.54z" />
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

const scrolling = [
  { name: 'Supabase', mark: '◐' },
  { name: 'Anthropic', mark: 'A' },
  { name: 'Vite', mark: '⚡' },
  { name: 'TypeScript', mark: 'TS' },
  { name: 'Tailwind', mark: 'TW' },
  { name: 'React', mark: 'R' },
  { name: 'Node.js', mark: 'N' },
  { name: 'PostgreSQL', mark: 'PG' },
];

export default function TrustLogos() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#000000',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#FFFFFF' }}>
          Tools & platforms we build with
        </p>
        <DrawnUnderline className="mx-auto mb-4" width={48} delay={0.2} />
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl" style={{ letterSpacing: '-0.02em' }}>
          Built with the same stack you already use.
        </h2>
      </motion.div>

      {/* Featured logos — centered, bold */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto mb-16 flex flex-wrap items-center justify-center gap-8 sm:gap-14"
      >
        {featured.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center gap-3 text-white/80 transition-colors hover:text-[#FFFFFF]"
          >
            <span className="text-white/90">{logo.mark}</span>
            <span className="text-base font-semibold tracking-wide">{logo.name}</span>
          </div>
        ))}
      </motion.div>

      {/* Vertical infinite scroll of remaining tools */}
      <div className="relative mx-auto h-40 max-w-xl overflow-hidden">
        {/* Top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#000000] to-transparent" />
        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#000000] to-transparent" />

        <div className="animate-scroll-up flex flex-col items-center gap-5">
          {[...scrolling, ...scrolling, ...scrolling].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-3 text-white/35"
            >
              <span className="text-sm font-semibold text-white/60">{logo.mark}</span>
              <span className="text-sm font-medium tracking-wide">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.33%); }
        }
        .animate-scroll-up {
          animation: scroll-up 20s linear infinite;
        }
      `}</style>
    </section>
  );
}

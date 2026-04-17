import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ProductLightboxProps {
  open: boolean;
  onClose: () => void;
  media: {
    type: 'video' | 'image';
    src: string;
    srcFallback?: string;
    alt?: string;
  };
}

export default function ProductLightbox({ open, onClose, media }: ProductLightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Media container */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong relative mx-4 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {media.type === 'video' ? (
              <video
                controls
                autoPlay
                muted
                playsInline
                className="block h-full w-full"
                style={{ maxHeight: '80vh' }}
              >
                <source src={media.src} type="video/webm" />
                {media.srcFallback && <source src={media.srcFallback} type="video/mp4" />}
              </video>
            ) : (
              <img
                src={media.src}
                alt={media.alt || 'Product screenshot'}
                className="block h-full w-full object-contain"
                style={{ maxHeight: '80vh' }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

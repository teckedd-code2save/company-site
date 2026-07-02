import type { SlotMedia } from './ui';

export const GC_URL = 'https://groundcontrol.serendepify.com';
export const FORGE_URL = 'https://www.npmjs.com/package/@teckedd-code2save/forge';
export const CONVOY_URL = 'https://convoy-home.vercel.app/';

export const PRODUCT_MEDIA = {
  forge: {
    poster: '/images/products/forge-surface.png',
    webm: '/images/products/forge-surface.webm',
    mp4: '/images/products/forge-surface.mp4',
    gif: '/images/products/forge-surface.gif',
  },
  convoy: {
    poster: '/images/products/convoy-surface.png',
    webm: '/images/products/convoy-surface.webm',
    mp4: '/images/products/convoy-surface.mp4',
    gif: '/images/products/convoy-surface.gif',
  },
  groundControl: {
    poster: '/images/products/groundcontrol-copilot.png',
    webm: '/images/products/groundcontrol-copilot.webm',
    mp4: '/images/products/groundcontrol-copilot.mp4',
    gif: '/images/products/groundcontrol-copilot.gif',
  },
} satisfies Record<string, SlotMedia>;

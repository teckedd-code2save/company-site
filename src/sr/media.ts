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
  },
  groundControl: {
    poster: '/images/products/groundcontrol-copilot.png',
    webm: '/images/products/groundcontrol-copilot.webm',
    mp4: '/images/products/groundcontrol-copilot.mp4',
    gif: '/images/products/groundcontrol-copilot.gif',
  },
  groundControlDashboard: {
    poster: '/images/products/groundcontrol-dashboard.png',
  },
  groundControlServices: {
    poster: '/images/products/groundcontrol-services.png',
  },
  groundControlTerminal: {
    poster: '/images/products/groundcontrol-terminal.png',
  },
} satisfies Record<string, SlotMedia>;

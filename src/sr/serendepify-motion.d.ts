// The motion engine is a hand-authored IIFE that attaches itself to
// `window.SerendepifyMotion`. It has no exports; importing it for side effects.
export {};

declare global {
  interface Window {
    gsap?: unknown;
    ScrollTrigger?: unknown;
    MotionPathPlugin?: unknown;
    DrawSVGPlugin?: unknown;
    SplitText?: unknown;
    ScrambleTextPlugin?: unknown;
    Observer?: unknown;
    Flip?: unknown;
    __srInited?: boolean;
    SerendepifyMotion?: {
      init: () => void;
      SR: { initialized: boolean; reduceMotion: boolean };
      refreshAll: () => void;
      refreshText: () => void;
      refreshCards: () => void;
      refreshReveal: () => void;
    };
  }
}

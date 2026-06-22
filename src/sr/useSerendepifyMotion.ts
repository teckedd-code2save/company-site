import { useEffect } from 'react';

/**
 * Boots the Serendepify GSAP motion engine for the current page.
 *
 * The engine (`serendepify-motion.js`) is the production motion library shipped
 * in the design handoff. It reads `data-sr-*` attributes off the DOM and wires
 * GSAP, but it expects GSAP + its plugins to be present as globals on `window`
 * (that's how it was authored to load via <script> tags). So we import them from
 * the npm package, register them, expose them on `window`, then import the engine
 * and call `init()` once fonts are ready.
 *
 * Navigation between pages is a full document load (plain <a> links), so each
 * page mounts the engine fresh — no cross-page teardown needed. A `window`-level
 * guard keeps React StrictMode's double-mount (dev only) from initializing twice.
 */
export function useSerendepifyMotion() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [
        gsapMod,
        { ScrollTrigger },
        { MotionPathPlugin },
        { DrawSVGPlugin },
        { SplitText },
        { ScrambleTextPlugin },
        { Observer },
        { Flip },
      ] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/MotionPathPlugin'),
        import('gsap/DrawSVGPlugin'),
        import('gsap/SplitText'),
        import('gsap/ScrambleTextPlugin'),
        import('gsap/Observer'),
        import('gsap/Flip'),
      ]);
      if (cancelled) return;

      const gsap = gsapMod.gsap ?? gsapMod.default;
      const w = window as typeof window & { gsap?: unknown };

      w.gsap = gsap;
      w.ScrollTrigger = ScrollTrigger;
      w.MotionPathPlugin = MotionPathPlugin;
      w.DrawSVGPlugin = DrawSVGPlugin;
      w.SplitText = SplitText;
      w.ScrambleTextPlugin = ScrambleTextPlugin;
      w.Observer = Observer;
      w.Flip = Flip;

      gsap.registerPlugin(
        ScrollTrigger,
        MotionPathPlugin,
        DrawSVGPlugin,
        SplitText,
        ScrambleTextPlugin,
        Observer,
        Flip,
      );

      // Side-effect import: attaches window.SerendepifyMotion (auto-init disabled).
      await import('./serendepify-motion.js');
      if (cancelled) return;

      const SM = w.SerendepifyMotion;
      if (!SM) return;

      const run = () => {
        if (w.__srInited) return;
        w.__srInited = true;
        try {
          gsap.ticker.lagSmoothing(0);
          gsap.ticker.wake();
        } catch {
          /* noop */
        }
        SM.SR.initialized = false;
        SM.init();

        // ScrollTrigger detects its scroller at init time, when the page is at
        // scrollTop 0 and it can't yet tell <html> from <body> apart — it can
        // latch onto the wrong one, which zeroes out every scroll-driven
        // animation (notably the flip-scroll scrub). Re-running refresh() once
        // layout/fonts/images have settled forces correct scroller detection.
        const refresh = () => {
          try {
            ScrollTrigger.refresh();
          } catch {
            /* noop */
          }
        };
        requestAnimationFrame(() => requestAnimationFrame(refresh));
        setTimeout(refresh, 400);
        window.addEventListener('load', refresh, { once: true });

        // Safety net: if the rAF ticker never advanced, force hidden content
        // visible so nothing is ever stuck (mirrors the reference behavior).
        setTimeout(() => {
          if (!gsap.ticker || gsap.ticker.frame < 2) {
            try {
              gsap.globalTimeline.progress(1);
            } catch {
              /* noop */
            }
            document
              .querySelectorAll<HTMLElement>(
                '[data-sr-hero-item], [data-sr-card], [data-sr-reveal], [data-sr-text] .sr-w, [data-sr-text]',
              )
              .forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'none';
              });
          }
        }, 1500);
      };

      if (document.fonts?.ready) {
        document.fonts.ready.then(run);
        // Fallback in case fonts.ready never resolves.
        setTimeout(run, 1200);
      } else {
        run();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);
}

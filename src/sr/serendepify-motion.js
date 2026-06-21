/**
 * ═════════════════════════════════════════════════════════════════
 * Serendepify Motion Engine v4
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Pluggable GSAP animation system for all Serendepify websites.
 *
 * USAGE:
 *   1. Include GSAP + plugins in your HTML
 *   2. Include this file: <script src="serendepify-motion.js"></script>
 *   3. Add data attributes to any element:
 *      data-sr-text         → SplitText reveal
 *      data-sr-scramble     → Scramble text effect
 *      data-sr-typewriter   → Typewriter effect
 *      data-sr-image        → Image reveal animation
 *      data-sr-parallax     → Parallax scroll
 *      data-sr-card         → Card hover + entrance
 *      data-sr-tilt         → 3D tilt on hover
 *      data-sr-grid         → Elastic grid stagger
 *      data-sr-marquee      → Infinite scroll marquee
 *      data-sr-draw         → SVG draw-on
 *      data-sr-path         → MotionPath animation
 *      data-sr-count        → Count-up numbers
 *      data-sr-magnetic     → Magnetic button
 *      data-sr-hero         → Hero entrance sequence
 *      data-sr-reveal       → Generic scroll reveal
 *      data-sr-scrub        → Scroll-scrubbed animation
 *      data-sr-snap         → Full-screen section snap (Observer)
 *      data-sr-flip-scroll  → Scroll-scrubbed FLIP between containers
 *
 *   See README.md for full configuration options.
 * ═════════════════════════════════════════════════════════════════
 */

(function (global) {
  'use strict';

  // ── Plugin Registration ───────────────────────────────────────
  const REQUIRED_PLUGINS = [
    'ScrollTrigger',
    'MotionPathPlugin',
    'DrawSVGPlugin',
    'SplitText',
    'ScrambleTextPlugin',
    'Observer',
    'Flip',
  ];

  const SR = {
    gsap: null,
    plugins: {},
    initialized: false,
    reduceMotion: false,
    defaults: {
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.05,
      start: 'top 90%',
    },
  };

  // ── Utilities ───────────────────────────────────────────────────
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
  const lerp = (a, b, t) => a + (b - a) * t;

  function registerPlugins() {
    const g = window.gsap;
    if (!g) return false;
    SR.gsap = g;
    REQUIRED_PLUGINS.forEach((name) => {
      const p = window[name];
      if (p) {
        try { g.registerPlugin(p); SR.plugins[name] = p; } catch (e) {}
      }
    });
    return true;
  }

  function checkReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Parse data-sr-* options from attributes
  function parseOpts(el, defaults = {}) {
    const opts = { ...defaults };
    const prefix = 'data-sr-';
    Array.from(el.attributes).forEach((attr) => {
      if (!attr.name.startsWith(prefix)) return;
      const key = attr.name.slice(prefix.length).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      let val = attr.value;
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (!isNaN(val) && val !== '') val = Number(val);
      else if (val.startsWith('[') || val.startsWith('{')) {
        try { val = JSON.parse(val); } catch (e) {}
      }
      opts[key] = val;
    });
    return opts;
  }

  // ── 1. TEXT ANIMATIONS ────────────────────────────────────────

  /**
   * data-sr-text
   * SplitText word/character reveal with scroll trigger
   */
  function initTextReveal() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;
    const Split = SR.plugins.SplitText;

    $$('[data-sr-text]').forEach((el) => {
      const opts = parseOpts(el, { type: 'words,chars', duration: 0.7, stagger: 0.018, ease: 'power3.out', start: 'top 90%' });
      let chars;

      if (Split) {
        const sp = new Split(el, { type: opts.type, wordsClass: 'sr-w' });
        chars = sp.chars;
        el.querySelectorAll('.sr-w').forEach((w) => {
          w.style.display = 'inline-block';
          w.style.overflow = 'hidden';
          w.style.paddingBottom = '0.08em';
        });
      } else {
        chars = manualSplitChars(el);
      }

      if (SR.reduceMotion) return;
      g.set(chars, { yPercent: 120, opacity: 0 });

      const play = () => {
        g.to(chars, { yPercent: 0, opacity: 1, duration: opts.duration, stagger: opts.stagger, ease: opts.ease });
      };

      if (ST) {
        ST.create({ trigger: el, start: opts.start, once: true, onEnter: play });
      } else {
        play();
      }
    });
  }

  function manualSplitChars(el) {
    const text = el.textContent;
    el.textContent = '';
    const out = [];
    text.split('').forEach((ch) => {
      if (ch === ' ') { el.appendChild(document.createTextNode(' ')); return; }
      const outer = document.createElement('span');
      outer.style.display = 'inline-block';
      outer.style.overflow = 'hidden';
      outer.style.verticalAlign = 'bottom';
      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = ch;
      outer.appendChild(inner);
      el.appendChild(outer);
      out.push(inner);
    });
    return out;
  }

  /**
   * data-sr-scramble
   * Scramble text decode effect
   */
  function initScramble() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;
    const SCR = SR.plugins.ScrambleTextPlugin;

    $$('[data-sr-scramble]').forEach((el) => {
      const opts = parseOpts(el, { words: '', duration: 1.1, speed: 0.5, revealDelay: 0.15 });
      const words = (el.getAttribute('data-sr-words') || opts.words).split('|').filter(Boolean);
      if (!words.length) return;

      let i = 0;
      const cycle = () => {
        const next = words[i % words.length];
        i++;
        if (SCR) {
          g.to(el, {
            duration: opts.duration,
            scrambleText: { text: next, chars: 'upperAndLowerCase', speed: opts.speed, revealDelay: opts.revealDelay },
            ease: 'none',
            onComplete: () => g.delayedCall(1.2, cycle),
          });
        } else {
          manualScramble(el, next, () => g.delayedCall(1.2, cycle));
        }
      };

      const startIt = () => cycle();
      if (ST && !SR.reduceMotion) {
        ST.create({ trigger: el, start: 'top 85%', once: true, onEnter: startIt });
      } else {
        startIt();
      }
    });
  }

  function manualScramble(el, target, done) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let frame = 0;
    const steps = 26;
    const iv = setInterval(() => {
      frame++;
      let s = '';
      for (let k = 0; k < target.length; k++) {
        if (k < (frame / steps) * target.length) s += target[k];
        else s += chars[Math.floor(Math.random() * chars.length)];
      }
      el.textContent = s;
      if (frame >= steps) { clearInterval(iv); el.textContent = target; if (done) done(); }
    }, 45);
  }

  /**
   * data-sr-typewriter
   * Typewriter effect with cursor blink
   */
  function initTypewriter() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;

    $$('[data-sr-typewriter]').forEach((el) => {
      const opts = parseOpts(el, { speed: 0.05, cursor: true, start: 'top 90%' });
      const text = el.getAttribute('data-sr-text') || el.textContent;
      el.textContent = '';

      if (opts.cursor) {
        const cursor = document.createElement('span');
        cursor.className = 'sr-typewriter-cursor';
        cursor.textContent = '|';
        cursor.style.display = 'inline-block';
        cursor.style.color = 'var(--sr-coral-bright, #FF6A40)';
        cursor.style.animation = 'sr-blink 1.1s step-end infinite';
        el.appendChild(cursor);
      }

      const chars = text.split('');
      const spans = chars.map((ch) => {
        const s = document.createElement('span');
        s.textContent = ch;
        s.style.opacity = '0';
        el.insertBefore(s, el.lastElementChild);
        return s;
      });

      if (SR.reduceMotion) {
        spans.forEach((s) => (s.style.opacity = '1'));
        return;
      }

      const play = () => {
        g.to(spans, { opacity: 1, duration: 0.01, stagger: opts.speed });
      };

      if (ST) {
        ST.create({ trigger: el, start: opts.start, once: true, onEnter: play });
      } else {
        play();
      }
    });
  }

  const style = document.createElement('style');
  style.textContent = '@keyframes sr-blink { 50% { opacity: 0; } }';
  document.head.appendChild(style);

  // ── 2. IMAGE ANIMATIONS ───────────────────────────────────────

  function initImageReveal() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;

    $$('[data-sr-image]').forEach((el) => {
      const opts = parseOpts(el, { reveal: 'clip', duration: 1.2, ease: 'power3.inOut', start: 'top 85%' });
      const img = el.querySelector('img') || el;
      if (SR.reduceMotion) return;

      const configs = {
        clip: { clipPath: 'inset(0 100% 0 0)', to: { clipPath: 'inset(0 0% 0 0)' } },
        mask: { clipPath: 'circle(0% at 50% 50%)', to: { clipPath: 'circle(100% at 50% 50%)' } },
        fade: { opacity: 0, to: { opacity: 1 } },
        scale: { scale: 1.3, opacity: 0, to: { scale: 1, opacity: 1 } },
      };

      const cfg = configs[opts.reveal] || configs.clip;
      g.set(img, cfg);

      const play = () => g.to(img, { ...cfg.to, duration: opts.duration, ease: opts.ease });

      if (ST) {
        ST.create({ trigger: el, start: opts.start, once: true, onEnter: play });
      } else {
        play();
      }
    });
  }

  function initParallax() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;
    if (!ST || SR.reduceMotion) return;

    $$('[data-sr-parallax]').forEach((wrap) => {
      $$('[data-sr-depth]', wrap).forEach((layer) => {
        const d = parseFloat(layer.getAttribute('data-sr-depth')) || 1;
        g.fromTo(layer,
          { yPercent: -d * 14 },
          {
            yPercent: d * 14,
            ease: 'none',
            scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
    });
  }

  function initKenBurns() {
    const g = SR.gsap;
    if (SR.reduceMotion) return;

    $$('[data-sr-kenburns]').forEach((el) => {
      const opts = parseOpts(el, { zoom: 1.15, duration: 20, pan: 'right' });
      const img = el.querySelector('img') || el;
      const p = { left: { x: -5 }, right: { x: 5 }, top: { y: -5 }, bottom: { y: 5 } }[opts.pan] || { x: 0 };

      g.fromTo(img,
        { scale: 1, xPercent: 0, yPercent: 0 },
        { scale: opts.zoom, xPercent: p.x || 0, yPercent: p.y || 0, duration: opts.duration, ease: 'none', repeat: -1, yoyo: true }
      );
    });
  }

  // ── 3. CARD ANIMATIONS ────────────────────────────────────────

  function initCardReveal() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;

    $$('[data-sr-card]').forEach((el) => {
      if (SR.reduceMotion) return;
      g.set(el, { y: 42, autoAlpha: 0 });

      const play = () => g.to(el, { y: 0, autoAlpha: 1, duration: 0.75, ease: 'power3.out' });

      if (ST) {
        ST.create({ trigger: el, start: 'top 92%', once: true, onEnter: play });
      } else {
        play();
      }

      // Hover lift effect
      if (el.getAttribute('data-sr-card-hover') !== 'false') {
        el.addEventListener('pointerenter', () => {
          g.to(el, { y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)', duration: 0.3, ease: 'power2.out' });
        });
        el.addEventListener('pointerleave', () => {
          g.to(el, { y: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.04)', duration: 0.3, ease: 'power2.out' });
        });
      }
    });
  }

  function initTilt() {
    const g = SR.gsap;
    if (SR.reduceMotion) return;

    $$('[data-sr-tilt]').forEach((el) => {
      const opts = parseOpts(el, { maxTilt: 15, perspective: 1000, glare: true, glareOpacity: 0.35, scale: 1.02 });

      // Ensure parent has perspective for true 3D — do NOT set on the element itself
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';
      const parent = el.parentElement;
      if (parent && getComputedStyle(parent).perspective === 'none') {
        parent.style.perspective = opts.perspective + 'px';
      }

      // Glare overlay
      let glare = el.querySelector('.sr-tilt-glare');
      if (!glare && opts.glare) {
        glare = document.createElement('div');
        glare.className = 'sr-tilt-glare';
        glare.style.cssText = 'position:absolute;inset:0;overflow:hidden;border-radius:inherit;pointer-events:none;z-index:10;';
        const glareInner = document.createElement('div');
        glareInner.style.cssText = 'position:absolute;top:0;left:0;width:200%;height:200%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,' + (opts.glareOpacity * 0.6) + ') 45%,rgba(255,255,255,' + opts.glareOpacity + ') 50%,rgba(255,255,255,' + (opts.glareOpacity * 0.6) + ') 55%,transparent 60%);transform:translateX(-100%);';
        glare.appendChild(glareInner);
        el.appendChild(glare);
      }

      const rx = g.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power3' });
      const ry = g.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power3' });
      const s = g.quickTo(el, 'scale', { duration: 0.4, ease: 'power3' });
      let glareX = null;
      if (glare) {
        glareX = g.quickTo(glare.firstElementChild, 'x', { duration: 0.4, ease: 'power2' });
      }

      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ry(x * opts.maxTilt);
        rx(-y * opts.maxTilt);
        s(opts.scale);
        if (glareX) glareX((e.clientX - r.left) - r.width);
      });

      el.addEventListener('pointerleave', () => {
        rx(0); ry(0); s(1);
        if (glareX) glareX(-el.offsetWidth);
      });
    });
  }

  function initCardFlip() {
    const g = SR.gsap;
    if (SR.reduceMotion) return;

    $$('[data-sr-card-flip]').forEach((el) => {
      const opts = parseOpts(el, { trigger: 'click', duration: 0.6 });
      let flipped = false;

      const toggle = () => {
        flipped = !flipped;
        g.to(el, { rotateY: flipped ? 180 : 0, duration: opts.duration, ease: 'power2.inOut' });
      };

      if (opts.trigger === 'hover') {
        el.addEventListener('pointerenter', () => { if (!flipped) toggle(); });
        el.addEventListener('pointerleave', () => { if (flipped) toggle(); });
      } else {
        el.addEventListener('click', toggle);
      }
    });
  }

  // ── 4. LAYOUT ANIMATIONS ──────────────────────────────────────

  function initHero() {
    const g = SR.gsap;
    if (SR.reduceMotion) return;

    $$('[data-sr-hero]').forEach((el) => {
      const opts = parseOpts(el, { stagger: 0.12, duration: 0.9 });
      const children = el.querySelectorAll('[data-sr-hero-item]');
      if (!children.length) return;

      g.set(children, { y: 50, opacity: 0, scale: 0.95 });
      g.to(children, {
        y: 0, opacity: 1, scale: 1, duration: opts.duration,
        stagger: opts.stagger, ease: 'power3.out', delay: 0.2,
      });
    });
  }

  function initMarquee() {
    const g = SR.gsap;
    if (SR.reduceMotion) return;

    $$('[data-sr-marquee]').forEach((el) => {
      const opts = parseOpts(el, { speed: 22, direction: 'left', pauseOnHover: true });
      const track = el.querySelector('[data-sr-marquee-track]') || el.firstElementChild;
      if (!track) return;

      const half = track.scrollWidth / 2;
      const dir = opts.direction === 'right' ? half : -half;

      const tween = g.to(track, {
        x: dir, duration: opts.speed, ease: 'none', repeat: -1,
        modifiers: { x: (x) => (parseFloat(x) % half) + 'px' },
      });

      if (opts.pauseOnHover) {
        el.addEventListener('pointerenter', () => tween.pause());
        el.addEventListener('pointerleave', () => tween.play());
      }
    });
  }

  function initGridStagger() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;
    if (SR.reduceMotion) return;

    $$('[data-sr-grid]').forEach((el) => {
      const opts = parseOpts(el, { cols: 6, from: 'center', amount: 0.7 });
      const tiles = el.querySelectorAll('[data-sr-grid-item]');
      if (!tiles.length) return;

      const cols = parseInt(el.getAttribute('data-sr-cols')) || opts.cols;
      const rows = Math.ceil(tiles.length / cols);

      const play = () => {
        g.set(tiles, { scale: 0, opacity: 0 });
        g.to(tiles, {
          scale: 1, opacity: 1, duration: 0.9,
          ease: 'elastic.out(1,0.55)',
          stagger: { grid: [rows, cols], from: opts.from, amount: opts.amount },
        });
      };

      if (ST) {
        ST.create({ trigger: el, start: 'top 82%', onEnter: play, onEnterBack: play });
      } else {
        play();
      }

      el.addEventListener('pointerenter', play);
    });
  }

  function initCountUp() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;

    $$('[data-sr-count]').forEach((el) => {
      const opts = parseOpts(el, { duration: 1.4, suffix: '', prefix: '', decimals: 0 });
      const end = parseFloat(el.getAttribute('data-sr-count')) || 0;
      const obj = { v: 0 };

      const run = () => {
        g.to(obj, {
          v: end, duration: opts.duration, ease: 'power2.out',
          onUpdate() {
            const val = opts.decimals > 0 ? obj.v.toFixed(opts.decimals) : Math.round(obj.v).toLocaleString();
            el.textContent = opts.prefix + val + opts.suffix;
          },
        });
      };

      if (ST) {
        ST.create({ trigger: el, start: 'top 94%', once: true, onEnter: run });
      } else {
        run();
      }
    });
  }

  function initMagnetic() {
    const g = SR.gsap;
    if (SR.reduceMotion) return;

    $$('[data-sr-magnetic]').forEach((el) => {
      const opts = parseOpts(el, { strength: 0.4 });
      const inner = el.querySelector('[data-sr-magnetic-inner]') || el;

      const xTo = g.quickTo(inner, 'x', { duration: 0.4, ease: 'power3' });
      const yTo = g.quickTo(inner, 'y', { duration: 0.4, ease: 'power3' });

      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * opts.strength);
        yTo((e.clientY - (r.top + r.height / 2)) * opts.strength);
      });

      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  function initReveal() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;
    if (SR.reduceMotion) return;

    $$('[data-sr-reveal]').forEach((el) => {
      const opts = parseOpts(el, { y: 26, x: 0, opacity: 0, duration: 0.7, ease: 'power3.out', start: 'top 92%' });
      g.set(el, { y: opts.y, x: opts.x, opacity: opts.opacity || 0 });

      const play = () => g.to(el, { y: 0, x: 0, opacity: 1, duration: opts.duration, ease: opts.ease });

      if (ST) {
        ST.create({ trigger: el, start: opts.start, once: true, onEnter: play });
      } else {
        play();
      }
    });
  }

  function initScrub() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;
    if (!ST || SR.reduceMotion) return;

    $$('[data-sr-scrub]').forEach((el) => {
      const opts = parseOpts(el, { property: 'scale', from: 0.8, to: 1.2, start: 'top 80%', end: 'bottom 20%' });
      const fromVal = {}; fromVal[opts.property] = opts.from;
      const toVal = {}; toVal[opts.property] = opts.to;

      g.fromTo(el, fromVal, {
        ...toVal, ease: 'none',
        scrollTrigger: { trigger: el, start: opts.start, end: opts.end, scrub: 0.6 },
      });
    });
  }

  // ── 5. SVG ANIMATIONS ─────────────────────────────────────────

  /**
   * data-sr-draw
   * SVG stroke draw-on animation.
   * When data-sr-draw-loop is present, runs a looping gradient draw (OJeOewJ style).
   * Otherwise, standard scroll-triggered draw-on.
   */
  function initDrawSVG() {
    const g = SR.gsap;
    const ST = SR.plugins.ScrollTrigger;
    const DRAW = SR.plugins.DrawSVGPlugin;

    $$('[data-sr-draw]').forEach((wrap) => {
      const opts = parseOpts(wrap, { duration: 0.9, stagger: 0.18, ease: 'power2.inOut', start: 'top 80%' });
      const paths = wrap.querySelectorAll('[data-sr-path]');
      if (!paths.length) return;

      // Looping draw style (OJeOewJ)
      if (wrap.hasAttribute('data-sr-draw-loop')) {
        if (!DRAW || SR.reduceMotion) return;
        const loopTl = g.timeline({ repeat: -1, defaults: { duration: 3, ease: 'power1.inOut' } });
        loopTl.set(wrap.querySelector('svg') || wrap, { opacity: 1 })
          .from(paths, { drawSVG: '0% 0%', stagger: 0.1 })
          .to(paths, { drawSVG: '100% 100%', stagger: 0.1 });
        return;
      }

      // Standard scroll-triggered draw
      const setup = () => {
        paths.forEach((p) => {
          if (DRAW) g.set(p, { drawSVG: '0%' });
          else {
            try { const L = p.getTotalLength(); g.set(p, { strokeDasharray: L, strokeDashoffset: L }); } catch (e) {}
          }
        });
      };

      const play = () => {
        const tl = g.timeline();
        paths.forEach((p, i) => {
          tl.to(p, DRAW
            ? { drawSVG: '100%', duration: opts.duration, ease: opts.ease }
            : { strokeDashoffset: 0, duration: opts.duration, ease: opts.ease }, i * opts.stagger);
        });
      };

      if (!SR.reduceMotion) {
        setup();
        if (ST) {
          ST.create({ trigger: wrap, start: opts.start, onEnter: () => { setup(); play(); }, onEnterBack: () => { setup(); play(); } });
        } else {
          play();
        }
      }
    });
  }

  function initMotionPath() {
    const g = SR.gsap;
    const MP = SR.plugins.MotionPathPlugin;
    const DRAW = SR.plugins.DrawSVGPlugin;
    if (!MP || SR.reduceMotion) return;

    $$('[data-sr-path]').forEach((el) => {
      const opts = parseOpts(el, { duration: 5, autoRotate: false, repeat: -1 });
      const dot = el.querySelector('[data-sr-path-dot]');
      const line = el.querySelector('[data-sr-path-line]');
      if (!dot || !line) return;

      // Glow trail
      let glow = el.querySelector('.sr-path-glow');
      if (!glow) {
        glow = dot.cloneNode(true);
        glow.classList.add('sr-path-glow');
        glow.setAttribute('r', '18');
        glow.setAttribute('fill', 'none');
        glow.setAttribute('stroke', 'var(--sr-coral-bright)');
        glow.setAttribute('stroke-width', '1');
        glow.setAttribute('opacity', '0.25');
        glow.style.filter = 'drop-shadow(0 0 12px rgba(255,106,64,0.8))';
        dot.parentNode.insertBefore(glow, dot);
      }

      const motionPathConfig = { path: line, align: line, alignOrigin: [0.5, 0.5], autoRotate: opts.autoRotate };

      g.to(dot, { duration: opts.duration, repeat: opts.repeat, ease: 'none', motionPath: motionPathConfig });
      if (glow) {
        g.to(glow, { duration: opts.duration, repeat: opts.repeat, ease: 'none', motionPath: motionPathConfig });
      }

      // Pulse dot
      g.to(dot, { attr: { r: 8 }, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      if (DRAW) {
        g.set(line, { drawSVG: '0%' });
        const ST = SR.plugins.ScrollTrigger;
        if (ST) {
          ST.create({ trigger: line, start: 'top 85%', once: true,
            onEnter: () => g.to(line, { drawSVG: '100%', duration: 1.6, ease: 'power2.inOut' }),
          });
        }
      }
    });
  }

  function initLogo() {
    const g = SR.gsap;
    if (SR.reduceMotion) return;

    $$('[data-sr-logo]').forEach((el) => {
      const tl = g.timeline();
      tl.from(el, {
        opacity: 0, scale: 0.5, rotation: -55,
        transformOrigin: '50% 50%',
        duration: 1.1, ease: 'back.out(1.4)',
      });
      // Subtle continuous rotation after entrance
      tl.to(el, {
        rotation: '+=360',
        duration: 20,
        ease: 'none',
        repeat: -1,
      }, '+=0.5');
    });
  }

  // ── 6. ADVANCED COMPONENTS ────────────────────────────────────

  /**
   * data-sr-snap
   * Full-screen section snap with Observer + SplitText + image parallax.
   * Exact implementation from XWzRraJ.
   *
   * Markup:
   *   <div data-sr-snap>
   *     <section>
   *       <div class="outer"><div class="inner">
   *         <div class="bg" style="background-image:url(...)"></div>
   *         <h2 class="section-heading">Text</h2>
   *       </div></div>
   *     </section>
   *     ...
   *   </div>
   */
  function initSnap() {
    const g = SR.gsap;
    const Obs = SR.plugins.Observer;
    if (!Obs || SR.reduceMotion) return;

    $$('[data-sr-snap]').forEach((wrap) => {
      const sections = wrap.querySelectorAll('section');
      if (!sections.length) return;

      const images = wrap.querySelectorAll('.bg');
      const headings = g.utils.toArray(wrap.querySelectorAll('.section-heading'));
      const outerWrappers = g.utils.toArray(wrap.querySelectorAll('.outer'));
      const innerWrappers = g.utils.toArray(wrap.querySelectorAll('.inner'));

      let splitHeadings = [];
      if (SR.plugins.SplitText && headings.length) {
        splitHeadings = headings.map((heading) =>
          new SR.plugins.SplitText(heading, { type: 'chars,words,lines', linesClass: 'clip-text' })
        );
      }

      let currentIndex = -1;
      const wrapIndex = g.utils.wrap(0, sections.length);
      let animating;

      g.set(outerWrappers, { yPercent: 100 });
      g.set(innerWrappers, { yPercent: -100 });

      function gotoSection(index, direction) {
        index = wrapIndex(index);
        if (animating) return;
        animating = true;

        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;

        const tl = g.timeline({
          defaults: { duration: 1.25, ease: 'power1.inOut' },
          onComplete: () => (animating = false),
        });

        if (currentIndex >= 0) {
          g.set(sections[currentIndex], { zIndex: 0 });
          tl.to(images[currentIndex], { yPercent: -15 * dFactor })
            .set(sections[currentIndex], { autoAlpha: 0 });
        }

        g.set(sections[index], { autoAlpha: 1, zIndex: 1 });

        tl.fromTo(
          [outerWrappers[index], innerWrappers[index]],
          { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
          { yPercent: 0 },
          0
        )
          .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

        if (splitHeadings[index] && splitHeadings[index].chars) {
          tl.fromTo(
            splitHeadings[index].chars,
            { autoAlpha: 0, yPercent: 150 * dFactor },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              ease: 'power2',
              stagger: { each: 0.02, from: 'random' },
            },
            0.2
          );
        }

        currentIndex = index;
      }

      Obs.create({
        type: 'wheel,touch,pointer',
        wheelSpeed: -1,
        onDown: () => !animating && gotoSection(currentIndex - 1, -1),
        onUp: () => !animating && gotoSection(currentIndex + 1, 1),
        tolerance: 10,
        preventDefault: true,
      });

      gotoSection(0, 1);
    });
  }

  /**
   * data-sr-flip-scroll
   * Scroll-scrubbed FLIP animation between containers.
   * Exact implementation from GgpMeZp (simplified, no Three.js).
   *
   * Markup:
   *   <div data-sr-flip-scroll>
   *     <div class="container initial"><div class="marker"><div data-sr-flip-target>Target</div></div></div>
   *     <div class="container second"><div class="marker"></div></div>
   *     <div class="container third"><div class="marker"></div></div>
   *   </div>
   */
  function initFlipScroll() {
    const g = SR.gsap;
    const Flip = SR.plugins.Flip;
    const ST = SR.plugins.ScrollTrigger;
    if (!Flip || !ST || SR.reduceMotion) return;

    $$('[data-sr-flip-scroll]').forEach((wrap) => {
      const target = wrap.querySelector('[data-sr-flip-target]');
      const markers = wrap.querySelectorAll('[data-sr-flip-marker]');
      if (!target || markers.length < 2) return;

      const states = [];
      markers.forEach((m) => {
        states.push(Flip.getState(m));
      });

      const tl = g.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });

      for (let i = 1; i < markers.length; i++) {
        const label = i === 1 ? 0 : '+=0.5';
        tl.add(Flip.fit(target, states[i], { duration: 1, ease: 'none' }), label);
      }
    });
  }

  // ── Scroll Progress Bar ───────────────────────────────────────
  function initScrollProgress() {
    const bar = document.querySelector('[data-sr-scroll-progress]');
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = max > 0 ? (h.scrollTop / max * 100) + '%' : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Nav Scroll State ──────────────────────────────────────────
  function initNavScroll() {
    const nav = document.querySelector('[data-sr-nav]');
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('sr-nav-scrolled');
      } else {
        nav.classList.remove('sr-nav-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Initialization ──────────────────────────────────────────────
  function init() {
    if (SR.initialized) return;
    if (!registerPlugins()) {
      setTimeout(init, 40);
      return;
    }
    SR.reduceMotion = checkReducedMotion();
    SR.initialized = true;

    // Run all initializers
    initTextReveal();
    initScramble();
    initTypewriter();
    initImageReveal();
    initParallax();
    initKenBurns();
    initCardReveal();
    initTilt();
    initCardFlip();
    initHero();
    initMarquee();
    initGridStagger();
    initCountUp();
    initMagnetic();
    initReveal();
    initScrub();
    initDrawSVG();
    initMotionPath();
    initLogo();
    initSnap();
    initFlipScroll();
    initScrollProgress();
    initNavScroll();

    // Refresh ScrollTrigger after all init
    if (SR.plugins.ScrollTrigger) {
      SR.plugins.ScrollTrigger.refresh();
    }

    console.log('[Serendepify Motion] Initialized. Plugins:', Object.keys(SR.plugins).filter(k => SR.plugins[k]).join(', '));
  }

  // ── Public API ──────────────────────────────────────────────────
  global.SerendepifyMotion = {
    init,
    SR,
    utils: { $, $$, clamp, lerp, parseOpts },
    // Re-initializers for dynamic content
    refreshText: initTextReveal,
    refreshCards: initCardReveal,
    refreshReveal: initReveal,
    refreshAll: init,
  };

  // NOTE (React port): the original auto-init-on-DOM-ready block is disabled.
  // Initialization is driven explicitly from useSerendepifyMotion() after the
  // component DOM is mounted and document.fonts.ready resolves. This avoids a
  // premature init() on import (which would run SplitText twice and duplicate
  // characters).

})(window);

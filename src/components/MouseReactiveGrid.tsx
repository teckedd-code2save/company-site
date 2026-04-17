import { useRef, useEffect, useCallback } from 'react';
import { useInView } from 'framer-motion';

/*
 * Living circuit-board grid.
 * Snake travels STRICTLY ON grid lines between intersections.
 * Never drifts off — x or y always aligns with a grid line.
 * Mouse proximity brightens nearby lines.
 * Resets when section scrolls into view.
 */

const GRID_COLOR = 'rgba(255,255,255,0.04)';
const GRID_HOVER = 'rgba(232,152,168,0.35)';
const SNAKE_COLOR = 'rgba(212,165,176,0.95)';
const SNAKE_GLOW = 'rgba(232,152,168,0.45)';
const GRID_GAP = 48;
const SNAKE_SPEED = 2.2; // pixels per frame
const TRAIL_LENGTH = 36;
const MOUSE_RADIUS = 160;

/* Snake state — always on grid lines */
interface SnakeState {
  x: number;          // current pixel x (always a multiple of GRID_GAP)
  y: number;          // current pixel y (always a multiple of GRID_GAP)
  targetX: number;    // next intersection x
  targetY: number;    // next intersection y
  dir: 'h' | 'v';     // current axis of travel
  sign: 1 | -1;       // direction along axis
  cols: number;
  rows: number;
  trail: { x: number; y: number }[];
}

export default function MouseReactiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const snakeRef = useRef<SnakeState | null>(null);
  const rafRef = useRef<number>(0);
  const isInView = useInView(containerRef, { amount: 0.2 });

  const initSnake = useCallback((cols: number, rows: number) => {
    const c = Math.floor(cols / 2);
    const r = Math.floor(rows / 2);
    const x = c * GRID_GAP;
    const y = r * GRID_GAP;
    snakeRef.current = {
      x, y,
      targetX: x + GRID_GAP,
      targetY: y,
      dir: 'h',
      sign: 1,
      cols, rows,
      trail: Array.from({ length: TRAIL_LENGTH }, () => ({ x, y })),
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const snake = snakeRef.current;
    if (!snake) return;

    ctx.clearRect(0, 0, w, h);

    const cols = Math.ceil(w / GRID_GAP);
    const rows = Math.ceil(h / GRID_GAP);

    // ── Draw grid lines ──
    for (let c = 0; c <= cols; c++) {
      const x = c * GRID_GAP;
      const dist = Math.abs(x - mx);
      const alpha = dist < MOUSE_RADIUS ? (1 - dist / MOUSE_RADIUS) * 0.35 : 0;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.strokeStyle = alpha > 0.02
        ? GRID_HOVER.replace('0.35', String(Math.max(0.04, alpha)))
        : GRID_COLOR;
      ctx.lineWidth = alpha > 0.02 ? 1.2 : 0.8;
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      const y = r * GRID_GAP;
      const dist = Math.abs(y - my);
      const alpha = dist < MOUSE_RADIUS ? (1 - dist / MOUSE_RADIUS) * 0.35 : 0;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.strokeStyle = alpha > 0.02
        ? GRID_HOVER.replace('0.35', String(Math.max(0.04, alpha)))
        : GRID_COLOR;
      ctx.lineWidth = alpha > 0.02 ? 1.2 : 0.8;
      ctx.stroke();
    }

    // ── Move snake strictly along grid lines ──
    const dx = snake.targetX - snake.x;
    const dy = snake.targetY - snake.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < SNAKE_SPEED) {
      // Snap to target intersection
      snake.x = snake.targetX;
      snake.y = snake.targetY;

      // Pick next direction (horizontal or vertical, never diagonal)
      const possible: Array<{ dir: 'h' | 'v'; sign: 1 | -1 }> = [
        { dir: 'h', sign: 1 },
        { dir: 'h', sign: -1 },
        { dir: 'v', sign: 1 },
        { dir: 'v', sign: -1 },
      ];

      // Exclude reversing
      const filtered = possible.filter((p) => {
        if (p.dir !== snake.dir) return true;
        return p.sign === snake.sign; // same dir, same sign
      });

      let chosen = filtered[Math.floor(Math.random() * filtered.length)];

      // Mouse attraction
      const mouseCol = Math.round(mx / GRID_GAP);
      const mouseRow = Math.round(my / GRID_GAP);
      const mdx = mouseCol * GRID_GAP - snake.x;
      const mdy = mouseRow * GRID_GAP - snake.y;

      if (mx > 0 && (Math.abs(mdx) > 0 || Math.abs(mdy) > 0)) {
        const towardMouse = filtered.filter((p) => {
          if (p.dir === 'h') return (p.sign > 0) === (mdx > 0);
          return (p.sign > 0) === (mdy > 0);
        });
        if (towardMouse.length > 0 && Math.random() > 0.3) {
          chosen = towardMouse[Math.floor(Math.random() * towardMouse.length)];
        }
      }

      // Prevent immediate reverse
      if (chosen.dir === snake.dir && chosen.sign !== snake.sign) {
        const sameDir = filtered.filter((p) => p.dir === snake.dir && p.sign === snake.sign);
        if (sameDir.length > 0) chosen = sameDir[0];
      }

      snake.dir = chosen.dir;
      snake.sign = chosen.sign;

      if (chosen.dir === 'h') {
        snake.targetX = snake.x + chosen.sign * GRID_GAP;
        snake.targetY = snake.y;
      } else {
        snake.targetX = snake.x;
        snake.targetY = snake.y + chosen.sign * GRID_GAP;
      }

      // Wrap around
      if (snake.targetX < 0) snake.targetX = (cols - 1) * GRID_GAP;
      if (snake.targetX > cols * GRID_GAP) snake.targetX = 0;
      if (snake.targetY < 0) snake.targetY = (rows - 1) * GRID_GAP;
      if (snake.targetY > rows * GRID_GAP) snake.targetY = 0;
    } else {
      // Move along current axis toward target
      if (snake.dir === 'h') {
        snake.x += snake.sign * SNAKE_SPEED;
      } else {
        snake.y += snake.sign * SNAKE_SPEED;
      }
    }

    // Shift trail
    snake.trail.unshift({ x: snake.x, y: snake.y });
    if (snake.trail.length > TRAIL_LENGTH) snake.trail.pop();

    // ── Draw snake trail ──
    if (snake.trail.length > 1) {
      for (let i = 0; i < snake.trail.length - 1; i++) {
        const p1 = snake.trail[i];
        const p2 = snake.trail[i + 1];
        const t = 1 - i / snake.trail.length;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = SNAKE_GLOW.replace('0.45', String(t * 0.6));
        ctx.lineWidth = t * 3.5;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    // ── Draw snake head ──
    ctx.beginPath();
    ctx.arc(snake.x, snake.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = SNAKE_COLOR;
    ctx.shadowColor = SNAKE_COLOR;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(snake.x, snake.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cols = Math.ceil(rect.width / GRID_GAP);
    const rows = Math.ceil(rect.height / GRID_GAP);
    initSnake(cols, rows);
  }, [isInView, initSnake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    canvas.addEventListener('mousemove', onMove, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [draw]);

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full">
      <canvas ref={canvasRef} className="pointer-events-auto h-full w-full" style={{ touchAction: 'none' }} aria-hidden="true" />
    </div>
  );
}

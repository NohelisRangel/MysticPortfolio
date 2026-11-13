import { useEffect, useRef } from "react";

// Fixed, twinkling star background drawn on a canvas.
// Fast version: each star's glow is pre-rendered once into a small sprite,
// so every frame is just cheap image stamps (no per-star blur).
export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars = [];
    let frame;
    let w = 0;
    let h = 0;

    // Pre-render a glowing dot (and a sparkle cross) for each colour
    const makeSprite = (color, cross) => {
      const s = document.createElement("canvas");
      const size = 32;
      s.width = s.height = size;
      const g = s.getContext("2d");
      const c = size / 2;
      const grad = g.createRadialGradient(c, c, 0, c, c, c);
      grad.addColorStop(0, color);
      grad.addColorStop(0.18, color);
      grad.addColorStop(0.35, color + "55");
      grad.addColorStop(1, color + "00");
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      if (cross) {
        g.strokeStyle = color;
        g.globalAlpha = 0.7;
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(0, c); g.lineTo(size, c);
        g.moveTo(c, 0); g.lineTo(c, size);
        g.stroke();
      }
      return s;
    };
    const sprites = {
      white: makeSprite("#F2EFE8", false),
      gold: makeSprite("#E8C36A", false),
      whiteX: makeSprite("#F2EFE8", true),
      goldX: makeSprite("#E8C36A", true),
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap for speed on hi-DPI screens
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      stars = Array.from({ length: count }, () => {
        const gold = Math.random() < 0.08;
        const sparkle = Math.random() < 0.12; // a few bigger stars get a glint
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          size: (Math.random() * 1.3 + 0.3) * (sparkle ? 9 : 6),
          phase: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.04,
          sprite: sprites[(gold ? "gold" : "white") + (sparkle ? "X" : "")],
        };
      });
    };

    // Redraw ~30 times a second: the twinkle is slow, so this looks identical
    // to 60fps but halves the work and keeps the rest of the page smooth.
    let last = 0;
    const draw = (now = 0) => {
      frame = requestAnimationFrame(draw);
      const elapsed = now - last;
      if (last && elapsed < 32) return;
      last = now;
      const step = Math.min(elapsed, 100) / 16.7 || 1; // keep twinkle speed independent of frame rate
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        // Twinkle: slower (but still alive) when the viewer prefers reduced motion
        s.phase += (reduceMotion ? s.speed * 0.3 : s.speed) * step;
        const t = (Math.sin(s.phase) + 1) / 2; // 0..1
        const glow = t * t;                    // mostly dim, brief bright flashes
        ctx.globalAlpha = 0.15 + glow * 0.85;
        const size = s.size * (0.75 + glow * 0.5);
        ctx.drawImage(s.sprite, s.x - size / 2, s.y - size / 2, size, size);
      }
    };

    resize();
    draw();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}

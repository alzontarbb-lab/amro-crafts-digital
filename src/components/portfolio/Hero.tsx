import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const words = ["Code.", "Automate.", "Ship."];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Lightweight galaxy: logarithmic spiral arms + sparse stars.
    type P = { r: number; a: number; arm: number; size: number; hue: number; tw: number };
    type S = { x: number; y: number; r: number; tw: number };

    let particles: P[] = [];
    let stars: S[] = [];
    let W = 0, H = 0, DPR = 1;
    const ARMS = 4;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.floor(rect.width);
      H = Math.floor(rect.height);
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const init = () => {
      particles = Array.from({ length: 1400 }, () => {
        const arm = Math.floor(Math.random() * ARMS);
        const r = Math.pow(Math.random(), 0.5);
        return {
          r,
          a: Math.random() * Math.PI * 2,
          arm,
          size: Math.random() * 1.3 + 0.25,
          hue: Math.random(),
          tw: Math.random() * Math.PI * 2,
        };
      });
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.1 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    init();

    let t = 0;
    let last = performance.now();

    const readAccent = () => {
      const cs = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.classList.contains("dark");
      return cs.getPropertyValue(isDark ? "--teal-glow" : "--teal").trim() || "oklch(0.65 0.09 200)";
    };

    const draw = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      t += dt;
      rafRef.current = requestAnimationFrame(draw);

      if (W < 2 || H < 2) return;
      const isDark = document.documentElement.classList.contains("dark");
      const accent = readAccent();
      const mouse = mouseRef.current;
      const hasMouse = mouse.x > -9000;
      const paraX = hasMouse ? (mouse.x - W / 2) * 0.01 : 0;
      const paraY = hasMouse ? (mouse.y - H / 2) * 0.01 : 0;

      ctx.fillStyle = isDark ? "#08070f" : "#f5f1e8";
      ctx.fillRect(0, 0, W, H);

      const cx = W * 0.5 + paraX * 3;
      const cy = H * 0.5 + paraY * 3;
      // Bigger galaxy spilling across the viewport.
      const galaxyR = Math.max(W, H) * 0.7;

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, galaxyR * 1.1);
      if (isDark) {
        glow.addColorStop(0, `color-mix(in oklab, ${accent} 70%, transparent)`);
        glow.addColorStop(0.25, `color-mix(in oklab, ${accent} 28%, transparent)`);
        glow.addColorStop(0.6, `color-mix(in oklab, ${accent} 8%, transparent)`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        glow.addColorStop(0, `color-mix(in oklab, ${accent} 50%, transparent)`);
        glow.addColorStop(0.3, `color-mix(in oklab, ${accent} 20%, transparent)`);
        glow.addColorStop(0.65, `color-mix(in oklab, ${accent} 5%, transparent)`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
      }
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = (Math.sin(t * 0.002 + s.tw) + 1) * 0.5;
        const a = (isDark ? 0.25 : 0.2) + tw * (isDark ? 0.5 : 0.3);
        ctx.fillStyle = isDark ? `rgba(255,250,235,${a})` : `rgba(20,30,50,${a})`;
        const sx = s.x * W + paraX * 4;
        const sy = s.y * H + paraY * 4;
        ctx.fillRect(sx, sy, s.r, s.r);
      }

      // Spiral arms — tighter twist for Milky Way feel.
      const rot = t * 0.00007;
      const twist = 3.4;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const speed = 0.00011 / (p.r + 0.15);
        p.a += speed * dt;
        const armOffset = (p.arm / ARMS) * Math.PI * 2;
        const armJitter = (p.hue - 0.5) * 0.35;
        const angle = p.a + rot + armOffset + p.r * twist + armJitter;
        const radius = p.r * galaxyR;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.45;
        const tw = (Math.sin(t * 0.003 + p.tw) + 1) * 0.5;

        let color: string;
        if (p.r < 0.18) {
          const a = (0.55 + tw * 0.4) * (isDark ? 1 : 0.8);
          color = isDark ? `rgba(255,245,220,${a})` : `rgba(15,25,45,${a})`;
        } else {
          const mix = Math.min(95, 40 + p.r * 60);
          const baseA = (0.45 + tw * 0.45) * (1 - p.r * 0.45) * (isDark ? 1 : 0.9);
          const fill = isDark
            ? `rgba(255,255,255,${baseA})`
            : `rgba(10,15,30,${baseA})`;
          color = `color-mix(in oklab, ${accent} ${mix}%, ${fill})`;
        }
        const size = p.size * (1.4 - p.r * 0.6);
        ctx.fillStyle = color;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }

      ctx.globalCompositeOperation = "destination-out";
      const fade = ctx.createLinearGradient(0, H * 0.5, 0, H);
      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(0.5, "rgba(0,0,0,0.4)");
      fade.addColorStop(0.85, "rgba(0,0,0,0.9)");
      fade.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, H * 0.5, W, H * 0.5);
      ctx.globalCompositeOperation = "source-over";
    };

    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize);
    // Catches layout shifts that don't trigger window resize (the "reset" bug).
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    rafRef.current = requestAnimationFrame((n) => { last = n; draw(n); });

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden grain"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      }}
      onMouseLeave={() => { mouseRef.current = { x: -9999, y: -9999 }; }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Atmospheric blend — long, feathered fade to background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] z-[1]"
        style={{
          background: "var(--background)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.04) 25%, rgba(0,0,0,0.16) 45%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.72) 82%, rgba(0,0,0,0.92) 92%, #000 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.04) 25%, rgba(0,0,0,0.16) 45%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.72) 82%, rgba(0,0,0,0.92) 92%, #000 100%)",
        }}
      />

      {/* Soft ambient glow across the seam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-32 h-80 z-[1] opacity-40 dark:opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, color-mix(in oklab, var(--teal) 14%, transparent), transparent 75%)",
          filter: "blur(56px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pt-32 pb-24">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.2em]">
            01 — Portfolio / 2026
          </span>
          <div className="h-px flex-1 max-w-[120px] bg-border" />
        </motion.div>

        <h1 className="font-display text-[clamp(3rem,11vw,10rem)] font-bold leading-[0.92] tracking-tighter">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`block ${i === 2 ? "text-gradient italic font-light" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <div className="mt-12 grid md:grid-cols-2 gap-8 items-end">
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-md text-pretty"
          >
            Software Developer & Automation Engineer based in{" "}
            <span className="text-foreground">Beirut, Lebanon</span>. Bridging
            operations and software — building the systems that make business
            actually run.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 md:justify-end"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-teal hover:text-primary-foreground transition-colors"
            >
              See my work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass text-sm font-medium hover:border-teal transition-colors"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-foreground/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

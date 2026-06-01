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

    // Constellation network: drifting nodes connected by faint lines.
    type N = { x: number; y: number; vx: number; vy: number; r: number; tw: number };

    let nodes: N[] = [];
    let W = 0, H = 0, DPR = 1;

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
      const area = W * H;
      const count = Math.min(180, Math.max(80, Math.floor(area / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        r: Math.random() * 1.4 + 0.6,
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

      ctx.clearRect(0, 0, W, H);


      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = W + 20;
        else if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        else if (n.y > H + 20) n.y = -20;
      }

      const LINK = 140;
      const LINK2 = LINK * LINK;
      const MOUSE_LINK = 180;
      const MOUSE_LINK2 = MOUSE_LINK * MOUSE_LINK;

      // Draw lines between nearby nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK2) continue;
          const alpha = (1 - d2 / LINK2) * (isDark ? 0.32 : 0.28);
          ctx.strokeStyle = `color-mix(in oklab, ${accent} ${Math.round(alpha * 100)}%, transparent)`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // Lines to mouse
        if (hasMouse) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_LINK2) {
            const alpha = (1 - d2 / MOUSE_LINK2) * (isDark ? 0.55 : 0.45);
            ctx.strokeStyle = `color-mix(in oklab, ${accent} ${Math.round(alpha * 100)}%, transparent)`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with gentle twinkle
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const tw = (Math.sin(t * 0.002 + n.tw) + 1) * 0.5;
        const alpha = (isDark ? 0.55 : 0.6) + tw * 0.35;
        ctx.fillStyle = `color-mix(in oklab, ${accent} ${Math.round(alpha * 100)}%, transparent)`;
        const size = n.r * (1 + tw * 0.3);
        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Soft bottom fade into page background
      ctx.globalCompositeOperation = "destination-out";
      const fade = ctx.createLinearGradient(0, H * 0.55, 0, H);
      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(0.6, "rgba(0,0,0,0.5)");
      fade.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, H * 0.55, W, H * 0.45);
      ctx.globalCompositeOperation = "source-over";
    };

    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
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

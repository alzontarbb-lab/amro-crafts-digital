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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Star = { x: number; y: number; z: number; r: number; tw: number };
    type Orbit = {
      // spherical coords on a unit sphere
      theta: number; // azimuth
      phi: number;   // polar
      speed: number; // angular speed around y-axis
      r: number;     // dot size
      hue: number;   // 0..1 along palette
    };
    type Dust = { a: number; r: number; speed: number; size: number; alpha: number };

    let stars: Star[] = [];
    let orbits: Orbit[] = [];
    let dust: Dust[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      const W = canvas.width, H = canvas.height;
      // Starfield with parallax depth
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.2 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
      // Planet: particles distributed on a sphere
      orbits = Array.from({ length: 900 }, () => {
        // Uniform spherical distribution
        const u = Math.random();
        const v = Math.random();
        return {
          theta: u * Math.PI * 2,
          phi: Math.acos(2 * v - 1),
          speed: 0.0009 + Math.random() * 0.0006,
          r: Math.random() * 1.1 + 0.25,
          hue: Math.random(),
        };
      });
      // Orbital dust ring
      dust = Array.from({ length: 140 }, () => ({
        a: Math.random() * Math.PI * 2,
        r: 1 + Math.random() * 0.35, // relative to planet radius
        speed: 0.0006 + Math.random() * 0.0009,
        size: Math.random() * 1 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
      }));
    };

    resize();
    init();

    let t = 0;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      const isDark = document.documentElement.classList.contains("dark");
      const mouse = mouseRef.current;
      const scaleY = canvas.height / canvas.offsetHeight;
      const mx = mouse.x * (canvas.width / canvas.offsetWidth);
      const my = mouse.y * scaleY;

      // --- Space background gradient ---
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, Math.max(W, H) * 0.8);
      if (isDark) {
        bg.addColorStop(0, "rgba(22,20,40,1)");
        bg.addColorStop(0.45, "rgba(13,12,24,1)");
        bg.addColorStop(1, "rgba(6,6,12,1)");
      } else {
        bg.addColorStop(0, "rgba(247,244,236,1)");
        bg.addColorStop(0.55, "rgba(238,232,220,1)");
        bg.addColorStop(1, "rgba(222,214,198,1)");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // --- Nebula clouds (soft drifting blobs) ---
      const nebulae = [
        { x: W * 0.18, y: H * 0.3, r: Math.min(W, H) * 0.55, c: isDark ? "120,90,220" : "200,160,120", a: isDark ? 0.12 : 0.08 },
        { x: W * 0.82, y: H * 0.25, r: Math.min(W, H) * 0.5, c: isDark ? "60,180,210" : "150,180,200", a: isDark ? 0.1 : 0.07 },
        { x: W * 0.6, y: H * 0.8, r: Math.min(W, H) * 0.6, c: isDark ? "210,80,140" : "210,170,150", a: isDark ? 0.08 : 0.05 },
      ];
      nebulae.forEach((n, i) => {
        const drift = Math.sin(t * 0.0003 + i) * 20;
        const g = ctx.createRadialGradient(n.x + drift, n.y, 0, n.x + drift, n.y, n.r);
        g.addColorStop(0, `rgba(${n.c},${n.a})`);
        g.addColorStop(1, `rgba(${n.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // --- Starfield with parallax + twinkle ---
      const paraX = (mx - W / 2) * 0.01;
      const paraY = (my - H / 2) * 0.01;
      stars.forEach(s => {
        const tw = (Math.sin(t * 0.003 + s.tw) + 1) * 0.5;
        const alpha = (isDark ? 0.35 : 0.25) + tw * (isDark ? 0.55 : 0.3);
        ctx.beginPath();
        ctx.arc(s.x + paraX * s.z * 2, s.y + paraY * s.z * 2, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255,250,235,${alpha * s.z})`
          : `rgba(40,38,55,${alpha * s.z})`;
        ctx.fill();
        // slow drift
        s.x += 0.02 * s.z;
        if (s.x > W) s.x = 0;
      });

      // --- The planet: spherical particle field ---
      const cx = W * 0.5 + paraX * 4;
      const cy = H * 0.5 + paraY * 4;
      const radius = Math.min(W, H) * 0.28;
      // Auto rotation + subtle mouse-driven tilt
      const yaw = t * 0.00035 + paraX * 0.0008;
      const tilt = -0.35 + paraY * 0.0006; // slight axial tilt

      // Atmospheric halo behind planet
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.6);
      const haloColor = isDark ? "120,200,230" : "140,170,200";
      halo.addColorStop(0, `rgba(${haloColor},${isDark ? 0.35 : 0.22})`);
      halo.addColorStop(0.5, `rgba(${haloColor},${isDark ? 0.1 : 0.07})`);
      halo.addColorStop(1, `rgba(${haloColor},0)`);
      ctx.fillStyle = halo;
      ctx.fillRect(cx - radius * 2, cy - radius * 2, radius * 4, radius * 4);

      // Project each orbital point
      const cosT = Math.cos(tilt), sinT = Math.sin(tilt);
      // Build sortable projected array
      type Proj = { x: number; y: number; depth: number; r: number; hue: number };
      const projected: Proj[] = [];
      for (let i = 0; i < orbits.length; i++) {
        const o = orbits[i];
        o.theta += o.speed + 0.0004; // slow spin
        // sphere -> cartesian
        const sx = Math.sin(o.phi) * Math.cos(o.theta + yaw);
        const sy = Math.cos(o.phi);
        const sz = Math.sin(o.phi) * Math.sin(o.theta + yaw);
        // tilt around X
        const ty = sy * cosT - sz * sinT;
        const tz = sy * sinT + sz * cosT;
        projected.push({
          x: cx + sx * radius,
          y: cy + ty * radius,
          depth: tz, // -1..1
          r: o.r,
          hue: o.hue,
        });
      }
      // Painter's algorithm: back to front
      projected.sort((a, b) => a.depth - b.depth);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        // Lighting: front-facing brighter, back-facing dim
        const light = (p.depth + 1) * 0.5; // 0..1
        // Palette: teal -> violet -> warm
        let r1: number, g1: number, b1: number;
        if (isDark) {
          // cool space palette
          if (p.hue < 0.5) {
            // teal/cyan
            r1 = 90 + light * 80;
            g1 = 200 + light * 40;
            b1 = 220 + light * 20;
          } else {
            // violet/magenta
            r1 = 180 + light * 60;
            g1 = 130 + light * 50;
            b1 = 230 + light * 20;
          }
        } else {
          // warm muted on ivory
          if (p.hue < 0.5) {
            r1 = 60 + light * 80;
            g1 = 110 + light * 60;
            b1 = 150 + light * 50;
          } else {
            r1 = 140 + light * 60;
            g1 = 80 + light * 60;
            b1 = 110 + light * 40;
          }
        }
        const alpha = 0.15 + light * (isDark ? 0.85 : 0.55);
        const size = p.r * (0.5 + light * 0.8);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r1 | 0},${g1 | 0},${b1 | 0},${alpha})`;
        ctx.fill();
      }

      // Specular highlight on front of planet
      const spec = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.3,
        0,
        cx - radius * 0.25,
        cy - radius * 0.3,
        radius * 0.9
      );
      const specColor = isDark ? "255,255,255" : "255,250,240";
      spec.addColorStop(0, `rgba(${specColor},${isDark ? 0.18 : 0.25})`);
      spec.addColorStop(0.6, `rgba(${specColor},0)`);
      ctx.fillStyle = spec;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // --- Orbital dust ring (in front when ring.y > cy after tilt) ---
      // We draw a single tilted elliptical ring; particles already at z>0 appear in front naturally
      dust.forEach(d => {
        d.a += d.speed;
        const rr = radius * (1.35 + d.r * 0.15);
        const sx = Math.cos(d.a);
        const sz = Math.sin(d.a);
        // tilt — ring lies on planet's equatorial plane
        const ty = -sz * sinT;
        const tz = sz * cosT;
        const px = cx + sx * rr;
        const py = cy + ty * rr;
        const light = (tz + 1) * 0.5;
        const a = d.alpha * (0.35 + light * 0.65) * (isDark ? 1 : 0.7);
        const col = isDark ? "200,220,255" : "120,100,80";
        ctx.beginPath();
        ctx.arc(px, py, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${a})`;
        ctx.fill();
      });

      // Mouse gravity: pull nearest stars slightly (subtle interaction)
      if (mouse.x > -9000) {
        for (let i = 0; i < 30; i++) {
          const s = stars[i];
          const dx = s.x - mx, dy = s.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0) {
            const f = (140 - dist) / 140;
            s.x -= (dx / dist) * f * 0.4;
            s.y -= (dy / dist) * f * 0.4;
          }
        }
      }

      // --- Bottom fade (seamless blend into next section) ---
      ctx.globalCompositeOperation = "destination-out";
      const fade = ctx.createLinearGradient(0, H * 0.45, 0, H);
      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(0.4, "rgba(0,0,0,0.18)");
      fade.addColorStop(0.65, "rgba(0,0,0,0.5)");
      fade.addColorStop(0.85, "rgba(0,0,0,0.85)");
      fade.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, H * 0.45, W, H);
      ctx.globalCompositeOperation = "source-over";

      t += 16;
      rafRef.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
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

import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const words = ["Code.", "Automate.", "Ship."];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.classList.contains("dark");
      const lineColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.8;
      const colSpacing = 28;
      const rowSpacing = 28;
      const amp = 6;
      const freq = 0.018;
      const cols = Math.ceil(W / colSpacing) + 1;
      const rows = Math.ceil(H / rowSpacing) + 1;

      for (let r = 0; r < rows; r++) {
        const y = r * rowSpacing;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const waveY = y + Math.sin(x * freq + r * 0.4) * amp;
          x === 0 ? ctx.moveTo(x, waveY) : ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        const x = c * colSpacing;
        ctx.beginPath();
        for (let y = 0; y <= H; y += 2) {
          const waveX = x + Math.sin(y * freq + c * 0.4) * amp;
          y === 0 ? ctx.moveTo(waveX, y) : ctx.lineTo(waveX, y);
        }
        ctx.stroke();
      }

      // Resolve actual page bg by reading --background token via a probe element
      const probe = document.createElement("div");
      probe.style.cssText = "background:var(--background);position:absolute;visibility:hidden;";
      document.body.appendChild(probe);
      const bg = getComputedStyle(probe).backgroundColor;
      document.body.removeChild(probe);
      const m = bg.match(/rgba?\(([^)]+)\)/);
      const parts = m ? m[1].split(",").map((s) => s.trim()) : ["0", "0", "0"];
      const rgb = `${parts[0]}, ${parts[1]}, ${parts[2]}`;
      const fade = ctx.createLinearGradient(0, H * 0.55, 0, H);
      fade.addColorStop(0, `rgba(${rgb}, 0)`);
      fade.addColorStop(1, `rgba(${rgb}, 1)`);
      ctx.fillStyle = fade;
      ctx.fillRect(0, H * 0.55, W, H);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    window.addEventListener("resize", resize);
    resize();

    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden grain">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />


      <div className="relative mx-auto max-w-7xl px-6 w-full pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
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
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`block ${i === 2 ? "text-gradient italic font-light" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <div className="mt-12 grid md:grid-cols-2 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-md text-pretty"
          >
            Software Developer & Automation Engineer based in{" "}
            <span className="text-foreground">Beirut, Lebanon</span>. Bridging
            operations and software — building the systems that make business
            actually run.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
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

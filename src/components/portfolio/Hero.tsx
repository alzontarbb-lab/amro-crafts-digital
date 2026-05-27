import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const words = ["Code.", "Automate.", "Ship."];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden grain">
      {/* Animated mesh gradient */}
      {/* background layers — masked to fade cleanly into the section below */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      >
        <motion.div
          className="absolute inset-0 mesh-bg opacity-60"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* wavy cloth grid — dark mode (screen blend reveals white lines) */}
        <div
          className="absolute inset-0 opacity-60 hidden dark:block"
          style={{
            backgroundImage: "url('/wavy-grid.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
          }}
        />
        {/* wavy cloth grid — light mode (inverted + multiply for dark lines on ivory) */}
        <div
          className="absolute inset-0 opacity-40 dark:hidden"
          style={{
            backgroundImage: "url('/wavy-grid.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "invert(1)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

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

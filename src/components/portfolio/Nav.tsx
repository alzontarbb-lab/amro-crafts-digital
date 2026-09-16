import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-foreground origin-left z-[60]"
      />
      {!scrolled && (
        <div
          aria-hidden
          className="fixed top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none z-40"
        />
      )}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 md:py-3 backdrop-blur-md bg-background/80 border-b border-border/60 md:bg-transparent md:border-transparent md:backdrop-blur-0"
            : "py-5 md:py-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="font-display text-lg font-semibold tracking-tight relative inline-flex items-center"
          >
            <Logo variant="wordmark" />
            <span className="text-foreground">.</span>
          </a>

          <nav
            className={`hidden md:flex items-center gap-1 px-2 py-2 rounded-full transition-all ${
              scrolled ? "border border-border bg-card/90 backdrop-blur-sm" : ""
            }`}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm px-4 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
            >
              Contact
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-foreground"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden backdrop-blur-xl bg-background/95 flex flex-col"
          >
            <div className="h-20" aria-hidden />
            <nav className="flex-1 flex flex-col items-start gap-1 px-8 pt-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl font-semibold tracking-tight py-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-8 pb-10 flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>Beirut, LB</span>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="underline hover:text-foreground"
              >
                Get in touch →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

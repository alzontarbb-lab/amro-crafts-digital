import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { useTheme } from "@/lib/theme";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
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
        className="fixed top-0 left-0 right-0 h-[2px] bg-teal origin-left z-[60]"
      />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 md:py-3 backdrop-blur-md bg-background/70 border-b border-border/40 md:bg-transparent md:border-transparent md:backdrop-blur-0" : "py-5 md:py-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="font-display text-lg font-semibold tracking-tight relative inline-flex items-center"
          >
            <Logo variant="wordmark" />
            <span className="text-teal">.</span>
          </a>

          <nav
            className={`hidden md:flex items-center gap-1 px-2 py-2 rounded-full transition-all ${
              scrolled ? "glass" : ""
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
            <span className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              Available
            </span>
            <button
              aria-label="Toggle theme"
              onClick={toggle}
              className="relative w-14 h-8 rounded-full glass flex items-center px-1 transition-colors"
            >
              <motion.div
                className="absolute w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center"
                animate={{ x: theme === "dark" ? 0 : 24 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                </motion.div>
              </motion.div>
            </button>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
              className="md:hidden w-9 h-9 rounded-full glass flex items-center justify-center"
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
            className="fixed inset-0 z-40 md:hidden backdrop-blur-xl bg-background/90 flex flex-col"
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
                  className="font-display text-4xl font-semibold tracking-tight py-3 hover:text-foreground transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-8 pb-10 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              Available for new work
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

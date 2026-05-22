import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-teal origin-left z-[60]"
      />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-tight relative inline-flex items-center overflow-visible min-w-fit"
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
          </div>
        </div>
      </header>
    </>
  );
}

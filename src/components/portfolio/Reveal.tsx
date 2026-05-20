import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-16 md:mb-24">
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em]">
            {index} — {label}
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-border" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tighter text-balance max-w-3xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

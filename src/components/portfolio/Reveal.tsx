import { type ReactNode } from "react";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
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
    <div className="mb-8 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <span className="font-mono text-[11px] md:text-xs text-muted-foreground uppercase tracking-[0.25em]">
            {index} — {label}
          </span>
          <div className="h-px flex-1 max-w-[60px] md:max-w-[80px] bg-border" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance max-w-3xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

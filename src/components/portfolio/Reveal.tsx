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
  description,
  titleClassName,
}: {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  titleClassName?: string;
}) {
  return (
    <div className="mb-8 md:mb-14">
      <Reveal>
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <span className="font-mono text-[11px] md:text-xs text-muted-foreground uppercase tracking-[0.25em]">
            {index} — {label}
          </span>
          <div className="h-px flex-1 max-w-[60px] md:max-w-[80px] bg-border" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={`font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight ${
            titleClassName ? titleClassName : "text-balance max-w-4xl"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground/80 max-w-2xl font-normal leading-relaxed text-pretty">
            {description}
          </p>
        )}
      </Reveal>
    </div>
  );
}

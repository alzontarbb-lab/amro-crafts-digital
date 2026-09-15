import { Reveal, SectionHeader } from "./Reveal";

const items = [
  {
    period: "2026 — Present",
    role: "Freelance Web Developer",
    org: "Independent",
    note: "Taking on full-stack web projects for businesses that need real tools, not templates.",
  },
  {
    period: "2025 — 2026",
    role: "Aftersales Administrator",
    org: "Khonaysser Group",
    note: "Ran the aftersales operation end-to-end, then built internal tools on the side that replaced manual workflows and got adopted across the team.",
  },
  {
    period: "2021 — 2024",
    role: "B.Sc. Computer Science",
    org: "Arab Open University",
    note: "Graduated with GPA 3.66.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-12 md:py-28 bg-surface/30">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader index="05" label="Timeline" title="A short, honest path." />

        <div className="max-w-3xl">
          {items.map((it, i) => (
            <Reveal key={it.role} delay={i * 0.06}>
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1.5 md:gap-6 py-4 md:py-6 border-t border-border/70 last:border-b">
                <div className="font-mono text-xs text-muted-foreground/70 md:pt-1">{it.period}</div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-medium">{it.role}</h3>
                  <div className="text-foreground/90 text-xs sm:text-sm font-mono mt-0.5">{it.org}</div>
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base text-pretty leading-relaxed">{it.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    period: "2020 — 2024",
    role: "B.Sc. Computer Science",
    org: "Arab Open University",
    note: "Graduated with GPA 3.66.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-40 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader index="05" label="Timeline" title="A short, honest path." />

        <div className="max-w-3xl">
          {items.map((it, i) => (
            <Reveal key={it.role} delay={i * 0.08}>
              <div className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] gap-6 py-8 border-t border-border last:border-b">
                <div className="font-mono text-xs text-muted-foreground pt-1">{it.period}</div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium">{it.role}</h3>
                  <div className="text-teal text-sm font-mono mt-1">{it.org}</div>
                  <p className="text-muted-foreground mt-3 text-pretty">{it.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

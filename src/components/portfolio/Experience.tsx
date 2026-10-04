import { Reveal } from "./Reveal";
import { Download } from "lucide-react";

const items = [
  {
    period: "2020 — Present",
    role: "Independent Developer & Digital Services",
    org: "Self-Employed",
    note: "Started with general digital services, design, and hands-on IT problem-solving; evolved into building full-stack web applications and production internal tools.",
  },
  {
    period: "2025 — 2026",
    role: "Aftersales Administrator",
    org: "Khonaysser Group",
    note: "Managed aftersales operations across 400+ ERP accounts (100–200+ monthly quotations, 200+ yearly contracts) and coordinated ~10 technician teams. Built four internal tools adopted org-wide.",
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
        <div className="mb-8 md:mb-14">
          <Reveal>
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <span className="font-mono text-[11px] md:text-xs text-muted-foreground uppercase tracking-[0.25em]">
                05 — Timeline
              </span>
              <div className="h-px flex-1 max-w-[60px] md:max-w-[80px] bg-border" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance max-w-4xl">
                A short, honest path.
              </h2>
              <a
                href="/Amro-CV.pdf"
                download="Amro-CV.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-border text-xs sm:text-sm font-medium hover:border-foreground transition-colors shrink-0 self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                Download CV
              </a>
            </div>
          </Reveal>
        </div>

        <div className="max-w-3xl">
          {items.map((it, i) => (
            <Reveal key={it.role} delay={i * 0.06}>
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1.5 md:gap-6 py-4 md:py-6 border-t border-border/70 last:border-b">
                <div className="font-mono text-xs text-muted-foreground/70 md:pt-1">
                  {it.period}
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-medium">{it.role}</h3>
                  <div className="text-foreground/90 text-xs sm:text-sm font-mono mt-0.5">
                    {it.org}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base text-pretty leading-relaxed">
                    {it.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

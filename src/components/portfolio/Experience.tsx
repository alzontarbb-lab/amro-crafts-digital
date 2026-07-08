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

// Stylized paisley/boteh tile — used as a CSS mask so we can tint via currentColor.
const PAISLEY_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><g fill='none' stroke='black' stroke-width='1.2'><path d='M50 150 C 20 120, 30 70, 70 55 C 110 42, 140 65, 138 100 C 136 128, 110 140, 92 128 C 78 118, 82 98, 96 92 C 106 88, 116 96, 114 106'/><circle cx='96' cy='110' r='3'/><path d='M70 55 C 74 40, 88 32, 100 38'/><path d='M150 50 C 130 30, 100 34, 92 55'/><path d='M160 160 C 175 145, 178 120, 168 105 C 158 92, 142 96, 138 108 C 135 118, 145 126, 152 120'/><circle cx='150' cy='115' r='2'/></g></svg>`;

const PAISLEY_URI = `url("data:image/svg+xml;utf8,${encodeURIComponent(PAISLEY_SVG)}")`;

export function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-40 bg-surface/40 overflow-hidden">
      {/* Paisley texture — tinted via currentColor for light/dark accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-accent-500 dark:text-accent-400 opacity-[0.04] dark:opacity-[0.05]"
        style={{
          backgroundColor: "currentColor",
          WebkitMaskImage: PAISLEY_URI,
          maskImage: PAISLEY_URI,
          WebkitMaskRepeat: "repeat",
          maskRepeat: "repeat",
          WebkitMaskSize: "200px 200px",
          maskSize: "200px 200px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader index="05" label="Timeline" title="A short, honest path." />

        <div className="max-w-3xl space-y-5">
          {items.map((it, i) => (
            <Reveal key={it.role} delay={i * 0.08}>
              <div
                className="relative rounded-2xl p-6 md:p-7 border border-black/[0.08] dark:border-white/[0.15] transition-colors"
                style={{
                  background:
                    "color-mix(in oklab, var(--card) 12%, transparent)",
                  backdropFilter: "blur(16px) saturate(140%)",
                  WebkitBackdropFilter: "blur(16px) saturate(140%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 24px -12px rgba(0,0,0,0.15)",
                }}
              >
                {/* Inner scrim to guarantee text contrast over paisley */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "color-mix(in oklab, var(--card) 25%, transparent)",
                  }}
                />
                <div className="relative grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] gap-6">
                  <div className="font-mono text-xs text-teal pt-1">{it.period}</div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-medium text-teal">
                      {it.role}
                    </h3>
                    <div className="text-foreground/80 text-sm font-mono mt-1">{it.org}</div>
                    <p className="text-muted-foreground mt-3 text-pretty">{it.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

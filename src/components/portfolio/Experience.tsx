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
const PAISLEY_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'><g fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='M60 190 C 20 155, 30 80, 85 60 C 135 45, 175 78, 172 122 C 170 156, 138 172, 112 156 C 92 144, 96 118, 118 110 C 132 105, 146 118, 142 132'/><circle cx='120' cy='128' r='4'/><path d='M85 60 C 90 42, 108 32, 124 40'/><path d='M180 55 C 156 32, 118 38, 108 62'/><path d='M50 100 C 40 90, 40 78, 52 72'/><circle cx='60' cy='168' r='2.5'/><circle cx='168' cy='70' r='2.5'/></g></svg>`;

const PAISLEY_URI = `url("data:image/svg+xml;utf8,${encodeURIComponent(PAISLEY_SVG)}")`;

export function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-40 bg-surface/40 overflow-hidden">
      {/* Paisley texture — tinted via currentColor for light/dark accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-accent-600 dark:text-accent-300 opacity-[0.18] dark:opacity-[0.22]"
        style={{
          backgroundColor: "currentColor",
          WebkitMaskImage: PAISLEY_URI,
          maskImage: PAISLEY_URI,
          WebkitMaskRepeat: "repeat",
          maskRepeat: "repeat",
          WebkitMaskSize: "240px 240px",
          maskSize: "240px 240px",
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

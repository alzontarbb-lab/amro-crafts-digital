import { Reveal, SectionHeader } from "./Reveal";
import { motion } from "motion/react";

const groups = [
  {
    index: "01",
    label: "Core Web Applications",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "State Architecture"],
  },
  {
    index: "02",
    label: "Backend & Databases",
    items: ["PHP / Laravel", "Python", "Supabase", "PostgreSQL (RLS)", "MySQL", "REST APIs"],
  },
  {
    index: "03",
    label: "Automation & AI Pipelines",
    items: [
      "Python Scripts",
      "LLM Integration",
      "Automated Reporting",
      "Scheduled Cron",
      "Email Triggers",
    ],
  },
  {
    index: "04",
    label: "Systems & Security",
    items: ["Row-Level Security", "OAuth 2.0 Sign-In", "Offline-First POS", "Role-Based Access"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-12 md:py-28 bg-surface/30">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader index="03" label="Capabilities" title="The stack behind the systems." />

        {/* Compact, mobile-first grid layout — eliminates vertical dead space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {groups.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 0.05}>
              <div className="group rounded-xl border border-border/70 bg-card/60 p-4 md:p-5 hover:border-foreground/30 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] text-muted-foreground/70 tracking-wider">
                    {g.index}
                  </span>
                  <div className="h-2 w-px bg-border" />
                  <h3 className="font-display text-sm md:text-base font-medium text-foreground tracking-tight">
                    {g.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {g.items.map((it, i) => (
                    <motion.span
                      key={it}
                      initial={{ opacity: 0, y: 4 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02, duration: 0.3 }}
                      className="px-2.5 py-1 rounded-md border border-border/80 bg-background/80 text-xs font-mono text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-colors cursor-default"
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Frontier & Agentic Tooling — Minimalist Grey Chrome Strip */}
        <Reveal delay={0.25}>
          <div className="mt-4 sm:mt-5 p-3.5 sm:p-4 rounded-xl border border-border/70 bg-card/40">
            {/* Specular Grey Chrome Gradient Definition */}
            <svg
              className="absolute w-0 h-0 pointer-events-none"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id="chrome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#E4E4E7" />
                  <stop offset="60%" stopColor="#A1A1AA" />
                  <stop offset="85%" stopColor="#D4D4D8" />
                  <stop offset="100%" stopColor="#71717A" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground/70">
                Frontier &amp; Agentic Tooling
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
              {frontierTools.map((t) => (
                <div
                  key={t.name}
                  className="group flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-lg border border-border/60 bg-background/60 hover:border-zinc-400/40 hover:bg-background/90 transition-all cursor-default"
                >
                  <div className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 group-hover:brightness-125">
                    {t.icon}
                  </div>
                  <span className="font-mono text-xs text-foreground/80 group-hover:text-foreground transition-colors font-medium truncate">
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const frontierTools = [
  {
    name: "Claude Code",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v3.086l2.182-2.182a1.5 1.5 0 1 1 2.121 2.121L15.621 8.71H18.7a1.5 1.5 0 1 1 0 3H15.62l2.182 2.182a1.5 1.5 0 0 1-2.121 2.121L13.5 13.821V16.9a1.5 1.5 0 1 1-3 0v-3.08l-2.182 2.182a1.5 1.5 0 1 1-2.121-2.121L8.379 11.7H5.3a1.5 1.5 0 1 1 0-3h3.08L6.197 6.518a1.5 1.5 0 1 1 2.121-2.121L10.5 6.579V3.5A1.5 1.5 0 0 1 12 2Z" />
      </svg>
    ),
  },
  {
    name: "OpenAI Codex",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.493zm-9.66-4.65a4.471 4.471 0 0 1-.534-3.013l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.842-3.369v2.332a.08.08 0 0 1-.033.064l-4.83 2.79a4.5 4.5 0 0 1-6.15-1.648zm-1.12-9.61a4.476 4.476 0 0 1 2.342-1.972V11.8a.78.78 0 0 0 .388.677l5.83 3.37-2.02 1.168a.078.078 0 0 1-.073 0l-4.83-2.79A4.504 4.504 0 0 1 2.48 8.17zm16.597 3.855l-5.833-3.37 2.019-1.168a.078.078 0 0 1 .073 0l4.83 2.79a4.499 4.499 0 0 1-.676 8.105v-5.68a.79.79 0 0 0-.413-.677zm2.01-3.023l-.141-.085-4.779-2.76a.776.776 0 0 0-.785 0L9.54 9.527V7.195a.08.08 0 0 1 .033-.064l4.83-2.79a4.5 4.5 0 0 1 6.677 4.56zM10.74 1.57a4.499 4.499 0 0 1 4.494 4.493v5.679a.79.79 0 0 0 .413.677l5.833 3.37-2.019 1.168a.078.078 0 0 1-.073 0l-4.83-2.79a4.504 4.504 0 0 1-3.818-12.597zm-.437 6.442l3.35 1.934a.08.08 0 0 1 0 .138l-3.35 1.934a.08.08 0 0 1-.12-.069V8.08a.08.08 0 0 1 .12-.068z" />
      </svg>
    ),
  },
  {
    name: "Antigravity",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M12 1.5C12 7.299 7.299 12 1.5 12C7.299 12 12 16.701 12 22.5C12 16.701 16.701 12 22.5 12C16.701 12 12 7.299 12 1.5Z" />
      </svg>
    ),
  },
  {
    name: "ElevenLabs",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <rect x="7" y="3.5" width="3.5" height="17" rx="1.75" />
        <rect x="13.5" y="3.5" width="3.5" height="17" rx="1.75" />
      </svg>
    ),
  },
  {
    name: "Higgsfield",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M5 3.5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 10 3.5V9h4V3.5A1.5 1.5 0 0 1 15.5 2h2A1.5 1.5 0 0 1 19 3.5v17a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1-1.5-1.5V15h-4v5.5A1.5 1.5 0 0 1 8.5 22h-2A1.5 1.5 0 0 1 5 20.5v-17Z" />
      </svg>
    ),
  },
];

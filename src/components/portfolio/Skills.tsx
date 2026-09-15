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
    items: ["Python Scripts", "LLM Integration", "Automated Reporting", "Scheduled Cron", "Email Triggers"],
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
      </div>
    </section>
  );
}

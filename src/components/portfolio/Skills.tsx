import { Reveal, SectionHeader } from "./Reveal";
import { motion } from "motion/react";

const groups = [
  { label: "Web", items: ["React", "Vite", "Tailwind", "TypeScript"] },
  { label: "Backend", items: ["PHP", "Laravel", "MySQL", "Supabase", "REST APIs"] },
  { label: "Automation & AI", items: ["Python", "LLM Integration", "Scripting"] },
  { label: "Tools", items: ["Vercel", "Git"] },
  { label: "Mobile (familiar)", items: ["Flutter", "Dart"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-40 bg-surface/40">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader index="03" label="Stack" title="The tools I reach for." />

        <div className="space-y-2">
          {groups.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 0.05}>
              <div className="group grid md:grid-cols-[200px_1fr] gap-6 py-6 border-t border-border first:border-t-0 hover:border-foreground/40 transition-colors">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-medium group-hover:text-foreground transition-colors">
                    {g.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {g.items.map((it, i) => (
                    <motion.span
                      key={it}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className="px-3.5 py-1.5 rounded-full glass text-sm font-medium hover:border-foreground hover:text-foreground transition-colors cursor-default"
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
      <div className="section-divider" aria-hidden="true" />
    </section>
  );
}

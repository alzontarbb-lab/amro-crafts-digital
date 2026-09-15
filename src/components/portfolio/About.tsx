import { Reveal, SectionHeader } from "./Reveal";

const principles = [
  {
    num: "01",
    title: "Eliminate Redundant Entry",
    desc: "If field technicians or ops staff entered data once, software should never ask twice.",
  },
  {
    num: "02",
    title: "Deterministic State & RLS",
    desc: "Postgres Row-Level Security and strict per-depot access by default. Zero data leakage.",
  },
  {
    num: "03",
    title: "Silent, Resilient Automation",
    desc: "Scheduled Python cron jobs, anomaly monitors, and email triggers that run without human babysitting.",
  },
  {
    num: "04",
    title: "Speed Above Decoration",
    desc: "Sub-second database latency, clean touch targets, and high contrast for real operational environments.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-12 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader index="02" label="About" title="Quiet confidence. Real systems." />

        <div className="grid md:grid-cols-2 gap-6 md:gap-14 items-start">
          <div className="space-y-4 md:space-y-5 text-base sm:text-lg leading-relaxed text-pretty">
            <Reveal>
              <p>
                I'm a CS graduate who bridges operations and software — building
                full-stack web systems and automating the friction points that businesses pretend
                aren't costing them money.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground">
                I've built production tools that real businesses run on — not because I was asked
                to, but because I saw a problem. Scheduling chaos became an automated dispatch platform. Paper
                intake became an authenticated digital workflow. Repetitive tasks became Python jobs that run
                quietly in the background.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="pt-2 flex items-center gap-2.5 text-xs sm:text-sm font-mono text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
                Shipping internal systems & taking on freelance engineering work
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 mesh-bg opacity-20 blur-3xl rounded-3xl" />
              <div className="relative border border-border/80 bg-card rounded-xl md:rounded-2xl p-5 sm:p-6 overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/60">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Engineering Principles
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/60">
                    systems.amro.dev
                  </span>
                </div>

                <div className="space-y-3.5">
                  {principles.map((p) => (
                    <div key={p.num} className="flex items-start gap-3">
                      <span className="font-mono text-xs text-foreground/40 mt-0.5 select-none shrink-0">
                        {p.num}
                      </span>
                      <div>
                        <h4 className="font-display text-sm font-medium text-foreground tracking-tight">
                          {p.title}
                        </h4>
                        <p className="text-muted-foreground text-xs sm:text-[13px] leading-relaxed mt-0.5">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

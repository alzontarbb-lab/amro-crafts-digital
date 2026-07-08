import { Reveal, SectionHeader } from "./Reveal";

const snippet = `// currently.ts
const amro = {
  role: "Software Developer",
  city: "Beirut, LB",
  building: "internal tools that outlive the brief",
  shipping: "production systems since '23",
};

while (problem) {
  amro.solve(problem);
  amro.ship();
}`;

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-40">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader index="02" label="About" title="Quiet confidence. Real systems." />

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="space-y-6 text-lg leading-relaxed text-pretty">
            <Reveal>
              <p>
                I'm a CS graduate who bridges operations and software — building
                full-stack web systems and automating the boring stuff that businesses pretend
                isn't a problem.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground">
                I've built production tools that real businesses run on — not because I was asked
                to, but because I saw a problem. Scheduling chaos became a dispatch portal. Paper
                intake became a digital workflow. Repetitive tasks became Python jobs that run
                quietly in the background.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="pt-4 flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                Currently shipping internal systems & taking on freelance web work
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 mesh-bg opacity-30 blur-3xl rounded-3xl" />
              <div className="relative glass rounded-2xl p-6 font-mono text-sm overflow-hidden">
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-chart-4/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
                  <span className="ml-auto text-[10px] text-muted-foreground">currently.ts</span>
                </div>
                <pre className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {snippet.split("\n").map((line, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-muted-foreground/40 select-none w-4 text-right">
                        {i + 1}
                      </span>
                      <span className="flex-1">
                        {colorize(line)}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="section-divider" aria-hidden="true" />
    </section>
  );
}

function colorize(line: string) {
  // tiny syntax highlight
  return line.split(/(\/\/.*|"[^"]*"|\b(?:const|while|let|return)\b)/g).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("//")) return <span key={i} className="text-muted-foreground/60">{part}</span>;
    if (part.startsWith('"')) return <span key={i} className="text-foreground">{part}</span>;
    if (/^(const|while|let|return)$/.test(part)) return <span key={i} className="text-muted-foreground">{part}</span>;
    return <span key={i}>{part}</span>;
  });
}

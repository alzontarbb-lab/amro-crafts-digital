import { Reveal } from "./Reveal";
import pitchImg from "@/assets/amro-pitch.jpg";
import trophyImg from "@/assets/amro-trophy.jpg";

const rows = [
  {
    img: pitchImg,
    alt: "Amro — on the pitch",
    objectPosition: "center top",
    eyebrow: "The game",
    title: "Reading systems.",
    copy: "Organized football. Professional structures. Tactical patterns that repeat, break, and evolve. The same instincts that shape how I build software.",
  },
  {
    img: trophyImg,
    alt: "Amro — street football",
    objectPosition: "center 40%",
    eyebrow: "The roots",
    title: "Earned on the street.",
    copy: "Before any structure, football was a daily language — street, casual, unorganized, real. That foundation never leaves.",
  },
];

export function Personal() {
  return (
    <section id="personal" className="relative py-12 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <span className="font-mono text-[11px] md:text-xs text-muted-foreground uppercase tracking-[0.25em]">
            — Beyond the screen
          </span>
        </Reveal>

        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {rows.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="group">
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl aspect-[16/10] sm:aspect-[4/3]">
                  <img
                    src={r.img}
                    alt={r.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{
                      objectPosition: r.objectPosition,
                      filter: "grayscale(15%) contrast(1.08)",
                      backgroundColor: "var(--surface-hi)",
                    }}
                  />
                </div>
                <p className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.25em] mt-3 sm:mt-4 mb-1.5">
                  {r.eyebrow}
                </p>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold tracking-tight mb-1.5">
                  {r.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base text-pretty max-w-md leading-relaxed">{r.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

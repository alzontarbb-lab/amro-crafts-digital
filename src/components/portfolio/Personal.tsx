import { Reveal } from "./Reveal";
import pitchImg from "@/assets/amro-pitch.jpg";
import trophyImg from "@/assets/amro-trophy.jpg";

export function Personal() {
  return (
    <section
      id="personal"
      className="relative pt-8 pb-0 md:pt-12 md:pb-0"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl px-6 mb-16">
        <Reveal>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em]">
            — Beyond the screen
          </span>
        </Reveal>
      </div>

      {/* ROW 1 */}
      <Reveal>
        <div className="relative w-full overflow-hidden hidden md:block" style={{ minHeight: "70vh" }}>
          <img
            id="personal-photo-1"
            src={pitchImg}
            alt="Amro — on the pitch"
            className="absolute top-0 bottom-0 left-0"
            style={{
              width: "62%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              filter: "grayscale(15%) contrast(1.08)",
              backgroundColor: "var(--surface-hi)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 45%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, black 0%, black 45%, transparent 100%)",
            }}
          />

          <div
            className="absolute"
            style={{
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              maxWidth: 420,
              padding: "0 48px",
            }}
          >
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em] mb-4">
              The game
            </p>
            <h2 className="font-display text-5xl font-bold tracking-tight leading-none mb-6">
              Reading systems.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Organized football. Professional structures. Tactical patterns that repeat, break,
              and evolve. The same instincts that shape how I build software.
            </p>
          </div>
        </div>

        {/* ROW 1 — mobile */}
        <div className="md:hidden relative w-full overflow-hidden">
          <div className="relative w-full" style={{ height: 280 }}>
            <img
              src={pitchImg}
              alt="Amro — on the pitch"
              className="w-full h-full object-cover"
              style={{
                objectPosition: "center top",
                filter: "grayscale(15%) contrast(1.08)",
                backgroundColor: "var(--surface-hi)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, transparent 35%, color-mix(in oklab, var(--background) 25%, transparent) 55%, color-mix(in oklab, var(--background) 60%, transparent) 75%, color-mix(in oklab, var(--background) 90%, transparent) 90%, var(--background) 100%)",
              }}
            />
          </div>
          <div style={{ padding: "2rem 1.5rem" }}>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em] mb-4">
              The game
            </p>
            <h2 className="font-display text-5xl font-bold tracking-tight leading-none mb-6">
              Reading systems.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Organized football. Professional structures. Tactical patterns that repeat, break,
              and evolve. The same instincts that shape how I build software.
            </p>
          </div>
        </div>
      </Reveal>

      {/* ROW 2 */}
      <Reveal>
        <div className="relative w-full overflow-hidden hidden md:block" style={{ minHeight: "70vh" }}>
          <img
            id="personal-photo-2"
            src={trophyImg}
            alt="Amro — street football"
            className="absolute top-0 bottom-0 right-0"
            style={{
              width: "62%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
              filter: "grayscale(15%) contrast(1.08)",
              backgroundColor: "var(--surface-hi)",
              WebkitMaskImage:
                "linear-gradient(to left, black 0%, black 45%, transparent 100%), linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(to left, black 0%, black 45%, transparent 100%), linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
              maskComposite: "intersect",
            }}
          />
          {/* Bottom fade into next section background */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--background) 40%, transparent) 40%, color-mix(in oklab, var(--background) 80%, transparent) 70%, var(--background) 100%)",
            }}
          />


          <div
            className="absolute"
            style={{
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              maxWidth: 420,
              padding: "0 48px",
            }}
          >
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em] mb-4">
              The roots
            </p>
            <h2 className="font-display text-5xl font-bold tracking-tight leading-none mb-6">
              Earned on the street.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Before any structure, football was a daily language — street, casual, unorganized,
              real. That foundation never leaves.
            </p>
          </div>
        </div>

        {/* ROW 2 — mobile */}
        <div className="md:hidden relative w-full overflow-hidden">
          <div className="relative w-full" style={{ height: 280 }}>
            <img
              src={trophyImg}
              alt="Amro — street football"
              className="w-full h-full object-cover"
              style={{
                objectPosition: "center 50%",
                filter: "grayscale(15%) contrast(1.08)",
                backgroundColor: "var(--surface-hi)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, transparent 35%, color-mix(in oklab, var(--background) 25%, transparent) 55%, color-mix(in oklab, var(--background) 60%, transparent) 75%, color-mix(in oklab, var(--background) 90%, transparent) 90%, var(--background) 100%)",
              }}
            />
          </div>
          <div style={{ padding: "2rem 1.5rem" }}>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em] mb-4">
              The roots
            </p>
            <h2 className="font-display text-5xl font-bold tracking-tight leading-none mb-6">
              Earned on the street.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Before any structure, football was a daily language — street, casual, unorganized,
              real. That foundation never leaves.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

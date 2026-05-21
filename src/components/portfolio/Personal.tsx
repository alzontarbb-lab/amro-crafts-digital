import { Reveal } from "./Reveal";
import { Logo } from "./Logo";
import pitchImg from "@/assets/amro-pitch.jpg";
import trophyImg from "@/assets/amro-trophy.jpg";

export function Personal() {
  return (
    <section
      id="personal"
      className="relative py-24 md:py-32"
      style={{ background: "var(--surface)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em] mb-16">
            — Beyond the screen
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* LEFT — stacked photos */}
            <div className="relative">
              <img
                src={pitchImg}
                alt="Amro on the pitch"
                className="w-full h-auto block object-cover"
                style={{
                  background: "var(--surface-hi)",
                  filter: "grayscale(20%) contrast(1.05)",
                  aspectRatio: "4 / 3",
                }}
              />
              <img
                src={trophyImg}
                alt="Amro — street football"
                className="block object-cover"
                style={{
                  background: "var(--surface-hi)",
                  filter: "grayscale(20%) contrast(1.05)",
                  width: "75%",
                  marginLeft: "24px",
                  marginTop: "-20px",
                  aspectRatio: "1 / 1",
                  position: "relative",
                }}
              />
            </div>

            {/* RIGHT — text */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tighter">
                Footballer first.
              </h3>
              <p className="text-muted-foreground text-lg max-w-sm text-pretty">
                Played my whole life — organized, professional, street. Football taught me how to
                read systems, find the gaps, and make decisions under pressure. The same instincts
                that built these tools.
              </p>
              <div className="font-mono text-sm text-muted-foreground space-y-1 pt-2">
                <div>Lifelong player &nbsp;·&nbsp; Beirut, Lebanon</div>
                <div>Midfielder &nbsp;·&nbsp; Street to professional</div>
              </div>

              <div
                className="mt-8"
                style={{ transform: "scale(0.45)", transformOrigin: "bottom left" }}
              >
                <Logo variant="stamp" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

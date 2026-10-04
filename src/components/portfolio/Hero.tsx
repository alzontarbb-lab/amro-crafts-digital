import { motion } from "motion/react";
import { ArrowUpRight, MapPin, BadgeCheck } from "lucide-react";
import waveWebp from "@/assets/wave-cover.webp";
import waveLightGif from "@/assets/wave-cover-light.gif";
import amroAvatar from "@/assets/amro-avatar.webp";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative h-36 sm:h-48 md:h-64 w-full overflow-hidden bg-surface">
        <picture>
          <source srcSet={waveWebp} type="image/webp" />
          <img
            src={waveLightGif}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
        </picture>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6">
        <div className="flex items-end justify-between -mt-12 sm:-mt-14 md:-mt-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-background shrink-0 shadow-2xl bg-surface relative select-none"
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src={amroAvatar}
              alt="Amro — AI-Native Software Engineer"
              draggable={false}
              className="w-full h-full object-cover object-[center_20%] select-none pointer-events-none"
              style={{
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
              }}
            />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-2 sm:gap-3 pb-1 sm:pb-2"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-border text-xs sm:text-sm font-medium hover:border-foreground transition-colors"
            >
              Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-foreground text-background text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 pb-10 sm:pb-14 md:pb-20"
        >
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Amro
            </h1>
            <BadgeCheck
              className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/80"
              aria-label="Verified"
            />
          </div>

          <p className="font-mono text-sm text-muted-foreground">
            @amr0kf · AI-Native Software Engineer
          </p>

          <p className="text-base sm:text-lg text-foreground font-medium text-pretty leading-snug">
            Code-switching between stacks the way Beirut switches between languages.
          </p>

          <p className="max-w-xl text-muted-foreground text-pretty leading-relaxed text-sm sm:text-base">
            Bridging operations and software, building full-stack systems and automating internal operations.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> Beirut, Lebanon
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

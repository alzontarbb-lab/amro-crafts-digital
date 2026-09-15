import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProjectById, projects, Project, ProjectScreenshot } from "@/data/projects";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

export const Route = createFileRoute("/work/$projectId")({
  head: ({ params }) => {
    const project = getProjectById(params.projectId);
    return {
      meta: [
        { title: project ? `${project.title} — Case Study by Amro` : "Project Not Found" },
        { name: "description", content: project?.blurb || "Software engineering and systems case study." },
        { property: "og:title", content: project ? `${project.title} — Amro Portfolio` : "Case Study" },
        { property: "og:description", content: project?.blurb || "Full-stack and operations systems." },
      ],
    };
  },
  loader: ({ params }) => {
    const project = getProjectById(params.projectId);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const project = getProjectById(projectId);
  if (!project) return null;
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const screenshots = project.screenshots || [];
  const screenshotCount = screenshots.length;

  // Adjacent projects for bottom pagination
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20 selection:text-white">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
          <Link
            to="/"
            hash="work"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-3.5 py-1.5 font-mono text-xs text-muted-foreground transition-all hover:border-white/25 hover:bg-surface-hi hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to portfolio</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <span className="rounded-full border border-white/10 bg-surface px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {project.tag}
            </span>
            <span className="font-mono text-xs text-foreground/80">{project.year}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 md:py-16">
        {/* Project Header */}
        <section className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-foreground/90">
              {project.tag}
            </span>
            {(project.id === "ula-claims" || project.isNda) && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 font-mono text-xs text-zinc-300">
                <ShieldCheck className="h-3 w-3 text-zinc-400" />
                NDA Protected
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.blurb}
          </p>

          {/* Tech Stack Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/8 bg-surface px-2.5 py-1 font-mono text-xs text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Brand & Aesthetic Direction Note */}
          {project.brandNote && (
            <div className="mt-8 rounded-xl border border-white/10 bg-surface/70 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-md bg-white/10 p-1.5 text-foreground shrink-0">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Brand & Aesthetic Alignment
                  </span>
                  <p className="mt-1 text-sm text-foreground/90 leading-relaxed">
                    {project.brandNote}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Dynamic Showcase Section: Tablet Chassis, Desktop Window, or Mobile Deck */}
        {screenshotCount > 0 ? (
          project.screenshotMode === "tablet" ? (
            <TabletShowcase
              screenshots={screenshots}
              projectId={project.id}
              aspectRatio={project.aspectRatio}
            />
          ) : project.screenshotMode === "desktop" ? (
            <DesktopShowcase
              screenshots={screenshots}
              projectId={project.id}
              aspectRatio={project.aspectRatio}
            />
          ) : (
            <MobileShowcase
              screenshots={screenshots}
              galleryRef={galleryRef}
              scrollGallery={scrollGallery}
            />
          )
        ) : (
          /* Placeholder / Confidentiality Notice if no public screenshots */
          <section className="mb-16 md:mb-24">
            <div className="rounded-2xl border border-dashed border-white/15 bg-surface/50 p-8 sm:p-12 text-center">
              <ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {project.tag.includes("Internal") || project.tag.includes("Automation")
                  ? "Internal Production Tool — Interface Withheld"
                  : "Sanitized Screenshots Under Non-Disclosure"}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
                {project.tag.includes("Internal") || project.tag.includes("Automation")
                  ? "This system was built for internal operational workflows. Production interfaces, client company records, and database structures are restricted."
                  : "Production interface views, client logos, and proprietary data models are sanitized. Detailed walkthrough demonstrations and architecture diagrams available upon verified inquiry."}
              </p>
            </div>
          </section>
        )}

        {/* P-A-R-O In-Depth Case Study Breakdown (Immediate solid rendering, zero scroll lag) */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Deep Dive
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              System Architecture & Operational Breakdown
            </h2>
          </div>

          {/* 01 · The Problem */}
          <div className="rounded-xl border border-white/10 bg-surface p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                01 · The Friction
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">The Operational Breakdown</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
              {project.caseStudy.problem}
            </p>
          </div>

          {/* 02 · System Architecture */}
          <div className="rounded-xl border border-white/10 bg-surface p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                02 · System Architecture & Technical Choices
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Engineering Strategy</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
              {project.caseStudy.architecture}
            </p>
          </div>

          {/* 03 · Operational Outcome */}
          <div className="rounded-xl border border-white/10 bg-surface p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                03 · Measurable Outcome
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Real-World Business Impact</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
              {project.caseStudy.outcome}
            </p>
          </div>

          {/* 04 · Highlights list */}
          <div className="rounded-xl border border-white/10 bg-surface p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                04 · Technical Highlights
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Core Implementation Features</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.caseStudy.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom Project Switcher & Contact CTA */}
        <section className="mt-16 md:mt-24 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Prev project */}
            <Link
              to="/work/$projectId"
              params={{ projectId: prevProject.id }}
              className="group flex flex-col items-start"
            >
              <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                Previous Project
              </span>
              <span className="mt-1 text-sm font-semibold text-foreground group-hover:underline">
                {prevProject.title}
              </span>
            </Link>

            {/* Back Home CTA */}
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:scale-[1.01]"
            >
              <span>Have a project in mind? Let's talk</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Next project */}
            <Link
              to="/work/$projectId"
              params={{ projectId: nextProject.id }}
              className="group flex flex-col items-end text-right"
            >
              <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                Next Project
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 text-sm font-semibold text-foreground group-hover:underline">
                {nextProject.title}
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function MobileShowcase({
  screenshots,
  galleryRef,
  scrollGallery,
}: {
  screenshots: ProjectScreenshot[];
  galleryRef: React.RefObject<HTMLDivElement | null>;
  scrollGallery: (dir: "left" | "right") => void;
}) {
  return (
    <section className="mb-16 md:mb-24">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Mobile Interface Screens ({screenshots.length})
          </h2>
        </div>

        {/* Scroll controls for desktop */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollGallery("left")}
            aria-label="Scroll left"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-surface text-muted-foreground transition-all hover:border-white/30 hover:bg-surface-hi hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollGallery("right")}
            aria-label="Scroll right"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-surface text-muted-foreground transition-all hover:border-white/30 hover:bg-surface-hi hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Phones Track */}
      <div
        ref={galleryRef}
        className="flex gap-5 sm:gap-7 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" }}
      >
        {screenshots.map((s, idx) => (
          <div key={s.src} className="flex flex-col items-center shrink-0 snap-center sm:snap-start">
            {/* Phone Chassis */}
            <div className="group relative w-[240px] sm:w-[270px] md:w-[290px] rounded-[34px] p-2 bg-zinc-900 border-2 border-zinc-700 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 hover:scale-[1.02]">
              {/* Top camera pill */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 h-3.5 w-16 rounded-full bg-black z-20" />

              {/* Screen Image Container */}
              <div className="relative aspect-[9/18.5] w-full overflow-hidden rounded-[26px] bg-black">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />
              </div>
            </div>

            {/* Clean Minimal Badge */}
            <div className="mt-3.5 flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground/60">0{idx + 1}</span>
              <span className="rounded-full border border-white/10 bg-surface px-2.5 py-0.5 font-mono text-xs text-foreground/80">
                {s.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TabletShowcase({
  screenshots,
  projectId,
  aspectRatio = "881/914",
}: {
  screenshots: ProjectScreenshot[];
  projectId: string;
  aspectRatio?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = screenshots[activeIndex];

  return (
    <section className="mb-16 md:mb-24">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tablet className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Tablet Touchscreen Interface ({screenshots.length} Screens · Stylus & Pen Optimized)
          </h2>
        </div>

        <span className="font-mono text-xs text-muted-foreground/70">
          0{activeIndex + 1} / 0{screenshots.length}
        </span>
      </div>

      {/* Realistic Tablet Device Frame */}
      <div className="mx-auto max-w-2xl sm:max-w-3xl">
        <div className="relative rounded-[28px] sm:rounded-[36px] p-3 sm:p-5 bg-zinc-900 border-2 border-zinc-700/80 shadow-2xl ring-1 ring-white/10">
          {/* Top camera sensor */}
          <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-zinc-950 border border-zinc-800" />

          {/* Top Header / Bar inside tablet */}
          <div className="mb-2.5 flex items-center justify-between px-2 pt-1 text-[11px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Depot Tablet · {projectId} · {activeScreen.badge}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))}
                aria-label="Previous tablet screen"
                className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))}
                aria-label="Next tablet screen"
                className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Screen Image Container with exact aspect ratio (881/914) — zero cut/crop */}
          <div
            className="relative w-full overflow-hidden rounded-[18px] sm:rounded-[24px] bg-black shadow-inner flex items-center justify-center border border-white/5"
            style={{ aspectRatio }}
          >
            <img
              src={activeScreen.src}
              alt={activeScreen.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain select-none"
            />
          </div>

          {/* Tablet Screen Selector Tabs */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-2">
            {screenshots.map((s, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                    isSelected
                      ? "border-white bg-white text-black font-semibold shadow-md"
                      : "border-white/10 bg-surface text-muted-foreground hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  0{idx + 1} · {s.badge}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopShowcase({
  screenshots,
  projectId,
  aspectRatio,
}: {
  screenshots: ProjectScreenshot[];
  projectId: string;
  aspectRatio?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = screenshots[activeIndex];

  return (
    <section className="mb-16 md:mb-24">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Desktop Platform Interface ({screenshots.length} Screens)
          </h2>
        </div>

        <span className="font-mono text-xs text-muted-foreground/70">
          0{activeIndex + 1} / 0{screenshots.length}
        </span>
      </div>

      {/* Sleek Desktop Browser Frame */}
      <div className="rounded-2xl border border-white/15 bg-surface overflow-hidden shadow-2xl">
        {/* Browser Chrome Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/40 border border-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/40 border border-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/40 border border-green-500/60" />
          </div>

          <div className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-muted-foreground/80">
            {projectId}.portal / {activeScreen.badge}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))}
              aria-label="Previous desktop screen"
              className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))}
              aria-label="Next desktop screen"
              className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Active Desktop Screen Image */}
        <div
          className="relative w-full bg-black overflow-hidden flex items-center justify-center"
          style={{ aspectRatio: aspectRatio || "16 / 9" }}
        >
          <img
            src={activeScreen.src}
            alt={activeScreen.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain select-none"
          />
        </div>

        {/* Tab Selection Bar */}
        <div className="border-t border-white/10 bg-surface-hi/80 p-3 sm:p-4">
          <div className="flex flex-wrap items-center gap-2">
            {screenshots.map((s, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                    isSelected
                      ? "border-white bg-white text-black font-semibold shadow-md"
                      : "border-white/10 bg-surface text-muted-foreground hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  0{idx + 1} · {s.badge}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

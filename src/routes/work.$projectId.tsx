import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProjectById, projects, Project, ProjectScreenshot } from "@/data/projects";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Monitor,
  Tablet,
  Maximize2,
  X,
  Cpu,
  Database,
  Radio,
  Server,
} from "lucide-react";

export const Route = createFileRoute("/work/$projectId")({
  head: ({ params }) => {
    const project = getProjectById(params.projectId);
    return {
      meta: [
        { title: project ? `${project.title} — Case Study by Amro` : "Project Not Found" },
        {
          name: "description",
          content: project?.blurb || "Software engineering and systems case study.",
        },
        {
          property: "og:title",
          content: project ? `${project.title} — Amro Portfolio` : "Case Study",
        },
        {
          property: "og:description",
          content: project?.blurb || "Full-stack and operations systems.",
        },
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

interface OperationalMetric {
  value: string;
  label: string;
  sub: string;
}

const PROJECT_METRICS: Record<string, OperationalMetric[]> = {
  "field-dispatch": [
    { value: "111+", label: "SLA Overdues Triaged", sub: "Automated engine breakdown alerts" },
    { value: "50+", label: "Heavy Gensets Tracked", sub: "Per-unit KVA, serials & ATS switchgear" },
    { value: "3 Divisions", label: "Workload Balancing", sub: "Mechanical, Electrical & Welders" },
    { value: "0 Slips", label: "Paperless Target", sub: "Digital GPS-tagged photo work orders" },
  ],
  "market-dash": [
    { value: "< 45s", label: "Checkout Velocity", sub: "Sub-minute direct mobile dispatch" },
    { value: "0%", label: "Aggregator Fees", sub: "Direct retailer margin retention" },
    {
      value: "Gemini AI",
      label: "Smart Item Discovery",
      sub: "Fuzzy catalog heuristics & suggestions",
    },
    { value: "Sub-second", label: "Sliding Cart Drawer", sub: "Fluid bottom-sheet ergonomics" },
  ],
  "fragrance-storefront": [
    {
      value: "100%",
      label: "Authenticity Verified",
      sub: "Batch-code transparency & olfactory notes",
    },
    { value: "< 30s", label: "Direct WhatsApp Flow", sub: "Zero-friction order serialization" },
    { value: "44px+", label: "Ergonomic Hit Targets", sub: "Fold-test passing mobile ergonomics" },
    {
      value: "0 Fees",
      label: "Gateway Disintermediation",
      sub: "Full cash-on-delivery inspection",
    },
  ],
  "retail-pos": [
    {
      value: "USD & LBP",
      label: "Dual Currency Ledgers",
      sub: "Real-time parallel shift drawer balance",
    },
    {
      value: "4 Verticals",
      label: "Adapted Deployments",
      sub: "Grocery, footwear, menswear & trade",
    },
    { value: "100%", label: "Offline-First Engine", sub: "FastAPI + SQLite, zero cloud failure" },
    { value: "1-Click", label: "Shift Reconciliation", sub: "Automated cash discrepancy audit" },
  ],
  "ula-claims": [
    {
      value: "Mins vs Days",
      label: "Turnaround Acceleration",
      sub: "Multi-model LLM API evidence parsing",
    },
    { value: "100%", label: "Digital Audit Trail", sub: "Drag-and-drop Kanban claim pipeline" },
    {
      value: "Agent Brain",
      label: "Adaptive Skill Memory",
      sub: "Self-refining report quality over time",
    },
    {
      value: "Sanitized",
      label: "Strict NDA Protection",
      sub: "All proprietary trademarks withheld",
    },
  ],
  "case-file": [
    {
      value: "Bilingual",
      label: "Arabic RTL & English",
      sub: "Seamless bidirectional layout toggle",
    },
    { value: "100%", label: "Permanent Public Record", sub: "Resilient self-hosted documentation" },
    {
      value: "5 Archives",
      label: "Content Media Library",
      sub: "Articles, evidence, audio & video",
    },
    {
      value: "Navy & Gold",
      label: "Institutional Stature",
      sub: "High-credibility legal design system",
    },
  ],
  "invoice-maker": [
    { value: "100%", label: "Offline Client-Side", sub: "Zero server dependency or account setup" },
    { value: "Bilingual", label: "Arabic/English PDF", sub: "Dual-language invoice generation" },
    { value: "< 60s", label: "Document Creation", sub: "Template styling with live preview" },
    { value: "$0", label: "Zero SaaS Subscription", sub: "Browser local storage persistence" },
  ],
  "parts-intake": [
    { value: "< 60s", label: "Depot Intake Speed", sub: "Stylus & screen-pen touch ergonomics" },
    { value: "0", label: "Lost Carbon Slips", sub: "Replaced hand-written depot paper loop" },
    {
      value: "Auto-Email",
      label: "Direct TRF Dispatch",
      sub: "Structured delivery into depot ERP",
    },
    {
      value: "Live Depot",
      label: "Daily Production Use",
      sub: "Continuous active aftersales operations",
    },
  ],
  "contracts-portal": [
    {
      value: "OCR Engine",
      label: "Automated Extraction",
      sub: "Machine serials parsed from notes",
    },
    { value: "365-Day", label: "SLA Renewal Clock", sub: "Preemptive maintenance warranty alerts" },
    { value: "0", label: "Uncovered Dispatches", sub: "Eliminated uncontracted service trips" },
    {
      value: "Subscription",
      label: "Lifecycle Model",
      sub: "Centralized machinery warranty registry",
    },
  ],
  "python-automation": [
    {
      value: "~10 hrs/wk",
      label: "Manual Labor Saved",
      sub: "Eliminated repetitive copy-paste tasks",
    },
    { value: "100%", label: "Autonomous Schedule", sub: "Cron-triggered without human oversight" },
    { value: "0", label: "Calculation Anomalies", sub: "Pandas cross-table reconciliation" },
    {
      value: "Multi-Channel",
      label: "Automated Summaries",
      sub: "Daily KPI reporting to Slack & Email",
    },
  ],
};

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const project = getProjectById(projectId);

  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const screenshots = project?.screenshots || [];
  const screenshotCount = screenshots.length;
  const metrics = project ? PROJECT_METRICS[project.id] || [] : [];

  // Adjacent projects for bottom pagination
  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Lightbox keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft" && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1);
      if (e.key === "ArrowRight" && lightboxIndex < screenshots.length - 1)
        setLightboxIndex(lightboxIndex + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, screenshots.length]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20 selection:text-white">
      {/* Top sticky navigation bar — Badge-free minimal design */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
          <Link
            to="/"
            hash="work"
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to selected work</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">
              {project.tag}
            </span>
            <span className="font-mono text-xs text-muted-foreground/60">·</span>
            <span className="font-mono text-xs text-foreground/80">{project.year}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-14 md:py-20">
        {/* Project Header */}
        <section className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/80">
              {project.tag}
            </span>
            {(project.id === "ula-claims" || project.isNda) && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <span className="text-zinc-600">·</span>
                <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
                <span>Sanitized Under NDA</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            {project.title}
          </h1>

          <p className="mt-4 sm:mt-5 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
            {project.blurb}
          </p>

          {/* Tech Stack List — Badge-Free Monospace Typography */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-muted-foreground/80">
            {project.tech.map((t, idx) => (
              <span key={t} className="flex items-center gap-2">
                {idx > 0 && <span className="text-muted-foreground/30 select-none">/</span>}
                <span className="text-foreground/90">{t}</span>
              </span>
            ))}
          </div>

          {/* Brand & Aesthetic Direction Note */}
          {project.brandNote && (
            <div className="mt-6 sm:mt-8 rounded-xl border border-border/70 bg-card p-4 sm:p-5">
              <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                Design & Engineering Context
              </span>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {project.brandNote}
              </p>
            </div>
          )}
        </section>

        {/* P1: Hero Bento Metrics KPI Grid */}
        {metrics.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/60 bg-card p-4 sm:p-5 flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                    {m.label}
                  </span>
                  <div className="my-2">
                    <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                      {m.value}
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-muted-foreground/80 leading-snug">
                    {m.sub}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Showcase Section: Tablet Chassis, Desktop Window, or Mobile Deck */}
        {screenshotCount > 0 ? (
          project.screenshotMode === "tablet" ? (
            <TabletShowcase
              screenshots={screenshots}
              projectId={project.id}
              aspectRatio={project.aspectRatio}
              onZoom={(idx) => setLightboxIndex(idx)}
            />
          ) : project.screenshotMode === "desktop" ? (
            <DesktopShowcase
              screenshots={screenshots}
              projectId={project.id}
              aspectRatio={project.aspectRatio}
              onZoom={(idx) => setLightboxIndex(idx)}
            />
          ) : (
            <MobileShowcase
              screenshots={screenshots}
              galleryRef={galleryRef}
              scrollGallery={scrollGallery}
              onZoom={(idx) => setLightboxIndex(idx)}
            />
          )
        ) : (
          /* Internal Tools / NDA Notice */
          <section className="mb-12 sm:mb-20">
            <div className="rounded-2xl border border-dashed border-border/80 bg-card/60 p-6 sm:p-10 text-center">
              <ShieldCheck className="mx-auto h-7 w-7 text-muted-foreground mb-3" />
              <h3 className="text-base font-semibold text-foreground">
                Internal Production System — Interface Withheld
              </h3>
              <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed">
                This system was built for internal operational workflows. Production interfaces,
                client company records, and database structures are withheld under internal data
                protection. Detailed architecture walkthrough available upon verified inquiry.
              </p>
            </div>
          </section>
        )}

        {/* System Architecture Blueprint */}
        <section className="mb-12 sm:mb-16">
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Cpu className="h-4 w-4" />
              <span>System Topology & Operational Flow</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-lg border border-border/50 bg-background/50 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                  <Radio className="h-3.5 w-3.5 text-emerald-400" />
                  <span>1. Edge / Intake</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Field inputs, stylus signatures, mobile photo GPS reports, or incoming client
                  invoices.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-border/50 bg-background/50 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                  <Server className="h-3.5 w-3.5 text-sky-400" />
                  <span>2. Processing Hub</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Haversine route optimization, OCR parsing, division workload balancing & SLA
                  countdowns.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-border/50 bg-background/50 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                  <Database className="h-3.5 w-3.5 text-violet-400" />
                  <span>3. State & Ledger</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Offline SQLite / Postgres RLS data persistence, dual-currency ledgers, and audit
                  trails.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-border/50 bg-background/50 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>4. Real Outcome</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Automated dispatch, paperless carbon slip replacement, and sub-minute
                  reconciliation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Case Study Breakdown */}
        <section className="space-y-6 sm:space-y-8">
          <div className="border-b border-border/40 pb-3 sm:pb-4">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
              Engineering Breakdown
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Architecture & Operational Case Study
            </h2>
          </div>

          {/* 01 · The Friction */}
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                01 · The Friction
              </span>
              <span className="h-px flex-1 bg-border/40" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              The Operational Breakdown
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {project.caseStudy.problem}
            </p>
          </div>

          {/* 02 · Engineering Strategy */}
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                02 · System Architecture & Technical Choices
              </span>
              <span className="h-px flex-1 bg-border/40" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Engineering Strategy
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {project.caseStudy.architecture}
            </p>
          </div>

          {/* 03 · Measurable Outcome */}
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                03 · Measurable Outcome
              </span>
              <span className="h-px flex-1 bg-border/40" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Real-World Business Impact
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {project.caseStudy.outcome}
            </p>
          </div>

          {/* 04 · Highlights list */}
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                04 · Technical Highlights
              </span>
              <span className="h-px flex-1 bg-border/40" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Core Implementation Features
            </h3>
            <ul className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.caseStudy.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom Project Switcher & Contact CTA */}
        <section className="mt-12 sm:mt-20 border-t border-border/40 pt-8 sm:pt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Prev project */}
            <Link
              to="/work/$projectId"
              params={{ projectId: prevProject.id }}
              className="group flex flex-col items-start"
            >
              <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Previous Project
              </span>
              <span className="mt-1 text-sm font-medium text-foreground group-hover:underline">
                {prevProject.title}
              </span>
            </Link>

            {/* Back Home CTA */}
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-white/90 cursor-pointer"
            >
              <span>Have a project in mind? Let's talk</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Next project */}
            <Link
              to="/work/$projectId"
              params={{ projectId: nextProject.id }}
              className="group flex flex-col items-end text-right"
            >
              <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                Next Project
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-1 text-sm font-medium text-foreground group-hover:underline">
                {nextProject.title}
              </span>
            </Link>
          </div>
        </section>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && screenshots[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="w-full max-w-6xl flex items-center justify-between font-mono text-xs text-white/70">
            <span>
              {screenshots[lightboxIndex].badge} · {lightboxIndex + 1} of {screenshots.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="p-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            className="relative max-h-[82vh] max-w-full flex items-center justify-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={screenshots[lightboxIndex].src}
              alt={screenshots[lightboxIndex].alt}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>

          <div className="w-full max-w-xl text-center text-xs sm:text-sm text-zinc-400 font-mono">
            {screenshots[lightboxIndex].alt}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileShowcase({
  screenshots,
  galleryRef,
  scrollGallery,
  onZoom,
}: {
  screenshots: ProjectScreenshot[];
  galleryRef: React.RefObject<HTMLDivElement | null>;
  scrollGallery: (dir: "left" | "right") => void;
  onZoom: (idx: number) => void;
}) {
  return (
    <section className="mb-12 sm:mb-20">
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Mobile Interface Screens ({screenshots.length})
          </h2>
        </div>

        {/* Scroll controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollGallery("left")}
            aria-label="Scroll left"
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:bg-surface-hi hover:text-foreground cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollGallery("right")}
            aria-label="Scroll right"
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:bg-surface-hi hover:text-foreground cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Track */}
      <div
        ref={galleryRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {screenshots.map((s, idx) => (
          <div
            key={s.src}
            className="flex flex-col items-center shrink-0 snap-center sm:snap-start"
          >
            <div
              onClick={() => onZoom(idx)}
              className="group relative w-[220px] sm:w-[260px] md:w-[280px] rounded-[30px] p-2 bg-zinc-900 border border-zinc-700 shadow-xl transition-transform duration-300 hover:scale-[1.02] cursor-zoom-in"
            >
              <div className="relative aspect-[9/18.5] w-full overflow-hidden rounded-[22px] bg-black">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span>0{idx + 1}</span>
              <span>·</span>
              <span className="text-foreground/90">{s.badge}</span>
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
  onZoom,
}: {
  screenshots: ProjectScreenshot[];
  projectId: string;
  aspectRatio?: string;
  onZoom: (idx: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = screenshots[activeIndex];

  return (
    <section className="mb-12 sm:mb-20">
      <div className="mb-3 sm:mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tablet className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Tablet Touchscreen Interface ({screenshots.length} Screens · Stylus Optimized)
          </h2>
        </div>

        <span className="font-mono text-xs text-muted-foreground/70">
          0{activeIndex + 1} / 0{screenshots.length}
        </span>
      </div>

      <div className="mx-auto max-w-2xl sm:max-w-3xl">
        <div className="relative rounded-[24px] sm:rounded-[32px] p-3 sm:p-4 bg-zinc-900 border border-zinc-700/80 shadow-2xl">
          <div className="mb-2 flex items-center justify-between px-2 text-[11px] font-mono text-muted-foreground">
            <span className="text-zinc-400">
              Depot Tablet · {projectId} · {activeScreen.badge}
            </span>
            <button
              type="button"
              onClick={() => onZoom(activeIndex)}
              className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Inspect</span>
            </button>
          </div>

          <div
            onClick={() => onZoom(activeIndex)}
            className="relative w-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-black shadow-inner flex items-center justify-center border border-white/5 cursor-zoom-in"
            style={{ aspectRatio }}
          >
            <img
              src={activeScreen.src}
              alt={activeScreen.alt}
              loading="lazy"
              className="h-full w-full object-contain select-none"
            />
          </div>

          {/* Thumbnail Track */}
          <div className="mt-3.5 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {screenshots.map((s, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "border-white bg-white text-black font-semibold shadow-sm"
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
  onZoom,
}: {
  screenshots: ProjectScreenshot[];
  projectId: string;
  aspectRatio?: string;
  onZoom: (idx: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = screenshots[activeIndex];

  return (
    <section className="mb-12 sm:mb-20">
      <div className="mb-3 sm:mb-4 flex items-center justify-between">
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

      <div className="rounded-xl md:rounded-2xl border border-border/80 bg-card overflow-hidden shadow-2xl">
        {/* Chrome Bar */}
        <div className="flex items-center justify-between border-b border-border/50 bg-black/60 px-4 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/40 border border-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/40 border border-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/40 border border-green-500/60" />
          </div>

          <div className="font-mono text-[11px] text-muted-foreground/80">
            {projectId}.portal / {activeScreen.badge}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onZoom(activeIndex)}
              className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-white transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline">Zoom</span>
            </button>
            <div className="flex items-center gap-1 ml-1">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))
                }
                aria-label="Previous desktop screen"
                className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))
                }
                aria-label="Next desktop screen"
                className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Desktop Screen Image */}
        <div
          onClick={() => onZoom(activeIndex)}
          className="relative w-full bg-black overflow-hidden flex items-center justify-center cursor-zoom-in"
          style={{ aspectRatio: aspectRatio || "16 / 9" }}
        >
          <img
            src={activeScreen.src}
            alt={activeScreen.alt}
            loading="lazy"
            className="h-full w-full object-contain select-none"
          />
        </div>

        {/* Tab Selection Bar */}
        <div className="border-t border-border/40 bg-surface-hi/80 p-2.5 sm:p-3.5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {screenshots.map((s, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "border-white bg-white text-black font-semibold shadow-sm"
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

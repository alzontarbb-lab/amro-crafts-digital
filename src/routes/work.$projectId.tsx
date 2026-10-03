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

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const screenshots = project?.screenshots || [];
  const screenshotCount = screenshots.length;
  const metrics = project ? PROJECT_METRICS[project.id] || [] : [];

  // Adjacent projects for bottom pagination
  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  // Lightbox keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev > 0 ? prev - 1 : screenshots.length - 1) : null,
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev < screenshots.length - 1 ? prev + 1 : 0) : null,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, screenshots.length]);

  // Prevent background page scrolling when fullscreen lightbox modal is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxIndex]);

  const lightboxSwipe = useSwipe({
    onSwipeLeft: () => {
      if (lightboxIndex !== null && screenshots.length > 1) {
        setLightboxIndex((prev) => (prev! < screenshots.length - 1 ? prev! + 1 : 0));
      }
    },
    onSwipeRight: () => {
      if (lightboxIndex !== null && screenshots.length > 1) {
        setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : screenshots.length - 1));
      }
    },
  });

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
              projectId={project.id}
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

      {/* Fullscreen Lightbox Modal — Mobile-First Glass Translucent Controls */}
      {lightboxIndex !== null && screenshots[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot lightbox view"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 md:p-8 animate-in fade-in duration-200 touch-none overscroll-contain select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Header */}
          <div className="w-full max-w-6xl mx-auto flex items-center justify-between font-mono text-xs text-white/80 z-30 py-1">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold border border-white/15">
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(screenshots.length).padStart(2, "0")}
              </span>
              <span className="text-zinc-300 font-medium hidden sm:inline">
                {screenshots[lightboxIndex].badge}
              </span>
            </div>

            {/* Desktop Keyboard Cues */}
            <div className="hidden md:flex items-center gap-2.5 text-[11px] text-zinc-400 font-mono">
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/15 mr-1">
                  ←
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/15">
                  →
                </kbd>{" "}
                Navigate
              </span>
              <span className="text-zinc-600">·</span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/15">
                  Esc
                </kbd>{" "}
                Close
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close fullscreen inspection"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Showcase Stage with Glass Prev/Next Buttons */}
          <div
            {...lightboxSwipe}
            className="relative w-full max-w-6xl mx-auto flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden touch-pan-y"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass Translucent Prev Button */}
            {screenshots.length > 1 && (
              <GlassNavButton
                direction="left"
                label="Previous fullscreen image"
                onClick={() =>
                  setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : screenshots.length - 1))
                }
              />
            )}

            <div className="relative max-h-[75vh] max-w-[90vw] flex items-center justify-center">
              <BlurImage
                src={screenshots[lightboxIndex].src}
                alt={screenshots[lightboxIndex].alt}
                className="max-h-[72vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Glass Translucent Next Button */}
            {screenshots.length > 1 && (
              <GlassNavButton
                direction="right"
                label="Next fullscreen image"
                onClick={() =>
                  setLightboxIndex((prev) => (prev! < screenshots.length - 1 ? prev! + 1 : 0))
                }
              />
            )}
          </div>

          {/* Footer Legend */}
          <div
            className="w-full max-w-3xl mx-auto text-center z-30 pt-1 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-xl mx-auto">
              {screenshots[lightboxIndex].alt}
            </p>

            {screenshots.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar max-w-full px-2 py-1">
                {screenshots.map((s, idx) => {
                  const isCurrent = idx === lightboxIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Jump to ${s.badge}`}
                      onClick={() => setLightboxIndex(idx)}
                      className={`group relative shrink-0 rounded overflow-hidden transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-105 opacity-100"
                          : "opacity-40 hover:opacity-85 border border-white/20"
                      }`}
                      style={{
                        height: "36px",
                        width: project.screenshotMode === "mobile" ? "22px" : "48px",
                      }}
                      title={s.badge}
                    >
                      <img
                        src={s.src}
                        alt={s.badge}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Global cache for preloaded image URLs to avoid repeated blur flashing
const loadedImagesCache = new Set<string>();

/**
 * Mobile-First Blur Image with Progressive Color Blur Load
 * Renders an ambient blurred backdrop and smoothly unblurs into high-res clarity.
 */
function BlurImage({
  src,
  alt,
  className = "",
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(() => loadedImagesCache.has(src));

  useEffect(() => {
    if (loadedImagesCache.has(src)) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  return (
    <div
      onClick={onClick}
      className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black/60"
    >
      {/* Ambient Color Blur Placeholder Backdrop */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out flex items-center justify-center ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black" />
        <div className="w-3/5 h-3/5 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
      </div>

      {/* Main Image with Progressive Unblur and Fade */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        onLoad={() => {
          loadedImagesCache.add(src);
          setIsLoaded(true);
        }}
        className={`${className} transition-opacity duration-300 ease-out select-none ${
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
        }`}
        draggable={false}
      />
    </div>
  );
}

/**
 * Mobile-First Glass Translucent Navigation Button
 * Ergonomically sized (44-48px touch target) for easy thumb tapping.
 */
function GlassNavButton({
  direction,
  onClick,
  label,
  className = "",
}: {
  direction: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
  label: string;
  className?: string;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group absolute top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/45 hover:bg-black/75 active:scale-90 text-white/90 hover:text-white backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.65)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
        direction === "left" ? "left-2.5 sm:left-4" : "right-2.5 sm:right-4"
      } ${className}`}
    >
      <Icon className="h-6 w-6 stroke-[2.2] transition-transform duration-200 group-hover:scale-110" />
    </button>
  );
}

/**
 * Clean Unified Legend Below (Replaces Chunky Pills)
 */
function ShowcaseLegend({
  activeIndex,
  total,
  badge,
  caption,
  screenshots,
  isMobileRatio = false,
  onSelectIndex,
}: {
  activeIndex: number;
  total: number;
  badge: string;
  caption?: string;
  screenshots?: ProjectScreenshot[];
  isMobileRatio?: boolean;
  onSelectIndex: (idx: number) => void;
}) {
  return (
    <div className="border-t border-border/40 bg-card/60 backdrop-blur-md px-3.5 sm:px-6 py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4">
        {/* Index counter & Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="font-mono text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 shrink-0 tracking-wider">
            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs sm:text-sm font-medium text-foreground tracking-wide truncate">
            {badge}
          </span>
        </div>

        {/* Minimalist Progress Indicators */}
        {total > 1 && (
          <div
            className="flex items-center gap-1.5 shrink-0"
            role="tablist"
            aria-label="Screenshot navigation indicators"
          >
            {Array.from({ length: total }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to screenshot ${idx + 1}`}
                onClick={() => onSelectIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? "w-7 sm:w-8 bg-white"
                    : "w-2 sm:w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Descriptive Caption from alt */}
      {caption && (
        <p className="mt-2 text-xs sm:text-[13px] text-muted-foreground/90 font-sans leading-relaxed">
          {caption}
        </p>
      )}

      {/* Interactive Micro-Thumbnail Reel for multi-screenshot showcases */}
      {screenshots && screenshots.length > 1 && (
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {screenshots.map((s, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Switch to screen ${idx + 1}: ${s.badge}`}
                onClick={() => onSelectIndex(idx)}
                className={`group/thumb relative shrink-0 rounded-md overflow-hidden transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-[1.04] opacity-100"
                    : "opacity-45 hover:opacity-90 border border-white/10 hover:border-white/25"
                }`}
                style={{
                  height: isMobileRatio ? "44px" : "36px",
                  width: isMobileRatio ? "24px" : "58px",
                }}
                title={s.badge}
              >
                <img
                  src={s.src}
                  alt={s.badge}
                  className="w-full h-full object-cover object-top select-none"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Lightweight touch swipe gesture hook for fluid mobile navigation
 */
function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  minSwipeDistance = 45,
}: {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  minSwipeDistance?: number;
}) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only trigger if horizontal intent is decisive (at least 1.6x vertical movement)
    if (Math.abs(diffX) > Math.abs(diffY) * 1.6 && Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return { onTouchStart, onTouchEnd };
}

/**
 * Mobile Showcase Component
 * Features an interactive smartphone frame with glass translucent buttons,
 * progressive blur loading, touch swipe, and a clean legend below.
 */
function MobileShowcase({
  screenshots,
  projectId,
  onZoom,
}: {
  screenshots: ProjectScreenshot[];
  projectId: string;
  onZoom: (idx: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = screenshots[activeIndex] || screenshots[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
  });

  return (
    <section className="mb-12 sm:mb-20">
      <div className="mb-3 sm:mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Mobile Interface Screens ({screenshots.length} Screens · Touch Ergonomics)
          </h2>
        </div>

        <span className="font-mono text-xs text-muted-foreground/70">
          0{activeIndex + 1} / 0{screenshots.length}
        </span>
      </div>

      <div className="mx-auto max-w-sm sm:max-w-md">
        {/* Smartphone Chassis Frame */}
        <div className="relative rounded-[32px] sm:rounded-[40px] p-2.5 sm:p-3.5 bg-zinc-900 border border-zinc-700/80 shadow-2xl">
          {/* Top Notch / Dynamic Island Bar */}
          <div className="mb-2 flex items-center justify-between px-3 text-[11px] font-mono text-muted-foreground">
            <span className="text-zinc-400 truncate max-w-[200px]">{activeScreen.badge}</span>
            <button
              type="button"
              onClick={() => onZoom(activeIndex)}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer py-1 px-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </button>
          </div>

          {/* Interactive Screen Canvas with Glass Buttons & Blur Load */}
          <div
            {...swipeHandlers}
            style={{ aspectRatio: "9 / 18.5" }}
            className="group relative w-full overflow-hidden rounded-[24px] sm:rounded-[30px] bg-black shadow-inner flex items-center justify-center border border-white/5 cursor-zoom-in touch-pan-y select-none"
          >
            {/* Prev Glass Button */}
            {screenshots.length > 1 && (
              <GlassNavButton
                direction="left"
                label="Previous mobile screen"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
              />
            )}

            <BlurImage
              src={activeScreen.src}
              alt={activeScreen.alt}
              onClick={() => onZoom(activeIndex)}
              className="h-full w-full object-cover"
            />

            {/* Next Glass Button */}
            {screenshots.length > 1 && (
              <GlassNavButton
                direction="right"
                label="Next mobile screen"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              />
            )}
          </div>

          {/* Clean Legend Below (Replaces Chunky Pills) */}
          <ShowcaseLegend
            activeIndex={activeIndex}
            total={screenshots.length}
            badge={activeScreen.badge}
            caption={activeScreen.alt}
            screenshots={screenshots}
            isMobileRatio={true}
            onSelectIndex={(idx) => setActiveIndex(idx)}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Tablet Showcase Component
 * Features touchscreen tablet frame with glass translucent buttons,
 * progressive blur loading, touch swipe, and a clean legend below.
 */
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
  const activeScreen = screenshots[activeIndex] || screenshots[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
  });

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
          {/* Header Bar */}
          <div className="mb-2 flex items-center justify-between px-2 text-[11px] font-mono text-muted-foreground">
            <span className="text-zinc-400">
              Depot Tablet · {projectId} · {activeScreen.badge}
            </span>
            <button
              type="button"
              onClick={() => onZoom(activeIndex)}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer py-1 px-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </button>
          </div>

          {/* Interactive Screen Canvas with Glass Buttons & Blur Load */}
          <div
            {...swipeHandlers}
            style={{ aspectRatio: aspectRatio || "881 / 914" }}
            className="group relative w-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-black shadow-inner flex items-center justify-center border border-white/5 cursor-zoom-in touch-pan-y select-none"
          >
            {/* Prev Glass Button */}
            {screenshots.length > 1 && (
              <GlassNavButton
                direction="left"
                label="Previous tablet screen"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
              />
            )}

            <BlurImage
              src={activeScreen.src}
              alt={activeScreen.alt}
              onClick={() => onZoom(activeIndex)}
              className="h-full w-full object-contain"
            />

            {/* Next Glass Button */}
            {screenshots.length > 1 && (
              <GlassNavButton
                direction="right"
                label="Next tablet screen"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              />
            )}
          </div>

          {/* Clean Legend Below (Replaces Chunky Pills) */}
          <ShowcaseLegend
            activeIndex={activeIndex}
            total={screenshots.length}
            badge={activeScreen.badge}
            caption={activeScreen.alt}
            screenshots={screenshots}
            isMobileRatio={false}
            onSelectIndex={(idx) => setActiveIndex(idx)}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Desktop Showcase Component
 * Features desktop browser frame with glass translucent buttons,
 * progressive blur loading, touch swipe, and a clean legend below.
 */
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
  const activeScreen = screenshots[activeIndex] || screenshots[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
  });

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

          <div className="font-mono text-[11px] text-muted-foreground/80 truncate px-2">
            {projectId}.portal / {activeScreen.badge}
          </div>

          <button
            type="button"
            onClick={() => onZoom(activeIndex)}
            className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-white transition-colors cursor-pointer py-1 px-1.5"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zoom</span>
          </button>
        </div>

        {/* Active Desktop Screen Canvas with Glass Buttons & Blur Load */}
        <div
          {...swipeHandlers}
          style={{ aspectRatio: aspectRatio || "16 / 9" }}
          className="group relative w-full bg-black overflow-hidden flex items-center justify-center cursor-zoom-in touch-pan-y select-none"
        >
          {/* Glass Prev Button */}
          {screenshots.length > 1 && (
            <GlassNavButton
              direction="left"
              label="Previous desktop screen"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            />
          )}

          <BlurImage
            src={activeScreen.src}
            alt={activeScreen.alt}
            onClick={() => onZoom(activeIndex)}
            className="h-full w-full object-contain"
          />

          {/* Glass Next Button */}
          {screenshots.length > 1 && (
            <GlassNavButton
              direction="right"
              label="Next desktop screen"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            />
          )}
        </div>

        {/* Clean Legend Below (Replaces Chunky Pills) */}
        <ShowcaseLegend
          activeIndex={activeIndex}
          total={screenshots.length}
          badge={activeScreen.badge}
          caption={activeScreen.alt}
          screenshots={screenshots}
          isMobileRatio={false}
          onSelectIndex={(idx) => setActiveIndex(idx)}
        />
      </div>
    </section>
  );
}

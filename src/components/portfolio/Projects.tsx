import { useState, useEffect, useMemo } from "react";
import { Reveal, SectionHeader } from "./Reveal";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projects, Project } from "@/data/projects";

const STORAGE_KEY = "portfolio_show_all_projects";
const LAST_PROJECT_KEY = "portfolio_last_clicked_project";
const INITIAL_COUNT = 4;

type TabId = "all" | "enterprise" | "commercial" | "internal";

interface FilterTab {
  id: TabId;
  label: string;
  mobileLabel: string;
  count: number;
}

const BRAND_HOVER: Record<string, { border: string; glow: string; accent: string }> = {
  "field-dispatch": {
    border: "hover:border-emerald-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(16,185,129,0.14)]",
    accent: "group-hover:text-emerald-400",
  },
  "market-dash": {
    border: "hover:border-amber-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(245,158,11,0.14)]",
    accent: "group-hover:text-amber-400",
  },
  "fragrance-storefront": {
    border: "hover:border-zinc-300/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(255,255,255,0.08)]",
    accent: "group-hover:text-zinc-200",
  },
  "retail-pos": {
    border: "hover:border-violet-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(139,92,246,0.14)]",
    accent: "group-hover:text-violet-400",
  },
  "ula-claims": {
    border: "hover:border-sky-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(14,165,233,0.14)]",
    accent: "group-hover:text-sky-400",
  },
  "case-file": {
    border: "hover:border-amber-600/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(217,119,6,0.14)]",
    accent: "group-hover:text-amber-400",
  },
  "invoice-maker": {
    border: "hover:border-cyan-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(6,182,212,0.14)]",
    accent: "group-hover:text-cyan-400",
  },
  "parts-intake": {
    border: "hover:border-teal-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(20,184,166,0.14)]",
    accent: "group-hover:text-teal-400",
  },
  "contracts-portal": {
    border: "hover:border-indigo-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(99,102,241,0.14)]",
    accent: "group-hover:text-indigo-400",
  },
  "python-automation": {
    border: "hover:border-slate-400/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(148,163,184,0.14)]",
    accent: "group-hover:text-slate-300",
  },
};

export function Projects() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [showAll, setShowAll] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem(STORAGE_KEY) === "true";
      } catch {
        return false;
      }
    }
    return false;
  });

  const [hiding, setHiding] = useState(false);

  // Filter projects by active tab
  const filteredProjects = useMemo(() => {
    if (activeTab === "enterprise") {
      return projects.filter((p) => p.tag === "Enterprise Operations");
    }
    if (activeTab === "commercial") {
      return projects.filter((p) => p.tag === "Commercial / Web" || p.tag === "Commercial POS");
    }
    if (activeTab === "internal") {
      return projects.filter(
        (p) => p.tag === "Internal / Production" || p.tag === "Automation / Data",
      );
    }
    return projects;
  }, [activeTab]);

  const tabs: FilterTab[] = useMemo(
    () => [
      { id: "all", label: "All Work", mobileLabel: "All", count: projects.length },
      {
        id: "enterprise",
        label: "Enterprise Operations",
        mobileLabel: "Enterprise",
        count: projects.filter((p) => p.tag === "Enterprise Operations").length,
      },
      {
        id: "commercial",
        label: "Commercial Web & POS",
        mobileLabel: "Commercial",
        count: projects.filter((p) => p.tag === "Commercial / Web" || p.tag === "Commercial POS")
          .length,
      },
      {
        id: "internal",
        label: "Internal & Automation",
        mobileLabel: "Internal",
        count: projects.filter(
          (p) => p.tag === "Internal / Production" || p.tag === "Automation / Data",
        ).length,
      },
    ],
    [],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const lastId = sessionStorage.getItem(LAST_PROJECT_KEY);
        if (lastId) {
          const projectIndex = projects.findIndex((p) => p.id === lastId);
          if (projectIndex >= INITIAL_COUNT && !showAll) {
            setShowAll(true);
            sessionStorage.setItem(STORAGE_KEY, "true");
          }
          requestAnimationFrame(() => {
            setTimeout(() => {
              const target = document.getElementById(`project-${lastId}`);
              if (target) {
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
              sessionStorage.removeItem(LAST_PROJECT_KEY);
            }, 80);
          });
        }
      } catch {
        // Ignore storage access errors
      }
    }
  }, [showAll]);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Ignore storage access errors
      }
    } else {
      setHiding(true);
      const workSection = document.getElementById("work");
      if (workSection) {
        const top = workSection.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      const extraCount = projects.length - INITIAL_COUNT;
      const totalDuration = extraCount * 50 + 380;
      setTimeout(() => {
        setShowAll(false);
        setHiding(false);
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore storage access errors
        }
      }, totalDuration);
    }
  };

  // When filtering by specific category, show all matching items
  const isFiltered = activeTab !== "all";
  const displayedProjects = isFiltered
    ? filteredProjects
    : showAll || hiding
      ? filteredProjects
      : filteredProjects.slice(0, INITIAL_COUNT);

  const extraCount = filteredProjects.length - INITIAL_COUNT;

  return (
    <section id="work" className="relative py-12 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="04"
          label="Selected Work"
          title="Engineered for real-world operations."
        />

        <p className="-mt-4 md:-mt-10 mb-6 md:mb-8 text-xs sm:text-base text-muted-foreground leading-relaxed">
          Click any project to explore its case study, system architecture, and operational
          breakdown.
        </p>

        {/* Minimalist Mobile-Optimized Tab Navigation — Edge-to-Edge Touch Scroll */}
        <div className="border-b border-border/40 mb-6 sm:mb-10 pb-2.5 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-3 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative font-mono text-xs uppercase tracking-wider transition-colors pb-1.5 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground/80 hover:text-foreground"
                  }`}
                >
                  <span className="sm:hidden">{tab.mobileLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive ? "bg-foreground/10 text-foreground" : "text-muted-foreground/50"
                    }`}
                  >
                    {tab.count}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-7">
          {displayedProjects.map((p, i) => {
            const isExtra = !isFiltered && i >= INITIAL_COUNT;
            const staggerDelay = isExtra ? (i - INITIAL_COUNT) * 50 : (i % 2) * 0.06;

            const cardElement = (
              <div
                key={p.id}
                id={`project-card-${i}`}
                style={
                  isExtra
                    ? {
                        animationDelay: `${staggerDelay}ms`,
                        animationFillMode: "both",
                        animationDuration: "320ms",
                        animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        animationName: hiding ? "cardExit" : "cardEnter",
                      }
                    : undefined
                }
              >
                <ProjectCard project={p} />
              </div>
            );

            if (isExtra) {
              return cardElement;
            }

            return (
              <Reveal key={p.id} delay={staggerDelay}>
                {cardElement}
              </Reveal>
            );
          })}
        </div>

        {/* Show More / Show Less Toggle (Only for "All Work" tab) */}
        {!isFiltered && projects.length > INITIAL_COUNT && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleToggle}
              disabled={hiding}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all py-2.5 px-5 rounded-full border border-white/10 hover:border-white/30 bg-surface/70 hover:bg-surface-hi shadow-sm cursor-pointer disabled:pointer-events-none"
            >
              <span>{showAll || hiding ? "Show less" : `Show more work (${extraCount})`}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  showAll && !hiding ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardExit {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(16px); }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const handleClick = () => {
    try {
      sessionStorage.setItem(LAST_PROJECT_KEY, project.id);
    } catch {
      // Ignore storage access errors
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const cover = project.coverImage || project.screenshots?.[0]?.src;
  const brand = BRAND_HOVER[project.id] || {
    border: "hover:border-foreground/30",
    glow: "",
    accent: "group-hover:text-foreground",
  };

  return (
    <Link
      to="/work/$projectId"
      params={{ projectId: project.id }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      id={`project-${project.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl md:rounded-2xl project-card border border-border/70 bg-card cursor-pointer transition-all duration-300 ${brand.border} ${brand.glow}`}
    >
      {/* P2: Interactive Ambient Spotlight Hover Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 rounded-xl md:rounded-2xl"
        style={{
          background:
            "radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 45%)",
        }}
        aria-hidden="true"
      />

      {/* Visual Banner: Screenshots OR P4 Styled Terminal Canvas for Internal Tools */}
      {cover ? (
        <div className="relative w-full bg-card">
          {/* Gentle low gradient extending past the bottom to bridge seamlessly */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-2 h-20 sm:h-24 bg-gradient-to-t from-[var(--card)] from-20% via-[var(--card)]/75 via-60% to-transparent z-10 pointer-events-none"
          />

          {project.screenshotMode === "mobile" ? (
            <div className="w-full aspect-[16/8] sm:aspect-[16/7.5] p-2.5 sm:p-3.5 flex items-center justify-center gap-2.5 sm:gap-4 overflow-hidden">
              {project.screenshots && project.screenshots.length >= 2 ? (
                <>
                  <img
                    src={project.screenshots[0].src}
                    alt={project.screenshots[0].alt}
                    className="h-full w-auto max-h-[94%] object-contain rounded-lg shadow-2xl border border-white/10 group-hover:-translate-y-1 group-hover:scale-[1.02] transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                  <img
                    src={project.screenshots[1].src}
                    alt={project.screenshots[1].alt}
                    className="h-full w-auto max-h-[94%] object-contain rounded-lg shadow-2xl border border-white/10 group-hover:-translate-y-1 group-hover:scale-[1.02] transition-all duration-500 ease-out delay-75"
                    loading="lazy"
                  />
                </>
              ) : (
                <img
                  src={cover}
                  alt={project.title}
                  className="h-full w-auto max-h-[92%] object-contain rounded-md shadow-2xl border border-white/10 group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              )}
            </div>
          ) : project.screenshotMode === "tablet" ? (
            <div className="w-full aspect-[16/8] sm:aspect-[16/7.5] p-2.5 sm:p-3.5 flex items-center justify-center overflow-hidden">
              <img
                src={cover}
                alt={project.title}
                className="h-full w-auto max-h-[94%] object-contain rounded-md shadow-2xl border border-white/10 group-hover:scale-[1.025] transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full aspect-[16/8] sm:aspect-[16/7.5] overflow-hidden">
              <img
                src={cover}
                alt={project.title}
                className="w-full h-full object-cover object-top origin-top group-hover:scale-[1.02] transition-transform duration-500 ease-out block"
                loading="lazy"
              />
            </div>
          )}
        </div>
      ) : project.id === "contracts-portal" ? (
        /* P4: Internal Tool Terminal Blueprint for Contracts Portal */
        <div className="w-full aspect-[16/8] sm:aspect-[16/7.5] bg-[#070b12] border-b border-border/30 p-3 sm:p-5 font-mono flex flex-col justify-between overflow-hidden relative select-none">
          <div className="flex items-center justify-between text-[10px] text-indigo-400/90 border-b border-indigo-500/20 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>ocr_engine.service · SLA Pipeline v2.4</span>
            </div>
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider">
              Internal OCR Engine
            </span>
          </div>
          <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-[11px] leading-relaxed py-1 text-zinc-300">
            <p className="text-zinc-500">&gt; INGEST /pdf/invoices/inv_2026_0412.pdf --ocr</p>
            <p className="text-emerald-400/90">✓ PARSED: Machinery S/N: FGW-884920 | 250 KVA</p>
            <p className="text-indigo-300">✓ SLA STATUS: Tier-1 Standby Coverage (Renew: 42d)</p>
            <p className="text-zinc-400">→ LOCKED: Subscription calendar auto-updated</p>
          </div>
          <div className="flex items-center justify-between text-[9px] text-zinc-600 font-mono pt-1.5 border-t border-white/5">
            <span>Daemon: ocr-worker-1</span>
            <span className="text-indigo-400/70">SLA Matrix Active</span>
          </div>
        </div>
      ) : project.id === "python-automation" ? (
        /* P4: Internal Tool Terminal Blueprint for Python Automation */
        <div className="w-full aspect-[16/8] sm:aspect-[16/7.5] bg-[#080d0d] border-b border-border/30 p-3 sm:p-5 font-mono flex flex-col justify-between overflow-hidden relative select-none">
          <div className="flex items-center justify-between text-[10px] text-emerald-400/90 border-b border-emerald-500/20 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>cron_daemon · pandas_etl_pipeline.py</span>
            </div>
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider">
              Scheduled 06:00 UTC
            </span>
          </div>
          <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-[11px] leading-relaxed py-1 text-zinc-300">
            <p className="text-zinc-500">&gt; pd.read_csv('/exports/raw_operations_*.csv')</p>
            <p className="text-emerald-400/90">
              ✓ INGESTED: 14 operational tables (42,890 records)
            </p>
            <p className="text-teal-300">✓ ANOMALY CHECK: 0 deviation errors detected</p>
            <p className="text-zinc-400">→ DISPATCHED: Automated KPI summary to Slack & Mail</p>
          </div>
          <div className="flex items-center justify-between text-[9px] text-zinc-600 font-mono pt-1.5 border-t border-white/5">
            <span>Schedule: 0 6 * * *</span>
            <span className="text-emerald-400/70">Saves ~10 hrs/wk</span>
          </div>
        </div>
      ) : null}

      {/* Card Body */}
      <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-1 justify-between relative z-20">
        <div>
          {/* Header Metadata — Pure Typography, Without Badges */}
          <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-4">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/80">
              {project.tag}
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-muted-foreground/60">
              {project.year}
            </span>
          </div>

          <h3 className="font-display text-base sm:text-xl md:text-2xl font-medium mb-1.5 sm:mb-2 text-foreground group-hover:text-foreground transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight
              className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2 ${brand.accent}`}
            />
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed text-pretty mb-4 sm:mb-6 max-w-xl">
            {project.blurb}
          </p>
        </div>

        {/* Footer — Clean Minimal Monospace, Without Badges */}
        <div className="flex items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-border/40 mt-auto">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-[11px] font-mono text-muted-foreground/70">
            {project.tech.slice(0, 3).map((t, idx) => (
              <span key={t} className="flex items-center gap-1.5 sm:gap-2">
                {idx > 0 && <span className="text-muted-foreground/25 select-none">·</span>}
                <span>{t}</span>
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-muted-foreground/40">+{project.tech.length - 3}</span>
            )}
          </div>
          <span
            className={`text-[11px] sm:text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1 shrink-0 ${brand.accent}`}
          >
            <span>Case Study</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

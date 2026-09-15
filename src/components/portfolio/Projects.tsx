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
  count: number;
}

const BRAND_HOVER: Record<string, { border: string; glow: string }> = {
  "field-dispatch": {
    border: "hover:border-emerald-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(16,185,129,0.14)]",
  },
  "market-dash": {
    border: "hover:border-amber-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(245,158,11,0.14)]",
  },
  "fragrance-storefront": {
    border: "hover:border-zinc-300/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(255,255,255,0.08)]",
  },
  "retail-pos": {
    border: "hover:border-violet-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(139,92,246,0.14)]",
  },
  "ula-claims": {
    border: "hover:border-sky-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(14,165,233,0.14)]",
  },
  "case-file": {
    border: "hover:border-amber-600/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(217,119,6,0.14)]",
  },
  "invoice-maker": {
    border: "hover:border-cyan-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(6,182,212,0.14)]",
  },
  "parts-intake": {
    border: "hover:border-teal-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(20,184,166,0.14)]",
  },
  "contracts-portal": {
    border: "hover:border-indigo-500/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(99,102,241,0.14)]",
  },
  "python-automation": {
    border: "hover:border-slate-400/40",
    glow: "hover:shadow-[0_0_35px_-8px_rgba(148,163,184,0.14)]",
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
        (p) => p.tag === "Internal / Production" || p.tag === "Automation / Data"
      );
    }
    return projects;
  }, [activeTab]);

  const tabs: FilterTab[] = useMemo(
    () => [
      { id: "all", label: "All Work", count: projects.length },
      {
        id: "enterprise",
        label: "Enterprise Operations",
        count: projects.filter((p) => p.tag === "Enterprise Operations").length,
      },
      {
        id: "commercial",
        label: "Commercial Web & POS",
        count: projects.filter((p) => p.tag === "Commercial / Web" || p.tag === "Commercial POS").length,
      },
      {
        id: "internal",
        label: "Internal & Automation",
        count: projects.filter(
          (p) => p.tag === "Internal / Production" || p.tag === "Automation / Data"
        ).length,
      },
    ],
    []
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
      } catch {}
    }
  }, [showAll]);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {}
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
        } catch {}
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
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader index="04" label="Selected Work" title="Engineered for real-world operations." />

        <p className="-mt-4 md:-mt-10 mb-6 md:mb-8 text-sm sm:text-base text-muted-foreground">
          Click any project to explore its case study, system architecture, and operational breakdown.
        </p>

        {/* Minimalist Tab Navigation — Pure Typography, No Badges */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar border-b border-border/40 mb-8 sm:mb-10 pb-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group relative font-mono text-xs uppercase tracking-wider transition-colors pb-2 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground/80 hover:text-foreground"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] ${isActive ? "text-foreground/70" : "text-muted-foreground/50"}`}>
                  {tab.count}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
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
    } catch {}
  };

  const cover = project.coverImage || project.screenshots?.[0]?.src;
  const brand = BRAND_HOVER[project.id] || {
    border: "hover:border-foreground/30",
    glow: "",
  };

  return (
    <Link
      to="/work/$projectId"
      params={{ projectId: project.id }}
      onClick={handleClick}
      id={`project-${project.id}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl md:rounded-2xl project-card border border-border/70 bg-card cursor-pointer transition-all duration-300 ${brand.border} ${brand.glow}`}
    >
      {/* Visual Preview Banner (Flagship Screenshot) */}
      {cover && (
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] overflow-hidden bg-black/40 border-b border-border/30">
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80 z-10 pointer-events-none" />

          {project.screenshotMode === "mobile" ? (
            <div className="w-full h-full p-3.5 sm:p-4 flex items-center justify-center bg-radial from-white/[0.03] to-transparent">
              <img
                src={cover}
                alt={project.title}
                className="h-full w-auto max-h-[88%] object-contain rounded-md shadow-2xl border border-white/10 group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
          ) : project.screenshotMode === "tablet" ? (
            <div className="w-full h-full p-3 sm:p-4 flex items-center justify-center bg-radial from-white/[0.03] to-transparent">
              <img
                src={cover}
                alt={project.title}
                className="h-full w-auto max-h-[92%] object-contain rounded-md shadow-2xl border border-white/10 group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
          ) : (
            <img
              src={cover}
              alt={project.title}
              className="w-full h-full object-cover object-top group-hover:scale-[1.025] transition-transform duration-500 ease-out"
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1 justify-between">
        <div>
          {/* Header Metadata — Pure Typography, Without Badges */}
          <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/80">
              {project.tag}
            </span>
            <span className="font-mono text-xs text-muted-foreground/60">{project.year}</span>
          </div>

          <h3 className="font-display text-lg sm:text-xl md:text-2xl font-medium mb-2 text-foreground group-hover:text-foreground transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-muted-foreground shrink-0 ml-2" />
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-pretty mb-5 sm:mb-6 max-w-xl">
            {project.blurb}
          </p>
        </div>

        {/* Footer — Clean Minimal Monospace, Without Badges */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/40 mt-auto">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-muted-foreground/70">
            {project.tech.slice(0, 3).map((t, idx) => (
              <span key={t} className="flex items-center gap-2">
                {idx > 0 && <span className="text-muted-foreground/25 select-none">·</span>}
                <span>{t}</span>
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-muted-foreground/40">+{project.tech.length - 3}</span>
            )}
          </div>
          <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1 shrink-0">
            <span>Case Study</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

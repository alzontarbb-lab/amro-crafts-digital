import { useState, useEffect } from "react";
import { Reveal, SectionHeader } from "./Reveal";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projects, Project } from "@/data/projects";

const STORAGE_KEY = "portfolio_show_all_projects";
const LAST_PROJECT_KEY = "portfolio_last_clicked_project";

const INITIAL_COUNT = 4;

export function Projects() {
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
      // Scroll back to the work section header immediately as exit animation plays
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

  const extraProjects = projects.slice(INITIAL_COUNT);
  const initialProjects = projects.slice(0, INITIAL_COUNT);

  return (
    <section id="work" className="relative py-12 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader index="04" label="Selected Work" title="Built because something needed building." />

        <p className="-mt-4 md:-mt-10 mb-6 md:mb-8 text-sm sm:text-base text-muted-foreground">
          Click any project to explore its case study, system architecture, and operational breakdown.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {initialProjects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.06}>
              <div id={`project-card-${i}`}>
                <ProjectCard project={p} />
              </div>
            </Reveal>
          ))}

          {(showAll || hiding) &&
            extraProjects.map((p, i) => {
              const staggerDelay = i * 50;
              return (
                <div
                  key={p.id}
                  id={`project-card-${INITIAL_COUNT + i}`}
                  style={{
                    animationDelay: `${staggerDelay}ms`,
                    animationFillMode: "both",
                    animationDuration: "320ms",
                    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    animationName: hiding ? "cardExit" : "cardEnter",
                  }}
                >
                  <ProjectCard project={p} />
                </div>
              );
            })}
        </div>

        {projects.length > INITIAL_COUNT && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleToggle}
              disabled={hiding}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all py-2.5 px-5 rounded-full border border-white/10 hover:border-white/30 bg-surface/70 hover:bg-surface-hi shadow-sm cursor-pointer disabled:pointer-events-none"
            >
              <span>{showAll || hiding ? "Show less" : `Show more work (${projects.length - INITIAL_COUNT})`}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${showAll && !hiding ? "rotate-180" : ""}`}
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

  return (
    <Link
      to="/work/$projectId"
      params={{ projectId: project.id }}
      onClick={handleClick}
      id={`project-${project.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl md:rounded-2xl project-card border border-border/80 bg-card p-5 sm:p-6 md:p-8 cursor-pointer hover:border-foreground/30 transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-border bg-transparent text-muted-foreground">
              {project.tag}
            </span>
          </div>
          <span className="font-mono text-xs text-muted-foreground/70">{project.year}</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-medium mb-2 text-foreground group-hover:text-foreground transition-colors flex items-center justify-between">
          <span>{project.title}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-muted-foreground shrink-0 ml-2" />
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-pretty mb-5 sm:mb-6 max-w-xl">
          {project.blurb}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/40 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono text-muted-foreground/90 px-2 py-0.5 rounded bg-foreground/5 whitespace-nowrap"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[11px] font-mono text-muted-foreground/60 px-1.5 py-0.5">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
          Case Study →
        </span>
      </div>
    </Link>
  );
}

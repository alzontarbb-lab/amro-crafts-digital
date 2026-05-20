import { Reveal, SectionHeader } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  blurb: string;
  tech: string[];
  tag: "Internal / Production" | "Freelance / In Progress" | "Meta / This One";
  year: string;
};

const projects: Project[] = [
  {
    title: "Scheduling & Dispatch Web App",
    blurb:
      "Replaced manual scheduling chaos with a web platform for job assignments and technician dispatch — built independently for an aftersales operation.",
    tech: ["React", "Vite", "PHP", "MySQL"],
    tag: "Internal / Production",
    year: "2025",
  },
  {
    title: "Spare Parts Digital Intake",
    blurb:
      "A parts request and tracking portal built from scratch. Replaced paper-based intake with a digital workflow — still running in production today.",
    tech: ["PHP", "MySQL"],
    tag: "Internal / Production",
    year: "2025",
  },
  {
    title: "Maintenance Contract Portal",
    blurb:
      "End-to-end portal to manage service contracts, renewals, and customer records — entirely self-initiated to solve a real business gap.",
    tech: ["PHP", "MySQL"],
    tag: "Internal / Production",
    year: "2025",
  },
  {
    title: "Python Automation Suite",
    blurb:
      "Internal scripts for repetitive operational tasks. Quietly saves hours of manual work every week.",
    tech: ["Python", "Automation"],
    tag: "Internal / Production",
    year: "2025",
  },
  {
    title: "Cross-Platform Mobile Business App",
    blurb:
      "Shipping a production mobile application for a freelance client under NDA. Full-stack — mobile, API, database.",
    tech: ["Flutter", "Dart", "PHP", "MySQL"],
    tag: "Freelance / In Progress",
    year: "2026",
  },
];

export function Projects() {
  return (
    <section id="work" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader index="04" label="Selected Work" title="Things I built, mostly unprompted." />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isFreelance = project.tag === "Freelance / In Progress";
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl glass p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:ring-teal-glow ${
        index === 4 ? "md:col-span-2" : ""
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mesh-bg"
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-6">
          <span
            className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${
              isFreelance
                ? "border-success/40 text-success"
                : "border-teal/40 text-teal"
            }`}
          >
            {project.tag}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-medium mb-3 group-hover:text-teal transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-pretty mb-8 max-w-xl">{project.blurb}</p>

        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-muted-foreground px-2 py-1 rounded-md bg-foreground/5"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
            Details on request
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
}

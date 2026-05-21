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
      "Replaced manual scheduling chaos with a web platform for job assignments and technician dispatch — built independently for an aftersales operation. Google OAuth for sign-in, Postgres RLS for per-role access.",
    tech: ["React", "Vite", "Supabase", "Postgres (RLS)", "OAuth"],
    tag: "Internal / Production",
    year: "2025",
  },
  {
    title: "Spare Parts Digital Intake",
    blurb:
      "A parts request and tracking portal built from scratch. Replaced paper-based intake with a digital workflow, with Google OAuth sign-in and automated email notifications on every submission — still running in production today.",
    tech: ["React", "Vite", "OAuth", "EmailJS"],
    tag: "Internal / Production",
    year: "2025",
  },
  {
    title: "Maintenance Contract Portal",
    blurb:
      "End-to-end portal to manage service contracts, renewals, and customer records — entirely self-initiated to solve a real business gap. React frontend backed by a Python service layer.",
    tech: ["React", "Python"],
    tag: "Internal / Production",
    year: "2025",
  },
  {
    title: "Python Automation Suite",
    blurb:
      "Internal scripts for repetitive operational work plus reporting jobs that pull from raw data sources, analyze them, and return clean reports — KPIs, anomalies, summaries — on a schedule. Quietly saves hours of manual work every week.",
    tech: ["Python", "Pandas", "Automation", "Reporting"],
    tag: "Internal / Production",
    year: "2025",
  },
  {
    title: "This Website",
    blurb:
      "A meta addition to the portfolio — the very page you're scrolling right now. Built to be fast, responsive, and just a little self-aware.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    tag: "Meta / This One",
    year: "2026",
  },
];

export function Projects() {
  return (
    <section id="work" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader index="04" label="Selected Work" title="Built because something needed building." />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isFreelance = project.tag === "Freelance / In Progress";
  const isMeta = project.tag === "Meta / This One";
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl glass p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:ring-teal-glow ${
        isMeta ? "md:col-span-2" : ""
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
                : isMeta
                  ? "border-foreground/20 text-foreground"
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

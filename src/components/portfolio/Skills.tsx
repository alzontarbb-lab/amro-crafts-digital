import { Reveal, SectionHeader } from "./Reveal";
import { motion } from "motion/react";

const groups = [
  {
    index: "01",
    label: "Core Web Applications",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "State Architecture"],
  },
  {
    index: "02",
    label: "Backend & Databases",
    items: ["PHP / Laravel", "Python", "Supabase", "PostgreSQL (RLS)", "MySQL", "REST APIs"],
  },
  {
    index: "03",
    label: "Automation & AI Pipelines",
    items: [
      "Python Scripts",
      "LLM Integration",
      "Automated Reporting",
      "Scheduled Cron",
      "Email Triggers",
    ],
  },
  {
    index: "04",
    label: "Systems & Security",
    items: ["Row-Level Security", "OAuth 2.0 Sign-In", "Offline-First POS", "Role-Based Access"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-12 md:py-28 bg-surface/30">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader index="03" label="Capabilities" title="The stack behind the systems." />

        {/* Compact, mobile-first grid layout — eliminates vertical dead space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {groups.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 0.05}>
              <div className="group rounded-xl border border-border/70 bg-card/60 p-4 md:p-5 hover:border-foreground/30 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] text-muted-foreground/70 tracking-wider">
                    {g.index}
                  </span>
                  <div className="h-2 w-px bg-border" />
                  <h3 className="font-display text-sm md:text-base font-medium text-foreground tracking-tight">
                    {g.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {g.items.map((it, i) => (
                    <motion.span
                      key={it}
                      initial={{ opacity: 0, y: 4 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02, duration: 0.3 }}
                      className="px-2.5 py-1 rounded-md border border-border/80 bg-background/80 text-xs font-mono text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-colors cursor-default"
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Frontier & Agentic Tooling — Minimalist Grey Chrome Strip */}
        <Reveal delay={0.25}>
          <div className="mt-4 sm:mt-5 p-3.5 sm:p-4 rounded-xl border border-border/70 bg-card/40">
            {/* Specular Grey Chrome Gradient Definition */}
            <svg
              className="absolute w-0 h-0 pointer-events-none"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id="chrome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#E4E4E7" />
                  <stop offset="60%" stopColor="#A1A1AA" />
                  <stop offset="85%" stopColor="#D4D4D8" />
                  <stop offset="100%" stopColor="#71717A" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground/70">
                Frontier &amp; Engineering Tooling
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5">
              {frontierTools.map((t) => (
                <div
                  key={t.name}
                  className="group flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-lg border border-border/60 bg-background/60 hover:border-zinc-400/40 hover:bg-background/90 transition-all cursor-default"
                >
                  <div className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 group-hover:brightness-125">
                    {t.icon}
                  </div>
                  <span className="font-mono text-xs text-foreground/80 group-hover:text-foreground transition-colors font-medium truncate">
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const frontierTools = [
  {
    name: "Claude Code",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="m4.714 15.956 4.718-2.648.079-.23-.079-.128h-.23l-.79-.049-2.695-.073-2.338-.097-2.264-.121-.571-.122-.534-.704.054-.352.48-.322.686.06 1.518.104 2.277.158 1.651.097 2.447.255h.388l.055-.158-.134-.097-.103-.097-2.531-1.782-2.55-1.688-1.336-.971-.722-.492-.365-.461-.158-1.008.656-.723.88.061.225.06.892.687 1.907 1.475 2.49 1.834.363.303.146-.103.018-.073-.164-.273-1.354-2.447-1.445-2.49-.643-1.031-.17-.62a3.46 3.46 0 0 1-.104-.728L6.287.133 6.7 0l.995.134.42.364.619 1.415 1.001 2.228 1.555 3.03.455.898.243.832.091.255h.158v-.146l.128-1.706.236-2.094.231-2.696.079-.759.376-.91.747-.492.583.28.48.685-.067.443-.285 1.852-.559 2.902-.364 1.943h.212l.243-.243.984-1.305 1.651-2.064.729-.82.85-.905.546-.43h1.032l.759 1.129-.34 1.165-1.062 1.348-.88 1.142-1.263 1.7-.79 1.36.073.109.188-.018 2.854-.607 1.542-.28 1.84-.315.831.388.092.395-.328.807-1.967.486-2.307.461-3.437.814-.042.03.048.061 1.549.146.661.036h1.621l3.018.225.789.522.474.638-.079.485-1.214.62-1.64-.39-3.824-.91-1.312-.328h-.182v.11l1.093 1.068 2.003 1.809 2.508 2.331.127.577-.321.455-.34-.048-2.204-1.658-.85-.747-1.925-1.621h-.128v.17l.444.65 2.343 3.521.122 1.08-.17.353-.608.212-.667-.121-1.373-1.925-1.503-2.046-1.141-1.943-.14.079-.674 7.255-.315.37-.729.28-.607-.462-.322-.746.322-1.476.388-1.924.316-1.53.285-1.9.17-.632-.012-.042-.14.018-1.433 1.967-2.179 2.945-1.725 1.846-.412.164-.717-.37.067-.662.401-.589 2.386-3.036 1.439-1.882.929-1.086-.006-.158h-.055l-6.338 4.116-1.13.146-.485-.455.06-.747.231-.243 1.906-1.311Z" />
      </svg>
    ),
  },
  {
    name: "OpenAI Codex",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.493zm-9.66-4.65a4.471 4.471 0 0 1-.534-3.013l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.842-3.369v2.332a.08.08 0 0 1-.033.064l-4.83 2.79a4.5 4.5 0 0 1-6.15-1.648zm-1.12-9.61a4.476 4.476 0 0 1 2.342-1.972V11.8a.78.78 0 0 0 .388.677l5.83 3.37-2.02 1.168a.078.078 0 0 1-.073 0l-4.83-2.79A4.504 4.504 0 0 1 2.48 8.17zm16.597 3.855l-5.833-3.37 2.019-1.168a.078.078 0 0 1 .073 0l4.83 2.79a4.499 4.499 0 0 1-.676 8.105v-5.68a.79.79 0 0 0-.413-.677zm2.01-3.023l-.141-.085-4.779-2.76a.776.776 0 0 0-.785 0L9.54 9.527V7.195a.08.08 0 0 1 .033-.064l4.83-2.79a4.5 4.5 0 0 1 6.677 4.56zM10.74 1.57a4.499 4.499 0 0 1 4.494 4.493v5.679a.79.79 0 0 0 .413.677l5.833 3.37-2.019 1.168a.078.078 0 0 1-.073 0l-4.83-2.79a4.504 4.504 0 0 1-3.818-12.597zm-.437 6.442l3.35 1.934a.08.08 0 0 1 0 .138l-3.35 1.934a.08.08 0 0 1-.12-.069V8.08a.08.08 0 0 1 .12-.068z" />
      </svg>
    ),
  },
  {
    name: "Cursor",
    icon: (
      <svg viewBox="0 0 512 512" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M255.43 423l148.99-83.5L255.43 256l-148.99 83.5 148.99 83.5z" />
        <path d="M404.42 339.5v-167L255.43 89v167l148.99 83.5z" opacity="0.8" />
        <path d="M255.43 89l-148.99 83.5v167l148.99-83.5V89z" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Antigravity",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M12 1.5C12 7.299 7.299 12 1.5 12C7.299 12 12 16.701 12 22.5C12 16.701 16.701 12 22.5 12C16.701 12 12 7.299 12 1.5Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: "Git",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M21.71 11.29l-9-9a1 1 0 0 0-1.42 0L8.88 4.7l2.25 2.25a1.48 1.48 0 0 1 1.88 1.88l2.17 2.17a1.5 1.5 0 1 1-.71.71l-2.13-2.13v5.24a1.5 1.5 0 1 1-1 0v-5.46a1.5 1.5 0 0 1-.79-.79L8.3 6.32l-6 6a1 1 0 0 0 0 1.42l9 9a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0-.01-1.45zM12 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M13.98 11.08h1.66V9.42h-1.66v1.66zm-2.08 0h1.66V9.42H11.9v1.66zm-2.08 0h1.66V9.42H9.82v1.66zm-2.08 0H9.4V9.42H7.74v1.66zm6.24-2.08h1.66V7.34h-1.66V9zm-2.08 0h1.66V7.34H11.9V9zm-2.08 0h1.66V7.34H9.82V9zm4.16-2.08h1.66V5.26h-1.66v1.66zm9.29 5.86c-.52-.38-1.57-.49-2.39-.28-.15-.99-.74-1.89-1.64-2.42l-.51-.3-.34.48c-.68.96-.86 2.19-.51 3.29-.36.2-.82.35-1.35.42H1.5c-.32 1.34-.14 3.49 1.15 5.09 1.45 1.8 3.83 2.7 7.07 2.7 6.46 0 11.19-3.79 12.5-9.15.65.07 1.3.01 1.76-.23.23-.12.43-.29.56-.51l-.56-.37z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M21.362 9.354A1.25 1.25 0 0 0 20.383 7.5H13.5V2.167c0-.884-1.07-1.326-1.693-.703L3.398 9.872a1.25 1.25 0 0 0 .979 2.22h6.883v5.333c0 .884 1.07 1.326 1.693.703l8.409-8.408v-.366zM2.638 14.646A1.25 1.25 0 0 0 3.617 16.5H10.5v5.333c0 .884 1.07 1.326 1.693.703l8.409-8.408a1.25 1.25 0 0 0-.979-2.22H12.74V6.575c0-.884-1.07-1.326-1.693-.703L2.638 14.28v.366z" />
      </svg>
    ),
  },
  {
    name: "Turso",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M19.167 4.083l-4.5 4.5-3.084-3.083 2.167-3.833h4.333l1.084 2.416zm-7.667.917l3.083 3.083-7.583 8.334-3.334-1.917 7.834-9.5zm-4.75 10.417l-4.084-2.334.917-3.917 3.167 6.251zm9.667-4.667l-3.667 4.167 4.083 2.5 1.917-3.834-2.333-2.833z" />
      </svg>
    ),
  },
  {
    name: "ElevenLabs",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <rect x="7" y="3.5" width="3.5" height="17" rx="1.75" />
        <rect x="13.5" y="3.5" width="3.5" height="17" rx="1.75" />
      </svg>
    ),
  },
  {
    name: "Higgsfield",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="5"
          stroke="url(#chrome-grad)"
          strokeWidth="1.6"
        />
        <path
          fill="url(#chrome-grad)"
          fillRule="evenodd"
          d="M9.83 5.57 L10.81 5.72 L11.49 6.22 L11.82 6.98 L11.82 7.81 L11.49 8.68 L11.06 9.26 L10.34 9.98 L8.71 11.17 L8.06 11.89 L7.96 12.58 L8.1 12.97 L8.32 13.19 L8.82 13.37 L9.62 13.01 L10.27 12.36 L11.82 10.3 L12.83 9.22 L13.59 8.68 L14.45 8.39 L15.61 8.5 L16.4 8.97 L16.84 9.44 L17.27 10.19 L17.56 11.06 L17.67 11.86 L18.79 11.89 L18.79 13.48 L17.67 13.52 L17.49 14.96 L16.91 16.55 L16.04 17.67 L15.07 18.25 L14.13 18.39 L13.44 18.25 L12.97 17.99 L12.32 17.27 L12.14 16.87 L12.04 16.12 L12.22 15.29 L12.61 14.45 L13.16 13.7 L13.84 13.01 L14.85 12.32 L16.33 11.86 L16.3 11.35 L16.08 10.84 L15.72 10.45 L15.39 10.27 L15.0 10.16 L14.31 10.19 L13.34 10.74 L12.32 11.82 L10.66 14.06 L10.01 14.71 L9.36 15.14 L8.75 15.32 L8.17 15.32 L7.67 15.18 L7.13 14.89 L6.44 14.02 L6.22 13.34 L6.19 12.69 L6.3 12.11 L6.55 11.57 L7.34 10.59 L9.47 8.97 L10.05 8.39 L10.3 7.99 L10.38 7.49 L10.05 7.02 L9.87 6.95 L9.47 7.02 L9.0 7.31 L7.63 8.64 L6.98 9.0 L6.3 9.18 L5.65 9.15 L5.18 8.97 L5.18 7.49 L5.83 7.63 L6.51 7.52 L7.16 7.13 L8.53 5.97 L9.22 5.68 L9.83 5.57 Z M16.22 13.48 L16.01 14.82 L15.47 15.97 L14.96 16.51 L14.56 16.73 L14.24 16.77 L13.91 16.62 L13.7 16.37 L13.66 15.86 L14.13 14.89 L15.0 14.02 L15.65 13.66 L16.22 13.48 Z"
        />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#chrome-grad)">
        <path d="M8 2a4 4 0 0 0 0 8h4V2H8zm4 8H8a4 4 0 0 0 0 8h4v-8zm0 8H8a4 4 0 1 0 4 4v-4zm0-8h4a4 4 0 1 0 0-8h-4v8zm0 0h4a4 4 0 1 1 0 8h-4v-8z" />
      </svg>
    ),
  },
];

import { Reveal } from "./Reveal";
import { Download } from "lucide-react";

const items = [
  {
    period: "2020 — Present",
    role: "Independent Developer & Digital Services",
    org: "Self-Employed",
    note: "Started with general digital services, design, and hands-on IT problem-solving; evolved into building full-stack web applications and production internal tools.",
  },
  {
    period: "2025 — 2026",
    role: "Aftersales Administrator",
    org: "Khonaysser Group",
    note: "Managed aftersales operations across 400+ ERP accounts (100–200+ monthly quotations, 200+ yearly contracts) and coordinated ~10 technician teams. Built four internal tools adopted org-wide.",
  },
  {
    period: "2021 — 2024",
    role: "B.Sc. Computer Science",
    org: "Arab Open University",
    note: "Graduated with GPA 3.66.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-12 md:py-28 bg-surface/30">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-8 md:mb-14">
          <Reveal>
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <span className="font-mono text-[11px] md:text-xs text-muted-foreground uppercase tracking-[0.25em]">
                05 — Timeline
              </span>
              <div className="h-px flex-1 max-w-[60px] md:max-w-[80px] bg-border" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance max-w-4xl">
                A short, honest path.
              </h2>
              <a
                href="/Amro-CV.pdf"
                download="Amro-CV.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-border text-xs sm:text-sm font-medium hover:border-foreground transition-colors shrink-0 self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                Download CV
              </a>
            </div>
          </Reveal>
        </div>

        <div className="max-w-3xl">
          {items.map((it, i) => (
            <Reveal key={it.role} delay={i * 0.06}>
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1.5 md:gap-6 py-4 md:py-6 border-t border-border/70 last:border-b">
                <div className="font-mono text-xs text-muted-foreground/70 md:pt-1">
                  {it.period}
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-medium">{it.role}</h3>
                  <div className="text-foreground/90 text-xs sm:text-sm font-mono mt-0.5">
                    {it.org}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base text-pretty leading-relaxed">
                    {it.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications & Accreditations in Specular Grey Chrome */}
        <Reveal delay={0.2}>
          <div className="mt-12 sm:mt-16 max-w-3xl">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-white/[0.08] font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
              <span>Certifications &amp; Accreditations</span>
              <span className="text-zinc-600">Verified Credentials</span>
            </div>

            {/* Specular Grey Chrome SVG Gradient Definition */}
            <svg
              className="absolute w-0 h-0 pointer-events-none"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id="cert-chrome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#E4E4E7" />
                  <stop offset="60%" stopColor="#A1A1AA" />
                  <stop offset="85%" stopColor="#D4D4D8" />
                  <stop offset="100%" stopColor="#71717A" />
                </linearGradient>
              </defs>
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="group relative rounded-xl border border-white/[0.08] bg-[#0c0c0f]/80 p-4 transition-all duration-200 hover:border-white/20 hover:bg-[#0c0c0f] select-none"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 pointer-events-none">
                      {cert.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider truncate">
                          {cert.issuer}
                        </span>
                        {cert.badge && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono border border-white/15 bg-white/5 text-zinc-300">
                            {cert.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-sm font-medium text-foreground mt-1 leading-snug group-hover:text-zinc-100 transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {cert.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const certifications = [
  {
    issuer: "TotalEnergies Marketing Lebanon",
    badge: "Dec 2025",
    title: "Proactive Maintenance & Troubleshooting",
    note: "Heavy equipment diagnostic methodologies, proactive engine maintenance & fleet reliability.",
    icon: (
      <svg viewBox="-125 -15 450 195" className="w-4 h-4" fill="url(#cert-chrome-grad)">
        <path d="M 124.96021,-5.7787199 C 111.30142,5.1053096 98.206279,19.51397 90.604368,35.279578 74.979575,67.683844 83.640179,97.466635 90.337099,116.79678 c 9.118718,26.32048 27.586361,39.6093 49.595871,49.31516 31.38125,13.83866 70.8277,14.77041 106.64609,5.52095 12.62609,-3.26047 32.22938,-10.04 36.50801,-16.36551 4.63198,-6.84792 5.35968,-20.0916 -4.59221,-25.90893 -9.7053,-5.67318 -10.64692,-1.34119 -39.5559,5.07812 -20.11941,4.46757 -42.08871,5.24366 -68.47636,-6.1472 C 153.82105,121.10565 142.55977,110.0821 138.71288,95.014317 127.67839,51.793644 151.51836,35.76329 156.16912,32.833044 Z" />
        <path d="M 157.84351,45.10773 C 145.42038,43.461807 108.97541,39.599526 70.845748,32.834654 11.842093,22.366368 -57.526372,7.8467345 -79.673849,6.2971929 -122.29578,3.3151624 -129.40303,58.685802 -95.377991,68.156606 c 19.270605,5.363936 72.297365,-0.269376 85.187128,25.178141 3.9262671,7.751403 14.31163,36.978703 26.076639,73.170723 4.612313,14.18859 42.122846,11.95772 35.148531,-18.27291 C 47.05152,130.9689 37.982851,84.339904 37.982851,84.339904 c 0,0 107.593969,11.409837 116.349269,12.167189 z" />
        <path d="m 214.50149,16.630952 c 13.66286,0.362716 37.43612,3.871884 48.14341,11.034741 l 59.70582,11.766666 c 0.56623,-33.138402 -17.60755,-50.970337 -37.97242,-61.249767 -15.45787,-7.80256 -37.14328,-14.15636 -69.68783,-12.76741 -31.11938,1.32812 -63.83818,8.14453 -89.93489,28.939733 l 31.18947,38.678581 c 14.71657,-9.272293 33.21126,-17.075397 58.55644,-16.402544 z" />
        <path d="m 261.69325,27.055984 c 0,0 3.144,2.014475 4.50946,3.261778 6.5034,5.940664 8.65634,13.0387 -11.07182,16.302616 l 15.60467,48.249936 c 35.50347,-9.513127 51.16904,-30.461981 51.60607,-56.039312 z" />
        <path d="m 255.72078,46.536857 c -17.48942,2.893527 -51.39592,4.764532 -98.14454,-1.429127 l -3.51139,51.399363 c 75.9153,6.566837 102.61215,2.087809 117.2606,-1.837231 z" />
      </svg>
    ),
  },
  {
    issuer: "British Council",
    badge: "Result C · Jun 2024",
    title: "Aptis General English Examination",
    note: "Certified Level C proficiency across reading, writing, speaking, and listening on the Aptis General scale.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#cert-chrome-grad)">
        <circle cx="6.5" cy="6.5" r="4" />
        <circle cx="17.5" cy="6.5" r="4" />
        <circle cx="6.5" cy="17.5" r="4" />
        <circle cx="17.5" cy="17.5" r="4" />
      </svg>
    ),
  },
  {
    issuer: "LAU & Kanz AI",
    badge: "Jul 2026",
    title: "AI Training Hackathon",
    note: "Foundational AI proficiency and applied machine learning models at Lebanese American University.",
    icon: (
      <svg viewBox="0 0 180 180" className="w-4 h-4" fill="url(#cert-chrome-grad)">
        <path d="m129.12,120.91c-.37.58-1.19.63-1.63.1-.51-.61-.89-1.06-1.13-1.58-2.05-4.28-4-8.6-6.03-12.89-4.42-9.35-11.28-16.25-20.71-20.56-4.11-1.88-8.22-3.77-12.29-5.75-.53-.26-.96-.7-1.39-1.16-.36-.38-.37-.97-.03-1.36.48-.54.95-1.08,1.55-1.37,3.18-1.54,6.41-2.97,9.67-4.32,12.24-5.06,20.27-14.17,25.34-26.17,1.03-2.44,2.12-4.86,3.33-7.21.42-.81.99-1.53,1.56-2.26.4-.5,1.16-.51,1.57-.02.66.79,1.32,1.58,1.77,2.48,1.54,3.05,2.94,6.18,4.29,9.32,4.93,11.45,13.37,19.26,24.73,24.11,3.14,1.34,6.29,2.7,9.36,4.19.76.37,1.78,1.3,1.75,1.93-.03.66-1.08,1.47-1.86,1.86-4.35,2.14-8.74,4.21-13.15,6.24-9.37,4.31-15.82,11.45-20.15,20.66-1.88,3.99-3.66,8.02-5.53,12.02-.25.54-.58,1.05-1.02,1.74Z" />
        <path d="m40.71,143.66c-.27.42-.87.46-1.18.07-.37-.45-.64-.77-.82-1.14-1.49-3.11-2.9-6.24-4.37-9.36-3.21-6.79-8.19-11.79-15.03-14.92-2.98-1.37-5.97-2.74-8.92-4.17-.38-.19-.7-.51-1.01-.84-.26-.28-.27-.7-.02-.99.34-.39.69-.79,1.12-1,2.31-1.12,4.65-2.15,7.02-3.13,8.89-3.67,14.71-10.28,18.39-18.99.75-1.77,1.54-3.53,2.42-5.23.3-.59.72-1.11,1.13-1.64.29-.37.84-.37,1.14-.01.48.58.96,1.15,1.28,1.8,1.12,2.22,2.13,4.48,3.11,6.76,3.58,8.31,9.7,13.98,17.95,17.5,2.28.97,4.56,1.96,6.79,3.04.55.27,1.29.95,1.27,1.4-.02.48-.79,1.07-1.35,1.35-3.16,1.55-6.35,3.05-9.55,4.53-6.8,3.13-11.48,8.31-14.63,15-1.36,2.9-2.66,5.82-4.01,8.72-.18.39-.42.76-.74,1.26Z" />
      </svg>
    ),
  },
  {
    issuer: "OGERO Telecom HQ",
    badge: "Aug 2024",
    title: "Telecom Internship Program",
    note: "National ISP infrastructure, fiber optics telemetry, and telecommunication protocols.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#cert-chrome-grad)">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    ),
  },
];

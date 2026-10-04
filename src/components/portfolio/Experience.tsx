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
    badge: "Certified",
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
    badge: "Result C · C1",
    title: "Aptis General English Examination",
    note: "Comprehensive CEFR C1 language proficiency certification across core professional communication domains.",
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
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="url(#cert-chrome-grad)">
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.1-2.6 7.92-6 8.91-3.4-0.99-6-4.81-6-8.91V6.43l6-2.25zm0 3.32a1 1 0 0 0-.8.4l-2 2.67a1 1 0 0 0 .8 1.6h.5v2.5h-1a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-1v-2.5h.5a1 1 0 0 0 .8-1.6l-2-2.67a1 1 0 0 0-.8-.4z" />
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
        <circle cx="12" cy="12" r="9" stroke="url(#cert-chrome-grad)" strokeWidth="1.8" fill="none" />
        <path d="M12 6.5a5.5 5.5 0 1 0 5.5 5.5A5.5 5.5 0 0 0 12 6.5zm0 8.5a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),
  },
];

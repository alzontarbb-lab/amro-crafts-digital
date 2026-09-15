import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Personal } from "@/components/portfolio/Personal";
import { Contact } from "@/components/portfolio/Contact";
import paisleyFieldDark from "@/assets/paisley-field-dark.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amro — Software Developer & Automation Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Amro, a software developer based in Beirut bridging operations and software. Building production full-stack systems, automation, and internal tools.",
      },
      { property: "og:title", content: "Amro — Software Developer & Automation Engineer" },
      {
        property: "og:description",
        content:
          "Full-stack developer bridging operations and software. React, PHP, Python, AI automation.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const style = {
    "--paisley-field": `url('${paisleyFieldDark.url}')`,
  } as React.CSSProperties;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-background text-foreground antialiased" style={style}>
        <Nav />
        <main className="paisley-wash">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Personal />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";
import { Nav } from "@/components/portfolio/Nav";
import { Spotlight } from "@/components/portfolio/Spotlight";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amro — Software Developer & Automation Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Amro, a software developer based in Beirut building production full-stack systems, automation, and cross-platform mobile apps.",
      },
      { property: "og:title", content: "Amro — Software Developer & Automation Engineer" },
      {
        property: "og:description",
        content:
          "Full-stack developer building production systems for real businesses. Flutter, React, PHP, Python, AI automation.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <div className="relative bg-background text-foreground antialiased">
        <Spotlight />
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

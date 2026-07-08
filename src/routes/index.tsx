import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";
import { Nav } from "@/components/portfolio/Nav";
import { Spotlight } from "@/components/portfolio/Spotlight";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Personal } from "@/components/portfolio/Personal";
import { Contact } from "@/components/portfolio/Contact";
import paisleyFieldLight from "@/assets/paisley-field-light.png.asset.json";
import paisleyFieldDark from "@/assets/paisley-field-dark.png.asset.json";
import paisleyBorderLight from "@/assets/paisley-sari-border-light-seamless.png.asset.json";
import paisleyBorderDark from "@/assets/paisley-sari-border-dark-seamless.png.asset.json";

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
    "--paisley-field-light": `url('${paisleyFieldLight.url}')`,
    "--paisley-field-dark": `url('${paisleyFieldDark.url}')`,
    "--paisley-border-light": `url('${paisleyBorderLight.url}')`,
    "--paisley-border-dark": `url('${paisleyBorderDark.url}')`,
  } as React.CSSProperties;

  return (
    <ThemeProvider>
      <div className="relative bg-background text-foreground antialiased" style={style}>
        <Spotlight />
        <Nav />
        <main className="paisley-wash">
          <Hero />
          <div className="section-divider" aria-hidden="true" />
          <About />
          <div className="section-divider" aria-hidden="true" />
          <Skills />
          <div className="section-divider" aria-hidden="true" />
          <Projects />
          <div className="section-divider" aria-hidden="true" />
          <Experience />
          <div className="section-divider" aria-hidden="true" />
          <Personal />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

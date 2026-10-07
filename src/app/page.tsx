import { About } from "@/components/sections/About";
import { Cases } from "@/components/sections/Cases";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Scale } from "@/components/sections/Scale";
import { StatusStrip } from "@/components/sections/StatusStrip";
import { Systems } from "@/components/sections/Systems";
import { buildJsonLd, serializeJsonLd } from "@/lib/seo";

/**
 * The page reads as a story: introduction → scale → what I manage →
 * where I've worked → what I've built → how I solve problems → about → contact.
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      <Hero />
      <StatusStrip />
      <Scale />
      <Systems />
      <Experience />
      <Projects />
      <Cases />
      <About />
      <Contact />
    </>
  );
}

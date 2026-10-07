import { Timeline } from "@/components/experience/Timeline";
import { Section, SectionHeader } from "@/components/ui/Section";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        id="experience"
        title="Where I've worked"
        intro="Twelve years, four roles. Each one added a layer: support, then infrastructure, then enterprise escalation, then running the platforms."
        meta="2014 → present"
      />
      <Timeline roles={experience} />
    </Section>
  );
}

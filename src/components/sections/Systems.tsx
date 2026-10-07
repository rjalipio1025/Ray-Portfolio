import { EcosystemMap } from "@/components/systems/EcosystemMap";
import { Section, SectionHeader } from "@/components/ui/Section";
import { techCategories } from "@/content/skills";

export function Systems() {
  const total = new Set(techCategories.flatMap((c) => c.items.map((i) => i.name))).size;
  return (
    <Section id="systems" raised>
      <SectionHeader
        id="systems"
        title="Technology ecosystem"
        intro="Explore the platforms behind the infrastructure. Pick a domain to see how its systems connect, and what I do with each one."
        meta={`${total} systems · ${techCategories.length} domains`}
      />
      <EcosystemMap />
    </Section>
  );
}

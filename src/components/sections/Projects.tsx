import { EndpointPipeline } from "@/components/projects/diagrams/EndpointPipeline";
import { IdentityLifecycle } from "@/components/projects/diagrams/IdentityLifecycle";
import { MobileMatrix } from "@/components/projects/diagrams/MobileMatrix";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { Section, SectionHeader } from "@/components/ui/Section";
import { projects } from "@/content/projects";
import type { ProjectDiagram } from "@/content/types";

const diagrams: Partial<Record<ProjectDiagram, React.ReactNode>> = {
  endpoint: <EndpointPipeline />,
  identity: <IdentityLifecycle />,
  mobile: <MobileMatrix />,
};

export function Projects() {
  const [featured, ...rest] = projects;
  return (
    <Section id="projects">
      <SectionHeader
        id="projects"
        title="What I've built"
        intro="One platform I designed and built, and the endpoint, identity and mobile standards I run, written up as case studies."
        meta={`${projects.length} case studies`}
      />

      <FeaturedProject project={featured} />

      <div className="mt-20 sm:mt-24">
        <div className="meta mb-8 flex items-center gap-3 text-fg-subtle" data-reveal="wipe">
          <span className="crosshair" aria-hidden="true" />
          <span>Case index</span>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          <span>Projects 02–{String(projects.length).padStart(2, "0")}</span>
        </div>
        <ProjectIndex
          items={rest.map((project, i) => ({
            project,
            number: String(i + 2).padStart(2, "0"),
            diagram: diagrams[project.diagram],
          }))}
        />
      </div>
    </Section>
  );
}

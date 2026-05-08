"use client";

import ProjectShowcaseList from "@/components/projects/ProjectShowcaseList";
import { Project } from "@/types/project";

type ProjectsPageClientProps = {
  initialProjects?: Project[];
};

export default function ProjectsPageClient({
  initialProjects = [],
}: ProjectsPageClientProps) {
  const introText = "Selected projects and detailed case studies.";

  return (
    <ProjectShowcaseList
      projects={initialProjects}
      title="PROJECTS"
      subtitle={introText}
    />
  );
}

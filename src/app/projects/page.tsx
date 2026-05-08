import ProjectsPageClient from "@/app/projects/ProjectsPageClient";
import { STATIC_PROJECTS } from "@/lib/static-data";

export default function ProjectsPage() {
  return <ProjectsPageClient initialProjects={STATIC_PROJECTS.filter((project) => project.published)} />;
}

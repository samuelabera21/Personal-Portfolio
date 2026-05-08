import Link from "next/link";
import { Project } from "@/types/project";
import TechBadge from "@/components/TechBadge";

type ResumeProjectCardProps = {
  project: Project;
};

function formatDate(dateInput: string): string {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "Recent";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ProjectCard({ project }: ResumeProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <h3 className="text-lg font-semibold text-slate-950">{project.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{formatDate(project.createdAt)}</p>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
        {project.description}
      </p>

      {project.techStack.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechBadge key={`${project.id}-${tech}`} label={tech} />
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/projects/${project.id}`}
          className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-[#f4c400] hover:bg-[#fffaf0] hover:text-slate-950"
        >
          Details
        </Link>

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-[#f4c400] hover:bg-[#fffaf0] hover:text-slate-950"
          >
            GitHub
          </a>
        ) : null}

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-[#f4c400] hover:bg-[#fffaf0] hover:text-slate-950"
          >
            Live Link
          </a>
        ) : null}
      </div>
    </article>
  );
}
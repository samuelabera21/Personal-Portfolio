"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { STATIC_PROJECTS } from "@/lib/static-data";
import { Project } from "@/types/project";

function isRealUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  return value !== "#";
}

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();

  const project = useMemo(
    () => STATIC_PROJECTS.find((item) => item.id === params.id) ?? null,
    [params.id]
  );

  const toolList = useMemo(() => project?.techStack ?? [], [project]);

  if (!project) {
    return (
      <section className="min-h-screen bg-white px-6 py-12 text-slate-900 sm:px-10 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <Link href="/projects" className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:border-[#f4c400] hover:bg-[#fffaf0] hover:text-slate-950">
            Back to projects
          </Link>
          <p className="mt-6 text-sm font-medium text-rose-500">Project not found.</p>
        </div>
      </section>
    );
  }

  const githubLink = isRealUrl(project.githubUrl) ? project.githubUrl : undefined;
  const liveLink = isRealUrl(project.liveUrl) ? project.liveUrl : undefined;

  const actionButtonClass =
    "inline-flex rounded-md bg-[#f4c400] px-6 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-950 shadow-[0_12px_28px_rgba(244,196,0,0.32)] transition hover:bg-[#ffd333]";

  const disabledActionClass =
    "inline-flex rounded-md bg-[#f4c400]/70 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-950 shadow-[0_12px_28px_rgba(244,196,0,0.2)]";

  return (
    <section className="min-h-screen bg-[#f7f4ed] px-6 py-8 text-slate-900 sm:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase tracking-[0.22em] text-slate-950 sm:text-5xl">{project.title}</h1>
          <div className="mx-auto mt-4 h-1 w-8 rounded-full bg-[#f4c400]" />
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            This page contains the case study of {project.title} with the project overview, tools used, GitHub link, and live link.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {githubLink ? (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={actionButtonClass}
              >
                GitHub
              </a>
            ) : (
              <span className={disabledActionClass}>
                GitHub
              </span>
            )}

            {liveLink ? (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={actionButtonClass}
              >
                Live Link
              </a>
            ) : (
              <span className={disabledActionClass}>
                Live Link
              </span>
            )}

            <Link
              href="/projects"
              className="inline-flex rounded-md border border-slate-300 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Go Back
            </Link>
          </div>
        </div>

        <article className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)] ring-1 ring-slate-200">
          <div className="border-b border-slate-100 bg-[#fafafa] p-3 sm:p-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[#eef6ec]">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-contain p-5 sm:p-8"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">No image available</div>
              )}
            </div>
          </div>

          <div id="overview" className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-[0.14em] text-slate-950">Project Overview</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{project.description}</p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
                Feel free to explore the tools used below and open the application link when a live demo is available.
              </p>

              <div className="mt-8">
                <h3 className="text-xl font-black text-slate-950">Tools Used</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {toolList.length > 0 ? (
                    toolList.map((tool) => (
                      <span key={tool} className="rounded-md bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
                        {tool}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No tools listed yet.</p>
                  )}
                </div>
              </div>
            </div>

            <aside className="rounded-[1.5rem] bg-[#f9f9f9] p-6 ring-1 ring-slate-200">
              <h3 className="text-xl font-black text-slate-950">Run the app on your phone</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Use the GitHub link to view the code or open the live version, or return to the project list to explore more work.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {githubLink ? (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={actionButtonClass}
                  >
                    GitHub
                  </a>
                ) : (
                  <span className={disabledActionClass}>
                    GitHub
                  </span>
                )}

                {liveLink ? (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={actionButtonClass}
                  >
                    Live Link
                  </a>
                ) : (
                  <span className={disabledActionClass}>
                    Live Link
                  </span>
                )}

                <Link
                  href="/projects"
                  className="inline-flex rounded-md border border-slate-300 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  Go Back
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
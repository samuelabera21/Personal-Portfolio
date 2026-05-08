"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types/project";

type Props = {
  projects: Project[];
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  compact?: boolean;
};

function isRealUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  return value !== "#";
}

export default function ProjectShowcaseList({
  projects,
  title = "PROJECTS",
  subtitle = "Here you will find some of the team projects with their own case study.",
  viewAllHref,
  compact = false,
}: Props) {
  const visibleProjects = compact ? projects.slice(0, 3) : projects;
  const INITIAL_VISIBLE = compact ? 3 : 6;
  const [expanded, setExpanded] = useState(false);

  const projectsToShow = expanded ? visibleProjects : visibleProjects.slice(0, INITIAL_VISIBLE);

  return (
    <section id="featured-projects" className="bg-white px-6 py-16 text-slate-900 sm:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-7xl space-y-14">
        <header className="text-center">
          <h2 className="text-3xl font-black uppercase tracking-[0.22em] text-slate-950 sm:text-4xl">{title}</h2>
          <div className="mx-auto mt-4 h-1 w-8 rounded-full bg-[#f4c400]" />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{subtitle}</p>

          {viewAllHref ? (
            <div className="mt-5">
              <Link
                href={viewAllHref}
                className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:border-[#f4c400] hover:text-slate-950"
              >
                View all projects
              </Link>
            </div>
          ) : null}
        </header>

        <div className="space-y-24 lg:space-y-28">
          {projectsToShow.map((project, index) => {
            const reversed = index % 2 === 1;
            const demoLink = isRealUrl(project.liveUrl) ? project.liveUrl : `/projects/${project.id}`;

            return (
              <motion.article
                key={`${project.id}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={reversed ? "lg:order-2" : ""}>
                  <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                    <div className="relative aspect-[16/10] bg-[#eef6ec] p-4 sm:p-5">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain p-4"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-500">No image available</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={reversed ? "lg:order-1" : ""}>
                  <h3 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{project.title}</h3>
                  <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{project.description}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.techStack.slice(0, 6).map((tech) => (
                      <span key={`${project.id}-${tech}`} className="rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex rounded-md bg-[#f4c400] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 shadow-[0_14px_30px_rgba(244,196,0,0.35)] transition hover:translate-y-[-1px] hover:bg-[#ffd333]"
                    >
                      Case Study
                    </Link>

                    {isRealUrl(project.liveUrl) ? (
                      <a
                        href={demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-md border border-slate-300 px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                      >
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
          {visibleProjects.length > INITIAL_VISIBLE ? (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                {expanded ? "Show less" : `Show more (${visibleProjects.length - INITIAL_VISIBLE})`}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
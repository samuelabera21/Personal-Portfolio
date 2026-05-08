"use client";

import { useMemo, useState } from "react";
import { Download, ExternalLink, Mail, MapPin } from "lucide-react";
import { jsPDF } from "jspdf";
import TechBadge from "@/components/TechBadge";
import { STATIC_HOME, STATIC_PROJECTS } from "@/lib/static-data";
import { HomeData } from "@/types/home";
import { Project } from "@/types/project";

type ResumeInitialData = {
  home: HomeData;
  projects: Project[];
};

type ResumePageClientProps = {
  initialData?: ResumeInitialData | null;
  initialError?: string | null;
};

const RESUME_SKILLS_LIMIT = 20;

function findSocialUrl(links: { platform: string; url: string }[], keyword: string): string | null {
  const match = links.find((item) => {
    const source = `${item.platform} ${item.url}`.toLowerCase();
    return source.includes(keyword);
  });

  if (!match?.url) return null;
  if (match.url.startsWith("http://") || match.url.startsWith("https://")) return match.url;
  return `https://${match.url}`;
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.1 3.3 9.42 7.88 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.76 1.2 1.76 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.26-1.29-5.26-5.75 0-1.27.46-2.3 1.2-3.1-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.83 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.65.24 2.87.12 3.17.75.8 1.2 1.83 1.2 3.1 0 4.48-2.7 5.45-5.28 5.74.41.36.78 1.07.78 2.17 0 1.57-.01 2.84-.01 3.23 0 .31.2.67.8.55A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.63 0 4.3 2.38 4.3 5.48v6.26ZM5.3 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.08 20.45H3.5V9h3.57v11.45ZM22.22 0H1.77A1.78 1.78 0 0 0 0 1.78v20.44C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.78V1.78C24 .8 23.2 0 22.22 0Z" />
    </svg>
  );
}

function formatProjectDate(input: string): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "Recent";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function sanitizeForPdf(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^\x20-\x7E\n]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const fallbackHomeData: HomeData = {
  profile: {
    id: "fallback-resume-profile",
    name: "Samuel Abera",
    role: "Software Engineering Student and Web Developer",
    bio: "Focused on building practical web applications while growing in modern software engineering.",
    avatarUrl: "",
    resumeUrl: "",
    location: "Ethiopia",
    available: true,
    socialLinks: [],
  },
  featuredProjects: [],
  skills: {},
  showProjects: true,
  showSkills: true,
  showBlog: true,
  availableForHire: true,
};

const fallbackProjects: Project[] = [
  {
    id: "fallback-resume-project-1",
    title: "Portfolio Performance Refresh",
    description: "Frontend improvements focused on faster navigation, better loading behavior, and polished fallback states.",
    imageUrl: null,
    githubUrl: null,
    liveUrl: null,
    techStack: ["Next.js", "TypeScript", "Caching"],
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-resume-project-2",
    title: "Rendering Resilience Layer",
    description: "Caching, compression, and outage-safe responses to keep the public site working during limits.",
    imageUrl: null,
    githubUrl: null,
    liveUrl: null,
    techStack: ["Next.js", "Caching", "Static Data"],
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

async function toDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read image for PDF."));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export default function ResumePageClient({
  initialData = null,
}: ResumePageClientProps) {
  const homeData: HomeData = initialData?.home ?? STATIC_HOME ?? fallbackHomeData;
  const projects: Project[] = (initialData?.projects ?? STATIC_PROJECTS).filter((project) => project.published);
  const [error, setError] = useState<string | null>(null);
  const offlineMode = !initialData;
  const [downloadingResume, setDownloadingResume] = useState(false);

  const allSkills = useMemo(() => {
    if (!homeData?.skills) return [];

    const unique = new Map<string, string>();

    Object.values(homeData.skills)
      .flat()
      .map((skill) => skill.trim())
      .filter(Boolean)
      .forEach((skill) => {
        const normalized = skill.toLowerCase();
        if (!unique.has(normalized)) {
          unique.set(normalized, skill);
        }
      });

    return Array.from(unique.values());
  }, [homeData]);

  const contactLinks = useMemo(() => {
    const social = homeData?.profile.socialLinks ?? [];

    return {
      email: "mailto:samuelabera.dev@gmail.com",
      github: findSocialUrl(social, "github") ?? "https://github.com/samuelabera21",
      linkedin: findSocialUrl(social, "linkedin") ?? "https://linkedin.com/in/samuelabera21",
    };
  }, [homeData]);

  const resumeProjects = useMemo(
    () =>
      [...projects]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [projects]
  );

  // UI-only project list trimming for resume page to avoid overly long pages
  const INITIAL_RESUME_VISIBLE = 6;
  const [resumeExpanded, setResumeExpanded] = useState(false);
  const projectsToRender = resumeExpanded ? resumeProjects : resumeProjects.slice(0, INITIAL_RESUME_VISIBLE);

  const summaryText = homeData?.profile.bio?.trim() || "I am a software engineering student interested in web development and artificial intelligence.";
  const isOfflineMode = offlineMode;
  const profileName = homeData?.profile.name?.trim() || "Samuel Abera";
  const profileRole = homeData?.profile.role?.trim() || "Aspiring Software Engineer";
  const profileLocation = homeData?.profile.location?.trim() || "Ethiopia";
  const displaySkills = allSkills.slice(0, RESUME_SKILLS_LIMIT);
  const githubLabel = contactLinks.github.replace(/^https?:\/\//, "");
  const linkedinLabel = contactLinks.linkedin.replace(/^https?:\/\//, "");

  const handleResumeDownload = async () => {
    if (!homeData) return;

    setDownloadingResume(true);
    setError(null);

    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 38;
      const contentWidth = pageWidth - margin * 2;
      const leftColumnWidth = 165;
      const columnGap = 22;
      const rightColumnX = margin + leftColumnWidth + columnGap;
      const rightColumnWidth = contentWidth - leftColumnWidth - columnGap;
      let leftY = 126;
      let rightY = 126;

      const safeName = sanitizeForPdf(profileName);
      const safeRole = sanitizeForPdf(profileRole);
      const safeLocation = sanitizeForPdf(profileLocation);

      const headerImage = await toDataUrl("/resume.jpg");
      if (headerImage) {
        const headerImageSize = 62;
        const headerImageX = pageWidth - margin - headerImageSize;
        const headerImageY = 42;
        doc.addImage(headerImage, "JPEG", headerImageX, headerImageY, headerImageSize, headerImageSize);
        doc.setDrawColor(180, 180, 180);
        doc.rect(headerImageX, headerImageY, headerImageSize, headerImageSize);
      }

      const writeColumnHeading = (text: string, x: number, y: number) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(sanitizeForPdf(text).toUpperCase(), x, y);
        doc.setDrawColor(203, 213, 225);
        doc.line(x, y + 8, x + (x === margin ? leftColumnWidth : rightColumnWidth), y + 8);
      };

      const writeWrappedText = (
        text: string,
        x: number,
        y: number,
        width: number,
        size = 10,
        lineHeight = 14,
        font: "normal" | "bold" = "normal"
      ) => {
        const safeText = sanitizeForPdf(text);
        if (!safeText) return y;

        doc.setFont("helvetica", font);
        doc.setFontSize(size);
        doc.setTextColor(30, 41, 59);

        const lines = doc.splitTextToSize(safeText, width);
        lines.forEach((line: string) => {
          doc.text(line, x, y);
          y += lineHeight;
        });

        return y;
      };

      const writeLink = (label: string, display: string, link: string, x: number, y: number) => {
        const safeLabel = sanitizeForPdf(label);
        const safeDisplay = sanitizeForPdf(display);
        if (!safeDisplay || !link) return y;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(20, 20, 20);
        const prefix = `${safeLabel}: `;
        doc.text(prefix, x, y);

        const linkX = x + doc.getTextWidth(prefix);
        doc.setTextColor(37, 99, 235);
        doc.textWithLink(safeDisplay, linkX, y, { url: link.trim() });
        doc.setTextColor(20, 20, 20);
        return y + 14;
      };

      doc.setFont("helvetica", "bold");
      doc.setFontSize(25);
      doc.setTextColor(15, 23, 42);
      doc.text(safeName, margin, 58);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(71, 85, 105);
      doc.text(safeRole, margin, 78);

      const contactLine = ["samuelabera.dev@gmail.com", githubLabel, linkedinLabel, safeLocation]
        .map((item) => sanitizeForPdf(item))
        .filter(Boolean)
        .join("  |  ");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      doc.text(contactLine, margin, 96);

      doc.setDrawColor(148, 163, 184);
      doc.line(margin, 108, pageWidth - margin, 108);

      writeColumnHeading("Profile", margin, leftY);
      leftY += 24;
      leftY = writeWrappedText(summaryText, margin, leftY, leftColumnWidth, 9.8, 13);
      leftY += 12;

      writeColumnHeading("Core Skills", margin, leftY);
      leftY += 22;
      if (displaySkills.length > 0) {
        displaySkills.forEach((skill) => {
          leftY = writeWrappedText(`- ${skill}`, margin + 2, leftY, leftColumnWidth - 2, 9.8, 13);
        });
      } else {
        leftY = writeWrappedText("- Skills not available", margin + 2, leftY, leftColumnWidth - 2, 9.8, 13);
      }

      leftY += 14;
      writeColumnHeading("Education", margin, leftY);
      leftY += 22;
      leftY = writeWrappedText("BSc in Software Engineering", margin, leftY, leftColumnWidth, 10, 14, "bold");
      leftY = writeWrappedText("Debre Berhan University", margin, leftY, leftColumnWidth, 9.8, 13);
      leftY = writeWrappedText("Expected Graduation: 2028", margin, leftY, leftColumnWidth, 9.8, 13);

      rightY = writeLink("Email", "samuelabera.dev@gmail.com", contactLinks.email, rightColumnX, rightY);
      rightY = writeLink("GitHub", githubLabel, contactLinks.github, rightColumnX, rightY);
      rightY = writeLink("LinkedIn", linkedinLabel, contactLinks.linkedin, rightColumnX, rightY);
      rightY += 12;

      writeColumnHeading("Selected Projects", rightColumnX, rightY);
      rightY += 24;

      if (resumeProjects.length > 0) {
        resumeProjects.forEach((project) => {
          if (rightY > doc.internal.pageSize.getHeight() - 120) {
            doc.addPage();
            rightY = 52;
            writeColumnHeading("Selected Projects", rightColumnX, rightY);
            rightY += 24;
          }

          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(15, 23, 42);
          doc.text(sanitizeForPdf(project.title) || "Untitled Project", rightColumnX, rightY);
          rightY += 14;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.8);
          doc.setTextColor(71, 85, 105);
          doc.text(formatProjectDate(project.createdAt), rightColumnX, rightY);
          rightY += 13;

          rightY = writeWrappedText(project.description, rightColumnX, rightY, rightColumnWidth, 10, 13);

          if (project.techStack.length > 0) {
            rightY = writeWrappedText(
              `Stack: ${project.techStack.map((item) => sanitizeForPdf(item)).filter(Boolean).join(", ")}`,
              rightColumnX,
              rightY,
              rightColumnWidth,
              9.5,
              12
            );
          }

          if (project.githubUrl) {
            rightY = writeLink("GitHub", project.githubUrl.replace(/^https?:\/\//, ""), project.githubUrl, rightColumnX, rightY);
          }

          if (project.liveUrl) {
            rightY = writeLink("Live", project.liveUrl.replace(/^https?:\/\//, ""), project.liveUrl, rightColumnX, rightY);
          }

          rightY += 12;
          doc.setDrawColor(226, 232, 240);
          doc.line(rightColumnX, rightY, rightColumnX + rightColumnWidth, rightY);
          rightY += 14;
        });
      } else {
        rightY = writeWrappedText("No published projects available.", rightColumnX, rightY, rightColumnWidth, 10, 13);
      }

      doc.save("Samuel_Abera_Resume.pdf");
    } catch (downloadError) {
      const message = downloadError instanceof Error ? downloadError.message : "Failed to download resume.";
      setError(message);
    } finally {
      setDownloadingResume(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#e8edf3] bg-[radial-gradient(circle_at_top_right,_rgba(148,163,184,0.22),_transparent_48%),linear-gradient(180deg,_#eef3f8_0%,_#e6ecf4_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {isOfflineMode ? (
          <div className="mb-6 rounded-2xl border border-[#f4c400]/20 bg-[#fffaf0] p-4 text-sm text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <p className="font-semibold text-slate-950">Resume data is temporarily using fallback content.</p>
            <p className="mt-1 text-slate-600">
              The layout stays available while local data is being updated.
            </p>
          </div>
        ) : null}

        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={handleResumeDownload}
            disabled={downloadingResume}
            className="inline-flex items-center gap-2 rounded-lg border border-[#c4ccd7] bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Download className="h-4 w-4" />
            {downloadingResume ? "Downloading..." : "Download Resume"}
          </button>
        </div>

        <article className="mx-auto overflow-hidden rounded-2xl border border-[#d6dbe4] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
          <header className="border-b border-[#d9dee7] px-6 pb-5 pt-7 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-[0.02em] text-slate-950 sm:text-4xl">{profileName}</h1>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{profileRole}</p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                  <a href={contactLinks.email} className="inline-flex items-center gap-2 transition hover:text-slate-900">
                    <Mail className="h-4 w-4" />
                    samuelabera.dev@gmail.com
                  </a>
                  <a href={contactLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-slate-900">
                    <GithubIcon className="h-4 w-4" />
                    {githubLabel}
                  </a>
                  <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-slate-900">
                    <LinkedinIcon className="h-4 w-4" />
                    {linkedinLabel}
                  </a>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {profileLocation}
                  </span>
                </div>
              </div>

              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                <img
                  src={homeData?.profile.avatarUrl || "/resume.jpg"}
                  alt={`${profileName} profile`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12">
            <aside className="border-b border-[#d9dee7] px-6 py-6 md:col-span-4 md:border-b-0 md:border-r md:px-7">
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Profile</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{summaryText}</p>
              </section>

              <section className="mt-7">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Education</h2>
                <div className="mt-3 space-y-1.5">
                  <p className="text-sm font-semibold text-slate-900">BSc in Software Engineering</p>
                  <p className="text-sm text-slate-700">Debre Berhan University</p>
                  <p className="text-sm text-slate-600">Expected Graduation: 2028</p>
                </div>
              </section>

              <section className="mt-7">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Core Skills</h2>
                {displaySkills.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {displaySkills.map((skill) => (
                      <li key={skill} className="text-sm text-slate-700">
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-slate-500">No skills added yet.</p>
                )}
              </section>
          </aside>

          <main className="px-6 py-6 md:col-span-8 md:px-8">
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Selected Projects</h2>
              {resumeProjects.length > 0 ? (
                <div className="mt-4 space-y-6">
                  {projectsToRender.map((project, idx) => (
                    <article key={`${project.id}-${idx}`} className="border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                        <p className="text-sm text-slate-500">{formatProjectDate(project.createdAt)}</p>
                      </div>

                      {isOfflineMode ? (
                        <p className="mt-1 inline-block rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
                          Fallback data
                        </p>
                      ) : null}

                      <p className="mt-2 text-sm leading-7 text-slate-700">{project.description}</p>

                      {project.techStack.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <TechBadge key={`${project.id}-${tech}`} label={tech} />
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-slate-700 transition hover:text-slate-950"
                          >
                            GitHub
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}

                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-slate-700 transition hover:text-slate-950"
                          >
                            Live Demo
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                    </article>
                  ))}
                  {resumeProjects.length > INITIAL_RESUME_VISIBLE ? (
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => setResumeExpanded((v) => !v)}
                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                      >
                        {resumeExpanded ? "Show less" : `Show more (${resumeProjects.length - INITIAL_RESUME_VISIBLE})`}
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">No published projects available.</p>
              )}
            </section>
          </main>
          </div>
        </article>
      </div>
    </section>
  );
}

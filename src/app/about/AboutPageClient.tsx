"use client";

import Image from "next/image";
import { useState } from "react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import { STATIC_HOME, STATIC_PROJECTS } from "@/lib/static-data";
import { Profile } from "@/types/profile";
import { Project } from "@/types/project";
import { HomeData } from "@/types/home";

type PlatformKey = "github" | "facebook" | "youtube" | "linkedin" | "x" | "telegram" | "whatsapp" | "tiktok" | "instagram" | "website";

function detectPlatform(platform: string, url: string): PlatformKey {
  const source = `${platform} ${url}`.toLowerCase();

  if (source.includes("github") || source.includes("githu")) return "github";
  if (source.includes("facebook") || source.includes("fb")) return "facebook";
  if (source.includes("youtube") || source.includes("youtu.be")) return "youtube";
  if (source.includes("linkedin")) return "linkedin";
  if (source.includes("instagram") || source.includes("insta")) return "instagram";
  if (source.includes("twitter") || source.includes("x.com")) return "x";
  if (source.includes("telegram") || source.includes("t.me")) return "telegram";
  if (source.includes("whatsapp") || source.includes("wa.me")) return "whatsapp";
  if (source.includes("tiktok") || source.includes("tik tok") || source.includes("vm.tiktok") || source.includes("m.tiktok")) return "tiktok";

  return "website";
}

function platformLabel(platform: PlatformKey, fallback: string): string {
  if (platform === "github") return "GitHub";
  if (platform === "facebook") return "Facebook";
  if (platform === "youtube") return "YouTube";
  if (platform === "linkedin") return "LinkedIn";
  if (platform === "x") return "X";
  if (platform === "telegram") return "Telegram";
  if (platform === "whatsapp") return "WhatsApp";
  if (platform === "tiktok") return "TikTok";
  if (platform === "instagram") return "Instagram";

  const cleaned = fallback.trim();
  if (!cleaned) return "Website";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function SocialIcon({ platform }: { platform: PlatformKey }) {
  const common = "h-4 w-4";

  if (platform === "github") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.1 3.3 9.42 7.88 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.76 1.2 1.76 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.26-1.29-5.26-5.75 0-1.27.46-2.3 1.2-3.1-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.83 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.65.24 2.87.12 3.17.75.8 1.2 1.83 1.2 3.1 0 4.48-2.7 5.45-5.28 5.74.41.36.78 1.07.78 2.17 0 1.57-.01 2.84-.01 3.23 0 .31.2.67.8.55A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z" />
      </svg>
    );
  }

  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden="true">
        <path d="M24 12a12 12 0 1 0-13.88 11.86v-8.4H7.08V12h3.04V9.36c0-3 1.8-4.66 4.54-4.66 1.31 0 2.68.23 2.68.23v2.95h-1.5c-1.48 0-1.94.92-1.94 1.86V12h3.3l-.53 3.46h-2.77v8.4A12 12 0 0 0 24 12Z" />
      </svg>
    );
  }

  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden="true">
        <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.6 12 4.6 12 4.6s-7.6 0-9.4.5A3 3 0 0 0 .5 7.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-4.8ZM9.6 15.2V8.8L15.8 12l-6.2 3.2Z" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.63 0 4.3 2.38 4.3 5.48v6.26ZM5.3 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.08 20.45H3.5V9h3.57v11.45ZM22.22 0H1.77A1.78 1.78 0 0 0 0 1.78v20.44C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.78V1.78C24 .8 23.2 0 22.22 0Z" />
      </svg>
    );
  }

  if (platform === "x") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden="true">
        <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.5L6.38 22H3.28l7.24-8.28L.8 2h6.4l4.42 5.9L18.9 2Zm-1.1 18h1.72L6.27 3.9H4.43L17.8 20Z" />
      </svg>
    );
  }

  if (platform === "telegram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden="true">
        <path d="M9.9 15.2 9.7 19c.5 0 .7-.2 1-.4l2.3-2.2 4.8 3.5c.9.5 1.5.3 1.7-.8L23 3.9c.3-1.2-.4-1.7-1.3-1.4L1.8 10.2c-1.1.4-1.1 1 .2 1.4l5.3 1.7L19.5 6.6c.6-.4 1.2-.2.8.1" />
      </svg>
    );
  }

  if (platform === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden="true">
        <path d="M12 .5A11.5 11.5 0 0 0 2.2 17.9L1 23.5l5.8-1.1A11.5 11.5 0 1 0 12 .5Zm0 20.8a9.2 9.2 0 0 1-4.7-1.3l-.3-.2-3.4.6.7-3.2-.2-.3A9.3 9.3 0 1 1 12 21.3Zm5-6.7c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a7.6 7.6 0 0 1-2.2-1.3 8.4 8.4 0 0 1-1.6-2c-.2-.4 0-.6.1-.8l.5-.6c.2-.2.2-.4.4-.7s0-.5 0-.7-.7-1.8-1-2.5c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.1 1.1-1.1 2.7 1.2 3.1 1.4 3.4c.2.3 2.4 3.7 5.8 5.2.8.3 1.4.6 1.9.7.8.2 1.5.1 2-.1.6-.1 1.8-.8 2-1.6.2-.8.2-1.5.2-1.6 0-.1-.2-.2-.5-.4Z" />
      </svg>
    );
  }

  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden="true">
        <path d="M14 3h2.4c.3 1.7 1.5 3 3.1 3.3v2.6a8.1 8.1 0 0 1-3.1-1v6.6a5.4 5.4 0 1 1-5.5-5.4c.2 0 .4 0 .6.1V12a2.7 2.7 0 1 0 2.5 2.7V3Z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden="true">
      <path d="M9.5 14.5l5-5" />
      <path d="M10.5 6.5h-3a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h3" />
      <path d="M13.5 17.5h3a4 4 0 0 0 4-4v0a4 4 0 0 0-4-4h-3" />
    </svg>
  );
}

function findSocialUrl(links: { platform: string; url: string }[], keyword: string): string | null {
  const match = links.find((item) => {
    const source = `${item.platform} ${item.url}`.toLowerCase();
    return source.includes(keyword);
  });

  if (!match?.url) return null;
  if (match.url.startsWith("http://") || match.url.startsWith("https://")) return match.url;
  return `https://${match.url}`;
}

function normalizeSocialUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "#";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
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

function formatProjectDate(input: string): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "Recent";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

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

type AboutInitialData = {
  home: HomeData;
  projects: Project[];
};

type AboutPageClientProps = {
  initialData?: AboutInitialData | null;
  initialError?: string | null;
};

const fallbackProfile: Profile = {
  id: "fallback-about-profile",
  name: "Samuel Abera",
  role: "Software Engineering Student and Web Developer",
  bio: "Focused on building practical web applications while growing in modern software engineering and AI-driven products.",
  avatarUrl: "",
  resumeUrl: "",
  location: "Ethiopia",
  available: true,
  socialLinks: [],
};

export default function AboutPageClient({
  initialData = null,
}: AboutPageClientProps) {
  const homeData = initialData?.home ?? STATIC_HOME;
  const profile: Profile = homeData.profile ?? fallbackProfile;
  const projects: Project[] = (initialData?.projects ?? STATIC_PROJECTS).filter((item) => item.published);
  const fallbackMode = !initialData;
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [resumeError, setResumeError] = useState<string | null>(null);

  const isFallbackMode = fallbackMode;

  const handleResumeDownload = async () => {
    setDownloadingResume(true);
    setResumeError(null);

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

      const profileName = sanitizeForPdf(profile.name?.trim() || "Samuel Abera");
      const profileRole = sanitizeForPdf(profile.role?.trim() || "Aspiring Software Engineer");
      const profileLocation = sanitizeForPdf(profile.location?.trim() || "Ethiopia");

      const social = profile.socialLinks ?? [];
      const contactLinks = {
        email: "mailto:samuelabera.dev@gmail.com",
        github: findSocialUrl(social, "github") ?? "https://github.com/samuelabera21",
        linkedin: findSocialUrl(social, "linkedin") ?? "https://linkedin.com/in/samuelabera21",
      };

      const resumeProjects = [...projects]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        ;

      const allSkills = Object.values(homeData.skills ?? {}).flat();
      const uniqueSkills = Array.from(
        new Map(
          allSkills
            .map((skill) => skill.trim())
            .filter(Boolean)
            .map((skill): [string, string] => [skill.toLowerCase(), skill])
        ).values()
      );
      const displaySkills = uniqueSkills.slice(0, 20);
      const githubLabel = contactLinks.github.replace(/^https?:\/\//, "");
      const linkedinLabel = contactLinks.linkedin.replace(/^https?:\/\//, "");
      const summaryText = profile.bio?.trim() || "I am a software engineering student interested in web development and artificial intelligence.";

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
      doc.text(profileName, margin, 58);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(71, 85, 105);
      doc.text(profileRole, margin, 78);

      const contactLine = ["samuelabera.dev@gmail.com", githubLabel, linkedinLabel, profileLocation]
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
      setResumeError(message);
    } finally {
      setDownloadingResume(false);
    }
  };

  return (
    <section id="about" className="relative overflow-hidden bg-white pb-16 pt-10 text-slate-900 sm:pb-20">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#f4c400]/12 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-80px] top-[260px] h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 sm:px-10 lg:px-12">
        {isFallbackMode ? (
          <article className="rounded-3xl border border-[#f4c400]/20 bg-[#fffaf0] p-4 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <p className="font-semibold text-slate-950">About data is temporarily using fallback content.</p>
            <p className="mt-1 text-slate-600">
              The page will switch back to updated content automatically when the local data is refreshed.
            </p>
          </article>
        ) : null}

        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="space-y-5 border-b border-slate-200 pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Samuel Abera</p>
              <h2 className="mt-1 font-[family-name:var(--font-heading)] text-3xl font-bold text-slate-950 sm:text-4xl">{profile.name}</h2>
              <p className="mt-2 text-sm font-semibold text-emerald-600">{profile.role}</p>
            </div>

            <p className="max-w-4xl whitespace-pre-wrap text-sm leading-8 text-slate-600 sm:text-base">
              {profile.bio}
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[340px_1fr] lg:items-start">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-[#f8faf6] shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/ab.png"
                  alt="About portrait"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 340px"
                />
              </div>
            </div>

            <div className="space-y-7">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-slate-950 sm:text-4xl">About Me</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                  I build practical web applications, AI tools, and bilingual digital platforms that solve real user problems and create cleaner user experiences.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-[#f8faf6] px-4 py-3 text-sm text-slate-600">
                  <strong className="text-slate-950">Focus:</strong> Web apps, AI tools, and digital platforms
                </div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8faf6] px-4 py-3 text-sm text-slate-600">
                  <strong className="text-slate-950">Approach:</strong> Practical, user-centered, and scalable
                </div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8faf6] px-4 py-3 text-sm text-slate-600">
                  <strong className="text-slate-950">Open to:</strong> Freelance and collaboration
                </div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8faf6] px-4 py-3 text-sm text-slate-600">
                  <strong className="text-slate-950">Location:</strong> {profile.location || "Ethiopia"}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  {profile.location ? `Location: ${profile.location}` : "Location not set"}
                </span>

                <button
                  type="button"
                  onClick={handleResumeDownload}
                  disabled={downloadingResume}
                  className="rounded-xl border border-[#f4c400] bg-[#f4c400] px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-[#ffd84d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {downloadingResume ? "Downloading..." : "Download Resume"}
                </button>
              </div>

              {resumeError ? <p className="text-xs font-medium text-rose-500">{resumeError}</p> : null}

              <p className="text-base leading-8 text-slate-600">
                I focus on solving real-world problems through clean interfaces, fast user flows, and thoughtful product design.
              </p>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Social Links</h3>
                {profile.socialLinks.length === 0 ? (
                  <p className="mt-2 text-sm text-slate-500">No social links configured.</p>
                ) : (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {profile.socialLinks.map((link, index) => {
                      const platform = detectPlatform(link.platform, link.url);
                      const label = platformLabel(platform, link.platform);
                      return (
                        <a
                          key={`${link.platform}-${index}`}
                          href={normalizeSocialUrl(link.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="site-icon-hover inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#f4c400] hover:bg-[#fffaf0] hover:text-slate-950"
                          aria-label={label}
                          title={label}
                        >
                          <SocialIcon platform={platform} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        </article>

        {/* Skills and Interests removed from About page */}
      </div>
    </section>
  );
}

"use client";

import { HomeData } from "@/types/home";
import SectionShell from "@/components/home/SectionShell";
import HeroSection from "@/components/home/HeroSection";
import SocialSidebar from "@/components/home/SocialSidebar";
import { STATIC_PROFILE } from "@/lib/static-data";
// FeatureGridSection removed per request
import ProjectShowcaseList from "@/components/projects/ProjectShowcaseList";
import SkillsFlipSection from "@/components/home/SkillsFlipSection";
import TimelineSection from "@/components/home/TimelineSection";
import ContactSection from "@/components/home/ContactSection";
import CtaSection from "@/components/home/CtaSection";

type HomePageClientProps = {
  initialHomeData?: HomeData | null;
  initialError?: string | null;
};

export default function HomePageClient({
  initialHomeData = null,
}: HomePageClientProps) {
  const homeData = initialHomeData ?? {
    profile: STATIC_PROFILE,
    featuredProjects: [],
    skills: {},
    showProjects: true,
    showSkills: true,
    showBlog: false,
    availableForHire: true,
  };

  const profile = homeData.profile;
  const featuredProjects = homeData.featuredProjects ?? [];
  const skills = homeData.skills;
  const showProjects = homeData.showProjects ?? true;
  const showSkills = homeData.showSkills ?? true;
  const availableForHire = homeData.availableForHire ?? true;

  return (
    <section className="relative space-y-10 overflow-hidden bg-white pb-0">
      <SocialSidebar profile={STATIC_PROFILE} />
      
      <div className="pointer-events-none absolute -left-40 top-16 h-80 w-80 rounded-full bg-[#f4c400]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-80 h-80 w-80 rounded-full bg-emerald-400/12 blur-[120px]" />

      <div className="relative space-y-14 px-0 pt-0 lg:pl-24">
        <HeroSection profile={profile} showAvailableForHire={availableForHire} />

        <div className="mx-6 sm:mx-10 lg:mx-12">
          <CtaSection bio={profile.bio} />
        </div>

        {showProjects ? <ProjectShowcaseList projects={featuredProjects} compact viewAllHref="/projects" /> : null}

        {/* Explore more projects button (placed between featured projects and skills) */}
        {showProjects ? (
          <div className="mx-6 sm:mx-10 lg:mx-12 mt-6 flex justify-center">
            <a
              href="/projects"
              className="inline-flex items-center rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-md hover:brightness-95 focus:outline-none"
            >
              Explore more projects
            </a>
          </div>
        ) : null}

        {showSkills && skills ? (
          <SectionShell className="mx-6 sm:mx-10 lg:mx-12">
            <SkillsFlipSection skills={skills} />
          </SectionShell>
        ) : null}

        <SectionShell className="mx-6 sm:mx-10 lg:mx-12">
          <TimelineSection />
        </SectionShell>

        <SectionShell className="mx-6 sm:mx-10 lg:mx-12">
          <ContactSection />
        </SectionShell>

        {/* Development Workflow removed for static portfolio */}

        {/* FeatureGridSection removed per request */}

      </div>
    </section>
  );
}

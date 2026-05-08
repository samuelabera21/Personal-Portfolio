"use client";

import { usePathname } from "next/navigation";
import EnterpriseFooter from "@/components/home/EnterpriseFooter";
import { STATIC_PROFILE } from "@/lib/static-data";
import { Profile } from "@/types/profile";

type GlobalFooterProps = {
  initialProfile?: Profile | null;
};

const fallbackProfile: Profile = {
  id: "fallback-footer-profile",
  name: "Samuel Abera",
  role: "Software Engineer",
  bio: "Portfolio footer content is temporarily using fallback data while local content is refreshed.",
  avatarUrl: "",
  resumeUrl: "",
  location: "Ethiopia",
  available: true,
  socialLinks: [],
};

export default function GlobalFooter({ initialProfile = null }: GlobalFooterProps) {
  const pathname = usePathname();
  const hideOnAdmin = pathname.startsWith("/admin");
  const profile = initialProfile ?? STATIC_PROFILE ?? fallbackProfile;

  if (hideOnAdmin || !profile) return null;

  return <EnterpriseFooter profile={profile} />;
}

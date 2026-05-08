"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Profile } from "@/types/profile";

type PlatformKey = "x" | "facebook" | "instagram" | "linkedin" | "github" | "youtube" | "telegram" | "whatsapp" | "tiktok" | "website";

function normalizeSocialUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "#";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
}

function detectPlatform(platform: string, url: string): PlatformKey {
  const source = `${platform} ${url}`.toLowerCase();
  if (source.includes("twitter") || source.includes("x.com") || source.includes("x ")) return "x";
  if (source.includes("facebook") || source.includes("fb")) return "facebook";
  if (source.includes("instagram") || source.includes("insta")) return "instagram";
  if (source.includes("linkedin")) return "linkedin";
  if (source.includes("github") || source.includes("githu")) return "github";
  if (source.includes("youtube") || source.includes("youtu.be") || source.includes("yt")) return "youtube";
  if (source.includes("telegram") || source.includes("t.me")) return "telegram";
  if (source.includes("whatsapp") || source.includes("wa.me")) return "whatsapp";
  if (source.includes("tiktok") || source.includes("tik tok") || source.includes("tt")) return "tiktok";
  return "website";
}

function SocialIcon({ platform }: { platform: PlatformKey }) {
  if (platform === "github") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.1 3.3 9.42 7.88 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.76 1.2 1.76 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.26-1.29-5.26-5.75 0-1.27.46-2.3 1.2-3.1-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.83 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.65.24 2.87.12 3.17.75.8 1.2 1.83 1.2 3.1 0 4.48-2.7 5.45-5.28 5.74.41.36.78 1.07.78 2.17 0 1.57-.01 2.84-.01 3.23 0 .31.2.67.8.55A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.63 0 4.3 2.38 4.3 5.48v6.26ZM5.3 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.08 20.45H3.5V9h3.57v11.45ZM22.22 0H1.77A1.78 1.78 0 0 0 0 1.78v20.44C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.78V1.78C24 .8 23.2 0 22.22 0Z" />
      </svg>
    );
  }

  if (platform === "telegram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M9.9 15.2 9.7 19c.5 0 .7-.2 1-.4l2.3-2.2 4.8 3.5c.9.5 1.5.3 1.7-.8L23 3.9c.3-1.2-.4-1.7-1.3-1.4L1.8 10.2c-1.1.4-1.1 1 .2 1.4l5.3 1.7L19.5 6.6c.6-.4 1.2-.2.8.1" />
      </svg>
    );
  }

  if (platform === "x") {
    return <span className="text-lg font-bold leading-none">X</span>;
  }

  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 12a12 12 0 1 0-13.88 11.86v-8.4H7.08V12h3.04V9.36c0-3 1.8-4.66 4.54-4.66 1.31 0 2.68.23 2.68.23v2.95h-1.5c-1.48 0-1.94.92-1.94 1.86V12h3.3l-.53 3.46h-2.77v8.4A12 12 0 0 0 24 12Z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M14 3h2.4c.3 1.7 1.5 3 3.1 3.3v2.6a8.1 8.1 0 0 1-3.1-1v6.6a5.4 5.4 0 1 1-5.5-5.4c.2 0 .4 0 .6.1V12a2.7 2.7 0 1 0 2.5 2.7V3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

type Props = {
  profile: Profile;
};

export default function SocialSidebar({ profile }: Props) {
  const [hiddenByFooter, setHiddenByFooter] = useState(false);

  const socialLinks = profile.socialLinks
    .map((item) => ({
      ...item,
      url: normalizeSocialUrl(item.url),
      platform: detectPlatform(item.platform, item.url),
    }))
    .filter((link) => link.url !== "#");

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const updateVisibility = () => {
      const footerRect = footer.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.95;
      setHiddenByFooter(footerRect.top <= triggerLine);
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (socialLinks.length === 0) return null;
  if (hiddenByFooter) return null;

  return (
      <>
        {/* Desktop Floating Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 rounded-full px-3 py-4 bg-white/75 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-40 transition-all duration-300"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={`${link.platform}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 text-slate-700 transition-all duration-300 hover:bg-yellow-400 hover:text-slate-900 hover:shadow-md"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.platform}
              title={link.platform}
            >
              <SocialIcon platform={link.platform} />
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile Floating Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden flex items-center gap-2 rounded-full px-4 py-3 bg-white/75 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-40 transition-all duration-300"
        >
          {socialLinks.slice(0, 5).map((link) => (
            <motion.a
              key={`mobile-${link.platform}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100 text-slate-700 transition-all duration-300 hover:bg-yellow-400 hover:text-slate-900"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.platform}
              title={link.platform}
            >
              <SocialIcon platform={link.platform} />
            </motion.a>
          ))}
        </motion.div>
      </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { STATIC_PROFILE } from "@/lib/static-data";

const links = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/resume", label: "RESUME" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT" },
];

type NavbarProps = {
  showBlog?: boolean;
};

export default function Navbar({ showBlog = true }: NavbarProps) {
  const pathname = usePathname();
  const hideOnAdmin = pathname.startsWith("/admin");
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleLinks = useMemo(
    () => links.filter((link) => (link.href === "/blog" ? showBlog : true)),
    [showBlog]
  );

  if (hideOnAdmin) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-10">
        {/* Left: Profile Logo and Name */}
        <Link
          href="/"
          aria-label="Home"
          className="inline-flex items-center gap-3 rounded-lg transition hover:opacity-80"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm flex-shrink-0">
            <Image
              src={STATIC_PROFILE.avatarUrl || "/fav.jpg"}
              alt={STATIC_PROFILE.name || "Samuel Abera"}
              width={48}
              height={48}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <span className="hidden font-bold text-slate-950 tracking-wide sm:inline text-sm">
            {(STATIC_PROFILE.name || "SAMUEL ABERA").toUpperCase()}
          </span>
        </Link>

        {/* Center/Right: Navigation Links */}
        <div className="hidden items-center gap-8 text-sm font-bold text-slate-700 md:flex">
          {visibleLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 hover:text-slate-950 ${
                  isActive
                    ? "text-yellow-500"
                    : "text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          <span className="text-xl leading-none">{mobileOpen ? "\u2715" : "\u2630"}</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          mobileOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-slate-200 bg-white transition-all duration-300`}
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-3">
          {visibleLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-yellow-100 text-yellow-700"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

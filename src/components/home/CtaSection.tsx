"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  bio?: string;
};

function normalizeBio(value?: string): string {
  const text = value?.replace(/\s+/g, " ").trim();
  if (!text) {
    return "Building scalable web applications and learning applied AI systems.";
  }

  return text;
}

export default function CtaSection({ bio }: Props) {
  const aboutBio = normalizeBio(bio);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_26px_80px_rgba(15,23,42,0.08)] sm:p-10"
    >
      <div className="pointer-events-none absolute -left-24 bottom-8 h-60 w-60 rounded-full bg-[#f4c400]/15 blur-[90px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-[100px]" />

      <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:items-stretch">
        <div className="flex gap-6 sm:gap-8">
          <div className="relative hidden w-4 shrink-0 sm:block">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/35" />
            <motion.span
              className="absolute left-1/2 top-8 h-24 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/95 to-blue-300/60"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">About Me</p>
              <Link
                href="/about"
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#f4c400]/10 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-[#fff2b8]"
              >
                Full story
                <span className="text-sm leading-none transition-transform group-hover:translate-x-0.5">↗</span>
              </Link>
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Who I am?</p>
            <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              <span className="block">Aspiring Software Engineer</span>
              <span className="block"></span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-9 text-slate-600">
              {aboutBio}
            </p>

            <div className="mt-8 max-w-2xl space-y-2">
              <p className="text-lg font-semibold text-slate-950">Let&apos;s Build Something Powerful Together</p>
              <p className="text-sm leading-7 text-slate-600">
                Have a project, internship, or product idea? Let&apos;s collaborate on meaningful software engineering systems.
              </p>
            </div>

            <motion.div whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 220, damping: 18 }} className="mt-6 inline-flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-xl border border-[#f4c400] bg-[#f4c400] px-5 py-3 text-base font-semibold text-slate-950 shadow-[0_14px_30px_rgba(244,196,0,0.24)] transition hover:bg-[#ffd333] hover:border-[#ffd333]"
              >
                Contact Me
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-xl border border-[#f4c400] bg-[#f4c400] px-5 py-3 text-base font-semibold text-slate-950 shadow-[0_14px_30px_rgba(244,196,0,0.24)] transition hover:bg-[#ffd333] hover:border-[#ffd333]"
              >
                Who is Samuel?
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.article
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          whileHover={{ y: -4 }}
          className="flex h-full flex-col rounded-3xl border border-slate-200 bg-[#eef6ec] p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Looking For Opportunities</p>
          <h3 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-semibold text-slate-950"> </h3>
          <p className="mt-8 text-lg text-slate-800">Full-Stack &amp; AI Opportunities</p>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Open to internships  in web development and applied AI. Interested in building real-world systems and scalable applications.
          </p>

          <div className="mt-8">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-xl border border-slate-300 px-5 py-3 text-base font-semibold text-slate-700 transition hover:border-[#f4c400] hover:bg-[#fffaf0] hover:text-slate-950"
            >
              View Projects
              <span className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="mt-auto flex items-center justify-center gap-3 pt-8">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className={`h-2.5 w-2.5 rounded-full ${dot === 1 ? "bg-[#f4c400]" : "bg-slate-300"}`}
                animate={{ opacity: dot === 1 ? [0.5, 1, 0.5] : [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.3, repeat: Infinity, delay: dot * 0.2 }}
              />
            ))}
          </div>
        </motion.article>
      </div>
    </motion.section>
  );
}

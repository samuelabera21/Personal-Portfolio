"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function SectionShell({
  eyebrow,
  title,
  description,
  children,
  className = "",
  id,
}: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-[#f8faf6] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${className}`}
    >
      {(eyebrow || title || description) && (
        <div className="mb-6 space-y-2">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{eyebrow}</p>
          ) : null}
          {title ? (
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h2>
          ) : null}
          {description ? (
            <p className="max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
          ) : null}
        </div>
      )}

      {children}
    </motion.section>
  );
}

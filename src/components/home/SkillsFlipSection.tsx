"use client";

import { motion } from "framer-motion";
import { GroupedSkills } from "@/types/skill";
import TechBadge from "@/components/TechBadge";

type Props = {
  skills: GroupedSkills;
};

const preferredOrder = [
  "frontend",
  "core",
  "tools",
  "mobile",
  "devops",
  "cloud",
  "database",
  "ai-ml",
  "data-science",
  "cybersecurity",
  "testing",
  "ui-ux",
  "system-design",
  "productivity",
];

function formatCategoryLabel(category: string): string {
  const key = category.toLowerCase();
  const special: Record<string, string> = {
    "ai-ml": "AI / ML",
    "data-science": "Data Science",
    "ui-ux": "UI / UX",
    devops: "DevOps",
    "system-design": "System Design",
  };

  if (special[key]) return special[key];
  return category
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function SkillsFlipSection({ skills }: Props) {
  const categories = Object.keys(skills)
    .filter((category) => (skills[category] ?? []).length > 0)
    .sort((a, b) => {
      const aIndex = preferredOrder.indexOf(a.toLowerCase());
      const bIndex = preferredOrder.indexOf(b.toLowerCase());

      if (aIndex >= 0 && bIndex >= 0) return aIndex - bIndex;
      if (aIndex >= 0) return -1;
      if (bIndex >= 0) return 1;
      return a.localeCompare(b);
    });

  return (
    <section>
      <div className="mb-6 border-b border-white/10 pb-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.4 }}
          whileHover={{ y: -2, scale: 1.01 }}
          className="font-[family-name:var(--font-heading)] text-2xl font-bold text-slate-950 sm:text-3xl"
        >
          My skills
        </motion.h2>
      </div>

      <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categories.map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex h-full"
          >
            <div
              tabIndex={0}
              className="flex-1 transform-gpu rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_20px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:scale-105 overflow-hidden flex flex-col"
              style={{ minHeight: 140 }}
            >
              <div>
                <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-slate-900">{formatCategoryLabel(category)} Skills</h4>

                <div className="mt-3 flex flex-wrap items-start gap-2">
                  {(skills[category] ?? []).map((item) => (
                    <TechBadge key={`${category}-${item}`} label={item} />
                  ))}
                </div>
              </div>

              <div className="mt-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// TechBadge moved to shared component

"use client";

import { motion } from "framer-motion";
import { Profile } from "@/types/profile";


type Props = {
  profile: Profile;
  showAvailableForHire: boolean;
};

export default function HeroSection({ profile, showAvailableForHire }: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(250, 204, 21, 0.3)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-20">
      {/* Subtle background polygons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-slate-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-slate-300/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-yellow-200/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-6 sm:px-12 flex flex-col items-center justify-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tighter text-slate-950 whitespace-nowrap"
        >
          HEY, I'M {(profile.name || "SAMUEL ABERA").toUpperCase()}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600"
        >
          {profile.bio ||
            "Aspiring Software Engineer and Web Developer focused on building scalable, user-centered applications. Passionate about Artificial Intelligence and its potential to solve real-world problems."}
        </motion.p>

        {/* Status Badge */}
        {showAvailableForHire && profile.available ? (
          <motion.div
            variants={itemVariants}
            className="mt-5 inline-block"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              <span className="text-base">✓</span> Available for hire
            </span>
          </motion.div>
        ) : null}

        {/* Projects Button */}
        <motion.div variants={itemVariants} className="mt-8">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                const element = document.getElementById("featured-projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="px-12 py-4 bg-yellow-400 text-slate-950 font-extrabold text-lg uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-yellow-500 shadow-lg cursor-pointer"
            >
              PROJECTS
            </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

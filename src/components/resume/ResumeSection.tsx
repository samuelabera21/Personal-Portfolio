import { ReactNode } from "react";

type ResumeSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function ResumeSection({ title, children, className = "" }: ResumeSectionProps) {
  return (
    <section className={`mb-6 ${className}`.trim()}>
      <h2 className="mb-3 text-lg font-semibold text-slate-950">{title}</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
        {children}
      </div>
    </section>
  );
}
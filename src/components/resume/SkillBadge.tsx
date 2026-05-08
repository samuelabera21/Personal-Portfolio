type SkillBadgeProps = {
  label: string;
};

export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="rounded-full border border-slate-200 bg-[#f8faf6] px-3 py-1 text-sm text-slate-700">
      {label}
    </span>
  );
}
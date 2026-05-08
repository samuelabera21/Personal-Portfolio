"use client";

type TechBadgeProps = {
  label: string;
  className?: string;
};

export default function TechBadge({ label, className = "" }: TechBadgeProps) {
  const key = label.toLowerCase();

  const Icon = () => {
    if (/react/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#61dafb]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="12" rx="6.5" ry="2.5" transform="rotate(0 12 12)" />
            <ellipse cx="12" cy="12" rx="6.5" ry="2.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="6.5" ry="2.5" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );
    }

    if (/next/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#000000]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12 L12 3 L21 12 L12 21 Z" />
        </svg>
      );
    }

    if (/typescript|\bts\b/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#3178c6]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <text x="12" y="16" fontSize="9" fontWeight="700" textAnchor="middle" fill="#fff">TS</text>
        </svg>
      );
    }

    if (/tailwind/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#06b6d4]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 16c6 0 6-6 12-6 6 0 6 6 12 6v2c-12 0-12 6-24 0v-2z" />
        </svg>
      );
    }

    if (/framer|motion/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#ff0080]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      );
    }

    if (/html/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#e34f26]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2h20l-1.8 18L12 22 3.8 20 2 2z" />
        </svg>
      );
    }

    if (/css/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#264de4]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2h18l-1.8 18L12 22 4.8 20 3 2z" />
        </svg>
      );
    }

    if (/javascript|\bjs\b/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f7df1e]" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="2" />
          <text x="12" y="16" fontSize="9" fontWeight="700" textAnchor="middle">JS</text>
        </svg>
      );
    }

    if (/bootstrap/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#7952b3]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <text x="12" y="16" fontSize="9" fontWeight="700" textAnchor="middle" fill="#fff">B</text>
        </svg>
      );
    }

    if (/python/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#306998]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2c-3 0-4 1-4 3v2h8V5c0-2-1-3-4-3zM12 22c3 0 4-1 4-3v-2H8v2c0 2 1 3 4 3z" />
        </svg>
      );
    }

    if (/git/.test(key) && !/github/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f34f29]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3l6 6-6 6-6-6 6-6z" />
        </svg>
      );
    }

    if (/github/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#24292f]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.1 3.3 9.42 7.88 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.76 1.2 1.76 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.26-1.29-5.26-5.75 0-1.27.46-2.3 1.2-3.1-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.83 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.65.24 2.87.12 3.17.75.8 1.2 1.83 1.2 3.1 0 4.48-2.7 5.45-5.28 5.74.41.36.78 1.07.78 2.17 0 1.57-.01 2.84-.01 3.23 0 .31.2.67.8.55A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z" />
        </svg>
      );
    }

    if (/vscode|vs code/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0078d4]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v18H3z" />
        </svg>
      );
    }

    if (/postman/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#ff6c37]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l6 6-6 6-6-6 6-6z" />
        </svg>
      );
    }

    if (/jira/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0052cc]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    }

    if (/figma/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#ff7262]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="4" height="4" rx="2" />
        </svg>
      );
    }

    if (/postgres|postgresql/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#336791]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="8" ry="4" />
        </svg>
      );
    }

    if (/mysql/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#00758f]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12c4-6 16-6 20 0-4 6-16 6-20 0z" />
        </svg>
      );
    }

    if (/mongo|mongodb/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#47a248]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2c0 6-6 8-6 12 0 2 2 4 6 4s6-2 6-4c0-4-6-6-6-12z" />
        </svg>
      );
    }

    if (/prisma/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0ea5a4]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h16v16H4z" />
        </svg>
      );
    }

    if (/node|node\.js/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#43853d]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    }

    if (/express/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#000000]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      );
    }

    if (/fastapi/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0099ff]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12h20" />
        </svg>
      );
    }

    if (/spring|spring boot/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#6db33f]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2s6 4 6 10-6 10-6 10-6-4-6-10 6-10 6-10z" />
        </svg>
      );
    }

    if (/laravel/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#ff2d20]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v18H3z" />
        </svg>
      );
    }

    if (/docker/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#2496ed]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="8" width="18" height="10" rx="2" />
        </svg>
      );
    }

    if (/machine learning|machine|ml/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#7c3aed]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
    }

    if (/prompt/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0ea5a4]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12h18" />
        </svg>
      );
    }

    if (/rag/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f59e0b]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7h16v3H4zM4 14h16v3H4z" />
        </svg>
      );
    }

    if (/tensorflow/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#ff6f00]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h6l3 12h6l-3-12h6v-6H3v6z" />
        </svg>
      );
    }

    if (/pytorch|torch/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#ee4c2c]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2c3 2 5 4 5 7a5 5 0 0 1-10 0c0-3 2-5 5-7zM7 16c1-1 3-1 5-1s4 0 5 1c0 3-2 5-5 5s-5-2-5-5z" />
        </svg>
      );
    }

    if (/team|collab|collaboration/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0f766e]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20c0-2 3-3 8-3s8 1 8 3v1H4v-1z" />
        </svg>
      );
    }

    if (/project|management|pm/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#be185d]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5h18v2H3V5zm0 6h10v2H3v-2zm0 6h6v2H3v-2z" />
        </svg>
      );
    }

    if (/present|presentation|slide/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0ea5a4]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 3h16v12H4zM2 21h20v-2H2v2z" />
        </svg>
      );
    }

    if (/write|written|communication/.test(key)) {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#4b5563]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v14H3V3zm2 2v10h14V5H5zM7 17h10v2H7v-2z" />
        </svg>
      );
    }

    return null;
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#f8faf6] px-2 py-0.5 text-xs text-slate-700 ${className}`.trim()}>
      <span className="flex h-3.5 w-3.5 items-center justify-center">{Icon()}</span>
      <span className="leading-4">{label}</span>
    </span>
  );
}

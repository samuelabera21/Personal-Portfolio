"use client";

import { Suspense } from "react";
import Link from "next/link";

function UnsubscribeContent() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-6 py-16 sm:px-10">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Newsletter</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Manage your subscription</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">This static frontend does not process unsubscribe actions yet.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-xl bg-[#f4c400] px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#ffd84d]">
            Go to home
          </Link>
          <Link href="/contact" className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#f4c400] hover:bg-[#fffaf0] hover:text-slate-950">
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<section className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-6 py-16 sm:px-10"><div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-10"><p className="text-sm leading-7 text-slate-600">Processing your request...</p></div></section>}>
      <UnsubscribeContent />
    </Suspense>
  );
}

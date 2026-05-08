"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function InfoIcon({ kind }: { kind: "address" | "phone" | "email" }) {
  if (kind === "address") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
        <path d="M12 21s-7-5.8-7-11a7 7 0 1 1 14 0c0 5.2-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.4" />
      </svg>
    );
  }

  if (kind === "phone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2L8 9.4a16 16 0 0 0 6.6 6.6l1.1-1.1a2 2 0 0 1 2-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9Z" />
      </svg>
    );
  }

  if (kind === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 11 15.4 6.9M8.6 13l6.8 4.1" />
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const formspreeEndpoint = "https://formspree.io/f/xpqbjlqe";
      
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setSuccess("Message sent successfully! I'll get back to you soon.");
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-16 pt-10 text-slate-900 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#f4c400]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-72 h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Contact</p>
          <h1 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">CONTACT</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Send your project idea, collaboration request, or question. I usually respond quickly with next steps.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f4c400]/25 bg-[#fffaf0] text-[#f4c400]">
                  <InfoIcon kind="address" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-heading)] text-base font-semibold text-slate-950 sm:text-lg">Address</h2>
                  <p className="mt-1 text-sm text-slate-600">Ethiopia</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f4c400]/25 bg-[#fffaf0] text-[#f4c400]">
                  <InfoIcon kind="phone" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-heading)] text-base font-semibold text-slate-950 sm:text-lg">Call Me</h2>
                  <a href="tel:+251923010537" className="mt-1 block text-sm text-slate-600 hover:text-slate-950">
                    +251923010537
                  </a>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f4c400]/25 bg-[#fffaf0] text-[#f4c400]">
                  <InfoIcon kind="email" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-heading)] text-base font-semibold text-slate-950 sm:text-lg">Email Me</h2>
                  <a href="mailto:Samuelabera.dev@gmail.com" className="mt-1 block text-sm text-slate-600 hover:text-slate-950">
                    Samuelabera.dev@gmail.com
                  </a>
                </div>
              </div>
            </article>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-7">
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f4c400]"
              placeholder="Your Name"
              required
            />

            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f4c400]"
              placeholder="Your Email"
              required
            />

            <input
              id="subject"
              value={form.subject}
              onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
              className="sm:col-span-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f4c400]"
              placeholder="Subject"
            />

            <textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              className="sm:col-span-2 min-h-36 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f4c400]"
              placeholder="Message"
              required
            />

            {success ? (
              <p className="sm:col-span-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {success}
              </p>
            ) : null}

            {error ? (
              <p className="sm:col-span-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                {error}
              </p>
            ) : null}

              <div className="sm:col-span-2 flex justify-center pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full border border-[#f4c400] bg-[#f4c400] px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#ffd84d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

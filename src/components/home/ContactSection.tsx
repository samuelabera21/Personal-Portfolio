"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

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

export default function ContactSection() {
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
          Accept: "application/json",
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
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_26px_80px_rgba(15,23,42,0.08)] sm:p-10"
    >
      <div className="pointer-events-none absolute -left-24 bottom-8 h-60 w-60 rounded-full bg-[#f4c400]/15 blur-[90px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-[100px]" />

      <div className="relative space-y-8">
        <div className="flex gap-6 sm:gap-8">
          <div className="relative hidden w-4 shrink-0 sm:block">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/35" />
            <motion.span
              className="absolute left-1/2 top-8 h-24 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/95 to-cyan-300/60"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Contact</p>
            <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Let&apos;s build something together
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-9 text-slate-600">
              Have a project, internship, or collaboration idea? Reach out and I&apos;ll get back to you quickly.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-7"
        >
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
              className="sm:col-span-2 min-h-32 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f4c400]"
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
        </motion.div>
      </div>
    </motion.section>
  );
}
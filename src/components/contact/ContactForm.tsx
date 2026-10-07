"use client";

import { Check, Send } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { contactEmail } from "@/content/socialLinks";
import { cn } from "@/lib/cn";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

/**
 * Optional message form. With NEXT_PUBLIC_CONTACT_ENDPOINT set (for example a
 * Formspree URL) it posts JSON; otherwise it opens the visitor's email app with
 * the message filled in. No account, no tracking.
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

function validate(data: FormData) {
  const errors: Partial<Record<Field, string>> = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (!name) errors.name = "Please add your name.";
  if (!email) errors.email = "Please add an email address so I can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "That email address doesn't look complete.";
  if (message.length < 10) errors.message = "A sentence or two is enough, but please say what it's about.";
  return errors;
}

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot: bots fill hidden fields

    const found = validate(data);
    setErrors(found);
    const first = (["name", "email", "message"] as Field[]).find((f) => found[f]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message")).trim();

    if (endpoint) {
      setStatus("sending");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, company, message }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = `Portfolio enquiry from ${name}${company ? ` (${company})` : ""}`;
    const body = `${message}\n\n${name}${company ? `\n${company}` : ""}\n${email}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  }

  const fieldClass = (field?: Field) =>
    cn(
      "w-full rounded-[3px] border bg-bg px-3.5 text-[0.9375rem] text-fg transition-[border-color,box-shadow] duration-150 placeholder:text-fg-subtle focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none",
      field && errors[field] ? "border-[#f0716b]" : "border-line-strong",
    );

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="mt-1.5 text-sm text-[#f0716b] light:text-[#b42318]">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="frame p-5 sm:p-7" aria-labelledby={`${id}-title`}>
      <p className="meta text-fg-subtle">Message · optional</p>
      <h3 id={`${id}-title`} className="mt-2 text-lg font-semibold tracking-[-0.015em] text-fg">
        Send a message
      </h3>
      <p className="mt-1 text-sm text-fg-subtle">
        {endpoint ? "Goes straight to my inbox." : "Opens your email app with the message ready to send."}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium text-fg-muted">
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            className={cn(fieldClass("name"), "h-11")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-medium text-fg-muted">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={cn(fieldClass("email"), "h-11")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
          />
          {errorText("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-company`} className="mb-1.5 block text-sm font-medium text-fg-muted">
            Company or role <span className="font-normal text-fg-subtle">(optional)</span>
          </label>
          <input id={`${id}-company`} name="company" autoComplete="organization" className={cn(fieldClass(), "h-11")} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-medium text-fg-muted">
            Message
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={5}
            className={cn(fieldClass("message"), "resize-y py-3 leading-relaxed")}
            placeholder="The role, the environment, or the problem you're dealing with."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `${id}-message-error` : undefined}
          />
          {errorText("message")}
        </div>
        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p role="status" aria-live="polite" className="text-sm text-fg-muted">
          {status === "sent" ? (
            <span className="inline-flex items-center gap-2 text-ok">
              <Check size={15} aria-hidden="true" /> Thanks, your message was sent.
            </span>
          ) : status === "mailto" ? (
            <span>
              Your email app should open with the message. If it didn&apos;t, write to{" "}
              <a href={`mailto:${contactEmail}`} className="text-accent underline underline-offset-4">
                {contactEmail}
              </a>
              .
            </span>
          ) : status === "error" ? (
            <span>
              Something went wrong. Please email{" "}
              <a href={`mailto:${contactEmail}`} className="text-accent underline underline-offset-4">
                {contactEmail}
              </a>
              .
            </span>
          ) : null}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 items-center gap-2 bg-accent px-5 text-[0.9375rem] font-medium text-accent-fg transition-colors hover:bg-accent-strong disabled:opacity-60"
        >
          <Send size={15} aria-hidden="true" />
          {status === "sending" ? "Sending…" : endpoint ? "Send message" : "Compose email"}
        </button>
      </div>
    </form>
  );
}

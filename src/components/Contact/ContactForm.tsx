"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

import { contactInfo } from "@/data/personalInfo";
import { buildMailtoUrl, cn, isValidEmail } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

type FieldName = "name" | "email" | "subject" | "message";
type Values = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error" | "fallback";

const EMPTY: Values = { name: "", email: "", subject: "", message: "" };

const FIELD_META: Array<{
  name: FieldName;
  label: string;
  placeholder: string;
  type: "text" | "email";
  autoComplete: string;
  textarea?: boolean;
}> = [
  {
    name: "name",
    label: "Name",
    placeholder: "Your name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "subject",
    label: "Subject",
    placeholder: "What is this about?",
    type: "text",
    autoComplete: "off",
  },
  {
    name: "message",
    label: "Message",
    placeholder: "Tell me about your idea, project or question…",
    type: "text",
    autoComplete: "off",
    textarea: true,
  },
];

function validate(values: Values): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Please add a short subject.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please write a little more detail.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = status === "submitting";

  function updateField(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  function focusFirstError(nextErrors: FieldErrors) {
    const first = FIELD_META.find((field) => nextErrors[field.name]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`#contact-${first.name}`);
    el?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        errors?: FieldErrors;
      };

      if (response.ok && data.ok) {
        setStatus("success");
        setValues(EMPTY);
        return;
      }

      if (data.code === "validation" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        focusFirstError(data.errors);
        return;
      }

      // No email service configured on this deployment — be upfront about it
      // and offer a pre-filled mailto draft instead of pretending it sent.
      if (data.code === "not_configured") {
        setStatus("fallback");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center rounded-2xl border border-mint/25 bg-mint/[0.05] p-8 text-center sm:p-10"
            role="status"
            aria-live="polite"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-mint/30 bg-mint/10 text-mint">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold text-chalk">
              Message sent
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
              Thanks for reaching out — your message was delivered successfully.
              I&apos;ll get back to you as soon as I can.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-full border border-white/12 px-4 py-2 text-xs text-mist transition-colors hover:border-gold/40 hover:text-chalk"
            >
              Send another message
            </button>
          </motion.div>
        ) : status === "fallback" ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.05] p-7 sm:p-8"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-chalk">
                  One more step — send it by email
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-mist">
                  This deployment doesn&apos;t have an email service connected
                  yet, so your message hasn&apos;t been sent through the site.
                  Use the button below to open a pre-filled draft in your mail
                  app, or email me directly at{" "}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="link-underline text-chalk"
                  >
                    {contactInfo.email}
                  </a>
                  .
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink
                    href={buildMailtoUrl({
                      to: contactInfo.email,
                      name: values.name,
                      email: values.email,
                      subject: values.subject,
                      message: values.message,
                    })}
                    size="md"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Open mail app
                  </ButtonLink>
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => setStatus("idle")}
                  >
                    Back to the form
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008))] p-6 sm:p-8"
            aria-label="Contact form"
          >
            {status === "error" ? (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/[0.07] p-4"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
                <p className="text-[0.82rem] leading-relaxed text-mist">
                  Something went wrong while sending your message. Please try
                  again, or email me directly at{" "}
                  <a href={`mailto:${contactInfo.email}`} className="link-underline text-chalk">
                    {contactInfo.email}
                  </a>
                  .
                </p>
              </div>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              {FIELD_META.map((field) => {
                const error = errors[field.name];
                const shared = {
                  id: `contact-${field.name}`,
                  name: field.name,
                  value: values[field.name],
                  onChange: (
                    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                  ) => updateField(field.name, event.target.value),
                  placeholder: field.placeholder,
                  "aria-invalid": Boolean(error),
                  "aria-describedby": error ? `contact-${field.name}-error` : undefined,
                  required: true,
                  disabled: isSubmitting,
                  className: cn(
                    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-chalk outline-none transition-colors duration-200",
                    "placeholder:text-dim/70 disabled:opacity-60",
                    error
                      ? "border-danger/50 focus:border-danger/70"
                      : "border-white/10 focus:border-gold/50 focus:bg-white/[0.05]",
                  ),
                };

                return (
                  <div
                    key={field.name}
                    className={cn(field.name === "message" && "sm:col-span-2")}
                  >
                    <label
                      htmlFor={`contact-${field.name}`}
                      className="mb-2 block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-dim"
                    >
                      {field.label}
                    </label>

                    {field.textarea ? (
                      <textarea {...shared} rows={5} className={cn(shared.className, "resize-y")} />
                    ) : (
                      <input {...shared} type={field.type} autoComplete={field.autoComplete} />
                    )}

                    {error ? (
                      <p
                        id={`contact-${field.name}-error`}
                        className="mt-1.5 flex items-center gap-1.5 text-[0.72rem] text-danger"
                      >
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {error}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-[16rem] text-[0.7rem] leading-relaxed text-dim">
                Your details are only used to reply to this message.
              </p>

              <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[11rem]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>

            <p className="sr-only" role="status" aria-live="polite">
              {isSubmitting ? "Sending your message" : ""}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

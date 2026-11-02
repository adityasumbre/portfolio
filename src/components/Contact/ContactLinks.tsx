"use client";

import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { contactInfo } from "@/data/personalInfo";

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-gold transition-colors duration-300 group-hover:border-gold/30 group-hover:bg-gold/[0.07]">
      {children}
    </span>
  );
}

export function ContactLinks() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const copyEmail = useCallback(async () => {
    const email = contactInfo.email;

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for browsers without the async clipboard API.
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing else we can do — the mailto link still works */
      }
      document.body.removeChild(textarea);
    }

    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }, []);

  const links = [
    contactInfo.github
      ? {
          id: "github",
          label: "GitHub",
          value: contactInfo.github.replace(/^https?:\/\/(www\.)?/, ""),
          href: contactInfo.github,
          icon: <GithubIcon className="h-4 w-4" />,
        }
      : null,
    contactInfo.linkedin
      ? {
          id: "linkedin",
          label: "LinkedIn",
          value: contactInfo.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
          href: contactInfo.linkedin,
          icon: <LinkedinIcon className="h-4 w-4" />,
        }
      : null,
  ].filter((link): link is NonNullable<typeof link> => link !== null);

  return (
    <div className="space-y-2.5">
      {/* Email — has its own copy action */}
      <div className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]">
        <a
          href={`mailto:${contactInfo.email}`}
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <IconTile>
            <Mail className="h-4.5 w-4.5" aria-hidden="true" />
          </IconTile>
          <span className="min-w-0">
            <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-dim">
              Email
            </span>
            <span className="block truncate text-sm text-chalk">
              {contactInfo.email}
            </span>
          </span>
        </a>

        <button
          type="button"
          onClick={copyEmail}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-dim transition-colors hover:border-gold/35 hover:text-chalk"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
        >
          <IconTile>{link.icon}</IconTile>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-dim">
              {link.label}
            </span>
            <span className="block truncate text-sm text-chalk">{link.value}</span>
          </span>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
            aria-hidden="true"
          />
        </a>
      ))}

      <p className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </p>
    </div>
  );
}

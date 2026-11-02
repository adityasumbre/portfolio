import { ArrowUp, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navLinks, personalInfo, siteConfig, socialLinks } from "@/data/personalInfo";
import { getCurrentYear } from "@/lib/server-time";

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
} as const;

export async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-abyss/80">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,61,36,0.5),rgba(255,176,32,0.5),transparent)]" />
        <div className="glow-blob left-1/2 top-[-6rem] h-[20rem] w-[36rem] -translate-x-1/2 bg-ember/10" />
      </div>

      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#home" className="group inline-flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-white/12 bg-[linear-gradient(150deg,rgba(255,61,36,0.30),rgba(255,176,32,0.10))] font-display text-sm font-bold text-chalk">
                <span className="relative z-10">{siteConfig.initials}</span>
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_60%)] opacity-70" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-base font-semibold tracking-tight text-chalk">
                  {personalInfo.fullName}
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-dim">
                  Full Stack Developer &amp; Programmer
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-xs text-[0.82rem] leading-relaxed text-mist">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-dim">
              Navigate
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="link-underline text-[0.82rem] text-mist transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-dim">
              Connect
            </h2>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.filter((social) => social.enabled).map((social) => {
                const Icon = SOCIAL_ICONS[social.id as keyof typeof SOCIAL_ICONS] ?? Mail;
                const isEmail = social.id === "email";

                return (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className="group inline-flex items-center gap-2.5 text-[0.82rem] text-mist transition-colors hover:text-chalk"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-dim transition-colors group-hover:border-gold/30 group-hover:text-gold">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-dim">
            © {year} {personalInfo.fullName}. All rights reserved.
          </p>

          <p className="text-[0.75rem] text-dim">
            Designed &amp; Built with passion by{" "}
            <span className="text-mist">{personalInfo.fullName}</span>.
          </p>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-white/[0.08] px-3 py-1.5 text-[0.7rem] text-dim transition-colors hover:border-gold/35 hover:text-chalk sm:self-auto"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp
              className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import { GraduationCap } from "lucide-react";

import { personalInfo, siteConfig } from "@/data/personalInfo";
import { TiltCard } from "@/components/ui/TiltCard";

type Props = {
  hasPhoto: boolean;
};

/**
 * The interactive profile card. Tilts toward the pointer on desktop and falls
 * back to a designed monogram panel when no photo file exists yet.
 */
export function ProfileCard({ hasPhoto }: Props) {
  return (
    <TiltCard intensity={7} className="mx-auto w-full max-w-sm lg:max-w-none">
      <div className="relative">
        {/* Ambient glow behind the card */}
        <div
          aria-hidden="true"
          className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_20%,rgba(255,61,36,0.22),transparent_65%)] blur-2xl"
        />

        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-graphite shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]">
          {/* Photo / fallback */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            {hasPhoto ? (
              <Image
                src={personalInfo.photo}
                alt={`${personalInfo.fullName} — ${personalInfo.role}`}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 420px"
                className="object-cover object-center transition-transform duration-700 ease-out will-change-transform hover:scale-[1.03]"
                priority={false}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,#2b100a_0%,#150a08_58%,#080403_100%)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(circle_at_50%_45%,#000,transparent_72%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute h-[62%] w-[62%] rounded-full border border-gold/15"
                />
                <div
                  aria-hidden="true"
                  className="absolute h-[44%] w-[44%] rounded-full border border-wine/20"
                />
                <div
                  aria-hidden="true"
                  className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,61,36,0.28),transparent_70%)] blur-2xl"
                />
                <div className="relative flex flex-col items-center">
                  <span className="font-display text-7xl font-bold tracking-tight text-gradient">
                    {siteConfig.initials}
                  </span>
                  <span className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-dim">
                    Portfolio
                  </span>
                </div>
              </div>
            )}

            {/* Readability gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#080403] via-[#080403]/25 to-transparent"
            />

            {/* Corner brackets */}
            <span
              aria-hidden="true"
              className="absolute left-3 top-3 h-5 w-5 border-l border-t border-gold/40"
            />
            <span
              aria-hidden="true"
              className="absolute right-3 top-3 h-5 w-5 border-r border-t border-gold/40"
            />
          </div>

          {/* Card footer */}
          <div className="relative -mt-16 px-5 pb-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/[0.08] px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-gold">
                <GraduationCap className="h-3 w-3" aria-hidden="true" />
                {personalInfo.fieldOfStudy}
              </span>
            </div>

            <p className="mt-3 font-display text-xl font-semibold tracking-tight text-chalk">
              {personalInfo.fullName}
            </p>
            <p className="mt-0.5 text-[0.8rem] text-mist">{personalInfo.role}</p>

            <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint/60 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-dim">
                Currently studying · Expected {personalInfo.expectedCompletion}
              </span>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

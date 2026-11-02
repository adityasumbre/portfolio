import { AppWindow, ArrowUpRight, Check, MonitorSmartphone, Sparkles } from "lucide-react";

import { services, type Service } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

const ICONS = {
  web: MonitorSmartphone,
  software: AppWindow,
  creative: Sparkles,
} as const;

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = ICONS[service.icon];

  return (
    <Reveal delay={index * 0.08} y={26} className="h-full">
      <TiltCard intensity={5} className="h-full">
        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008))] p-6 transition-colors duration-500 hover:border-white/[0.16] sm:p-7">
          {/* Watermark number */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[6rem] font-bold leading-none text-white/[0.035] transition-colors duration-500 group-hover:text-white/[0.06]"
          >
            {service.number}
          </span>

          {/* Hover glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(460px circle at 50% 0%, rgba(255,176,32,0.10), transparent 62%)",
            }}
          />

          <div className="relative">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-[linear-gradient(150deg,rgba(255,61,36,0.22),rgba(255,176,32,0.08))] text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>

            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-chalk">
              {service.title}
            </h3>

            <p className="mt-2.5 text-[0.85rem] leading-relaxed text-mist">
              {service.description}
            </p>

            <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-5">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[0.8rem] text-mist/85"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-6 flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-dim transition-colors duration-300 group-hover:text-gold/80">
            <a href="#contact" className="link-underline">
              Start a project
            </a>
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-blob right-[6%] top-[12%] h-[24rem] w-[24rem] bg-gold/10" />
        <div className="glow-blob left-[-8%] bottom-[10%] h-[22rem] w-[22rem] bg-wine/10" />
      </div>

      <div className="shell">
        <SectionHeading
          id="services-heading"
          eyebrow="05 — What I Do"
          title={
            <>
              Three ways I turn an idea into{" "}
              <span className="text-gradient-accent">software</span>.
            </>
          }
          description="Whether it is a website, a business tool or an interactive experience, the approach is the same: understand the problem, then build the simplest thing that solves it well."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

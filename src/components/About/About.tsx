import { personalInfo } from "@/data/personalInfo";
import { publicFileExists } from "@/lib/server-assets";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProfileCard } from "./ProfileCard";

export function About() {
  const hasPhoto = publicFileExists(personalInfo.photo);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-blob right-[-12%] top-[10%] h-[26rem] w-[26rem] bg-ember/10" />
        <div className="absolute inset-0 grid-bg opacity-[0.18] [mask-image:radial-gradient(ellipse_60%_50%_at_70%_40%,#000,transparent_75%)]" />
      </div>

      <div className="shell">
        <SectionHeading
          id="about-heading"
          eyebrow="01 — About"
          title={
            <>
              Engineering ideas into{" "}
              <span className="text-gradient-accent">working products</span>.
            </>
          }
          description="I learn by building — designing the interface, writing the logic, and shipping something people can actually use."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16">
          <Reveal y={28}>
            <ProfileCard hasPhoto={hasPhoto} />
          </Reveal>

          <div className="min-w-0">
            <div className="space-y-5">
              {personalInfo.aboutParagraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.06} y={16}>
                  <p className="text-[0.95rem] leading-relaxed text-mist">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} y={18}>
              <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-2">
                {personalInfo.aboutPanel.map((item) => (
                  <div key={item.label} className="bg-[#0d0605]/80 p-4">
                    <dt className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-dim">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-snug text-chalk/90">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.15} y={16}>
              <div className="mt-7">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-dim">
                  Interests
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {personalInfo.interests.map((interest) => (
                    <li
                      key={interest}
                      className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-xs text-mist transition-colors hover:border-gold/35 hover:text-chalk"
                    >
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

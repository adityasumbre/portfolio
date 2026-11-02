import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const totalSkills = skillCategories.reduce(
  (total, category) => total + category.skills.length,
  0,
);

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden border-y border-white/[0.05] bg-abyss/60 py-24 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-blob left-[-10%] top-[20%] h-[24rem] w-[24rem] bg-wine/10" />
        <div className="glow-blob right-[-8%] bottom-[8%] h-[22rem] w-[22rem] bg-gold/10" />
      </div>

      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="skills-heading"
            eyebrow="02 — Technical Skills"
            title={
              <>
                The stack I build{" "}
                <span className="text-gradient-accent">with</span>.
              </>
            }
            description="Only the technologies I genuinely work with — grouped by where they sit in a project. No invented proficiency scores."
          />

          <Reveal delay={0.1}>
            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4">
              <div>
                <p className="font-display text-2xl font-semibold text-chalk">
                  {totalSkills}
                </p>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-dim">
                  Technologies
                </p>
              </div>
              <span aria-hidden="true" className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-display text-2xl font-semibold text-chalk">
                  {skillCategories.length}
                </p>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-dim">
                  Categories
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal
              key={category.id}
              delay={index * 0.06}
              y={24}
              className={cn(index === 0 && "xl:col-span-2")}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[linear-gradient(160deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008))] p-5 transition-colors duration-500 hover:border-white/[0.14] sm:p-6">
                {/* Hover sheen */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(520px circle at 50% 0%, rgba(255,125,69,0.10), transparent 60%)",
                  }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-chalk">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-[0.8rem] leading-relaxed text-dim">
                      {category.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[0.6rem] text-white/20">
                    {String(category.skills.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="group/skill relative flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] py-2 pl-2 pr-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.055]">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100"
                          style={{
                            background: `radial-gradient(120px circle at 30% 50%, ${skill.accent}1f, transparent 70%)`,
                          }}
                        />
                        <span
                          className="relative grid h-7 min-w-7 shrink-0 place-items-center rounded-lg border px-1 font-mono text-[0.58rem] font-semibold leading-none"
                          style={{
                            color: skill.accent,
                            borderColor: `${skill.accent}45`,
                            backgroundColor: `${skill.accent}14`,
                          }}
                        >
                          {skill.short}
                        </span>
                        <span className="relative whitespace-nowrap text-[0.82rem] text-chalk/80 transition-colors group-hover/skill:text-chalk">
                          {skill.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

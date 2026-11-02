import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";
import { ContactLinks } from "./ContactLinks";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-[0.16] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_78%)]" />
        <div className="glow-blob left-[8%] top-[10%] h-[26rem] w-[26rem] bg-ember/14" />
        <div className="glow-blob right-[2%] bottom-[4%] h-[26rem] w-[26rem] bg-wine/12" />
      </div>

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              id="contact-heading"
              eyebrow="06 — Contact"
              title={
                <>
                  Have an Idea?{" "}
                  <span className="text-gradient-accent">
                    Let&apos;s Build Something Great.
                  </span>
                </>
              }
              description="Whether it is a project, a collaboration, or a question — the form and the links below both reach me."
            />

            <Reveal delay={0.14} y={18}>
              <div className="mt-9">
                <ContactLinks />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={26}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

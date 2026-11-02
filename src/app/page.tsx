import { About } from "@/components/About/About";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { Journey } from "@/components/Journey/Journey";
import { Navbar } from "@/components/Navbar/Navbar";
import { Projects } from "@/components/Projects/Projects";
import { ScrollBend } from "@/components/reactbits/ScrollBend";
import { Services } from "@/components/Services/Services";
import { Skills } from "@/components/Skills/Skills";
import { contactInfo, personalInfo, siteConfig } from "@/data/personalInfo";
import { skillCategories } from "@/data/skills";
import { publicFileExists } from "@/lib/server-assets";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.fullName,
  jobTitle: personalInfo.role,
  description: siteConfig.description,
  url: siteConfig.url,
  knowsAbout: skillCategories.flatMap((category) =>
    category.skills.map((skill) => skill.name),
  ),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: personalInfo.institute,
  },
  sameAs: [contactInfo.github, contactInfo.linkedin].filter(Boolean),
};

export default function HomePage() {
  const hasPhoto = publicFileExists(personalInfo.photo);

  return (
    <>
      <a
        href="#main"
        className="skip-link rounded-full border border-white/15 bg-[#150a08] px-5 py-2.5 text-sm font-medium text-chalk shadow-lg"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Hero hasPhoto={hasPhoto} />
        <About />
        <ScrollBend />
        <Skills />
        <Projects />
        <Journey />
        <Services />
        <Contact />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        // Structured data for search engines. Content is generated from the
        // typed config above, not from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}

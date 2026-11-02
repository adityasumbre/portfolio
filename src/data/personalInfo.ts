/**
 * ---------------------------------------------------------------------------
 * PERSONAL INFORMATION — EDIT THIS FILE ONLY
 * ---------------------------------------------------------------------------
 * Everything shown on the site about you lives here. Change a value, save,
 * and the whole site updates. You do NOT need to touch any component code.
 *
 * Placeholders (values that are obviously fake) are marked with a TODO tag.
 * Search this file for "TODO" to find everything you should replace.
 * ---------------------------------------------------------------------------
 */

/**
 * Education details live here once so the About card, the info panel and the
 * timeline all stay in sync. Change them in one place.
 */
const DEGREE = "Diploma in Computer Engineering";
const FIELD_OF_STUDY = "Computer Engineering";
const INSTITUTE = "Government Polytechnic Awasari Khurd";
const EXPECTED_COMPLETION = "2027";

export const siteConfig = {
  /** Used for <title>, the footer credit, and meta tags. */
  name: "Aditya Sumbre",

  /** Used to build the favicon / avatar monogram. Usually your initials. */
  initials: "AS",

  /** Your deployed domain, WITHOUT a trailing slash. Used for SEO + Open Graph. */
  // TODO: Replace with your real domain once deployed (e.g. "https://adityasumbre.dev")
  url: "https://example.com",

  /** Short description used by search engines and social share cards. */
  description:
    "Portfolio of Aditya Sumbre — Full Stack Web Developer & Programmer building smart, scalable and modern digital solutions.",
} as const;

export const personalInfo = {
  firstName: "Aditya",
  lastName: "Sumbre",
  fullName: "Aditya Sumbre",

  /** Your professional title, shown under your name in the hero. */
  role: "Full Stack Web Developer & Programmer",

  /** Your current course / qualification. */
  degree: DEGREE,

  /** Short field label used on the profile card badge. */
  fieldOfStudy: FIELD_OF_STUDY,

  /** The institute you study at. */
  institute: INSTITUTE,

  /** Expected completion year. Shown in the About card and timeline. */
  expectedCompletion: EXPECTED_COMPLETION,

  /** The one-line tagline under your title. */
  tagline: "Building smart, scalable, and modern digital solutions.",

  /** The small greeting above your name in the hero. */
  greeting: "Hello, I'm",

  /**
   * Rotating "focus" words shown in the hero. These mirror the interests you
   * listed (web, desktop, AI-powered software) — keep them truthful.
   */
  rotatingFocus: [
    "Full Stack Development",
    "Web Applications",
    "Desktop Software",
    "AI-powered Software",
  ],

  /** Short intro shown in the hero (2 sentences reads best). */
  heroIntro:
    "A Computer Engineering student who loves turning ideas into practical software — from modern web apps to desktop tools and intelligent digital products.",

  /** Longer introduction used in the About section. One paragraph per array item. */
  aboutParagraphs: [
    "I am a Computer Engineering student passionate about building modern web applications, desktop software, and intelligent digital solutions.",
    "I enjoy transforming ideas into practical software products through programming, creative design, and problem-solving. Most of what I know has been learned by building real things — understanding a problem, designing the system, and shipping it end to end.",
    "I care about writing code that is clean and maintainable, interfaces that feel natural to use, and products that actually solve a real problem for the person using them.",
  ],

  /**
   * YOUR PHOTO
   * ------------------------------------------------------------------------
   * Drop your photo into  public/images/profile.jpg  and it appears on the
   * site automatically (hero avatar + About card) — no code changes needed.
   *
   * Until that file exists the site shows a designed "AS" monogram avatar
   * instead, so nothing ever looks broken.
   *
   * Recommended: a square-ish or portrait JPG/PNG around 800x1000px, under
   * 300 KB. If you use a different filename, update the path below.
   */
  photo: "/images/profile.jpg",

  /** The small info panel displayed in the About section. */
  aboutPanel: [
    { label: "Education", value: DEGREE },
    { label: "Institute", value: INSTITUTE },
    { label: "Focus", value: "Full Stack Development" },
    { label: "Interests", value: "Web Development, Desktop Applications, AI-powered Software" },
    { label: "Expected Completion", value: EXPECTED_COMPLETION },
  ],

  /** Interest tags rendered as chips in the About section. */
  interests: [
    "Web Development",
    "Desktop Applications",
    "AI-powered Software",
    "Problem Solving",
    "UI Engineering",
  ],
} as const;

/**
 * ---------------------------------------------------------------------------
 * CONTACT DETAILS
 * ---------------------------------------------------------------------------
 * Real contact details used by the contact section, footer, social links and
 * the Person structured data.
 * ---------------------------------------------------------------------------
 */
export const contactInfo = {
  email: "adityasumbre@gmail.com",

  linkedin: "https://www.linkedin.com/in/aditya-sumbre-545364323",

  github: "https://github.com/aditya8718",

  /**
   * Optional extras — set a value to show it, or leave as null to hide it.
   * Nothing is ever invented for you: null means the item is not rendered.
   */
  phone: null as string | null,
  location: null as string | null,
} as const;

/**
 * Social links rendered as icons in the contact section + footer.
 * Add or remove entries freely — anything with `enabled: false` is hidden.
 */
export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    url: contactInfo.github,
    enabled: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: contactInfo.linkedin,
    enabled: true,
  },
  {
    id: "email",
    label: "Email",
    url: `mailto:${contactInfo.email}`,
    enabled: true,
  },
] as const;

/**
 * ---------------------------------------------------------------------------
 * NAVIGATION
 * ---------------------------------------------------------------------------
 * Every entry must have a matching section id in the page (they all exist).
 * Set `enabled: false` to hide a link without deleting it.
 * ---------------------------------------------------------------------------
 */
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

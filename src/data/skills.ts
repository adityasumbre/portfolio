/**
 * ---------------------------------------------------------------------------
 * TECHNICAL SKILLS — EDIT THIS FILE ONLY
 * ---------------------------------------------------------------------------
 * Rules I've followed for you (and you should keep following):
 *   • Only technologies you listed are shown. Nothing is invented.
 *   • There are NO proficiency percentages or "expert/beginner" levels,
 *     because those would be guesses.
 *
 * HOW TO EDIT
 *   • Remove a skill  -> delete that line from the array.
 *   • Add a skill     -> add { name: "Your Tech", short: "YT", accent: "#hex" }.
 *   • Reorder skills  -> just move the lines around; the grid follows order.
 *   • Remove a whole  -> delete that category object from `skillCategories`.
 *     category
 *
 * `short` is the 1–3 character mark shown on the tile (e.g. "JS", "Re").
 * `accent` is the brand-ish colour used for that tile's glow.
 * ---------------------------------------------------------------------------
 */

export type Skill = {
  name: string;
  short: string;
  accent: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  /** One-line description of what this group covers. */
  blurb: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    blurb: "The foundations I build everything with.",
    skills: [
      { name: "C", short: "C", accent: "#6b8afd" },
      { name: "C++", short: "C+", accent: "#3b7dd8" },
      { name: "Java", short: "Jv", accent: "#e76f00" },
      { name: "Python", short: "Py", accent: "#3776ab" },
      { name: "JavaScript", short: "JS", accent: "#f0db4f" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Interfaces that feel fast, clear and intentional.",
    skills: [
      { name: "HTML5", short: "H5", accent: "#e34f26" },
      { name: "CSS3", short: "C3", accent: "#2965f1" },
      { name: "React.js", short: "Re", accent: "#61dafb" },
      { name: "Next.js", short: "Nx", accent: "#c3cbd6" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "Server-side logic, services and APIs.",
    skills: [
      { name: "Node.js", short: "No", accent: "#5fa04e" },
      { name: "Express.js", short: "Ex", accent: "#a8b3c2" },
      { name: "REST APIs", short: "API", accent: "#ffb020" },
    ],
  },
  {
    id: "database",
    title: "Database",
    blurb: "Storing and modelling data properly.",
    skills: [
      { name: "Supabase", short: "Sb", accent: "#3ecf8e" },
      { name: "MongoDB", short: "Mo", accent: "#47a248" },
      { name: "MySQL", short: "My", accent: "#00758f" },
      { name: "Firebase", short: "Fb", accent: "#ffca28" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    blurb: "The everyday workflow behind the code.",
    skills: [
      { name: "Git", short: "Gi", accent: "#f05032" },
      { name: "GitHub", short: "Gh", accent: "#c3cbd6" },
      { name: "VS Code", short: "VS", accent: "#22a0f0" },
      { name: "Postman", short: "Pm", accent: "#ff6c37" },
      { name: "Figma", short: "Fg", accent: "#a259ff" },
    ],
  },
];

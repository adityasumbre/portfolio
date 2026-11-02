# Aditya Sumbre — Portfolio

A premium, fully responsive personal portfolio for **Aditya Sumbre** — Computer
Engineering student, Full Stack Web Developer & Programmer.

Built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, Three.js
(React Three Fiber + Drei), Framer Motion and Lucide.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```

> This project uses **Next.js 16** with Cache Components enabled. Time-based
> values used during prerendering (the footer year, the sitemap date) go through
> `src/lib/server-time.ts`, which wraps them in `"use cache"`. Keep that pattern
> if you add more build-time time values.

---

## Where to edit your content

Everything personal lives in `src/data/`. You should not need to touch component
code to update the site.

| File | What it controls |
| --- | --- |
| `src/data/personalInfo.ts` | Name, role, tagline, hero intro, about paragraphs, education, photo path, email, LinkedIn, GitHub, nav links, social links, site URL/description |
| `src/data/skills.ts` | Skill categories and the technologies inside them (no invented proficiency levels) |
| `src/data/projects.ts` | Project cards: title, description, features, tech, links, accent colour, preview variant |
| `src/data/journey.ts` | Timeline milestones (dates are optional — leave `period: null` to hide) |
| `src/data/keycaps.ts` | The caps on the hero's interactive keycap orb (labels, finishes, hotkeys, palette) |
### Replace the placeholders

Search for `TODO` in `src/data/personalInfo.ts`. The only placeholder left is:

- `siteConfig.url` — `https://example.com` (used for canonical URLs, Open Graph,
  `sitemap.xml` and `robots.txt`)

Your real contact details are already filled in: email `adityasumbre@gmail.com`,
GitHub and LinkedIn.

Set `siteConfig.url` to your real deployed domain **without a trailing slash**
once you have it.

---

## Adding your photo

1. Put your photo at `public/images/profile.jpg` (a portrait JPG/PNG around
   800×1000 px, under ~300 KB works well).
2. That’s it. `src/lib/server-assets.ts` checks for the file at build time and
   swaps the designed “AS” monogram for the real photo automatically — in the
   hero avatar and in the About profile card.

If you use a different filename, update `personalInfo.photo` in
`src/data/personalInfo.ts`.

---

## Adding project screenshots

1. Drop images into `public/images/projects/` (e.g. `hotel.jpg`).
2. In `src/data/projects.ts`, set:

   ```ts
   image: "/images/projects/hotel.jpg",
   imageAlt: "Hotel Management System dashboard",
   ```

Until you do, each project renders a hand-built UI preview (no fake metrics, no
broken images). The Laundry project has no public link yet, so its card shows an
honest “Public link coming soon” badge instead of a dead button.

---

## Making the contact form actually send email

Out of the box the form validates input on the client **and** on the server, but
no email provider is configured. In that case the API returns
`{ ok: false, code: "not_configured" }` and the UI shows a clear fallback panel
with a pre-filled `mailto:` draft. It never claims a message was sent when it
wasn’t.

To enable real delivery with [Resend](https://resend.com):

1. Create a Resend account and verify a sending domain (or use their
   `onboarding@resend.dev` address for testing).
2. Add these environment variables locally in `.env.local`:

   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
   CONTACT_TO_EMAIL=you@yourdomain.com
   CONTACT_FROM_EMAIL=Portfolio <hello@yourdomain.com>
   ```

3. Add the same variables in your Vercel project settings for production.

No code changes are required. The route lives at
`src/app/api/contact/route.ts` and only returns `{ ok: true }` after Resend
accepts the message.

> `CONTACT_TO_EMAIL` is where messages are delivered. `CONTACT_FROM_EMAIL` must
> use a domain verified in Resend.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it in Vercel — the framework is detected automatically.
3. Add the Resend environment variables (optional, see above).
4. Deploy.

The site is fully static apart from the contact API route, so it works on
Vercel’s free plan.

---

## Design & implementation notes

- **Dark, premium surfaces** — graphite/deep-navy tokens, electric blue / cyan
  accents and a restrained violet. Glassmorphism is used selectively (nav,
  panels, hover states), not everywhere.
- **3D hero** — a WebGL keycap orb: a real 3D ball of mechanical keycaps labelled
  with the stack, draggable to spin (with momentum), hoverable, pressable, and
  typeable when focused. It reacts to the pointer, pauses when scrolled out of
  view, lowers its scale on mobile, and falls back to a CSS scene when WebGL is
  unavailable or the user prefers reduced motion. The caps and palette live in
  `src/data/keycaps.ts`.
- **3D scene (legacy)** — `src/components/three/` keeps the previous procedural
  scene and fallbacks; it is no longer used by the hero but remains available.
- **Motion** — Framer Motion reveals, a scroll-linked timeline, and tilt cards.
  Every animation respects `prefers-reduced-motion`.
- **Accessibility** — skip link, labelled form fields with inline errors, visible
  focus rings, a focus-trapped mobile menu, `aria-current` nav state, and a
  no-JavaScript fallback that keeps scroll-revealed content visible.
- **SEO** — metadata, Open Graph/Twitter cards, a generated OG image and favicon,
  `sitemap.xml`, `robots.txt` and Person JSON-LD.
- **No dead links** — optional links are simply not rendered when their config
  value is `null`.

---

## React Bits components

Four React Bits Pro effects are used in the page:

| Effect | Where it is used | File |
| --- | --- | --- |
| Particle Text | Hero name (`ADITYA SUMBRE`) | `src/components/reactbits/ParticleText.tsx` |
| ASCII Ripple | Hero background | `src/components/reactbits/AsciiRipple.tsx` |
| Dolly Gallery | Scroll-pinned project fly-through | `src/components/reactbits/DollyGallery.tsx` |
| Scroll Bend | Skills strip between About and Skills | `src/components/reactbits/ScrollBend.tsx` |

### Registry setup

`components.json` is configured with both React Bits Pro registries and reads
the license key from the environment:

```json
"registries": {
  "@reactbits-starter": {
    "url": "https://pro.reactbits.dev/api/r/starter/{name}.json",
    "headers": { "Authorization": "Bearer ${REACTBITS_LICENSE_KEY}" }
  },
  "@reactbits-pro": {
    "url": "https://pro.reactbits.dev/api/r/pro/{name}.json",
    "headers": { "Authorization": "Bearer ${REACTBITS_LICENSE_KEY}" }
  }
}
```

1. Add your key to `.env.local` (already gitignored):

   ```bash
   REACTBITS_LICENSE_KEY=your-license-key-here
   ```

2. Install the official components:

   ```bash
   npx shadcn@latest add @reactbits-starter/dolly-gallery-tw
   npx shadcn@latest add @reactbits-starter/scroll-bend-tw
   npx shadcn@latest add @reactbits-starter/particle-text-tw
   npx shadcn@latest add @reactbits-starter/ascii-ripple-tw
   ```

No license key was available while this site was built, so the four components
above are **local, dependency-free equivalents** written against this project's
design tokens. They are intentionally kept in `src/components/reactbits/` so the
official versions can be installed side by side. To switch, replace the imports
in `src/components/Hero/Hero.tsx`, `src/components/Projects/Projects.tsx` and
`src/app/page.tsx` with the generated components and adapt their props.

All four effects respect `prefers-reduced-motion`: Particle Text falls back to
styled text, ASCII Ripple renders a single static frame, Dolly Gallery becomes a
readable grid, and Scroll Bend stops bending/translating.

---

## Project structure

```
src/
  app/                 App Router pages, metadata routes, contact API
  components/
    About/             About section + profile card
    Contact/           Contact section, form, links
    Footer/
    Hero/
    Journey/           Scroll-linked timeline
    Navbar/            Sticky nav + mobile menu
    Projects/          Project cards + generated UI previews
    Services/
    Skills/
    reactbits/         Particle Text, ASCII Ripple, Dolly Gallery, Scroll Bend
    three/             React Three Fiber scene and fallbacks
    ui/                Button, Reveal, SectionHeading, TiltCard, brand icons, Keycap Orb
  data/                All editable content
  hooks/               Media query, active section, scroll lock
  lib/                 Utilities, server asset check, cached time helpers
public/
  images/              profile.jpg + project screenshots (add your own)
```

---

## Credits

Designed & built with passion by **Aditya Sumbre**.

import { cacheLife } from "next/cache";

/**
 * Time values used while prerendering.
 *
 * With Cache Components enabled, `new Date()` inside a component is treated as
 * an unstable value and blocks prerendering. Wrapping the call in `use cache`
 * lets Next prerender it once and reuse the result, which is exactly what we
 * want for things like the footer year.
 *
 * Keep this file server-only — never import it from a client component.
 */

/** The current year, prerendered and cached for a day. */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** The build/first-render timestamp used by the sitemap. */
export async function getLastModified(): Promise<Date> {
  "use cache";
  cacheLife("days");
  return new Date();
}

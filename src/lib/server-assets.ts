import fs from "node:fs";
import path from "node:path";

/**
 * Returns true when a file exists under /public.
 *
 * This runs at build time on the server, which lets us decide between the real
 * photo and the designed fallback WITHOUT shipping a broken <img> that 404s in
 * the browser. Drop your photo at public/images/profile.jpg and it just works.
 */
export function publicFileExists(publicPath: string): boolean {
  try {
    const relative = publicPath.replace(/^\/+/, "");
    return fs.existsSync(path.join(process.cwd(), "public", relative));
  } catch {
    return false;
  }
}

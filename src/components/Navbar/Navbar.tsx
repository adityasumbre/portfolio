"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { navLinks, personalInfo, siteConfig, socialLinks } from "@/data/personalInfo";
import { useActiveSection, usePrefersReducedMotion, useScrollLock } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const reduceMotion = usePrefersReducedMotion();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useScrollLock(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Move focus into the dialog when it opens, and back to the trigger when it
  // closes — otherwise keyboard users are left tabbing from behind the overlay.
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      const id = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      // Simple focus trap: keep Tab inside the dialog while it is open.
      const dialog = document.getElementById("mobile-menu");
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
            scrolled
              ? "border-b border-white/[0.07] bg-[#080403]/72 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
            {/* Brand */}
            <a
              href="#home"
              className="group flex items-center gap-3 rounded-full focus-visible:outline-offset-4"
            >
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/12 bg-[linear-gradient(150deg,rgba(255,61,36,0.28),rgba(255,176,32,0.10))] font-display text-sm font-bold tracking-tight text-chalk">
                <span className="relative z-10">{siteConfig.initials}</span>
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_60%)] opacity-70" />
              </span>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="font-display text-[0.95rem] font-semibold tracking-tight text-chalk">
                  {personalInfo.fullName}
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-dim">
                  Full Stack Developer
                </span>
              </span>
              <span className="sr-only">— back to top</span>
            </a>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "relative rounded-full px-3.5 py-2 text-[0.83rem] font-medium transition-colors duration-300",
                          isActive
                            ? "text-chalk"
                            : "text-mist hover:text-chalk",
                        )}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                          />
                        ) : null}
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden h-10 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 text-[0.82rem] font-medium text-chalk transition-all duration-300 hover:border-gold/45 hover:bg-white/[0.08] sm:inline-flex"
              >
                Let&apos;s Connect
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-chalk transition-colors hover:bg-white/[0.08] lg:hidden"
              >
                <Menu className="h-4.5 w-4.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: reduceMotion ? 1 : progress }}
          className="h-px origin-left bg-[linear-gradient(90deg,#ff3d24,#ffb020,#c81e4a)] opacity-80"
        />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-[#080403]/97 backdrop-blur-2xl" />

            <div className="relative flex h-full flex-col">
              <div className="shell flex h-16 shrink-0 items-center justify-between md:h-20">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-dim">
                  Navigation
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-chalk transition-colors hover:bg-white/[0.08]"
                >
                  <X className="h-4.5 w-4.5" aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label="Mobile"
                className="shell flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain py-2"
              >
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + index * 0.045, duration: 0.4 }}
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={closeMenu}
                        className="group flex items-baseline justify-between border-b border-white/[0.06] py-3.5"
                      >
                        <span className="font-display text-2xl font-semibold tracking-tight text-chalk transition-colors group-hover:text-gold sm:text-3xl">
                          {link.label}
                        </span>
                        <span className="font-mono text-[0.65rem] text-dim">
                          0{index + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  {socialLinks.filter((social) => social.enabled).map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target={social.id === "email" ? undefined : "_blank"}
                      rel={social.id === "email" ? undefined : "noopener noreferrer"}
                      className="rounded-full border border-white/12 px-4 py-2 text-xs text-mist transition-colors hover:border-gold/40 hover:text-chalk"
                    >
                      {social.label}
                    </a>
                  ))}
                </motion.div>
              </nav>

              <div className="shell shrink-0 pb-6 pt-4">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#ff3d24,#ffb020)] font-semibold text-[#080403]"
                >
                  Let&apos;s Connect
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

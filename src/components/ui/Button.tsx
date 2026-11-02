import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-300 " +
  "ease-[cubic-bezier(0.16,1,0.3,1)] select-none whitespace-nowrap " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(100deg,#ff3d24_0%,#ff9a3c_55%,#ffb020_100%)] " +
    "text-[#080403] font-semibold " +
    "shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_16px_40px_-14px_rgba(255,61,36,0.85)] " +
    "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.45)_inset,0_22px_54px_-12px_rgba(255,176,32,0.8)] " +
    "hover:-translate-y-0.5",
  secondary:
    "border border-white/12 bg-white/[0.035] text-chalk backdrop-blur-md " +
    "hover:border-gold/45 hover:bg-white/[0.07] hover:-translate-y-0.5 " +
    "hover:shadow-[0_18px_40px_-20px_rgba(255,176,32,0.55)]",
  ghost:
    "text-mist hover:text-chalk hover:bg-white/[0.05]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return cn(base, variants[variant], sizes[size]);
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(buttonClasses(variant, size), className)} {...props}>
      {children}
    </a>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonClasses(variant, size), className)} {...props}>
      {children}
    </button>
  );
}

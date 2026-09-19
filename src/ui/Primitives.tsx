import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------ */
/* Arrow                                                               */
/* ------------------------------------------------------------------ */
export function Arrow({ className, direction = "right" }: { className?: string; direction?: "right" | "down" | "up-right" }) {
  const rotate = direction === "down" ? "rotate-90" : direction === "up-right" ? "-rotate-45" : "";
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("h-[1em] w-[1em]", rotate, className)}>
      <path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons / CTAs                                                      */
/* ------------------------------------------------------------------ */
type Variant = "solid" | "ghost" | "text";

const base =
  "group relative inline-flex items-center gap-3 mono text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-500 focus-visible:outline-1 focus-visible:outline-signal-soft";

const variants: Record<Variant, string> = {
  solid: "bg-paper text-ink px-6 py-4 hover:bg-signal hover:text-paper",
  ghost: "border border-paper/25 text-paper px-6 py-4 hover:border-signal hover:text-signal-soft",
  text: "text-paper hover:text-signal-soft py-2",
};

function CTAInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <Arrow className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
    </>
  );
}

export function ButtonLink({
  variant = "solid",
  className,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      <CTAInner>{children}</CTAInner>
    </a>
  );
}

export function Button({
  variant = "solid",
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <CTAInner>{children}</CTAInner>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Section header (kicker + display title)                             */
/* ------------------------------------------------------------------ */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Reveal y={12} className={cn("flex items-center gap-4", className)}>
      <span className="h-px w-8 bg-signal" aria-hidden="true" />
      <span className="label">{children}</span>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Technical meta row                                                  */
/* ------------------------------------------------------------------ */
export function MetaRow({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      {items.map((it) => (
        <li key={it} className="label flex items-center gap-2 text-paper/60">
          <span className="h-1 w-1 bg-signal" aria-hidden="true" />
          {it}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Section wrapper (consistent padding + id for anchor nav)            */
/* ------------------------------------------------------------------ */
export function Section({
  id,
  className,
  children,
  as: Tag = "section",
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  as?: "section" | "div" | "article";
  labelledBy?: string;
}) {
  return (
    <Tag id={id} aria-labelledby={labelledBy} className={cn("relative px-5 sm:px-8 lg:px-12 xl:px-16", className)}>
      {children}
    </Tag>
  );
}

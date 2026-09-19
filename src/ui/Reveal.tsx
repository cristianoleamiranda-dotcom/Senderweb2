import { motion, type Variants } from "motion/react";
import type { ReactNode, ElementType } from "react";
import { cn } from "@/utils/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: ElementType;
  amount?: number;
}

/** Fade + rise on enter. */
export function Reveal({ children, className, delay = 0, y = 28, once = true, amount = 0.3 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line masked text reveal, for large display headlines. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: ElementType;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: delay } },
  };
  const line: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 1.1, ease: EASE } },
  };
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={container}>
      <Tag className={className}>
        {lines.map((l, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span variants={line} className={cn("block will-change-transform", lineClassName)}>
              {l}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}

/** Image with a clip-path curtain reveal + subtle scale settle. */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  loading?: "lazy" | "eager";
}) {
  return (
    <motion.div
      className={cn("relative overflow-hidden bg-graphite", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName)}
        variants={{ hidden: { scale: 1.16 }, show: { scale: 1 } }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      />
      {/* Curtain: slides up to reveal the photograph */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 origin-top bg-ink"
        variants={{ hidden: { scaleY: 1 }, show: { scaleY: 0 } }}
        transition={{ duration: 1.2, ease: EASE, delay }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
}

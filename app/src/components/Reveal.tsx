import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "figure" | "li";
}

/** Scroll-triggered entrance: rises and fades in once, when 80% into view. */
export default function Reveal({ children, className = "", delay = 0, y = 56, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  const Tag = as as "div";
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Masked line reveal for section titles (translateY mask, like the hero). */
export function MaskTitle({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".mask-reveal > span", {
        y: "0%",
        duration: 1.05,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <h2 ref={ref} className={`font-display leading-[0.92] text-white ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line mask-reveal">
          <span>{line}</span>
        </span>
      ))}
    </h2>
  );
}

/** Section tag: dot + small-caps label + rule (editorial section marker). */
export function SectionTag({ label, className = "" }: { label: string; className?: string }) {
  return (
    <Reveal className={`flex items-center gap-4 ${className}`} y={24}>
      <span className="h-1.5 w-1.5 bg-blood" aria-hidden="true" />
      <span className="font-sub text-[11px] font-bold uppercase tracking-[0.4em] text-gold">
        {label}
      </span>
      <span className="h-px flex-1 bg-coal-line" aria-hidden="true" />
    </Reveal>
  );
}

import { useEffect, useRef } from "react";
import { STATS } from "@/data/content";
import Reveal, { SectionTag } from "@/components/Reveal";
import { gsap, ScrollTrigger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "Luxury is not a price tag. It is the discipline to release nothing until it deserves the number on the door.";

export default function Manifesto() {
  const wordsRef = useRef<HTMLParagraphElement>(null);

  // word-by-word reveal tied to scroll
  useEffect(() => {
    const el = wordsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = el.querySelectorAll(".m-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 1,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" className="relative bg-coal" aria-label="Manifesto">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <SectionTag label="Manifesto" />

        <p
          ref={wordsRef}
          className="font-display mt-14 max-w-5xl text-[clamp(2.2rem,5.5vw,5rem)] leading-[1.02] text-white md:mt-20"
        >
          {STATEMENT.split(" ").map((word, i) => (
            <span key={i} className="m-word inline-block whitespace-pre">
              {word}{" "}
            </span>
          ))}
        </p>

        <div className="mt-16 grid grid-cols-2 border-l border-t border-coal-line md:mt-24 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} y={36}>
              <div className="border-b border-r border-coal-line p-6 md:p-10">
                <span className="font-display block text-5xl text-gold md:text-7xl">
                  {stat.value}
                </span>
                <span className="mt-3 block font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 md:text-[11px]">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

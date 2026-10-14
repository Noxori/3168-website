import { useEffect, useRef } from "react";
import { ARTISTS } from "@/data/content";
import Reveal, { MaskTitle, SectionTag } from "@/components/Reveal";
import { gsap, ScrollTrigger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Artists() {
  const featured = ARTISTS[0];
  const roster = ARTISTS.slice(1);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // scrub parallax on the featured portrait
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = el.querySelector("img");
    if (!img) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="artists" className="relative bg-black" aria-label="Artists">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <SectionTag label="The Roster" />

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-24 md:gap-x-5">
          <div className="md:col-span-12 lg:col-span-10">
            <MaskTitle
              className="text-[clamp(3rem,7vw,6.5rem)]"
              lines={[
                <>FOUR VOICES<span className="text-blood">.</span></>,
                <span className="text-outline-gold" key="g">ONE STANDARD</span>,
              ]}
            />
          </div>
          <Reveal className="md:col-span-10 md:col-start-14 md:pt-6 lg:col-span-8 lg:col-start-16" delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base">
              No open calls. No volume deals. Every name on this roster was chosen the way
              you set a stone — by hand, for keeps. Each artist owns a frequency nobody
              else can occupy.
            </p>
          </Reveal>
        </div>

        {/* Featured artist — asymmetric two-column */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-24 md:gap-x-5">
          <Reveal className="md:col-span-11" y={70}>
            <div ref={parallaxRef} className="group relative overflow-hidden border border-coal-line">
              <img
                src={featured.image}
                alt={featured.alt}
                loading="lazy"
                className="aspect-[3/4] w-full scale-110 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.16]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent p-5">
                <span className="font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  Featured
                </span>
                <span className="font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                  {featured.latest}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center md:col-span-11 md:col-start-14">
            <Reveal y={40}>
              <span className="font-display text-6xl text-coal-line md:text-7xl" aria-hidden="true">
                {featured.index}
              </span>
              <h3 className="font-display mt-2 text-6xl leading-none text-white md:text-7xl">
                {featured.name}
              </h3>
              <p className="mt-3 font-sub text-[11px] font-bold uppercase tracking-[0.35em] text-blood">
                {featured.tagline}
              </p>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
                {featured.bio}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-12 bg-gold" aria-hidden="true" />
                <span className="font-sub text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
                  {featured.role}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Remaining roster — staggered offsets */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-28 lg:grid-cols-3">
          {roster.map((artist, i) => (
            <Reveal
              key={artist.id}
              as="article"
              delay={i * 0.12}
              y={64}
              className={i === 1 ? "lg:translate-y-14" : ""}
            >
              <div className="group border border-coal-line bg-coal transition-colors duration-500 hover:border-gold/40">
                <div className="relative overflow-hidden">
                  <img
                    src={artist.image}
                    alt={artist.alt}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="font-display absolute left-4 top-3 text-5xl text-black/40 [text-shadow:0_0_1px_rgba(212,175,55,0.6)]" aria-hidden="true">
                    {artist.index}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-display text-4xl text-white">{artist.name}</h3>
                  <p className="mt-1 font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-blood">
                    {artist.tagline}
                  </p>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/55">
                    {artist.bio}
                  </p>
                  <p className="mt-5 border-t border-coal-line pt-4 font-sub text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                    {artist.latest}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

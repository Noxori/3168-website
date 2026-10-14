import { RELEASES } from "@/data/content";
import Marquee from "@/components/Marquee";
import Reveal, { MaskTitle, SectionTag } from "@/components/Reveal";

export default function Releases() {
  return (
    <section id="releases" className="relative bg-coal" aria-label="Releases">
      <Marquee
        tag="Now Playing"
        items={["ZEON — SUPER NOVA — OUT NOW", "KID MARROW — REDLINE"]}
        duration={26}
        variant="outline"
      />

      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <SectionTag label="The Catalog" />

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-24 md:gap-x-5">
          <div className="md:col-span-13">
            <MaskTitle
              className="text-[clamp(3rem,7vw,6.5rem)]"
              lines={[
                "PRESSED IN",
                <span key="g">
                  BLACK &amp; <span className="text-outline-gold">GOLD</span>
                </span>,
              ]}
            />
          </div>
          <Reveal className="md:col-span-9 md:col-start-15 md:pt-6" delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base">
              Every release is mastered twice — once for the club, once for the car you
              can't afford yet. Stream it loud, or buy the vinyl and own the artifact.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 border-l border-t border-coal-line sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {RELEASES.map((release, i) => (
            <Reveal as="article" key={release.id} delay={i * 0.1} y={48} className="h-full">
              <div
                className="group flex h-full flex-col border-b border-r border-coal-line bg-black transition-colors duration-500 hover:bg-coal-light"
                aria-label={`${release.title} by ${release.artist}, ${release.type}, ${release.year}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={release.image}
                    alt={release.alt}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold">
                      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
                        <path d="M1 1.5v17L17 10 1 1.5Z" fill="#D4AF37" />
                      </svg>
                      <span className="sr-only">Play preview</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                      {release.type}
                    </span>
                    <span className="font-sub text-[10px] font-bold tracking-[0.2em] text-white/40">
                      {release.year}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-3xl leading-none text-white md:text-4xl">
                    {release.title}
                  </h3>
                  <p className="mt-2 font-sub text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
                    {release.artist}
                  </p>
                  <span className="mt-4 block h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12" y={30}>
          <p className="font-sub text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
            Available on all streaming platforms<span className="text-gold">.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

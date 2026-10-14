import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { gsap } from "@/lib/motion";

interface HeroProps {
  started: boolean;
  onSceneReady: () => void;
}

export default function Hero({ started, onSceneReady }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  const navigate = useNavigate();

  // hero image is the only asset to wait on
  useEffect(() => {
    const img = new Image();
    img.src = "/images/hero-crowd.jpg";
    if (img.complete) {
      onSceneReady();
      return;
    }
    img.onload = () => onSceneReady();
    img.onerror = () => onSceneReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // photograph fades + sinks into the black as you scroll away
  useEffect(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    if (!root || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(img, {
        opacity: 0.12,
        scale: 1.08,
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // entrance choreography — fires once the preloader lifts
  useEffect(() => {
    if (!started || playedRef.current) return;
    playedRef.current = true;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(imgRef.current, { scale: 1.14, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" }, 0)
      .to(".hero-kicker", { opacity: 1, y: 0, duration: 0.7 }, 0.4)
      .to(".hero-mark", { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power4.out" }, 0.55)
      .to(".hero-line > span", { y: "0%", duration: 1.1, stagger: 0.14 }, 0.8)
      .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8 }, 1.3)
      .to(".hero-cta", { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 1.5)
      .to(".hero-scroll-cue", { opacity: 1, duration: 0.9 }, 1.85);
  }, [started]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black"
      aria-label="Introduction"
    >
      {/* crowd photograph */}
      <div ref={imgRef} aria-hidden="true" className="absolute inset-0 will-change-transform">
        <img
          src="/images/hero-crowd.jpg"
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* fade the moment into the black of the label */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-start justify-center px-5 md:px-10">
        <p className="hero-kicker mb-6 translate-y-4 font-sub text-[11px] font-bold uppercase tracking-[0.45em] text-gold opacity-0 md:text-xs">
          A Luxury Music Label — Los Angeles
        </p>

        {/* the tag, large — the label IS the hero */}
        <img
          src="/brand/logo-tag.png"
          alt="3168"
          width={766}
          height={442}
          className="hero-mark -ml-2 w-[min(76vw,560px)] translate-y-6 scale-95 opacity-0 drop-shadow-[0_10px_45px_rgba(255,0,0,0.28)] md:w-[min(52vw,720px)]"
        />

        <h1 className="mt-8 font-display leading-[0.9] text-white">
          <span className="mask-line hero-line">
            <span className="text-[clamp(2.4rem,7vw,6rem)]">BUILT FROM CONCRETE.</span>
          </span>
          <span className="mask-line hero-line">
            <span className="text-[clamp(2.4rem,7vw,6rem)]">
              FINISHED IN <span className="text-outline-gold">GOLD</span>
              <span className="text-blood">.</span>
            </span>
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-md translate-y-4 text-sm leading-relaxed text-white/70 opacity-0 md:text-base">
          Trap drums laid like concrete. Strings poured over the top like gold leaf.
          3168 signs artists who treat sound like material.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/artists")}
            className="hero-cta inline-flex min-h-[48px] translate-y-4 items-center rounded-full bg-gold px-8 font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-black opacity-0 transition-colors duration-300 hover:bg-gold-bright"
          >
            Meet the Roster
          </button>
          <button
            type="button"
            onClick={() => navigate("/releases")}
            className="hero-cta inline-flex min-h-[48px] translate-y-4 items-center rounded-full border border-white/25 px-8 font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-white opacity-0 transition-colors duration-300 hover:border-blood hover:text-blood"
          >
            Latest Release
          </button>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-scroll-cue pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 opacity-0" aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <span className="font-sub text-[10px] font-bold uppercase tracking-[0.4em] text-white/45">
            Scroll
          </span>
          <span className="block h-10 w-px overflow-hidden bg-white/15">
            <span className="block h-4 w-px animate-[cue_1.6s_ease-in-out_infinite] bg-gold" />
          </span>
        </div>
      </div>
      <style>{`@keyframes cue { 0% { transform: translateY(-100%);} 100% { transform: translateY(300%);} }`}</style>
    </section>
  );
}

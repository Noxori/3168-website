import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";

interface PreloaderProps {
  /** external gate (e.g. 3D scene ready) — counter waits for it before finishing */
  ready: boolean;
  onComplete: () => void;
}

/**
 * Brand gate: counter 0→100 with a circular gold progress ring.
 * Choreographed exit — the overlay lifts like a curtain.
 */
export default function Preloader({ ready, onComplete }: PreloaderProps) {
  const [display, setDisplay] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const doneRef = useRef(false);
  const progress = useRef({ value: 0 });
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // reveal the brand word on mount
  useEffect(() => {
    if (reduced.current) return;
    const t = gsap.to(".preloader-word", {
      y: "0%",
      duration: 0.8,
      ease: "power3.out",
      delay: 0.25,
    });
    return () => {
      t.kill();
    };
  }, []);

  // drive the counter toward 90, hold until `ready`, then finish to 100
  useEffect(() => {
    if (reduced.current) {
      onComplete();
      return;
    }
    const target = ready ? 100 : 90;
    const tween = gsap.to(progress.current, {
      value: target,
      duration: ready ? 0.7 : 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(progress.current.value);
        setDisplay(v);
        if (ringRef.current) {
          const c = 2 * Math.PI * 54;
          ringRef.current.style.strokeDashoffset = String(c * (1 - v / 100));
        }
      },
      onComplete: () => {
        if (ready && !doneRef.current) {
          doneRef.current = true;
          // eslint-disable-next-line react-hooks/immutability
          exit();
        }
      },
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  function exit() {
    const tl = gsap.timeline({ onComplete });
    tl.to(counterRef.current, { yPercent: -120, opacity: 0, duration: 0.5, ease: "power3.in" })
      .to(
        ".preloader-word",
        { y: "130%", opacity: 0, duration: 0.45, ease: "power3.in" },
        "<0.05",
      )
      .to(rootRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      });
  }

  // eslint-disable-next-line react-hooks/refs
  if (reduced.current) return null;

  const c = 2 * Math.PI * 54;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black"
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
          <circle cx="70" cy="70" r="54" fill="none" stroke="#1c1c1c" strokeWidth="2" />
          <circle
            ref={ringRef}
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeDasharray={c}
            strokeDashoffset={c}
            strokeLinecap="round"
          />
        </svg>
        <span
          ref={counterRef}
          className="font-display absolute text-5xl text-gold"
          aria-hidden="true"
        >
          {display}
        </span>
      </div>
      <div className="mask-line mt-8">
        <span className="preloader-word font-sub text-[11px] font-bold uppercase tracking-[0.5em] text-white/60">
          3168 — Luxury Meets Street
        </span>
      </div>
    </div>
  );
}

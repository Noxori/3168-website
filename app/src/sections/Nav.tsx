import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { NAV_ITEMS } from "@/data/content";
import { gsap } from "@/lib/motion";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [laxTime, setLaxTime] = useState("");
  const lastY = useRef(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // live Los Angeles clock
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setLaxTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 140 && y > lastY.current) setHidden(true);
        else if (y < lastY.current - 4 || y <= 140) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // animate the mobile overlay in/out
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (open) {
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { yPercent: -100 }, { yPercent: 0, duration: 0.55, ease: "power4.inOut" });
      gsap.fromTo(
        ".mobile-nav-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.3, ease: "power3.out" },
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const closeMenu = () => {
    const el = overlayRef.current;
    if (!el) return;
    gsap.to(el, {
      yPercent: -100,
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => gsap.set(el, { display: "none" }),
    });
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = "";
    setOpen(false);
  };

  const go = (href: string) => (e: React.MouseEvent) => {
    if (!open) return; // let <Link> navigate normally
    e.preventDefault();
    closeMenu();
    setTimeout(() => {
      window.location.assign(href);
    }, 480);
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[100] border-b border-coal-line bg-black/80 backdrop-blur-md transition-[transform,opacity]"
        style={{
          transform: hidden && !open ? "translateY(-110%)" : "translateY(0)",
          opacity: hidden && !open ? 0 : 1,
          transitionDuration: "350ms",
          transitionTimingFunction: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-10"
          aria-label="Primary"
        >
          <Link
            to="/"
            className="flex items-center"
            aria-label="3168 Label — home"
          >
            <img
              src="/brand/logo-tag.png"
              alt=""
              className="h-8 w-auto md:h-9"
              width={383}
              height={221}
            />
          </Link>

          <div className="flex items-center gap-6">
            <p
              className="hidden font-sub text-[11px] font-bold uppercase tracking-[0.22em] text-white/50 lg:block"
              aria-label="Current time in Los Angeles"
            >
              <span className="text-gold">LAX</span>&nbsp;&nbsp;
              <span className="tabular-nums text-white/80">{laxTime}</span>
            </p>

            <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="group relative font-sub text-[12px] font-bold uppercase tracking-[0.18em] text-white/75 transition-colors duration-300 hover:text-gold"
                >
                  {item.label}
                  <span className="text-gold">.</span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              </li>
            ))}
            </ul>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => (open ? closeMenu() : setOpen(true))}
          >
            <span
              className={`h-[2px] w-6 bg-gold transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`}
            />
            <span
              className={`h-[2px] w-6 bg-gold transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* mobile full-screen menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] hidden flex-col items-start justify-center bg-black px-8"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        style={{ display: "none", paddingTop: "env(safe-area-inset-top)" }}
      >
        <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, i) => (
            <li key={item.href} className="mobile-nav-item">
              <a
                href={item.href}
                onClick={go(item.href)}
                className="font-display flex items-baseline gap-3 text-6xl text-white transition-colors duration-300 hover:text-gold"
              >
                <span className="font-sub text-xs font-bold text-gold">0{i + 1}</span>
                {item.label}
                <span className="text-blood">.</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mobile-nav-item absolute bottom-10 left-8 font-sub text-[11px] uppercase tracking-[0.3em] text-white/40">
          3168 Label — Worldwide
        </p>
      </div>
    </>
  );
}

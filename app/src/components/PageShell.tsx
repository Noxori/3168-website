import { useEffect, type ReactNode } from "react";
import Nav from "@/sections/Nav";
import Footer from "@/sections/Footer";
import CookieConsent from "@/components/CookieConsent";
import { gsap } from "@/lib/motion";

interface PageShellProps {
  title: string;
  children: ReactNode;
}

/** Shared chrome for sub-pages: fixed nav, content below it, footer, consent. */
export default function PageShell({ title, children }: PageShellProps) {
  useEffect(() => {
    document.title = `${title} — 3168 Label`;
  }, [title]);

  // gentle page entrance
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".page-enter",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="bg-black pt-[72px]">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

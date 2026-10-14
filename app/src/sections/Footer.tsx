import { Link } from "react-router";
import { LEGAL_LINKS, NAV_ITEMS } from "@/data/content";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Spotify", href: "https://spotify.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default function Footer() {

  return (
    <footer className="relative overflow-hidden border-t border-coal-line bg-black" aria-label="Footer">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src="/brand/logo-tag.png"
              alt="3168 Label"
              className="h-12 w-auto"
              width={383}
              height={221}
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              A luxury music label redefining urban sound and street culture.
              Built from concrete, finished in gold.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer navigation">
            <h2 className="font-sub text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
              Site
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Legal">
            <h2 className="font-sub text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
              Legal
            </h2>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="font-sub text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
              Follow
            </h2>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-coal-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-sub text-[11px] uppercase tracking-[0.2em] text-white/40">
            © {new Date().getFullYear()} 3168 Label. All rights reserved.
          </p>
          <p className="font-sub text-[11px] uppercase tracking-[0.2em] text-white/40">
            Built from concrete. Finished in gold<span className="text-gold">.</span>
          </p>
        </div>
      </div>

      {/* giant outlined wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="font-display text-outline-faint -mb-[4vw] text-center text-[26vw] leading-[0.8]">
          3168
        </p>
      </div>
    </footer>
  );
}

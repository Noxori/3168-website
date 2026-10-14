import { useEffect, useState } from "react";
import { Link } from "react-router";

const KEY = "3168-cookie-consent";

/**
 * Cookie consent banner (GDPR/CCPA/ePrivacy pattern).
 * Shown once until the visitor chooses; the choice is remembered
 * in this browser. No trackers load before a choice is made.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setVisible(true), 1600);
        return () => clearTimeout(t);
      }
    } catch {
      /* storage unavailable — stay quiet */
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[120] border-t border-coal-line bg-black/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="max-w-2xl text-[13px] leading-relaxed text-white/65">
          We use essential cookies to run this site and, with your consent, anonymous
          analytics to see which records hit hardest. No data is sold. Details in our{" "}
          <Link to="/privacy" className="text-gold underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="min-h-[44px] border border-coal-line px-6 font-sub text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:border-white/50 hover:text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="min-h-[44px] bg-gold px-6 font-sub text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-gold-bright"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

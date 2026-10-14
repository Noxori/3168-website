import { useEffect } from "react";
import { Link, useParams } from "react-router";

interface LegalDoc {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}

const DOCS: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: January 2026",
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you join the label list or send us a message, we collect the information you give us directly: your name, your email address, and the contents of your message. When you browse this site, we collect standard technical data (browser type, device, pages visited) through essential cookies and, with your consent, anonymous analytics.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "Email addresses on the label list are used to send release announcements, merch drop access, and label news. Contact form submissions are used to respond to your inquiry — demos are reviewed by the A&R team and never shared outside the label.",
          "We do not sell, rent, or trade your personal information. Ever.",
        ],
      },
      {
        heading: "Third-party services",
        body: [
          "We link to third-party platforms including Spotify, YouTube, Instagram, and TikTok. When you follow those links or play embedded content, those platforms may collect data under their own privacy policies, which we do not control.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You may request a copy of the data we hold about you, ask us to correct it, or ask us to delete it at any time by emailing privacy@3168label.com. Label list emails include an unsubscribe link in every send. Depending on your jurisdiction (GDPR, CCPA, and similar laws), you may have additional rights, all of which we honor.",
        ],
      },
      {
        heading: "Data retention & security",
        body: [
          "We keep label list data until you unsubscribe and contact submissions for up to 24 months. Data is stored on secured infrastructure with access limited to label staff who need it.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "Last updated: January 2026",
    sections: [
      {
        heading: "The short version",
        body: [
          "This website is operated by 3168 Label. By using it, you agree to these terms. If you don't agree, please don't use the site.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "Everything on this site — the 3168 name and logo, all artwork, photography, music previews, text, and design — is owned by or licensed to 3168 Label. You may not copy, reproduce, or use any of it without written permission.",
        ],
      },
      {
        heading: "Demo submissions",
        body: [
          "By submitting a demo you confirm that the material is your original work and that you have the right to share it. Submitting a demo does not create any obligation on either side, and no confidential relationship is formed until a written agreement is signed.",
        ],
      },
      {
        heading: "Merch",
        body: [
          "All merchandise is produced in limited, numbered runs. Prices and availability are shown on the site and may change. Edition sizes are final — sold-out editions are not restocked.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The site is provided as is. We work to keep it accurate and available, but we don't guarantee uninterrupted service and aren't liable for losses arising from use of the site, to the extent permitted by law.",
        ],
      },
    ],
  },
  dmca: {
    title: "DMCA Policy",
    updated: "Last updated: January 2026",
    sections: [
      {
        heading: "Copyright respect",
        body: [
          "3168 Label respects the intellectual property rights of others and expects the same in return. We respond to valid notices of alleged copyright infringement under the Digital Millennium Copyright Act (17 U.S.C. § 512).",
        ],
      },
      {
        heading: "Filing a notice",
        body: [
          "If you believe content on this site infringes your copyright, send a written notice to dmca@3168label.com including: identification of the copyrighted work, identification of the infringing material and its location on the site, your contact information, a good-faith statement, a statement under penalty of perjury that you are authorized to act, and your physical or electronic signature.",
        ],
      },
      {
        heading: "Counter-notification",
        body: [
          "If you believe material was removed in error, you may submit a counter-notification with the information required by 17 U.S.C. § 512(g)(3). We may restore the material unless the original complainant files a court action.",
        ],
      },
    ],
  },
  accessibility: {
    title: "Accessibility Statement",
    updated: "Last updated: January 2026",
    sections: [
      {
        heading: "Our commitment",
        body: [
          "3168 Label is committed to making this website accessible to everyone, including people with disabilities. We aim for WCAG 2.1 Level AA conformance across the site.",
        ],
      },
      {
        heading: "What we've built in",
        body: [
          "Semantic HTML and landmark structure, skip-to-content navigation, full keyboard operability with a visible gold focus outline, alt text on all meaningful imagery, color contrast of at least 4.5:1 for body text, and support for reduced-motion preferences that disable animation.",
        ],
      },
      {
        heading: "Known limitations",
        body: [
          "The 3D hero is decorative and hidden from assistive technology; all information it conveys visually is available as text. We continuously review the site and fix barriers as we find them.",
        ],
      },
      {
        heading: "Feedback",
        body: [
          "If you hit a barrier on this site, tell us at access@3168label.com. Include the page URL and a description of the problem, and we will respond within five business days.",
        ],
      },
    ],
  },
};

export default function Legal() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? DOCS[slug] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (doc) document.title = `${doc.title} — 3168 Label`;
    return () => {
      document.title = "3168 Label — Luxury Meets Street";
    };
  }, [doc]);

  if (!doc) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center">
        <p className="font-display text-8xl text-gold">404</p>
        <p className="mt-4 text-sm text-white/60">This page doesn't exist.</p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-[48px] items-center bg-gold px-8 font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-black"
        >
          Back to 3168
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <a href="#legal-content" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:pt-36">
        <Link
          to="/"
          className="font-sub text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 hover:text-gold"
        >
          ← 3168 Label
        </Link>

        <h1 className="font-display mt-8 text-6xl text-white md:text-7xl">
          {doc.title}
          <span className="text-blood">.</span>
        </h1>
        <p className="mt-3 font-sub text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
          {doc.updated}
        </p>

        <div id="legal-content" className="mt-12 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-sub text-sm font-bold uppercase tracking-[0.2em] text-gold">
                {section.heading}
              </h2>
              {section.body.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-white/65">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-coal-line pt-8">
          <p className="font-sub text-[11px] uppercase tracking-[0.2em] text-white/40">
            © {new Date().getFullYear()} 3168 Label. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}

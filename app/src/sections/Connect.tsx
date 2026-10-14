import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { CONTACT_TYPES, type ContactType } from "@/data/content";
import Reveal, { MaskTitle, SectionTag } from "@/components/Reveal";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const subscribe = trpc.newsletter.subscribe.useMutation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent || subscribe.isPending) return;
    subscribe.mutate({ email });
  };

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col" noValidate={false}>
      <h3 className="font-display text-4xl text-white md:text-5xl">THE LABEL LIST</h3>
      <p className="mt-4 text-sm leading-relaxed text-white/60">
        Drops, dates, and unreleased cuts — 48 hours before anyone else. One email when it
        matters. Never noise.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          className="min-h-[52px] flex-1 border border-coal-line bg-black px-4 font-sub text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={subscribe.isPending || !consent}
          className="min-h-[52px] shrink-0 bg-gold px-8 font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-40"
        >
          {subscribe.isPending ? "Joining…" : "Join"}
        </button>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[12px] leading-relaxed text-white/50">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-coal-line bg-black checked:border-gold checked:bg-gold"
        />
        <span>
          I agree to receive emails from 3168 Label as described in the{" "}
          <Link to="/privacy" className="text-gold underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <div aria-live="polite" className="mt-4 min-h-[20px]">
        {subscribe.isSuccess && (
          <p className="font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-gold">
            {subscribe.data.already ? "You're already on the list." : "You're in. Watch your inbox."}
          </p>
        )}
        {subscribe.isError && (
          <p className="font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-blood">
            Something broke on our end — try again.
          </p>
        )}
      </div>
    </form>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<ContactType>("demo");
  const [message, setMessage] = useState("");
  const submit = trpc.contact.submit.useMutation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submit.isPending) return;
    submit.mutate(
      { name, email, type, message },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setMessage("");
          setType("demo");
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col">
      <h3 className="font-display text-4xl text-white md:text-5xl">GET AT US</h3>
      <p className="mt-4 text-sm leading-relaxed text-white/60">
        Demos, bookings, press. If it's a demo, send one link — your best record, not your
        whole catalog.
      </p>

      <fieldset className="mt-8">
        <legend className="sr-only">Reason for contact</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              aria-pressed={type === t.value}
              onClick={() => setType(t.value)}
              className={`min-h-[44px] border px-4 font-sub text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                type === t.value
                  ? "border-gold bg-gold text-black"
                  : "border-coal-line text-white/60 hover:border-gold/60 hover:text-gold"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            autoComplete="name"
            className="min-h-[52px] w-full border border-coal-line bg-black px-4 font-sub text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className="min-h-[52px] w-full border border-coal-line bg-black px-4 font-sub text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      <label htmlFor="contact-message" className="sr-only">
        Message
      </label>
      <textarea
        id="contact-message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message / link"
        rows={4}
        className="mt-4 w-full resize-none border border-coal-line bg-black px-4 py-3 font-sub text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
      />

      <button
        type="submit"
        disabled={submit.isPending}
        className="mt-5 min-h-[52px] w-full bg-gold font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submit.isPending ? "Sending…" : "Send It"}
      </button>

      <div aria-live="polite" className="mt-4 min-h-[20px]">
        {submit.isSuccess && (
          <p className="font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-gold">
            Received. If it hits, you'll hear from us.
          </p>
        )}
        {submit.isError && (
          <p className="font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-blood">
            Something broke on our end — try again.
          </p>
        )}
      </div>
    </form>
  );
}

export default function Connect() {
  return (
    <section id="connect" className="relative bg-black" aria-label="Contact">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <SectionTag label="Connect" />

        <div className="mt-10 md:mt-14">
          <MaskTitle
            className="text-[clamp(3rem,7vw,6.5rem)]"
            lines={[
              "STEP INSIDE",
              <span key="g">
                THE <span className="text-outline-gold">BUILDING</span>
                <span className="text-blood">.</span>
              </span>,
            ]}
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-coal-line md:mt-24 lg:grid-cols-2">
          <Reveal className="bg-black p-6 md:p-12" y={48}>
            <NewsletterForm />
          </Reveal>
          <Reveal className="bg-black p-6 md:p-12" delay={0.12} y={48}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

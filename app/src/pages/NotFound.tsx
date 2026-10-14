import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center">
      <p className="font-display text-[10rem] leading-none text-outline-gold">404</p>
      <p className="mt-2 font-sub text-[11px] font-bold uppercase tracking-[0.35em] text-white/50">
        Wrong door. This floor doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex min-h-[48px] items-center bg-gold px-8 font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-gold-bright"
      >
        Back to 3168
      </Link>
    </main>
  );
}

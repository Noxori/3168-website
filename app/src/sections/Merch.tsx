import { useNavigate } from "react-router";
import { PRODUCTS } from "@/data/content";
import Reveal, { MaskTitle, SectionTag } from "@/components/Reveal";

export default function Merch() {
  const navigate = useNavigate();
  return (
    <section id="merch" className="relative bg-black" aria-label="Merch">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <SectionTag label="The Goods" />

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-24 md:gap-x-5">
          <div className="md:col-span-13">
            <MaskTitle
              className="text-[clamp(3rem,7vw,6.5rem)]"
              lines={[
                "WEAR THE",
                <span key="g">
                  <span className="text-outline-gold">STANDARD</span>
                  <span className="text-blood">.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal className="md:col-span-9 md:col-start-15 md:pt-6" delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base">
              Limited runs. Numbered pieces. Heavyweight fabric and gold thread — streetwear
              cut to a jeweler's tolerance. When it's gone, it's gone.
            </p>
          </Reveal>
        </div>

        {/* Minimal image-led store grid — name + price only, like a lookbook */}
        <div className="mt-16 grid grid-cols-1 gap-x-5 gap-y-16 sm:grid-cols-2 md:mt-24 md:gap-y-20">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={(i % 2) * 0.12} y={48}>
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="group block w-full text-left"
                aria-label={`${product.name}, ${product.price} — get early access`}
              >
                <div className="relative overflow-hidden bg-coal">
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 bg-black/70 px-3 py-1.5 font-sub text-[9px] font-bold uppercase tracking-[0.25em] text-gold backdrop-blur-sm">
                    {product.edition}
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-gold/40"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-sub text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 group-hover:text-gold md:text-base">
                    {product.name}
                  </h3>
                  <span className="font-display shrink-0 text-2xl leading-none text-gold md:text-3xl">
                    {product.price}
                  </span>
                </div>
                <p className="mt-2 font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
                  {product.edition} — numbered, never restocked
                </p>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 md:mt-20" y={30}>
          <p className="font-sub text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
            Drops open to the label list first — 48 hours before anyone else
            <span className="text-gold">.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

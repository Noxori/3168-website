import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { PRODUCTS, type Product } from "@/data/content";
import Reveal, { MaskTitle, SectionTag } from "@/components/Reveal";

const CATEGORIES = ["All", "Tees", "Hoodies", "Headwear", "Vinyl"] as const;
const COLLECTIONS = ["All", "Gold Line", "Tag Line"] as const;
type Sort = "featured" | "low" | "high";

const priceOf = (p: Product) => Number(p.price.replace(/[^0-9.]/g, ""));

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-2 font-sub text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 ${
        active
          ? "border-gold bg-gold text-black"
          : "border-coal-line text-white/60 hover:border-gold/60 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function MerchStore() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [collection, setCollection] = useState<(typeof COLLECTIONS)[number]>("All");
  const [sort, setSort] = useState<Sort>("featured");

  const items = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (collection === "All" || p.collection === collection),
    );
    if (sort === "low") return [...list].sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "high") return [...list].sort((a, b) => priceOf(b) - priceOf(a));
    return list;
  }, [category, collection, sort]);

  return (
    <section id="merch" className="relative bg-black" aria-label="Merch">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <SectionTag label="The Goods" />

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-24 md:gap-x-5">
          <div className="md:col-span-13">
            <MaskTitle
              className="text-[clamp(3.5rem,9vw,8rem)]"
              lines={[
                <span key="a">
                  APPAREL<span className="text-[#D93025]">.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal className="md:col-span-9 md:col-start-15 md:pt-6" delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base">
              Two lines, one label. The Gold Line is numbered and never restocked. The Tag
              Line is the everyday run, tagged in red.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-y border-coal-line py-5 md:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
              <span className="mr-2 font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                Type
              </span>
              {CATEGORIES.map((c) => (
                <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by collection">
              <span className="mr-2 font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                Line
              </span>
              {COLLECTIONS.map((c) => (
                <Chip key={c} active={collection === c} onClick={() => setCollection(c)}>
                  {c}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-3 font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="border border-coal-line bg-black px-3 py-2 text-[11px] tracking-[0.1em] text-white focus:border-gold focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </label>
            <p
              className="font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-gold"
              aria-live="polite"
            >
              {items.length} {items.length === 1 ? "Product" : "Products"}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-sub text-sm uppercase tracking-[0.2em] text-white/50">
              No pieces match those filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setCollection("All");
              }}
              className="mt-6 border border-gold px-5 py-3 font-sub text-[10px] font-bold uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-black"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-14 md:gap-x-5 lg:grid-cols-4">
            {items.map((product) => (
              <Link
                key={product.id}
                to="/contact"
                className="group block text-left"
                aria-label={`${product.name}, ${product.price} — get early access`}
              >
                <div className="relative aspect-square overflow-hidden bg-coal">
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {product.badge && (
                    <span className="absolute left-3 top-3 bg-[#D93025] px-2.5 py-1 font-sub text-[9px] font-bold uppercase tracking-[0.25em] text-white">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 rounded-full bg-black px-4 py-2 font-sub text-[9px] font-bold uppercase tracking-[0.25em] text-white transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    Inquire +
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-gold/40"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-sub text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 group-hover:text-gold md:text-sm">
                    {product.name}
                  </h3>
                  <span className="font-display shrink-0 text-xl leading-none text-gold md:text-2xl">
                    {product.price}
                  </span>
                </div>
                <p className="mt-2 font-sub text-[9px] font-bold uppercase tracking-[0.3em] text-white/35">
                  {product.collection} — {product.edition}
                </p>
              </Link>
            ))}
          </div>
        )}

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

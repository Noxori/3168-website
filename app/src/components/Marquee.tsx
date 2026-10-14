import { Fragment } from "react";

interface MarqueeProps {
  items: string[];
  tag?: string;
  duration?: number;
  variant?: "gold" | "outline" | "red";
  className?: string;
  separator?: string;
}

/**
 * Full-bleed horizontal marquee strip with a small-caps tag label
 * pinned to the left edge and a vertical divider before the scroller.
 * Duplicated track for a seamless loop; pauses on hover.
 */
export default function Marquee({
  items,
  tag,
  duration = 28,
  variant = "gold",
  className = "",
  separator = "◆",
}: MarqueeProps) {
  const textClass =
    variant === "gold"
      ? "text-gold"
      : variant === "red"
        ? "text-blood"
        : "text-outline-faint";

  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="marquee-track flex shrink-0 items-center"
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className={`font-display whitespace-nowrap px-6 text-[clamp(2.2rem,5.5vw,4.5rem)] leading-none md:px-10 ${textClass}`}>
            {item}
          </span>
          <span className={variant === "red" ? "text-gold/60" : "text-blood/80"} aria-hidden="true">
            {separator}
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee-hover-pause flex w-full items-stretch overflow-hidden border-y border-coal-line bg-black ${className}`}
      role="marquee"
    >
      {tag && (
        <div className="flex shrink-0 items-center gap-3 border-r border-coal-line bg-coal px-4 py-4 md:px-6">
          <span className="h-1.5 w-1.5 bg-blood" aria-hidden="true" />
          <span className="font-sub text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">
            {tag}
          </span>
        </div>
      )}
      <div className="flex min-w-0 flex-1 items-center overflow-hidden py-4">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

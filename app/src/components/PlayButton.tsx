import { useRef, useState } from "react";

interface PlayButtonProps {
  src: string;
  label: string;
}

export default function PlayButton({ src, label }: PlayButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        className="flex h-16 w-16 items-center justify-center rounded-full border border-gold transition-colors hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        {playing ? (
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="5" height="16" fill="#D4AF37" />
            <rect x="10" y="1" width="5" height="16" fill="#D4AF37" />
          </svg>
        ) : (
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
            <path d="M1 1.5v17L17 10 1 1.5Z" fill="#D4AF37" />
          </svg>
        )}
      </button>
    </>
  );
}

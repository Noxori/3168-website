import { useNavigate } from "react-router";
import PageShell from "@/components/PageShell";
import Artists from "@/sections/Artists";

export default function ArtistsPage() {
  const navigate = useNavigate();
  return (
    <PageShell title="Artists">
      <div className="page-enter">
        <Artists />
      </div>
      <div className="page-enter mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-32">
        <button
          type="button"
          onClick={() => navigate("/contact")}
          className="inline-flex min-h-[52px] items-center rounded-full bg-gold px-9 font-sub text-[12px] font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-gold-bright"
        >
          Submit a Demo
        </button>
      </div>
    </PageShell>
  );
}

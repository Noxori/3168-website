import PageShell from "@/components/PageShell";
import Manifesto from "@/sections/Manifesto";

export default function ManifestoPage() {
  return (
    <PageShell title="Manifesto">
      <div className="page-enter">
        <Manifesto />
      </div>
    </PageShell>
  );
}

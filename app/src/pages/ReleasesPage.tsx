import PageShell from "@/components/PageShell";
import Releases from "@/sections/Releases";

export default function ReleasesPage() {
  return (
    <PageShell title="Releases">
      <div className="page-enter">
        <Releases />
      </div>
    </PageShell>
  );
}

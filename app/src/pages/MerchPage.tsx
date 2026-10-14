import PageShell from "@/components/PageShell";
import Merch from "@/sections/Merch";

export default function MerchPage() {
  return (
    <PageShell title="Merch">
      <div className="page-enter">
        <Merch />
      </div>
    </PageShell>
  );
}

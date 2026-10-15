import PageShell from "@/components/PageShell";
import MerchStore from "@/sections/MerchStore";

export default function MerchPage() {
  return (
    <PageShell title="Merch">
      <div className="page-enter">
        <MerchStore />
      </div>
    </PageShell>
  );
}

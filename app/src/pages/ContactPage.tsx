import PageShell from "@/components/PageShell";
import Connect from "@/sections/Connect";

export default function ContactPage() {
  return (
    <PageShell title="Contact">
      <div className="page-enter">
        <Connect />
      </div>
    </PageShell>
  );
}

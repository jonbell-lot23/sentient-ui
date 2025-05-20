import { defaultNav } from "@/lib/nav-items";

const content: Record<string, string> = {
  dashboard:
    "Welcome to your main dashboard. A quick overview of metrics would appear here.",
  analytics: "Charts and insights help you make informed decisions.",
  sales: "Track revenue and monitor sales performance on this page.",
  customers: "Manage your customer relationships and view contact history.",
  products: "Organise your inventory and product listings.",
  reports: "Generate detailed reports for your team.",
  notifications: "Read recent alerts and important system messages.",
  settings: "Adjust preferences and configure your account.",
};

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = defaultNav.find((i) => i.id === params.id);
  if (!item) return <p className="text-red-500">Page not found.</p>;

  return (
    <section className="space-y-4">
      <header className="mb-2">
        <h1 className="text-xl font-semibold text-gray-900">{item.label}</h1>
      </header>
      <p className="text-gray-700">
        {content[item.id] || "Demo content goes here."}
      </p>
    </section>
  );
}

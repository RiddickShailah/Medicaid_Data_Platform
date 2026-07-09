import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/mco-performance", label: "MCO Performance" },
  { href: "/vbp-rates", label: "VBP Rates" },
  { href: "/compliance", label: "Compliance & Audit" },
  { href: "/data-pipeline", label: "Data Pipeline" },
];

// TODO (Cursor prompt 7): scope NAV_ITEMS by the active role from lib/role-context.tsx
// per the RBAC table in SECURITY.md before shipping this as more than a demo shell.

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col bg-ink text-paper px-5 py-6">
      <div className="font-display text-lg leading-tight mb-8">
        Centralized
        <br />
        Medicaid Data
        <br />
        Platform
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded px-3 py-2 text-sm text-paper/80 hover:bg-white/5 hover:text-paper transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6 text-xs text-paper/50 font-mono">
        v0.1.0 · mock data
      </div>
    </aside>
  );
}

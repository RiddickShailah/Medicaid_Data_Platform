"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useRole, canViewAllMcos } from "@/lib/role-context";
import { Lock } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Overview", roles: ["regulator", "mco_admin", "mco_analyst", "auditor"] },
  { href: "/mco-performance", label: "MCO Performance", roles: ["regulator", "mco_admin", "mco_analyst"] },
  { href: "/vbp-rates", label: "VBP Rates", roles: ["regulator", "mco_admin", "mco_analyst"] },
  { href: "/compliance", label: "Compliance & Audit", roles: ["regulator", "mco_admin", "mco_analyst", "auditor"] },
  { href: "/data-pipeline", label: "Data Pipeline", roles: ["regulator", "mco_admin", "mco_analyst"] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useRole();

  const visible = NAV_ITEMS.filter((item) => item.roles.includes(user.role));

  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col bg-ink text-paper px-5 py-6">
      <div className="font-display text-lg leading-tight mb-2">
        Centralized
        <br />
        Medicaid Data
        <br />
        Platform
      </div>
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-verified-green mb-8">
        <Lock size={10} />
        {canViewAllMcos(user.role) ? "Cross-MCO access" : "Scoped to your MCO"}
      </div>
      <nav className="flex flex-col gap-1">
        {visible.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-signal-teal/20 text-paper border-l-2 border-signal-teal"
                  : "text-paper/80 hover:bg-white/5 hover:text-paper"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-6 text-xs text-paper/50 font-mono space-y-1">
        <p>v0.2.0 · enriched dashboard</p>
        <p className="text-paper/30">AES-256 · audit logged</p>
      </div>
    </aside>
  );
}

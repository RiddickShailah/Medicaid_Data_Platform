"use client";

import { ChevronDown, Lock, Shield } from "lucide-react";
import { useRole } from "@/lib/role-context";
import type { Role } from "@/lib/types";

const ROLES: { value: Role; label: string }[] = [
  { value: "regulator", label: "State Regulator" },
  { value: "mco_admin", label: "MCO Administrator" },
  { value: "mco_analyst", label: "MCO Analyst" },
  { value: "auditor", label: "Auditor" },
];

export default function Header() {
  const { user, setRole } = useRole();

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-paper-raised px-6 py-3 md:px-10">
      <div className="flex items-center gap-3 text-sm">
        <span className="text-slate">Signed in as</span>
        <div className="relative">
          <select
            value={user.role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="appearance-none font-medium text-ink bg-paper border border-hairline rounded-lg pl-3 pr-8 py-1.5 text-sm cursor-pointer hover:border-signal-teal focus:outline-none focus:ring-2 focus:ring-signal-teal/30"
            aria-label="Switch role"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate font-mono">
        <span className="hidden sm:inline text-slate/80 max-w-[200px] truncate">{user.label}</span>
        <span className="flex items-center gap-1.5 text-verified-green">
          <span className="inline-block h-2 w-2 rounded-full bg-verified-green animate-pulse" />
          <Lock size={11} /> Secure session · TLS 1.3
        </span>
        <span className="flex items-center gap-1 text-signal-teal">
          <Shield size={11} /> RBAC active
        </span>
      </div>
    </header>
  );
}

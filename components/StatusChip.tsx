import { ShieldCheck, AlertTriangle, XCircle } from "lucide-react";
import type { ComplianceStatus } from "@/lib/types";

const CONFIG = {
  compliant: {
    label: "Compliant",
    className: "text-verified-green bg-verified-green/10 border-verified-green/30",
    Icon: ShieldCheck,
  },
  at_risk: {
    label: "At risk",
    className: "text-flag-amber bg-flag-amber/10 border-flag-amber/30",
    Icon: AlertTriangle,
  },
  non_compliant: {
    label: "Non-compliant",
    className: "text-breach-red bg-breach-red/10 border-breach-red/30",
    Icon: XCircle,
  },
} as const;

export default function StatusChip({ status }: { status: ComplianceStatus }) {
  const { label, className, Icon } = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-0.5 ${className}`}
    >
      <Icon size={12} aria-hidden />
      {label}
    </span>
  );
}

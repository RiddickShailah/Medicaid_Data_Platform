"use client";

import { useState } from "react";
import { Download, Filter } from "lucide-react";
import StatusChip from "@/components/StatusChip";
import SecurityBanner from "@/components/SecurityBanner";
import { useRole } from "@/lib/role-context";
import {
  getComplianceMetrics,
  getAuditLog,
  getMco,
  filterMcosForRole,
  getMcos,
} from "@/lib/mock-data";
import type { Role } from "@/lib/types";

export default function CompliancePage() {
  const { user } = useRole();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showExportConfirm, setShowExportConfirm] = useState(false);

  let metrics = getComplianceMetrics();
  if (user.mcoId && user.role !== "regulator" && user.role !== "auditor") {
    metrics = metrics.filter((m) => m.mcoId === user.mcoId);
  }
  if (statusFilter === "open") metrics = metrics.filter((m) => !m.resolvedDate);
  if (statusFilter === "resolved") metrics = metrics.filter((m) => m.resolvedDate);

  const auditLog = getAuditLog().filter((e) => {
    if (user.role === "auditor" || user.role === "regulator") return true;
    return e.actorRole === user.role;
  });

  return (
    <div>
      <SecurityBanner />

      <div className="border-b border-hairline pb-4 mb-6">
        <h1 className="font-display text-2xl text-ink">Compliance & Audit</h1>
        <p className="text-sm text-slate mt-1 font-mono">Viewing as: {user.label}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-hairline rounded-lg px-3 py-1.5 text-sm"
          >
            <option value="all">All metrics</option>
            <option value="open">Open only</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => setShowExportConfirm(true)}
          className="flex items-center gap-2 text-sm border border-hairline rounded-lg px-4 py-2 hover:border-signal-teal hover:text-signal-teal transition-colors"
        >
          <Download size={14} /> Export audit report
        </button>
      </div>

      {showExportConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="bg-paper-raised rounded-lg border border-hairline p-6 max-w-md shadow-xl">
            <h3 className="font-display text-lg text-ink mb-2">Confirm export</h3>
            <p className="text-sm text-slate mb-4">
              This action will be logged to the immutable audit trail per HIPAA-compliant
              access controls. Export includes compliance metrics visible to your role.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowExportConfirm(false)}
                className="px-4 py-2 text-sm border border-hairline rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowExportConfirm(false)}
                className="px-4 py-2 text-sm bg-signal-teal text-white rounded-lg"
              >
                Export & log
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="mb-10">
        <h2 className="font-display text-lg text-ink mb-3">Compliance metrics</h2>
        <table className="w-full text-sm border border-hairline rounded-lg overflow-hidden">
          <thead className="bg-paper">
            <tr className="text-left text-xs uppercase tracking-wide text-slate">
              <th className="py-3 px-4">MCO</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Due</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m) => {
              const mco = getMco(m.mcoId);
              const chipStatus: "compliant" | "at_risk" | "non_compliant" = m.resolvedDate
                ? "compliant"
                : m.status === "non_compliant"
                  ? "non_compliant"
                  : "at_risk";
              return (
                <tr key={m.id} className="border-t border-hairline hover:bg-paper/50">
                  <td className="py-3 px-4">{mco?.name ?? m.mcoId}</td>
                  <td className="py-3 px-4 font-mono text-xs">{m.type.replace(/_/g, " ")}</td>
                  <td className="py-3 px-4 text-slate">{m.description}</td>
                  <td className="py-3 px-4 font-mono text-xs">{m.dueDate}</td>
                  <td className="py-3 px-4">
                    <StatusChip status={chipStatus} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink mb-3">Audit log</h2>
        <table className="w-full text-sm border border-hairline rounded-lg overflow-hidden">
          <thead className="bg-paper">
            <tr className="text-left text-xs uppercase tracking-wide text-slate">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Actor</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Resource</th>
              <th className="py-3 px-4">IP hash</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.map((e) => (
              <tr key={e.id} className="border-t border-hairline font-mono text-xs">
                <td className="py-3 px-4">{e.timestamp}</td>
                <td className="py-3 px-4">
                  {e.actorId}{" "}
                  <span className="text-slate">({e.actorRole as Role})</span>
                </td>
                <td className="py-3 px-4">{e.action}</td>
                <td className="py-3 px-4">
                  {e.resourceType}/{e.resourceId}
                </td>
                <td className="py-3 px-4 text-slate">{e.ipHash.slice(0, 12)}…</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

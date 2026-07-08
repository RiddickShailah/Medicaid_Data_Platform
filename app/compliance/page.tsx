import { getComplianceMetrics, getAuditLog, getMco } from "@/lib/mock-data";

// Baseline — see CURSOR_PROMPTS.md (Prompt 5) to add role-based row scoping,
// filters, and the role indicator described in SECURITY.md section 5.

export default function CompliancePage() {
  const metrics = getComplianceMetrics();
  const auditLog = getAuditLog();

  return (
    <div>
      <div className="border-b border-hairline pb-4 mb-6">
        <h1 className="font-display text-2xl text-ink">Compliance & Audit</h1>
        <p className="text-sm text-slate mt-1">
          Viewing as: <span className="font-medium text-ink">State Regulator</span> (all MCOs)
        </p>
      </div>

      <section className="mb-10">
        <h2 className="font-display text-lg text-ink mb-3">Compliance metrics</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate border-b border-hairline">
              <th className="py-2">MCO</th>
              <th className="py-2">Type</th>
              <th className="py-2">Description</th>
              <th className="py-2">Due</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((c) => (
              <tr key={c.id} className="border-b border-hairline">
                <td className="py-2">{getMco(c.mcoId)?.name ?? c.mcoId}</td>
                <td className="py-2 text-slate">{c.type.replace(/_/g, " ")}</td>
                <td className="py-2">{c.description}</td>
                <td className="py-2 font-mono">{c.dueDate}</td>
                <td className="py-2 text-xs">{c.status.replace(/_/g, " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink mb-3">Audit log</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate border-b border-hairline">
              <th className="py-2">Timestamp</th>
              <th className="py-2">Actor</th>
              <th className="py-2">Role</th>
              <th className="py-2">Action</th>
              <th className="py-2">Resource</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.map((entry) => (
              <tr key={entry.id} className="border-b border-hairline font-mono text-xs">
                <td className="py-2">{entry.timestamp}</td>
                <td className="py-2">{entry.actorId}</td>
                <td className="py-2">{entry.actorRole}</td>
                <td className="py-2">{entry.action}</td>
                <td className="py-2">
                  {entry.resourceType}:{entry.resourceId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

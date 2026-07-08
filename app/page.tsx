import KpiCard from "@/components/KpiCard";
import {
  getMcos,
  getTotalCoveredMembers,
  getProgramAverageRateAttainment,
  getOpenComplianceMetrics,
  getPipelineStages,
} from "@/lib/mock-data";

// This page is intentionally a minimal, working baseline — see CURSOR_PROMPTS.md
// (Prompt 2) for the full build-out of the Data Lineage Thread signature element
// and the flagged-MCOs table.

export default function OverviewPage() {
  const mcos = getMcos();
  const totalMembers = getTotalCoveredMembers();
  const avgAttainment = getProgramAverageRateAttainment();
  const openFlags = getOpenComplianceMetrics();
  const stages = getPipelineStages();

  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-hairline pb-4 mb-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Program Overview</h1>
          <p className="text-sm text-slate mt-1">
            {mcos.length} Managed Care Organizations · {openFlags.length} open compliance flags
          </p>
        </div>
        <div className="text-xs text-slate font-mono">
          Last updated 2026-07-08T09:00Z
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Managed Care Organizations" value={String(mcos.length)} />
        <KpiCard
          label="Covered Members"
          value={totalMembers.toLocaleString()}
        />
        <KpiCard
          label="Avg. Rate Attainment"
          value={`${Math.round(avgAttainment * 100)}%`}
          sublabel="actual vs target"
        />
        <KpiCard
          label="Open Compliance Flags"
          value={String(openFlags.length)}
        />
      </div>

      <section className="border border-hairline bg-paper-raised rounded px-5 py-5 mb-8">
        <h2 className="font-display text-lg text-ink mb-4">
          Data Lineage — Submission to Publish
        </h2>
        <div className="flex flex-col md:flex-row md:items-stretch gap-3">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex-1 flex items-center gap-3">
              <div className="flex-1 border border-hairline rounded px-3 py-3">
                <div className="text-xs uppercase tracking-wide text-slate mb-1">
                  {stage.name}
                </div>
                <div className="font-mono text-lg text-ink">
                  {stage.recordCount.toLocaleString()}
                </div>
                {stage.errorCount > 0 && (
                  <div className="text-xs text-flag-amber font-mono mt-1">
                    {stage.errorCount.toLocaleString()} flagged
                  </div>
                )}
              </div>
              {i < stages.length - 1 && (
                <div className="hidden md:block w-6 h-px bg-hairline shrink-0" />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate mt-4">
          See CURSOR_PROMPTS.md (Prompt 2) to turn this into the animated signature
          visualization described in README.md.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink mb-3">
          MCOs with open flags
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate border-b border-hairline">
              <th className="py-2">MCO</th>
              <th className="py-2">Region</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mcos
              .filter((m) => m.complianceStatus !== "compliant")
              .map((m) => (
                <tr key={m.id} className="border-b border-hairline">
                  <td className="py-2">{m.name}</td>
                  <td className="py-2 text-slate">{m.region}</td>
                  <td className="py-2">
                    <StatusChip status={m.complianceStatus} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function StatusChip({
  status,
}: {
  status: "compliant" | "at_risk" | "non_compliant";
}) {
  const styles = {
    compliant: "text-verified-green",
    at_risk: "text-flag-amber",
    non_compliant: "text-breach-red",
  } as const;
  const labels = {
    compliant: "Compliant",
    at_risk: "At risk",
    non_compliant: "Non-compliant",
  } as const;
  return (
    <span className={`text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

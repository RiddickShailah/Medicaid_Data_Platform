import KpiCard from "@/components/KpiCard";
import SecurityBanner from "@/components/SecurityBanner";
import DataLineageThread from "@/components/DataLineageThread";
import StatusChip from "@/components/StatusChip";
import ComplianceChart from "@/components/charts/ComplianceChart";
import McoAttainmentChart from "@/components/charts/McoAttainmentChart";
import {
  getMcos,
  getTotalCoveredMembers,
  getProgramAverageRateAttainment,
  getOpenComplianceMetrics,
  getPipelineStages,
  getComplianceChartData,
  getMcoAttainmentChartData,
} from "@/lib/mock-data";
import Link from "next/link";

export default function OverviewPage() {
  const mcos = getMcos();
  const totalMembers = getTotalCoveredMembers();
  const avgAttainment = getProgramAverageRateAttainment();
  const openFlags = getOpenComplianceMetrics();
  const stages = getPipelineStages();

  return (
    <div>
      <SecurityBanner />

      <div className="flex flex-wrap items-baseline justify-between border-b border-hairline pb-4 mb-6 gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">Program Overview</h1>
          <p className="text-sm text-slate mt-1">
            {mcos.length} Managed Care Organizations · {openFlags.length} open compliance flags
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusChip status={openFlags.length === 0 ? "compliant" : "at_risk"} />
          <span className="text-xs text-slate font-mono">Last updated 2026-07-09T09:00Z</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Managed Care Organizations" value={String(mcos.length)} />
        <KpiCard label="Covered Members" value={totalMembers.toLocaleString()} />
        <KpiCard
          label="Avg. Rate Attainment"
          value={`${Math.round(avgAttainment * 100)}%`}
          sublabel="actual vs target"
        />
        <KpiCard label="Open Compliance Flags" value={String(openFlags.length)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <section className="border border-hairline bg-paper-raised rounded-lg px-5 py-5">
          <h2 className="font-display text-lg text-ink mb-4">MCO Rate Attainment</h2>
          <McoAttainmentChart data={getMcoAttainmentChartData()} />
        </section>
        <section className="border border-hairline bg-paper-raised rounded-lg px-5 py-5">
          <h2 className="font-display text-lg text-ink mb-4">Compliance Summary</h2>
          <ComplianceChart data={getComplianceChartData()} />
        </section>
      </div>

      <section className="border border-hairline bg-paper-raised rounded-lg px-5 py-5 mb-8">
        <h2 className="font-display text-lg text-ink mb-4">
          Data Lineage — Submission to Publish
        </h2>
        <DataLineageThread stages={stages} animated />
        <p className="text-xs text-slate mt-4">
          <Link href="/data-pipeline" className="text-signal-teal hover:underline">
            View full pipeline →
          </Link>
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink mb-3">MCOs requiring attention</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate border-b border-hairline">
              <th className="py-2">MCO</th>
              <th className="py-2">Region</th>
              <th className="py-2">Members</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mcos
              .filter((m) => m.complianceStatus !== "compliant")
              .map((m) => (
                <tr key={m.id} className="border-b border-hairline hover:bg-paper/50">
                  <td className="py-2 font-medium">{m.name}</td>
                  <td className="py-2 text-slate">{m.region}</td>
                  <td className="py-2 font-mono">{m.memberCount.toLocaleString()}</td>
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

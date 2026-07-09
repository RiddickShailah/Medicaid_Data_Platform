"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import StatusChip from "@/components/StatusChip";
import RateTrendChart from "@/components/charts/RateTrendChart";
import { useRole } from "@/lib/role-context";
import {
  getMcos,
  getVbpRatesForMco,
  filterMcosForRole,
  getMcoAttainmentChartData,
} from "@/lib/mock-data";
import McoAttainmentChart from "@/components/charts/McoAttainmentChart";

export default function McoPerformancePage() {
  const { user } = useRole();
  const mcos = filterMcosForRole(getMcos(), user.role, user.mcoId);
  const [expanded, setExpanded] = useState<string | null>(null);
  const chartData = getMcoAttainmentChartData().filter((d) =>
    mcos.some((m) => m.name.startsWith(d.name))
  );

  return (
    <div>
      <div className="border-b border-hairline pb-4 mb-6">
        <h1 className="font-display text-2xl text-ink">MCO Performance</h1>
        <p className="text-sm text-slate mt-1">
          Cross-organizational comparison · Click a row to expand rate trends
        </p>
        <p className="text-xs font-mono text-signal-teal mt-2">Viewing as: {user.label}</p>
      </div>

      <section className="border border-hairline bg-paper-raised rounded-lg p-5 mb-8">
        <h2 className="font-display text-base text-ink mb-4">Attainment by MCO</h2>
        <McoAttainmentChart data={chartData.length ? chartData : getMcoAttainmentChartData()} />
      </section>

      <div className="border border-hairline rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-paper">
            <tr className="text-left text-xs uppercase tracking-wide text-slate border-b border-hairline">
              <th className="py-3 px-4 w-8" />
              <th className="py-3 px-2">MCO</th>
              <th className="py-3 px-2">Region</th>
              <th className="py-3 px-2">Members</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mcos.map((m) => {
              const rates = getVbpRatesForMco(m.id);
              const isOpen = expanded === m.id;
              const primaryRate = rates[0];
              return (
                <Fragment key={m.id}>
                  <tr
                    key={m.id}
                    className="border-b border-hairline hover:bg-paper/80 cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : m.id)}
                  >
                    <td className="py-3 px-4 text-slate">
                      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </td>
                    <td className="py-3 px-2 font-medium">{m.name}</td>
                    <td className="py-3 px-2 text-slate">{m.region}</td>
                    <td className="py-3 px-2 font-mono">{m.memberCount.toLocaleString()}</td>
                    <td className="py-3 px-2">
                      <StatusChip status={m.complianceStatus} />
                    </td>
                  </tr>
                  {isOpen && primaryRate && (
                    <tr key={`${m.id}-detail`} className="bg-paper/50">
                      <td colSpan={5} className="p-4">
                        <RateTrendChart
                          data={primaryRate.history}
                          title={`${primaryRate.measureName} — Actual vs Target`}
                        />
                        <div className="mt-3 flex flex-wrap gap-2">
                          {rates.map((r) => (
                            <span
                              key={r.id}
                              className="text-xs font-mono bg-paper-raised border border-hairline rounded px-2 py-1"
                            >
                              {r.measureName}: {Math.round(r.actualRate * 100)}% /{" "}
                              {Math.round(r.targetRate * 100)}%
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

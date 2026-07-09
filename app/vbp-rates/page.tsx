"use client";

import { useMemo, useState } from "react";
import RateTrendChart from "@/components/charts/RateTrendChart";
import { getVbpRates } from "@/lib/mock-data";

export default function VbpRatesPage() {
  const rates = getVbpRates();
  const measures = useMemo(
    () => [...new Set(rates.map((r) => r.measureName))],
    [rates]
  );
  const cycles = useMemo(
    () => [...new Set(rates.map((r) => r.rateSettingCycle))].sort().reverse(),
    [rates]
  );

  const [measure, setMeasure] = useState(measures[0] ?? "");
  const [cycle, setCycle] = useState(cycles[0] ?? "");

  const filtered = rates.filter(
    (r) => r.measureName === measure && r.rateSettingCycle === cycle
  );

  const trendData = rates
    .filter((r) => r.measureName === measure)
    .reduce(
      (acc, r) => {
        r.history.forEach((h) => {
          const existing = acc.find((a) => a.cycle === h.cycle);
          if (!existing) acc.push({ ...h });
        });
        return acc;
      },
      [] as { cycle: string; actualRate: number; targetRate: number }[]
    )
    .sort((a, b) => a.cycle.localeCompare(b.cycle));

  return (
    <div>
      <div className="border-b border-hairline pb-4 mb-6">
        <h1 className="font-display text-2xl text-ink">VBP Rate-Setting Workbench</h1>
        <p className="text-sm text-slate mt-1">
          Value-based payment rates per MCO, measure, and rate-setting cycle
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <label className="text-sm">
          <span className="text-slate text-xs uppercase tracking-wide block mb-1">Measure</span>
          <select
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
            className="border border-hairline rounded-lg px-3 py-2 text-sm bg-paper-raised min-w-[220px]"
          >
            {measures.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-slate text-xs uppercase tracking-wide block mb-1">Cycle</span>
          <select
            value={cycle}
            onChange={(e) => setCycle(e.target.value)}
            className="border border-hairline rounded-lg px-3 py-2 text-sm bg-paper-raised"
          >
            {cycles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="border border-hairline bg-paper-raised rounded-lg p-5 mb-8">
        <h2 className="font-display text-base text-ink mb-4">Historical trend — {measure}</h2>
        <RateTrendChart data={trendData} />
      </section>

      <div className="border border-hairline rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-paper">
            <tr className="text-left text-xs uppercase tracking-wide text-slate border-b border-hairline">
              <th className="py-3 px-4">MCO ID</th>
              <th className="py-3 px-4">Target</th>
              <th className="py-3 px-4">Actual</th>
              <th className="py-3 px-4">Delta</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const delta = r.actualRate - r.targetRate;
              return (
                <tr key={r.id} className="border-b border-hairline hover:bg-paper/50">
                  <td className="py-3 px-4 font-mono">{r.mcoId}</td>
                  <td className="py-3 px-4 font-mono">{Math.round(r.targetRate * 100)}%</td>
                  <td className="py-3 px-4 font-mono">{Math.round(r.actualRate * 100)}%</td>
                  <td
                    className={`py-3 px-4 font-mono font-medium ${
                      delta >= 0 ? "text-verified-green" : "text-breach-red"
                    }`}
                  >
                    {delta >= 0 ? "+" : ""}
                    {Math.round(delta * 100)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { getVbpRates, getMco } from "@/lib/mock-data";

// Baseline table — see CURSOR_PROMPTS.md (Prompt 4) to add the cycle selector
// and the actual-vs-target trend chart.

export default function VbpRatesPage() {
  const rates = getVbpRates();

  return (
    <div>
      <div className="border-b border-hairline pb-4 mb-6">
        <h1 className="font-display text-2xl text-ink">VBP Rate-Setting</h1>
        <p className="text-sm text-slate mt-1">Cycle 2026-Q2</p>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate border-b border-hairline">
            <th className="py-2">MCO</th>
            <th className="py-2">Measure</th>
            <th className="py-2">Target</th>
            <th className="py-2">Actual</th>
            <th className="py-2">Delta</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((r) => {
            const delta = r.actualRate - r.targetRate;
            const deltaColor =
              delta >= 0
                ? "text-verified-green"
                : delta >= -0.05
                ? "text-flag-amber"
                : "text-breach-red";
            return (
              <tr key={r.id} className="border-b border-hairline">
                <td className="py-2">{getMco(r.mcoId)?.name ?? r.mcoId}</td>
                <td className="py-2 text-slate">{r.measureName}</td>
                <td className="py-2 font-mono">{Math.round(r.targetRate * 100)}%</td>
                <td className="py-2 font-mono">{Math.round(r.actualRate * 100)}%</td>
                <td className={`py-2 font-mono ${deltaColor}`}>
                  {delta >= 0 ? "+" : ""}
                  {Math.round(delta * 100)} pts
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

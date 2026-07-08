import { getMcos } from "@/lib/mock-data";

// Baseline table — see CURSOR_PROMPTS.md (Prompt 3) to add sorting, filtering,
// search, and the expandable per-MCO rate trend chart.

export default function McoPerformancePage() {
  const mcos = getMcos();

  return (
    <div>
      <div className="border-b border-hairline pb-4 mb-6">
        <h1 className="font-display text-2xl text-ink">MCO Performance</h1>
        <p className="text-sm text-slate mt-1">
          Cross-organizational comparison of member volume and rate attainment.
        </p>
      </div>

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
          {mcos.map((m) => (
            <tr key={m.id} className="border-b border-hairline">
              <td className="py-2">{m.name}</td>
              <td className="py-2 text-slate">{m.region}</td>
              <td className="py-2 font-mono">{m.memberCount.toLocaleString()}</td>
              <td className="py-2 text-xs text-slate">{m.complianceStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

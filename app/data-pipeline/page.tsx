import SecurityBanner from "@/components/SecurityBanner";
import DataLineageThread from "@/components/DataLineageThread";
import { getPipelineStages } from "@/lib/mock-data";

export default function DataPipelinePage() {
  const stages = getPipelineStages();
  const totalIn = stages[0]?.recordCount ?? 0;
  const totalOut = stages[stages.length - 1]?.recordCount ?? 0;
  const yieldPct = totalIn ? Math.round((totalOut / totalIn) * 100) : 0;

  return (
    <div>
      <SecurityBanner />

      <div className="border-b border-hairline pb-4 mb-6">
        <h1 className="font-display text-2xl text-ink">Data Linking Pipeline</h1>
        <p className="text-sm text-slate mt-1">
          End-to-end lineage from MCO submission through identity resolution to regulator publish
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="border border-hairline rounded-lg p-4 bg-paper-raised">
          <p className="text-xs uppercase text-slate tracking-wide">Records ingested</p>
          <p className="font-mono text-2xl text-ink mt-1">{totalIn.toLocaleString()}</p>
        </div>
        <div className="border border-hairline rounded-lg p-4 bg-paper-raised">
          <p className="text-xs uppercase text-slate tracking-wide">Published rates</p>
          <p className="font-mono text-2xl text-ink mt-1">{totalOut.toLocaleString()}</p>
        </div>
        <div className="border border-hairline rounded-lg p-4 bg-paper-raised">
          <p className="text-xs uppercase text-slate tracking-wide">Pipeline yield</p>
          <p className="font-mono text-2xl text-signal-teal mt-1">{yieldPct}%</p>
        </div>
      </div>

      <section className="border border-hairline bg-paper-raised rounded-lg px-5 py-6">
        <h2 className="font-display text-lg text-ink mb-6">Live pipeline stages</h2>
        <DataLineageThread stages={stages} animated />
      </section>

      <section className="mt-8 grid md:grid-cols-2 gap-4">
        {stages.map((s) => (
          <div key={s.id} className="border border-hairline rounded-lg p-4">
            <h3 className="font-display text-base text-ink">{s.name}</h3>
            <p className="text-sm text-slate mt-2">{s.description}</p>
            <div className="mt-3 flex gap-4 font-mono text-sm">
              <span>{s.recordCount.toLocaleString()} records</span>
              {s.errorCount > 0 && (
                <span className="text-flag-amber">{s.errorCount} flagged</span>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

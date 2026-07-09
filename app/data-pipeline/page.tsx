import { getPipelineStages } from "@/lib/mock-data";

// Baseline — see CURSOR_PROMPTS.md (Prompt 6) for the full numbered-section
// treatment consistent with the home page's Data Lineage Thread.

export default function DataPipelinePage() {
  const stages = getPipelineStages();

  return (
    <div>
      <div className="border-b border-hairline pb-4 mb-6">
        <h1 className="font-display text-2xl text-ink">Data Linking Pipeline</h1>
        <p className="text-sm text-slate mt-1">
          How MCO submissions become published VBP rates.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {stages.map((stage, i) => (
          <div
            key={stage.id}
            className="border border-hairline bg-paper-raised rounded px-5 py-4 flex gap-4"
          >
            <div className="font-mono text-slate text-sm pt-1">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1">
              <div className="font-display text-lg text-ink">{stage.name}</div>
              <p className="text-sm text-slate mt-1">{stage.description}</p>
              <div className="flex gap-6 mt-3 font-mono text-sm">
                <span>{stage.recordCount.toLocaleString()} records</span>
                {stage.errorCount > 0 && (
                  <span className="text-flag-amber">
                    {stage.errorCount.toLocaleString()} flagged
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

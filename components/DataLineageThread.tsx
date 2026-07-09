"use client";

import type { PipelineStage } from "@/lib/types";

interface DataLineageThreadProps {
  stages: PipelineStage[];
  animated?: boolean;
}

export default function DataLineageThread({ stages, animated = true }: DataLineageThreadProps) {
  return (
    <div className="relative">
      {animated && (
        <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 hidden md:block overflow-hidden">
          <div className="h-full w-8 bg-signal-teal/60 rounded animate-lineage-pulse" />
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-stretch gap-3 relative">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex-1 flex items-center gap-3">
            <div className="flex-1 border border-hairline rounded-lg px-4 py-4 bg-paper-raised hover:border-signal-teal/40 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-signal-teal bg-signal-teal/10 px-1.5 py-0.5 rounded">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs uppercase tracking-wide text-slate">{stage.name}</span>
              </div>
              <div className="font-mono text-xl text-ink">
                {stage.recordCount.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate mt-1 line-clamp-2">{stage.description}</p>
              {stage.errorCount > 0 && (
                <div className="text-xs text-flag-amber font-mono mt-2 flex items-center gap-1">
                  ⚠ {stage.errorCount.toLocaleString()} flagged for review
                </div>
              )}
            </div>
            {i < stages.length - 1 && (
              <div className="hidden md:block text-signal-teal/40 text-lg shrink-0">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

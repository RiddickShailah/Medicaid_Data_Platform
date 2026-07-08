import mcosData from "@/data/mcos.json";
import vbpRatesData from "@/data/vbp-rates.json";
import complianceMetricsData from "@/data/compliance-metrics.json";
import auditLogData from "@/data/audit-log.json";
import type {
  Mco,
  VbpRate,
  ComplianceMetric,
  AuditLogEntry,
  PipelineStage,
} from "@/lib/types";

// Cast the raw JSON to our domain types. In a real app this module would be
// swapped for fetch calls against the API layer described in ARCHITECTURE.md —
// components should only ever import from here, never from /data directly.

export function getMcos(): Mco[] {
  return mcosData as Mco[];
}

export function getMco(id: string): Mco | undefined {
  return getMcos().find((m) => m.id === id);
}

export function getVbpRates(): VbpRate[] {
  return vbpRatesData as VbpRate[];
}

export function getVbpRatesForMco(mcoId: string): VbpRate[] {
  return getVbpRates().filter((r) => r.mcoId === mcoId);
}

export function getComplianceMetrics(): ComplianceMetric[] {
  return complianceMetricsData as ComplianceMetric[];
}

export function getOpenComplianceMetrics(): ComplianceMetric[] {
  return getComplianceMetrics().filter((c) => c.resolvedDate === null);
}

export function getComplianceMetricsForMco(mcoId: string): ComplianceMetric[] {
  return getComplianceMetrics().filter((c) => c.mcoId === mcoId);
}

export function getAuditLog(): AuditLogEntry[] {
  return [...(auditLogData as AuditLogEntry[])].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function getProgramAverageRateAttainment(): number {
  const rates = getVbpRates();
  if (rates.length === 0) return 0;
  const attainment = rates.map((r) => r.actualRate / r.targetRate);
  return attainment.reduce((a, b) => a + b, 0) / attainment.length;
}

export function getTotalCoveredMembers(): number {
  return getMcos().reduce((sum, m) => sum + m.memberCount, 0);
}

// Synthetic, illustrative counts for the Data Lineage Thread signature element.
// Swap for real pipeline telemetry when wiring to a backend.
export function getPipelineStages(): PipelineStage[] {
  const totalMembers = getTotalCoveredMembers();
  return [
    {
      id: "submission",
      name: "MCO Submission",
      description:
        "Claims, encounters, quality measures, and member rosters received from each MCO.",
      recordCount: Math.round(totalMembers * 4.2),
      errorCount: 1180,
    },
    {
      id: "identity-resolution",
      name: "Identity Resolution",
      description:
        "Member and provider records matched across MCOs into a master identity crosswalk.",
      recordCount: Math.round(totalMembers * 4.1),
      errorCount: 342,
    },
    {
      id: "linked-record",
      name: "Linked Record",
      description:
        "Unified longitudinal record built per member, with full source lineage retained.",
      recordCount: Math.round(totalMembers * 0.98),
      errorCount: 96,
    },
    {
      id: "vbp-calculation",
      name: "VBP Calculation",
      description:
        "Measure definitions applied to linked records to produce per-MCO, per-measure rates.",
      recordCount: getVbpRates().length * getMcos().length,
      errorCount: 4,
    },
    {
      id: "regulator-publish",
      name: "Regulator Publish",
      description:
        "Finalized rates and compliance determinations published to the regulatory dashboard.",
      recordCount: getVbpRates().length,
      errorCount: 0,
    },
  ];
}

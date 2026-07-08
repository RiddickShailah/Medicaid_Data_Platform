export type Role = "regulator" | "mco_admin" | "mco_analyst" | "auditor";

export type ComplianceStatus = "compliant" | "at_risk" | "non_compliant";

export interface Mco {
  id: string;
  name: string;
  region: string;
  memberCount: number;
  enrollmentStatus: "active" | "provisional" | "suspended";
  complianceStatus: ComplianceStatus;
}

export interface RateHistoryPoint {
  cycle: string; // e.g. "2025-Q3"
  actualRate: number; // 0-1
  targetRate: number; // 0-1
}

export interface VbpRate {
  id: string;
  mcoId: string;
  measureId: string;
  measureName: string;
  rateSettingCycle: string;
  targetRate: number; // 0-1
  actualRate: number; // 0-1
  history: RateHistoryPoint[];
}

export type ComplianceMetricType =
  | "submission_timeliness"
  | "data_completeness"
  | "measure_threshold";

export interface ComplianceMetric {
  id: string;
  mcoId: string;
  type: ComplianceMetricType;
  status: ComplianceStatus;
  description: string;
  dueDate: string; // ISO date
  resolvedDate: string | null; // ISO date or null if open
}

export type AuditAction = "view" | "export" | "edit" | "flag_resolve";

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorRole: Role;
  action: AuditAction;
  resourceType: "mco" | "vbp_rate" | "compliance_metric" | "audit_log";
  resourceId: string;
  timestamp: string; // ISO datetime
  ipHash: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  recordCount: number;
  errorCount: number;
}

# Architecture

## 1. System overview

```
                     ┌─────────────────────────────────────────────────────┐
                     │                 MCO SUBMISSIONS                      │
                     │   Claims • Encounters • Quality Measures • Member    │
                     │   Rosters  (per-MCO, batch + near-real-time feeds)   │
                     └───────────────────────────┬───────────────────────────┘
                                                   │  TLS 1.2+ ingest
                                                   ▼
                     ┌─────────────────────────────────────────────────────┐
                     │              DATA LINKING PIPELINE                   │
                     │  1. Validate & normalize (schema, code sets)         │
                     │  2. Identity resolution (member + provider match     │
                     │     across MCOs — deterministic + probabilistic)     │
                     │  3. Build unified longitudinal record                │
                     │  4. Attach lineage metadata (source MCO, batch id,   │
                     │     timestamp) for every linked field                │
                     └───────────────────────────┬───────────────────────────┘
                                                   ▼
                     ┌─────────────────────────────────────────────────────┐
                     │           VBP RATE-SETTING ENGINE                    │
                     │  Applies measure definitions to linked records,      │
                     │  computes per-MCO / per-measure rates, compares      │
                     │  against targets and prior cycles                    │
                     └───────────────────────────┬───────────────────────────┘
                                                   ▼
                     ┌─────────────────────────────────────────────────────┐
                     │        COMPLIANCE & AUDIT LAYER                      │
                     │  Submission timeliness, completeness thresholds,     │
                     │  measure-level compliance flags, immutable audit     │
                     │  log of all reads/writes to sensitive data           │
                     └───────────────────────────┬───────────────────────────┘
                                                   ▼
                     ┌─────────────────────────────────────────────────────┐
                     │           REGULATORY DASHBOARD (this repo)          │
                     │  Role-scoped views for Regulators, MCO staff, and    │
                     │  Auditors — RBAC-gated, AES-256 at rest, TLS in      │
                     │  transit                                             │
                     └─────────────────────────────────────────────────────┘
```

## 2. Frontend scope of this repo

This repo implements the **Regulatory Dashboard** layer only, against mock data that mirrors
the shape of what the pipeline/rate-setting engine would produce. `lib/mock-data.ts` is the
single seam between UI and data — swapping it for real API/service calls (e.g., to a backend
exposing `/api/mcos`, `/api/vbp-rates`, `/api/compliance`, `/api/audit-log`) should require no
changes to components.

## 3. Data model summary (see `lib/types.ts` for full definitions)

- **MCO** — organization identity, region, member count, enrollment status
- **VbpRate** — mcoId, measureId, measureName, rateSettingCycle, targetRate, actualRate,
  trend history
- **ComplianceMetric** — mcoId, metric type (timeliness / completeness / measure-threshold),
  status (compliant / at-risk / non-compliant), dueDate, resolvedDate
- **AuditLogEntry** — actorId, actorRole, action, resourceType, resourceId, timestamp, ipHash
- **Role** — `regulator | mco_admin | mco_analyst | auditor`, drives both API-level scoping and
  UI-level visibility

## 4. Suggested backend (not included, described for completeness)

- **Ingestion:** queue-based (e.g. SQS/Kafka) per-MCO submission channel, schema-validated on
  entry
- **Identity resolution:** a matching service (deterministic keys first, probabilistic
  fallback) producing a crosswalk table of MCO-local IDs → master person/provider ID
- **Storage:** encrypted-at-rest data warehouse (AES-256) with row-level security keyed to MCO
  + role
- **API layer:** REST/GraphQL gateway enforcing RBAC and emitting an audit log entry for every
  read of patient-linked or payment data
- **Auth:** SSO (SAML/OIDC) issuing role claims consumed by both API gateway and frontend

## 5. Non-goals of this repo

- No real PHI/PII — all data is synthetic
- No real authentication — role is switched via a mock role-picker in the header for demo
  purposes
- No real encryption — the UI displays "TLS/AES-256" status indicators as design elements, not
  functioning security controls

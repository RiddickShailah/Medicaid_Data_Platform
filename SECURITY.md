# Security Framework (Design Spec)

This document describes the security posture the platform is designed around. It is the spec
the UI's compliance/audit surfaces are built to represent. **Nothing in this repo implements
real cryptography or access control** — this is the reference for what a production backend
would need to satisfy, and for how the frontend should represent security state to users.

## 1. Data protection

- **In transit:** TLS 1.2+ for all client-server and service-to-service traffic.
- **At rest:** AES-256 encryption for the data warehouse, backups, and any exported files
  (e.g. compliance reports).
- **Field-level sensitivity:** member-identifiable fields are tagged and masked by default in
  any view where the active role does not require them (e.g. an MCO Analyst sees aggregate
  rates, not member-level detail, unless their role explicitly grants it).

## 2. Role-Based Access Control (RBAC)

| Role | Cross-MCO data | Own-MCO data | Audit log | User management |
|---|---|---|---|---|
| State Regulator | Read (aggregate + flagged detail) | Read | Read | — |
| MCO Administrator | — | Read/Write (submissions) | — | Own MCO only |
| MCO Analyst | — | Read | — | — |
| Auditor | Read (audit trail only) | Read (audit trail only) | Read | — |

RBAC is enforced at the API layer (never trust client-side role state for real access control)
and mirrored in the UI so users only ever see navigation and data they're entitled to.

## 3. Audit logging

Every read or write of sensitive data (patient-linked records, payment data, compliance
determinations) produces an immutable audit log entry containing:

- Actor ID and role at time of action
- Action type (view / export / edit / flag-resolve)
- Resource type and ID accessed
- Timestamp (UTC)
- Hashed IP / session identifier (never raw IP, to avoid the log itself becoming a privacy risk)

Audit logs are append-only and themselves access-controlled (Auditor and Regulator roles only).

## 4. Compliance alignment

Designed to align with the class of controls expected under federal Medicaid data-sharing
requirements (HIPAA Security Rule safeguards, CMS MARS-E-style control families): encryption,
access control, audit controls, and integrity controls are treated as first-class product
requirements, not add-ons.

## 5. How this shows up in the UI

- A persistent, unobtrusive "Secure session · TLS" indicator in the header
- Every compliance/audit screen shows the acting role clearly at all times
- Data export actions show a confirmation step referencing what will be logged
- The audit log screen itself is a first-class page, not a hidden admin panel

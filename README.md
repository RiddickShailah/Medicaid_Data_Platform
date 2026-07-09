# Centralized Medicaid Data Platform

A national-scale data platform that operationalizes **Value-Based Payment (VBP) rate-setting**
across Managed Care Organizations (MCOs). It links claims, encounter, and quality data across
organizations, exposes an interactive regulatory dashboard to state regulators and MCO
stakeholders, and enforces a compliance-grade security posture (TLS + AES-256, RBAC, audit
logging) suitable for federally regulated health data.

This repo is a **frontend/product scaffold** meant to be finished inside Cursor. It ships with:

- A working Next.js + TypeScript + Tailwind app shell (sidebar, header, routing)
- Realistic **mock data** for MCOs, VBP rates, compliance metrics, and audit logs
- Strongly-typed data models (`lib/types.ts`) so Cursor's autocomplete/agent has real shapes to work with
- A written **design system** (below) so generated UI looks intentional, not templated
- `CURSOR_PROMPTS.md` — copy/paste prompts to drive Cursor through building out each screen

> This is a portfolio/demo project. The "security framework" described here is a **design
> spec** to be implemented — mock auth and mock encryption indicators are used in the UI so the
> dashboard reads correctly; do not treat any code in this repo as production-grade security.

---

## 1. What the product does

| Capability | Description |
|---|---|
| **Data linking pipeline** | Ingests MCO submissions (claims, encounters, quality measures), resolves member/provider identities across organizations, and produces a unified longitudinal record used for VBP calculations. |
| **VBP rate-setting** | Calculates and displays value-based payment rates per MCO, per measure, per rate-setting cycle, with historical trends and target vs. actual comparisons. |
| **Regulatory dashboard** | Real-time visibility for state regulators into MCO performance, payment accuracy, and compliance status across the program. |
| **MCO stakeholder view** | Scoped view for an individual MCO to see its own performance, submission status, and compliance flags (RBAC-gated — an MCO never sees another MCO's data). |
| **Compliance & audit** | Tracks compliance metrics (submission timeliness, data completeness, measure thresholds) and maintains an immutable audit log of who accessed/changed what. |
| **Security framework** | TLS in transit, AES-256 at rest, role-based access control (Regulator / MCO Admin / MCO Analyst / Auditor), and audit logging on every sensitive read/write. |

## 2. Roles (drives RBAC + UI states)

- **State Regulator** — full cross-MCO visibility, read-only on submitted data, can flag compliance issues.
- **MCO Administrator** — full visibility into their own MCO's data, can manage their MCO's users.
- **MCO Analyst** — read access to their own MCO's performance and submissions.
- **Auditor** — read-only access to audit logs and compliance history across all MCOs.

## 3. Tech stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with a custom design-token theme (see `tailwind.config.ts`)
- **Charts:** Recharts (rate trends, compliance trend lines)
- **State/data:** Local mock JSON in `/data` served through `lib/mock-data.ts` — swap for real API calls later (see `ARCHITECTURE.md`)
- **Icons:** lucide-react

## 4. Run locally (see the UI)

```bash
cd ~/Desktop/Projects/Medicaid_Data_Platform
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

Use the sidebar to navigate: Overview, MCO Performance, VBP Rates,
Compliance & Audit, and Data Pipeline.

## 5. Deploy

This is a static Next.js app — deploy free on [Vercel](https://vercel.com):

1. Push this repo to GitHub (already done).
2. Go to [vercel.com/new](https://vercel.com/new) and import **RiddickShailah/Medicaid_Data_Platform**.
3. Leave all settings as default (Framework: Next.js) and click **Deploy**.
4. Vercel gives you a live URL like `https://medicaid-data-platform.vercel.app`.

Or deploy from the terminal with the Vercel CLI:

```bash
cd ~/Desktop/Projects/Medicaid_Data_Platform
npx vercel
```

## 6. Project structure

```
app/
  layout.tsx              Root layout — sidebar + header shell
  page.tsx                 Regulator overview / home dashboard
  mco-performance/         Cross-MCO performance comparison
  vbp-rates/                VBP rate-setting workbench
  compliance/               Compliance metrics + audit log
  data-pipeline/            Data linking pipeline visualization (signature screen)
components/
  Sidebar.tsx, Header.tsx, KpiCard.tsx   Shared shell + primitives
lib/
  types.ts                Domain types: MCO, VbpRate, ComplianceMetric, AuditLogEntry, Role
  mock-data.ts             Typed accessors over /data JSON
data/
  mcos.json, vbp-rates.json, compliance-metrics.json, audit-log.json
```

## 7. Design system

Read this before generating UI. The goal is a **civic-ledger** aesthetic — the visual language
of a state regulatory filing crossed with a modern data platform. Precise, trustworthy, legible
at high data density. Not a SaaS-startup landing page.

### Palette

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#12213B` | Primary text, sidebar background, headers |
| `--slate` | `#4A5A70` | Secondary text, borders on dark |
| `--paper` | `#EEF1F5` | App background (cool paper, not warm cream) |
| `--paper-raised` | `#FFFFFF` | Cards, table surfaces |
| `--signal-teal` | `#0E7C7B` | Primary accent — links, active nav, primary actions |
| `--verified-green` | `#2F8558` | Compliant / on-target status |
| `--flag-amber` | `#C97A2B` | At-risk / needs-review status |
| `--breach-red` | `#B3432B` | Non-compliant / overdue status |
| `--hairline` | `#D7DCE3` | Table and section dividers |

### Type

- **Display / headers:** `Newsreader` (serif) — set at restrained weights (500–600), used for
  page titles and the big rate-setting numbers. Gives the "official filing" gravity without
  going full broadsheet.
- **Body / UI:** `IBM Plex Sans` — clean, civic, highly legible at small sizes for dense tables.
- **Data / mono:** `IBM Plex Mono` — used for MCO IDs, rate percentages, audit log timestamps,
  and anything that should read as a precise, unaltered value.

### Layout concept

The product is organized like a **case file**: the sidebar reads as a tabbed folder ("Overview",
"MCO Performance", "VBP Rates", "Compliance & Audit", "Data Pipeline"), each page opens with a
filing-style header (title + status chip + last-updated timestamp, divided by a hairline rule),
and content below is organized into numbered sections **only where the content is genuinely
sequential** (e.g., the data pipeline's ingest → link → calculate → publish stages). Tables and
KPI cards use generous whitespace and hairline dividers rather than heavy card shadows.

### Signature element

**The Data Lineage Thread** on the home dashboard (`app/page.tsx` / `data-pipeline/page.tsx`):
a horizontal pipeline visualization showing a record's journey — *MCO Submission → Identity
Resolution → Linked Record → VBP Calculation → Regulator Publish* — with live-looking counts
at each stage and a subtle animated pulse traveling along the connecting line. This is the one
memorable, slightly bold element; everything else in the UI stays quiet and disciplined around it.

### Interaction notes for Cursor

- Status is always communicated with both **color and text/icon** (never color alone) — this is
  a compliance product, colorblind-safe by requirement.
- Every screen needs a visible keyboard focus state and to remain usable at 375px width.
- Motion is restrained: the lineage thread pulse and gentle fade-ins on data load are enough —
  avoid decorative animation elsewhere.

See `CURSOR_PROMPTS.md` for the exact prompts to build each screen against this system.

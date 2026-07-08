# Cursor build prompts

Use these in order, one at a time, in Cursor's agent/composer mode. Each assumes Cursor has
read `README.md` (design system), `ARCHITECTURE.md`, and `lib/types.ts` — point it at those
files explicitly if it hasn't picked them up.

Give Cursor read access to the whole repo, but reference these files by name in your first
message so it grounds itself:

> Read README.md (section 6, design system), ARCHITECTURE.md, and lib/types.ts before making
> any changes. Follow the design tokens in README.md exactly — do not substitute your own
> color palette or fonts.

---

### Prompt 1 — Install fonts + finish the theme

```
Set up next/font for Newsreader (display), IBM Plex Sans (body), and IBM Plex Mono (data/
utility), matching README.md section 6. Wire the CSS variables from tailwind.config.ts into
app/globals.css and app/layout.tsx so `font-display`, `font-body`, and `font-mono` utility
classes are usable everywhere. Do not change the color tokens already defined in
tailwind.config.ts.
```

### Prompt 2 — Home dashboard + Data Lineage Thread (signature element)

```
Build out app/page.tsx as the State Regulator's home dashboard:
- Filing-style header: "Program Overview", a status chip showing overall program compliance,
  and a last-updated timestamp in font-mono.
- KPI row using components/KpiCard.tsx: total MCOs, total covered members, program-wide average
  VBP rate vs target, open compliance flags. Pull real numbers from lib/mock-data.ts.
- The Data Lineage Thread: a horizontal pipeline visualization with five stages (MCO Submission
  → Identity Resolution → Linked Record → VBP Calculation → Regulator Publish), each stage
  showing a live-looking record count from mock data, connected by a line with a slow animated
  pulse traveling left to right (respect prefers-reduced-motion). This is the one bold visual
  element on the page — keep everything else quiet per the design system.
- Below that, a compact table of MCOs with the biggest compliance flags, linking to
  /compliance.
Make it fully responsive down to 375px.
```

### Prompt 3 — MCO Performance page

```
Build app/mco-performance/page.tsx: a sortable, filterable table comparing all MCOs on member
count, average VBP rate attainment (actual vs target, as a percentage with a small inline bar),
and compliance status (color + icon + text, never color alone). Include a region filter and a
search-by-MCO-name input. Row click expands an inline detail panel with that MCO's per-measure
rate trend (small line chart, Recharts) using data from lib/mock-data.ts.
```

### Prompt 4 — VBP Rate-Setting workbench

```
Build app/vbp-rates/page.tsx: a rate-setting cycle selector at the top, then a table of
measures x MCOs showing target rate, actual rate, and delta, using font-mono for all numeric
values. Add a trend chart (Recharts) comparing actual vs target rate over the last several
cycles for a selected measure. Use --verified-green / --flag-amber / --breach-red per the design
system thresholds (on-target / within 5% / more than 5% off target).
```

### Prompt 5 — Compliance & Audit page

```
Build app/compliance/page.tsx with two sections:
1. Compliance metrics: a table of open and resolved compliance items per MCO (submission
   timeliness, data completeness, measure thresholds), status chips, due dates.
2. Audit log: a reverse-chronological, filterable (by actor role, action type, date range) log
   table using font-mono for timestamps and IDs, per lib/types.ts AuditLogEntry shape.
Gate visibility: if the active mock role (see header role-switcher) is mco_analyst or
mco_admin, only show that MCO's own rows; auditor and regulator see everything. Add a small
role indicator near the page title so it's always clear which view is active.
```

### Prompt 6 — Data Pipeline page (deep dive)

```
Build app/data-pipeline/page.tsx as a deeper, more technical version of the home page's lineage
thread: the same five stages, each as its own section (numbered 01–05, since this genuinely is
a sequential pipeline), with a short description, the mock record counts, and any relevant
validation/error counts at that stage. Keep the visual language consistent with the home page's
signature element but give each stage room to breathe.
```

### Prompt 7 — Header role-switcher + RBAC-aware nav

```
Build components/Header.tsx with a role-switcher (State Regulator / MCO Administrator / MCO
Analyst / Auditor) that updates a small client-side context (lib/role-context.tsx — create this)
consumed by Sidebar.tsx to show/hide nav items per SECURITY.md's RBAC table, and by each page to
scope visible data. Include the "Secure session · TLS" indicator described in SECURITY.md
section 5, styled quietly in the header, not as a banner.
```

### General notes to give Cursor

- Keep all copy in the interface's own voice per README.md's writing guidance — plain, specific,
  no filler, status language that never apologizes.
- Every status must pair color with text or icon.
- Reuse KpiCard.tsx and the color tokens rather than inventing new card styles per page.

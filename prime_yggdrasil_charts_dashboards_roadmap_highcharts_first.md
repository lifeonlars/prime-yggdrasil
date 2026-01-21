# Prime Yggdrasil Charts & Dashboards Roadmap (Highcharts-first)

## Context
We are expanding `@lifeonlars/prime-yggdrasil` beyond theming PrimeReact to include **charts, visualisations, widgets, and dashboard composition** aligned with Retriever’s Yggdrasil system.

Primary audience is **Retriever internal**. The package is public mainly for distribution convenience.

## Scope
This document is a **functional requirements spec + implementation plan** for adding charting, widgets, and dashboard composition capabilities to the Prime Yggdrasil repository.

Primary audience is **Retriever internal**; public npm publication is for distribution convenience.

## Goals
- Provide a consistent, systemised chart + widget layer aligned with Yggdrasil tokens.
- Optimize for predictable defaults, maintainability, and agent-friendly APIs.
- Enable rapid prototyping and internal tools (admin platform, Nornir, AI playgrounds).

## Non-goals (for now)
- Full PrimeReact chart compatibility.
- A generic public chart framework.
- Multiple chart “density” contexts (sm/md/lg) for in-chart typography.
- Full PrimeReact chart compatibility.
- A generic public chart framework.

---

## Guiding principles
- **Semantic over raw library config**: consumers shouldn’t need to know Highcharts deeply.
- **Boring defaults**: predictable visuals, accessible interactions, consistent spacing.
- **Adapters, not lock-in**: Highcharts first, but keep the architecture open to ECharts/Chart.js later.
- **Consistency > feature breadth**: add chart types only when they can be made consistent + supportable.

---

## Repository & package structure

### Repository
- **Single GitHub repository** (monorepo-style, but simple).
- Charts, widgets, and dashboard composition live together to avoid fragmentation and excessive optional dependencies.

### npm packages
- `@lifeonlars/prime-yggdrasil`
  - tokens (CSS variables)
  - PrimeReact theming + overrides
  - sizing contracts (controls / surfaces)

- `@lifeonlars/prime-yggdrasil-charts`
  - semantic chart primitives
  - widget blocks (ChartWidget, TableWidget, KPIWidget, etc.)
  - dashboard composition + layout
  - interaction + sync contracts

Rationale:
- Dashboards, widgets, and charts are tightly coupled in real usage.
- Avoids deep optional-dependency graphs and unclear ownership boundaries.
- Keeps a clear separation between **visual foundation (theme)** and **data-driven UI blocks (charts/widgets/dashboards)**.

### Dependencies
- Highcharts (Core + Maps) as **peer dependencies** of `prime-yggdrasil-charts`.
- Highcharts modules (treemap, wordcloud, maps) loaded explicitly where needed.
- No dependency on PrimeReact chart components.

---

## Chart surface (semantic API)
### Core chart primitives (Phase 1)
1) **TimeSeriesLine**
2) **Column** (vertical) and **Bar** (horizontal)
3) **StackedColumn** and **StackedBar**
4) **Donut/Pie** (keep minimal)

### Combined charts (Phase 2)
5) **PeriodCompare** (current = columns/bars, previous = line)
   - consistent legend semantics and tooltip pairing
6) **DualAxisCombo** (e.g. columns = editorial, line = social)
   - explicit axis assignment + units formatting

### “Customer-expected” charts (Phase 3)
7) **Treemap**
8) **WordCloud** (supported but clearly labelled as low-precision)
9) **Map** (Highcharts Maps module)

### Out-of-scope until proven necessary
- highly bespoke chart types
- custom D3-level visuals

---

## Standard props (every chart)
All chart components should accept a consistent set of props, regardless of type:
- `title?`, `subtitle?` (optional; usually provided by WidgetFrame)
- `size`: `'sm' | 'md' | 'lg'` (maps to typography + spacing)
- `data`: canonical data shape (see below)
- `encoding`: x/y/series mapping (explicit)
- `format`: units, decimals, compact notation, percent
- `legend`: show/hide, placement, interaction mode
- `tooltip`: enabled + formatting
- `states`: loading / empty / error
- `accessibility`: aria labels / keyboard focus / reduced motion

### Data shape (recommendation)
Prefer a predictable table-like structure that maps well to agent generation:
- `rows: Array<Record<string, number | string | Date | null>>`
- `encoding: { x: string; y: string | string[]; series?: string; stack?: string; }`

This avoids bespoke per-chart data shapes.

---

## Theming approach
- Use Yggdrasil CSS variables as the source of truth.
- Chart theme mapping layer translates CSS vars into Highcharts options:
  - text styles (font family/size/weight/line height)
  - axis/gridline colors
  - tooltip surfaces
  - series color palette (categorical + sequential)
  - focus/hover/selection styling

Key rule: charts must feel like they belong to the same system as buttons/inputs/tables.

---

## Widgets & dashboard blocks

Widgets and dashboards are treated as **first-class citizens**, not add-ons.

### WidgetFrame (base block)
A standard container used across dashboards and internal tools:
- optional header (title, context, actions, filters)
- body (chart, table, KPI, or custom content)
- footer (metadata, secondary actions)
- standard states: loading / empty / error

### Widget types
- `ChartWidget`
- `TableWidget`
- `KPIWidget` (metric + sparkline)
- `InsightWidget` (text + inline metrics)

Widgets are responsible for:
- layout consistency
- state handling
- exposing configuration surfaces (visualisation switch, basic options)

Charts remain focused on **data → visual encoding** only.

---

## Dashboard composition + sync roadmap
### Baseline (Phase A)
- Dashboard layout using CSS grid (simple, deterministic)
- add/remove/reorder widgets via app-level state (persistence handled by consumer)

### Advanced (Phase B)
- Drag/drop layout with responsive breakpoints
- Widget configuration per instance (visualisation switch, toggles, breakdown)

### Sync (Phase C)
We want widgets “talking to each other” but only where it makes sense.

**Design approach**:
- Introduce a **Sync Contract** at the widget layer (not chart-library-specific):
  - `syncGroupId` (string)
  - `syncCapabilities`: { hover, crosshair, legendVisibility, selection, filters }
  - `syncPolicy`: `'opt-in'` defaults (avoid accidental coupling)

**Implementation approach**:
1) Start with a simple internal event bus (works for any chart engine)
2) Evaluate Highcharts Dashboards add-on for data pooling + built-in synchronization:
   - DataPool + connectors (central data access)
   - sync groups for highlight/visibility/etc.

Note: syncing is a late phase feature; architecture should keep it possible from day one.

---

## Highcharts Dashboards add-on evaluation
Highcharts Dashboards includes:
- DataPool + connectors (central data access)
- component synchronization mechanisms (group-based)

We should assess:
- whether it fits our React architecture
- licensing impact
- whether it replaces or complements our WidgetFrame + Dashboard layout

Decision: **evaluate after we have 5–10 real widgets** so we can judge fit with real requirements.

---

## Implementation plan (phased)
### Phase 1 — Foundation + Core charts
- Create `@lifeonlars/prime-yggdrasil-charts` (semantic API + theme mapping)
- Create Highcharts adapter package with peer deps
- Implement: TimeSeriesLine, Column, Bar, StackedColumn, Donut
- Ship: formatting helpers (units/compact/percent)
- Add Storybook stories for each chart + “control alignment” harness for layout

### Phase 2 — Combined charts + robustness
- Implement: PeriodCompare (column+line), DualAxisCombo
- Add interaction defaults: tooltip pairing, shared crosshair, accessible legend interactions
- Add performance guardrails (large data: sampling / simplified markers)

### Phase 3 — Specialty charts
- Add Highcharts modules: wordcloud, treemap, maps
- Implement semantic wrappers: WordCloud, Treemap, Map
- Ensure consistent legend/tooltip patterns

### Phase 4 — Widgets
- Implement WidgetFrame + baseline widget types
- Create a small “Widget Gallery” in Storybook

### Phase 5 — Dashboard composition
- Simple grid layout + persistence model example
- Add configuration model for per-widget customisation

### Phase 6 — Sync + advanced dashboards
- Implement Sync Contract (groups + capabilities)
- Evaluate Highcharts Dashboards (DataPool + sync) as an optional layer

---

## Storybook hosting (GitHub)
- Host Storybook on GitHub Pages for public access within org constraints.
- Keep stories focused on:
  - chart primitives
  - widget gallery
  - dashboard layout examples
  - regression-friendly “alignment harness” stories

---

## Resolved decisions
1) **No sm/md/lg contexts for charts**: charts are responsive, but chart typography does not scale by context.
2) **Use existing chart design tokens**: categorical palette, boolean + emphasis/diminish, sentiment palette, sequential/scale palette.
3) **Data contract**: use `rows + encoding` (table-like) as the default; adapt backend JSON to this at the edge.
4) **Licensing**: Highcharts Core + Maps are available. Highcharts Dashboards is not licensed yet; treat dashboard sync as an optional later phase.

## Remaining open decisions
- Whether to adopt Highcharts Dashboards later vs building our own sync/layout layer (evaluate after 5–10 real widgets).
- Exact mapping of Yggdrasil chart tokens → Highcharts theme options (document and lock).


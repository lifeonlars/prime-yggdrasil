# Agentic UI Architecture & PrimeFlex Policy

## Purpose

This document defines the **UI architecture and styling approach**, with a specific focus on **agentic (LLM-assisted) development**. The goal is to enable fast iteration while maintaining visual consistency, reducing UI drift, and keeping long-term maintenance costs low.

---

## Core Principles

1. **Design-system-first, not utility-first**  \
   Utilities are implementation details, not the design language. UI should be composed from approved components and patterns, not invented ad hoc.

2. **Composition over invention**  \
   Both humans and LLMs should assemble interfaces from existing primitives and blocks rather than creating bespoke layouts or styles in each view.

3. **Guardrails enable speed**  \
   Constraints are intentional. By limiting where and how styling decisions can be made, we reduce cognitive load, rework, and visual inconsistency.

4. **Storybook is the contract**  \
   If a component or pattern is not represented in Storybook, it should not be created implicitly in a product view.

---

## High-Level Architecture

### 1. Primitives (PrimeReact)

- PrimeReact provides the **base UI primitives**: buttons, inputs, dropdowns, tables, dialogs, tags, etc.
- Visual consistency is primarily achieved through:
  - PrimeOne theming
  - PrimeReact props and configuration
  - PassThrough (PT) configuration where needed
- PrimeReact is used in **styled mode**. Unstyled mode is explicitly avoided.
- Custom styling of primitives should be avoided unless there is a clear, documented gap.

---

### 2. Blocks

Blocks are **reusable UI compositions** built on top of PrimeReact primitives.

Examples:

- App shell (navigation + content area)
- Page header (title + actions + metadata)
- Filter bar (search, dropdowns, chips)
- Data table wrapper (density, empty/loading states, row actions)
- Side panel / detail panel layout
- Status chip sets (Now / Next / Later, priority, risk)
- Empty and error states

Rules:

- **PrimeFlex is allowed inside blocks**
- Blocks own visual styling and spacing
- Blocks are documented in Storybook and treated as approved building units

---

### 3. Layout Blocks (strongly encouraged)

Layout blocks are **non-visual structural components** that define responsive page scaffolding.

Examples:

- AppShell
- PageLayout
- TwoColumnResponsive
- MasterDetailLayout
- DrawerLayout

These exist to prevent layout logic from being reimplemented inconsistently across views. PrimeBlocks may be used purely as **visual and structural inspiration**, not as a dependency.

---

### 4. Views (Screens)

Views are responsible for:

- Data fetching and state management
- Wiring interactions and handlers
- Composing blocks and layouts into a screen

Views should contain **minimal styling logic**.

---

## PrimeFlex Usage Policy

PrimeFlex is the **layout utility layer** alongside PrimeReact + PrimeOne (styled mode). Its job is *structural scaffolding*, not visual styling.

To keep agentic development predictable and prevent drift, we use a **strict whitelist** of PrimeFlex utilities that are allowed inside **Views**.

### View whitelist (allowed PrimeFlex classes)

Views may use PrimeFlex **only** for page scaffolding, using **only** the following families:

1) **Grid scaffolding (preferred)**
- `grid`
- `col-*` (e.g. `col-12`, `col-6`, `col-3`)
- Responsive variants of `col-*` (e.g. `md:col-6`, `lg:col-4`, `xl:col-3`)

2) **Flex scaffolding (allowed, but secondary)**
- `flex`
- `flex-wrap`
- Responsive variants (e.g. `md:flex`)

3) **Spacing between layout regions**
- `gap-*` and responsive variants (e.g. `gap-3`, `md:gap-4`)

4) **Alignment for structural layout**
- `align-items-*` (e.g. `align-items-start|center|end|stretch`) + responsive variants
- `justify-content-*` (e.g. `justify-content-start|center|end|between|around|evenly`) + responsive variants

5) **Outer page padding only** (single wrapper)
- Exactly one outer wrapper may use:
  - `p-*` **or** `px-*`/`py-*`
  - Optional responsive variants (e.g. `p-3 md:p-4`)

That’s it.

### View blacklist (explicitly forbidden)

Views must **not** use PrimeFlex for:

- **Colours / visual identity** (anything that changes colours, borders, shadows)
- **Typography** (font sizing/weights/line-height)
- **Radius, shadows, effects**
- **Ad-hoc spacing for visual tuning**
  - No `m-*`, `mx-*`, `my-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*`
  - No extra `p-*` beyond the single outer wrapper
- **One-off layout hacks** (absolute positioning, z-index games, negative margins)

If you feel tempted: you don’t need more PrimeFlex — you need a **Block**.

### Canonical view patterns (examples)

**Page scaffold (grid-first):**
- Outer wrapper: `p-3 md:p-4`
- Main layout: `grid`
- Spacing: `gap-3 md:gap-4`
- Columns: `col-12 md:col-8` + `col-12 md:col-4`

**Header row (structural flex):**
- `flex align-items-center justify-content-between`

### Block and Layout Block rules (where styling lives)

- Blocks/Layout Blocks may use PrimeFlex *freely* for internal spacing and composition.
- Blocks/Layout Blocks may own any additional styling decisions (component props, PT config, custom CSS where justified).
- Any repeated pattern found in multiple views should be promoted into a Block/Layout Block and documented in Storybook.

This keeps views thin, predictable, and safe for LLM-assisted iteration.

---

## Storybook & Chromatic

### Storybook

Storybook serves as:

- Executable documentation of approved primitives, blocks, and layouts
- The reference for both human developers and LLM agents
- A safe environment to explore states (loading, empty, error, dense, edge cases)

Suggested structure:

- `Foundations/`
- `Primitives/`
- `Blocks/`
- `Layouts/`
- `Screens/` (optional reference screens)

### Chromatic

Chromatic provides:

- Visual regression testing
- Confidence when refactoring or extending UI via LLMs
- A review mechanism for unintended visual drift

Visual diffs are treated as **intentional review points**, not noise.

---

## LLM Agent Guidelines (Summary)

- Use **PrimeReact primitives** for all basic UI elements
- Prefer **existing Blocks and Layout Blocks** over new custom layouts
- Do not introduce new PrimeFlex styling in views beyond the allowed set
- If a new pattern is required:
  1. Create or extend a Block
  2. Add it to Storybook
  3. Validate via Chromatic
- Assemble UI from approved patterns rather than inventing new ones

---

## Intent

This architecture is designed to let **LLMs act as force multipliers**, not uncontrolled designers. By clearly separating responsibilities and constraining where styling decisions can be made, development can move fast without creating long-term UI debt.


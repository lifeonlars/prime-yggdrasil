# Agentic UI Architecture & Tailwind Policy

## Purpose

This document defines the **UI architecture and styling approach**, with a specific focus on **agentic (LLM-assisted) development**. The goal is to enable fast iteration while maintaining visual consistency, reducing UI drift, and keeping long-term maintenance costs low.

---

## Core Principles

1. **Design-system-first, not utility-first**\
   Utilities are implementation details, not the design language. UI should be composed from approved components and patterns, not invented ad hoc.

2. **Composition over invention**\
   Both humans and LLMs should assemble interfaces from existing primitives and blocks rather than creating bespoke layouts or styles in each view.

3. **Guardrails enable speed**\
   Constraints are intentional. By limiting where and how styling decisions can be made, we reduce cognitive load, rework, and visual inconsistency.

4. **Storybook is the contract**\
   If a component or pattern is not represented in Storybook, it should not be created implicitly in a product view.

---

## High-Level Architecture

### 1. Primitives (PrimeReact)

- PrimeReact provides the **base UI primitives**: buttons, inputs, dropdowns, tables, dialogs, tags, etc.
- Visual consistency is primarily achieved through:
  - Prime theming (themed PrimeOne or equivalent)
  - PrimeReact props and configuration
  - PassThrough (PT) configuration where needed
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

- Tailwind **is allowed** in blocks
- Blocks own visual styling and spacing
- Blocks are documented in Storybook and treated as approved building units

---

### 3. Layout Blocks (optional but encouraged)

Layout blocks are **non-visual structural components** that define responsive page scaffolding.

Examples:

- AppShell
- PageLayout
- TwoColumnResponsive
- MasterDetailLayout
- DrawerLayout

These exist to prevent layout logic from being reimplemented inconsistently across views. PrimeBlocks can be used as reference and inspiration to create more layout blocks and compositions. \
https\://primeblocks.org/

---

### 4. Views (Screens)

Views are responsible for:

- Data fetching and state management
- Wiring interactions and handlers
- Composing blocks and layouts into a screen

Views should contain **minimal styling logic**.

---

## Tailwind Usage Policy

Tailwind is used for **pragmatic reasons** (PrimeBlocks compatibility, PrimeFlex sunset, agent productivity), but its usage is intentionally constrained.

### Allowed Tailwind usage in views

Tailwind classes in views are limited to **high-level structural layout only**:

- Layout:
  - `flex`, `grid`
  - `gap-*`
  - `grid-cols-*`
- Alignment:
  - `items-*`, `justify-*`
- Responsiveness:
  - `sm:*`, `md:*`, `lg:*`, `xl:*`
  - `hidden`, `block` (with breakpoints)
- Sizing (from approved scale only):
  - `w-full`, `min-h-*`, `max-w-*`
- Optional, limited page padding:
  - e.g. `p-3`, `p-4`, `md:p-4` (strictly for outer page spacing)

These classes define **page scaffolding**, not visual identity.

---

### Forbidden Tailwind usage in views

The following must **not** appear in views:

- Colours:
  - `bg-*`, `text-*`, `border-*`
- Typography:
  - `text-sm`, `font-*`, `leading-*`
- Visual styling:
  - `rounded-*`, `shadow-*`, `ring-*`
- Ad-hoc spacing for visual styling:
  - `px-*`, `py-*`, `mt-*`, `mb-*` (outside the limited page padding exception)
- Positioning hacks:
  - `absolute`, negative margins, z-index manipulation (unless inside a block)
- Arbitrary values:
  - `w-[123px]`, `mt-[7px]`, `text-[#123456]`

If a view needs any of the above, the logic belongs in a **Block or Layout Block**, not the view.

---

## Storybook & Chromatic

### Storybook

Storybook serves as:

- Executable documentation of approved primitives, blocks, and layouts
- The reference for both human developers and LLM agents
- A safe environment to explore states (loading, empty, error, dense, edge cases)

Structure recommendation:

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
- Do not introduce new Tailwind styling in views
- If a new pattern is required:
  1. Create or extend a Block
  2. Add it to Storybook
  3. Validate via Chromatic
- Assemble UI from approved patterns rather than inventing new ones

---

## Intent

This architecture is designed to let **LLMs act as force multipliers**, not uncontrolled designers. By clearly separating responsibilities and constraining where styling decisions can be made, development can move fast without creating long-term UI debt.

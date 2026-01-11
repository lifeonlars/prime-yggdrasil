# Prime Yggdrasil — UI Aesthetics & Principles

This document defines the aesthetic and interaction principles that all UI built with **Prime Yggdrasil** must follow.
It is intentionally token-agnostic: **use design tokens, not raw values**.

## Non-negotiables

- **Typography:** Use the system font configuration provided by Prime Yggdrasil (Roboto). Do not introduce additional fonts.
- **Tokens over values:** Do not hardcode colours, spacing, radii, shadows, or typography values. Use semantic tokens.
- **No Tailwind:** Do not use Tailwind or Tailwind-like utility classes. Use **PrimeFlex** utilities and Prime Yggdrasil patterns.
- **Restraint:** Prefer neutral surfaces, clear hierarchy, and functional layout. Avoid decorative styling.

## Visual tone

Prime Yggdrasil UIs should feel:

- clean, calm, and pragmatic
- high-clarity with low ornamentation
- confident, not flashy

Avoid:

- trendy “AI” aesthetics (generic gradients, glossy cards, noisy textures)
- excessive colour accents
- “card soup” (too many bordered containers competing for attention)

## Typography & hierarchy

- Express hierarchy through **size, weight, spacing, and layout** — not decoration.
- Use a small number of purposeful scale steps (e.g., body → section heading → page heading).
- Keep line lengths readable. Use whitespace and grouping to reduce cognitive load.

## Layout & spacing

- Follow a **4px grid** (spacing rhythm must be consistent and token-based).
- Prefer clear grouping: headings + sections + consistent internal spacing.
- Default to simple layouts (Stack/Inline/Grid). Avoid over-nesting containers.

### Default spacing rhythm (guideline)

- Major section separation: “regular” to “relaxed”
- Inside groups: “tight” to “regular”
  (Exact steps are defined by tokens.)

## Surfaces, borders, and elevation

- Prefer neutral surfaces by default.
- Use borders to delineate structure; avoid heavy elevation unless it improves clarity.
- Keep radii restrained and modern; use tokenised radii only.

## Colour & emphasis

- Colour is for **meaning and hierarchy**, not decoration.
- Use **context/semantic colours** only for status (success/warning/danger/info) and feedback.
- Limit brand/accent colour to primary actions or key emphasis.

## Motion & interaction

- Motion should be subtle and purposeful: feedback, state change, continuity.
- Prefer simple opacity/transform transitions.
- Avoid bouncy or attention-grabbing animations.

## Principle checklist (use before shipping)

1. **Purposeful simplicity** — remove anything that doesn’t improve understanding.
2. **Clear progression** — users should know what they can do next.
3. **Consistent patterns** — reuse Prime Yggdrasil components and Blocks.
4. **Visible states** — hover/focus/pressed/loading/disabled are all intentional.
5. **System thinking** — design choices must scale across screens and themes.

## If you're unsure, use the default recipe

- Neutral surface + clear section headers
- One primary action per view
- Tokenised spacing with consistent rhythm
- Tokenised borders for separation, minimal elevation
- Complete state coverage (hover/focus/disabled/loading/empty/error)

---

## Agent integration

**This document is a mandatory reference for all Yggdrasil AI agents.**

Agents must ensure all guidance, validation, and generated code consistently follows these aesthetics.

### Agent responsibilities

**Block Composer** — Suggest compositions that embody purposeful simplicity. Don't over-engineer. Ensure all 5 states specified (default, hover, focus, active, disabled).

**PrimeFlex Guard** — Enforce layout-only PrimeFlex usage. Block design utilities (colors, borders, shadows). Maintain 4px grid discipline.

**Semantic Token Intent** — Ensure state completeness. Validate token pairings work in light/dark modes. Prevent hardcoded values.

**Drift Validator** — Detect violations of architectural rules. Flag custom components that duplicate PrimeReact. Validate token-first approach.

**Interaction Patterns** *(future)* — Enforce state visibility. Standardize empty/loading/error patterns. Specify keyboard + focus behavior. Ensure copy is clear and pragmatic.

**Accessibility** *(future)* — Validate WCAG 2.1 AA compliance. Check contrast ratios. Ensure color is not the only cue. Verify keyboard navigation.

### Quick reference for agents

**Before suggesting UI:**
- Can this use existing PrimeReact components?
- Can this reuse an existing Block?
- Does layout use PrimeFlex (layout/spacing only)?
- Does design use semantic tokens only?
- Are all states defined (5+ minimum)?
- Does it work in both light and dark modes?
- Is keyboard navigation considered?
- Is focus visibility specified?

**Before validating code:**
- Check for hardcoded colors (hex, rgb, named)
- Check for PrimeFlex on PrimeReact components
- Check for PrimeFlex design utilities (bg-*, text-*, rounded-*, shadow-*)
- Check for off-grid spacing (not 4px increments)
- Check for foundation tokens in app code (var(--blue-500))
- Check for custom components duplicating PrimeReact
- Check for missing states (no hover, no focus, no disabled)
- Check for Tailwind classes

**PrimeFlex allowlist (layout & spacing only):**
- Flexbox: `flex`, `flex-column`, `justify-*`, `align-*`
- Grid: `grid`, `col-*`, `gap-*`
- Spacing: `p-*`, `m-*` (4px grid: 0-8)
- Display: `block`, `inline-block`, `hidden`
- Positioning: `relative`, `absolute`, `fixed`, `sticky`

**PrimeFlex forbidden (design):**
- Colors: `bg-*`, `text-[color]-*`, `border-[color]-*`
- Borders: `rounded-*`, `border-*`
- Shadows: `shadow-*` (use semantic tokens instead)
- Typography: `font-*`, `text-[size]-*`

**Critical rule:** NO PrimeFlex on PrimeReact components (exception: `w-full` on form inputs)

### Copy & content tone

Voice: Clear, pragmatic, non-fluffy
- Concise — fewest words possible
- Functional — describe what it does
- Neutral — avoid marketing speak
- Action-oriented — use verbs, be direct

Examples:
- ❌ "Oops! Something went wrong 😅" → ✅ "Unable to save. Try again."
- ❌ "Let's get started!" → ✅ "Create your first project"
- ❌ "You're all set! 🎉" → ✅ "Settings saved"

Button labels: Specific actions ("Save Changes", "Delete Item"), not generic ("OK", "Submit")

### Accessibility requirements

**Minimum: WCAG 2.1 AA**
- Text contrast: 4.5:1 (normal), 3:1 (large ≥18pt)
- Keyboard navigation for all interactive elements
- Visible focus indicators on ALL interactive elements
- Never use color as only cue (add icons, text, patterns)
- Meaningful labels for all form inputs
- ARIA labels for icon-only buttons

**PrimeReact components handle most accessibility patterns — always verify keyboard navigation works.**

---

**Status:** Mandatory reference for all agents
**Last updated:** 2026-01-10

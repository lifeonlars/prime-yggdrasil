# Yggdrasil AI Agents

**Quick Start for AI-Assisted Development**

This folder contains 4 specialized AI agents that guide design system usage and prevent drift.

---

## The 4 Agents

### 1. Block Composer (`block-composer.md`)
**When to use:** Before implementing ANY UI feature

**Job:** Turn "I need X UI" into a composition plan using PrimeReact components and existing Blocks.

**Example prompt:**
```
Read .ai/yggdrasil/block-composer.md

I need to implement a user profile form with:
- Avatar upload
- Name and email inputs
- Save and cancel buttons

What PrimeReact components should I use? What's the composition structure?
```

---

### 2. PrimeFlex Guard (`primeflex-guard.md`)
**When to use:** When using PrimeFlex utility classes for layout

**Job:** Ensure PrimeFlex is used correctly (layout/spacing only, not design).

**Critical Rule:** Never use PrimeFlex classes on PrimeReact components (except `w-full` on inputs).

**Example prompt:**
```
Read .ai/yggdrasil/primeflex-guard.md

Review this layout code and check for PrimeFlex violations:

<div className="flex justify-content-between bg-blue-500 p-4">
  <Button className="mr-2" label="Save" />
</div>

What's wrong and how should I fix it?
```

---

### 3. Semantic Token Intent (`semantic-token-intent.md`)
**When to use:** When styling any UI element (colors, borders, shadows)

**Job:** Select the right semantic tokens for ALL states (default, hover, focus, disabled, error).

**Example prompt:**
```
Read .ai/yggdrasil/semantic-token-intent.md

I need to style a success message banner. What semantic tokens should I use for:
- Background color
- Text color
- Border color
- Icon color

Include all states (default, hover, focus).
```

---

### 4. Drift Validator (`drift-validator.md`)
**When to use:** Before committing code or during code review

**Job:** Validate code against 7 design system policy rules.

**Example prompt:**
```
Read .ai/yggdrasil/drift-validator.md

Review this component for design system violations:

function UserCard() {
  return (
    <div style={{ background: '#f0f0f0', padding: '20px' }}>
      <button style={{ background: '#3B82F6', color: 'white' }}>
        Edit
      </button>
    </div>
  )
}

What violations exist and how should I fix them?
```

---

## Quick Reference

### Agent Selection Guide

| **I need to...** | **Use this agent** |
|------------------|-------------------|
| Plan a new UI feature | Block Composer |
| Layout components with PrimeFlex | PrimeFlex Guard |
| Choose colors/styling | Semantic Token Intent |
| Review code for violations | Drift Validator |

---

## Workflow Example

### Implementing a User List Page

**Step 1: Plan Composition (Block Composer)**
```
Read .ai/yggdrasil/block-composer.md

I need a user list page with:
- Search bar
- Filter dropdown (by role)
- User table (name, email, role, actions)
- Pagination

What PrimeReact components and layout structure should I use?
```

**Step 2: Layout with PrimeFlex (PrimeFlex Guard)**
```
Read .ai/yggdrasil/primeflex-guard.md

I'm creating a filter bar with search input and dropdown.
What PrimeFlex classes can I use for layout?
```

**Step 3: Style with Tokens (Semantic Token Intent)**
```
Read .ai/yggdrasil/semantic-token-intent.md

What semantic tokens should I use for:
- Table header background
- Row hover state
- Delete button (danger action)
```

**Step 4: Validate (Drift Validator)**
```
Read .ai/yggdrasil/drift-validator.md

Review my UserList component for design system violations.
[paste code]
```

---

## Key Rules to Remember

### ✅ DO

- **Use PrimeReact components** - Don't create custom components
- **Use PrimeFlex for layout only** - `flex`, `grid`, `p-*`, `m-*`, `gap-*`
- **Use semantic tokens for design** - `var(--text-neutral-default)`, etc.
- **Handle all 5 states** - default, loading, empty, error, disabled
- **Check for existing Blocks** - Reuse before creating new

### ❌ DON'T

- **Don't use PrimeFlex on PrimeReact components** (except `w-full` on inputs)
- **Don't use PrimeFlex for colors/borders/shadows** - Use semantic tokens
- **Don't use Tailwind classes** - This project uses PrimeFlex
- **Don't hardcode colors** - `#333`, `rgb()`, etc. are forbidden
- **Don't create custom buttons/inputs** - Use PrimeReact components

---

## PrimeFlex Allowlist (Quick Reference)

**✅ Allowed (Layout & Spacing):**
- `flex`, `flex-column`, `justify-*`, `align-*`
- `grid`, `col-*`, `gap-*`
- `p-*`, `m-*` (4px grid: 0, 1, 2, 3, 4, 5, 6, 7, 8)
- `block`, `inline-block`, `hidden`
- `relative`, `absolute`, `fixed`, `sticky`
- `w-full`, `h-full`, `w-screen`, `h-screen`

**❌ Forbidden (Design):**
- `bg-*`, `text-[color]-*`, `border-[color]-*`
- `rounded-*`, `shadow-*`, `font-*`
- Any Tailwind-specific classes (`space-*`, `ring-*`, etc.)

Full policy: See `PRIMEFLEX-POLICY.md`

---

## Semantic Token Categories

**Surface (Backgrounds):**
- `--surface-neutral-primary` - Main background
- `--surface-brand-primary` - Brand color (buttons)
- `--surface-context-success/warning/danger/info` - Semantic states

**Text:**
- `--text-neutral-default` - Body text
- `--text-neutral-subdued` - Secondary text
- `--text-state-interactive` - Links, interactive elements
- `--text-onsurface-onbrand` - Text on brand backgrounds

**Borders:**
- `--border-neutral-default` - Standard borders
- `--border-state-focus` - Focus rings
- `--border-context-danger/success` - Semantic borders

**Spacing (4px grid):**
- `0.5rem` (8px), `1rem` (16px), `1.5rem` (24px), `2rem` (32px)

Full token catalog: See `semantic-token-intent.md`

---

## Common Violations

### Violation 1: PrimeFlex on Components
```tsx
❌ <Button className="bg-blue-500 p-4" label="Save" />
✅ <Button label="Save" />  {/* Theme handles styling */}
```

### Violation 2: Hardcoded Colors
```tsx
❌ <div style={{ color: '#333', background: '#f0f0f0' }}>
✅ <div style={{
     color: 'var(--text-neutral-default)',
     background: 'var(--surface-neutral-secondary)'
   }}>
```

### Violation 3: Custom Components
```tsx
❌ const CustomButton = ({ label }) => (
     <button style={{ background: 'blue', color: 'white' }}>
       {label}
     </button>
   )

✅ import { Button } from 'primereact/button'
   <Button label="Click me" />
```

### Violation 4: Tailwind Classes
```tsx
❌ <div className="space-x-4 ring-2 rounded-lg">
✅ <div className="flex gap-3" style={{
     borderRadius: 'var(--radius-md)',
     outline: `2px solid var(--border-state-focus)`
   }}>
```

---

## Integration with AI Tools

### Claude Code
Add to your prompts:
```
Read the Yggdrasil agents in .ai/yggdrasil/ before implementing UI.
Use Block Composer for planning, PrimeFlex Guard for layout,
Semantic Token Intent for styling, and Drift Validator for review.
```

### Cursor
Add `.ai/yggdrasil/` to composer context, then:
```
@Workspace Help me implement a product card following the Yggdrasil
Block Composer agent guidelines.
```

### GitHub Copilot
Reference in comments:
```tsx
// Following .ai/yggdrasil/block-composer.md
// Using PrimeReact DataTable for user list
```

---

## Enforcement

This design system is enforced through:

1. **Agents (Phase 1)** - Preventive guidance during development
2. **ESLint Plugin (Phase 3)** - Code-time detection in IDE
3. **CLI Validation (Phase 4)** - Pre-commit and CI/CD checks

**Current Status:** Phase 1 complete (agents available)
**Next:** Phase 3 (ESLint plugin) and Phase 4 (CLI validation)

---

## Support

- **Documentation:** [Prime Yggdrasil README](https://github.com/lifeonlars/prime-yggdrasil)
- **PrimeReact Docs:** https://primereact.org/
- **PrimeFlex Docs:** https://primeflex.org/
- **Issues:** https://github.com/lifeonlars/prime-yggdrasil/issues

---

**Remember:** The agents are here to guide, not restrict. They help you build consistent, accessible UIs faster by preventing common mistakes before they happen.

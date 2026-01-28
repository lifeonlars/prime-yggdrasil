# Yggdrasil AI Agents

**Quick Start for AI-Assisted Development**

This folder contains specialized AI agents that guide design system usage and prevent drift.

---

## MANDATORY WORKFLOW (NEVER SKIP)

These rules are NON-NEGOTIABLE. Violating any makes the work invalid.

### W1: Verify before claiming completion
Before saying "done", "fixed", "working", or "complete":
1. Run the build command and confirm it passes
2. Run `npm run yggdrasil:validate` and fix any violations
3. Visually verify UI changes render correctly
4. ONLY THEN make the claim

Never say "should work" or "likely fixed" — run it and prove it.

### W2: Run validation before commits
Before committing code that touches UI:
```bash
npm run yggdrasil:validate   # Check for design system violations
npm run yggdrasil:audit      # Get detailed fix suggestions
```

### W3: Visual verification for UI changes
Any change to a component that affects visible output requires:
1. Run the app or Storybook
2. Navigate to the affected component
3. Verify the visual result matches expectations
4. Check all states: default, loading, empty, error, disabled

Without visual verification, UI work is NOT complete.

### W4: Use agents BEFORE implementing
1. **Planning UI** → Read `block-composer.md` first
2. **Styling choices** → Read `semantic-token-intent.md` first
3. **Before commit** → Run Drift Validator checks

---

## The Agents

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

### 2. Semantic Token Intent (`semantic-token-intent.md`)
**When to use:** When styling any UI element (colors, borders, shadows, spacing)

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

### 3. Drift Validator (`drift-validator.md`)
**When to use:** Before committing code or during code review

**Job:** Validate code against design system policy rules.

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
| Choose colors/styling/spacing | Semantic Token Intent |
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

**Step 2: Style with Tokens (Semantic Token Intent)**
```
Read .ai/yggdrasil/semantic-token-intent.md

What semantic tokens should I use for:
- Table header background
- Row hover state
- Delete button (danger action)
- Layout spacing
```

**Step 3: Validate (Drift Validator)**
```
Read .ai/yggdrasil/drift-validator.md

Review my UserList component for design system violations.
[paste code]
```

---

## Key Rules to Remember

### DO

- **Use PrimeReact components** - Don't create custom components
- **Use semantic tokens for ALL styling** - colors, borders, shadows, spacing
- **Use CSS flexbox/grid for layout** - with `style` prop or CSS classes
- **Handle all 5 states** - default, loading, empty, error, disabled
- **Check for existing Blocks** - Reuse before creating new

### DON'T

- **Don't hardcode colors** - `#333`, `rgb()`, etc. are forbidden
- **Don't hardcode spacing** - Use `var(--spacing-*)` tokens
- **Don't create custom buttons/inputs** - Use PrimeReact components
- **Don't use Tailwind classes** - Use semantic tokens instead

---

## Layout Utilities

Use standard CSS flexbox and grid with semantic tokens for spacing:

```tsx
// Flexbox layout with semantic spacing
<div style={{
  display: 'flex',
  gap: 'var(--spacing-4)',
  padding: 'var(--spacing-4)',
  alignItems: 'center'
}}>
  <Button label="Save" />
  <Button label="Cancel" severity="secondary" />
</div>

// Grid layout
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'var(--spacing-4)'
}}>
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Spacing Scale (4px grid)

| Token | Value |
|-------|-------|
| `--spacing-1` | 4px |
| `--spacing-2` | 8px |
| `--spacing-3` | 12px |
| `--spacing-4` | 16px |
| `--spacing-5` | 20px |
| `--spacing-6` | 24px |
| `--spacing-8` | 32px |

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

**Spacing:**
- `--spacing-1` through `--spacing-8` (4px grid)

Full token catalog: See `semantic-token-intent.md`

---

## Common Violations

### Violation 1: Hardcoded Colors
```tsx
// Bad
<div style={{ color: '#333', background: '#f0f0f0' }}>

// Good
<div style={{
  color: 'var(--text-neutral-default)',
  background: 'var(--surface-neutral-secondary)'
}}>
```

### Violation 2: Hardcoded Spacing
```tsx
// Bad
<div style={{ padding: '16px', gap: '8px' }}>

// Good
<div style={{
  padding: 'var(--spacing-4)',
  gap: 'var(--spacing-2)'
}}>
```

### Violation 3: Custom Components
```tsx
// Bad
const CustomButton = ({ label }) => (
  <button style={{ background: 'blue', color: 'white' }}>
    {label}
  </button>
)

// Good
import { Button } from 'primereact/button'
<Button label="Click me" />
```

---

## Integration with AI Tools

### Claude Code
Add to your prompts:
```
Read the Yggdrasil agents in .ai/yggdrasil/ before implementing UI.
Use Block Composer for planning, Semantic Token Intent for styling,
and Drift Validator for review.
```

### Cursor
Add `.ai/yggdrasil/` to composer context, then:
```
@Workspace Help me implement a product card following the Yggdrasil
Block Composer agent guidelines.
```

---

## Enforcement

This design system is enforced through:

1. **Agents** - Preventive guidance during development
2. **ESLint Plugin** - Code-time detection in IDE
3. **CLI Validation** - Pre-commit and CI/CD checks

---

## Support

- **Documentation:** [Prime Yggdrasil README](https://github.com/lifeonlars/prime-yggdrasil)
- **PrimeReact Docs:** https://primereact.org/
- **Issues:** https://github.com/lifeonlars/prime-yggdrasil/issues

---

**Remember:** The agents are here to guide, not restrict. They help you build consistent, accessible UIs faster by preventing common mistakes before they happen.

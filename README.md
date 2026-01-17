# Yggdrasil Design System

> **AI-agent-friendly PrimeReact design system for component-driven development**

A comprehensive design system built on [PrimeReact](https://primereact.org/) that enforces consistency through semantic tokens, prevents bespoke component creation, and guides AI agents to use existing patterns.

[![npm version](https://img.shields.io/npm/v/@lifeonlars/prime-yggdrasil)](https://www.npmjs.com/package/@lifeonlars/prime-yggdrasil)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why Yggdrasil?

**Problem**: AI agents often create custom components and hardcode styles, leading to inconsistent UIs and maintenance nightmares.

**Solution**: Yggdrasil provides guardrails that enforce component reuse and token-based styling through semantic tokens, AI agents, and validation tooling.

---

## Quick Start

### 1. Install

```bash
npm install @lifeonlars/prime-yggdrasil primereact

# Optional: PrimeIcons (for icon font support)
npm install primeicons
```

### 2. Initialize AI Agents (Recommended)

```bash
npx @lifeonlars/prime-yggdrasil init
```

This copies 6 specialized AI agents to your project's `.ai/yggdrasil/` directory, enabling design system compliance.

### 3. Import Theme

```tsx
// src/main.tsx or src/App.tsx
import '@lifeonlars/prime-yggdrasil/theme.css';
import 'primeicons/primeicons.css'; // Optional

// Set theme on html element
document.documentElement.setAttribute('data-theme', 'light'); // or 'dark'
```

### 4. Use Components

```tsx
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';

function App() {
  return (
    <div style={{ color: 'var(--text-neutral-default)' }}>
      <Button label="Click me" />
    </div>
  );
}
```

---

## What's Included

| Feature | Description |
|---------|-------------|
| **Semantic Token System** | 727+ tokens with automatic light/dark mode |
| **PrimeReact Integration** | 69 themed components ready to use |
| **6 AI Agents** | Prevent drift, guide composition, enforce compliance |
| **CLI Validation** | `yggdrasil audit` and `yggdrasil validate` commands |
| **4px Grid System** | Consistent spacing across all components |
| **WCAG 3.0 Compliant** | APCA contrast tested for accessibility |

---

## Documentation

### For Developers
- [Consumption Guide](./docs/CONSUMPTION-GUIDE.md) - Integration and setup
- [Utilities Policy](./docs/UTILITIES-POLICY.md) - Allowed utility classes
- [FAQ & Troubleshooting](./docs/FAQ-TROUBLESHOOTING.md) - Common issues

### For AI Agents
- [AI Agent Guide](./docs/AI-AGENT-GUIDE.md) - Complete AI integration guide
- [Decision Matrix](./docs/DECISION-MATRIX.md) - Component selection for common scenarios
- [Anti-Patterns](./docs/ANTI-PATTERNS.md) - What NOT to do

### Reference
- [Master Token Reference](./docs/MASTER-TOKEN-REFERENCE.md) - All semantic tokens
- [Component Inventory](./docs/COMPONENT-INVENTORY.md) - Use-case to component mapping
- [Aesthetics](./docs/AESTHETICS.md) - Design principles

---

## AI Agents

Yggdrasil includes **6 specialized agents** that prevent drift and enforce design system compliance:

| Agent | Purpose |
|-------|---------|
| **Block Composer** | Prevents bespoke components, suggests PrimeReact alternatives |
| **Utilities Guard** | Enforces utilities for layout only (not design) |
| **Semantic Token Intent** | Ensures correct token usage for all states |
| **Drift Validator** | Catches violations via CLI and ESLint |
| **Interaction Patterns** | Validates loading/error/empty state handling |
| **Accessibility** | Enforces WCAG 2.1 AA compliance |

### Validate Your Code

```bash
# Report violations
npx @lifeonlars/prime-yggdrasil validate

# Detailed audit with recommendations
npx @lifeonlars/prime-yggdrasil audit

# Auto-fix safe violations
npx @lifeonlars/prime-yggdrasil audit --fix
```

For detailed agent documentation, see [.ai/agents/](./ai/agents/).

---

## Design Tokens

### Common Tokens

```css
/* Text */
--text-neutral-default       /* Main body text */
--text-neutral-subdued       /* Secondary text */
--text-state-interactive     /* Links, interactive elements */

/* Surfaces */
--surface-neutral-primary    /* Main backgrounds */
--surface-neutral-secondary  /* Secondary backgrounds */
--surface-brand-primary      /* Brand color */

/* Borders */
--border-neutral-default     /* Standard borders */
--border-state-focus         /* Focus rings */

/* Spacing (4px grid) */
0.5rem (8px), 1rem (16px), 1.5rem (24px), 2rem (32px)

/* Border Radius */
--radius-sm (4px), --radius-md (8px), --radius-lg (12px)
```

For all 727+ tokens, see [Master Token Reference](./docs/MASTER-TOKEN-REFERENCE.md).

---

## Component Usage

### Correct (Use PrimeReact)
```tsx
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

<Button label="Save" />
<DataTable value={data} />
```

### Incorrect (Don't Create Custom)
```tsx
// Don't do this!
const CustomButton = ({ children }) => (
  <button style={{ background: '#3B82F6' }}>{children}</button>
);
```

See [Anti-Patterns](./docs/ANTI-PATTERNS.md) for more examples of what to avoid.

---

## Architecture

```
@lifeonlars/prime-yggdrasil/
├── dist/                    # Built CSS and JS
│   ├── theme.css            # Single theme (light + dark)
│   ├── components/          # Category-specific CSS
│   └── index.js             # JS utilities + Icon component
│
├── docs/                    # Comprehensive documentation
│   ├── AI-AGENT-GUIDE.md
│   ├── CONSUMPTION-GUIDE.md
│   └── ...
│
├── cli/                     # Validation tools
│   ├── yggdrasil validate
│   └── yggdrasil audit
│
└── .ai/agents/              # 6 specialized AI agents
```

---

## Development

For contributors working on Yggdrasil itself:

### Prerequisites
- Node.js 18+
- npm or pnpm

### Local Development

```bash
npm install          # Install dependencies
npm run dev          # Start Storybook
npm test             # Run tests
npm run build        # Build library
```

### Scripts

```bash
npm run storybook       # Start Storybook dev server
npm run build           # Build library package
npm run test:contrast   # Test color contrast (APCA)
npm run test:themes     # Validate theme structure
npm run lint            # Lint TypeScript/JavaScript
npm run lint:css        # Lint CSS files
```

### Testing

- **Play functions** - Interactive tests in Storybook
- **Accessibility tests** - `@storybook/addon-a11y` integration
- **Visual regression** - Chromatic integration

---

## Contributing

We welcome contributions! Please:

1. Follow existing semantic token patterns
2. Test in both light and dark modes
3. Run contrast tests for new colors
4. Update documentation
5. Add Storybook examples

---

## License

MIT © Lars Farstad

## Credits

Built with:
- [PrimeReact](https://primereact.org/) - Component library
- [PrimeIcons](https://primereact.org/icons) - Icon set
- [Storybook](https://storybook.js.org/) - Component documentation

---

**Made for AI agents, loved by developers**

# Yggdrasil Design System

> **AI-agent-friendly PrimeReact design system for component-driven development**

A comprehensive design system built on [PrimeReact](https://primereact.org/) that enforces consistency through semantic tokens, prevents bespoke component creation, and guides AI agents to use existing patterns.

[![npm version](https://img.shields.io/npm/v/@lifeonlars/prime-yggdrasil)](https://www.npmjs.com/package/@lifeonlars/prime-yggdrasil)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Storybook](https://img.shields.io/badge/Storybook-Live-ff4785?logo=storybook)](https://lifeonlars.github.io/prime-yggdrasil/)

**[📚 View Live Storybook →](https://lifeonlars.github.io/prime-yggdrasil/)**

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

For custom SVG icons, see [section 5](#5-svg-icons-optional).

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

### 5. SVG Icons (Optional)

Yggdrasil supports custom SVG icons without requiring PrimeIcons. Create a `public/icons/` directory and add your SVG files:

```tsx
import { Icon } from '@lifeonlars/prime-yggdrasil';

// Option A: PrimeIcons (requires primeicons package)
<Icon name="pi pi-check" size="medium" />

// Option B: Custom SVG icons (place in public/icons/)
<Icon name="my-icon" size="large" />  // loads public/icons/my-icon.svg
```

For full icon documentation including sizing and colors, see [Consumption Guide - Icon System](./docs/CONSUMPTION-GUIDE.md#-icon-system).

---

## What's Included

| Feature                    | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| **Semantic Token System**  | 336 design tokens with automatic light/dark mode     |
| **PrimeReact Integration** | 69 themed components ready to use                    |
| **6 AI Agents**            | Prevent drift, guide composition, enforce compliance |
| **CLI Validation**         | `yggdrasil audit` and `yggdrasil validate` commands  |
| **4px Grid System**        | Consistent spacing across all components             |
| **WCAG 3.0 Compliant**     | APCA contrast tested for accessibility               |

---

## Charts Package

For data visualization, install the companion charts package:

```bash
npm install @lifeonlars/prime-yggdrasil-charts highcharts
```

The charts package provides Highcharts-based visualizations that automatically use Yggdrasil's design tokens:

| Chart Type       | Description                              |
| ---------------- | ---------------------------------------- |
| **TimeSeriesLine** | Line/spline charts with date X-axis    |
| **Column**         | Vertical bar charts                    |
| **Bar**            | Horizontal bar charts                  |
| **StackedColumn**  | Stacked vertical bars                  |
| **Donut**          | Pie chart with center hole             |

```tsx
import { TimeSeriesLine, getSentimentPalette } from '@lifeonlars/prime-yggdrasil-charts';

const sentiment = getSentimentPalette();
// sentiment.positive = '#AAECBC', sentiment.neutral = '#F2DE6E', sentiment.negative = '#F4B6B6'

<TimeSeriesLine
  data={data}
  encoding={{ x: 'date', y: 'mentions' }}
  title="Media Mentions"
  format={{ compact: true }}
/>
```

See [@lifeonlars/prime-yggdrasil-charts](https://www.npmjs.com/package/@lifeonlars/prime-yggdrasil-charts) for full documentation.

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
- [Component Index](./docs/components/INDEX.md) - Use-case to component mapping
- [Aesthetics](./docs/AESTHETICS.md) - Design principles

---

## AI Agents

Yggdrasil includes **6 specialized agents** that prevent drift and enforce design system compliance:

| Agent                     | Purpose                                                       |
| ------------------------- | ------------------------------------------------------------- |
| **Block Composer**        | Prevents bespoke components, suggests PrimeReact alternatives |
| **Utilities Guard**       | Enforces utilities for layout only (not design)               |
| **Semantic Token Intent** | Ensures correct token usage for all states                    |
| **Drift Validator**       | Catches violations via CLI and ESLint                         |
| **Interaction Patterns**  | Validates loading/error/empty state handling                  |
| **Accessibility**         | Enforces WCAG 2.1 AA compliance                               |

### Validate Your Code

```bash
# Report violations
npx @lifeonlars/prime-yggdrasil validate

# Detailed audit with recommendations
npx @lifeonlars/prime-yggdrasil audit

# Auto-fix safe violations
npx @lifeonlars/prime-yggdrasil audit --fix
```

For detailed agent documentation, see [.ai/agents/](./.ai/agents/).

---

## Claude Code Integration

This package includes **Claude Code skills** for enhanced development workflows with automatic verification.

### Automatic Setup

Skills are automatically installed when you run:

```bash
npm install @lifeonlars/prime-yggdrasil
```

This configures Claude Code with:

- **verification-before-completion** - Enforces evidence-based completion (build/lint output)
- **frontend-design** - Design system consistency checks
- **vercel-react-best-practices** - React performance best practices
- **agent-browser** - Automated UI verification and screenshot capture

### Task Management

Claude Code uses a task management system to enforce verification workflows.

Press **Ctrl+T** in Claude Code to view your task list and completion status.

### Development Workflow

When working with Claude Code, all tasks follow a verification workflow:

1. Implementation task created
2. Verification subtasks created (build, lint, visual)
3. Verification tasks must pass BEFORE marking implementation complete
4. Evidence required (command output, screenshots)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the complete development workflow and definition of done.

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

For all 336 tokens, see [Master Token Reference](./docs/MASTER-TOKEN-REFERENCE.md).

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

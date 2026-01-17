# 🌳 Yggdrasil Design System

> **AI-agent-friendly PrimeReact design system for component-driven development**

Yggdrasil is a comprehensive design system built on [PrimeReact](https://primereact.org/) that enforces consistency through semantic tokens, prevents bespoke component creation, and guides AI agents to use existing patterns.

[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://your-storybook-url.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Purpose

**Problem**: AI agents often create custom components and hardcode styles, leading to inconsistent UIs and maintenance nightmares.

**Solution**: Yggdrasil enforces component reuse and token-based styling through:
- 📚 Comprehensive semantic token system (727+ tokens)
- 🧩 PrimeReact component library integration
- 🌓 Automatic light/dark mode support
- 📏 4px grid system for consistent spacing
- 🤖 AI-agent-specific documentation and guardrails

## ✨ Features

- **🎨 Semantic Token System** - 96% of styles use semantic tokens instead of hardcoded values
- **🌗 Dark Mode Built-in** - Automatic theme switching with optimized dark mode shadows
- **📦 Modular Architecture** - Split into 10 category files for easy maintenance
- **🧩 Component-First** - Encourages PrimeReact usage over custom components
- **🎯 Flexible Icon System** - Use PrimeIcons, custom SVGs, or both (PrimeIcons optional)
- **📐 4px Grid System** - Consistent spacing and sizing across all components
- **♿ WCAG 3.0 Compliant** - APCA contrast tested for accessibility
- **📖 Storybook Integration** - Live component examples and documentation
- **🤖 AI Agent Guides** - Purpose-built documentation for AI-driven development

## 🚀 Quick Start

### Installation

```bash
npm install @lifeonlars/prime-yggdrasil primereact

# Optional: PrimeIcons (for icon font support)
npm install primeicons
```

### Usage

```tsx
// Import theme
import '@lifeonlars/prime-yggdrasil/theme.css';
import 'primeicons/primeicons.css';

// Set theme on html element
document.documentElement.setAttribute('data-theme', 'light'); // or 'dark'

// Use PrimeReact components
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

function App() {
  return (
    <div style={{ color: 'var(--text-neutral-default)' }}>
      <Button label="Click me" />
    </div>
  );
}
```

## 📚 Documentation

### For Developers
- **[Getting Started](./docs/README.md)** - Overview and project structure
- **[Theme Architecture](./src/theme/README.md)** - How the theme system works
- **[Consumption Guide](./docs/CONSUMPTION-GUIDE.md)** - How to use in your project

### For AI Agents
- **[AI Agent Guide](./docs/AI-AGENT-GUIDE.md)** - Complete guide for AI-driven development
- **[Component Selection](./docs/AI-AGENT-GUIDE.md#component-selection-guide)** - Decision tree for choosing components
- **[Token Reference](./docs/AI-AGENT-GUIDE.md#quick-reference-for-common-tasks)** - Quick semantic token lookup

### For Designers
- **[Design Principles](./docs/README.md#design-principles)** - 4px grid, semantic tokens
- **[Elevation System](./docs/ELEVATION-SYSTEM.md)** - Shadow hierarchy and usage
- **[Contrast Report](./docs/contrast-report.md)** - Accessibility validation

## 🎨 Design Tokens

### Colors
```css
/* Text */
--text-neutral-default       /* Main body text */
--text-neutral-subdued       /* Secondary text */
--text-state-interactive     /* Links, interactive elements */
--text-onsurface-onbrand     /* Text on colored backgrounds */

/* Surfaces */
--surface-neutral-primary    /* Main backgrounds */
--surface-neutral-secondary  /* Secondary backgrounds */
--surface-brand-primary      /* Brand blue */
--surface-state-hover        /* Hover states */

/* Borders */
--border-neutral-default     /* Standard borders */
--border-state-interactive   /* Interactive borders */
--border-state-focus         /* Focus rings */
```

### Spacing (4px Grid)
```css
0.5rem  /*  8px */
1rem    /* 16px */
1.5rem  /* 24px */
2rem    /* 32px */
```

### Border Radius
```css
--radius-sm   /* 4px - Subtle */
--radius-md   /* 8px - Standard */
--radius-lg   /* 12px - Cards */
--radius-full /* Pills, avatars */
```

## 🧩 Component Usage

### ✅ Correct (Use PrimeReact)
```tsx
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Icon } from '@lifeonlars/prime-yggdrasil';

<Button label="Save" />
<DataTable value={data} />
<InputText placeholder="Enter text" />
<Icon name="pi pi-check" size="medium" />
```

### Icons
```tsx
// PrimeIcons (requires primeicons package)
import { Icon } from '@lifeonlars/prime-yggdrasil';
<Icon name="pi pi-check" size="medium" />

// Custom SVG icons (from public/icons/)
<Icon name="my-icon" size="large" />
```

### ❌ Incorrect (Don't Create Custom)
```tsx
// Don't do this!
const CustomButton = ({ children }) => (
  <button style={{ background: '#3B82F6', color: 'white' }}>
    {children}
  </button>
);
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or pnpm

### Local Development
```bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Run tests
npm test

# Build library
npm run build
```

### Scripts
```bash
npm run storybook          # Start Storybook development server
npm run build              # Build library package
npm run build-storybook    # Build static Storybook for deployment
npm run test:contrast      # Test color contrast (APCA)
npm run test:themes        # Validate theme structure
npm run lint               # Lint TypeScript/JavaScript
npm run lint:css           # Lint CSS files
npm run chromatic          # Run visual regression tests
```

### Testing

**Storybook Built-in Testing:**
- **Play functions** - Interactive tests run automatically when viewing stories
- **Accessibility tests** - `@storybook/addon-a11y` checks components for a11y violations
- **Visual regression** - Chromatic integration for catching visual changes

**CI/CD Pipeline:**
- GitHub Actions runs on every push/PR
- Validates linting, builds, and accessibility
- Chromatic visual regression testing (on push to main/master)
- See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for details

## 📊 Project Stats

- **Semantic Tokens**: 727 color replacements (96% coverage)
- **Components**: 69 PrimeReact components themed
- **Files**: 10 modular CSS category files
- **Contrast**: WCAG 3.0 (APCA) validated
- **Dark Mode**: Optimized shadows with white rim strategy

## 🤖 AI Agent Infrastructure

Yggdrasil includes **6 specialized AI agents** that prevent drift, guide composition, and enforce design system compliance.

### 🚀 Quick Start: Initialize Agents

```bash
npx @lifeonlars/prime-yggdrasil init
```

This copies all 6 active agents to your project's `.ai/yggdrasil/` directory.

### 📋 The 6 Agents

#### Active Agents (All 6 Complete - Phase 6 ✅)

1. **Block Composer** - Composition-first UI planning
   - Prevents bespoke component creation
   - Suggests PrimeReact components + existing Blocks
   - Specifies all 5+ states (default, hover, focus, active, disabled)

2. **Utilities Guard** - Layout constraint enforcement
   - Allows utilities for layout/spacing ONLY (not design)
   - Critical rule: NO utilities on PrimeReact components (except `w-full` on inputs)
   - Maintains 4px grid discipline

3. **Semantic Token Intent** - State-complete token selection
   - Ensures all states defined (default, hover, focus, active, disabled)
   - Validates token pairings work in light/dark modes
   - Prevents hardcoded colors and foundation tokens in app code

4. **Drift Validator** - Comprehensive policy enforcement
   - 7 core rules (no hardcoded colors, no PrimeFlex on components, etc.)
   - ESLint plugin + CLI validation
   - Autofix capability for safe violations

5. **Interaction Patterns** - Behavioral consistency *(Phase 6 - NEW ✨)*
   - Enforces state completeness (loading/error/empty/disabled)
   - Detects generic copy (button labels, messages)
   - Validates focus management (Dialog/Modal patterns)
   - Ensures keyboard navigation works correctly

6. **Accessibility** - WCAG 2.1 AA compliance *(Phase 6 - NEW ✨)*
   - Validates alt text on images and icon-only buttons
   - Enforces proper form label associations (htmlFor/id)
   - Checks contrast ratios for text/surface combinations
   - Ensures color is not the only cue (icons, text, patterns)

### 🛠️ Agent Tools

**ESLint Plugin** (Phase 3)
```bash
npm install --save-dev @lifeonlars/eslint-plugin-yggdrasil
```

```js
// eslint.config.js
import yggdrasil from '@lifeonlars/eslint-plugin-yggdrasil';

export default [
  {
    plugins: { '@lifeonlars/yggdrasil': yggdrasil },
    rules: yggdrasil.configs.recommended.rules  // Warnings for adoption
    // Or: yggdrasil.configs.strict.rules      // Errors for enforcement
  }
];
```

**CLI Validation** (Phase 4)
```bash
# Report-only validation
npx @lifeonlars/prime-yggdrasil validate

# Detailed audit with recommendations
npx @lifeonlars/prime-yggdrasil audit

# Apply automatic fixes
npx @lifeonlars/prime-yggdrasil audit --fix

# JSON output for CI/CD
npx @lifeonlars/prime-yggdrasil validate --format json
```

### 📖 Agent Documentation

**For Consumers:**
- [`.ai/yggdrasil/README.md`](./.ai/agents/README.md) - Quick start guide (copied to your project)
- [`docs/AESTHETICS.md`](./docs/AESTHETICS.md) - Mandatory aesthetic principles reference
- [`docs/UTILITIES-POLICY.md`](./docs/UTILITIES-POLICY.md) - Complete utilities allowlist and policy

**For Agent Developers:**
- [`.ai/agents/block-composer.md`](./.ai/agents/block-composer.md) - Composition planning
- [`.ai/agents/utilities-guard.md`](./.ai/agents/utilities-guard.md) - Layout constraints
- [`.ai/agents/semantic-token-intent.md`](./.ai/agents/semantic-token-intent.md) - Token selection
- [`.ai/agents/drift-validator.md`](./.ai/agents/drift-validator.md) - Policy enforcement
- [`.ai/agents/interaction-patterns.md`](./.ai/agents/interaction-patterns.md) - Behavioral patterns
- [`.ai/agents/accessibility.md`](./.ai/agents/accessibility.md) - WCAG compliance

### 🎯 Agent Workflow Example

**Implementing a User Profile Form:**

1. **Block Composer** - "Use `<Card>` + `<InputText>` + `<Button>`. Specify loading/empty/error states."
2. **Utilities Guard** - "Use `flex flex-column gap-3 p-4` for layout. NO arbitrary colors or design utilities."
3. **Semantic Token Intent** - "Use `var(--surface-neutral-primary)` for card, `var(--text-neutral-default)` for labels."
4. **Drift Validator** - "✅ No violations. All rules passing."

### 🔧 Dual Enforcement Strategy

**Prevention (Agents guide before code is written)**
- Block Composer prevents bespoke UI
- Utilities Guard prevents utility chaos
- Semantic Token Intent prevents styling violations

**Detection (ESLint + CLI catch violations after)**
- ESLint: Code-time detection in IDE (fast feedback)
- CLI: Runtime validation with deeper analysis (pre-commit, CI/CD)

### 🚀 Migration Path

1. **Week 1**: Install update, run `npx @lifeonlars/prime-yggdrasil init`
2. **Week 2**: Read agent documentation in `.ai/yggdrasil/`
3. **Week 3**: Install ESLint plugin (`recommended` config - warnings only)
4. **Week 4**: Run `yggdrasil audit` on existing code, apply fixes incrementally
5. **Week 5+**: Switch to ESLint `strict` config (errors) for new code

### 📊 Enforcement Stats

- **12 CLI Validation Rules** - 7 core + 5 Phase 6 (Interaction Patterns + Accessibility)
- **6 Active Agents** - All agents operational (Phase 6 complete ✅)
- **Autofix Support** - State completeness, alt text, form labels, focus management
- **WCAG 2.1 AA** - Automated accessibility validation

### Example AI Prompt (with Agents)

```
I'm building a React app with Yggdrasil design system.

Before implementing UI:
1. Read: .ai/yggdrasil/block-composer.md
2. Read: docs/AESTHETICS.md (mandatory reference)
3. Check: Is there a PrimeReact component for this?
4. Use: Semantic tokens only (no hardcoded colors)
5. Follow: 4px grid for all spacing
6. Validate: Run `yggdrasil audit` before committing

Create a user profile form with name, email, and submit button.
```

## 🏗️ Architecture

```
Yggdrasil
├── Foundations (foundations.css)
│   └── Raw color palette (Sky, Sea, Forest, etc.)
│
├── Border Radius (radius.css)
│   └── Semantic radius tokens (sm, md, lg)
│
├── Semantic Tokens (semantic-light/dark.css)
│   ├── Surfaces (backgrounds)
│   ├── Text (typography colors)
│   ├── Borders (borders, focus rings)
│   ├── Icons (icon colors)
│   └── Elevation (shadows)
│
└── Components (components/*.css)
    ├── button.css (buttons, splitbutton)
    ├── data.css (tables, trees, pagination)
    ├── form.css (inputs, dropdowns, checkboxes)
    ├── menu.css (navigation components)
    └── ... (6 more category files)
```

## 📦 Package Contents

When you install Yggdrasil, you get:

```
@lifeonlars/prime-yggdrasil/
├── dist/
│   ├── theme.css               # Single theme file (light + dark)
│   ├── index.js                # Optional JS utilities
│   └── index.d.ts              # TypeScript definitions
│
└── docs/
    ├── AI-AGENT-GUIDE.md       # For AI agents
    ├── CONSUMPTION-GUIDE.md    # Integration guide
    ├── ELEVATION-SYSTEM.md     # Shadow system
    └── contrast-report.md      # Accessibility report
```

## 🤝 Contributing

We welcome contributions! Please:

1. Follow existing semantic token patterns
2. Test in both light and dark modes
3. Run contrast tests for new colors
4. Update documentation
5. Add Storybook examples

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT © Lars Farstad

## 🙏 Credits

Built with:
- [PrimeReact](https://primereact.org/) - Component library
- [PrimeIcons](https://primereact.org/icons) - Icon set
- [Storybook](https://storybook.js.org/) - Component documentation
- [APCA](https://github.com/Myndex/apca-w3) - Contrast testing

## 📞 Support

- 📖 [Documentation](./docs/README.md)
- 🐛 [Issue Tracker](https://github.com/lifeonlars/prime-yggdrasil/issues)
- 💬 [Discussions](https://github.com/lifeonlars/prime-yggdrasil/discussions)
- 🎨 [Storybook](https://your-storybook-url.com)

---

**Made for AI agents, loved by developers** 🤖❤️👨‍💻

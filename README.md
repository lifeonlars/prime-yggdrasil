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
- **📐 4px Grid System** - Consistent spacing and sizing across all components
- **♿ WCAG 3.0 Compliant** - APCA contrast tested for accessibility
- **📖 Storybook Integration** - Live component examples and documentation
- **🤖 AI Agent Guides** - Purpose-built documentation for AI-driven development

## 🚀 Quick Start

### Installation

```bash
npm install prime-yggdrasil primereact primeicons
```

### Usage

```tsx
// Import theme
import 'prime-yggdrasil/yggdrasil-light.css';  // or yggdrasil-dark.css
import 'primeicons/primeicons.css';

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

<Button label="Save" />
<DataTable value={data} />
<InputText placeholder="Enter text" />
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
npm run dev                 # Start Storybook
npm run build              # Build library
npm run test:contrast      # Test color contrast
npm run test:themes        # Validate theme structure
npm run lint:css           # Lint CSS files
```

## 📊 Project Stats

- **Semantic Tokens**: 727 color replacements (96% coverage)
- **Components**: 69 PrimeReact components themed
- **Files**: 10 modular CSS category files
- **Contrast**: WCAG 3.0 (APCA) validated
- **Dark Mode**: Optimized shadows with white rim strategy

## 🤖 AI Agent Integration

Yggdrasil is specifically designed to guide AI agents toward component-driven development:

1. **Comprehensive Documentation** - AI agents can read [AI-AGENT-GUIDE.md](./docs/AI-AGENT-GUIDE.md)
2. **Decision Trees** - Step-by-step component selection guidance
3. **Token Reference** - Quick lookup for semantic tokens
4. **Anti-Patterns** - Clear examples of what NOT to do
5. **Validation Rules** - Optional ESLint/pre-commit hooks

### Example AI Prompt
```
I'm building a React app with Yggdrasil design system.

Before implementing UI:
1. Read: node_modules/prime-yggdrasil/docs/AI-AGENT-GUIDE.md
2. Check: Is there a PrimeReact component for this?
3. Use: Semantic tokens only (no hardcoded colors)
4. Follow: 4px grid for all spacing

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
prime-yggdrasil/
├── dist/
│   ├── yggdrasil-light.css     # Light theme (import this)
│   ├── yggdrasil-dark.css      # Dark theme (import this)
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

MIT © [Your Name]

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

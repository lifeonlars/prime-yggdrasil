# AI Agent Development Guide

This package includes 4 development skills for AI-assisted coding across multiple platforms.

## Included Skills

### verification-before-completion
Enforces evidence-based completion claims. Never claim "tests pass" or "build succeeds" without running the actual commands and capturing output. Requires proof before marking tasks complete.

### frontend-design
Design system consistency checks and guidance. Ensures components use semantic tokens, follow the 4px grid system, and maintain visual consistency with PrimeReact.

### vercel-react-best-practices
React and Next.js performance best practices (57 rules across 8 categories). Covers async patterns, bundling, client optimization, rendering, and server-side patterns.

### agent-browser
Automated UI verification and browser testing. Enables automated Storybook testing, screenshot capture, and interaction verification (hover, click, form filling).

---

## Platform-Specific Usage

### Claude Code

**Automatic Loading**: Skills load automatically from `.agents/skills/`

**Task Management**: Press `Ctrl+T` to view tasks

**Workflows**: See [CLAUDE.md](./CLAUDE.md) for Claude Code-specific workflows including:
- Task dependency system
- Verification enforcement
- Evidence capture requirements

**Installation**: Skills install automatically via postinstall script

---

### Antigravity CLI

**Location**: Skills available in `.agents/skills/`

**Loading**: Load skills per [Antigravity documentation](https://github.com/yourusername/antigravity)

**Workflows**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for verification commands:
```bash
npm run build -w @lifeonlars/prime-yggdrasil
npm run lint -w @lifeonlars/prime-yggdrasil
```

**Installation**: Skills install automatically via postinstall script

---

### Gemini CLI

**Location**: Skills available in `.agents/skills/`

**Loading**: Load skills per [Gemini CLI documentation](https://github.com/yourusername/gemini-cli)

**Workflows**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for verification commands:
```bash
npm run build -w @lifeonlars/prime-yggdrasil
npm run lint -w @lifeonlars/prime-yggdrasil
```

**Installation**: Skills install automatically via postinstall script

---

### Other SKILL.md-Compatible Platforms

**Location**: Skills available in `.agents/skills/`

**Format**: All skills use standard SKILL.md format (YAML frontmatter + Markdown)

**Compatibility**: Works with any platform supporting the SKILL.md standard

**Workflows**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for verification commands

---

## Universal Verification Workflow

All platforms should follow this verification workflow:

### 1. Implement Feature
Write the code for the requested feature or fix.

### 2. Run Build Verification
```bash
npm run build -w @lifeonlars/prime-yggdrasil
```
**Required**: Must pass with exit code 0

### 3. Run Lint Verification
```bash
npm run lint -w @lifeonlars/prime-yggdrasil
```
**Required**: 0 errors, minimal warnings

### 4. Run Visual Verification (UI changes only)
```bash
npm run storybook
# Navigate to component
# Verify visual appearance
# Test interactions
# Capture screenshots
```
**Required for UI**: Visual confirmation + screenshot evidence

### 5. Capture Evidence
- Save command output showing success
- Capture screenshots of UI components
- Document any warnings or edge cases

### 6. Mark Task Complete
**Only after all verification steps pass with evidence**

---

## Charts Package

For charts-specific verification:

```bash
npm run build -w @lifeonlars/prime-yggdrasil-charts
npm run lint -w @lifeonlars/prime-yggdrasil-charts
npm run build-storybook
```

**Visual verification is MANDATORY** for chart changes:
- Chart renders with correct colors
- Tooltips display on hover
- Legends work correctly
- Axes are readable

See [packages/prime-yggdrasil-charts/CONTRIBUTING.md](../prime-yggdrasil-charts/CONTRIBUTING.md) for details.

---

## Skill Details

### SKILL.md Format

All skills use a universal format:
```yaml
---
name: skill-name
description: Brief description
---
# Markdown content
```

### Directory Structure

```
.agents/skills/
├── verification-before-completion/
│   └── SKILL.md
├── frontend-design/
│   ├── SKILL.md
│   └── LICENSE.txt
├── vercel-react-best-practices/
│   ├── SKILL.md
│   ├── AGENTS.md
│   └── rules/
│       └── *.md (57 rule files)
└── agent-browser/
    ├── SKILL.md
    ├── templates/
    │   └── *.sh
    └── references/
        └── *.md
```

---

## Getting Help

- **Claude Code**: See [CLAUDE.md](./CLAUDE.md)
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Design System**: See [README.md](./README.md)
- **Charts**: See [packages/prime-yggdrasil-charts/README.md](../prime-yggdrasil-charts/README.md)
- **Issues**: https://github.com/lifeonlars/prime-yggdrasil/issues

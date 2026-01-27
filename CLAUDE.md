# Claude Code Project Configuration

## MANDATORY WORKFLOW (NEVER SKIP)

These rules are NON-NEGOTIABLE. Violating any makes the work invalid.

### W1: Create blocking verification subtasks BEFORE coding
Every implementation task MUST start with TodoWrite creating these subtasks:
- "Build verification" (pending)
- "Lint verification" (pending)
- "Visual verification" (pending) — for any UI changes
The main task CANNOT be marked completed until ALL subtasks are completed with evidence.

### W2: Run verification-before-completion BEFORE any completion claim
Before saying "done", "fixed", "working", or "complete":
1. Run the actual verification command (build, lint, storybook)
2. Read the full output
3. Confirm exit code 0 and no errors
4. ONLY THEN make the claim
Never say "should work" or "likely fixed" — run it and prove it.

### W3: Use agent-browser for ALL UI changes
Any change to a `.tsx` file that affects visible output requires:
1. Ensure Storybook is running (`npm run storybook`)
2. Use `npx agent-browser` to navigate to the relevant story
3. Take a screenshot (`npx agent-browser screenshot <path>`)
4. Read the screenshot and verify the visual result matches expectations
Without screenshot evidence, UI work is NOT complete.

### W4: Invoke frontend-design skill for new UI components
Before creating any new visual component (`.tsx` that renders UI), invoke the
`frontend-design` skill to ensure design quality and consistency.

---

## Project Overview

This is a monorepo containing:
- `@lifeonlars/prime-yggdrasil` - Core design system tokens and components
- `@lifeonlars/prime-yggdrasil-charts` - Highcharts-based data visualization components

## Task Management System

This project uses Claude Code's task management system to enforce verification workflows.

### Required Workflow

For ANY implementation task, Claude MUST create verification subtasks that block the main task:

```
Create main task: "[Feature/Fix Description]"
  ↓ blockedBy
Create task: "Build verification" (blocks main task)
  ↓ blockedBy
Create task: "Lint verification" (blocks main task)
  ↓ blockedBy
Create task: "Visual verification" (blocks main task - UI changes only)
```

**The main task CANNOT be marked complete until all verification subtasks pass.**

### View Tasks

Press **Ctrl+T** to view the task list and status.

### Task Workflow

1. Update main task → in_progress
2. Implement the feature/fix
3. Update "Build verification" → in_progress
   - Run build command
   - If FAILS → fix → rebuild → repeat
   - If PASSES → mark completed
4. Update "Lint verification" → in_progress
   - Run lint command
   - If FAILS → fix → re-lint → repeat
   - If PASSES → mark completed
5. Update "Visual verification" → in_progress (UI changes only)
   - Use agent-browser for verification
   - Capture screenshot evidence
   - Mark completed
6. ONLY THEN: Update main task → completed

## Required Skills

The following skills are installed in `.agents/skills/` and must be followed:

### verification-before-completion
**MANDATORY** - Apply before ANY completion claims, commits, or PRs.

Core principle: **Evidence before claims, always.**

Before claiming any work is complete:
1. IDENTIFY: What command proves this claim?
2. RUN: Execute the FULL command (fresh, complete)
3. READ: Full output, check exit code, count failures
4. VERIFY: Does output confirm the claim?
5. ONLY THEN: Make the claim

**Never claim:**
- "Tests pass" without running `npm test`
- "Build succeeds" without running `npm run build`
- "Linter clean" without running `npm run lint`
- "Bug fixed" without verifying the original symptom

### agent-browser
Use for automated UI verification, screenshots, and interaction testing.

### frontend-design
Use when implementing UI components or charts to ensure design system consistency.

### vercel-react-best-practices
Follow React best practices for component architecture, hooks usage, and performance.

## Package-Specific Verification

### @lifeonlars/prime-yggdrasil (Core Design System)

Verification commands required:
```bash
# 1. Build
npm run build -w @lifeonlars/prime-yggdrasil

# 2. Lint
npm run lint -w @lifeonlars/prime-yggdrasil

# 3. CSS Lint (if CSS changes)
npm run lint:css

# 4. Contrast Tests (if color changes)
npm run test:contrast

# 5. Theme Tests (if theme changes)
npm run test:themes

# 6. Visual verification
npm run storybook
```

### @lifeonlars/prime-yggdrasil-charts (Charts Package)

Verification commands required:
```bash
# 1. Build
npm run build -w @lifeonlars/prime-yggdrasil-charts

# 2. Lint
npm run lint -w @lifeonlars/prime-yggdrasil-charts

# 3. Storybook Build
npm run build-storybook

# 4. Visual verification (REQUIRED for UI)
npm run storybook
# Then use agent-browser for verification
```

## Visual Verification with agent-browser

For UI components and charts, visual verification is REQUIRED before completion:

### Storybook UI Verification
```bash
# 1. Start Storybook
npm run storybook

# 2. Open in agent-browser
# Use agent-browser skill to:
# - Navigate to component story
# - Verify visual appearance
# - Test interactions (hover, click)
# - Capture screenshot evidence
```

### Chart Visual Verification Checklist
- [ ] Chart renders with correct colors from design tokens
- [ ] Tooltip appears on hover with correct formatting
- [ ] Legend displays correctly
- [ ] Axis labels are readable
- [ ] Loading/empty/error states work
- [ ] Screenshot evidence captured

## Definition of Done

A task is ONLY complete when:
- [ ] All verification commands pass with exit code 0
- [ ] No TypeScript errors
- [ ] No ESLint warnings (or explicitly acknowledged)
- [ ] Visual verification completed (for UI changes)
- [ ] Screenshot evidence captured (for UI changes)
- [ ] Storybook stories render correctly (verified visually or via build)
- [ ] Changes match the design system specifications

## Code Standards

### Charts Package
- Use Yggdrasil design tokens for all colors (never hardcode colors)
- Follow the semantic API pattern (data + encoding)
- All charts must support loading/empty/error states
- Use PrimeReact components for UI elements (Skeleton, etc.)
- Never set Highcharts option values to `undefined` explicitly — omit the key instead (use conditional spread `...(condition && { key: value })`)

### Color Palettes
- Category palette: For distinct categorical data
- Boolean palette: For binary comparisons (primary/secondary, emphasis/diminish)
- Sentiment palette: positive (#AAECBC), neutral (#F2DE6E), negative (#F4B6B6)
- Sequential palette: For heatmaps and gradients

### Accessibility
- All charts must have ariaLabel
- Keyboard navigation enabled by default
- High contrast mode support

## Charts Package: CSS Architecture

The charts package (`@lifeonlars/prime-yggdrasil-charts`) is a **library** consumed by other applications. The core design system (`@lifeonlars/prime-yggdrasil`) is a **peer dependency** — it provides CSS variables via exported stylesheets that the consumer imports.

### Inline styles with CSS variable fallbacks ARE correct
```tsx
// CORRECT for library components:
style={{ color: 'var(--text-neutral-default, #1a2332)' }}
```
The consumer imports `@lifeonlars/prime-yggdrasil/theme.css` to provide the CSS variables. The fallback hex values ensure components render correctly even without the theme.

### Rules for library component styles
- Always use `var(--token-name, #fallback)` — never bare hex values without a var() wrapper
- Fallback values MUST match the light theme defaults
- Use CSS class names (`yggdrasil-*`) on root elements so consumers can override styles
- Dynamic/conditional styles (e.g., positive/negative badge colors) use inline styles
- Static layout styles use inline styles (this is a library, not a consumer app)

### What's NOT allowed
- Importing CSS files from the core package directly (breaks consumer flexibility)
- CSS Modules (hashed class names prevent consumer overrides)
- CSS-in-JS libraries (unnecessary dependency for a library)
- Bare hex values without `var()` wrapper (e.g., `color: '#1a2332'` — use `var(--text-neutral-default, #1a2332)` instead)

## Git Workflow

- Never commit without running verification commands
- Never claim "tests pass" without fresh test output
- Include verification output in commit messages when relevant

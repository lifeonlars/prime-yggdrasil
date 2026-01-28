# Claude Code Project Configuration

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

### Color Palettes
- Category palette: For distinct categorical data
- Boolean palette: For binary comparisons (primary/secondary, emphasis/diminish)
- Sentiment palette: positive (#AAECBC), neutral (#F2DE6E), negative (#F4B6B6)
- Sequential palette: For heatmaps and gradients

### Accessibility
- All charts must have ariaLabel
- Keyboard navigation enabled by default
- High contrast mode support

## Git Workflow

- Never commit without running verification commands
- Never claim "tests pass" without fresh test output
- Include verification output in commit messages when relevant

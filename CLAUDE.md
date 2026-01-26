# Claude Code Project Configuration

## Project Overview

This is a monorepo containing:
- `@lifeonlars/prime-yggdrasil` - Core design system tokens and components
- `@lifeonlars/prime-yggdrasil-charts` - Highcharts-based data visualization components

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

### frontend-design
Use when implementing UI components or charts to ensure design system consistency.

### vercel-react-best-practices
Follow React best practices for component architecture, hooks usage, and performance.

## Verification Commands

Before claiming completion, run these in order:

```bash
# 1. Type check
npm run typecheck -w @lifeonlars/prime-yggdrasil-charts

# 2. Lint
npm run lint -w @lifeonlars/prime-yggdrasil-charts

# 3. Build
npm run build -w @lifeonlars/prime-yggdrasil-charts

# 4. Test (if tests exist)
npm test -w @lifeonlars/prime-yggdrasil-charts

# 5. Storybook build (for visual components)
npm run build-storybook
```

## Definition of Done

A task is ONLY complete when:
- [ ] All verification commands pass with exit code 0
- [ ] No TypeScript errors
- [ ] No ESLint warnings (or explicitly acknowledged)
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

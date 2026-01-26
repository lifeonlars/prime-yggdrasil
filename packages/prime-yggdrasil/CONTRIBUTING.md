# Contributing to @lifeonlars/prime-yggdrasil

## Task Management System

This package uses Claude Code's task management system to enforce verification workflows.

### Required Workflow for Claude

When implementing ANY feature or fix:

1. **Create main task**:
   ```
   Create task: "Implement [feature]"
   ```

2. **Create verification tasks that block completion**:
   ```
   Create task: "Build verification" (blocks main task)
   Create task: "Lint verification" (blocks main task)
   Create task: "Visual verification" (blocks main task, if UI change)
   ```

3. **Complete tasks in dependency order**:
   - Verification tasks must pass BEFORE main task can be marked complete
   - Each verification task requires evidence (command output, screenshots)

### View Task Status

Press **Ctrl+T** to see all tasks and their completion status.

---

## Definition of Done

A task is ONLY complete when ALL of the following are verified:

### Code Quality
- [ ] TypeScript compiles without errors: `npm run build -w @lifeonlars/prime-yggdrasil`
- [ ] ESLint passes: `npm run lint -w @lifeonlars/prime-yggdrasil`
- [ ] CSS Lint passes: `npm run lint:css`
- [ ] No new warnings introduced

### Design System Compliance
- [ ] Only uses semantic design tokens (no hardcoded colors/spacing)
- [ ] Follows 4px grid system for spacing
- [ ] Contrast tests pass: `npm run test:contrast` (if color changes)
- [ ] Theme tests pass: `npm run test:themes` (if theme changes)

### Visual Verification
- [ ] Storybook renders correctly: `npm run storybook`
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Screenshot evidence captured (use agent-browser skill)

### Accessibility
- [ ] ARIA labels present where needed
- [ ] Keyboard navigation works
- [ ] Screen reader tested (if applicable)
- [ ] Color contrast meets WCAG AA standards

---

## Self-Correction Workflow

1. Update "[Verification]" task → in_progress
2. Run verification command
3. If FAILS → fix → re-run → repeat until pass
4. If PASSES → Update task → completed
5. Once ALL verification tasks complete → Update main task → completed

**Evidence is REQUIRED**: Capture command output and screenshots as proof.

---

## Development Commands

```bash
# Build the package
npm run build -w @lifeonlars/prime-yggdrasil

# Lint JavaScript/TypeScript
npm run lint -w @lifeonlars/prime-yggdrasil

# Lint CSS
npm run lint:css

# Run tests
npm run test -w @lifeonlars/prime-yggdrasil

# Run contrast tests
npm run test:contrast

# Run theme validation
npm run test:themes

# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

---

## Verification Script

For quick verification of all checks:

```bash
# From repo root
./scripts/verify.sh
```

This runs all build, lint, and test commands for both packages.

---

## Design Token Usage

### Always Use Semantic Tokens

```css
/* ❌ BAD - Hardcoded colors */
.button {
  background: #007bff;
  color: white;
}

/* ✅ GOOD - Semantic tokens */
.button {
  background: var(--color-action-primary-default);
  color: var(--color-text-on-action);
}
```

### Token Categories

- **Action tokens**: `--color-action-*` for interactive elements
- **Surface tokens**: `--color-surface-*` for backgrounds
- **Border tokens**: `--color-border-*` for dividers and outlines
- **Text tokens**: `--color-text-*` for typography
- **Status tokens**: `--color-status-*` for feedback (success, error, warning)

---

## Spacing System

All spacing must use the 4px grid system:

```css
/* ❌ BAD - Arbitrary values */
.card {
  padding: 15px;
  margin: 23px;
}

/* ✅ GOOD - 4px grid multiples */
.card {
  padding: var(--spacing-4); /* 16px */
  margin: var(--spacing-6); /* 24px */
}
```

Available spacing tokens: `--spacing-0` through `--spacing-16` (0px to 64px in 4px increments)

---

## Testing Visual Changes

### Using agent-browser

For UI changes, use the agent-browser skill to capture verification evidence:

```bash
# Start Storybook
npm run storybook

# In Claude Code, use agent-browser skill:
# 1. Navigate to your component story
# 2. Verify visual appearance
# 3. Test interactions (hover, focus, click)
# 4. Capture screenshots
# 5. Test light/dark mode switching
```

### Manual Verification Checklist

When using Storybook manually:

- [ ] Component renders without errors
- [ ] Props work as documented
- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] Responsive behavior works
- [ ] Accessibility features work (keyboard nav, screen reader)

---

## Commit Guidelines

### Before Committing

Run all verification commands and ensure they pass:

```bash
npm run build -w @lifeonlars/prime-yggdrasil
npm run lint -w @lifeonlars/prime-yggdrasil
npm run lint:css
npm run test -w @lifeonlars/prime-yggdrasil
```

### Commit Message Format

Follow conventional commits:

```
type(scope): subject

body (optional)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

---

## Getting Help

- See [CLAUDE.md](../../CLAUDE.md) for Claude Code workflow details
- Check [README.md](./README.md) for package documentation
- Review existing components in `src/` for patterns
- Check Storybook stories for usage examples

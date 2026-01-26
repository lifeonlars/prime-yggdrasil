# Contributing to @lifeonlars/prime-yggdrasil-charts

## Task Management System

This package uses Claude Code's task management system to enforce verification workflows.

### Required Workflow for Claude

When implementing ANY chart feature or fix:

1. **Create main task**:
   ```
   Create task: "Implement [chart feature]"
   ```

2. **Create verification tasks that block completion**:
   ```
   Create task: "Build verification" (blocks main task)
   Create task: "Lint verification" (blocks main task)
   Create task: "Storybook build verification" (blocks main task)
   Create task: "Visual verification via agent-browser" (blocks main task - REQUIRED)
   ```

3. **Visual verification is MANDATORY** for chart changes:
   - Start Storybook: `npm run storybook`
   - Use agent-browser to verify chart rendering
   - Capture screenshot evidence
   - Test tooltips, legends, axes

### View Task Status

Press **Ctrl+T** to see all tasks and their completion status.

---

## Definition of Done

A task is ONLY complete when ALL of the following are verified:

### Code Quality
- [ ] TypeScript compiles: `npm run build -w @lifeonlars/prime-yggdrasil-charts`
- [ ] ESLint passes: `npm run lint -w @lifeonlars/prime-yggdrasil-charts`
- [ ] Storybook builds: `npm run build-storybook`
- [ ] No new warnings introduced

### Chart-Specific Requirements
- [ ] Uses Yggdrasil color palettes (getCategoryPalette, getSentimentPalette, etc.)
- [ ] Never hardcodes colors - always uses design tokens
- [ ] Loading state works correctly
- [ ] Empty state displays properly
- [ ] Error state handles gracefully
- [ ] Tooltips format values correctly
- [ ] Follows semantic API pattern (data + encoding)

### Visual Verification (agent-browser)
- [ ] Chart renders with correct colors from design tokens
- [ ] Tooltip appears on hover with proper formatting
- [ ] Legend displays correctly
- [ ] Axis labels are readable
- [ ] Loading skeleton displays before data loads
- [ ] Empty state message displays when no data
- [ ] Error state displays on failure
- [ ] Screenshot evidence captured

### Accessibility
- [ ] ariaLabel provided
- [ ] ariaDescription provided (optional but recommended)
- [ ] Keyboard navigation enabled
- [ ] High contrast mode works
- [ ] Screen reader announces key information

---

## Self-Correction Workflow with Tasks

1. **Update "Build verification" → in_progress**
   - Run: `npm run build -w @lifeonlars/prime-yggdrasil-charts`
   - If FAILS → fix → rebuild → repeat
   - If PASSES → Update task → completed

2. **Update "Lint verification" → in_progress**
   - Run: `npm run lint -w @lifeonlars/prime-yggdrasil-charts`
   - If FAILS → fix → re-lint → repeat
   - If PASSES → Update task → completed

3. **Update "Storybook build verification" → in_progress**
   - Run: `npm run build-storybook`
   - If FAILS → fix → rebuild → repeat
   - If PASSES → Update task → completed

4. **Update "Visual verification" → in_progress**
   - Start: `npm run storybook`
   - Use agent-browser skill to:
     - Navigate to chart story
     - Test interactions (hover, click)
     - Verify tooltip appears
     - Verify legend works
     - Capture screenshot evidence
   - Update task → completed

5. **Only THEN: Update main task → completed**

**Evidence is REQUIRED**: Capture command output and screenshots as proof.

---

## Development Commands

```bash
# Build the package
npm run build -w @lifeonlars/prime-yggdrasil-charts

# Lint JavaScript/TypeScript
npm run lint -w @lifeonlars/prime-yggdrasil-charts

# Run tests
npm run test -w @lifeonlars/prime-yggdrasil-charts

# Start Storybook (from repo root)
npm run storybook

# Build Storybook (from repo root)
npm run build-storybook
```

---

## Chart Implementation Guidelines

### Color Palette Usage

Always use Yggdrasil color palettes:

```typescript
// ❌ BAD - Hardcoded colors
const chartConfig = {
  colors: ['#007bff', '#28a745', '#dc3545']
};

// ✅ GOOD - Design system palettes
import { getCategoryPalette } from '@lifeonlars/prime-yggdrasil';

const chartConfig = {
  colors: getCategoryPalette()
};
```

### Available Palettes

- **Category palette**: `getCategoryPalette()` - For distinct categorical data
- **Sentiment palette**: `getSentimentPalette()` - For positive/negative/neutral data
- **Boolean palette**: `getBooleanPalette()` - For binary comparisons
- **Sequential palette**: `getSequentialPalette()` - For heatmaps and gradients

### Required Chart States

All charts must handle these states:

```typescript
interface ChartProps {
  // Data
  data: ChartRow[];
  encoding: EncodingConfig;

  // States (REQUIRED)
  loading?: boolean;        // Show loading skeleton
  empty?: ReactNode;         // Show when data is empty
  error?: string | ReactNode; // Show on error

  // Accessibility (REQUIRED)
  ariaLabel: string;
  ariaDescription?: string;
}
```

### Semantic API Pattern

Follow the semantic API pattern (data + encoding):

```typescript
// ❌ BAD - Raw Highcharts config
<Chart
  series={[{ name: 'Sales', data: [1, 2, 3] }]}
  xAxis={{ categories: ['Jan', 'Feb', 'Mar'] }}
/>

// ✅ GOOD - Semantic API
<Chart
  data={[
    { month: 'Jan', sales: 1 },
    { month: 'Feb', sales: 2 },
    { month: 'Mar', sales: 3 }
  ]}
  encoding={{
    x: 'month',
    y: 'sales'
  }}
  ariaLabel="Monthly sales chart"
/>
```

---

## Visual Verification Process

### Using agent-browser Skill

For every chart change, you MUST verify visually:

```bash
# 1. Start Storybook
npm run storybook

# 2. Use agent-browser skill in Claude Code
# Example workflow:
# - Open http://localhost:6006
# - Navigate to your chart story
# - Verify chart renders
# - Hover over data points to test tooltips
# - Click legend items to test interactions
# - Capture screenshots as evidence
```

### Visual Verification Checklist

- [ ] Chart loads without errors
- [ ] Colors match design system (no hardcoded colors)
- [ ] Tooltip displays on hover
- [ ] Tooltip content is formatted correctly (units, decimals)
- [ ] Legend displays all series
- [ ] Legend items are clickable (show/hide series)
- [ ] Axis labels are readable
- [ ] Axis labels show correct formatting
- [ ] Loading state shows skeleton
- [ ] Empty state shows message
- [ ] Error state shows error message
- [ ] Chart is responsive (try different viewport sizes)

### Screenshot Evidence

Capture these screenshots for each chart:

1. **Default state**: Chart with data
2. **Tooltip state**: Hovering over data point
3. **Loading state**: Before data loads
4. **Empty state**: With no data
5. **Error state**: With error message

---

## Storybook Story Requirements

Every chart component must have Storybook stories covering:

```typescript
// Required stories:
export const Default = { /* Chart with data */ };
export const Loading = { /* loading: true */ };
export const Empty = { /* data: [] */ };
export const Error = { /* error: 'Error message' */ };
export const CustomFormatting = { /* format options */ };
export const DarkMode = { /* Dark theme */ };
```

---

## Testing Interactions

### Tooltip Testing

```typescript
// Verify tooltip displays on hover:
// 1. Hover over data point
// 2. Verify tooltip appears
// 3. Verify tooltip contains:
//    - Series name
//    - Formatted value
//    - Correct units
```

### Legend Testing

```typescript
// Verify legend interactions:
// 1. Click legend item
// 2. Verify series is hidden
// 3. Click again
// 4. Verify series is shown
```

### Responsive Testing

```typescript
// Verify chart is responsive:
// 1. Resize browser window
// 2. Verify chart adapts to new size
// 3. Verify text remains readable
// 4. Verify layout doesn't break
```

---

## Common Pitfalls

### ❌ Hardcoding Colors

```typescript
// BAD
const options = {
  colors: ['#007bff', '#28a745']
};
```

### ✅ Use Design Tokens

```typescript
// GOOD
import { getCategoryPalette } from '@lifeonlars/prime-yggdrasil';

const options = {
  colors: getCategoryPalette()
};
```

### ❌ Missing States

```typescript
// BAD - No loading/empty/error handling
<Chart data={data} />
```

### ✅ Handle All States

```typescript
// GOOD
<Chart
  data={data}
  loading={isLoading}
  empty={<EmptyState message="No data available" />}
  error={error}
/>
```

### ❌ No Accessibility

```typescript
// BAD
<Chart data={data} encoding={encoding} />
```

### ✅ Provide Accessibility

```typescript
// GOOD
<Chart
  data={data}
  encoding={encoding}
  ariaLabel="Sales by month"
  ariaDescription="Bar chart showing monthly sales for 2024"
/>
```

---

## Commit Guidelines

### Before Committing

Run all verification commands:

```bash
npm run build -w @lifeonlars/prime-yggdrasil-charts
npm run lint -w @lifeonlars/prime-yggdrasil-charts
npm run build-storybook
```

### Commit Message Format

```
type(charts): subject

body (optional)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

Types:
- `feat(charts)`: New chart type or feature
- `fix(charts)`: Bug fix
- `docs(charts)`: Documentation updates
- `style(charts)`: Code formatting
- `refactor(charts)`: Code refactoring
- `test(charts)`: Test updates

---

## Getting Help

- See [CLAUDE.md](../../CLAUDE.md) for Claude Code workflow details
- Check [README.md](./README.md) for package documentation
- Review existing charts in `src/charts/` for patterns
- Check Storybook stories for usage examples
- See plan document: `C:\Users\Lars\.claude\plans\graceful-finding-wolf.md`

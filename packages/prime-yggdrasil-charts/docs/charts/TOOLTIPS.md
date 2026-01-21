# Chart Tooltips

Yggdrasil Charts include custom tooltip formatters that integrate seamlessly with the Yggdrasil design system. All tooltips use consistent styling, colors, typography, and spacing derived from Yggdrasil design tokens.

## Design Specifications

All tooltips follow these design principles:

- **Border Radius**: 12px (softer, modern appearance)
- **Background**: `--surface-neutral-secondary` token
- **Border**: 1px solid `--border-neutral-default`
- **Padding**: 12px
- **Typography**: 12px Roboto with `--text-neutral-default` and `--text-neutral-subdued`
- **Shadow**: Subtle drop shadow (4px blur, 10% opacity)
- **HTML Formatting**: Custom HTML templates for rich content

## Tooltip Formatters

Yggdrasil Charts provides six pre-built tooltip formatters for common use cases:

### 1. Default Tooltip

Simple tooltip showing series name and value.

```typescript
import { createDefaultTooltipFormatter } from '@lifeonlars/prime-yggdrasil-charts';

const tooltipConfig = {
  enabled: true,
  formatter: createDefaultTooltipFormatter({ units: 'kr', compact: true }),
};
```

**When to use:**
- Single data series
- Simple value display
- No date formatting needed

**Example output:**
```
Product A
● 25K kr
```

### 2. Multi-Series Tooltip

Shows all series values for a given X-axis point with formatted header.

```typescript
import { createMultiSeriesTooltipFormatter } from '@lifeonlars/prime-yggdrasil-charts';

const tooltipConfig = {
  enabled: true,
  shared: true,
  formatter: createMultiSeriesTooltipFormatter({ units: 'mentions', compact: true }),
};
```

**When to use:**
- Multiple data series on same chart
- Time series with multiple metrics
- Categorical comparisons

**Example output:**
```
Jan 15, 2026
────────────
● Mentions    1.5K
● Engagement  820
```

### 3. Percentage Tooltip

Shows value with percentage of total (for pie/donut charts).

```typescript
import { createPercentageTooltipFormatter } from '@lifeonlars/prime-yggdrasil-charts';

const tooltipConfig = {
  enabled: true,
  formatter: createPercentageTooltipFormatter(false, { compact: true }),
};
```

**When to use:**
- Pie charts
- Donut charts
- Any part-of-whole visualization

**Parameters:**
- `showTotal` (boolean): Whether to show total value below percentage
- `format` (ChartFormatOptions): Number formatting options

**Example output:**
```
Direct Traffic
● 1.2K visits
32.5% of total
```

### 4. Time Breakdown Tooltip

Shows breakdown by time period with formatted period header.

```typescript
import { createTimeBreakdownTooltipFormatter } from '@lifeonlars/prime-yggdrasil-charts';

const tooltipConfig = {
  enabled: true,
  shared: true,
  formatter: createTimeBreakdownTooltipFormatter('MONTH', { compact: true }),
};
```

**When to use:**
- Time series with specific period granularity
- Dashboards with period filtering (DAY/WEEK/MONTH/QUARTER/YEAR)
- Comparative time analysis

**Parameters:**
- `period`: `'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR'`
- `format`: Number formatting options

**Example output:**
```
MONTH
January 2026
────────────
● Revenue    $125K
● Profit     $42K
```

### 5. Sentiment Tooltip

Color-codes positive/neutral/negative sentiment using Yggdrasil sentiment palette.

```typescript
import { createSentimentTooltipFormatter } from '@lifeonlars/prime-yggdrasil-charts';

const tooltipConfig = {
  enabled: true,
  formatter: createSentimentTooltipFormatter('positive', { compact: true }),
};
```

**When to use:**
- Sentiment analysis charts
- NPS scores
- Any data with positive/negative/neutral classification

**Parameters:**
- `sentimentField`: `'positive' | 'neutral' | 'negative'`
- `format`: Number formatting options

**Example output:**
```
Jan 15, 2026
● Positive
1.2K mentions
```

**Sentiment Colors:**
- **Positive**: `--chart-sentiment-positive` (green)
- **Neutral**: `--chart-sentiment-neutral` (gray)
- **Negative**: `--chart-sentiment-negative` (red)

### 6. Period Comparison Tooltip

Shows current vs previous period with delta and percentage change.

```typescript
import { createPeriodComparisonTooltipFormatter } from '@lifeonlars/prime-yggdrasil-charts';

const tooltipConfig = {
  enabled: true,
  shared: true,
  formatter: createPeriodComparisonTooltipFormatter('current', 'previous', { units: 'kr', compact: true }),
};
```

**When to use:**
- Period-over-period analysis
- Before/after comparisons
- YoY, MoM, WoW metrics

**Parameters:**
- `currentField` (string): Field name for current period
- `previousField` (string): Field name for previous period
- `format`: Number formatting options

**Example output:**
```
Week of Jan 15, 2026
────────────────────
● Current   $125K
● Previous  $110K
────────────────────
Change      +$15K (+13.6%)
```

**Delta Formatting:**
- Positive delta: Green (`--chart-sentiment-positive`)
- Negative delta: Red (`--chart-sentiment-negative`)

## Formatting Options

All tooltip formatters accept a `ChartFormatOptions` object:

```typescript
interface ChartFormatOptions {
  units?: string;        // "kr", "%", "mentions", etc.
  decimals?: number;     // Number of decimal places (default: 0)
  compact?: boolean;     // Use compact notation (1.5K instead of 1,500)
  percent?: boolean;     // Multiply by 100 and add % (for ratio data)
}
```

**Examples:**

```typescript
// Currency with compact notation
{ units: 'kr', compact: true }
// Output: 125K kr

// Percentage with 2 decimals
{ units: '%', decimals: 2 }
// Output: 3.45%

// Mentions with no decimals
{ units: 'mentions', decimals: 0 }
// Output: 1,250 mentions
```

## Chart Component Integration

Chart components automatically use appropriate tooltip formatters based on chart type:

| Chart Type | Default Formatter |
|------------|------------------|
| TimeSeriesLine | Multi-Series (shared: true) |
| Column | Multi-Series (shared: false) |
| Bar | Multi-Series (shared: false) |
| StackedColumn | Multi-Series (shared: true) |
| Donut | Percentage |

### Override Default Formatter

You can override the default formatter by providing a custom `tooltip` configuration:

```typescript
import Highcharts from 'highcharts';
import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';
import { createTimeBreakdownTooltipFormatter } from '@lifeonlars/prime-yggdrasil-charts';

<TimeSeriesLine
  data={data}
  encoding={{ x: 'date', y: ['revenue', 'profit'] }}
  tooltip={{
    enabled: true,
    shared: true,
    formatter: createTimeBreakdownTooltipFormatter('MONTH', { units: 'kr', compact: true }),
  }}
/>
```

### Disable Tooltips

To disable tooltips entirely:

```typescript
<TimeSeriesLine
  data={data}
  encoding={{ x: 'date', y: 'value' }}
  tooltip={false}
/>
```

## Custom Tooltip Formatters

For advanced use cases, you can write custom tooltip formatters using the Highcharts API:

```typescript
import Highcharts from 'highcharts';

const customFormatter: Highcharts.TooltipFormatterCallbackFunction = function () {
  const point = this.point as any;

  return `
    <div style="min-width: 120px;">
      <div style="font-weight: 500; color: var(--text-neutral-default);">
        ${point.name}
      </div>
      <div style="font-size: 11px; color: var(--text-neutral-subdued);">
        Custom value: ${point.y}
      </div>
    </div>
  `;
};

<TimeSeriesLine
  data={data}
  encoding={{ x: 'date', y: 'value' }}
  tooltip={{
    enabled: true,
    formatter: customFormatter,
  }}
/>
```

**Best Practices for Custom Formatters:**

1. **Use Yggdrasil CSS Variables**: Reference `--text-neutral-default`, `--text-neutral-subdued`, `--border-neutral-default`, etc.
2. **Consistent Spacing**: Use 4px, 6px, 8px, 12px increments for gaps and padding
3. **Typography**: Use 11px-13px font sizes for tooltip content
4. **Color Indicators**: Use the `formatSeriesIndicator()` pattern for series color dots
5. **Null Safety**: Always check for null/undefined values before formatting

## Accessibility

All Yggdrasil tooltip formatters include accessibility features:

- **Screen Reader Support**: Tooltip content is announced when data points are focused
- **Keyboard Navigation**: Tooltips appear on keyboard focus (arrow keys)
- **High Contrast**: Colors meet WCAG AA contrast requirements
- **Reduced Motion**: No animations, instant display

## Responsive Behavior

Tooltips automatically adjust positioning to stay within viewport bounds:

- **Smart Positioning**: Highcharts automatically repositions tooltips near edges
- **Mobile Touch**: Tooltips appear on tap (not hover) on touch devices
- **Overflow**: Long content wraps or scrolls within tooltip container

## Examples

See the **Tooltips** section in Storybook for interactive examples of all tooltip variants.

## Theme Integration

Tooltips are configured globally via the Highcharts theme in [`highcharts-theme.ts`](../../src/theme/highcharts-theme.ts):

```typescript
tooltip: {
  backgroundColor: getCSSVariable('--surface-neutral-secondary'),
  borderColor: getCSSVariable('--border-neutral-default'),
  borderRadius: 12,
  borderWidth: 1,
  padding: 12,
  shadow: {
    color: 'rgba(0, 0, 0, 0.1)',
    offsetX: 0,
    offsetY: 2,
    opacity: 0.1,
    width: 4,
  },
  style: {
    color: textDefault,
    fontSize: '12px',
    fontWeight: '400',
    fontFamily: 'Roboto, arial, sans-serif',
  },
  useHTML: true,
}
```

This ensures all tooltips have consistent styling across all chart types.

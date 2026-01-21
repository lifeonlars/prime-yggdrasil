# Chart API Reference

This document describes the API for all Prime Yggdrasil chart components.

## Base Chart Props

All chart components share a common set of props inherited from `BaseChartProps`.

### Data Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `ChartRow[]` | Yes | Array of data rows (table-like structure) |
| `encoding` | `ChartEncoding` | Yes | Field mapping specification (x, y, series, stack) |

### Sizing Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Chart size variant (typography/spacing scale) |
| `width` | `string \| number` | `'100%'` | Chart width (CSS value or number in px) |
| `height` | `string \| number` | `400` | Chart height (CSS value or number in px) |

### Formatting Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `format` | `ChartFormatOptions` | `undefined` | Number formatting options |
| `format.units` | `string` | `undefined` | Unit suffix (e.g., "kr", "%", "mentions") |
| `format.decimals` | `number` | `0` | Number of decimal places |
| `format.compact` | `boolean` | `false` | Use compact notation (1.5M instead of 1,500,000) |
| `format.percent` | `boolean` | `false` | Format as percentage |

### Display Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Chart title |
| `subtitle` | `string` | `undefined` | Chart subtitle |
| `legend` | `boolean \| LegendConfig` | `true` | Legend configuration |
| `tooltip` | `boolean \| TooltipConfig` | `true` | Tooltip configuration |

### State Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | Loading state (shows spinner) |
| `empty` | `ReactNode` | Default empty state | Custom empty state component |
| `error` | `string \| ReactNode` | `undefined` | Error state message or component |

### Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | Auto-generated | ARIA label for chart |
| `ariaDescription` | `string` | `undefined` | ARIA description for chart |

### Advanced Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS class name |
| `id` | `string` | Auto-generated | Chart container ID |

## Chart-Specific APIs

### TimeSeriesLine

Line chart with date/time X-axis.

**Use cases:**
- Time-based data (dates, timestamps)
- Trends over time
- Multiple time series comparison

**Encoding requirements:**
- `x`: Field containing dates or timestamps
- `y`: Field(s) containing numeric values
- `series` (optional): Field for grouping into multiple series

**Example:**

```tsx
<TimeSeriesLine
  data={[
    { date: '2026-01-01', value: 100 },
    { date: '2026-01-02', value: 150 },
  ]}
  encoding={{ x: 'date', y: 'value' }}
  title="Website Traffic"
  format={{ units: 'visitors', decimals: 0 }}
/>
```

### Column

Vertical bar chart with categorical X-axis.

**Use cases:**
- Comparing values across categories
- Discrete data points
- Bar chart alternative (vertical)

**Encoding requirements:**
- `x`: Field containing category names
- `y`: Field(s) containing numeric values
- `series` (optional): Field for grouping into multiple series

**Example:**

```tsx
<Column
  data={[
    { product: 'A', sales: 450 },
    { product: 'B', sales: 380 },
  ]}
  encoding={{ x: 'product', y: 'sales' }}
  title="Product Sales"
  format={{ units: 'units', decimals: 0 }}
/>
```

### Bar

Horizontal bar chart with categorical Y-axis.

**Use cases:**
- Comparing values across categories (horizontal orientation)
- Long category labels (easier to read horizontally)
- Ranking/top N displays

**Encoding requirements:**
- `x`: Field containing category names
- `y`: Field(s) containing numeric values
- `series` (optional): Field for grouping into multiple series

**Example:**

```tsx
<Bar
  data={[
    { category: 'Product A', value: 520 },
    { category: 'Product B', value: 380 },
  ]}
  encoding={{ x: 'category', y: 'value' }}
  title="Top Products"
/>
```

### StackedColumn

Stacked vertical bar chart showing composition.

**Use cases:**
- Part-to-whole relationships
- Composition over time/categories
- Comparing totals and parts simultaneously

**Encoding requirements:**
- `x`: Field containing category names or dates
- `y`: Array of fields to stack (each becomes a layer)
- `stack` (optional): Stack group name

**Example:**

```tsx
<StackedColumn
  data={[
    { month: 'Jan', online: 150, retail: 200 },
    { month: 'Feb', online: 180, retail: 220 },
  ]}
  encoding={{ x: 'month', y: ['online', 'retail'] }}
  title="Sales by Channel"
  format={{ units: 'kr', compact: true }}
/>
```

### Donut

Pie chart with center hole showing proportions.

**Use cases:**
- Part-to-whole relationships
- Composition/distribution
- Percentage breakdowns

**Encoding requirements:**
- `x`: Field containing segment names
- `y`: Field containing numeric values

**Example:**

```tsx
<Donut
  data={[
    { source: 'Email', visitors: 350 },
    { source: 'Social', visitors: 280 },
  ]}
  encoding={{ x: 'source', y: 'visitors' }}
  title="Traffic Sources"
/>
```

## Type Definitions

### ChartRow

```typescript
type ChartRow = Record<string, number | string | Date | null>;
```

Table-like data structure with flexible columns. Each row is an object with field names as keys.

### ChartEncoding

```typescript
interface ChartEncoding {
  x: string;                    // X-axis field name
  y: string | string[];         // Y-axis field name(s)
  series?: string;              // Optional series grouping field
  stack?: string;               // Optional stack grouping field
}
```

### ChartFormatOptions

```typescript
interface ChartFormatOptions {
  units?: string;               // Unit suffix
  decimals?: number;            // Decimal places
  compact?: boolean;            // Compact notation
  percent?: boolean;            // Format as percentage
}
```

### LegendConfig

```typescript
interface LegendConfig {
  enabled?: boolean;                              // Show/hide legend
  position?: 'top' | 'bottom' | 'left' | 'right'; // Legend position
  align?: 'left' | 'center' | 'right';            // Legend alignment
}
```

### TooltipConfig

```typescript
interface TooltipConfig {
  enabled?: boolean;            // Show/hide tooltip
  shared?: boolean;             // Shared tooltip (all series on hover)
}
```

## Utility Functions

### formatNumber

```typescript
function formatNumber(
  value: number | null | undefined,
  options?: ChartFormatOptions
): string
```

Format a number according to chart formatting options.

### formatCompact

```typescript
function formatCompact(value: number, decimals?: number): string
```

Format number in compact notation (K, M, B, T).

### formatDate

```typescript
function formatDate(
  value: Date | string | number,
  format?: 'short' | 'medium' | 'long'
): string
```

Format a date for chart display.

### formatDateTime

```typescript
function formatDateTime(
  value: Date | string | number,
  includeTime?: boolean
): string
```

Format a datetime for chart display.

## Best Practices

### Data Shape

- Use consistent field names across your dataset
- Ensure numeric fields contain valid numbers (not strings)
- Use Date objects or ISO date strings for time series
- Handle null/undefined values gracefully

### Encoding

- Choose meaningful field names for encoding
- For multi-series, use array of field names for `y`
- For grouped series, use `series` field for grouping

### Formatting

- Apply appropriate units for context (kr, %, mentions, etc.)
- Use compact notation for large numbers (> 10,000)
- Choose decimal precision based on data scale

### Accessibility

- Always provide meaningful `title` and `subtitle`
- Use `ariaLabel` for screen readers
- Provide `ariaDescription` for complex charts

### Performance

- Limit data points to < 1000 for optimal performance
- Consider using sampling for large datasets
- Avoid unnecessary re-renders by memoizing data

## Migration from Raw Highcharts

If migrating from raw Highcharts configuration:

| Highcharts | Yggdrasil Charts |
|------------|------------------|
| `series[0].data` | `data` prop (table rows) |
| `series[0].name` | Derived from `encoding.y` |
| `xAxis.categories` | Derived from `data` + `encoding.x` |
| `chart.type` | Component choice (TimeSeriesLine, Column, etc.) |
| `colors` | Automatic from theme |
| `title.text` | `title` prop |
| `subtitle.text` | `subtitle` prop |

Benefits of Yggdrasil Charts API:
- Semantic data shape (table rows instead of series arrays)
- Automatic theme application
- Consistent API across all chart types
- Built-in state management (loading, empty, error)
- AI-agent-friendly data structure

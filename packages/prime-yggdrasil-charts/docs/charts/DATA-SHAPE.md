# Data Shape and Encoding Contract

Prime Yggdrasil Charts use a **table-like data structure** (`rows + encoding`) instead of Highcharts' native series format. This provides a more intuitive, AI-agent-friendly API that closely matches how data is typically structured in databases and APIs.

## Core Concept

Instead of pre-formatting data into series arrays, you provide:

1. **`data`**: Array of row objects (like a database table)
2. **`encoding`**: Specification of which fields map to visual channels (x, y, series, stack)

The chart components automatically transform this into Highcharts series configuration.

## Table-Like Rows

Each row is a plain JavaScript object with field names as keys:

```typescript
type ChartRow = Record<string, number | string | Date | null>;
```

### Example: Single Series

```typescript
const data = [
  { date: '2026-01-01', value: 100 },
  { date: '2026-01-02', value: 150 },
  { date: '2026-01-03', value: 180 },
];

const encoding = { x: 'date', y: 'value' };
```

### Example: Multiple Series (Wide Format)

```typescript
const data = [
  { month: 'Jan', online: 150, retail: 200, wholesale: 100 },
  { month: 'Feb', online: 180, retail: 220, wholesale: 120 },
  { month: 'Mar', online: 200, retail: 190, wholesale: 110 },
];

const encoding = { x: 'month', y: ['online', 'retail', 'wholesale'] };
```

### Example: Grouped Series (Long Format)

```typescript
const data = [
  { date: '2026-01-01', channel: 'online', sales: 150 },
  { date: '2026-01-01', channel: 'retail', sales: 200 },
  { date: '2026-01-02', channel: 'online', sales: 180 },
  { date: '2026-01-02', channel: 'retail', sales: 220 },
];

const encoding = { x: 'date', y: 'sales', series: 'channel' };
```

## Encoding Specification

The `encoding` prop defines how data fields map to visual channels:

```typescript
interface ChartEncoding {
  x: string;                    // X-axis field name
  y: string | string[];         // Y-axis field name(s)
  series?: string;              // Optional series grouping field
  stack?: string;               // Optional stack grouping field
}
```

### X Field

- **Type**: `string`
- **Required**: Yes
- **Usage**: Field name for X-axis

For **time series charts** (TimeSeriesLine), this should contain:
- Date objects
- ISO date strings (`'2026-01-01'`)
- Timestamps

For **categorical charts** (Column, Bar, StackedColumn), this should contain:
- Category names
- String values

**Examples:**

```typescript
// Time series
encoding: { x: 'date', y: 'value' }

// Categorical
encoding: { x: 'product', y: 'sales' }
```

### Y Field(s)

- **Type**: `string | string[]`
- **Required**: Yes
- **Usage**: Field name(s) for Y-axis values

**Single field** (single series):

```typescript
encoding: { x: 'date', y: 'value' }
```

**Multiple fields** (multi-series):

```typescript
encoding: { x: 'month', y: ['online', 'retail', 'wholesale'] }
```

Each field in the array becomes a separate series.

### Series Field

- **Type**: `string`
- **Required**: No
- **Usage**: Field name for grouping rows into series

Use this when you have **long-format data** where each row represents a single data point and you want to group by a categorical field.

**Example:**

```typescript
const data = [
  { date: '2026-01-01', region: 'North', sales: 120 },
  { date: '2026-01-01', region: 'South', sales: 150 },
  { date: '2026-01-02', region: 'North', sales: 130 },
  { date: '2026-01-02', region: 'South', sales: 160 },
];

encoding: { x: 'date', y: 'sales', series: 'region' }
```

This creates two series: "North" and "South".

### Stack Field

- **Type**: `string`
- **Required**: No
- **Usage**: Stack group name (for StackedColumn)

Typically not needed unless you have multiple independent stacks in the same chart.

## Data Format Patterns

### Pattern 1: Single Series

**Use when**: Visualizing one metric over time or categories.

```typescript
const data = [
  { category: 'A', value: 100 },
  { category: 'B', value: 150 },
  { category: 'C', value: 120 },
];

<Column data={data} encoding={{ x: 'category', y: 'value' }} />
```

### Pattern 2: Multi-Series (Wide Format)

**Use when**: Comparing multiple metrics with the same scale.

```typescript
const data = [
  { month: 'Jan', current: 120, previous: 100 },
  { month: 'Feb', current: 150, previous: 110 },
  { month: 'Mar', current: 180, previous: 140 },
];

<TimeSeriesLine
  data={data}
  encoding={{ x: 'month', y: ['current', 'previous'] }}
/>
```

### Pattern 3: Grouped Series (Long Format)

**Use when**: Data is already grouped by a categorical field.

```typescript
const data = [
  { date: '2026-01-01', channel: 'email', visits: 350 },
  { date: '2026-01-01', channel: 'social', visits: 280 },
  { date: '2026-01-02', channel: 'email', visits: 380 },
  { date: '2026-01-02', channel: 'social', visits: 320 },
];

<TimeSeriesLine
  data={data}
  encoding={{ x: 'date', y: 'visits', series: 'channel' }}
/>
```

### Pattern 4: Stacked Composition

**Use when**: Showing parts of a whole over time/categories.

```typescript
const data = [
  { quarter: 'Q1', online: 150, retail: 200, wholesale: 100 },
  { quarter: 'Q2', online: 180, retail: 220, wholesale: 120 },
  { quarter: 'Q3', online: 200, retail: 190, wholesale: 110 },
];

<StackedColumn
  data={data}
  encoding={{ x: 'quarter', y: ['online', 'retail', 'wholesale'] }}
/>
```

### Pattern 5: Proportions (Donut/Pie)

**Use when**: Showing distribution/proportions.

```typescript
const data = [
  { source: 'Email', visitors: 350 },
  { source: 'Social Media', visitors: 280 },
  { source: 'Direct', visitors: 190 },
];

<Donut data={data} encoding={{ x: 'source', y: 'visitors' }} />
```

## Value Types

### Numbers

Numeric values should be actual numbers, not strings:

```typescript
// ✅ Good
{ value: 100 }

// ❌ Bad
{ value: '100' }
```

The chart will attempt to parse string numbers, but native numbers are preferred.

### Dates

For time series, X values should be:

- **Date objects** (preferred)
- **ISO date strings** (`'2026-01-01'`, `'2026-01-15T14:30:00Z'`)
- **Timestamps** (number of milliseconds since epoch)

```typescript
// ✅ Good
{ date: new Date('2026-01-01') }
{ date: '2026-01-01' }
{ date: 1735689600000 }

// ❌ Bad
{ date: 'January 1, 2026' }  // Non-standard format
```

### Null/Undefined Values

Charts handle null and undefined values gracefully:

```typescript
const data = [
  { date: '2026-01-01', value: 100 },
  { date: '2026-01-02', value: null },   // Gap in data
  { date: '2026-01-03', value: 150 },
];
```

Null values create gaps in line charts and are omitted from bar/column charts.

## Data Validation

Charts perform basic validation:

1. **Empty data**: Shows empty state
2. **Missing fields**: Logs warning and shows error state
3. **Invalid values**: Filters out null/undefined/NaN values
4. **Type mismatches**: Attempts to coerce (e.g., string numbers → numbers)

## Why This Data Shape?

### Benefits over Highcharts series format:

1. **Database-friendly**: Matches SQL query results and API responses
2. **AI-agent-friendly**: Predictable table structure is easier for AI to generate
3. **Type-safe**: TypeScript can infer field names
4. **Flexible**: Same data can be visualized multiple ways by changing encoding
5. **Maintainable**: Easier to understand than nested series arrays

### Comparison:

**Highcharts Native:**
```typescript
{
  series: [
    {
      name: 'Current',
      data: [[Date.UTC(2026, 0, 1), 120], [Date.UTC(2026, 0, 2), 150]]
    },
    {
      name: 'Previous',
      data: [[Date.UTC(2026, 0, 1), 100], [Date.UTC(2026, 0, 2), 110]]
    }
  ]
}
```

**Yggdrasil Charts:**
```typescript
{
  data: [
    { date: '2026-01-01', current: 120, previous: 100 },
    { date: '2026-01-02', current: 150, previous: 110 },
  ],
  encoding: { x: 'date', y: ['current', 'previous'] }
}
```

## Advanced Examples

### Dynamic Series from API Response

```typescript
// API returns:
const apiResponse = {
  data: [
    { month: 'Jan', metric_a: 100, metric_b: 150, metric_c: 80 },
    { month: 'Feb', metric_a: 120, metric_b: 160, metric_c: 90 },
  ],
  metrics: ['metric_a', 'metric_b', 'metric_c']
};

// Use directly:
<TimeSeriesLine
  data={apiResponse.data}
  encoding={{ x: 'month', y: apiResponse.metrics }}
/>
```

### Filtering Series

```typescript
const data = [
  { date: '2026-01-01', online: 150, retail: 200, wholesale: 100 },
  { date: '2026-01-02', online: 180, retail: 220, wholesale: 120 },
];

// Show only online and retail:
<TimeSeriesLine
  data={data}
  encoding={{ x: 'date', y: ['online', 'retail'] }}
/>
```

### Derived Fields

```typescript
const rawData = [
  { date: '2026-01-01', revenue: 1000, cost: 600 },
  { date: '2026-01-02', revenue: 1200, cost: 700 },
];

// Add derived profit field:
const data = rawData.map(row => ({
  ...row,
  profit: row.revenue - row.cost
}));

<TimeSeriesLine
  data={data}
  encoding={{ x: 'date', y: ['revenue', 'cost', 'profit'] }}
/>
```

## Best Practices

1. **Use consistent field names** across your dataset
2. **Keep data flat** - avoid nested objects within rows
3. **Normalize date formats** to ISO strings or Date objects
4. **Validate data** before passing to charts (check for nulls, types)
5. **Memoize data** to avoid unnecessary re-renders
6. **Document field meanings** in code comments for team clarity

# Chart Examples

Common usage patterns and real-world examples for Prime Yggdrasil Charts.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Time Series Visualizations](#time-series-visualizations)
- [Categorical Comparisons](#categorical-comparisons)
- [Composition Charts](#composition-charts)
- [Formatting](#formatting)
- [States and Error Handling](#states-and-error-handling)
- [Real-World Scenarios](#real-world-scenarios)

## Basic Usage

### Simple Line Chart

```tsx
import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';

function WebsiteTrafficChart() {
  const data = [
    { date: '2026-01-01', visitors: 120 },
    { date: '2026-01-02', visitors: 150 },
    { date: '2026-01-03', visitors: 180 },
    { date: '2026-01-04', visitors: 140 },
    { date: '2026-01-05', visitors: 200 },
  ];

  return (
    <TimeSeriesLine
      data={data}
      encoding={{ x: 'date', y: 'visitors' }}
      title="Website Traffic"
      subtitle="Daily unique visitors"
    />
  );
}
```

### Simple Column Chart

```tsx
import { Column } from '@lifeonlars/prime-yggdrasil-charts';

function ProductSalesChart() {
  const data = [
    { product: 'Product A', sales: 450 },
    { product: 'Product B', sales: 380 },
    { product: 'Product C', sales: 520 },
    { product: 'Product D', sales: 290 },
  ];

  return (
    <Column
      data={data}
      encoding={{ x: 'product', y: 'sales' }}
      title="Product Sales"
      subtitle="Units sold by product"
    />
  );
}
```

## Time Series Visualizations

### Comparing Current vs Previous Period

```tsx
import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';

function PeriodComparisonChart() {
  const data = [
    { date: '2026-01-01', current: 120, previous: 100 },
    { date: '2026-01-02', current: 150, previous: 110 },
    { date: '2026-01-03', current: 180, previous: 140 },
    { date: '2026-01-04', current: 140, previous: 130 },
    { date: '2026-01-05', current: 200, previous: 170 },
  ];

  return (
    <TimeSeriesLine
      data={data}
      encoding={{ x: 'date', y: ['current', 'previous'] }}
      title="Sales Comparison"
      subtitle="Current period vs previous period"
      format={{ units: 'kr', decimals: 0 }}
      legend={{
        enabled: true,
        position: 'bottom',
        align: 'center',
      }}
    />
  );
}
```

### Multi-Metric Dashboard

```tsx
import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';

function MetricsDashboard() {
  const data = [
    { date: '2026-01-01', pageviews: 1200, sessions: 450, users: 320 },
    { date: '2026-01-02', pageviews: 1500, sessions: 520, users: 380 },
    { date: '2026-01-03', pageviews: 1800, sessions: 600, users: 420 },
  ];

  return (
    <TimeSeriesLine
      data={data}
      encoding={{ x: 'date', y: ['pageviews', 'sessions', 'users'] }}
      title="Website Metrics"
      subtitle="Key engagement metrics over time"
      format={{ compact: true, decimals: 1 }}
    />
  );
}
```

## Categorical Comparisons

### Top Products (Bar Chart)

```tsx
import { Bar } from '@lifeonlars/prime-yggdrasil-charts';

function TopProductsChart() {
  // Sort data by sales descending
  const data = [
    { product: 'Product C', sales: 520 },
    { product: 'Product A', sales: 450 },
    { product: 'Product B', sales: 380 },
    { product: 'Product D', sales: 290 },
    { product: 'Product E', sales: 210 },
  ];

  return (
    <Bar
      data={data}
      encoding={{ x: 'product', y: 'sales' }}
      title="Top 5 Products"
      subtitle="Ranked by units sold"
      height={400}
    />
  );
}
```

### Regional Performance

```tsx
import { Column } from '@lifeonlars/prime-yggdrasil-charts';

function RegionalPerformanceChart() {
  const data = [
    { region: 'North', revenue: 45000 },
    { region: 'South', revenue: 38000 },
    { region: 'East', revenue: 52000 },
    { region: 'West', revenue: 41000 },
  ];

  return (
    <Column
      data={data}
      encoding={{ x: 'region', y: 'revenue' }}
      title="Regional Revenue"
      subtitle="Q1 2026 revenue by region"
      format={{ units: 'kr', compact: true, decimals: 0 }}
    />
  );
}
```

## Composition Charts

### Sales Channels (Stacked Column)

```tsx
import { StackedColumn } from '@lifeonlars/prime-yggdrasil-charts';

function SalesChannelsChart() {
  const data = [
    { month: 'Jan', online: 15000, retail: 20000, wholesale: 10000 },
    { month: 'Feb', online: 18000, retail: 22000, wholesale: 12000 },
    { month: 'Mar', online: 20000, retail: 19000, wholesale: 11000 },
    { month: 'Apr', online: 22000, retail: 21000, wholesale: 13000 },
  ];

  return (
    <StackedColumn
      data={data}
      encoding={{ x: 'month', y: ['online', 'retail', 'wholesale'] }}
      title="Sales by Channel"
      subtitle="Revenue breakdown by sales channel"
      format={{ units: 'kr', compact: true }}
    />
  );
}
```

### Traffic Sources (Donut)

```tsx
import { Donut } from '@lifeonlars/prime-yggdrasil-charts';

function TrafficSourcesChart() {
  const data = [
    { source: 'Email', visitors: 3500 },
    { source: 'Social Media', visitors: 2800 },
    { source: 'Direct', visitors: 1900 },
    { source: 'Search', visitors: 2400 },
    { source: 'Referral', visitors: 1400 },
  ];

  const totalVisitors = data.reduce((sum, row) => sum + row.visitors, 0);

  return (
    <Donut
      data={data}
      encoding={{ x: 'source', y: 'visitors' }}
      title="Traffic Sources"
      subtitle={`Total: ${totalVisitors.toLocaleString()} visitors`}
      format={{ units: 'visitors', decimals: 0 }}
    />
  );
}
```

## Formatting

### Currency Formatting

```tsx
import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';

function RevenueChart() {
  const data = [
    { date: '2026-01-01', revenue: 125000 },
    { date: '2026-01-02', revenue: 150000 },
    { date: '2026-01-03', revenue: 180000 },
  ];

  return (
    <TimeSeriesLine
      data={data}
      encoding={{ x: 'date', y: 'revenue' }}
      title="Daily Revenue"
      format={{
        units: 'kr',
        compact: true,
        decimals: 1,
      }}
    />
  );
}
// Displays: "125.0K kr", "150.0K kr", etc.
```

### Percentage Formatting

```tsx
import { Column } from '@lifeonlars/prime-yggdrasil-charts';

function ConversionRateChart() {
  const data = [
    { campaign: 'Campaign A', conversionRate: 0.045 },
    { campaign: 'Campaign B', conversionRate: 0.038 },
    { campaign: 'Campaign C', conversionRate: 0.052 },
  ];

  return (
    <Column
      data={data}
      encoding={{ x: 'campaign', y: 'conversionRate' }}
      title="Campaign Conversion Rates"
      format={{
        percent: true,
        decimals: 1,
      }}
    />
  );
}
// Displays: "4.5%", "3.8%", "5.2%"
```

### Custom Units

```tsx
import { Bar } from '@lifeonlars/prime-yggdrasil-charts';

function MediaMentionsChart() {
  const data = [
    { outlet: 'News Site A', mentions: 245 },
    { outlet: 'Blog Network B', mentions: 189 },
    { outlet: 'Social Platform C', mentions: 412 },
  ];

  return (
    <Bar
      data={data}
      encoding={{ x: 'outlet', y: 'mentions' }}
      title="Media Mentions"
      subtitle="Last 7 days"
      format={{ units: 'mentions', decimals: 0 }}
    />
  );
}
```

## States and Error Handling

### Loading State

```tsx
import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';
import { useState, useEffect } from 'react';

function AsyncDataChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/traffic')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <TimeSeriesLine
      data={data}
      encoding={{ x: 'date', y: 'visitors' }}
      title="Website Traffic"
      loading={loading}
    />
  );
}
```

### Error Handling

```tsx
import { Column } from '@lifeonlars/prime-yggdrasil-charts';
import { useState, useEffect } from 'react';

function ErrorHandlingChart() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/sales/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => setData(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <Column
      data={data}
      encoding={{ x: 'product', y: 'sales' }}
      title="Product Sales"
      error={error}
    />
  );
}
```

### Empty State

```tsx
import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';

function EmptyStateChart() {
  const data = []; // No data available

  const customEmptyState = (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <p style={{ fontSize: '14px', color: 'var(--text-neutral-subdued)' }}>
        No data available for the selected period.
      </p>
      <button
        style={{
          marginTop: '16px',
          padding: '8px 16px',
          backgroundColor: 'var(--surface-interactive-default)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => console.log('Load sample data')}
      >
        Load Sample Data
      </button>
    </div>
  );

  return (
    <TimeSeriesLine
      data={data}
      encoding={{ x: 'date', y: 'value' }}
      title="Analytics Data"
      empty={customEmptyState}
    />
  );
}
```

## Real-World Scenarios

### E-Commerce Dashboard

```tsx
import {
  TimeSeriesLine,
  Column,
  Donut,
  StackedColumn,
} from '@lifeonlars/prime-yggdrasil-charts';

function ECommerceDashboard({ data }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      {/* Revenue over time */}
      <div>
        <TimeSeriesLine
          data={data.revenue}
          encoding={{ x: 'date', y: 'amount' }}
          title="Revenue"
          subtitle="Last 30 days"
          format={{ units: 'kr', compact: true, decimals: 1 }}
          height={300}
        />
      </div>

      {/* Top products */}
      <div>
        <Column
          data={data.topProducts}
          encoding={{ x: 'product', y: 'sales' }}
          title="Top Products"
          subtitle="Units sold"
          height={300}
        />
      </div>

      {/* Sales by channel */}
      <div>
        <StackedColumn
          data={data.channels}
          encoding={{ x: 'week', y: ['online', 'retail', 'wholesale'] }}
          title="Sales Channels"
          subtitle="Weekly breakdown"
          format={{ units: 'kr', compact: true }}
          height={300}
        />
      </div>

      {/* Customer segments */}
      <div>
        <Donut
          data={data.segments}
          encoding={{ x: 'segment', y: 'customers' }}
          title="Customer Segments"
          subtitle="Total customers: 12,500"
          height={300}
        />
      </div>
    </div>
  );
}
```

### Media Monitoring Report

```tsx
import { TimeSeriesLine, Bar } from '@lifeonlars/prime-yggdrasil-charts';

function MediaMonitoringReport({ mentions, topOutlets }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Media Monitoring Report</h1>

      {/* Mentions over time */}
      <TimeSeriesLine
        data={mentions}
        encoding={{ x: 'date', y: ['positive', 'neutral', 'negative'] }}
        title="Media Mentions by Sentiment"
        subtitle="Last 30 days"
        format={{ units: 'mentions', decimals: 0 }}
        height={400}
      />

      {/* Top outlets */}
      <Bar
        data={topOutlets}
        encoding={{ x: 'outlet', y: 'mentions' }}
        title="Top 10 Media Outlets"
        subtitle="By number of mentions"
        format={{ units: 'mentions', decimals: 0 }}
        height={500}
      />
    </div>
  );
}
```

### Analytics Widget

```tsx
import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';
import { useState } from 'react';

function AnalyticsWidget() {
  const [metric, setMetric] = useState('pageviews');
  const [data] = useState([
    { date: '2026-01-01', pageviews: 1200, sessions: 450, users: 320 },
    { date: '2026-01-02', pageviews: 1500, sessions: 520, users: 380 },
    { date: '2026-01-03', pageviews: 1800, sessions: 600, users: 420 },
  ]);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="pageviews">Page Views</option>
          <option value="sessions">Sessions</option>
          <option value="users">Users</option>
        </select>
      </div>

      <TimeSeriesLine
        data={data}
        encoding={{ x: 'date', y: metric }}
        title={metric.charAt(0).toUpperCase() + metric.slice(1)}
        subtitle="Last 7 days"
        format={{ compact: true, decimals: 1 }}
        height={300}
      />
    </div>
  );
}
```

## Tips and Best Practices

### Data Preparation

```tsx
// ✅ Good: Prepare data before rendering
const data = useMemo(() => {
  return rawData
    .filter(row => row.value != null)
    .map(row => ({
      ...row,
      date: new Date(row.timestamp),
    }));
}, [rawData]);

// ❌ Bad: Inline data transformation
<TimeSeriesLine
  data={rawData.filter(row => row.value != null).map(row => ({ ...row, date: new Date(row.timestamp) }))}
  encoding={{ x: 'date', y: 'value' }}
/>
```

### Responsive Sizing

```tsx
// Use CSS width for responsive charts
<div style={{ width: '100%', maxWidth: '800px' }}>
  <TimeSeriesLine
    data={data}
    encoding={{ x: 'date', y: 'value' }}
    title="Responsive Chart"
    height={400}
    // width defaults to '100%'
  />
</div>
```

### Accessibility

```tsx
// Provide descriptive labels
<TimeSeriesLine
  data={data}
  encoding={{ x: 'date', y: 'sales' }}
  title="Sales Performance"
  ariaLabel="Sales performance chart showing daily revenue over the last 30 days"
  ariaDescription="Line chart with 30 data points. Revenue ranges from 50,000 kr to 180,000 kr."
/>
```

### Performance

```tsx
// Memoize data to avoid re-renders
const chartData = useMemo(() => {
  return fetchedData.map(row => ({
    date: row.timestamp,
    value: row.amount,
  }));
}, [fetchedData]);

<TimeSeriesLine
  data={chartData}
  encoding={{ x: 'date', y: 'value' }}
  title="Performance Optimized Chart"
/>
```

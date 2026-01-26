/**
 * Tooltip Variants Stories
 *
 * Demonstrates all tooltip formatter variants with interactive examples
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TimeSeriesLine } from '../charts/TimeSeriesLine';
import { Column } from '../charts/Column';
import { Donut } from '../charts/Donut';
import type { ChartRow } from '../types/chart';

const meta: Meta = {
  title: 'Charts/Tooltips',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

// Sample data for tooltip examples
const timeSeriesData: ChartRow[] = [
  { date: '2026-01-01', mentions: 120, sentiment: 75 },
  { date: '2026-01-02', mentions: 150, sentiment: 82 },
  { date: '2026-01-03', mentions: 135, sentiment: 68 },
  { date: '2026-01-04', mentions: 170, sentiment: 91 },
  { date: '2026-01-05', mentions: 145, sentiment: 79 },
];

const categoryData: ChartRow[] = [
  { category: 'Product A', sales: 25000, units: 120 },
  { category: 'Product B', sales: 32000, units: 150 },
  { category: 'Product C', sales: 18000, units: 85 },
  { category: 'Product D', sales: 41000, units: 195 },
];

const pieData: ChartRow[] = [
  { category: 'Direct', value: 45 },
  { category: 'Organic Search', value: 30 },
  { category: 'Social', value: 15 },
  { category: 'Referral', value: 10 },
];

const comparisonData: ChartRow[] = [
  { week: 'Week 1', current: 1200, previous: 1100 },
  { week: 'Week 2', current: 1350, previous: 1250 },
  { week: 'Week 3', current: 1180, previous: 1300 },
  { week: 'Week 4', current: 1420, previous: 1280 },
];

/**
 * Default Tooltip
 * Simple tooltip with series name and value
 */
export const DefaultTooltip: Story = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <TimeSeriesLine
        data={timeSeriesData}
        encoding={{ x: 'date', y: 'mentions' }}
        title="Default Tooltip Example"
        subtitle="Hover over data points to see default tooltip"
        format={{ compact: true }}
        tooltip={{
          enabled: true,
          shared: false,
        }}
      />
    </div>
  ),
};

/**
 * Multi-Series Tooltip
 * Shows all series values for a given X-axis point
 */
export const MultiSeriesTooltip: Story = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <TimeSeriesLine
        data={timeSeriesData}
        encoding={{ x: 'date', y: ['mentions', 'sentiment'] }}
        title="Multi-Series Tooltip Example"
        subtitle="Hover to see all series values with formatted date header"
        format={{ compact: true }}
        tooltip={{
          enabled: true,
          shared: true,
        }}
      />
    </div>
  ),
};

/**
 * Percentage Tooltip
 * Shows value with percentage and total
 */
export const PercentageTooltip: Story = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <Donut
        data={pieData}
        encoding={{ x: 'category', y: 'value' }}
        title="Percentage Tooltip Example"
        subtitle="Hover over pie slices to see percentage breakdown"
      />
    </div>
  ),
};

/**
 * Time Breakdown Tooltip - Daily
 * Shows breakdown by day
 */
export const TimeBreakdownDaily: Story = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <TimeSeriesLine
        data={timeSeriesData}
        encoding={{ x: 'date', y: ['mentions', 'sentiment'] }}
        title="Daily Time Breakdown Tooltip"
        subtitle="Custom formatter shows DAY period header"
        format={{ compact: true }}
      />
    </div>
  ),
};

/**
 * Time Breakdown Tooltip - Monthly
 * Shows breakdown by month
 */
export const TimeBreakdownMonthly: Story = {
  render: () => {
    const monthlyData: ChartRow[] = [
      { date: '2026-01-01', mentions: 3500, engagement: 2200 },
      { date: '2026-02-01', mentions: 4200, engagement: 2650 },
      { date: '2026-03-01', mentions: 3800, engagement: 2400 },
      { date: '2026-04-01', mentions: 4500, engagement: 2900 },
    ];

    return (
      <div style={{ width: '100%', height: 400 }}>
        <TimeSeriesLine
          data={monthlyData}
          encoding={{ x: 'date', y: ['mentions', 'engagement'] }}
          title="Monthly Time Breakdown Tooltip"
          subtitle="Custom formatter shows MONTH period header"
          format={{ compact: true }}
        />
      </div>
    );
  },
};

/**
 * Category Comparison Tooltip
 * Shows multiple metrics for categorical data
 */
export const CategoryComparison: Story = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <Column
        data={categoryData}
        encoding={{ x: 'category', y: ['sales', 'units'] }}
        title="Category Comparison Tooltip"
        subtitle="Hover to see sales and units for each product"
        format={{ units: 'kr', compact: true }}
        tooltip={{
          enabled: true,
          shared: true,
        }}
      />
    </div>
  ),
};

/**
 * Formatted Values
 * Shows tooltips with currency and compact formatting
 */
export const FormattedValues: Story = {
  render: () => {
    const revenueData: ChartRow[] = [
      { month: 'Jan', revenue: 125000 },
      { month: 'Feb', revenue: 142000 },
      { month: 'Mar', revenue: 138000 },
      { month: 'Apr', revenue: 156000 },
      { month: 'May', revenue: 171000 },
    ];

    return (
      <div style={{ width: '100%', height: 400 }}>
        <Column
          data={revenueData}
          encoding={{ x: 'month', y: 'revenue' }}
          title="Formatted Value Tooltip"
          subtitle="Values shown as compact currency (125K kr)"
          format={{ units: 'kr', compact: true }}
        />
      </div>
    );
  },
};

/**
 * Decimal Precision
 * Shows tooltips with specific decimal places
 */
export const DecimalPrecision: Story = {
  render: () => {
    const percentData: ChartRow[] = [
      { metric: 'Conversion Rate', value: 3.456 },
      { metric: 'Bounce Rate', value: 42.123 },
      { metric: 'Avg Session', value: 2.789 },
      { metric: 'Page Views', value: 5.234 },
    ];

    return (
      <div style={{ width: '100%', height: 400 }}>
        <Column
          data={percentData}
          encoding={{ x: 'metric', y: 'value' }}
          title="Decimal Precision Tooltip"
          subtitle="Values shown with 2 decimal places and percent symbol"
          format={{ units: '%', decimals: 2 }}
        />
      </div>
    );
  },
};

/**
 * Tooltip Alignment Harness
 * Shows multiple chart types with consistent tooltip styling
 */
export const TooltipAlignmentHarness: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <TimeSeriesLine
          data={timeSeriesData}
          encoding={{ x: 'date', y: ['mentions', 'sentiment'] }}
          title="Line Chart Tooltips"
          height={300}
          format={{ compact: true }}
        />
      </div>
      <div>
        <Column
          data={categoryData}
          encoding={{ x: 'category', y: ['sales', 'units'] }}
          title="Column Chart Tooltips"
          height={300}
          format={{ compact: true }}
        />
      </div>
      <div>
        <Donut
          data={pieData}
          encoding={{ x: 'category', y: 'value' }}
          title="Donut Chart Tooltips"
          height={300}
        />
      </div>
      <div>
        <Column
          data={comparisonData.slice(0, 4)}
          encoding={{ x: 'week', y: ['current', 'previous'] }}
          title="Comparison Tooltips"
          height={300}
          format={{ compact: true }}
        />
      </div>
    </div>
  ),
};

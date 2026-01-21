/**
 * Chart Stories - All chart types with examples
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  TimeSeriesLine,
  Column,
  Bar,
  StackedColumn,
  Donut,
} from '../index';

const meta: Meta = {
  title: 'Charts/Chart Types',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Sample data for time series
const timeSeriesData = [
  { date: '2026-01-01', value: 120 },
  { date: '2026-01-02', value: 150 },
  { date: '2026-01-03', value: 180 },
  { date: '2026-01-04', value: 140 },
  { date: '2026-01-05', value: 200 },
  { date: '2026-01-06', value: 190 },
  { date: '2026-01-07', value: 210 },
];

// Sample data for multi-series time series
const multiSeriesData = [
  { date: '2026-01-01', current: 120, previous: 100 },
  { date: '2026-01-02', current: 150, previous: 110 },
  { date: '2026-01-03', current: 180, previous: 140 },
  { date: '2026-01-04', current: 140, previous: 130 },
  { date: '2026-01-05', current: 200, previous: 170 },
  { date: '2026-01-06', current: 190, previous: 160 },
  { date: '2026-01-07', current: 210, previous: 180 },
];

// Sample data for categories
const categoryData = [
  { category: 'Product A', sales: 450 },
  { category: 'Product B', sales: 380 },
  { category: 'Product C', sales: 520 },
  { category: 'Product D', sales: 290 },
  { category: 'Product E', sales: 410 },
];

// Sample data for stacked columns
const stackedData = [
  { month: 'Jan', online: 150, retail: 200, wholesale: 100 },
  { month: 'Feb', online: 180, retail: 220, wholesale: 120 },
  { month: 'Mar', online: 200, retail: 190, wholesale: 110 },
  { month: 'Apr', online: 220, retail: 210, wholesale: 130 },
  { month: 'May', online: 250, retail: 230, wholesale: 140 },
];

// Sample data for donut
const donutData = [
  { segment: 'Email', value: 350 },
  { segment: 'Social Media', value: 280 },
  { segment: 'Direct', value: 190 },
  { segment: 'Search', value: 240 },
  { segment: 'Referral', value: 140 },
];

/**
 * TimeSeriesLine Examples
 */
export const TimeSeriesLineDefault: StoryObj = {
  render: () => (
    <TimeSeriesLine
      data={timeSeriesData}
      encoding={{ x: 'date', y: 'value' }}
      title="Website Traffic"
      subtitle="Daily unique visitors"
    />
  ),
};

export const TimeSeriesLineMultiSeries: StoryObj = {
  render: () => (
    <TimeSeriesLine
      data={multiSeriesData}
      encoding={{ x: 'date', y: ['current', 'previous'] }}
      title="Sales Comparison"
      subtitle="Current period vs previous period"
      format={{ units: 'kr', decimals: 0 }}
    />
  ),
};

export const TimeSeriesLineFormatted: StoryObj = {
  render: () => (
    <TimeSeriesLine
      data={timeSeriesData}
      encoding={{ x: 'date', y: 'value' }}
      title="Revenue"
      subtitle="Daily revenue in thousands"
      format={{ units: 'kr', decimals: 2, compact: true }}
    />
  ),
};

/**
 * Column Chart Examples
 */
export const ColumnDefault: StoryObj = {
  render: () => (
    <Column
      data={categoryData}
      encoding={{ x: 'category', y: 'sales' }}
      title="Product Sales"
      subtitle="Units sold by product"
    />
  ),
};

export const ColumnFormatted: StoryObj = {
  render: () => (
    <Column
      data={categoryData}
      encoding={{ x: 'category', y: 'sales' }}
      title="Product Revenue"
      subtitle="Revenue by product (in thousands)"
      format={{ units: 'kr', decimals: 0, compact: true }}
    />
  ),
};

/**
 * Bar Chart Examples
 */
export const BarDefault: StoryObj = {
  render: () => (
    <Bar
      data={categoryData}
      encoding={{ x: 'category', y: 'sales' }}
      title="Product Sales"
      subtitle="Units sold by product (horizontal)"
    />
  ),
};

export const BarFormatted: StoryObj = {
  render: () => (
    <Bar
      data={categoryData}
      encoding={{ x: 'category', y: 'sales' }}
      title="Product Performance"
      subtitle="Sales performance metrics"
      format={{ units: 'units', decimals: 0 }}
      height={500}
    />
  ),
};

/**
 * StackedColumn Examples
 */
export const StackedColumnDefault: StoryObj = {
  render: () => (
    <StackedColumn
      data={stackedData}
      encoding={{ x: 'month', y: ['online', 'retail', 'wholesale'] }}
      title="Sales Channels"
      subtitle="Revenue by channel over time"
    />
  ),
};

export const StackedColumnFormatted: StoryObj = {
  render: () => (
    <StackedColumn
      data={stackedData}
      encoding={{ x: 'month', y: ['online', 'retail', 'wholesale'] }}
      title="Channel Revenue"
      subtitle="Revenue breakdown by sales channel"
      format={{ units: 'kr', decimals: 0, compact: true }}
    />
  ),
};

/**
 * Donut Chart Examples
 */
export const DonutDefault: StoryObj = {
  render: () => (
    <Donut
      data={donutData}
      encoding={{ x: 'segment', y: 'value' }}
      title="Traffic Sources"
      subtitle="Visitor distribution by source"
    />
  ),
};

export const DonutFormatted: StoryObj = {
  render: () => (
    <Donut
      data={donutData}
      encoding={{ x: 'segment', y: 'value' }}
      title="Traffic Distribution"
      subtitle="Total visitors: 1,200"
      format={{ units: 'visitors', decimals: 0 }}
    />
  ),
};

/**
 * Chart States
 */
export const ChartLoading: StoryObj = {
  render: () => (
    <TimeSeriesLine
      data={timeSeriesData}
      encoding={{ x: 'date', y: 'value' }}
      title="Loading Chart"
      loading={true}
    />
  ),
};

export const ChartEmpty: StoryObj = {
  render: () => (
    <TimeSeriesLine
      data={[]}
      encoding={{ x: 'date', y: 'value' }}
      title="Empty Chart"
      subtitle="No data available"
    />
  ),
};

export const ChartError: StoryObj = {
  render: () => (
    <TimeSeriesLine
      data={timeSeriesData}
      encoding={{ x: 'date', y: 'value' }}
      title="Error Chart"
      error="Failed to load data. Please try again."
    />
  ),
};

/**
 * Chart Alignment Harness - All charts at same size for visual consistency
 */
export const ChartAlignmentHarness: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '32px', color: 'var(--text-neutral-default)' }}>
        Chart Alignment Harness
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-neutral-subdued)', marginBottom: '32px' }}>
        All chart types displayed at the same size to verify visual consistency (padding, font sizes, legend placement).
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-neutral-default)' }}>
            TimeSeriesLine
          </h3>
          <TimeSeriesLine
            data={timeSeriesData}
            encoding={{ x: 'date', y: 'value' }}
            title="Website Traffic"
            height={300}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-neutral-default)' }}>
            Column
          </h3>
          <Column
            data={categoryData}
            encoding={{ x: 'category', y: 'sales' }}
            title="Product Sales"
            height={300}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-neutral-default)' }}>
            Bar
          </h3>
          <Bar
            data={categoryData}
            encoding={{ x: 'category', y: 'sales' }}
            title="Product Sales"
            height={300}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-neutral-default)' }}>
            StackedColumn
          </h3>
          <StackedColumn
            data={stackedData}
            encoding={{ x: 'month', y: ['online', 'retail', 'wholesale'] }}
            title="Sales Channels"
            height={300}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-neutral-default)' }}>
            Donut
          </h3>
          <Donut
            data={donutData}
            encoding={{ x: 'segment', y: 'value' }}
            title="Traffic Sources"
            height={300}
          />
        </div>
      </div>
    </div>
  ),
};

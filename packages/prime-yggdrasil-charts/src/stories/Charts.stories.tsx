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

// Generate 30 days of media monitoring data
function generate30DayData(baseValue: number, variance: number) {
  const data = [];
  const today = new Date('2026-01-30');

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const value = Math.max(0, Math.round(baseValue + (Math.random() - 0.5) * variance));
    data.push({
      date: date.toISOString().split('T')[0],
      value,
    });
  }

  return data;
}

// Sample data for time series (30 days of media mentions)
const timeSeriesData = generate30DayData(450, 300);

// Sample data for multi-series time series (30 days)
const multiSeriesData = (() => {
  const data = [];
  const today = new Date('2026-01-30');

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const online = Math.max(0, Math.round(320 + (Math.random() - 0.5) * 200));
    const print = Math.max(0, Math.round(180 + (Math.random() - 0.5) * 120));
    const broadcast = Math.max(0, Math.round(95 + (Math.random() - 0.5) * 80));

    data.push({
      date: date.toISOString().split('T')[0],
      online,
      print,
      broadcast,
    });
  }

  return data;
})();

// Sample data for categories (media sources)
const categoryData = [
  { source: 'Online News', mentions: 1250 },
  { source: 'Print Media', mentions: 780 },
  { source: 'Broadcast', mentions: 520 },
  { source: 'Social Media', mentions: 2100 },
  { source: 'Blogs', mentions: 410 },
];

// Sample data for stacked columns (content types by week)
const stackedData = [
  { week: 'Week 1', articles: 320, posts: 850, videos: 45 },
  { week: 'Week 2', articles: 380, posts: 920, videos: 52 },
  { week: 'Week 3', articles: 410, posts: 1050, videos: 61 },
  { week: 'Week 4', articles: 350, posts: 890, videos: 48 },
];

// Sample data for donut (sentiment distribution)
const donutData = [
  { sentiment: 'Positive', mentions: 1240 },
  { sentiment: 'Neutral', mentions: 1850 },
  { sentiment: 'Negative', mentions: 620 },
];

/**
 * TimeSeriesLine Examples
 */
export const TimeSeriesLineDefault: StoryObj = {
  render: () => (
    <TimeSeriesLine
      data={timeSeriesData}
      encoding={{ x: 'date', y: 'value' }}
      title="Media Mentions Over Time"
      subtitle="Last 30 days"
      format={{ units: 'mentions', compact: true }}
    />
  ),
};

export const TimeSeriesLineMultiSeries: StoryObj = {
  render: () => (
    <TimeSeriesLine
      data={multiSeriesData}
      encoding={{ x: 'date', y: ['online', 'print', 'broadcast'] }}
      title="Mentions by Media Type"
      subtitle="Last 30 days - Online vs Print vs Broadcast"
      format={{ units: 'mentions', compact: true }}
    />
  ),
};

export const TimeSeriesLineFormatted: StoryObj = {
  render: () => (
    <TimeSeriesLine
      data={timeSeriesData}
      encoding={{ x: 'date', y: 'value' }}
      title="Daily Media Coverage"
      subtitle="Total mentions across all channels"
      format={{ units: 'mentions', decimals: 0, compact: true }}
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
      encoding={{ x: 'source', y: 'mentions' }}
      title="Mentions by Source"
      subtitle="Last 30 days"
      format={{ units: 'mentions', compact: true }}
    />
  ),
};

export const ColumnFormatted: StoryObj = {
  render: () => (
    <Column
      data={categoryData}
      encoding={{ x: 'source', y: 'mentions' }}
      title="Media Coverage by Channel"
      subtitle="Total mentions per source type"
      format={{ units: 'mentions', decimals: 0, compact: true }}
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
      encoding={{ x: 'source', y: 'mentions' }}
      title="Source Comparison"
      subtitle="Horizontal view of mentions by source"
      format={{ units: 'mentions', compact: true }}
    />
  ),
};

export const BarFormatted: StoryObj = {
  render: () => (
    <Bar
      data={categoryData}
      encoding={{ x: 'source', y: 'mentions' }}
      title="Top Media Sources"
      subtitle="Ranked by total mentions"
      format={{ units: 'mentions', decimals: 0 }}
      height={400}
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
      encoding={{ x: 'week', y: ['articles', 'posts', 'videos'] }}
      title="Content Types by Week"
      subtitle="Distribution of content formats"
      format={{ units: 'items', compact: true }}
    />
  ),
};

export const StackedColumnFormatted: StoryObj = {
  render: () => (
    <StackedColumn
      data={stackedData}
      encoding={{ x: 'week', y: ['articles', 'posts', 'videos'] }}
      title="Weekly Content Breakdown"
      subtitle="Articles, posts, and videos published per week"
      format={{ units: 'items', decimals: 0, compact: true }}
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
      encoding={{ x: 'sentiment', y: 'mentions' }}
      title="Sentiment Distribution"
      subtitle="Overall sentiment across all mentions"
    />
  ),
};

export const DonutFormatted: StoryObj = {
  render: () => (
    <Donut
      data={donutData}
      encoding={{ x: 'sentiment', y: 'mentions' }}
      title="Sentiment Analysis"
      subtitle="Total: 3,710 mentions"
      format={{ units: 'mentions', decimals: 0 }}
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
            data={timeSeriesData.slice(0, 14)}
            encoding={{ x: 'date', y: 'value' }}
            title="Media Mentions"
            subtitle="Last 14 days"
            format={{ units: 'mentions', compact: true }}
            height={300}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-neutral-default)' }}>
            Column
          </h3>
          <Column
            data={categoryData}
            encoding={{ x: 'source', y: 'mentions' }}
            title="Mentions by Source"
            format={{ units: 'mentions', compact: true }}
            height={300}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-neutral-default)' }}>
            Bar
          </h3>
          <Bar
            data={categoryData}
            encoding={{ x: 'source', y: 'mentions' }}
            title="Source Ranking"
            format={{ units: 'mentions', compact: true }}
            height={300}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-neutral-default)' }}>
            StackedColumn
          </h3>
          <StackedColumn
            data={stackedData}
            encoding={{ x: 'week', y: ['articles', 'posts', 'videos'] }}
            title="Content Types"
            format={{ units: 'items', compact: true }}
            height={300}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px', color: 'var(--text-neutral-default)' }}>
            Donut
          </h3>
          <Donut
            data={donutData}
            encoding={{ x: 'sentiment', y: 'mentions' }}
            title="Sentiment"
            height={300}
          />
        </div>
      </div>
    </div>
  ),
};

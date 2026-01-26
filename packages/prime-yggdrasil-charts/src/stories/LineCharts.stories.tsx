/**
 * Line Chart Stories
 *
 * Line charts are best for showing trends over time.
 * - Single Line: Use boolean primary color for single metric tracking
 * - Multi Line: Use category palette for comparing multiple series
 * - Sentiment Line: Use sentiment palette for positive/neutral/negative trends
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimeSeriesLine } from '../index';
import {
  getSentimentPalette,
  getBooleanPalette,
} from '../theme/highcharts-theme';

const meta: Meta = {
  title: 'Charts/Line Charts',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// =============================================================================
// DATA GENERATORS
// =============================================================================

function generate30DaySingleSeries(baseValue: number, variance: number) {
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

function generate30DayMultiSeries() {
  const data = [];
  const today = new Date('2026-01-30');

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      online: Math.max(0, Math.round(320 + (Math.random() - 0.5) * 200)),
      print: Math.max(0, Math.round(180 + (Math.random() - 0.5) * 120)),
      broadcast: Math.max(0, Math.round(95 + (Math.random() - 0.5) * 80)),
      social: Math.max(0, Math.round(450 + (Math.random() - 0.5) * 300)),
      blogs: Math.max(0, Math.round(65 + (Math.random() - 0.5) * 50)),
    });
  }

  return data;
}

function generate30DaySentimentData() {
  const data = [];
  const today = new Date('2026-01-30');

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      positive: Math.max(0, Math.round(120 + (Math.random() - 0.5) * 80)),
      neutral: Math.max(0, Math.round(200 + (Math.random() - 0.5) * 100)),
      negative: Math.max(0, Math.round(45 + (Math.random() - 0.5) * 40)),
    });
  }

  return data;
}

// Pre-generate data so it's consistent across renders
const singleLineData = generate30DaySingleSeries(450, 300);
const multiLineData = generate30DayMultiSeries();
const sentimentLineData = generate30DaySentimentData();

// =============================================================================
// STORIES
// =============================================================================

/**
 * Single line chart with boolean primary color.
 * Best for tracking a single metric over time.
 * Uses smooth curves (spline) by default.
 */
export const LineSingle: StoryObj = {
  name: 'Single Line',
  render: () => {
    const booleanPalette = getBooleanPalette();
    return (
      <TimeSeriesLine
        data={singleLineData}
        encoding={{ x: 'date', y: 'value', colors: [booleanPalette.primary] }}
        title="Media Mentions"
        subtitle="Daily mentions over the last 30 days"
        format={{ compact: true }}
        legend={false}
      />
    );
  },
};

/**
 * Single line chart with angular (non-smoothed) lines.
 * Toggle smooth={false} to disable spline interpolation.
 */
export const LineSingleAngular: StoryObj = {
  name: 'Single Line (Angular)',
  render: () => {
    const booleanPalette = getBooleanPalette();
    return (
      <TimeSeriesLine
        data={singleLineData}
        encoding={{ x: 'date', y: 'value', colors: [booleanPalette.primary] }}
        title="Media Mentions"
        subtitle="Angular lines (smooth disabled)"
        format={{ compact: true }}
        legend={false}
        smooth={false}
      />
    );
  },
};

/**
 * Multi-line chart with category palette (5 series).
 * Best for comparing multiple metrics over the same time period.
 * Colors are automatically assigned from the category palette.
 */
export const LineMulti: StoryObj = {
  name: 'Multi Line (5 Series)',
  render: () => (
    <TimeSeriesLine
      data={multiLineData}
      encoding={{ x: 'date', y: ['online', 'print', 'broadcast', 'social', 'blogs'] }}
      title="Media Coverage by Source"
      subtitle="Daily mentions across 5 media channels"
      format={{ compact: true }}
    />
  ),
};

/**
 * Sentiment line chart with sentiment palette.
 * Uses green for positive, gray for neutral, red for negative.
 * Best for visualizing sentiment trends over time.
 */
export const LineSentiment: StoryObj = {
  name: 'Sentiment Line',
  render: () => {
    const sentimentPalette = getSentimentPalette();
    return (
      <TimeSeriesLine
        data={sentimentLineData}
        encoding={{
          x: 'date',
          y: ['positive', 'neutral', 'negative'],
          colors: [sentimentPalette.positive, sentimentPalette.neutral, sentimentPalette.negative],
        }}
        title="Sentiment Trends"
        subtitle="Daily sentiment distribution over 30 days"
        format={{ compact: true }}
      />
    );
  },
};

/**
 * Line chart showing loading state with skeleton placeholder.
 */
export const LineLoading: StoryObj = {
  name: 'Loading State',
  render: () => (
    <TimeSeriesLine
      data={[]}
      encoding={{ x: 'date', y: 'value' }}
      title="Media Mentions"
      loading={true}
    />
  ),
};

/**
 * Line chart showing empty state when no data is available.
 */
export const LineEmpty: StoryObj = {
  name: 'Empty State',
  render: () => (
    <TimeSeriesLine
      data={[]}
      encoding={{ x: 'date', y: 'value' }}
      title="Media Mentions"
      subtitle="No data available for this period"
    />
  ),
};

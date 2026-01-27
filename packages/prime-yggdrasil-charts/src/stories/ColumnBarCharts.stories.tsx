/**
 * Column & Bar Chart Stories
 *
 * Column charts (vertical) and bar charts (horizontal) for categorical comparisons.
 * - Aggregated: Single color for one-dimensional data
 * - Grouped: Category palette for multi-series comparisons
 * - Stacked: Show composition/parts of a whole
 * - Ordered/Unordered: Bar charts with specific ordering and emphasis
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Column, Bar, StackedColumn } from '../index';
import { getBooleanPalette } from '../theme/highcharts-theme';

const meta: Meta = {
  title: 'Charts/Column & Bar Charts',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// =============================================================================
// DATA
// =============================================================================

// Aggregated column data (30 days simplified to weekly)
const aggregatedColumnData = [
  { period: 'Week 1', mentions: 2850 },
  { period: 'Week 2', mentions: 3120 },
  { period: 'Week 3', mentions: 2680 },
  { period: 'Week 4', mentions: 3450 },
];

// Grouped column data (12 months, 3 series)
const groupedColumnData = [
  { month: 'Jan', articles: 180, social: 520, broadcast: 65 },
  { month: 'Feb', articles: 165, social: 480, broadcast: 58 },
  { month: 'Mar', articles: 210, social: 610, broadcast: 72 },
  { month: 'Apr', articles: 195, social: 550, broadcast: 68 },
  { month: 'May', articles: 225, social: 680, broadcast: 85 },
  { month: 'Jun', articles: 240, social: 720, broadcast: 92 },
  { month: 'Jul', articles: 190, social: 590, broadcast: 75 },
  { month: 'Aug', articles: 175, social: 510, broadcast: 62 },
  { month: 'Sep', articles: 215, social: 640, broadcast: 78 },
  { month: 'Oct', articles: 250, social: 750, broadcast: 95 },
  { month: 'Nov', articles: 230, social: 690, broadcast: 88 },
  { month: 'Dec', articles: 200, social: 600, broadcast: 70 },
];

// Stacked column data
const stackedColumnData = [
  { week: 'Week 1', articles: 320, posts: 850, videos: 45 },
  { week: 'Week 2', articles: 380, posts: 920, videos: 52 },
  { week: 'Week 3', articles: 410, posts: 1050, videos: 61 },
  { week: 'Week 4', articles: 350, posts: 890, videos: 48 },
];

// Bar chart data - ordered by value (largest at top)
const orderedBarData = [
  { source: 'Social Media', mentions: 4250 },
  { source: 'Online News', mentions: 2180 },
  { source: 'Print Media', mentions: 890 },
  { source: 'Broadcast', mentions: 520 },
  { source: 'Blogs', mentions: 310 },
];

// Bar chart data - unordered with "You" emphasized
const unorderedBarData = [
  { competitor: 'Competitor A', mentions: 1850, isYou: false },
  { competitor: 'Competitor B', mentions: 2100, isYou: false },
  { competitor: 'You', mentions: 3200, isYou: true },
  { competitor: 'Competitor C', mentions: 1400, isYou: false },
  { competitor: 'Competitor D', mentions: 980, isYou: false },
];

// Stacked bar data (engagement breakdown)
const stackedBarData = [
  { platform: 'Twitter/X', shares: 4500, likes: 12000, comments: 2800 },
  { platform: 'LinkedIn', shares: 1200, likes: 8500, comments: 1500 },
  { platform: 'Facebook', shares: 2100, likes: 15000, comments: 3200 },
  { platform: 'Instagram', shares: 800, likes: 22000, comments: 4100 },
];

// =============================================================================
// COLUMN CHART STORIES
// =============================================================================

/**
 * Aggregated column chart with single boolean primary color.
 * Best for showing a single metric across time periods or categories.
 */
export const ColumnAggregated: StoryObj = {
  name: 'Column - Aggregated',
  render: () => {
    const booleanPalette = getBooleanPalette();
    return (
      <Column
        data={aggregatedColumnData}
        encoding={{ x: 'period', y: 'mentions', colors: [booleanPalette.primary] }}
        title="Weekly Media Mentions"
        subtitle="Total mentions aggregated by week"
        format={{ compact: true }}
        legend={false}
      />
    );
  },
};

/**
 * Grouped column chart with category palette.
 * Best for comparing multiple series across categories.
 * Shows 12 months with 3 columns per month.
 */
export const ColumnGrouped: StoryObj = {
  name: 'Column - Grouped (12 Months)',
  render: () => (
    <Column
      data={groupedColumnData}
      encoding={{ x: 'month', y: ['articles', 'social', 'broadcast'] }}
      title="Media Coverage by Type"
      subtitle="Monthly breakdown across 3 media channels in 2025"
      format={{ compact: true }}
    />
  ),
};

/**
 * Stacked column chart with category palette.
 * Best for showing composition/parts of a whole.
 * Displays totals at the top of each stack.
 */
export const ColumnStacked: StoryObj = {
  name: 'Column - Stacked',
  render: () => (
    <StackedColumn
      data={stackedColumnData}
      encoding={{ x: 'week', y: ['articles', 'posts', 'videos'] }}
      title="Content Types by Week"
      subtitle="Distribution of content formats"
      format={{ compact: true }}
    />
  ),
};

// =============================================================================
// BAR CHART STORIES
// =============================================================================

/**
 * Ordered bar chart with boolean secondary color.
 * Bars are ordered from largest at top to smallest at bottom.
 * Best for ranking comparisons.
 */
export const BarOrdered: StoryObj = {
  name: 'Bar - Ordered (Ranked)',
  render: () => {
    const booleanPalette = getBooleanPalette();
    return (
      <Bar
        data={orderedBarData}
        encoding={{ x: 'source', y: 'mentions', colors: [booleanPalette.secondary] }}
        title="Top Media Sources"
        subtitle="Ranked by total mentions (highest to lowest)"
        format={{ compact: true }}
        legend={false}
      />
    );
  },
};

/**
 * Unordered bar chart with emphasis on "You".
 * Uses diminish color for competitors, primaryEmphasis for the highlighted item.
 * Best for competitive benchmarking.
 */
export const BarUnordered: StoryObj = {
  name: 'Bar - Emphasis (You vs Competitors)',
  render: () => {
    const booleanPalette = getBooleanPalette();
    // Create custom colors array: primaryEmphasis for "You", diminish for others
    const colors = unorderedBarData.map((d) =>
      d.isYou ? booleanPalette.primaryEmphasis : booleanPalette.diminish
    );

    return (
      <Bar
        data={unorderedBarData}
        encoding={{ x: 'competitor', y: 'mentions', colors }}
        title="Share of Voice"
        subtitle="Your brand vs competitors"
        format={{ compact: true }}
        legend={false}
      />
    );
  },
};

/**
 * Stacked bar chart with category palette.
 * Shows engagement breakdown (shares, likes, comments) per platform.
 * Displays totals at the end of each bar.
 */
export const BarStacked: StoryObj = {
  name: 'Bar - Stacked (Engagement)',
  render: () => (
    <StackedColumn
      data={stackedBarData}
      encoding={{ x: 'platform', y: ['shares', 'likes', 'comments'] }}
      title="Social Engagement Breakdown"
      subtitle="Shares, likes, and comments by platform"
      format={{ compact: true }}
    />
  ),
};


/**
 * Donut Chart Stories
 *
 * Donut charts for showing proportions and composition.
 * - Category: Use category palette for multiple segments
 * - Sentiment: Use sentiment palette for positive/neutral/negative
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Donut } from '../index';
import { getSentimentPalette } from '../theme/highcharts-theme';

const meta: Meta = {
  title: 'Charts/Donut Charts',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// =============================================================================
// DATA
// =============================================================================

// Category donut data (6 categories including "Other")
const categoryDonutData = [
  { source: 'Online News', mentions: 2180 },
  { source: 'Social Media', mentions: 4250 },
  { source: 'Print Media', mentions: 890 },
  { source: 'Broadcast', mentions: 520 },
  { source: 'Blogs', mentions: 310 },
  { source: 'Other', mentions: 450 },
];

// Sentiment donut data
const sentimentDonutData = [
  { sentiment: 'Positive', mentions: 1240 },
  { sentiment: 'Neutral', mentions: 1850 },
  { sentiment: 'Negative', mentions: 620 },
];

// =============================================================================
// STORIES
// =============================================================================

/**
 * Category donut chart with category palette.
 * Shows distribution across 6 categories including "Other".
 * Best for showing composition when you have multiple categories.
 */
export const DonutCategory: StoryObj = {
  name: 'Donut - Category (6 Segments)',
  render: () => (
    <Donut
      data={categoryDonutData}
      encoding={{ x: 'source', y: 'mentions' }}
      title="Media Coverage by Source"
      subtitle="Distribution across 6 media channels"
      format={{ compact: true }}
    />
  ),
};

/**
 * Sentiment donut chart with sentiment palette.
 * Uses green for positive, gray for neutral, red for negative.
 * Best for visualizing sentiment distribution.
 */
export const DonutSentiment: StoryObj = {
  name: 'Donut - Sentiment',
  render: () => {
    const sentimentPalette = getSentimentPalette();
    return (
      <Donut
        data={sentimentDonutData}
        encoding={{
          x: 'sentiment',
          y: 'mentions',
          colors: [sentimentPalette.positive, sentimentPalette.neutral, sentimentPalette.negative],
        }}
        title="Sentiment Distribution"
        subtitle="Overall sentiment across all mentions"
        format={{ compact: true }}
      />
    );
  },
};

/**
 * Donut chart showing total in center.
 * Note: Center label feature may require additional implementation.
 */
export const DonutWithTotal: StoryObj = {
  name: 'Donut - With Total',
  render: () => {
    const total = sentimentDonutData.reduce((sum, d) => sum + d.mentions, 0);
    return (
      <Donut
        data={sentimentDonutData}
        encoding={{ x: 'sentiment', y: 'mentions' }}
        title="Sentiment Analysis"
        subtitle={`Total: ${total.toLocaleString()} mentions`}
        format={{ compact: true }}
      />
    );
  },
};

/**
 * Donut chart in loading state.
 */
export const DonutLoading: StoryObj = {
  name: 'Loading State',
  render: () => (
    <Donut
      data={[]}
      encoding={{ x: 'sentiment', y: 'mentions' }}
      title="Sentiment Distribution"
      loading={true}
    />
  ),
};

/**
 * Donut chart in empty state.
 */
export const DonutEmpty: StoryObj = {
  name: 'Empty State',
  render: () => (
    <Donut
      data={[]}
      encoding={{ x: 'sentiment', y: 'mentions' }}
      title="Sentiment Distribution"
      subtitle="No data available"
    />
  ),
};

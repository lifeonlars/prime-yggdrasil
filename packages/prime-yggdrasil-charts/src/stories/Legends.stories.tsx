/**
 * Legend Stories
 *
 * All legend variants: horizontal, vertical with numbers,
 * line+symbol, sentiment, and scale legends.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChartLegend } from '../legends/ChartLegend';
import { ScaleLegend } from '../legends/ScaleLegend';
import type { LegendItem, ScaleLegendRange } from '../types/chart';
import { getCategoryPalette, getSentimentPalette, getSequentialPalette } from '../theme/highcharts-theme';

const meta: Meta = {
  title: 'Legends/Chart Legends',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// =============================================================================
// DATA
// =============================================================================

const categoryPalette = getCategoryPalette();
const sentimentPalette = getSentimentPalette();
const sequentialPalette = getSequentialPalette();

const cityItems: LegendItem[] = [
  { label: 'Stockholm', color: categoryPalette[0], value: 350, percentage: 35 },
  { label: 'Oslo', color: categoryPalette[1], value: 270, percentage: 27 },
  { label: 'Copenhagen', color: categoryPalette[2], value: 155, percentage: 15.5 },
  { label: 'Helsinki', color: categoryPalette[3], value: 125, percentage: 12.5 },
  { label: 'Reykjavík', color: categoryPalette[4], value: 80, percentage: 8 },
  { label: 'Other', color: '#C4C2C5', value: 20, percentage: 2 },
];

const sentimentItems: LegendItem[] = [
  { label: 'Positive', color: sentimentPalette.positive, marker: 'triangle', value: 500, percentage: 50 },
  { label: 'Neutral', color: sentimentPalette.neutral, marker: 'circle', value: 330, percentage: 33 },
  { label: 'Negative', color: sentimentPalette.negative, marker: 'triangle', value: 125, percentage: 12.5 },
  { label: 'No sentiment', color: '#C4C2C5', marker: 'circle', value: 45, percentage: 4.5 },
];

const entityItems: LegendItem[] = [
  { label: 'Person', color: categoryPalette[0] },
  { label: 'Organization', color: categoryPalette[1] },
  { label: 'Location', color: categoryPalette[2] },
];

const periodItems: LegendItem[] = [
  { label: 'Current period', color: categoryPalette[0] },
  { label: 'Previous period', color: categoryPalette[3] },
];

const lineItems: LegendItem[] = [
  { label: 'Stockholm', color: categoryPalette[0], marker: 'circle' },
  { label: 'Oslo', color: categoryPalette[1], marker: 'square' },
  { label: 'Copenhagen', color: categoryPalette[2], marker: 'triangle' },
  { label: 'Helsinki', color: categoryPalette[3], marker: 'diamond' },
  { label: 'Reykjavík', color: categoryPalette[4], marker: 'triangle' },
];

const sentimentLineItems: LegendItem[] = [
  { label: 'Positive', color: sentimentPalette.positive, marker: 'triangle' },
  { label: 'Neutral', color: sentimentPalette.neutral, marker: 'circle' },
  { label: 'Negative', color: sentimentPalette.negative, marker: 'triangle' },
];

const scaleRanges: ScaleLegendRange[] = [
  { label: '< 10', color: sequentialPalette[0] },
  { label: '10 - 20', color: sequentialPalette[1] },
  { label: '20 - 30', color: sequentialPalette[2] },
  { label: '30 - 40', color: sequentialPalette[3] },
  { label: '40 - 50', color: sequentialPalette[4] },
  { label: '> 50', color: sequentialPalette[5] },
];

// =============================================================================
// STORIES
// =============================================================================

/**
 * Vertical legend with values and percentages (donut chart style)
 */
export const VerticalWithNumbers: StoryObj = {
  render: () => (
    <ChartLegend
      items={cityItems}
      layout="vertical"
      showValues
      showPercentages
    />
  ),
};

/**
 * Vertical sentiment legend with values, percentages, and separator
 */
export const VerticalSentiment: StoryObj = {
  render: () => (
    <ChartLegend
      items={sentimentItems}
      layout="vertical"
      showValues
      showPercentages
      separatorBefore={3}
    />
  ),
};

/**
 * Vertical legend with circles only (simple category)
 */
export const VerticalSimple: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px' }}>
      <ChartLegend
        items={cityItems.slice(0, 5)}
        layout="vertical"
      />
    </div>
  ),
};

/**
 * Horizontal legend with circles (bar/column charts)
 */
export const HorizontalCircles: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ChartLegend items={periodItems} />
      <ChartLegend items={cityItems.slice(0, 5)} />
      <ChartLegend items={entityItems} />
    </div>
  ),
};

/**
 * Horizontal legend with line + symbol markers (line charts)
 */
export const HorizontalLineSymbols: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ChartLegend items={lineItems} />
      <ChartLegend items={sentimentLineItems} />
    </div>
  ),
};

/**
 * Scale legend for heatmaps/bubble charts
 */
export const ScaleRange: StoryObj = {
  render: () => (
    <ScaleLegend
      title="Number of hits"
      ranges={scaleRanges}
    />
  ),
};

/**
 * All legend variants side by side
 */
export const AllVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
      <div>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>
          Vertical with numbers
        </h3>
        <ChartLegend
          items={cityItems}
          layout="vertical"
          showValues
          showPercentages
        />
      </div>
      <div>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>
          Sentiment with separator
        </h3>
        <ChartLegend
          items={sentimentItems}
          layout="vertical"
          showValues
          showPercentages
          separatorBefore={3}
        />
      </div>
      <div>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>
          Simple vertical
        </h3>
        <ChartLegend
          items={cityItems.slice(0, 5)}
          layout="vertical"
        />
      </div>
      <div>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>
          Scale legend
        </h3>
        <ScaleLegend
          title="Number of hits"
          ranges={scaleRanges}
        />
      </div>
      <div style={{ width: '100%' }}>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>
          Horizontal variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ChartLegend items={periodItems} />
          <ChartLegend items={entityItems} />
          <ChartLegend items={lineItems} />
          <ChartLegend items={sentimentLineItems} />
        </div>
      </div>
    </div>
  ),
};

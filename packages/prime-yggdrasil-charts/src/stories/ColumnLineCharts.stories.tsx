/**
 * ColumnLine Chart Stories
 *
 * Combined column + line charts for comparing two related metrics,
 * such as current vs previous period comparisons.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColumnLine } from '../charts/ColumnLine';

const meta: Meta = {
  title: 'Charts/Column + Line Charts',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// =============================================================================
// DATA
// =============================================================================

// Media exposure over time - current period (columns) vs previous period (line)
const mediaExposureData = [
  { date: 'May 1', selected: 25, previous: 50 },
  { date: 'May 2', selected: 55, previous: 120 },
  { date: 'May 3', selected: 110, previous: 170 },
  { date: 'May 4', selected: 25, previous: 130 },
  { date: 'May 5', selected: 30, previous: 120 },
  { date: 'May 6', selected: 280, previous: 95 },
  { date: 'May 7', selected: 25, previous: 30 },
  { date: 'May 8', selected: 190, previous: 155 },
  { date: 'May 9', selected: 200, previous: 120 },
  { date: 'May 10', selected: 80, previous: 150 },
  { date: 'May 11', selected: 150, previous: 180 },
  { date: 'May 12', selected: 55, previous: 240 },
  { date: 'May 13', selected: 80, previous: 175 },
  { date: 'May 14', selected: 115, previous: 130 },
  { date: 'May 15', selected: 170, previous: 200 },
  { date: 'May 16', selected: 200, previous: 210 },
  { date: 'May 17', selected: 50, previous: 140 },
  { date: 'May 18', selected: 140, previous: 100 },
  { date: 'May 19', selected: 280, previous: 200 },
  { date: 'May 20', selected: 50, previous: 80 },
  { date: 'May 21', selected: 50, previous: 80 },
  { date: 'May 22', selected: 80, previous: 140 },
  { date: 'May 23', selected: 80, previous: 200 },
  { date: 'May 24', selected: 200, previous: 175 },
  { date: 'May 25', selected: 70, previous: 80 },
  { date: 'May 26', selected: 230, previous: 240 },
  { date: 'May 27', selected: 200, previous: 150 },
  { date: 'May 28', selected: 220, previous: 195 },
  { date: 'May 29', selected: 150, previous: 200 },
  { date: 'May 30', selected: 80, previous: 100 },
];

// =============================================================================
// STORIES
// =============================================================================

/**
 * Media exposure over time with period comparison
 * Teal columns = selected period, purple line = previous period
 */
export const MediaExposure: StoryObj = {
  render: () => (
    <ColumnLine
      data={mediaExposureData}
      encoding={{
        x: 'date',
        y: ['selected', 'previous'],
        colors: ['#3EADC9', '#9B91CD'],
      }}
      columnFields={['selected']}
      lineFields={['previous']}
      height={400}
      ariaLabel="Media exposure over time comparing selected and previous period"
    />
  ),
};

/**
 * Basic two-series column + line with defaults
 * First y field auto-assigned to column, second to line
 */
export const AutoAssignment: StoryObj = {
  render: () => (
    <ColumnLine
      data={[
        { month: 'Jan', revenue: 45000, target: 40000 },
        { month: 'Feb', revenue: 52000, target: 42000 },
        { month: 'Mar', revenue: 48000, target: 44000 },
        { month: 'Apr', revenue: 61000, target: 46000 },
        { month: 'May', revenue: 55000, target: 48000 },
        { month: 'Jun', revenue: 67000, target: 50000 },
      ]}
      encoding={{
        x: 'month',
        y: ['revenue', 'target'],
      }}
      title="Revenue vs Target"
      height={400}
      format={{ compact: true }}
      ariaLabel="Revenue vs target by month"
    />
  ),
};

/**
 * Loading state
 */
export const Loading: StoryObj = {
  render: () => (
    <ColumnLine
      data={[]}
      encoding={{ x: 'date', y: ['a', 'b'] }}
      loading
      height={400}
    />
  ),
};

/**
 * Empty state
 */
export const Empty: StoryObj = {
  render: () => (
    <ColumnLine
      data={[]}
      encoding={{ x: 'date', y: ['a', 'b'] }}
      height={400}
    />
  ),
};

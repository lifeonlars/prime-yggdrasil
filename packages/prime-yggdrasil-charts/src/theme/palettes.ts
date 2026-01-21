/**
 * Palette utilities for Prime Yggdrasil Charts
 *
 * Provides helper functions for accessing chart color palettes and applying them
 * to different visualization contexts.
 */

import {
  getCategoryPalette,
  getSentimentPalette,
  getBooleanPalette,
  getSequentialPalette,
} from './highcharts-theme';

export type PaletteType = 'category' | 'sentiment' | 'boolean' | 'sequential';

export interface PaletteInfo {
  type: PaletteType;
  colors: string[];
  description: string;
}

/**
 * Get all available chart palettes with metadata
 */
export function getAllPalettes(): Record<PaletteType, PaletteInfo> {
  const category = getCategoryPalette();
  const sentiment = getSentimentPalette();
  const boolean = getBooleanPalette();
  const sequential = getSequentialPalette();

  return {
    category: {
      type: 'category',
      colors: category,
      description:
        'Multi-series categorical data - 12 distinct colors for different categories',
    },
    sentiment: {
      type: 'sentiment',
      colors: [
        sentiment.positive,
        sentiment.neutral,
        sentiment.negative,
        sentiment.undefined,
      ],
      description: 'Sentiment analysis - positive, neutral, negative, undefined',
    },
    boolean: {
      type: 'boolean',
      colors: [
        boolean.primary,
        boolean.primaryEmphasis,
        boolean.secondary,
        boolean.secondaryEmphasis,
        boolean.diminish,
        boolean.subdued,
      ],
      description:
        'Binary comparisons - primary/secondary with emphasis variants, diminish/subdued for background',
    },
    sequential: {
      type: 'sequential',
      colors: sequential,
      description:
        'Sequential scale - 6 levels from lightest to darkest, for heatmaps and choropleth',
    },
  };
}

/**
 * Get a specific palette by type
 */
export function getPalette(type: PaletteType): string[] {
  const palettes = getAllPalettes();
  return palettes[type].colors;
}

/**
 * Map sentiment values to colors
 */
export function getSentimentColor(
  sentiment: 'positive' | 'neutral' | 'negative' | 'undefined'
): string {
  const palette = getSentimentPalette();
  return palette[sentiment];
}

/**
 * Map boolean states to colors
 */
export function getBooleanColor(
  state:
    | 'primary'
    | 'primary-emphasis'
    | 'secondary'
    | 'secondary-emphasis'
    | 'diminish'
    | 'subdued'
): string {
  const palette = getBooleanPalette();
  switch (state) {
    case 'primary':
      return palette.primary;
    case 'primary-emphasis':
      return palette.primaryEmphasis;
    case 'secondary':
      return palette.secondary;
    case 'secondary-emphasis':
      return palette.secondaryEmphasis;
    case 'diminish':
      return palette.diminish;
    case 'subdued':
      return palette.subdued;
  }
}

/**
 * Get a category color by index (cycles through the 12 colors)
 */
export function getCategoryColor(index: number): string {
  const palette = getCategoryPalette();
  return palette[index % palette.length];
}

/**
 * Get a sequential color by value (0-5)
 */
export function getSequentialColor(value: number): string {
  const palette = getSequentialPalette();
  const clampedValue = Math.max(0, Math.min(5, Math.floor(value)));
  return palette[clampedValue];
}

// Export palette getters for direct use
export { getCategoryPalette, getSentimentPalette, getBooleanPalette, getSequentialPalette };

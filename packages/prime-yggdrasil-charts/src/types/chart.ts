/**
 * Core type definitions for Prime Yggdrasil Charts
 */

import type { ReactNode } from 'react';

/**
 * Chart data row - table-like structure with flexible columns
 */
export type ChartRow = Record<string, number | string | Date | null>;

/**
 * Size variants for charts
 */
export type ChartSize = 'sm' | 'md' | 'lg';

/**
 * Field encoding specification - maps data fields to visual channels
 */
export interface ChartEncoding {
  /** X-axis field name */
  x: string;
  /** Y-axis field name (single or multiple for multi-series) */
  y: string | string[];
  /** Optional series grouping field */
  series?: string;
  /** Optional stack grouping field */
  stack?: string;
  /** Optional custom colors array (overrides default palette) */
  colors?: string[];
}

/**
 * Number formatting options
 */
export interface ChartFormatOptions {
  /** Unit suffix (e.g., "kr", "%", "mentions") */
  units?: string;
  /** Number of decimal places */
  decimals?: number;
  /** Use compact notation (1.5M instead of 1,500,000) */
  compact?: boolean;
  /** Format as percentage */
  percent?: boolean;
}

/**
 * Legend layout direction
 */
export type LegendLayout = 'horizontal' | 'vertical';

/**
 * Legend marker shape
 */
export type LegendMarker = 'circle' | 'line' | 'triangle' | 'diamond' | 'square';

/**
 * Legend item with value data (for vertical legends with numbers)
 */
export interface LegendItem {
  /** Display label */
  label: string;
  /** Color swatch */
  color: string;
  /** Marker shape. Default: 'circle' */
  marker?: LegendMarker;
  /** Numeric value (e.g., 350) */
  value?: number;
  /** Percentage value (e.g., 35) */
  percentage?: number;
}

/**
 * Scale legend range entry
 */
export interface ScaleLegendRange {
  /** Range label (e.g., "< 10", "10 - 20") */
  label: string;
  /** Color for this range */
  color: string;
}

/**
 * Legend configuration
 */
export interface LegendConfig {
  /** Show/hide legend */
  enabled?: boolean;
  /** Legend position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Legend alignment */
  align?: 'left' | 'center' | 'right';
  /** Legend layout direction. Default: 'horizontal' */
  layout?: LegendLayout;
  /** Show numeric values next to legend items */
  showValues?: boolean;
  /** Show percentage next to legend items */
  showPercentages?: boolean;
  /** Custom legend items (overrides chart-derived items) */
  items?: LegendItem[];
}

/**
 * Tooltip configuration
 */
export interface TooltipConfig {
  /** Show/hide tooltip */
  enabled?: boolean;
  /** Shared tooltip (show all series on hover) */
  shared?: boolean;
}

/**
 * Base props for all chart components
 */
export interface BaseChartProps {
  // Data
  /** Chart data as array of row objects */
  data: ChartRow[];
  /** Field encoding specification */
  encoding: ChartEncoding;

  // Size
  /** Chart size variant */
  size?: ChartSize;
  /** Chart width (CSS value or number in px) */
  width?: string | number;
  /** Chart height (CSS value or number in px) */
  height?: string | number;

  // Formatting
  /** Number formatting options */
  format?: ChartFormatOptions;

  // Features
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Legend configuration */
  legend?: boolean | LegendConfig;
  /** Tooltip configuration */
  tooltip?: boolean | TooltipConfig;

  // States
  /** Loading state */
  loading?: boolean;
  /** Empty state component */
  empty?: ReactNode;
  /** Error state message or component */
  error?: string | ReactNode;

  // Accessibility
  /** ARIA label for chart */
  ariaLabel?: string;
  /** ARIA description for chart */
  ariaDescription?: string;

  // Advanced
  /** Additional CSS class name */
  className?: string;
  /** Chart container ID */
  id?: string;
}

/**
 * Chart type identifiers
 */
export type ChartType = 'line' | 'column' | 'bar' | 'stackedColumn' | 'donut' | 'pie' | 'columnLine' | 'treemap';

/**
 * Chart state
 */
export type ChartState = 'idle' | 'loading' | 'empty' | 'error';

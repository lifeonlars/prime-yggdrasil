/**
 * Highcharts Theme Adapter for Prime Yggdrasil
 *
 * This adapter reads Yggdrasil CSS variables and maps them to Highcharts theme options.
 * It ensures visual consistency between charts and other Yggdrasil components.
 *
 * Usage:
 * ```typescript
 * import Highcharts from 'highcharts';
 * import { getYggdrasilHighchartsTheme } from '@lifeonlars/prime-yggdrasil-charts/theme';
 *
 * Highcharts.setOptions(getYggdrasilHighchartsTheme());
 * ```
 */

import * as Highcharts from 'highcharts';

/**
 * Get computed CSS variable value from the document root
 */
function getCSSVariable(name: string): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

/**
 * Get category palette colors (Chart-1 through Chart-12)
 * Hardcoded hex values for reliable JavaScript usage
 * Matches Yggdrasil chart-category tokens in light theme
 */
export function getCategoryPalette(): string[] {
  return [
    '#33A2DF', // charts-sapphire-500 (blue)
    '#C9335B', // charts-garnet-600 (red/pink)
    '#F39C12', // charts-amber-500 (orange/yellow)
    '#9B59B6', // charts-charoite-600 (purple)
    '#27AE60', // charts-emerald-500 (green)
    '#16A085', // charts-aquamarine-600 (teal)
    '#E74C3C', // charts-ruby-600 (red)
    '#F1C40F', // charts-topaz-400 (yellow)
    '#8E44AD', // charts-amethyst-600 (violet)
    '#92CDEE', // charts-sapphire-300 (light blue)
    '#E89AAC', // charts-garnet-400 (light red/pink)
    '#F8C471', // charts-amber-300 (light orange)
  ];
}

/**
 * Get sentiment palette colors
 * Hardcoded hex values for reliable JavaScript usage
 */
export function getSentimentPalette() {
  return {
    positive: '#27AE60', // charts-emerald-500 (green)
    neutral: '#95A5A6', // charts-steel-500 (gray)
    negative: '#E74C3C', // charts-ruby-600 (red)
    undefined: '#BDC3C7', // charts-steel-300 (light gray)
  };
}

/**
 * Get boolean palette colors
 * Hardcoded hex values for reliable JavaScript usage
 */
export function getBooleanPalette() {
  return {
    primary: '#33A2DF', // charts-sapphire-500 (blue)
    primaryEmphasis: '#208ECA', // charts-sapphire-600 (darker blue)
    secondary: '#95A5A6', // charts-steel-500 (gray)
    secondaryEmphasis: '#7F8C8D', // charts-steel-600 (darker gray)
    diminish: '#BDC3C7', // charts-steel-300 (light gray)
    subdued: '#ECF0F1', // charts-steel-100 (very light gray)
  };
}

/**
 * Get sequential/scale palette colors (Scale-0 through Scale-5)
 * Hardcoded hex values for reliable JavaScript usage
 * Light to dark progression for heatmaps and continuous data
 */
export function getSequentialPalette(): string[] {
  return [
    '#D2EBF8', // charts-sapphire-050 (lightest)
    '#A9D8F1', // charts-sapphire-100
    '#92CDEE', // charts-sapphire-200
    '#77C1E9', // charts-sapphire-300
    '#58B3E4', // charts-sapphire-400
    '#33A2DF', // charts-sapphire-500 (darkest in light theme)
  ];
}

/**
 * Get Yggdrasil Highcharts theme configuration
 * Reads CSS variables from the current theme (light or dark)
 */
export function getYggdrasilHighchartsTheme(): Highcharts.Options {
  const categoryColors = getCategoryPalette();
  const scaffoldingBorder = getCSSVariable('--chart-scaffolding-border');
  const textDefault = getCSSVariable('--text-neutral-default');
  const textSubdued = getCSSVariable('--text-neutral-subdued');
  const surfacePrimary = getCSSVariable('--surface-neutral-primary');

  return {
    colors: categoryColors,

    chart: {
      backgroundColor: surfacePrimary,
      style: {
        fontFamily: 'Roboto, arial, sans-serif',
        fontSize: '14px',
      },
      // Spacing: [top, right, bottom, left]
      spacing: [16, 16, 16, 16],
      // Plot area border radius: 4px for softer, modern look
      borderRadius: 4,
    },

    title: {
      style: {
        color: textDefault,
        fontSize: '18px',
        fontWeight: '500',
        fontFamily: 'Roboto, arial, sans-serif',
      },
      align: 'left',
    },

    subtitle: {
      style: {
        color: textSubdued,
        fontSize: '14px',
        fontWeight: '400',
        fontFamily: 'Roboto, arial, sans-serif',
      },
      align: 'left',
    },

    xAxis: {
      gridLineColor: scaffoldingBorder,
      lineColor: scaffoldingBorder,
      tickColor: scaffoldingBorder,
      // No gridlines on X-axis (purposeful simplicity - gridlines only on one axis)
      gridLineWidth: 0,
      // Reduce number of tick marks (max ~4 ticks)
      tickInterval: undefined, // Auto-calculated, but charts will override for intelligent reduction
      labels: {
        style: {
          color: textSubdued,
          fontSize: '12px',
          fontFamily: 'Roboto, arial, sans-serif',
        },
      },
      title: {
        style: {
          color: textDefault,
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: 'Roboto, arial, sans-serif',
        },
      },
    },

    yAxis: {
      gridLineColor: scaffoldingBorder,
      lineColor: scaffoldingBorder,
      tickColor: scaffoldingBorder,
      // Show gridlines on Y-axis only (purposeful simplicity)
      gridLineWidth: 1,
      // Max ~4 gridlines (Highcharts will auto-calculate nice intervals)
      tickAmount: 5, // 5 ticks = 4 gridlines between them
      labels: {
        style: {
          color: textSubdued,
          fontSize: '12px',
          fontFamily: 'Roboto, arial, sans-serif',
        },
      },
      title: {
        style: {
          color: textDefault,
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: 'Roboto, arial, sans-serif',
        },
      },
    },

    legend: {
      itemStyle: {
        color: textDefault,
        fontSize: '12px',
        fontWeight: '400',
        fontFamily: 'Roboto, arial, sans-serif',
      },
      itemHoverStyle: {
        color: textDefault,
      },
      itemHiddenStyle: {
        color: textSubdued,
      },
      backgroundColor: surfacePrimary,
    },

    plotOptions: {
      series: {
        dataLabels: {
          style: {
            fontSize: '12px',
            fontWeight: '400',
            fontFamily: 'Roboto, arial, sans-serif',
            textOutline: 'none',
          },
        },
      },
    },

    // Tooltip configuration
    tooltip: {
      backgroundColor: getCSSVariable('--surface-neutral-secondary'),
      borderColor: getCSSVariable('--border-neutral-default'),
      borderRadius: 12,
      borderWidth: 1,
      padding: 12,
      shadow: {
        color: 'rgba(0, 0, 0, 0.1)',
        offsetX: 0,
        offsetY: 2,
        opacity: 0.1,
        width: 4,
      },
      style: {
        color: textDefault,
        fontSize: '12px',
        fontWeight: '400',
        fontFamily: 'Roboto, arial, sans-serif',
      },
      useHTML: true,
    },

    // Accessibility defaults
    accessibility: {
      enabled: true,
      keyboardNavigation: {
        enabled: true,
      },
    },

    // Credits disabled by default (can be re-enabled by consumer)
    credits: {
      enabled: false,
    },
  };
}

/**
 * Apply Yggdrasil theme to Highcharts globally
 * Call this once at application startup
 */
export function applyYggdrasilTheme(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const theme = getYggdrasilHighchartsTheme();
  Highcharts.setOptions(theme);
}

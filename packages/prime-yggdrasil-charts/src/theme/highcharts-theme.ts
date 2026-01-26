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
 * Primary chart palette - use for multi-series categorical data
 * Values from Yggdrasil design system chart colors documentation
 */
export function getCategoryPalette(): string[] {
  return [
    '#3EADC9', // Chart-1 (teal/cyan)
    '#FFC876', // Chart-2 (peach/orange)
    '#EB99BC', // Chart-3 (pink)
    '#9B91CD', // Chart-4 (purple)
    '#77C1E9', // Chart-5 (light blue)
    '#D377DB', // Chart-6 (magenta/purple)
    '#24B58F', // Chart-7 (teal/green)
    '#C27388', // Chart-8 (brown/orange)
    '#C7145B', // Chart-9 (deep pink/red)
    '#7AB387', // Chart-10 (purple)
    '#1E85AA', // Chart-11 (deep blue)
    '#843398', // Chart-12 (purple)
  ];
}

/**
 * Get sentiment palette colors
 * Hardcoded hex values for reliable JavaScript usage
 * Values from Yggdrasil design system chart colors documentation
 */
export function getSentimentPalette() {
  return {
    positive: '#AAECBC', // Sentiment-Positive (mint green)
    neutral: '#F2DE6E', // Sentiment-Neutral (yellow)
    negative: '#F4B6B6', // Sentiment-Negative (pink/coral)
    undefined: '#C4C2C5', // Sentiment-Undefined (gray)
  };
}

/**
 * Get boolean palette colors
 * Hardcoded hex values for reliable JavaScript usage
 * Values from Yggdrasil design system chart colors documentation
 */
export function getBooleanPalette() {
  return {
    primary: '#33A2DF', // Boolean-Primary (blue)
    primaryEmphasis: '#208ECA', // Boolean-Primary-Emphasis (darker blue)
    secondary: '#95A5A6', // Boolean-Secondary (gray)
    secondaryEmphasis: '#7F8C8D', // Boolean-Secondary-Emphasis (darker gray)
    diminish: '#BDC3C7', // Boolean-Diminish (light gray)
    subdued: '#ECF0F1', // Boolean-Subdued (very light gray)
  };
}

/**
 * Get sequential/scale palette colors (Scale-0 through Scale-5)
 * Hardcoded hex values for reliable JavaScript usage
 * Light to dark progression for heatmaps and continuous data
 * Values from Yggdrasil design system chart colors documentation
 */
export function getSequentialPalette(): string[] {
  return [
    '#D2EBF8', // Scale-0 (lightest)
    '#A9D8F1', // Scale-1
    '#92CDEE', // Scale-2
    '#77C1E9', // Scale-3
    '#58B3E4', // Scale-4
    '#33A2DF', // Scale-5 (darkest in light theme)
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
      column: {
        pointPadding: 0.1,
        groupPadding: 0.1,
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

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
 */
export function getCategoryPalette(): string[] {
  return [
    getCSSVariable('--chart-category-1'),
    getCSSVariable('--chart-category-2'),
    getCSSVariable('--chart-category-3'),
    getCSSVariable('--chart-category-4'),
    getCSSVariable('--chart-category-5'),
    getCSSVariable('--chart-category-6'),
    getCSSVariable('--chart-category-7'),
    getCSSVariable('--chart-category-8'),
    getCSSVariable('--chart-category-9'),
    getCSSVariable('--chart-category-10'),
    getCSSVariable('--chart-category-11'),
    getCSSVariable('--chart-category-12'),
  ];
}

/**
 * Get sentiment palette colors
 */
export function getSentimentPalette() {
  return {
    positive: getCSSVariable('--chart-sentiment-positive'),
    neutral: getCSSVariable('--chart-sentiment-neutral'),
    negative: getCSSVariable('--chart-sentiment-negative'),
    undefined: getCSSVariable('--chart-sentiment-undefined'),
  };
}

/**
 * Get boolean palette colors
 */
export function getBooleanPalette() {
  return {
    primary: getCSSVariable('--chart-boolean-primary'),
    primaryEmphasis: getCSSVariable('--chart-boolean-primary-emphasis'),
    secondary: getCSSVariable('--chart-boolean-secondary'),
    secondaryEmphasis: getCSSVariable('--chart-boolean-secondary-emphasis'),
    diminish: getCSSVariable('--chart-boolean-diminish'),
    subdued: getCSSVariable('--chart-boolean-subdued'),
  };
}

/**
 * Get sequential/scale palette colors (Scale-0 through Scale-5)
 */
export function getSequentialPalette(): string[] {
  return [
    getCSSVariable('--chart-scale-0'),
    getCSSVariable('--chart-scale-1'),
    getCSSVariable('--chart-scale-2'),
    getCSSVariable('--chart-scale-3'),
    getCSSVariable('--chart-scale-4'),
    getCSSVariable('--chart-scale-5'),
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

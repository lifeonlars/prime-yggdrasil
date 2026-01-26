/**
 * Tooltip formatting utilities for Prime Yggdrasil Charts
 *
 * These formatters create HTML tooltips that match the Yggdrasil design system.
 */

import type Highcharts from 'highcharts';
import type { ChartFormatOptions } from '../types/chart';
import { formatNumber, formatDate } from '../utils/formatters';

// Extended point type for tooltip formatters with additional properties
interface TooltipPoint extends Highcharts.Point {
  y: number;
  percentage?: number;
  total?: number;
  color: string;
  series: Highcharts.Series;
}

/**
 * Get CSS variable value from DOM
 */
function getCSSVariable(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Format a series color indicator (colored dot)
 */
function formatSeriesIndicator(color: string): string {
  return `<span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${color}; margin-right: 6px;"></span>`;
}

/**
 * Default tooltip formatter
 * Creates a simple tooltip with series name and value
 */
export function createDefaultTooltipFormatter(
  format?: ChartFormatOptions
): Highcharts.TooltipFormatterCallbackFunction {
  return function (this: Highcharts.TooltipFormatterContextObject) {
    const point = this.point as TooltipPoint;
    const formattedValue = formatNumber(point.y, format);

    return `
      <div style="min-width: 120px;">
        <div style="margin-bottom: 4px; font-size: 11px; color: var(--text-neutral-subdued);">
          ${point.name || point.x || ''}
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          ${formatSeriesIndicator(point.color)}
          <span style="font-weight: 500; color: var(--text-neutral-default);">
            ${formattedValue}
          </span>
        </div>
      </div>
    `;
  };
}

/**
 * Multi-series tooltip formatter
 * Shows all series values for a given X-axis point
 */
export function createMultiSeriesTooltipFormatter(
  format?: ChartFormatOptions
): Highcharts.TooltipFormatterCallbackFunction {
  return function (this: Highcharts.TooltipFormatterContextObject) {
    const points = this.points || [this.point];
    const xValue = this.x;

    // Format X-axis value (date or category)
    let xLabel = '';
    if (typeof xValue === 'number' && xValue > 1000000000000) {
      // Likely a timestamp
      xLabel = formatDate(new Date(xValue), 'medium');
    } else {
      xLabel = String(xValue);
    }

    // Build tooltip HTML
    let html = `
      <div style="min-width: 160px;">
        <div style="margin-bottom: 8px; font-size: 11px; font-weight: 500; color: var(--text-neutral-default); border-bottom: 1px solid var(--border-neutral-default); padding-bottom: 4px;">
          ${xLabel}
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
    `;

    (points as TooltipPoint[]).forEach((point) => {
      const formattedValue = formatNumber(point.y, format);
      html += `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            ${formatSeriesIndicator(point.color)}
            <span style="font-size: 12px; color: var(--text-neutral-subdued);">
              ${point.series.name}
            </span>
          </div>
          <span style="font-size: 12px; font-weight: 500; color: var(--text-neutral-default);">
            ${formattedValue}
          </span>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    return html;
  };
}

/**
 * Percentage tooltip formatter
 * Shows value with percentage and optional total
 */
export function createPercentageTooltipFormatter(
  showTotal: boolean = false,
  format?: ChartFormatOptions
): Highcharts.TooltipFormatterCallbackFunction {
  return function (this: Highcharts.TooltipFormatterContextObject) {
    const point = this.point as TooltipPoint;
    const formattedValue = formatNumber(point.y, format);
    const percentage = point.percentage ? point.percentage.toFixed(1) : '0.0';

    let html = `
      <div style="min-width: 140px;">
        <div style="margin-bottom: 8px; font-size: 11px; font-weight: 500; color: var(--text-neutral-default);">
          ${point.name || ''}
        </div>
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          ${formatSeriesIndicator(point.color)}
          <span style="font-weight: 500; color: var(--text-neutral-default);">
            ${formattedValue}
          </span>
        </div>
        <div style="font-size: 11px; color: var(--text-neutral-subdued); margin-left: 14px;">
          ${percentage}% of total
        </div>
    `;

    if (showTotal && point.total !== undefined) {
      const formattedTotal = formatNumber(point.total, format);
      html += `
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border-neutral-default); font-size: 11px; color: var(--text-neutral-subdued);">
          Total: <span style="font-weight: 500; color: var(--text-neutral-default);">${formattedTotal}</span>
        </div>
      `;
    }

    html += `
      </div>
    `;

    return html;
  };
}

/**
 * Time-based breakdown tooltip formatter
 * Shows breakdown by time period (DAY, WEEK, MONTH, QUARTER, YEAR)
 */
export function createTimeBreakdownTooltipFormatter(
  period: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR',
  format?: ChartFormatOptions
): Highcharts.TooltipFormatterCallbackFunction {
  return function (this: Highcharts.TooltipFormatterContextObject) {
    const points = this.points || [this.point];
    const xValue = this.x;

    // Format period label
    let periodLabel = '';
    if (typeof xValue === 'number' && xValue > 1000000000000) {
      const date = new Date(xValue);
      switch (period) {
        case 'DAY':
          periodLabel = formatDate(date, 'medium');
          break;
        case 'WEEK':
          periodLabel = `Week of ${formatDate(date, 'medium')}`;
          break;
        case 'MONTH':
          periodLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          break;
        case 'QUARTER': {
          const quarter = Math.floor(date.getMonth() / 3) + 1;
          periodLabel = `Q${quarter} ${date.getFullYear()}`;
          break;
        }
        case 'YEAR':
          periodLabel = date.getFullYear().toString();
          break;
      }
    } else {
      periodLabel = String(xValue);
    }

    let html = `
      <div style="min-width: 180px;">
        <div style="margin-bottom: 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-neutral-subdued);">
          ${period}
        </div>
        <div style="margin-bottom: 8px; font-size: 13px; font-weight: 500; color: var(--text-neutral-default); border-bottom: 1px solid var(--border-neutral-default); padding-bottom: 6px;">
          ${periodLabel}
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
    `;

    (points as TooltipPoint[]).forEach((point) => {
      const formattedValue = formatNumber(point.y, format);
      html += `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            ${formatSeriesIndicator(point.color)}
            <span style="font-size: 12px; color: var(--text-neutral-subdued);">
              ${point.series.name}
            </span>
          </div>
          <span style="font-size: 12px; font-weight: 500; color: var(--text-neutral-default);">
            ${formattedValue}
          </span>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    return html;
  };
}

/**
 * Sentiment tooltip formatter
 * Color-codes positive/neutral/negative sentiment
 */
export function createSentimentTooltipFormatter(
  sentimentField: 'positive' | 'neutral' | 'negative',
  format?: ChartFormatOptions
): Highcharts.TooltipFormatterCallbackFunction {
  return function (this: Highcharts.TooltipFormatterContextObject) {
    const point = this.point as TooltipPoint;
    const formattedValue = formatNumber(point.y, format);

    // Get sentiment color from CSS variables
    const sentimentColors = {
      positive: getCSSVariable('--chart-sentiment-positive'),
      neutral: getCSSVariable('--chart-sentiment-neutral'),
      negative: getCSSVariable('--chart-sentiment-negative'),
    };

    const sentimentColor = sentimentColors[sentimentField];
    const sentimentLabel = sentimentField.charAt(0).toUpperCase() + sentimentField.slice(1);

    return `
      <div style="min-width: 140px;">
        <div style="margin-bottom: 8px; font-size: 11px; font-weight: 500; color: var(--text-neutral-default);">
          ${point.name || point.x || ''}
        </div>
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${sentimentColor}; margin-right: 6px;"></span>
          <span style="font-size: 11px; color: var(--text-neutral-subdued);">
            ${sentimentLabel}
          </span>
        </div>
        <div style="font-size: 13px; font-weight: 500; color: var(--text-neutral-default); margin-left: 14px;">
          ${formattedValue}
        </div>
      </div>
    `;
  };
}

/**
 * Period comparison tooltip formatter
 * Shows current vs previous period with delta
 */
export function createPeriodComparisonTooltipFormatter(
  currentField: string,
  previousField: string,
  format?: ChartFormatOptions
): Highcharts.TooltipFormatterCallbackFunction {
  return function (this: Highcharts.TooltipFormatterContextObject) {
    const points = this.points || [];
    const xValue = this.x;

    // Find current and previous points
    const currentPoint = (points as unknown as TooltipPoint[]).find((p) => p.series.name === currentField);
    const previousPoint = (points as unknown as TooltipPoint[]).find((p) => p.series.name === previousField);

    if (!currentPoint) {
      return '';
    }

    const currentValue = currentPoint.y ?? 0;
    const previousValue = previousPoint ? (previousPoint.y ?? 0) : 0;
    const delta = currentValue - previousValue;
    const deltaPercent = previousValue !== 0 ? ((delta / previousValue) * 100).toFixed(1) : '0.0';
    const isPositive = delta >= 0;

    const formattedCurrent = formatNumber(currentValue, format);
    const formattedPrevious = formatNumber(previousValue, format);
    const formattedDelta = formatNumber(Math.abs(delta), format);

    // Format X-axis value
    let xLabel = '';
    if (typeof xValue === 'number' && xValue > 1000000000000) {
      xLabel = formatDate(new Date(xValue), 'medium');
    } else {
      xLabel = String(xValue);
    }

    return `
      <div style="min-width: 180px;">
        <div style="margin-bottom: 8px; font-size: 11px; font-weight: 500; color: var(--text-neutral-default); border-bottom: 1px solid var(--border-neutral-default); padding-bottom: 4px;">
          ${xLabel}
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              ${formatSeriesIndicator(String(currentPoint.color || '#000'))}
              <span style="font-size: 12px; color: var(--text-neutral-subdued);">
                Current
              </span>
            </div>
            <span style="font-size: 12px; font-weight: 500; color: var(--text-neutral-default);">
              ${formattedCurrent}
            </span>
          </div>
          ${previousPoint ? `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              ${formatSeriesIndicator(String(previousPoint.color || '#000'))}
              <span style="font-size: 12px; color: var(--text-neutral-subdued);">
                Previous
              </span>
            </div>
            <span style="font-size: 12px; font-weight: 500; color: var(--text-neutral-default);">
              ${formattedPrevious}
            </span>
          </div>
          ` : ''}
          <div style="margin-top: 4px; padding-top: 6px; border-top: 1px solid var(--border-neutral-default); display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <span style="font-size: 11px; color: var(--text-neutral-subdued);">
              Change
            </span>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-size: 11px; font-weight: 500; color: ${isPositive ? 'var(--chart-sentiment-positive)' : 'var(--chart-sentiment-negative)'};">
                ${isPositive ? '+' : '-'}${formattedDelta}
              </span>
              <span style="font-size: 10px; color: var(--text-neutral-subdued);">
                (${isPositive ? '+' : ''}${deltaPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  };
}

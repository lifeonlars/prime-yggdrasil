/**
 * Number and value formatting utilities for charts
 */

import type { ChartFormatOptions } from '../types/chart';

/**
 * Format a number according to chart formatting options
 */
export function formatNumber(
  value: number | null | undefined,
  options?: ChartFormatOptions
): string {
  if (value == null || isNaN(value)) {
    return '-';
  }

  const {
    units = '',
    decimals = 0,
    compact = false,
    percent = false,
  } = options || {};

  let formatted: string;

  if (percent) {
    // Format as percentage
    formatted = (value * 100).toFixed(decimals) + '%';
  } else if (compact) {
    // Compact notation (1.5M, 2.3K, etc.)
    formatted = formatCompact(value, decimals);
  } else {
    // Standard number formatting with decimals
    formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  // Append units if provided
  if (units && !percent) {
    formatted = `${formatted} ${units}`;
  }

  return formatted;
}

/**
 * Format number in compact notation (K, M, B, T)
 */
export function formatCompact(value: number, decimals: number = 1): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1e12) {
    return sign + (absValue / 1e12).toFixed(decimals) + 'T';
  } else if (absValue >= 1e9) {
    return sign + (absValue / 1e9).toFixed(decimals) + 'B';
  } else if (absValue >= 1e6) {
    return sign + (absValue / 1e6).toFixed(decimals) + 'M';
  } else if (absValue >= 1e3) {
    return sign + (absValue / 1e3).toFixed(decimals) + 'K';
  } else {
    return sign + absValue.toFixed(decimals);
  }
}

/**
 * Format a date for chart display
 */
export function formatDate(
  value: Date | string | number,
  format: 'short' | 'medium' | 'long' = 'medium'
): string {
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    return '-';
  }

  switch (format) {
    case 'short':
      // MM/DD/YYYY
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
    case 'long':
      // January 15, 2026
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    case 'medium':
    default:
      // Jan 15, 2026
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
  }
}

/**
 * Format a datetime for chart display
 */
export function formatDateTime(
  value: Date | string | number,
  includeTime: boolean = true
): string {
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    return '-';
  }

  if (!includeTime) {
    return formatDate(date, 'medium');
  }

  // Jan 15, 2026, 2:30 PM
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Detect if a value is a date
 */
export function isDateValue(value: unknown): value is Date | string {
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }
  if (typeof value === 'string') {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  return false;
}

/**
 * Parse a value to number (handles null, undefined, NaN)
 */
export function parseNumber(value: unknown): number | null {
  if (value == null) {
    return null;
  }
  if (typeof value === 'number') {
    return isNaN(value) ? null : value;
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
}

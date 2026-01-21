/**
 * Data transformation utilities for converting rows + encoding to Highcharts series
 */

import type Highcharts from 'highcharts';
import type { ChartRow, ChartEncoding } from '../types/chart';
import { parseNumber, isDateValue } from './formatters';

/**
 * Transform chart data (rows + encoding) to Highcharts series
 */
export function transformToSeries(
  data: ChartRow[],
  encoding: ChartEncoding
): Highcharts.SeriesOptionsType[] {
  const { x, y, series: seriesField } = encoding;

  // Handle single y field (simple series)
  if (typeof y === 'string') {
    if (seriesField) {
      // Group by series field
      return transformGroupedSeries(data, x, y, seriesField);
    } else {
      // Single series
      return transformSingleSeries(data, x, y);
    }
  }

  // Handle multiple y fields (multi-series)
  return transformMultiSeries(data, x, y);
}

/**
 * Transform to single series
 */
function transformSingleSeries(
  data: ChartRow[],
  xField: string,
  yField: string
): Highcharts.SeriesOptionsType[] {
  const points = data
    .map((row) => {
      const xValue = row[xField];
      const yValue = parseNumber(row[yField]);

      if (yValue === null) {
        return null;
      }

      // Handle date X values
      if (isDateValue(xValue)) {
        const date = new Date(xValue);
        return [date.getTime(), yValue];
      }

      // Handle category X values
      return {
        name: String(xValue),
        y: yValue,
      };
    })
    .filter((point) => point !== null);

  return [
    {
      type: 'line',
      name: yField,
      data: points as any,
    },
  ];
}

/**
 * Transform to multiple series (multiple y fields)
 */
function transformMultiSeries(
  data: ChartRow[],
  xField: string,
  yFields: string[]
): Highcharts.SeriesOptionsType[] {
  return yFields.map((yField) => {
    const points = data
      .map((row) => {
        const xValue = row[xField];
        const yValue = parseNumber(row[yField]);

        if (yValue === null) {
          return null;
        }

        // Handle date X values
        if (isDateValue(xValue)) {
          const date = new Date(xValue);
          return [date.getTime(), yValue];
        }

        // Handle category X values
        return {
          name: String(xValue),
          y: yValue,
        };
      })
      .filter((point) => point !== null);

    return {
      type: 'line',
      name: yField,
      data: points as any,
    };
  });
}

/**
 * Transform to grouped series (group by series field)
 */
function transformGroupedSeries(
  data: ChartRow[],
  xField: string,
  yField: string,
  seriesField: string
): Highcharts.SeriesOptionsType[] {
  // Group data by series field
  const groups = new Map<string, ChartRow[]>();

  for (const row of data) {
    const seriesValue = String(row[seriesField] ?? 'Unknown');
    if (!groups.has(seriesValue)) {
      groups.set(seriesValue, []);
    }
    groups.get(seriesValue)!.push(row);
  }

  // Transform each group to a series
  return Array.from(groups.entries()).map(([seriesName, rows]) => {
    const points = rows
      .map((row) => {
        const xValue = row[xField];
        const yValue = parseNumber(row[yField]);

        if (yValue === null) {
          return null;
        }

        // Handle date X values
        if (isDateValue(xValue)) {
          const date = new Date(xValue);
          return [date.getTime(), yValue];
        }

        // Handle category X values
        return {
          name: String(xValue),
          y: yValue,
        };
      })
      .filter((point) => point !== null);

    return {
      type: 'line',
      name: seriesName,
      data: points as any,
    };
  });
}

/**
 * Extract unique categories from data
 */
export function extractCategories(data: ChartRow[], field: string): string[] {
  const categories = new Set<string>();

  for (const row of data) {
    const value = row[field];
    if (value != null) {
      categories.add(String(value));
    }
  }

  return Array.from(categories);
}

/**
 * Detect if X field contains date values
 */
export function isDateXAxis(data: ChartRow[], xField: string): boolean {
  if (data.length === 0) {
    return false;
  }

  // Check first non-null value
  for (const row of data) {
    const value = row[xField];
    if (value != null) {
      return isDateValue(value);
    }
  }

  return false;
}

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
 * For category charts, returns simple y-value arrays
 * For datetime charts, returns [timestamp, y] arrays
 */
function transformSingleSeries(
  data: ChartRow[],
  xField: string,
  yField: string
): Highcharts.SeriesOptionsType[] {
  // Determine if x axis is datetime or category
  const isDateTime = data.length > 0 && isDateValue(data[0][xField]);

  const points = data
    .map((row) => {
      const xValue = row[xField];
      const yValue = parseNumber(row[yField]);

      if (yValue === null) {
        return null;
      }

      // Handle date X values - return [timestamp, y] pairs
      if (isDateTime && isDateValue(xValue)) {
        const date = new Date(xValue);
        return [date.getTime(), yValue];
      }

      // Handle category X values - return just the y value
      // Categories are matched by index order
      return yValue;
    })
    .filter((point) => point !== null);

  return [
    {
      type: 'line',
      name: yField,
      data: points as Highcharts.PointOptionsType[],
    },
  ];
}

/**
 * Transform to multiple series (multiple y fields)
 * For category charts (like stacked column), returns simple y-value arrays
 * For datetime charts, returns [timestamp, y] arrays
 */
function transformMultiSeries(
  data: ChartRow[],
  xField: string,
  yFields: string[]
): Highcharts.SeriesOptionsType[] {
  // Determine if x axis is datetime or category
  const isDateTime = data.length > 0 && isDateValue(data[0][xField]);

  return yFields.map((yField) => {
    const points = data
      .map((row) => {
        const xValue = row[xField];
        const yValue = parseNumber(row[yField]);

        if (yValue === null) {
          return null;
        }

        // Handle date X values - return [timestamp, y] pairs
        if (isDateTime && isDateValue(xValue)) {
          const date = new Date(xValue);
          return [date.getTime(), yValue];
        }

        // Handle category X values - return just the y value
        // Categories are matched by index order
        return yValue;
      })
      .filter((point) => point !== null);

    return {
      type: 'line',
      name: yField,
      data: points as Highcharts.PointOptionsType[],
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
      data: points as Highcharts.PointOptionsType[],
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
 * Transform flat data into hierarchical treemap data
 * Converts rows with group + label + value into Highcharts treemap point format
 */
export function transformToTreemapData(
  data: ChartRow[],
  groupField: string,
  labelField: string,
  valueField: string,
  colorMap?: Record<string, string>
): Highcharts.PointOptionsObject[] {
  const defaultColors = [
    '#3EADC9', '#FFC876', '#EB99BC', '#9B91CD', '#77C1E9',
    '#D377DB', '#24B58F', '#C27388', '#C7145B', '#7AB387',
    '#1E85AA', '#843398',
  ];

  // Collect unique groups
  const groups = new Map<string, ChartRow[]>();
  for (const row of data) {
    const group = String(row[groupField] ?? 'Other');
    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group)!.push(row);
  }

  const points: Highcharts.PointOptionsObject[] = [];
  let colorIndex = 0;

  // Create parent nodes (level 1)
  for (const [groupName, rows] of groups) {
    const color = colorMap?.[groupName] ?? defaultColors[colorIndex % defaultColors.length];
    colorIndex++;

    points.push({
      id: `group-${groupName}`,
      name: groupName,
      color,
    });

    // Create child nodes (level 2)
    for (const row of rows) {
      const label = String(row[labelField] ?? '');
      const value = parseNumber(row[valueField]);
      if (value !== null) {
        points.push({
          name: label,
          parent: `group-${groupName}`,
          value,
        });
      }
    }
  }

  return points;
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

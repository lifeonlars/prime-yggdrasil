/**
 * ColumnLine - Combined column + line chart
 *
 * Used for comparing two related metrics (e.g., current vs previous period).
 * Columns represent the primary metric, lines represent the comparison metric.
 */

import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import type { BaseChartProps, ChartState } from '../types/chart';
import { BaseChart } from './BaseChart';
import { extractCategories, isDateXAxis } from '../utils/dataTransform';
import { formatAxisLabel, parseNumber, isDateValue } from '../utils/formatters';
import { createMultiSeriesTooltipFormatter } from '../theme/tooltipFormatters';

export interface ColumnLineProps extends BaseChartProps {
  /** Fields to render as columns. Default: first y field */
  columnFields?: string[];
  /** Fields to render as lines. Default: remaining y fields */
  lineFields?: string[];
  /** Enable smooth/curved lines (spline). Default: true */
  smooth?: boolean;
}

/**
 * ColumnLine chart component
 */
function ColumnLineInner({
  data,
  encoding,
  title,
  subtitle,
  legend = true,
  tooltip = true,
  format,
  width,
  height = 400,
  loading,
  empty,
  error,
  ariaLabel,
  ariaDescription,
  className,
  id,
  columnFields,
  lineFields,
  smooth = true,
}: ColumnLineProps) {
  // Determine chart state
  const state: ChartState = useMemo(() => {
    if (loading) return 'loading';
    if (error) return 'error';
    if (!data || data.length === 0) return 'empty';
    return 'idle';
  }, [data, loading, error]);

  // Build Highcharts options
  const options: Highcharts.Options = useMemo(() => {
    if (state !== 'idle') {
      return {};
    }

    const yFields = Array.isArray(encoding.y) ? encoding.y : [encoding.y];

    // Determine which fields are columns vs lines
    const colFields = columnFields || [yFields[0]];
    const lnFields = lineFields || yFields.slice(1);

    // Detect datetime X axis
    const isDatetime = isDateXAxis(data, encoding.x);
    const categories = isDatetime ? undefined : extractCategories(data, encoding.x);

    const lineType = smooth ? 'spline' : 'line';

    // Build series
    const series: Highcharts.SeriesOptionsType[] = [];

    for (const field of colFields) {
      const points = data.map((row) => {
        const yValue = parseNumber(row[field]);
        const xVal = row[encoding.x];
        if (isDatetime && xVal != null && isDateValue(xVal)) {
          return [new Date(xVal as string | number).getTime(), yValue];
        }
        return yValue;
      });

      series.push({
        type: 'column',
        name: field,
        data: points as Highcharts.PointOptionsType[],
      });
    }

    for (const field of lnFields) {
      const points = data.map((row) => {
        const yValue = parseNumber(row[field]);
        const xVal = row[encoding.x];
        if (isDatetime && xVal != null && isDateValue(xVal)) {
          return [new Date(xVal as string | number).getTime(), yValue];
        }
        return yValue;
      });

      series.push({
        type: lineType as 'spline' | 'line',
        name: field,
        data: points as Highcharts.PointOptionsType[],
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 4,
        },
      });
    }

    // Configure legend
    const legendConfig: Highcharts.LegendOptions =
      typeof legend === 'boolean'
        ? { enabled: legend }
        : {
            enabled: legend.enabled ?? true,
            align: legend.align || 'center',
            verticalAlign:
              legend.position === 'top'
                ? 'top'
                : legend.position === 'bottom'
                  ? 'bottom'
                  : 'bottom',
          };

    // Configure tooltip
    const tooltipConfig: Highcharts.TooltipOptions =
      typeof tooltip === 'boolean'
        ? {
            enabled: tooltip,
            shared: true,
            formatter: tooltip ? createMultiSeriesTooltipFormatter(format) : undefined,
          }
        : {
            enabled: tooltip.enabled ?? true,
            shared: tooltip.shared ?? true,
            formatter: tooltip.enabled !== false ? createMultiSeriesTooltipFormatter(format) : undefined,
          };

    return {
      chart: {
        type: 'column',
        height,
      },
      ...(encoding.colors && { colors: encoding.colors }),
      title: {
        text: title || undefined,
      },
      subtitle: {
        text: subtitle || undefined,
      },
      xAxis: {
        ...(isDatetime ? { type: 'datetime' as const } : { categories }),
        title: { text: undefined },
        labels: {
          rotation: 0,
        },
      },
      yAxis: {
        title: { text: undefined },
        ...(format && {
          labels: {
            formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
              return formatAxisLabel(this.value as number, format);
            },
          },
        }),
      },
      legend: legendConfig,
      tooltip: tooltipConfig,
      plotOptions: {
        column: {
          borderRadius: 4,
          maxPointWidth: 72,
        },
      },
      series,
      credits: { enabled: false },
      accessibility: {
        enabled: true,
        description: ariaDescription,
      },
    };
  }, [
    data,
    encoding,
    title,
    subtitle,
    legend,
    tooltip,
    format,
    height,
    state,
    ariaDescription,
    columnFields,
    lineFields,
    smooth,
  ]);

  return (
    <BaseChart
      state={state}
      loading={loading}
      empty={empty}
      error={error}
      options={options}
      highcharts={Highcharts}
      width={width}
      height={height}
      className={className}
      id={id}
      ariaLabel={ariaLabel || title || 'Combined column and line chart'}
      ariaDescription={ariaDescription}
    />
  );
}

export const ColumnLine = React.memo(ColumnLineInner);

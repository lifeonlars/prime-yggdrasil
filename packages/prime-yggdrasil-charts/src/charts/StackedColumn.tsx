/**
 * StackedColumn - Stacked vertical bar chart
 *
 * Used for showing composition over categories (parts of a whole).
 */

import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import type { BaseChartProps, ChartState } from '../types/chart';
import { BaseChart } from './BaseChart';
import { transformToSeries, extractCategories } from '../utils/dataTransform';
import { formatAxisLabel } from '../utils/formatters';
import { createMultiSeriesTooltipFormatter } from '../theme/tooltipFormatters';

export type StackedColumnProps = BaseChartProps;

/**
 * StackedColumn chart component
 */
function StackedColumnInner({
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
}: StackedColumnProps) {
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

    // Transform data to series
    const series = transformToSeries(data, encoding);

    // Extract categories from X field
    const categories = extractCategories(data, encoding.x);

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

    // Configure tooltip with custom formatter
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
      // Apply custom colors if provided in encoding
      ...(encoding.colors && { colors: encoding.colors }),
      title: {
        text: title || undefined,
      },
      subtitle: {
        text: subtitle || undefined,
      },
      xAxis: {
        categories,
        title: {
          text: undefined, // Purposeful simplicity: axis titles are redundant
        },
      },
      yAxis: {
        title: {
          text: undefined, // Purposeful simplicity: axis titles are redundant
        },
        ...(format && {
          labels: {
            formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
              return formatAxisLabel(this.value as number, format);
            },
          },
        }),
        stackLabels: {
          enabled: true,
          formatter: function (this: Highcharts.StackItemObject) {
            return format ? formatAxisLabel(this.total as number, format) : String(this.total);
          },
        },
      },
      legend: legendConfig,
      tooltip: tooltipConfig,
      plotOptions: {
        column: {
          stacking: 'normal',
          borderRadius: 4,
          maxPointWidth: 72, // Prevent overly wide columns on wide screens
        },
      },
      series: series.map((s) => ({
        ...s,
        type: 'column',
        stack: encoding.stack || 'default',
      })) as Highcharts.SeriesOptionsType[],
      credits: {
        enabled: false,
      },
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
      ariaLabel={ariaLabel || title || 'Stacked column chart'}
      ariaDescription={ariaDescription}
    />
  );
}

export const StackedColumn = React.memo(StackedColumnInner);

/**
 * Bar - Horizontal bar chart with categorical Y-axis
 *
 * Used for comparing values across categories (horizontal orientation).
 */

import { useMemo } from 'react';
import Highcharts from 'highcharts';
import type { BaseChartProps, ChartState } from '../types/chart';
import { BaseChart } from './BaseChart';
import { transformToSeries, extractCategories } from '../utils/dataTransform';
import { formatAxisLabel } from '../utils/formatters';
import { createMultiSeriesTooltipFormatter } from '../theme/tooltipFormatters';

export type BarProps = BaseChartProps;

/**
 * Bar chart component
 */
export function Bar({
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
}: BarProps) {
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
            shared: false,
            formatter: tooltip ? createMultiSeriesTooltipFormatter(format) : undefined,
          }
        : {
            enabled: tooltip.enabled ?? true,
            shared: tooltip.shared ?? false,
            formatter: tooltip.enabled !== false ? createMultiSeriesTooltipFormatter(format) : undefined,
          };

    return {
      chart: {
        type: 'bar',
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
        labels: format
          ? {
              formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
                return formatAxisLabel(this.value as number, format);
              },
            }
          : undefined,
      },
      legend: legendConfig,
      tooltip: tooltipConfig,
      plotOptions: {
        bar: {
          borderRadius: 4,
          maxPointWidth: 72, // Prevent overly wide bars on wide screens
          colorByPoint: !!encoding.colors, // Enable per-bar colors when custom colors provided
          dataLabels: {
            enabled: true,
            align: 'right',
            formatter: function (this: Highcharts.PointLabelObject) {
              return format ? formatAxisLabel(this.y as number, format) : String(this.y);
            },
            style: {
              fontWeight: '400',
            },
          },
        },
      },
      series: series.map((s) => ({
        ...s,
        type: 'bar',
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
      ariaLabel={ariaLabel || title || 'Bar chart'}
      ariaDescription={ariaDescription}
    />
  );
}

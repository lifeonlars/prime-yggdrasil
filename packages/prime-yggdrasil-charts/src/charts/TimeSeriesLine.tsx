/**
 * TimeSeriesLine - Line chart with date/time X-axis
 *
 * Used for visualizing data over time (dates, timestamps).
 */

import { useMemo } from 'react';
import Highcharts from 'highcharts';
import type { BaseChartProps, ChartState } from '../types/chart';
import { BaseChart } from './BaseChart';
import { transformToSeries, isDateXAxis } from '../utils/dataTransform';
import { formatNumber } from '../utils/formatters';
import { createMultiSeriesTooltipFormatter } from '../theme/tooltipFormatters';

export interface TimeSeriesLineProps extends BaseChartProps {}

/**
 * TimeSeriesLine chart component
 */
export function TimeSeriesLine({
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
}: TimeSeriesLineProps) {
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

    // Detect if X-axis is datetime
    const isDatetime = isDateXAxis(data, encoding.x);

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
        type: 'line',
        height,
      },
      title: {
        text: title || undefined,
      },
      subtitle: {
        text: subtitle || undefined,
      },
      xAxis: {
        type: isDatetime ? 'datetime' : 'category',
        title: {
          text: encoding.x,
        },
      },
      yAxis: {
        title: {
          text: typeof encoding.y === 'string' ? encoding.y : 'Value',
        },
        labels: format
          ? {
              formatter: function () {
                return formatNumber(this.value as number, format);
              },
            }
          : undefined,
      },
      legend: legendConfig,
      tooltip: tooltipConfig,
      series: series.map((s) => ({
        ...s,
        type: 'line',
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
      ariaLabel={ariaLabel || title || 'Time series line chart'}
      ariaDescription={ariaDescription}
    />
  );
}

/**
 * Column - Vertical bar chart with categorical X-axis
 *
 * Used for comparing values across categories.
 */

import { useMemo } from 'react';
import Highcharts from 'highcharts';
import type { BaseChartProps, ChartState } from '../types/chart';
import { BaseChart } from './BaseChart';
import { transformToSeries, extractCategories } from '../utils/dataTransform';
import { formatNumber } from '../utils/formatters';

export interface ColumnProps extends BaseChartProps {}

/**
 * Column chart component
 */
export function Column({
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
}: ColumnProps) {
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

    // Configure tooltip
    const tooltipConfig: Highcharts.TooltipOptions =
      typeof tooltip === 'boolean'
        ? { enabled: tooltip }
        : {
            enabled: tooltip.enabled ?? true,
            shared: tooltip.shared ?? false,
          };

    // Add value formatting to tooltip
    if (tooltipConfig.enabled && format) {
      tooltipConfig.pointFormatter = function () {
        const point = this as any;
        const formattedValue = formatNumber(point.y, format);
        return `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${formattedValue}</b><br/>`;
      };
    }

    return {
      chart: {
        type: 'column',
        height,
      },
      title: {
        text: title || undefined,
      },
      subtitle: {
        text: subtitle || undefined,
      },
      xAxis: {
        categories,
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
      plotOptions: {
        column: {
          borderRadius: 4,
        },
      },
      series: series.map((s) => ({
        ...s,
        type: 'column',
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
      ariaLabel={ariaLabel || title || 'Column chart'}
      ariaDescription={ariaDescription}
    />
  );
}

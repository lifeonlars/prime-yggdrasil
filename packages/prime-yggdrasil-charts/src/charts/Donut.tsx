/**
 * Donut - Pie chart with center hole
 *
 * Used for showing composition/proportions (parts of a whole).
 */

import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import type { BaseChartProps, ChartState } from '../types/chart';
import { BaseChart } from './BaseChart';
import { parseNumber } from '../utils/formatters';
import { createPercentageTooltipFormatter } from '../theme/tooltipFormatters';

export type DonutProps = BaseChartProps;

/**
 * Donut chart component
 */
function DonutInner({
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
}: DonutProps) {
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

    // For donut/pie charts, we need name (X) and value (Y)
    const yField = typeof encoding.y === 'string' ? encoding.y : encoding.y[0];

    // Transform data to pie slices
    const pieData = data
      .map((row) => {
        const name = String(row[encoding.x] ?? 'Unknown');
        const value = parseNumber(row[yField]);

        if (value === null) {
          return null;
        }

        return {
          name,
          y: value,
        };
      })
      .filter((point) => point !== null);

    // Configure legend
    const legendConfig: Highcharts.LegendOptions =
      typeof legend === 'boolean'
        ? { enabled: legend }
        : {
            enabled: legend.enabled ?? true,
            align: legend.align || 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
          };

    // Configure tooltip with percentage formatter
    const tooltipConfig: Highcharts.TooltipOptions =
      typeof tooltip === 'boolean'
        ? {
            enabled: tooltip,
            formatter: tooltip ? createPercentageTooltipFormatter(false, format) : undefined,
          }
        : {
            enabled: tooltip.enabled ?? true,
            formatter: tooltip.enabled !== false ? createPercentageTooltipFormatter(false, format) : undefined,
          };

    return {
      chart: {
        type: 'pie',
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
      legend: legendConfig,
      tooltip: tooltipConfig,
      plotOptions: {
        pie: {
          innerSize: '60%', // Creates donut hole
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%',
            distance: -30,
            style: {
              fontWeight: 'bold',
              color: 'white',
              textOutline: '1px contrast',
            },
          },
          showInLegend: legendConfig.enabled,
        },
      },
      series: [
        {
          type: 'pie',
          name: yField,
          data: pieData as Highcharts.PointOptionsObject[],
        },
      ],
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
      ariaLabel={ariaLabel || title || 'Donut chart'}
      ariaDescription={ariaDescription}
    />
  );
}

export const Donut = React.memo(DonutInner);

/**
 * Treemap - Hierarchical treemap chart with drill-down
 *
 * Displays proportional data as nested rectangles grouped by category.
 * Supports click-to-drill-down into category groups.
 */

import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
import type { BaseChartProps, ChartEncoding, ChartState } from '../types/chart';
import { BaseChart } from './BaseChart';
import { transformToTreemapData } from '../utils/dataTransform';

// Lazy initialization flag — module registers once on first Treemap render
let treemapInitialized = false;

export interface TreemapEncoding extends ChartEncoding {
  /** Field for the parent/category grouping */
  group: string;
  /** Optional color mapping: group name -> hex color */
  colorMap?: Record<string, string>;
}

export interface TreemapProps extends Omit<BaseChartProps, 'encoding'> {
  /** Treemap encoding - x=label field, y=value field, group=category field */
  encoding: TreemapEncoding;
  /** Enable drill-down on click. Default: true */
  drillDown?: boolean;
}

/**
 * Treemap chart component
 */
function TreemapInner({
  data,
  encoding,
  title,
  subtitle,
  legend = true,
  tooltip = true,
  width,
  height = 500,
  loading,
  empty,
  error,
  ariaLabel,
  ariaDescription,
  className,
  id,
  drillDown = true,
}: TreemapProps) {
  // Initialize treemap module on first use (synchronous, before chart creation)
  if (!treemapInitialized) {
    HighchartsTreemap(Highcharts);
    treemapInitialized = true;
  }

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

    const labelField = encoding.x;
    const valueField = Array.isArray(encoding.y) ? encoding.y[0] : encoding.y;
    const groupField = encoding.group;

    // Transform flat data to hierarchical treemap points
    const treemapData = transformToTreemapData(
      data,
      groupField,
      labelField,
      valueField,
      encoding.colorMap
    );

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
        : { enabled: tooltip.enabled ?? true };

    return {
      chart: {
        height,
      },
      title: {
        text: title || undefined,
      },
      subtitle: {
        text: subtitle || undefined,
      },
      legend: legendConfig,
      tooltip: {
        ...tooltipConfig,
        pointFormat: '<b>{point.name}</b>: {point.value}',
      },
      series: [
        {
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          allowTraversingTree: drillDown,
          animationLimit: 1000,
          dataLabels: {
            enabled: true,
            style: {
              textOutline: 'none',
              fontWeight: '400',
              fontSize: '12px',
            },
          },
          levels: [
            {
              level: 1,
              dataLabels: {
                enabled: true,
                align: 'left',
                verticalAlign: 'top',
                style: {
                  fontSize: '14px',
                  fontWeight: '500',
                  textOutline: 'none',
                },
              },
              borderWidth: 3,
              borderColor: '#ffffff',
            },
            {
              level: 2,
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '12px',
                  fontWeight: '400',
                  textOutline: 'none',
                },
              },
              borderWidth: 1,
              borderColor: '#ffffff',
            },
          ],
          traverseUpButton: {
            position: {
              align: 'right',
              verticalAlign: 'top',
              x: -10,
              y: 10,
            },
          },
          data: treemapData,
        } as Highcharts.SeriesTreemapOptions,
      ],
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
    height,
    state,
    ariaDescription,
    drillDown,
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
      ariaLabel={ariaLabel || title || 'Treemap chart'}
      ariaDescription={ariaDescription}
    />
  );
}

export const Treemap = React.memo(TreemapInner);

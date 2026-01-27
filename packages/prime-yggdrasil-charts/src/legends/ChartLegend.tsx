/**
 * ChartLegend - Custom legend component for charts
 *
 * Renders legend items with optional numeric values and percentages.
 * Supports horizontal (default) and vertical layouts.
 * Vertical layout with numbers is used for donut/pie charts.
 */

import React from 'react';
import type { LegendItem, LegendLayout, LegendMarker } from '../types/chart';

export interface ChartLegendProps {
  /** Legend items to display */
  items: LegendItem[];
  /** Layout direction. Default: 'horizontal' */
  layout?: LegendLayout;
  /** Show numeric values. Default: false */
  showValues?: boolean;
  /** Show percentages. Default: false */
  showPercentages?: boolean;
  /** Alignment. Default: 'center' */
  align?: 'left' | 'center' | 'right';
  /** Additional CSS class */
  className?: string;
  /** Click handler for toggling series visibility */
  onItemClick?: (item: LegendItem, index: number) => void;
  /** Separator before specific index (e.g., "No sentiment" separator) */
  separatorBefore?: number;
}

const MARKER_SIZE = 12;
const LINE_MARKER_WIDTH = 24;

/**
 * Render a marker shape SVG
 */
function LegendMarkerIcon({
  marker = 'circle',
  color,
  showLine,
}: {
  marker?: LegendMarker;
  color: string;
  showLine?: boolean;
}) {
  if (showLine) {
    // Line + symbol marker for line charts
    return (
      <svg
        width={LINE_MARKER_WIDTH}
        height={MARKER_SIZE}
        viewBox={`0 0 ${LINE_MARKER_WIDTH} ${MARKER_SIZE}`}
        style={{ flexShrink: 0 }}
      >
        <line
          x1="0"
          y1={MARKER_SIZE / 2}
          x2={LINE_MARKER_WIDTH}
          y2={MARKER_SIZE / 2}
          stroke={color}
          strokeWidth="2"
        />
        {renderShape(marker, color, LINE_MARKER_WIDTH / 2, MARKER_SIZE / 2, true)}
      </svg>
    );
  }

  // Circle/shape only marker
  return (
    <svg
      width={MARKER_SIZE}
      height={MARKER_SIZE}
      viewBox={`0 0 ${MARKER_SIZE} ${MARKER_SIZE}`}
      style={{ flexShrink: 0 }}
    >
      {renderShape(marker, color, MARKER_SIZE / 2, MARKER_SIZE / 2, false)}
    </svg>
  );
}

function renderShape(
  marker: LegendMarker,
  color: string,
  cx: number,
  cy: number,
  isLineMarker: boolean
): React.ReactNode {
  const r = isLineMarker ? 4 : 5;

  switch (marker) {
    case 'triangle':
      return (
        <polygon
          points={`${cx},${cy - r} ${cx - r},${cy + r} ${cx + r},${cy + r}`}
          fill={color}
        />
      );
    case 'diamond':
      return (
        <polygon
          points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
          fill={color}
        />
      );
    case 'square':
      return (
        <rect
          x={cx - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          fill={color}
        />
      );
    case 'line':
    case 'circle':
    default:
      return <circle cx={cx} cy={cy} r={r} fill={color} />;
  }
}

/**
 * ChartLegend component
 */
export function ChartLegend({
  items,
  layout = 'horizontal',
  showValues = false,
  showPercentages = false,
  align = 'center',
  className = '',
  onItemClick,
  separatorBefore,
}: ChartLegendProps) {
  const isVertical = layout === 'vertical';
  const hasNumbers = showValues || showPercentages;
  const showLine = items.some((item) => item.marker === 'line');

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    flexWrap: isVertical ? 'nowrap' : 'wrap',
    gap: isVertical ? '8px' : '16px',
    justifyContent:
      align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    fontFamily: 'Roboto, arial, sans-serif',
    fontSize: '13px',
    color: 'var(--text-neutral-default, #2c3e50)',
  };

  return (
    <div
      className={`yggdrasil-chart-legend ${className}`.trim()}
      style={containerStyle}
      role="list"
      aria-label="Chart legend"
    >
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {separatorBefore === index && (
            <div
              style={{
                borderTop: '1px solid var(--border-neutral-default, #ddd)',
                margin: isVertical ? '4px 0' : '0',
              }}
            />
          )}
          <div
            role="listitem"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: onItemClick ? 'pointer' : 'default',
              ...(isVertical && hasNumbers
                ? { minWidth: '200px' }
                : {}),
            }}
            onClick={onItemClick ? () => onItemClick(item, index) : undefined}
          >
            <LegendMarkerIcon
              marker={item.marker}
              color={item.color}
              showLine={showLine && item.marker !== 'circle'}
            />
            <span
              style={{
                flex: isVertical && hasNumbers ? 1 : undefined,
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
            {showValues && item.value != null && (
              <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                {item.value.toLocaleString('en-US')}
              </span>
            )}
            {showPercentages && item.percentage != null && (
              <span
                style={{
                  color: 'var(--text-neutral-subdued, #7f8c8d)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.percentage}%
              </span>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * ScaleLegend - Range/scale legend for heatmaps and bubble charts
 *
 * Displays graduated circles with range labels showing
 * intensity levels (e.g., "< 10", "10 - 20", etc.)
 */

import type { ScaleLegendRange } from '../types/chart';

export interface ScaleLegendProps {
  /** Title displayed above the scale. E.g., "Number of hits" */
  title: string;
  /** Range entries from lowest to highest */
  ranges: ScaleLegendRange[];
  /** Additional CSS class */
  className?: string;
}

/**
 * ScaleLegend component
 */
export function ScaleLegend({ title, ranges, className = '' }: ScaleLegendProps) {
  return (
    <div
      className={`yggdrasil-scale-legend ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        fontFamily: 'Roboto, arial, sans-serif',
        fontSize: '13px',
        color: 'var(--text-neutral-default, #2c3e50)',
      }}
      role="list"
      aria-label={title}
    >
      <div style={{ fontWeight: 500, marginBottom: '4px' }}>{title}</div>
      {ranges.map((range, index) => (
        <div
          key={`${range.label}-${index}`}
          role="listitem"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0 }}>
            <circle cx="6" cy="6" r="5" fill={range.color} />
          </svg>
          <span>{range.label}</span>
        </div>
      ))}
    </div>
  );
}

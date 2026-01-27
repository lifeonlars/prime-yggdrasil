/**
 * KeyFigure - Displays a key metric with optional comparison to previous period
 *
 * Shows: label, large formatted value, change percentage badge, previous period value.
 * Used in widget headers to highlight the main metric.
 */

import { useCallback, useState } from 'react';
import { formatCompact } from '../utils/formatters';

export interface KeyFigureProps {
  /** Label above the value (e.g., "Total") */
  label?: string;
  /** The main numeric value */
  value: number;
  /** Previous period value (shown with calendar icon) */
  previousValue?: number;
  /** Percentage change vs previous period (positive = up, negative = down) */
  changePercent?: number;
  /** Number formatting: use compact notation (K, M, B). Default: true */
  compact?: boolean;
  /** Decimal places for the main value. Default: 1 */
  decimals?: number;
  /** Unit suffix (e.g., "kr", "mentions") */
  units?: string;
  /** Show info tooltip icon next to label */
  showInfo?: boolean;
  /** Info tooltip text */
  infoText?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * KeyFigure component
 */
export function KeyFigure({
  label,
  value,
  previousValue,
  changePercent,
  compact = true,
  decimals = 1,
  units,
  showInfo = false,
  infoText,
  className = '',
}: KeyFigureProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const formattedValue = compact
    ? formatCompact(value, decimals)
    : value.toLocaleString('en-US');

  const formattedPrevious = previousValue != null
    ? compact
      ? formatCompact(previousValue, decimals)
      : previousValue.toLocaleString('en-US')
    : null;

  const displayValue = units ? `${formattedValue} ${units}` : formattedValue;

  const isPositive = changePercent != null && changePercent > 0;
  const isNegative = changePercent != null && changePercent < 0;

  const handleInfoEnter = useCallback(() => setShowTooltip(true), []);
  const handleInfoLeave = useCallback(() => setShowTooltip(false), []);

  return (
    <div
      className={`yggdrasil-key-figure ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '2px',
        fontFamily: 'Roboto, arial, sans-serif',
      }}
    >
      {/* Label row */}
      {label && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: 'var(--text-neutral-subdued, #7f8c8d)',
          }}
        >
          <span>{label}</span>
          {showInfo && (
            <span
              style={{ position: 'relative', cursor: 'help' }}
              onMouseEnter={handleInfoEnter}
              onMouseLeave={handleInfoLeave}
              aria-label={infoText || `${label} information`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                <text
                  x="7"
                  y="10.5"
                  textAnchor="middle"
                  fontSize="9"
                  fill="currentColor"
                  fontFamily="Roboto, arial, sans-serif"
                >
                  i
                </text>
              </svg>
              {showTooltip && infoText && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    right: 0,
                    marginBottom: '4px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    background: 'var(--surface-neutral-secondary, #f5f5f5)',
                    border: '1px solid var(--border-neutral-default, #ddd)',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    color: 'var(--text-neutral-default, #2c3e50)',
                  }}
                >
                  {infoText}
                </div>
              )}
            </span>
          )}
        </div>
      )}

      {/* Value + change badge row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: 1.1,
            color: 'var(--text-neutral-default, #1a2332)',
          }}
        >
          {displayValue}
        </span>
        {changePercent != null && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 500,
              background: isPositive
                ? 'var(--surface-context-success-subdued, #e8f5e9)'
                : isNegative
                  ? 'var(--surface-context-danger-subdued, #fce4ec)'
                  : 'var(--surface-neutral-tertiary, #f0f0f0)',
              color: isPositive
                ? 'var(--text-context-success, #2e7d32)'
                : isNegative
                  ? 'var(--text-context-danger, #c62828)'
                  : 'var(--text-neutral-subdued, #7f8c8d)',
            }}
          >
            <span style={{ fontSize: '11px' }}>
              {isPositive ? '↗' : isNegative ? '↘' : '—'}
            </span>
            {Math.abs(changePercent).toFixed(1)}%
          </span>
        )}
      </div>

      {/* Previous period row */}
      {formattedPrevious != null && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: 'var(--text-neutral-subdued, #7f8c8d)',
          }}
        >
          {/* Calendar icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect
              x="1"
              y="2"
              width="10"
              height="9"
              rx="1"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line x1="1" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1" />
            <line x1="4" y1="1" x2="4" y2="3" stroke="currentColor" strokeWidth="1" />
            <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span>{formattedPrevious}</span>
        </div>
      )}
    </div>
  );
}

/**
 * WidgetHeader - Title, date range, and key figures for a widget
 *
 * Left side: Title with optional info icon + date range subtitle
 * Right side: One or more KeyFigure components
 */

import type { ReactNode } from 'react';

export interface WidgetHeaderProps {
  /** Widget title */
  title: string;
  /** Date range subtitle (e.g., "1 May - 30 May 2024") */
  dateRange?: string;
  /** Show info icon next to title */
  showInfo?: boolean;
  /** Info tooltip text */
  infoText?: string;
  /** Key figures to display on the right */
  keyFigures?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * WidgetHeader component
 */
export function WidgetHeader({
  title,
  dateRange,
  showInfo = false,
  infoText,
  keyFigures,
  className = '',
}: WidgetHeaderProps) {
  return (
    <div
      className={`yggdrasil-widget-header ${className}`.trim()}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '16px 20px 8px',
        fontFamily: 'Roboto, arial, sans-serif',
      }}
    >
      {/* Left: Title + date range */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <h3
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--text-neutral-default, #1a2332)',
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
          {showInfo && (
            <span
              style={{
                cursor: 'help',
                color: 'var(--text-neutral-subdued, #7f8c8d)',
              }}
              title={infoText}
              aria-label={infoText || `${title} information`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                <text
                  x="8"
                  y="12"
                  textAnchor="middle"
                  fontSize="10"
                  fill="currentColor"
                  fontFamily="Roboto, arial, sans-serif"
                >
                  i
                </text>
              </svg>
            </span>
          )}
        </div>
        {dateRange && (
          <span
            style={{
              fontSize: '13px',
              color: 'var(--text-neutral-subdued, #7f8c8d)',
            }}
          >
            {dateRange}
          </span>
        )}
      </div>

      {/* Right: Key figures */}
      {keyFigures && (
        <div style={{ display: 'flex', gap: '24px' }}>
          {keyFigures}
        </div>
      )}
    </div>
  );
}

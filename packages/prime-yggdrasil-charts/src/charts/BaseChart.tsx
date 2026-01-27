/**
 * Base chart wrapper component
 *
 * Handles:
 * - Loading/empty/error states
 * - Theme application
 * - Responsive resize
 * - Accessibility
 */

import React, { useEffect, useRef } from 'react';
import type Highcharts from 'highcharts';
import { Skeleton } from 'primereact/skeleton';
import type { BaseChartProps, ChartState } from '../types/chart';
import { applyYggdrasilTheme } from '../theme/highcharts-theme';
import { ChartErrorBoundary } from './ChartErrorBoundary';

// Apply Yggdrasil theme at module load time (runs once when module is first imported)
applyYggdrasilTheme();

export interface BaseChartWrapperProps extends Omit<BaseChartProps, 'data' | 'encoding'> {
  /** Chart state */
  state?: ChartState;
  /** Highcharts options */
  options: Highcharts.Options;
  /** Highcharts constructor */
  highcharts: typeof Highcharts;
  /** Child content (for custom rendering) */
  children?: React.ReactNode;
}

/**
 * BaseChart wrapper component
 */
export function BaseChart({
  state = 'idle',
  loading,
  empty,
  error,
  options,
  highcharts,
  width,
  height = 400,
  className = '',
  id,
  ariaLabel,
  ariaDescription,
}: BaseChartWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);

  // Determine effective state
  const effectiveState: ChartState = loading
    ? 'loading'
    : error
      ? 'error'
      : state;

  // Create/update chart
  useEffect(() => {
    if (!containerRef.current || effectiveState !== 'idle') {
      return;
    }

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // Create new chart
    chartRef.current = highcharts.chart(containerRef.current, options);

    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [options, highcharts, effectiveState]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.reflow();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Container styles
  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    position: 'relative',
  };

  return (
    <ChartErrorBoundary>
    <div
      className={`yggdrasil-chart ${className}`.trim()}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
      aria-description={ariaDescription}
      id={id}
    >
      {/* Loading state - uses skeleton for visual consistency */}
      {effectiveState === 'loading' && (
        <div className="yggdrasil-chart-state yggdrasil-chart-loading" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
            {/* Title skeleton */}
            <Skeleton width="40%" height="1.5rem" />
            {/* Chart area skeleton */}
            <Skeleton width="100%" height="calc(100% - 60px)" borderRadius="4px" />
            {/* Legend skeleton */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Skeleton width="60px" height="1rem" />
              <Skeleton width="60px" height="1rem" />
              <Skeleton width="60px" height="1rem" />
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {effectiveState === 'empty' && (
        <div className="yggdrasil-chart-state yggdrasil-chart-empty">
          {empty || (
            <>
              <div className="yggdrasil-chart-state-icon">📊</div>
              <div className="yggdrasil-chart-state-text">No data available</div>
            </>
          )}
        </div>
      )}

      {/* Error state */}
      {effectiveState === 'error' && (
        <div className="yggdrasil-chart-state yggdrasil-chart-error">
          {typeof error === 'string' ? (
            <>
              <div className="yggdrasil-chart-state-icon">⚠️</div>
              <div className="yggdrasil-chart-state-text">{error}</div>
            </>
          ) : (
            error
          )}
        </div>
      )}

      {/* Chart container */}
      {effectiveState === 'idle' && (
        <div ref={containerRef} className="yggdrasil-chart-container" />
      )}
    </div>
    </ChartErrorBoundary>
  );
}

/**
 * Default empty state component
 */
export function DefaultEmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📊</div>
      <div style={{ fontSize: '14px', color: 'var(--text-neutral-subdued)' }}>
        No data available
      </div>
    </div>
  );
}

/**
 * Default error state component
 */
export function DefaultErrorState({ message }: { message?: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
      <div
        style={{
          fontSize: '14px',
          color: 'var(--text-context-danger)',
          marginBottom: '8px',
        }}
      >
        {message || 'Failed to load chart'}
      </div>
    </div>
  );
}

/**
 * Default loading state component
 */
export function DefaultLoadingState() {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid var(--border-neutral-default)',
          borderTopColor: 'var(--border-interactive-default)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px',
        }}
      />
      <div style={{ fontSize: '14px', color: 'var(--text-neutral-subdued)' }}>
        Loading chart...
      </div>
    </div>
  );
}

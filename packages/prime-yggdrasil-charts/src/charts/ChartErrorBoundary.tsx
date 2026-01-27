/**
 * ChartErrorBoundary - Catches render errors in chart components
 *
 * Prevents a single chart crash from taking down the entire page.
 * Displays a styled error state with optional retry.
 */

import React from 'react';

export interface ChartErrorBoundaryProps {
  /** Child content (the chart) */
  children: React.ReactNode;
  /** Callback when an error is caught */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Custom fallback UI. If not provided, shows default error state. */
  fallback?: React.ReactNode;
}

interface ChartErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary for chart components
 */
export class ChartErrorBoundary extends React.Component<
  ChartErrorBoundaryProps,
  ChartErrorBoundaryState
> {
  constructor(props: ChartErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ChartErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="yggdrasil-chart-error-boundary"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            textAlign: 'center',
            fontFamily: 'Roboto, arial, sans-serif',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <div
            style={{
              fontSize: '14px',
              color: 'var(--text-context-danger, #c62828)',
              marginBottom: '12px',
            }}
          >
            Chart failed to render
          </div>
          <button
            onClick={this.handleRetry}
            style={{
              padding: '6px 16px',
              fontSize: '13px',
              fontFamily: 'Roboto, arial, sans-serif',
              background: 'none',
              border: '1px solid var(--border-neutral-default, #ddd)',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--text-neutral-default, #1a2332)',
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

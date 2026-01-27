/**
 * WidgetContainer - Card wrapper for dashboard widgets
 *
 * Composes: WidgetMenuBar (optional) + WidgetHeader (optional) + content (chart/table/list)
 * Provides the rounded card frame with border and optional collapse behavior.
 */

import { useState } from 'react';
import { WidgetMenuBar } from './WidgetMenuBar';
import type { WidgetMenuBarProps } from './WidgetMenuBar';
import { WidgetHeader } from './WidgetHeader';
import type { WidgetHeaderProps } from './WidgetHeader';

export interface WidgetContainerProps {
  /** Widget content (chart, table, list, etc.) */
  children: React.ReactNode;
  /** Menu bar configuration. Pass false to hide. */
  menuBar?: Omit<WidgetMenuBarProps, 'collapsed' | 'onToggleCollapse' | 'showCollapse'> | false;
  /** Header configuration. Pass false to hide. */
  header?: Omit<WidgetHeaderProps, 'className'> | false;
  /** Enable collapse/expand. Default: true */
  collapsible?: boolean;
  /** Initial collapsed state. Default: false */
  defaultCollapsed?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Widget container ID */
  id?: string;
}

/**
 * WidgetContainer component
 */
export function WidgetContainer({
  children,
  menuBar,
  header,
  defaultCollapsed = false,
  className = '',
  id,
}: WidgetContainerProps) {
  const [collapsed] = useState(defaultCollapsed);

  return (
    <div
      className={`yggdrasil-widget ${className}`.trim()}
      id={id}
      style={{
        background: 'var(--surface-neutral-primary, #fff)',
        borderRadius: '12px',
        border: '1px solid var(--border-neutral-default, #e5e7eb)',
        overflow: 'hidden',
        fontFamily: 'Roboto, arial, sans-serif',
      }}
    >
      {/* Menu bar */}
      {menuBar !== false && menuBar && (
        <WidgetMenuBar
          {...menuBar}
        />
      )}

      {/* Collapsible content */}
      {!collapsed && (
        <>
          {/* Header */}
          {header !== false && header && (
            <WidgetHeader {...header} />
          )}

          {/* Content */}
          <div className="yggdrasil-widget-content" style={{ padding: '0 20px 20px' }}>
            {children}
          </div>
        </>
      )}
    </div>
  );
}

// Re-export types for convenience
export type { DownloadFormat } from './WidgetMenuBar';

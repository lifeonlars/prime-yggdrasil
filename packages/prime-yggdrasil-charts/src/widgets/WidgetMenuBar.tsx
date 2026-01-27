/**
 * WidgetMenuBar - Top bar showing data context and action buttons
 *
 * Left: Data context labels (e.g., "Editorial | Profile name")
 * Right: Action buttons (options, chart type switcher, download, collapse)
 */

import React, { useCallback, useRef, useState } from 'react';

export type DownloadFormat = 'png' | 'jpeg' | 'pdf' | 'csv';

export interface DownloadOption {
  format: DownloadFormat;
  label: string;
  description: string;
}

const DEFAULT_DOWNLOAD_OPTIONS: DownloadOption[] = [
  { format: 'png', label: 'PNG Image', description: 'Transparent background' },
  { format: 'jpeg', label: 'JPEG Image', description: 'White background' },
  { format: 'pdf', label: 'PDF Document', description: 'Single page' },
  { format: 'csv', label: 'CSV', description: 'Raw data' },
];

export interface WidgetMenuBarProps {
  /** Data context labels (e.g., ["Editorial", "Profile name"]) */
  contextLabels?: string[];
  /** Download handler - called with format when user selects a download option */
  onDownload?: (format: DownloadFormat) => void;
  /** Available download formats. Default: all four */
  downloadOptions?: DownloadOption[];
  /** Show collapse/expand toggle */
  showCollapse?: boolean;
  /** Collapsed state */
  collapsed?: boolean;
  /** Collapse toggle handler */
  onToggleCollapse?: () => void;
  /** Additional actions to render (e.g., chart type switcher) */
  actions?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * WidgetMenuBar component
 */
export function WidgetMenuBar({
  contextLabels = [],
  onDownload,
  downloadOptions = DEFAULT_DOWNLOAD_OPTIONS,
  actions,
  className = '',
}: WidgetMenuBarProps) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  const handleDownloadClick = useCallback(() => {
    setShowDownloadMenu((prev) => !prev);
  }, []);

  const handleDownloadSelect = useCallback(
    (format: DownloadFormat) => {
      setShowDownloadMenu(false);
      onDownload?.(format);
    },
    [onDownload]
  );

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!showDownloadMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDownloadMenu]);

  return (
    <div
      className={`yggdrasil-widget-menubar ${className}`.trim()}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 20px',
        fontFamily: 'Roboto, arial, sans-serif',
        fontSize: '13px',
        color: 'var(--text-neutral-subdued, #7f8c8d)',
        borderBottom: '1px solid var(--border-neutral-default, #eee)',
      }}
    >
      {/* Left: Context labels */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {contextLabels.map((label, index) => (
          <React.Fragment key={`${label}-${index}`}>
            {index > 0 && (
              <span style={{ margin: '0 4px', color: 'var(--text-neutral-subdued, #bbb)' }}>
                |
              </span>
            )}
            <span style={{ fontWeight: index === 0 ? 400 : 600, color: index === 0 ? undefined : 'var(--text-neutral-default, #1a2332)' }}>
              {label}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {actions}

        {/* Download button + dropdown */}
        {onDownload && (
          <div ref={downloadRef} style={{ position: 'relative' }}>
            <button
              onClick={handleDownloadClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: 'var(--text-neutral-default, #1a2332)',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
              aria-label="Download widget"
              aria-expanded={showDownloadMenu}
              aria-haspopup="true"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                style={{
                  transition: 'transform 0.2s',
                  transform: showDownloadMenu ? 'rotate(180deg)' : 'none',
                }}
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {showDownloadMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  background: 'var(--surface-neutral-primary, #fff)',
                  border: '1px solid var(--border-neutral-default, #ddd)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 100,
                  minWidth: '200px',
                  overflow: 'hidden',
                }}
                role="menu"
              >
                {downloadOptions.map((option) => (
                  <button
                    key={option.format}
                    onClick={() => handleDownloadSelect(option.format)}
                    role="menuitem"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      width: '100%',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'Roboto, arial, sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--surface-neutral-secondary, #f5f5f5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none';
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-neutral-default, #1a2332)' }}>
                      {option.label}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-neutral-subdued, #7f8c8d)', fontStyle: 'italic' }}>
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

import React from 'react'

export interface IconProps {
  /** Icon name - either PrimeIcons class (e.g., "pi pi-bell") or custom SVG name (e.g., "bell") */
  name: string
  /** Icon size - predefined size or custom pixel value */
  size?: 'small' | 'medium' | 'large' | number
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Icon color - inherits from currentColor by default */
  color?: string
  /** Click handler */
  onClick?: () => void
  /** Accessible label for screen readers */
  'aria-label'?: string
}

/**
 * Icon component with dual support for PrimeIcons and custom SVG icons.
 *
 * @example
 * // Using PrimeIcons (requires primeicons package)
 * <Icon name="pi pi-check" size="medium" />
 *
 * @example
 * // Using custom SVG from /icons/ directory
 * <Icon name="my-icon" size="large" />
 *
 * @example
 * // Custom size in pixels
 * <Icon name="pi pi-bell" size={32} color="var(--text-state-interactive)" />
 */
export function Icon({
  name,
  size = 'medium',
  className = '',
  style,
  color,
  onClick,
  'aria-label': ariaLabel,
}: IconProps) {
  // Determine if this is a PrimeIcon or custom SVG
  const isPrimeIcon = name.startsWith('pi pi-')

  // Size mapping for predefined sizes
  const sizeMap = { small: 16, medium: 20, large: 24 }
  const iconSize = typeof size === 'number' ? size : sizeMap[size]

  // Render PrimeIcon using <i> element with icon font classes
  if (isPrimeIcon) {
    return (
      <i
        className={`${name} ${className}`}
        style={{ fontSize: `${iconSize}px`, color, ...style }}
        onClick={onClick}
        aria-label={ariaLabel}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick()
                }
              }
            : undefined
        }
      />
    )
  }

  // Render custom SVG from /icons/ directory
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={ariaLabel || name}
      width={iconSize}
      height={iconSize}
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        color,
        ...style,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    />
  )
}

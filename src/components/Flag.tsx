/**
 * Supported country codes for flag display
 */
export type FlagCountry = 'denmark' | 'finland' | 'norway' | 'sweden' | 'uk'

/**
 * Flag component properties
 */
interface FlagProps {
  /** Country code for the flag to display */
  country: FlagCountry
  /** Size of the flag (default: 'medium') */
  size?: 'small' | 'medium' | 'large'
  /** Additional CSS classes to apply */
  className?: string
}

/**
 * Size mapping for flag dimensions (width in pixels)
 * Height is calculated as width * 0.667 (3:2 aspect ratio)
 */
const sizeMap = {
  small: 20,
  medium: 24,
  large: 32,
}

/**
 * Flag - Display country flags as SVG images
 *
 * A lightweight component for displaying country flags as inline SVG images
 * with consistent sizing and aspect ratios. Flags are loaded from the public
 * directory and maintain a standard 3:2 aspect ratio.
 *
 * **Features:**
 * - Predefined sizes (small, medium, large)
 * - Automatic 3:2 aspect ratio calculation
 * - Inline display with vertical alignment
 * - Accessible alt text for screen readers
 *
 * **Supported countries:**
 * - Denmark: `denmark`
 * - Finland: `finland`
 * - Norway: `norway`
 * - Sweden: `sweden`
 * - United Kingdom: `uk`
 *
 * **File requirements:**
 * Flag SVG files must be placed in the public directory with the naming
 * convention: `/flag-{country}.svg` (e.g., `/flag-denmark.svg`)
 *
 * **Size reference:**
 * - Small: 20px width × 13px height
 * - Medium: 24px width × 16px height
 * - Large: 32px width × 21px height
 *
 * @param props - Component properties
 * @param props.country - Country code ('denmark', 'finland', 'norway', 'sweden', or 'uk')
 * @param props.size - Flag size preset (default: 'medium')
 * @param props.className - Additional CSS classes for styling
 *
 * @returns React component
 *
 * @example
 * // Basic flag with default medium size
 * <Flag country="denmark" />
 *
 * @example
 * // Small flag with custom class
 * <Flag country="sweden" size="small" className="mr-2" />
 *
 * @example
 * // Large flag in a list
 * <ul>
 *   <li><Flag country="norway" size="large" /> Norway</li>
 *   <li><Flag country="finland" size="large" /> Finland</li>
 * </ul>
 *
 * @example
 * // In a user profile showing nationality
 * <div className="flex align-items-center gap-2">
 *   <Flag country="uk" />
 *   <span>United Kingdom</span>
 * </div>
 */
export function Flag({ country, size = 'medium', className = '' }: FlagProps) {
  const width = sizeMap[size]
  const height = Math.round(width * 0.667) // 3:2 aspect ratio for flags

  return (
    <img
      src={`/flag-${country}.svg`}
      alt={`${country} flag`}
      width={width}
      height={height}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    />
  )
}

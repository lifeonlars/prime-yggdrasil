import type { ReactNode } from 'react'
import { Card as PrimeCard } from 'primereact/card'

/**
 * Card component properties
 */
interface CardProps {
  /** Card content (any valid React node) */
  children: ReactNode
  /** Additional CSS classes to apply to the card */
  className?: string
  /**
   * Use PrimeReact Card component (.p-card) instead of utility classes.
   * PrimeReact Card has built-in elevation styling.
   * @default false
   */
  usePrimeCard?: boolean
}

/**
 * Card - Container block for grouping related content
 *
 * A card is a container that groups related content with consistent elevation,
 * spacing, and border radius. Use cards to visually separate sections of
 * content on a page.
 *
 * The Card component provides two rendering modes:
 * 1. Default mode: Uses Yggdrasil utility classes for lightweight styling
 * 2. PrimeReact mode: Uses the full PrimeReact Card component with advanced features
 *
 * **When to use:**
 * - Grouping related information (user profile, product details)
 * - Creating distinct content sections on a dashboard
 * - Displaying items in a grid or list layout
 * - Containing forms, tables, or other complex UI elements
 *
 * **Design tokens used:**
 * - `--surface-card`: Background color (adapts to theme)
 * - `--shadow-2`: Elevation shadow
 * - `--border-radius`: Rounded corners
 *
 * @param props - Component properties
 * @param props.children - Content to display inside the card
 * @param props.className - Additional CSS classes for customization (default: '')
 * @param props.usePrimeCard - Switch to PrimeReact Card component (default: false)
 *
 * @returns React component
 *
 * @example
 * // Basic card with default styling
 * <Card>
 *   <h3>User Profile</h3>
 *   <p>John Doe</p>
 *   <p>john@example.com</p>
 * </Card>
 *
 * @example
 * // Card with custom class
 * <Card className="mb-3">
 *   <h3>Dashboard Stats</h3>
 *   <DataTable value={stats} />
 * </Card>
 *
 * @example
 * // Using PrimeReact Card mode for advanced features
 * <Card usePrimeCard>
 *   <h3>Enhanced Card</h3>
 *   <p>Uses PrimeReact Card with built-in header, footer, and title slots.</p>
 * </Card>
 *
 * @see {@link https://primereact.org/card/} for PrimeReact Card documentation
 * @see {@link ../../docs/COMPONENT-INVENTORY.md} for component selection guide
 */
export function Card({ children, className = '', usePrimeCard = false }: CardProps) {
  if (usePrimeCard) {
    return (
      <PrimeCard className={className}>
        {children}
      </PrimeCard>
    )
  }

  return (
    <div className={`surface-card p-4 shadow-2 border-round ${className}`}>
      {children}
    </div>
  )
}

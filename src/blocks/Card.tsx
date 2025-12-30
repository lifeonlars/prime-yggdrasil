import type { ReactNode } from 'react'
import { Card as PrimeCard } from 'primereact/card'

interface CardProps {
  children: ReactNode
  className?: string
  /**
   * Use PrimeReact Card component (.p-card) instead of utility classes.
   * PrimeReact Card has built-in elevation styling.
   */
  usePrimeCard?: boolean
}

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

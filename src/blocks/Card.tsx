import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`surface-card p-4 shadow-2 border-round ${className}`}>
      {children}
    </div>
  )
}

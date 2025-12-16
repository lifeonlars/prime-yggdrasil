import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: ReactNode
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="surface-card p-4 shadow-2 border-round mb-4">
      <h1 className="text-900 font-bold text-4xl mb-2">{title}</h1>
      {description && <p className="text-600 mb-0">{description}</p>}
    </div>
  )
}

import type { ReactNode } from 'react'
import { Skeleton } from 'primereact/skeleton'

export interface TableShellProps {
  title: string
  description?: ReactNode
  actions?: ReactNode
  filters?: ReactNode
  loading?: boolean
  empty?: ReactNode
  children: ReactNode
}

/**
 * Lightweight shell to wrap DataTable instances with consistent spacing and framing.
 */
export function TableShell({ title, description, actions, filters, loading, empty, children }: TableShellProps) {
  return (
    <section className="surface-card p-4 border-round shadow-2">
      <header className="flex align-items-start justify-content-between gap-3 mb-3">
        <div>
          <h2 className="m-0 text-color text-xl">{title}</h2>
          {description && <p className="m-0 mt-1 text-color-secondary">{description}</p>}
        </div>
        {actions && <div className="flex align-items-center gap-2">{actions}</div>}
      </header>

      {filters && <div className="mb-3">{filters}</div>}

      {loading ? (
        <div className="flex flex-column gap-2">
          <Skeleton height="2.5rem" />
          <Skeleton height="2.5rem" />
          <Skeleton height="2.5rem" />
        </div>
      ) : empty ? (
        <div className="p-4 border-1 border-dashed border-200 text-center text-color-secondary">{empty}</div>
      ) : (
        children
      )}
    </section>
  )
}

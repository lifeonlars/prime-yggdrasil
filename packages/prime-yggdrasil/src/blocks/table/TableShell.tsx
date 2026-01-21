import type { ReactNode } from 'react'
import { Skeleton } from 'primereact/skeleton'

/**
 * TableShell component properties
 */
export interface TableShellProps {
  /** Table title displayed in the header */
  title: string
  /** Optional description text below the title */
  description?: ReactNode
  /** Optional action buttons displayed in top-right corner (e.g., "Add User", "Export") */
  actions?: ReactNode
  /** Optional filter controls displayed between header and table */
  filters?: ReactNode
  /** Show loading skeleton instead of table content */
  loading?: boolean
  /** Optional empty state content to display when no data */
  empty?: ReactNode
  /** Table content (typically a DataTable component) */
  children: ReactNode
}

/**
 * TableShell - Consistent wrapper for DataTable components
 *
 * A lightweight container that wraps DataTable instances with standard layout,
 * including header section, optional filters, and loading/empty state handling.
 * Provides consistent spacing, elevation, and framing for all table views.
 *
 * **Features:**
 * - Header with title and optional description
 * - Top-right actions slot for buttons (Add, Export, etc.)
 * - Optional filter bar between header and table
 * - Built-in loading skeleton (3 rows)
 * - Empty state display with dashed border
 * - Card-style elevation and padding
 *
 * **Layout structure:**
 * ```
 * ┌─────────────────────────────────────┐
 * │ Title              [Actions]        │
 * │ Description                          │
 * ├─────────────────────────────────────┤
 * │ [Filters]                            │
 * ├─────────────────────────────────────┤
 * │ [Table or Loading or Empty]         │
 * └─────────────────────────────────────┘
 * ```
 *
 * **When to use:**
 * - Wrapping any DataTable component
 * - Creating data grid pages
 * - Building list views with actions
 * - Displaying searchable/filterable data
 *
 * **Design tokens used:**
 * - `--surface-card`: Background color
 * - `--shadow-2`: Card elevation
 * - `--text-color`: Title text
 * - `--text-color-secondary`: Description text
 *
 * @param props - Component properties
 * @param props.title - Main heading for the table
 * @param props.description - Optional subtitle or description
 * @param props.actions - Action buttons to display in header (e.g., Button components)
 * @param props.filters - Filter controls to display below header
 * @param props.loading - Show loading skeleton when true
 * @param props.empty - Content to show when table has no data
 * @param props.children - DataTable or other table content
 *
 * @returns React component
 *
 * @example
 * // Basic table shell with DataTable
 * <TableShell title="Users" description="Manage user accounts">
 *   <DataTable value={users}>
 *     {textColumn({ field: 'name', header: 'Name' })}
 *     {textColumn({ field: 'email', header: 'Email' })}
 *   </DataTable>
 * </TableShell>
 *
 * @example
 * // With action buttons
 * <TableShell
 *   title="Products"
 *   actions={
 *     <>
 *       <Button label="Export" icon="pi pi-download" outlined />
 *       <Button label="Add Product" icon="pi pi-plus" />
 *     </>
 *   }
 * >
 *   <DataTable value={products}>
 *     {textColumn({ field: 'name', header: 'Product Name' })}
 *     {statusColumn({ field: 'status' })}
 *   </DataTable>
 * </TableShell>
 *
 * @example
 * // With filters and loading state
 * <TableShell
 *   title="Orders"
 *   description="View and manage customer orders"
 *   filters={
 *     <div className="flex gap-2">
 *       <InputText placeholder="Search orders..." />
 *       <Dropdown options={statusOptions} placeholder="Filter by status" />
 *     </div>
 *   }
 *   loading={isLoading}
 * >
 *   <DataTable value={orders}>
 *     {textColumn({ field: 'orderNumber', header: 'Order #' })}
 *     {statusColumn({ field: 'status' })}
 *   </DataTable>
 * </TableShell>
 *
 * @example
 * // With empty state
 * <TableShell
 *   title="Notifications"
 *   empty={
 *     <div>
 *       <i className="pi pi-bell text-4xl mb-3" />
 *       <p>No notifications yet</p>
 *       <Button label="Create Notification" text />
 *     </div>
 *   }
 * >
 *   <DataTable value={notifications}>
 *     {textColumn({ field: 'message', header: 'Message' })}
 *   </DataTable>
 * </TableShell>
 *
 * @see {@link https://primereact.org/datatable/} for DataTable documentation
 * @see {@link https://primereact.org/skeleton/} for Skeleton loading documentation
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

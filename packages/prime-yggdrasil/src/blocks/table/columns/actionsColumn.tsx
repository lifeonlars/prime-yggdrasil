import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import type { ColumnProps } from 'primereact/column'
import type { ReactElement } from 'react'
import type { TableRow, TableValueArray } from './types'

/**
 * Configuration options for actions column
 *
 * @template TValue - Array type representing the table data structure
 */
export interface ActionsColumnOptions<TValue extends TableValueArray> {
  /** Column header text (defaults to "Actions") */
  header?: string
  /** Icon for action button (defaults to 'pi pi-ellipsis-v') */
  icon?: string
  /** Accessible label for screen readers (defaults to "Row actions") */
  ariaLabel?: string
  /** Click handler called with the row data */
  onClick?: (row: TableRow<TValue>) => void
  /** Additional PrimeReact Column props to pass through */
  columnProps?: ColumnProps
}

/**
 * actionsColumn - Create an actions column with icon button
 *
 * Factory function that creates a PrimeReact Column containing an icon button
 * for triggering row-level actions. This is a minimal implementation intended
 * as a starting point - consuming applications should typically replace the
 * simple onClick handler with a menu popup for multiple actions.
 *
 * **Features:**
 * - Centered icon button in fixed-width column
 * - Accessible with aria-label for screen readers
 * - Text button style (no background)
 * - Rounded shape
 * - Passes full row data to onClick handler
 *
 * **Common patterns in consuming apps:**
 * Instead of using onClick directly, typically you'll:
 * 1. Trigger a popup menu with edit/delete/etc. options
 * 2. Open a dialog for row details
 * 3. Navigate to a detail page with row ID
 *
 * **When to use:**
 * - Tables requiring row-level actions (edit, delete, view)
 * - As a placeholder before implementing full action menu
 * - Quick prototyping of table interactions
 *
 * @template TValue - Array type representing table data
 *
 * @param options - Column configuration options (all optional)
 * @param options.header - Column header text
 * @param options.icon - PrimeIcons icon class (e.g., 'pi pi-pencil')
 * @param options.ariaLabel - Screen reader label for the button
 * @param options.onClick - Handler function receiving row data
 * @param options.columnProps - Additional Column properties
 *
 * @returns React element (PrimeReact Column component)
 *
 * @example
 * // Basic actions column with default ellipsis icon
 * <DataTable value={users}>
 *   {textColumn({ field: 'name', header: 'Name' })}
 *   {textColumn({ field: 'email', header: 'Email' })}
 *   {actionsColumn({ onClick: (row) => console.log('Action for', row.name) })}
 * </DataTable>
 *
 * @example
 * // Custom icon and handler
 * {actionsColumn({
 *   icon: 'pi pi-pencil',
 *   ariaLabel: 'Edit user',
 *   onClick: (row) => navigate(`/users/${row.id}/edit`)
 * })}
 *
 * @example
 * // Typical pattern: Open menu on click
 * const [selectedRow, setSelectedRow] = useState(null);
 * const menuRef = useRef(null);
 *
 * {actionsColumn({
 *   onClick: (row) => {
 *     setSelectedRow(row);
 *     menuRef.current.toggle(event);
 *   }
 * })}
 * <Menu
 *   ref={menuRef}
 *   model={[
 *     { label: 'Edit', icon: 'pi pi-pencil', command: () => handleEdit(selectedRow) },
 *     { label: 'Delete', icon: 'pi pi-trash', command: () => handleDelete(selectedRow) }
 *   ]}
 *   popup
 * />
 *
 * @example
 * // With custom header and styling
 * {actionsColumn({
 *   header: 'Manage',
 *   icon: 'pi pi-cog',
 *   onClick: (row) => openSettingsDialog(row),
 *   columnProps: { style: { width: '6rem' } }
 * })}
 *
 * @see {@link https://primereact.org/button/} for Button component documentation
 * @see {@link https://primereact.org/menu/} for Menu popup examples
 */
export function actionsColumn<TValue extends TableValueArray>(
  options?: ActionsColumnOptions<TValue>,
): ReactElement {
  const icon = options?.icon ?? 'pi pi-ellipsis-v'
  const ariaLabel = options?.ariaLabel ?? 'Row actions'

  return (
    <Column
      columnKey="actions"
      header={options?.header ?? 'Actions'}
      alignHeader="center"
      bodyStyle={{ textAlign: 'center' }}
      body={(rowData: TableRow<TValue>) => (
        <Button
          text
          rounded
          icon={icon}
          aria-label={ariaLabel}
          onClick={() => options?.onClick?.(rowData)}
        />
      )}
      style={{ width: '5rem' }}
      {...options?.columnProps}
    />
  )
}

import { Dropdown } from 'primereact/dropdown'
import { Column } from 'primereact/column'
import type { ColumnFilterElementTemplateOptions, ColumnProps } from 'primereact/column'
import type { DropdownChangeEvent } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import type { ReactElement, ReactNode } from 'react'
import type { TableRow, TableValueArray } from './types'

/**
 * Type alias for PrimeReact Tag severity levels
 */
type StatusSeverity = NonNullable<React.ComponentProps<typeof Tag>['severity']>

/**
 * Status option configuration for dropdown filter
 */
export interface StatusOption {
  /** Display label for the status */
  label: string
  /** Internal value for the status */
  value: string
  /** Color severity for the Tag component (success, info, warning, danger, etc.) */
  severity?: StatusSeverity
}

/**
 * Configuration options for status column
 *
 * @template TValue - Array type representing the table data structure
 */
export interface StatusColumnOptions<TValue extends TableValueArray> {
  /** Field name from data object containing status value */
  field: keyof TableRow<TValue> & string
  /** Column header text (defaults to "Status") */
  header?: string
  /** Available status options for dropdown filter */
  options?: StatusOption[]
  /** Enable dropdown-based filtering (default: false) */
  filter?: boolean
  /** Placeholder text for filter dropdown (defaults to "Filter status") */
  placeholder?: string
  /** Additional PrimeReact Column props to pass through */
  columnProps?: ColumnProps
  /** Property name to use as option label (defaults to 'label') */
  optionLabel?: keyof StatusOption & string
}

/**
 * Default severity mapping for common status values
 * Used when no explicit severity is provided in status options
 */
const defaultSeverity: Record<string, StatusSeverity | undefined> = {
  active: 'success',
  enabled: 'success',
  invited: 'info',
  pending: 'info',
  paused: 'warning',
  suspended: 'danger',
  disabled: 'danger',
}

/**
 * statusColumn - Create a status column with colored Tag chips
 *
 * Factory function that creates a PrimeReact Column displaying status values
 * as colored Tag components. Automatically maps common status values to appropriate
 * severity colors, with support for custom status options and dropdown filtering.
 *
 * **Features:**
 * - Displays status as colored Tag chips
 * - Automatic severity detection for common statuses
 * - Optional dropdown filter for status values
 * - Custom status options with colors
 * - Type-safe field selection
 *
 * **Default severity mappings:**
 * - Green (success): active, enabled
 * - Blue (info): invited, pending
 * - Yellow (warning): paused
 * - Red (danger): suspended, disabled
 *
 * **When to use:**
 * - Displaying user status (active/inactive)
 * - Showing order status (pending/shipped/delivered)
 * - Indicating record state (enabled/disabled)
 * - Any column with categorical state values
 *
 * @template TValue - Array type representing table data
 *
 * @param options - Column configuration options
 * @param options.field - Field name containing status value
 * @param options.header - Column header text (defaults to "Status")
 * @param options.options - Array of status options for filter and custom severities
 * @param options.filter - Enable dropdown filter
 * @param options.placeholder - Filter dropdown placeholder
 * @param options.columnProps - Additional Column properties
 * @param options.optionLabel - Property to use as option label
 *
 * @returns React element (PrimeReact Column component)
 *
 * @example
 * // Basic status column (uses default severity mappings)
 * <DataTable value={users}>
 *   {statusColumn({ field: 'status' })}
 * </DataTable>
 *
 * @example
 * // Status column with custom options and filter
 * {statusColumn({
 *   field: 'status',
 *   header: 'Account Status',
 *   filter: true,
 *   options: [
 *     { label: 'Active', value: 'active', severity: 'success' },
 *     { label: 'Pending', value: 'pending', severity: 'info' },
 *     { label: 'Suspended', value: 'suspended', severity: 'danger' }
 *   ]
 * })}
 *
 * @example
 * // Order status with custom severities
 * {statusColumn({
 *   field: 'orderStatus',
 *   header: 'Status',
 *   filter: true,
 *   options: [
 *     { label: 'Pending', value: 'pending', severity: 'warning' },
 *     { label: 'Processing', value: 'processing', severity: 'info' },
 *     { label: 'Shipped', value: 'shipped', severity: 'success' },
 *     { label: 'Delivered', value: 'delivered', severity: 'success' },
 *     { label: 'Cancelled', value: 'cancelled', severity: 'danger' }
 *   ],
 *   placeholder: 'Filter by order status'
 * })}
 *
 * @see {@link https://primereact.org/tag/} for Tag component documentation
 * @see {@link https://primereact.org/dropdown/} for Dropdown filter documentation
 */
export function statusColumn<TValue extends TableValueArray>(
  options: StatusColumnOptions<TValue>,
): ReactElement {
  const { field, header, filter, placeholder, options: dropdownOptions, columnProps } = options

  const body = (rowData: TableRow<TValue>): ReactNode => {
    const rawValue = rowData[field]
    const value = typeof rawValue === 'string' ? rawValue : String(rawValue ?? '')
    const normalized = value.toLowerCase()
    const severity = dropdownOptions?.find((opt) => opt.value === value)?.severity ?? defaultSeverity[normalized]

    return <Tag value={value} severity={severity} />
  }

  const filterElement =
    filter && dropdownOptions ? (
      (filterOptions: ColumnFilterElementTemplateOptions) => (
        <Dropdown
          options={dropdownOptions}
          optionLabel={options.optionLabel ?? 'label'}
          optionValue="value"
          value={filterOptions.value}
          placeholder={placeholder ?? 'Filter status'}
          className="w-12rem"
          onChange={(event: DropdownChangeEvent) => filterOptions.filterCallback(event.value)}
        />
      )
    ) : undefined

  return (
    <Column
      columnKey={field}
      field={field}
      header={header ?? 'Status'}
      body={body}
      showFilterMatchModes={false}
      filter={filter}
      filterElement={filterElement}
      style={{ minWidth: '10rem' }}
      bodyClassName="text-sm"
      {...columnProps}
    />
  )
}

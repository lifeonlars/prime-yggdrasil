import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import type { ColumnFilterElementTemplateOptions, ColumnProps } from 'primereact/column'
import type { ReactElement, ReactNode } from 'react'
import type { TableRow, TableValueArray } from './types'

/**
 * Configuration options for text column
 *
 * @template TValue - Array type representing the table data structure
 */
export interface TextColumnOptions<TValue extends TableValueArray> {
  /** Field name from data object to display in this column */
  field: keyof TableRow<TValue> & string
  /** Column header text (defaults to field name if not provided) */
  header?: string
  /** Enable column sorting (default: false) */
  sortable?: boolean
  /** Enable text-based filtering (default: false) */
  filter?: boolean
  /** Placeholder text for filter input (defaults to "Filter {header}") */
  placeholder?: string
  /** Text alignment within column cells (default: 'left') */
  align?: 'left' | 'center' | 'right'
  /** Custom render function for cell content (overrides default text display) */
  body?: (row: TableRow<TValue>) => ReactNode
  /** Additional PrimeReact Column props to pass through */
  columnProps?: ColumnProps
}

/**
 * textColumn - Create a text-based table column with sorting and filtering
 *
 * Factory function that creates a PrimeReact Column configured for displaying
 * text data. Supports optional sorting and text-based filtering with an input field.
 *
 * **Features:**
 * - Displays text data from specified field
 * - Optional column sorting (click header to sort)
 * - Optional text filter with InputText
 * - Configurable text alignment
 * - Custom cell rendering via body function
 * - Type-safe field selection
 *
 * **When to use:**
 * - Displaying names, descriptions, titles, or other text data
 * - Columns requiring alphabetical sorting
 * - Columns needing text-based search/filter
 *
 * **Type constraints:**
 * The generic `TValue` must extend `TableValueArray` to ensure type safety
 * when accessing row data fields.
 *
 * @template TValue - Array type representing table data (e.g., `['id', 'name', 'email']`)
 *
 * @param options - Column configuration options
 * @param options.field - Field name to display (type-checked against table data)
 * @param options.header - Column header label
 * @param options.sortable - Enable sorting functionality
 * @param options.filter - Enable filter input field
 * @param options.placeholder - Filter input placeholder text
 * @param options.align - Cell text alignment
 * @param options.body - Custom render function for cell content
 * @param options.columnProps - Additional PrimeReact Column properties
 *
 * @returns React element (PrimeReact Column component)
 *
 * @example
 * // Basic text column
 * <DataTable value={users}>
 *   {textColumn<typeof users>({ field: 'name', header: 'Full Name' })}
 * </DataTable>
 *
 * @example
 * // Sortable column with filtering
 * {textColumn({
 *   field: 'email',
 *   header: 'Email Address',
 *   sortable: true,
 *   filter: true,
 *   placeholder: 'Search emails...'
 * })}
 *
 * @example
 * // Center-aligned column with custom rendering
 * {textColumn({
 *   field: 'role',
 *   header: 'Role',
 *   align: 'center',
 *   body: (row) => <strong>{row.role.toUpperCase()}</strong>
 * })}
 *
 * @example
 * // Column with all options
 * {textColumn({
 *   field: 'description',
 *   header: 'Description',
 *   sortable: true,
 *   filter: true,
 *   placeholder: 'Filter descriptions',
 *   align: 'left',
 *   columnProps: { style: { minWidth: '300px' } }
 * })}
 *
 * @see {@link https://primereact.org/datatable/} for DataTable documentation
 * @see {@link https://primereact.org/column/} for Column component API
 */
export function textColumn<TValue extends TableValueArray>(options: TextColumnOptions<TValue>): ReactElement {
  const { field, header, sortable, filter, placeholder, align, body, columnProps } = options

  const filterElement =
    filter === true
      ? (filterOptions: ColumnFilterElementTemplateOptions) => (
          <InputText
            type="text"
            value={filterOptions.value ?? ''}
            onChange={(event) => filterOptions.filterCallback(event.target.value)}
            placeholder={placeholder ?? `Filter ${header ?? field}`}
            className="p-inputtext-sm w-full"
          />
        )
      : undefined

  return (
    <Column
      columnKey={field}
      field={field}
      header={header}
      sortable={sortable}
      filter={filter}
      filterElement={filterElement}
      align={align}
      body={body}
      {...columnProps}
    />
  )
}

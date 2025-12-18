import { Dropdown } from 'primereact/dropdown'
import { Column } from 'primereact/column'
import type { ColumnFilterElementTemplateOptions, ColumnProps } from 'primereact/column'
import type { DropdownChangeEvent } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import type { ReactElement, ReactNode } from 'react'
import type { TableRow, TableValueArray } from './types'

type StatusSeverity = NonNullable<React.ComponentProps<typeof Tag>['severity']>

export interface StatusOption {
  label: string
  value: string
  severity?: StatusSeverity
}

export interface StatusColumnOptions<TValue extends TableValueArray> {
  field: keyof TableRow<TValue> & string
  header?: string
  options?: StatusOption[]
  filter?: boolean
  placeholder?: string
  columnProps?: ColumnProps
  optionLabel?: keyof StatusOption & string
}

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
 * Displays a status chip with optional dropdown filter.
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

import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import type { ColumnFilterElementTemplateOptions, ColumnProps } from 'primereact/column'
import type { ReactElement, ReactNode } from 'react'
import type { TableRow, TableValueArray } from './types'

export interface TextColumnOptions<TValue extends TableValueArray> {
  field: keyof TableRow<TValue> & string
  header?: string
  sortable?: boolean
  filter?: boolean
  placeholder?: string
  align?: 'left' | 'center' | 'right'
  body?: (row: TableRow<TValue>) => ReactNode
  columnProps?: ColumnProps
}

/**
 * Basic text column with optional sorting and text filter.
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

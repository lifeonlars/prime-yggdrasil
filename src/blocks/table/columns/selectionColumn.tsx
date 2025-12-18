import { Column } from 'primereact/column'
import type { ColumnProps } from 'primereact/column'
import type { ReactElement } from 'react'
import type { TableValueArray } from './types'

export interface SelectionColumnOptions<TValue extends TableValueArray> {
  header?: string
  frozen?: boolean
  widthRem?: number
  columnProps?: ColumnProps
}

/**
 * Checkbox selection column sized for row selection presets.
 */
export function selectionColumn<TValue extends TableValueArray>(
  options?: SelectionColumnOptions<TValue>,
): ReactElement {
  const width = options?.widthRem ?? 3.5

  return (
    <Column
      columnKey="selection"
      selectionMode="multiple"
      header={options?.header}
      headerStyle={{ width: `${width}rem` }}
      bodyStyle={{ textAlign: 'center' }}
      frozen={options?.frozen}
      {...options?.columnProps}
    />
  )
}

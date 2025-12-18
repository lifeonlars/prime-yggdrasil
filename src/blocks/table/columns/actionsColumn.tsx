import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import type { ColumnProps } from 'primereact/column'
import type { ReactElement } from 'react'
import type { TableRow, TableValueArray } from './types'

export interface ActionsColumnOptions<TValue extends TableValueArray> {
  header?: string
  icon?: string
  ariaLabel?: string
  onClick?: (row: TableRow<TValue>) => void
  columnProps?: ColumnProps
}

/**
 * Minimal action trigger column. Replace handler with menus in consuming apps.
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

import { Avatar } from 'primereact/avatar'
import { Column } from 'primereact/column'
import type { ColumnProps } from 'primereact/column'
import type { ReactElement, ReactNode } from 'react'
import type { TableRow, TableValueArray } from './types'

export interface IdentityColumnOptions<TValue extends TableValueArray> {
  field: keyof TableRow<TValue> & string
  header?: string
  secondaryField?: keyof TableRow<TValue> & string
  avatarField?: keyof TableRow<TValue> & string
  columnProps?: ColumnProps
}

/**
 * Renders an identity cell with Avatar + primary + optional secondary text.
 */
export function identityColumn<TValue extends TableValueArray>(
  options: IdentityColumnOptions<TValue>,
): ReactElement {
  const { field, header, secondaryField, avatarField, columnProps } = options

  const body = (rowData: TableRow<TValue>): ReactNode => {
    const primary = rowData[field]
    const secondary = secondaryField ? rowData[secondaryField] : undefined
    const avatarValue = avatarField ? rowData[avatarField] : undefined
    const avatarLabel =
      typeof primary === 'string' && primary.length > 0 ? primary.charAt(0).toUpperCase() : undefined

    return (
      <div className="flex align-items-center gap-3">
        <Avatar
          image={typeof avatarValue === 'string' && avatarValue.startsWith('http') ? avatarValue : undefined}
          label={avatarLabel}
          shape="circle"
        />
        <div className="flex flex-column gap-1">
          <span className="text-color font-semibold">{primary as ReactNode}</span>
          {secondary && <span className="text-color-secondary text-sm">{secondary as ReactNode}</span>}
        </div>
      </div>
    )
  }

  const bodyClassName = 'align-items-center'

  return (
    <Column
      columnKey={field}
      field={field}
      header={header ?? 'Name'}
      body={body}
      bodyClassName={bodyClassName}
      style={{ minWidth: '16rem' }}
      {...columnProps}
    />
  )
}

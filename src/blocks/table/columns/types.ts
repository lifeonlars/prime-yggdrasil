import type { DataTableValueArray } from 'primereact/datatable'

export type TableValueArray = DataTableValueArray
export type TableRow<TValue extends TableValueArray> = TValue[number]

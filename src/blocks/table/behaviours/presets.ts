import type { DataTableProps, DataTableValueArray } from 'primereact/datatable'

type TablePresetProps<TValue extends DataTableValueArray> = Partial<DataTableProps<TValue>>

type SelectionChangeHandler<TValue extends DataTableValueArray> = NonNullable<DataTableProps<TValue>['onSelectionChange']>
type RowToggleHandler<TValue extends DataTableValueArray> = NonNullable<DataTableProps<TValue>['onRowToggle']>
type RowEditChangeHandler<TValue extends DataTableValueArray> = NonNullable<DataTableProps<TValue>['onRowEditChange']>
type RowEditCompleteHandler<TValue extends DataTableValueArray> = NonNullable<DataTableProps<TValue>['onRowEditComplete']>
type RowReorderHandler<TValue extends DataTableValueArray> = NonNullable<DataTableProps<TValue>['onRowReorder']>

export interface StandardTableOptions<TValue extends DataTableValueArray> {
  dataKey?: DataTableProps<TValue>['dataKey']
}

/**
 * Baseline table configuration shared across table examples.
 * Use this as the starting point for most tables to keep defaults consistent.
 */
export function standardTablePreset<TValue extends DataTableValueArray>(
  options?: StandardTableOptions<TValue>,
): TablePresetProps<TValue> {
  return {
    dataKey: options?.dataKey,
    stripedRows: true,
    resizableColumns: true,
    columnResizeMode: 'fit',
    scrollable: true,
  }
}

export interface SelectableRowsOptions<TValue extends DataTableValueArray> {
  dataKey: string
  selection: TValue
  onSelectionChange: SelectionChangeHandler<TValue>
  selectionMode?: 'checkbox' | 'multiple'
  metaKeySelection?: boolean
}

/**
 * Enables row selection with built-in DataTable checkbox selection.
 * Caller controls the selected rows and dataKey.
 */
export function selectableRowsPreset<TValue extends DataTableValueArray>(
  options: SelectableRowsOptions<TValue>,
): TablePresetProps<TValue> {
  return {
    dataKey: options.dataKey,
    selectionMode: options.selectionMode ?? 'checkbox',
    selection: options.selection,
    onSelectionChange: options.onSelectionChange,
    metaKeySelection: options.metaKeySelection ?? false,
  }
}

export interface ExpandableRowsOptions<TValue extends DataTableValueArray> {
  dataKey: string
  expandedRows: DataTableValueArray | Record<string, boolean>
  onRowToggle: RowToggleHandler<TValue>
  rowExpansionTemplate: NonNullable<DataTableProps<TValue>['rowExpansionTemplate']>
}

/**
 * Enables row expansion with a provided expansion template.
 * Caller supplies the expanded rows state and toggle handler.
 */
export function expandableRowsPreset<TValue extends DataTableValueArray>(
  options: ExpandableRowsOptions<TValue>,
): TablePresetProps<TValue> {
  return {
    dataKey: options.dataKey,
    expandedRows: options.expandedRows,
    onRowToggle: options.onRowToggle,
    rowExpansionTemplate: options.rowExpansionTemplate,
  }
}

export interface EditableRowsOptions<TValue extends DataTableValueArray> {
  dataKey: string
  editingRows: Record<string, boolean>
  onRowEditChange: RowEditChangeHandler<TValue>
  onRowEditComplete?: RowEditCompleteHandler<TValue>
  editMode?: 'row' | 'cell'
}

/**
 * Sets the DataTable into edit mode. Defaults to row-level editing.
 * Caller is responsible for providing column editors.
 */
export function editableRowsPreset<TValue extends DataTableValueArray>(
  options: EditableRowsOptions<TValue>,
): TablePresetProps<TValue> {
  return {
    dataKey: options.dataKey,
    editMode: options.editMode ?? 'row',
    editingRows: options.editingRows,
    onRowEditChange: options.onRowEditChange,
    onRowEditComplete: options.onRowEditComplete,
  }
}

export interface DraggableRowsOptions<TValue extends DataTableValueArray> {
  onRowReorder?: RowReorderHandler<TValue>
}

/**
 * Placeholder preset for row drag-and-drop. Wire onRowReorder when ready.
 */
export function draggableRowsPreset<TValue extends DataTableValueArray>(
  options?: DraggableRowsOptions<TValue>,
): TablePresetProps<TValue> {
  return {
    reorderableRows: true,
    onRowReorder: options?.onRowReorder,
  }
}

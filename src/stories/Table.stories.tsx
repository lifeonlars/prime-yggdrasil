import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import type { DataTableExpandedRows, DataTableFilterMeta } from 'primereact/datatable'
import { FilterMatchMode } from 'primereact/api'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { InputText } from 'primereact/inputtext'
import type { DropdownChangeEvent } from 'primereact/dropdown'
import { Dropdown } from 'primereact/dropdown'
import {
  TableShell,
  actionsColumn,
  expandableRowsPreset,
  identityColumn,
  selectableRowsPreset,
  selectionColumn,
  standardTablePreset,
  statusColumn,
  textColumn,
} from '../blocks/table'
import {
  exampleEntityRows,
  exampleStatusOptions,
  type ExampleEntityRow,
} from '../blocks/table/examples/entityTableExampleData'

const meta = {
  title: 'Blocks/Table',
  component: TableShell,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TableShell>

export default meta
type Story = StoryObj<typeof meta>

const createInitialFilters = (): DataTableFilterMeta => ({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  role: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
})

interface EntityTableStoryProps {
  loading?: boolean
  empty?: boolean
}

function EntityTableStory({ loading, empty }: EntityTableStoryProps) {
  const [filters, setFilters] = useState<DataTableFilterMeta>(() => createInitialFilters())
  const [selection, setSelection] = useState<ExampleEntityRow[]>([])

  const data = useMemo(() => (empty ? [] : exampleEntityRows), [empty])
  const emptyContent = empty ? 'No entities found' : undefined

  const onGlobalFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFilters((prev) => ({
      ...prev,
      global: { ...(prev.global ?? {}), value },
    }))
  }

  const onStatusFilterChange = (event: DropdownChangeEvent) => {
    setFilters((prev) => ({
      ...prev,
      status: { ...(prev.status ?? {}), value: event.value },
    }))
  }

  const filtersBar = (
    <div className="flex flex-wrap gap-3">
      <span className="p-input-icon-left" style={{ minWidth: '20rem' }}>
        <i className="pi pi-search" />
        <InputText
          placeholder="Search by name, email, or role"
          value={(filters.global as any)?.value ?? ''}
          onChange={onGlobalFilterChange}
          className="w-full"
        />
      </span>
      <Dropdown
        options={exampleStatusOptions}
        optionLabel="label"
        optionValue="value"
        value={(filters.status as any)?.value ?? null}
        placeholder="Filter by status"
        showClear
        style={{ minWidth: '12rem' }}
        onChange={onStatusFilterChange}
      />
    </div>
  )

  const columns = [
    selectionColumn<ExampleEntityRow>(),
    identityColumn<ExampleEntityRow>({ field: 'name', secondaryField: 'email', header: 'Entity' }),
    textColumn<ExampleEntityRow>({
      field: 'role',
      header: 'Role',
      sortable: true,
      filter: true,
      placeholder: 'Filter role',
      columnProps: { style: { minWidth: '8rem' } },
    }),
    statusColumn<ExampleEntityRow>({
      field: 'status',
      options: exampleStatusOptions,
      filter: true,
      placeholder: 'Filter status',
    }),
    actionsColumn<ExampleEntityRow>(),
  ]

  return (
    <TableShell
      title="Entity Table Example"
      description="Composes table behaviours and archetype columns into a simple entity listing."
      filters={filtersBar}
      loading={loading}
      empty={emptyContent}
      actions={<span className="text-sm text-600">Selection: {selection.length}</span>}
    >
      <DataTable
        value={data}
        paginator
        rows={5}
        filterDisplay="menu"
        globalFilterFields={['name', 'email', 'role', 'status']}
        emptyMessage="No entities match the current filters"
        {...standardTablePreset({ dataKey: 'id' })}
        {...selectableRowsPreset({
          dataKey: 'id',
          selection,
          onSelectionChange: (event) => setSelection(event.value as ExampleEntityRow[]),
          metaKeySelection: false,
        })}
        filters={filters}
        onFilter={(event) => setFilters(event.filters)}
      >
        {columns}
      </DataTable>
    </TableShell>
  )
}

export const Composition: Story = {
  name: 'Composition',
  render: () => <EntityTableStory />,
}

export const Loading: Story = {
  render: () => <EntityTableStory loading />,
}

export const Empty: Story = {
  render: () => <EntityTableStory empty />,
}

export const Selectable: Story = {
  render: () => {
    const [selection, setSelection] = useState<ExampleEntityRow[]>([])

    return (
      <TableShell
        title="Selectable rows"
        description="Controlled checkbox selection via selectableRowsPreset and selectionColumn."
        actions={<span className="text-sm text-600">Selected: {selection.length}</span>}
      >
        <DataTable
          value={exampleEntityRows.slice(0, 6)}
          {...standardTablePreset({ dataKey: 'id' })}
          {...selectableRowsPreset({
            dataKey: 'id',
            selection,
            onSelectionChange: (event) => setSelection(event.value as ExampleEntityRow[]),
            metaKeySelection: false,
          })}
        >
          {selectionColumn<ExampleEntityRow>({ frozen: true })}
          {identityColumn<ExampleEntityRow>({ field: 'name', secondaryField: 'email', header: 'Entity' })}
          {statusColumn<ExampleEntityRow>({ field: 'status', options: exampleStatusOptions })}
        </DataTable>
      </TableShell>
    )
  },
}

export const Expandable: Story = {
  render: () => {
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>({})

    const rowExpansionTemplate = (rowData: ExampleEntityRow) => (
      <div className="p-3 border-1 border-200 border-round surface-ground">
        <div className="text-sm text-700">Email: {rowData.email}</div>
        <div className="text-sm text-700 flex align-items-center gap-2">
          Role: <Tag value={rowData.role} />
        </div>
      </div>
    )

    return (
      <TableShell
        title="Expandable rows"
        description="Row expansion controlled via expandableRowsPreset with a custom expansion template."
      >
        <DataTable
          value={exampleEntityRows.slice(0, 6)}
          {...standardTablePreset({ dataKey: 'id' })}
          {...expandableRowsPreset({
            dataKey: 'id',
            expandedRows,
            onRowToggle: (event) => setExpandedRows(event.data),
            rowExpansionTemplate,
          })}
        >
          <Column expander style={{ width: '3.5rem' }} />
          {identityColumn<ExampleEntityRow>({ field: 'name', secondaryField: 'email', header: 'Entity' })}
          {statusColumn<ExampleEntityRow>({ field: 'status', options: exampleStatusOptions })}
        </DataTable>
      </TableShell>
    )
  },
}

export const Identity: Story = {
  render: () => (
    <TableShell
      title="Identity column"
      description="Avatar + primary text + optional secondary field for consistent identity display."
    >
      <DataTable value={exampleEntityRows.slice(0, 5)} {...standardTablePreset({ dataKey: 'id' })}>
        {identityColumn<ExampleEntityRow>({ field: 'name', secondaryField: 'email', header: 'Person' })}
        {textColumn<ExampleEntityRow>({ field: 'role', header: 'Role', sortable: true })}
        {statusColumn<ExampleEntityRow>({ field: 'status', options: exampleStatusOptions })}
      </DataTable>
    </TableShell>
  ),
}
